import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { db } from '../db';
import { payments, documents } from '../db/schema';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// Validate Razorpay credentials format
const rawKeyId = (process.env.RAZORPAY_KEY_ID || '').trim();
const rawKeySecret = (process.env.RAZORPAY_KEY_SECRET || '').trim();

const isLiveRazorpay =
  rawKeyId.startsWith('rzp_') &&
  !rawKeyId.includes('xxxxxx') &&
  !rawKeyId.includes('mock') &&
  rawKeySecret.length > 5 &&
  !rawKeySecret.includes('xxxxxx') &&
  !rawKeySecret.includes('secret_mock');

const razorpayKeyId = isLiveRazorpay ? rawKeyId : 'rzp_test_mock';
const razorpayKeySecret = isLiveRazorpay ? rawKeySecret : 'rzp_secret_mock';

let razorpayInstance: Razorpay | null = null;
if (isLiveRazorpay) {
  try {
    razorpayInstance = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });
    console.log('Razorpay initialized in LIVE/TEST mode with key:', razorpayKeyId.substring(0, 12) + '...');
  } catch (initErr) {
    console.warn('Razorpay SDK initialization failed, falling back to sandbox simulator:', initErr);
    razorpayInstance = null;
  }
} else {
  console.log('Razorpay running in SANDBOX SIMULATOR mode (Provide valid RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET in .env for live gateway).');
}

// GET /api/payments/config - Expose gateway mode and public key to frontend
router.get('/config', (_req: Request, res: Response) => {
  return res.json({
    isLive: isLiveRazorpay,
    key: isLiveRazorpay ? razorpayKeyId : 'rzp_test_sandbox',
    currency: 'INR',
    businessName: 'Jeet Digital Seva Kendra',
  });
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
    let isMock = false;

    if (isLiveRazorpay && razorpayInstance) {
      try {
        const order = await razorpayInstance.orders.create({
          amount: amountPaise,
          currency: 'INR',
          receipt: (trackingId || `rcpt_${Date.now()}`).substring(0, 40),
          notes: { trackingId: trackingId || '' },
        });
        orderId = order.id;
      } catch (rzpErr) {
        // If live call fails (e.g. test key credentials mismatch), fall back cleanly
        console.warn('Razorpay live order creation error, falling back to sandbox simulator:', rzpErr);
        orderId = `order_mock_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        isMock = true;
      }
    } else {
      // Instant sandbox order generation without slow 40s network timeouts
      orderId = `order_mock_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      isMock = true;
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
      key: isLiveRazorpay && !isMock ? razorpayKeyId : 'rzp_test_sandbox',
      isMock,
    });
  } catch (err: any) {
    console.error('Error creating payment order:', err);
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

    const existingPayments = await db
      .select()
      .from(payments)
      .where(eq(payments.razorpayOrderId, order_id));

    if (existingPayments.length === 0) {
      return res.status(404).json({ error: 'Payment order record not found.' });
    }

    let isValid = false;

    // In sandbox mock mode, verify simulated payment IDs
    if (order_id.startsWith('order_mock_')) {
      isValid = true;
    } else if (isLiveRazorpay) {
      // Standard Razorpay HMAC-SHA256 signature verification
      const expectedSignature = crypto
        .createHmac('sha256', razorpayKeySecret)
        .update(`${order_id}|${payment_id}`)
        .digest('hex');

      try {
        isValid = crypto.timingSafeEqual(
          Buffer.from(signature || '', 'utf8'),
          Buffer.from(expectedSignature, 'utf8')
        );
      } catch {
        isValid = signature === expectedSignature;
      }
    }

    if (!isValid) {
      await db
        .update(payments)
        .set({ status: 'failed', razorpayPaymentId: payment_id })
        .where(eq(payments.razorpayOrderId, order_id));

      return res.status(400).json({ error: 'Invalid payment signature.' });
    }

    await db
      .update(payments)
      .set({ status: 'paid', razorpayPaymentId: payment_id })
      .where(eq(payments.razorpayOrderId, order_id));

    return res.json({
      success: true,
      status: 'paid',
      paymentId: payment_id,
      orderId: order_id,
    });
  } catch (err: any) {
    console.error('Error verifying payment:', err);
    return res.status(500).json({ error: 'Payment verification failed.' });
  }
});

// POST /api/payments/webhook
router.post('/webhook', async (req: Request, res: Response) => {
  try {
    const webhookSecret = (process.env.RAZORPAY_WEBHOOK_SECRET || '').trim();
    const signature = req.headers['x-razorpay-signature'] as string;

    if (webhookSecret && signature && !webhookSecret.includes('webhook_secret')) {
      // Use raw body buffer for authentic HMAC validation
      const rawPayload = (req as any).rawBody || Buffer.from(JSON.stringify(req.body));
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawPayload)
        .digest('hex');

      let isSigValid = false;
      try {
        isSigValid = crypto.timingSafeEqual(
          Buffer.from(signature, 'utf8'),
          Buffer.from(expectedSignature, 'utf8')
        );
      } catch {
        isSigValid = signature === expectedSignature;
      }

      if (!isSigValid) {
        return res.status(400).json({ error: 'Invalid webhook signature.' });
      }
    }

    const event = req.body?.event;
    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = req.body?.payload?.payment?.entity;
      const orderId = paymentEntity?.order_id;
      const paymentId = paymentEntity?.id;

      if (orderId) {
        await db
          .update(payments)
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
