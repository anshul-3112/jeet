import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getGeneralWhatsAppUrl } from '../../utils/whatsapp';
import { useLanguage } from '../../context/LanguageContext';

export const FloatingWhatsAppButton: React.FC = () => {
  const { language } = useLanguage();
  const label = language === 'mr' ? 'व्हॉट्सॲपवर संपर्क साधा' : 'Chat on WhatsApp';

  return (
    <a
      href={getGeneralWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 max-md:bottom-20 max-md:right-4 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
      aria-label={label}
      title={label}
    >
      <MessageCircle className="w-7 h-7 fill-white text-white" />
      {/* Tooltip on desktop hover */}
      <span className="hidden md:group-hover:block absolute right-16 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-md pointer-events-none transition-opacity">
        {label}
      </span>
    </a>
  );
};
