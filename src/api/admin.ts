import { apiClient } from './client';

export interface AdminUser {
  id: string;
  username: string;
}

export interface AdminDocumentItem {
  id: string;
  trackingId: string;
  citizenName: string;
  citizenPhone: string;
  serviceSlug: string;
  fileCount: number;
  status: 'received' | 'printed' | 'expired' | 'deleted';
  uploadedAt: string;
  expiresAt: string;
  printedAt?: string | null;
  remainingMinutes: number;
  isExpiringSoon: boolean;
}

export interface SignedFileItem {
  key: string;
  fileName: string;
  url: string;
  isPdf: boolean;
}

export interface AdminDocumentDetail extends Omit<AdminDocumentItem, 'fileCount' | 'isExpiringSoon'> {
  files: SignedFileItem[];
}

export interface PaymentItem {
  id: string;
  documentId?: string | null;
  razorpayOrderId: string;
  razorpayPaymentId?: string | null;
  amountPaise: number;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: string;
  trackingId?: string | null;
  citizenName?: string | null;
}

export interface AdminPaymentsResponse {
  payments: PaymentItem[];
  summary: {
    totalCollected: number;
    todayCollected: number;
    weekCollected: number;
    count: number;
  };
}

export async function adminLogin(username: string, password: string): Promise<{ success: boolean; user: AdminUser }> {
  const response = await apiClient.post('/admin/login', { username, password });
  return response.data;
}

export async function adminLogout(): Promise<{ success: boolean }> {
  const response = await apiClient.post('/admin/logout');
  return response.data;
}

export async function getAdminMe(): Promise<{ user: AdminUser }> {
  const response = await apiClient.get('/admin/me');
  return response.data;
}

export async function getAdminDocuments(status?: string, service?: string): Promise<{
  documents: AdminDocumentItem[];
  expiringCount: number;
  total: number;
}> {
  const response = await apiClient.get('/admin/documents', {
    params: { status, service },
  });
  return response.data;
}

export async function getAdminDocumentDetail(id: string): Promise<AdminDocumentDetail> {
  const response = await apiClient.get(`/admin/documents/${id}`);
  return response.data;
}

export async function updateDocumentStatus(id: string, status: 'printed' | 'received'): Promise<any> {
  const response = await apiClient.patch(`/admin/documents/${id}`, { status });
  return response.data;
}

export async function deleteAdminDocument(id: string): Promise<any> {
  const response = await apiClient.delete(`/admin/documents/${id}`);
  return response.data;
}

export async function getAdminPayments(): Promise<AdminPaymentsResponse> {
  const response = await apiClient.get('/admin/payments');
  return response.data;
}
