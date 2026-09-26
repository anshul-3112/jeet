import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, ArrowRight, Shield } from 'lucide-react';
import { businessConfig } from '../../data/business';
import { getGeneralWhatsAppUrl } from '../../utils/whatsapp';
import { useLanguage } from '../../context/LanguageContext';

export const FinalCTA: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-govnavy-900 via-govnavy-950 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-500/20 border border-brand-400/30 text-xs font-bold text-brand-300 mb-4">
          <Shield className="w-3.5 h-3.5" />
          <span>{businessConfig.hours}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight max-w-3xl mx-auto leading-tight">
          {t.finalCta.title}
        </h2>

        <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-2xl mx-auto">
          {t.finalCta.subtitle}
        </p>

        {/* Location subtitle */}
        <p className="text-xs text-amber-300 font-semibold mt-2 flex items-center justify-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>{language === 'mr' ? businessConfig.address.fullMarathi : businessConfig.address.fullEnglish}</span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <a
            href={`tel:${businessConfig.primaryPhone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-base shadow-cta hover:scale-[1.02] active:scale-[0.98] transition-all"
            id="final-call-btn"
          >
            <Phone className="w-5 h-5 text-white" />
            <span>{t.finalCta.callBtn}</span>
          </a>

          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-soft hover:scale-[1.02] active:scale-[0.98] transition-all"
            id="final-whatsapp-btn"
          >
            <MessageCircle className="w-5 h-5 fill-white/20" />
            <span>{t.finalCta.whatsappBtn}</span>
          </a>

          <Link
            to="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
          >
            <span>{t.finalCta.viewServices}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
