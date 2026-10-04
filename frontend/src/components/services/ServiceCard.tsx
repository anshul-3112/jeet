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
      className="group block bg-white rounded-3xl p-6 sm:p-7 transition-all duration-300 border border-slate-200/90 hover:border-[#0B3830]/40 hover:shadow-elevated hover:-translate-y-1 relative flex flex-col justify-between"
    >
      <div>
        {/* Top Header: Icon & Category/Turnaround Tag */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0B3830] flex items-center justify-center transition-colors group-hover:bg-[#0B3830] group-hover:text-white border border-emerald-200">
            <IconComponent className="w-6 h-6 transition-colors" />
          </div>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>{service.turnaroundTime || 'Fast Turnaround'}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-[#0B3830] transition-colors leading-snug">
          {language === 'mr' ? service.nameMr : service.name}
        </h3>

        {/* Short description */}
        <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-4">
          {language === 'mr' ? service.shortDescriptionMr : service.shortDescription}
        </p>

        {/* Document Checklist Preview */}
        {service.documentSections?.[0]?.items && service.documentSections[0].items.length > 0 && (
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1.5 mb-4">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              {language === 'mr' ? 'आवश्यक कागदपत्रे:' : 'Key Requirements:'}
            </div>
            <div className="text-xs text-slate-800 font-medium truncate">
              • {language === 'mr' && service.documentSections[0].itemsMr?.[0]
                ? service.documentSections[0].itemsMr[0]
                : service.documentSections[0].items[0]}
            </div>
            {service.documentSections[0].items[1] && (
              <div className="text-xs text-slate-600 truncate">
                • {language === 'mr' && service.documentSections[0].itemsMr?.[1]
                  ? service.documentSections[0].itemsMr[1]
                  : service.documentSections[0].items[1]}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0B3830]">
        <span>{language === 'mr' ? 'तपशील व अर्ज करा' : 'View Requirements & Apply'}</span>
        <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-[#0B3830] group-hover:text-white transition-colors">
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
};
