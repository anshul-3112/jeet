import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, ArrowRight, ShieldCheck, UploadCloud } from 'lucide-react';
import { businessConfig } from '../../data/business';
import { getGeneralWhatsAppUrl } from '../../utils/whatsapp';
import { useLanguage } from '../../context/LanguageContext';

export const FinalCTA: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="py-14 md:py-[72px] bg-[#0b3b32] text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-emerald-200 mb-4">
          <ShieldCheck className="w-4 h-4 text-emerald-300" />
          <span>{language === 'mr' ? '२४ तास सेवा · मोफत सल्ला' : 'Open 24/7 · Instant Document Consultation'}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight max-w-3xl mx-auto font-sans leading-[1.15]">
          {language === 'mr' ? (
            <>
              शासकीय दाखले किंवा फॉर्म भरायचे आहेत? <br />
              <span className="text-[#f5b800]">आता थेट यश चोपडे यांच्याशी संपर्क साधा.</span>
            </>
          ) : (
            <>
              Ready to submit your documents? <br />
              <span className="text-[#f5b800]">Get 100% verified assistance today.</span>
            </>
          )}
        </h2>

        <p className="text-sm sm:text-base text-emerald-100/90 mt-3 max-w-2xl mx-auto leading-relaxed">
          {language === 'mr'
            ? 'अयोध्या नगर चौकात आपले सरकार सेवा केंद्रावर थेट भेटा किंवा घरबसल्या ऑनलाइन कागदपत्रे पाठवून काम पूर्ण करून घ्या.'
            : 'Visit our center beside Balaji Jewelers, Ayodhya Nagar, Nagpur, or submit online from your smartphone in 2 minutes.'}
        </p>

        {/* Location subtitle */}
        <p className="text-xs text-amber-200/90 font-medium mt-2.5 flex items-center justify-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#f5b800]" />
          <span>{language === 'mr' ? businessConfig.address.fullMarathi : businessConfig.address.fullEnglish}</span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <a
            href={`tel:${businessConfig.primaryPhone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-white text-[#0b3b32] font-bold text-xs sm:text-sm shadow-sm hover:bg-slate-50 transition-all active:scale-95 cursor-pointer"
            id="final-call-btn"
          >
            <Phone className="w-4 h-4" />
            <span>Call: {businessConfig.formattedPrimaryPhone}</span>
          </a>

          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
            id="final-whatsapp-btn"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>

          <Link
            to="/upload"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-transparent hover:bg-white/10 text-white font-bold text-xs sm:text-sm border-2 border-white/40 transition-all active:scale-95 cursor-pointer"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Online Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
