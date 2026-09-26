import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { db } from '../db';
import { adminUsers, documents, payments, auditLog } from '../db/schema';
import { eq, desc, and, gte } from 'drizzle-orm';
import { authMiddleware, generateToken } from '../middleware/auth';
import { getSignedDownloadUrl, deleteFileFromStorage } from '../services/storage';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// Strict rate limit for admin login: max 5 attempts per 15 min
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// POST /api/admin/login
router.post('/login', loginLimiter, async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const defaultAdminUser = process.env.ADMIN_USERNAME || 'admin';
    const defaultPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    let adminUser = null;
    try {
      const users = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
      if (users.length > 0) {
        adminUser = users[0];
      }
    } catch (e) {
      console.warn('DB lookup failed, checking env fallback', e);
    }

    let isMatch = false;
    let userId = adminUser?.id || '00000000-0000-0000-0000-000000000001';

    if (adminUser) {
      isMatch = await bcrypt.compare(password, adminUser.passwordHash);
    } else if (username === defaultAdminUser) {
      if (defaultPasswordHash) {
        isMatch = await bcrypt.compare(password, defaultPasswordHash);
      } else {
        // Default initial credentials if unconfigured: admin / admin123
        isMatch = password === 'admin123';
      }
    }

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // Update last login
    if (adminUser) {
      try {
        await db.update(adminUsers)
          .set({ lastLoginAt: new Date() })
          .where(eq(adminUsers.id, adminUser.id));
      } catch (err) {}
    }

    const token = generateToken({ id: userId, username });

    // Set HTTP-only secure cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Audit log
    try {
      await db.insert(auditLog).values({
        adminId: adminUser ? adminUser.id : undefined,
        action: 'login',
      });
    } catch (e) {}

    return res.json({
      success: true,
      user: { id: userId, username },
    });
  } catch (err: any) {
    console.error('Admin login error:', err);
    return res.status(500).json({ error: 'Login failed due to a server error.' });
  }
});

// POST /api/admin/logout
router.post('/logout', (_req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  });
  return res.json({ success: true, message: 'Logged out successfully.' });
});

// GET /api/admin/me
router.get('/me', authMiddleware, (req: Request, res: Response) => {
  return res.json({ user: req.admin });
});

// GET /api/admin/documents
router.get('/documents', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { status, service } = req.query;

    const allDocs = await db.select().from(documents).orderBy(desc(documents.uploadedAt));
    const now = new Date();

    const formattedDocs = allDocs
      .filter((doc) => {
        if (status && status !== 'all') {
          if (status === 'expired') {
            return doc.status === 'expired' || new Date(doc.expiresAt) <= now;
          }
          return doc.status === status;
        }
        return true;
      })
      .filter((doc) => {
        if (service && service !== 'all') {
          return doc.serviceSlug === service;
        }
        return true;
      })
      .map((doc) => {
        const isExpired = doc.status === 'expired' || new Date(doc.expiresAt) <= now;
        const remainingMs = Math.max(0, new Date(doc.expiresAt).getTime() - now.getTime());
        const remainingMinutes = Math.floor(remainingMs / (1000 * 60));
        const isExpiringSoon = !isExpired && remainingMinutes < 60; // < 1 hour

        return {
          id: doc.id,
          trackingId: doc.trackingId,
          citizenName: doc.citizenName,
          citizenPhone: doc.citizenPhone,
          serviceSlug: doc.serviceSlug,
          fileCount: doc.fileKeys.length,
          status: isExpired ? 'expired' : doc.status,
          uploadedAt: doc.uploadedAt,
          expiresAt: doc.expiresAt,
          printedAt: doc.printedAt,
          remainingMinutes,
          isExpiringSoon,
        };
      });

    const expiringCount = formattedDocs.filter((d) => d.isExpiringSoon).length;

    return res.json({
      documents: formattedDocs,
      expiringCount,
      total: formattedDocs.length,
    });
  } catch (err: any) {
    console.error('Error fetching admin documents:', err);
    return res.status(500).json({ error: 'Failed to retrieve documents.' });
  }
});

// GET /api/admin/documents/:id
router.get('/documents/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id || '');
    const found = await db.select().from(documents).where(eq(documents.id, id));

    if (found.length === 0) {
      return res.status(404).json({ error: 'Document not found.' });
    }

    const doc = found[0];
    const now = new Date();
    const isExpired = doc.status === 'expired' || new Date(doc.expiresAt) <= now;
    const remainingMs = Math.max(0, new Date(doc.expiresAt).getTime() - now.getTime());
    const remainingMinutes = Math.floor(remainingMs / (1000 * 60));

    // Generate short-lived signed URLs for preview
    const signedFiles = await Promise.all(
      doc.fileKeys.map(async (key) => {
        const url = await getSignedDownloadUrl(key, 300); // 5 minutes
        const fileName = key.split('/').pop() || 'document';
        const isPdf = fileName.toLowerCase().endsWith('.pdf');
        return { key, fileName, url, isPdf };
      })
    );

    // Audit log
    try {
      await db.insert(auditLog).values({
        adminId: req.admin?.id || null,
        documentId: doc.id,
        action: 'viewed',
      });
    } catch (e) {}

    return res.json({
      id: doc.id,
      trackingId: doc.trackingId,
      citizenName: doc.citizenName,
      citizenPhone: doc.citizenPhone,
      serviceSlug: doc.serviceSlug,
      status: isExpired ? 'expired' : doc.status,
      uploadedAt: doc.uploadedAt,
      expiresAt: doc.expiresAt,
      printedAt: doc.printedAt,
      remainingMinutes,
      files: signedFiles,
    });
  } catch (err: any) {
    console.error('Error fetching document detail:', err);
    return res.status(500).json({ error: 'Failed to retrieve document details.' });
  }
});

// PATCH /api/admin/documents/:id
router.patch('/documents/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id || '');
    const { status } = req.body;

    if (!['printed', 'received'].includes(status)) {
      return res.status(400).json({ error: 'Status must be "printed" or "received".' });
    }

    const updateData: any = { status };
    if (status === 'printed') {
      updateData.printedAt = new Date();
    }

    const [updated] = await db
      .update(documents)
      .set(updateData)
      .where(eq(documents.id, id))
      .returning();

    // Audit log
    try {
      await db.insert(auditLog).values({
        adminId: req.admin?.id || null,
        documentId: id,
        action: status === 'printed' ? 'printed' : 'status_update',
      });
    } catch (e) {}

    return res.json({ success: true, document: updated });
  } catch (err: any) {
    console.error('Error updating document status:', err);
    return res.status(500).json({ error: 'Failed to update document status.' });
  }
});

// DELETE /api/admin/documents/:id
router.delete('/documents/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id || '');
    const found = await db.select().from(documents).where(eq(documents.id, id));

    if (found.length === 0) {
      return res.status(404).json({ error: 'Document not found.' });
    }

    const doc = found[0];

    // Delete files from storage
    for (const key of doc.fileKeys) {
      try {
        await deleteFileFromStorage(key);
      } catch (e) {
        console.warn(`Failed to delete file ${key} from storage`, e);
      }
    }

    await db.update(documents)
      .set({ status: 'deleted' })
      .where(eq(documents.id, id));

    // Audit log
    try {
      await db.insert(auditLog).values({
        adminId: req.admin?.id || null,
        documentId: id,
        action: 'deleted',
      });
    } catch (e) {}

    return res.json({ success: true, message: 'Document and files deleted successfully.' });
  } catch (err: any) {
    console.error('Error deleting document:', err);
    return res.status(500).json({ error: 'Failed to delete document.' });
  }
});

// GET /api/admin/payments
router.get('/payments', authMiddleware, async (_req: Request, res: Response) => {
  try {
    const paymentList = await db
      .select({
        id: payments.id,
        documentId: payments.documentId,
        razorpayOrderId: payments.razorpayOrderId,
        razorpayPaymentId: payments.razorpayPaymentId,
        amountPaise: payments.amountPaise,
        status: payments.status,
        createdAt: payments.createdAt,
        trackingId: documents.trackingId,
        citizenName: documents.citizenName,
      })
      .from(payments)
      .leftJoin(documents, eq(payments.documentId, documents.id))
      .orderBy(desc(payments.createdAt));

    // Calculate totals
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);

    let totalCollected = 0;
    let todayCollected = 0;
    let weekCollected = 0;

    paymentList.forEach((p) => {
      if (p.status === 'paid') {
        const amount = p.amountPaise / 100;
        totalCollected += amount;
        const pDate = new Date(p.createdAt);
        if (pDate >= startOfToday) todayCollected += amount;
        if (pDate >= startOfWeek) weekCollected += amount;
      }
    });

    return res.json({
      payments: paymentList,
      summary: {
        totalCollected,
        todayCollected,
        weekCollected,
        count: paymentList.length,
      },
    });
  } catch (err: any) {
    console.error('Error fetching admin payments:', err);
    return res.status(500).json({ error: 'Failed to retrieve payments.' });
  }
});

export default router;
