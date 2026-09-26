import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const isS3Configured = Boolean(
  process.env.S3_ACCESS_KEY_ID &&
  process.env.S3_SECRET_ACCESS_KEY &&
  process.env.S3_BUCKET &&
  process.env.S3_ACCESS_KEY_ID !== 'access_key'
);

export const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.S3_ENDPOINT || undefined,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  },
  forcePathStyle: true,
});

const LOCAL_STORAGE_DIR = path.resolve(__dirname, '../../uploads');
if (!isS3Configured && !fs.existsSync(LOCAL_STORAGE_DIR)) {
  fs.mkdirSync(LOCAL_STORAGE_DIR, { recursive: true });
}

export async function uploadFileToStorage(
  buffer: Buffer,
  fileKey: string,
  contentType: string
): Promise<string> {
  if (isS3Configured) {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: fileKey,
        Body: buffer,
        ContentType: contentType,
      })
    );
    return fileKey;
  } else {
    // Local fallback for development
    const localPath = path.join(LOCAL_STORAGE_DIR, fileKey);
    const dir = path.dirname(localPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(localPath, buffer);
    return fileKey;
  }
}

export async function getSignedDownloadUrl(fileKey: string, expiresInSeconds = 300): Promise<string> {
  if (isS3Configured) {
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: fileKey,
    });
    return await getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
  } else {
    // Return local preview endpoint for dev
    return `/api/documents/preview/${encodeURIComponent(fileKey)}`;
  }
}

export async function deleteFileFromStorage(fileKey: string): Promise<void> {
  if (isS3Configured) {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: fileKey,
      })
    );
  } else {
    const localPath = path.join(LOCAL_STORAGE_DIR, fileKey);
    if (fs.existsSync(localPath)) {
      fs.unlinkSync(localPath);
    }
  }
}

export function getLocalFilePath(fileKey: string): string | null {
  const localPath = path.join(LOCAL_STORAGE_DIR, fileKey);
  return fs.existsSync(localPath) ? localPath : null;
}
