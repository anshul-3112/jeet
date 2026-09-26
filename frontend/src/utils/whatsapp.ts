import { businessConfig } from '../data/business';

export function getGeneralWhatsAppUrl(): string {
  const text = encodeURIComponent(
    `Namaskar Yash ji, I would like to inquire about government / documentation services at Jeet Digital E-Governance Seva Kendra, Nagpur.`
  );
  return `https://wa.me/${businessConfig.whatsappNumber}?text=${text}`;
}

export function getServiceWhatsAppUrl(serviceName: string): string {
  const text = encodeURIComponent(
    `Namaskar Yash ji, I need assistance with *${serviceName}* at Jeet Digital E-Governance Seva Kendra, Nagpur. Please let me know the required documents and next steps.`
  );
  return `https://wa.me/${businessConfig.whatsappNumber}?text=${text}`;
}

export interface EnquiryData {
  name: string;
  phone: string;
  service: string;
  note?: string;
}

export function getEnquiryWhatsAppUrl(data: EnquiryData): string {
  const text = encodeURIComponent(
    `*New Service Enquiry - Jeet Digital E-Governance*\n` +
    `• *Name*: ${data.name}\n` +
    `• *Phone*: ${data.phone}\n` +
    `• *Service Needed*: ${data.service}\n` +
    (data.note ? `• *Note / Query*: ${data.note}\n` : '') +
    `\nPlease contact me regarding the process.`
  );
  return `https://wa.me/${businessConfig.whatsappNumber}?text=${text}`;
}

export function getPrimaryCallUrl(): string {
  return `tel:${businessConfig.primaryPhone}`;
}

export function getAlternateCallUrl(): string {
  return `tel:${businessConfig.alternatePhone}`;
}

export function getEmailUrl(): string {
  return `mailto:${businessConfig.email}`;
}

export function getGoogleMapsUrl(): string {
  return businessConfig.googleMapsUrl;
}
