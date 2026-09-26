import React from 'react';
import { Link } from 'react-router-dom';
import {
  Fingerprint, CreditCard, Plane, QrCode, Car, ShieldCheck, Award, Receipt, Home, FileCheck2, FileBadge, Store, Utensils, BookOpen, FileText, Building2, Zap, Landmark, ShieldPlus, GraduationCap, ArrowRight, Clock, type LucideIcon
} from 'lucide-react';
import type { ServiceItem } from '../../data/services';
import { useLanguage } from '../../context/LanguageContext';

const iconMap: Record<string, LucideIcon> = {
  Fingerprint,
  CreditCard,
  Plane,
  QrCode,
  Car,
  ShieldCheck,
  Award,
  Receipt,
  Home,
  FileCheck2,
  FileBadge,
  Store,
  Utensils,
  BookOpen,
  FileText,
  Building2,
  Zap,
  Landmark,
  ShieldPlus,
  GraduationCap
};

export const ServiceCard: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const { language } = useLanguage();
  const IconComponent = iconMap[service.iconName] || FileText;

  return (
    <Link
      to={`/services/${service.slug}`}
      className="group block bg-white rounded-3xl p-6 sm:p-7 transition-all duration-300 border border-[#EAE4DC] hover:border-[#113D36]/40 hover:shadow-elevated hover:-translate-y-1 relative flex flex-col justify-between"
    >
      <div>
        {/* Top Header: Icon & Category/Turnaround Tag */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-[#F2F8F6] text-[#113D36] flex items-center justify-center transition-colors group-hover:bg-[#113D36] group-hover:text-white border border-[#C2DDD4]/60">
            <IconComponent className="w-6 h-6 transition-colors" />
          </div>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#FAF8F5] text-[#A86938] border border-[#EFDCB9]">
            <Clock className="w-3 h-3" />
            <span>{service.turnaroundTime || 'Fast Turnaround'}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-[#152220] mb-2 group-hover:text-[#113D36] transition-colors font-sans leading-snug">
          {language === 'mr' ? service.nameMr : service.name}
        </h3>

        {/* Short description */}
        <p className="text-[#4A5B57] text-xs leading-relaxed line-clamp-2 mb-4">
          {language === 'mr' ? service.shortDescriptionMr : service.shortDescription}
        </p>

        {/* Document Checklist Preview (First 2 requirements) */}
        {service.documentSections?.[0]?.items && service.documentSections[0].items.length > 0 && (
          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC]/80 space-y-1 mb-4">
            <div className="text-[10px] uppercase font-bold text-[#798C87] tracking-wider">
              {language === 'mr' ? 'आवश्यक कागदपत्रे:' : 'Key Proofs:'}
            </div>
            <div className="text-[11px] text-[#152220] font-medium truncate">
              • {language === 'mr' && service.documentSections[0].itemsMr?.[0]
                ? service.documentSections[0].itemsMr[0]
                : service.documentSections[0].items[0]}
            </div>
            {service.documentSections[0].items[1] && (
              <div className="text-[11px] text-[#798C87] truncate">
                • {language === 'mr' && service.documentSections[0].itemsMr?.[1]
                  ? service.documentSections[0].itemsMr[1]
                  : service.documentSections[0].items[1]}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="pt-3 border-t border-[#F3EFEA] flex items-center justify-between text-xs font-semibold text-[#113D36]">
        <span>{language === 'mr' ? 'तपशील व अर्ज करा' : 'View Requirements'}</span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};
