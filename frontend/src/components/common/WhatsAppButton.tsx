import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getGeneralWhatsAppUrl, getServiceWhatsAppUrl } from '../../utils/whatsapp';

interface WhatsAppButtonProps {
  serviceName?: string;
  className?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'subtle';
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  serviceName,
  className = '',
  label,
  size = 'md',
  variant = 'solid'
}) => {
  const url = serviceName ? getServiceWhatsAppUrl(serviceName) : getGeneralWhatsAppUrl();
  const defaultLabel = serviceName ? `WhatsApp for ${serviceName}` : 'WhatsApp Us';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base font-semibold gap-2.5'
  };

  const variantClasses = {
    solid: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow active:scale-[0.98]',
    outline: 'border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 active:scale-[0.98]',
    subtle: 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      id="whatsapp-cta-button"
    >
      <MessageCircle className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} text-current fill-current/20`} />
      <span>{label || defaultLabel}</span>
    </a>
  );
};
