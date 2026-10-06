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
      className="group bg-white rounded-2xl p-5 transition-all duration-200 border border-slate-200/90 hover:border-[#0b3b32]/40 hover:shadow-card hover:-translate-y-0.5 relative flex flex-col justify-between h-full"
    >
      <div className="flex flex-col flex-1">
        {/* Top Header: Icon & Category/Turnaround Tag */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0b3b32] flex items-center justify-center transition-colors group-hover:bg-[#0b3b32] group-hover:text-white border border-emerald-200 flex-shrink-0">
            <IconComponent className="w-5 h-5 transition-colors" />
          </div>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200 flex-shrink-0">
            <Clock className="w-3 h-3 text-amber-700" />
            <span>
              {language === 'mr'
                ? (service.turnaroundBadgeMr || service.turnaroundBadge || 'जलद सेवा')
                : (service.turnaroundBadge || 'Fast Service')}
            </span>
          </span>
        </div>

        {/* Title (Standardized Height for Perfect Multi-Column Alignment) */}
        <div className="min-h-[2.75rem] flex items-center mb-1.5">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#0b3b32] transition-colors leading-snug line-clamp-2 font-sans">
            {language === 'mr' ? service.nameMr : service.name}
          </h3>
        </div>

        {/* Short description (Standardized 2-line preview) */}
        <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 h-8 mb-3">
          {language === 'mr' ? service.shortDescriptionMr : service.shortDescription}
        </p>

        {/* Document Checklist Preview (Uniform Height Container) */}
        <div className="mt-auto mb-4 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 h-[4.5rem] flex flex-col justify-center overflow-hidden">
          <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
            {language === 'mr' ? 'आवश्यक कागदपत्रे:' : 'Key Requirements:'}
          </div>
          <div className="text-[11px] text-slate-800 font-medium truncate">
            • {language === 'mr' && service.documentSections?.[0]?.itemsMr?.[0]
              ? service.documentSections[0].itemsMr[0]
              : (service.documentSections?.[0]?.items?.[0] || 'आधार कार्ड व आवश्यक कागदपत्रे')}
          </div>
          <div className="text-[11px] text-slate-600 truncate">
            • {language === 'mr' && service.documentSections?.[0]?.itemsMr?.[1]
              ? service.documentSections[0].itemsMr[1]
              : (service.documentSections?.[0]?.items?.[1] || 'पासपोर्ट फोटो व स्वाक्षरी')}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0b3b32]">
        <span>{language === 'mr' ? 'तपशील व अर्ज' : 'View Requirements'}</span>
        <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-[#0b3b32] group-hover:text-white transition-colors">
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
};
