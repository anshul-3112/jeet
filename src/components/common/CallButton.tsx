import React from 'react';
import { PhoneCall } from 'lucide-react';
import { getPrimaryCallUrl, getAlternateCallUrl } from '../../utils/whatsapp';
import { businessConfig } from '../../data/business';

interface CallButtonProps {
  useAlternate?: boolean;
  className?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline' | 'dark';
}

export const CallButton: React.FC<CallButtonProps> = ({
  useAlternate = false,
  className = '',
  label,
  size = 'md',
  variant = 'primary'
}) => {
  const url = useAlternate ? getAlternateCallUrl() : getPrimaryCallUrl();
  const phoneFormatted = useAlternate ? businessConfig.formattedAlternatePhone : businessConfig.formattedPrimaryPhone;
  const defaultLabel = label || `Call ${phoneFormatted}`;

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base font-semibold gap-2.5'
  };

  const variantClasses = {
    primary: 'bg-brand-600 hover:bg-brand-700 text-white shadow-soft hover:shadow-card active:scale-[0.98]',
    secondary: 'bg-govnavy-900 hover:bg-govnavy-800 text-white shadow-soft active:scale-[0.98]',
    outline: 'border-2 border-brand-600 text-brand-600 hover:bg-brand-50 active:scale-[0.98]',
    dark: 'bg-slate-900 hover:bg-slate-800 text-white active:scale-[0.98]'
  };

  return (
    <a
      href={url}
      className={`inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      id={useAlternate ? 'call-alternate-cta-button' : 'call-primary-cta-button'}
    >
      <PhoneCall className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} text-current`} />
      <span>{defaultLabel}</span>
    </a>
  );
};
