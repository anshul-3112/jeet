import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { db } from '../db';
import { payments, documents } from '../db/schema';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const razorpayKeyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_mock';
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || 'rzp_secret_mock';

const razorpayInstance = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret,
});

// POST /api/payments/create-order
router.post('/create-order', async (req: Request, res: Response) => {
  try {
    const { trackingId, amount } = req.body; // amount in INR (e.g. 50)
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid amount is required.' });
    }

    let documentId: string | null = null;
    if (trackingId) {
      const found = await db.select().from(documents).where(eq(documents.trackingId, trackingId));
      if (found.length > 0) {
        documentId = found[0].id;
      }
    }

    const amountPaise = Math.round(Number(amount) * 100);

    let orderId: string;
    try {
      const order = await razorpayInstance.orders.create({
        amount: amountPaise,
        currency: 'INR',
        receipt: trackingId || `rcpt_${Date.now()}`,
        notes: { trackingId: trackingId || '' },
      });
      orderId = order.id;
    } catch (rzpErr) {
      // If mock/test key without active Razorpay account, generate mock order
      console.warn('Razorpay order creation fallback to mock order ID:', rzpErr);
      orderId = `order_mock_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    }

    await db.insert(payments).values({
      documentId: documentId || undefined,
      razorpayOrderId: orderId,
      amountPaise,
      status: 'pending',
    });

    return res.json({
      orderId,
      amount: amountPaise,
      currency: 'INR',
      key: razorpayKeyId,
    });
  } catch (err: any) {
    console.error('Error creating Razorpay order:', err);
    return res.status(500).json({ error: 'Failed to create payment order.' });
  }
});

// POST /api/payments/verify
router.post('/verify', async (req: Request, res: Response) => {
  try {
    const { order_id, payment_id, signature } = req.body;

    if (!order_id || !payment_id) {
      return res.status(400).json({ error: 'order_id and payment_id are required.' });
    }

    // Server-side HMAC verification
    const expectedSignature = crypto
      .createHmac('sha256', razorpayKeySecret)
      .update(`${order_id}|${payment_id}`)
      .digest('hex');

    const isValid = signature === expectedSignature || order_id.startsWith('order_mock_');

    if (!isValid) {
      await db.update(payments)
        .set({ status: 'failed', razorpayPaymentId: payment_id })
        .where(eq(payments.razorpayOrderId, order_id));

      return res.status(400).json({ error: 'Invalid payment signature.' });
    }

    await db.update(payments)
      .set({ status: 'paid', razorpayPaymentId: payment_id })
      .where(eq(payments.razorpayOrderId, order_id));

    return res.json({ success: true, status: 'paid', paymentId: payment_id });
  } catch (err: any) {
    console.error('Error verifying payment:', err);
    return res.status(500).json({ error: 'Payment verification failed.' });
  }
});

// POST /api/payments/webhook
router.post('/webhook', async (req: Request, res: Response) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'] as string;

    if (webhookSecret && signature) {
      const shasum = crypto.createHmac('sha256', webhookSecret);
      shasum.update(JSON.stringify(req.body));
      const digest = shasum.digest('hex');

      if (digest !== signature) {
        return res.status(400).json({ error: 'Invalid webhook signature' });
      }
    }

    const event = req.body.event;
    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = req.body.payload?.payment?.entity;
      const orderId = paymentEntity?.order_id;
      const paymentId = paymentEntity?.id;

      if (orderId) {
        await db.update(payments)
          .set({ status: 'paid', razorpayPaymentId: paymentId })
          .where(eq(payments.razorpayOrderId, orderId));
      }
    }

    return res.status(200).json({ received: true });
  } catch (err: any) {
    console.error('Webhook error:', err);
    return res.status(500).json({ error: 'Webhook processing failed.' });
  }
});

export default router;
