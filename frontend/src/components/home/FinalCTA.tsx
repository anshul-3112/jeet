import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { businessConfig } from '../../data/business';
import { getGeneralWhatsAppUrl } from '../../utils/whatsapp';
import { useLanguage } from '../../context/LanguageContext';

export const FinalCTA: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="py-20 md:py-24 bg-[#113D36] text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1C5E53]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#C27E4B]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-emerald-200 mb-5">
          <ShieldCheck className="w-4 h-4 text-emerald-300" />
          <span>{language === 'mr' ? '२४ तास सेवा · मोफत सल्ला' : '24x7 Open · Instant Document Consultation'}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight max-w-3xl mx-auto font-serif leading-[1.15]">
          {language === 'mr' ? (
            <>
              शासकीय दाखले किंवा फॉर्म भरायचे आहेत? <br />
              <span className="italic font-serif text-[#EFDCB9]">आता थेट यश चोपडे यांच्याशी संपर्क साधा.</span>
            </>
          ) : (
            <>
              Ready to submit your documents? <br />
              <span className="italic font-serif text-[#EFDCB9]">Get 100% verified assistance today.</span>
            </>
          )}
        </h2>

        <p className="text-sm sm:text-base text-[#C2DDD4] mt-4 max-w-2xl mx-auto leading-relaxed">
          {language === 'mr'
            ? 'अयोध्या नगर चौकात आपले सरकार सेवा केंद्रावर थेट भेटा किंवा घरबसल्या ऑनलाइन कागदपत्रे पाठवून काम पूर्ण करून घ्या.'
            : 'Visit our center beside Balaji Jewelers, Ayodhya Nagar, Nagpur, or submit online from your smartphone in 2 minutes.'}
        </p>

        {/* Location subtitle */}
        <p className="text-xs text-[#EFDCB9] font-medium mt-3 flex items-center justify-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" />
          <span>{language === 'mr' ? businessConfig.address.fullMarathi : businessConfig.address.fullEnglish}</span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-9">
          <a
            href={`tel:${businessConfig.primaryPhone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-[#113D36] font-bold text-sm shadow-md hover:bg-[#FAF8F5] hover:scale-105 active:scale-100 transition-all"
            id="final-call-btn"
          >
            <Phone className="w-4 h-4" />
            <span>Call: {businessConfig.formattedPrimaryPhone}</span>
          </a>

          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#1C5E53] hover:bg-[#144A42] text-white font-bold text-sm border border-emerald-500/40 shadow-sm transition-all"
            id="final-whatsapp-btn"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>

          <Link
            to="/upload"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-transparent hover:bg-white/10 text-white font-semibold text-sm border border-white/30 transition-all"
          >
            <span>Upload Online Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
