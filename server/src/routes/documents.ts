import { Router, Request, Response } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db';
import { documents } from '../db/schema';
import { eq } from 'drizzle-orm';
import { uploadFileToStorage, getLocalFilePath } from '../services/storage';
import rateLimit from 'express-rate-limit';

const router = Router();

// Rate limiter for upload: 10 req / 15 min per IP
const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many upload attempts from this IP, please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Configure multer (memory storage so we can stream/write to S3/R2 or local)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB per file
    files: 5,                   // Max 5 files
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, WEBP, and PDF files are allowed.'));
    }
  },
});

function generateTrackingId(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `JD-${code}`;
}

// POST /api/documents/upload
router.post(
  '/upload',
  uploadLimiter,
  upload.array('files', 5),
  async (req: Request, res: Response) => {
    try {
      const { citizenName, citizenPhone, serviceSlug } = req.body;

      if (!citizenName || !citizenPhone || !serviceSlug) {
        return res.status(400).json({ error: 'Name, phone number, and service are required.' });
      }

      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({ error: 'Please select at least one document to upload.' });
      }

      const documentUuid = uuidv4();
      const trackingId = generateTrackingId();
      const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
      const fileKeys: string[] = [];

      for (const file of files) {
        const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileKey = `uploads/${today}/${documentUuid}/${safeName}`;
        await uploadFileToStorage(file.buffer, fileKey, file.mimetype);
        fileKeys.push(fileKey);
      }

      const now = new Date();
      const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // +24 hours

      const [newDoc] = await db.insert(documents).values({
        id: documentUuid,
        trackingId,
        citizenName: citizenName.trim(),
        citizenPhone: citizenPhone.trim(),
        serviceSlug,
        fileKeys,
        status: 'received',
        uploadedAt: now,
        expiresAt,
      }).returning();

      return res.status(201).json({
        success: true,
        trackingId,
        id: newDoc?.id || documentUuid,
        expiresAt: expiresAt.toISOString(),
      });
    } catch (err: any) {
      console.error('Error during document upload:', err);
      return res.status(500).json({ error: err.message || 'Failed to upload documents.' });
    }
  }
);

// GET /api/documents/track/:trackingId
router.get('/track/:trackingId', async (req: Request, res: Response) => {
  try {
    const trackingId = String(req.params.trackingId || '');
    if (!trackingId) {
      return res.status(400).json({ error: 'Tracking ID is required.' });
    }

    const foundDocs = await db.select().from(documents).where(eq(documents.trackingId, trackingId.toUpperCase()));

    if (!foundDocs || foundDocs.length === 0) {
      return res.status(404).json({ error: 'No document found with this tracking ID.' });
    }

    const doc = foundDocs[0];
    const now = new Date();
    const isExpired = doc.status === 'expired' || new Date(doc.expiresAt) <= now;

    const remainingMs = Math.max(0, new Date(doc.expiresAt).getTime() - now.getTime());
    const remainingMinutes = Math.floor(remainingMs / (1000 * 60));

    // CRITICAL: NEVER return file URLs or the citizen's phone back out on this public endpoint!
    return res.json({
      trackingId: doc.trackingId,
      serviceSlug: doc.serviceSlug,
      status: isExpired ? 'expired' : doc.status,
      uploadedAt: doc.uploadedAt,
      expiresAt: doc.expiresAt,
      remainingMinutes,
      printedAt: doc.printedAt,
    });
  } catch (err: any) {
    console.error('Error fetching track status:', err);
    return res.status(500).json({ error: 'Failed to retrieve tracking status.' });
  }
});

// GET /api/documents/preview/:fileKey (Local dev preview fallback)
router.get('/preview/:fileKey', (req: Request, res: Response) => {
  const fileKey = decodeURIComponent(String(req.params.fileKey || ''));
  const localPath = getLocalFilePath(fileKey);
  if (!localPath) {
    return res.status(404).send('File not found');
  }
  res.sendFile(localPath);
});

export default router;
