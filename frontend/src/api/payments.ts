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

export interface CreateOrderParams {
  trackingId?: string;
  amount: number;
  customerName?: string;
  customerPhone?: string;
  purpose?: string;
}

export async function createPaymentOrder(
  paramsOrTrackingId?: string | CreateOrderParams,
  amountParam?: number
): Promise<CreateOrderResponse> {
  let payload: CreateOrderParams;
  if (typeof paramsOrTrackingId === 'string' || paramsOrTrackingId === undefined) {
    payload = {
      trackingId: paramsOrTrackingId,
      amount: amountParam ?? 50,
    };
  } else {
    payload = paramsOrTrackingId;
  }

  const response = await apiClient.post<CreateOrderResponse>('/payments/create-order', payload);
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
