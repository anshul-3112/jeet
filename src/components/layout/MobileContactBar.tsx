import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { businessConfig } from '../../data/business';
import { getGeneralWhatsAppUrl } from '../../utils/whatsapp';
import { useLanguage } from '../../context/LanguageContext';

export const MobileContactBar: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.12)]">
      <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
        <a
          href={`tel:${businessConfig.primaryPhone}`}
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-brand-600 active:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-md transition-transform active:scale-95"
          id="mobile-sticky-call-btn"
        >
          <Phone className="w-4 h-4 fill-current/20" />
          <span>{t.mobileBar.call}</span>
        </a>

        <a
          href={getGeneralWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-transform active:scale-95"
          id="mobile-sticky-whatsapp-btn"
        >
          <MessageCircle className="w-4 h-4 fill-current/20" />
          <span>{t.mobileBar.whatsapp}</span>
        </a>
      </div>
    </div>
  );
};
