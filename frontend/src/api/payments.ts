import { apiClient } from './client';

export interface CreateOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  key: string;
  isMock?: boolean;
}

export interface PaymentConfigResponse {
  isLive: boolean;
  key: string;
  currency: string;
  businessName: string;
}

export async function getPaymentConfig(): Promise<PaymentConfigResponse> {
  const response = await apiClient.get<PaymentConfigResponse>('/payments/config');
  return response.data;
}

export interface VerifyPaymentResponse {
  success: boolean;
  status: string;
  paymentId: string;
}

export async function createPaymentOrder(trackingId: string, amount: number): Promise<CreateOrderResponse> {
  const response = await apiClient.post<CreateOrderResponse>('/payments/create-order', {
    trackingId,
    amount,
  });
  return response.data;
}

export async function verifyPayment(
  orderId: string,
  paymentId: string,
  signature: string,
  trackingId?: string
): Promise<VerifyPaymentResponse> {
  const response = await apiClient.post<VerifyPaymentResponse>('/payments/verify', {
    order_id: orderId,
    payment_id: paymentId,
    signature,
    trackingId,
  });
  return response.data;
}
