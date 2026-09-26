import { apiClient } from './client';

export interface UploadResponse {
  success: boolean;
  trackingId: string;
  id: string;
  expiresAt: string;
}

export interface TrackStatusResponse {
  trackingId: string;
  serviceSlug: string;
  status: 'received' | 'printed' | 'expired' | 'deleted';
  uploadedAt: string;
  expiresAt: string;
  remainingMinutes: number;
  printedAt?: string | null;
}

export async function uploadDocuments(formData: FormData): Promise<UploadResponse> {
  const response = await apiClient.post<UploadResponse>('/documents/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export async function getTrackingStatus(trackingId: string): Promise<TrackStatusResponse> {
  const response = await apiClient.get<TrackStatusResponse>(`/documents/track/${trackingId}`);
  return response.data;
}
