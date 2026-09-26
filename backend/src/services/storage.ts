import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const accessKeyId = process.env.AWS_ACCESS_KEY_ID || process.env.S3_ACCESS_KEY_ID || '';
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || process.env.S3_SECRET_ACCESS_KEY || '';
const endpoint = process.env.AWS_ENDPOINT_URL_S3 || process.env.S3_ENDPOINT || undefined;
const region = process.env.AWS_REGION || 'us-east-2';
export const bucketName = process.env.S3_BUCKET || 'assets';

const isS3Configured = Boolean(
  accessKeyId &&
  secretAccessKey &&
  accessKeyId !== 'access_key'
);

export const s3Client = new S3Client({
  region,
  endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
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
        Bucket: bucketName,
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

export async function getSignedDownloadUrl(fileKey: string, expiresInSeconds = 3600): Promise<string> {
  if (isS3Configured) {
    const command = new GetObjectCommand({
      Bucket: bucketName,
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
        Bucket: bucketName,
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
