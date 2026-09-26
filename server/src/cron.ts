import cron from 'node-cron';
import { db } from './db';
import { documents } from './db/schema';
import { lt, and, ne, eq } from 'drizzle-orm';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  },
});

cron.schedule('*/15 * * * *', async () => {
  console.log('Running document purge job...');
  try {
    const now = new Date();
    const expiredDocs = await db.select().from(documents).where(
      and(
        lt(documents.expiresAt, now),
        ne(documents.status, 'expired'),
        ne(documents.status, 'deleted')
      )
    );

    for (const doc of expiredDocs) {
      if (doc.fileKeys && doc.fileKeys.length > 0) {
        for (const key of doc.fileKeys) {
          try {
            await s3Client.send(new DeleteObjectCommand({
              Bucket: process.env.S3_BUCKET,
              Key: key,
            }));
          } catch (e) {
            console.error(`Failed to delete object ${key}`, e);
          }
        }
      }
      // Update status to expired
      await db.update(documents)
        .set({ status: 'expired' })
        .where(eq(documents.id, doc.id));
    }
  } catch (err) {
    console.error('Error running purge job:', err);
  }
});
