import React from 'react';
import { Link } from 'react-router-dom';
import {
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
  GraduationCap,
  ArrowRight,
  MessageCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import type { ServiceItem } from '../../data/services';
import { getServiceWhatsAppUrl } from '../../utils/whatsapp';
import { useLanguage } from '../../context/LanguageContext';

const iconMap: Record<string, React.ReactNode> = {
  Fingerprint: <Fingerprint className="w-6 h-6 text-brand-600" />,
  CreditCard: <CreditCard className="w-6 h-6 text-blue-600" />,
  Plane: <Plane className="w-6 h-6 text-indigo-600" />,
  QrCode: <QrCode className="w-6 h-6 text-emerald-600" />,
  Car: <Car className="w-6 h-6 text-amber-600" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-brand-600" />,
  Award: <Award className="w-6 h-6 text-amber-600" />,
  Receipt: <Receipt className="w-6 h-6 text-emerald-600" />,
  Home: <Home className="w-6 h-6 text-blue-600" />,
  FileCheck2: <FileCheck2 className="w-6 h-6 text-purple-600" />,
  FileBadge: <FileBadge className="w-6 h-6 text-indigo-600" />,
  Store: <Store className="w-6 h-6 text-amber-600" />,
  Utensils: <Utensils className="w-6 h-6 text-orange-600" />,
  BookOpen: <BookOpen className="w-6 h-6 text-blue-600" />,
  FileText: <FileText className="w-6 h-6 text-slate-700" />,
  Building2: <Building2 className="w-6 h-6 text-emerald-700" />,
  Zap: <Zap className="w-6 h-6 text-amber-500" />,
  Landmark: <Landmark className="w-6 h-6 text-govnavy-900" />,
  ShieldPlus: <ShieldPlus className="w-6 h-6 text-teal-600" />,
  GraduationCap: <GraduationCap className="w-6 h-6 text-rose-600" />
};

export const ServiceCard: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const { language } = useLanguage();
  const icon = iconMap[service.iconName] || <FileText className="w-6 h-6 text-brand-600" />;

  const isSpecial = service.slug === 'caste-validity';

  return (
    <div
      className={`group relative bg-white rounded-2xl transition-all duration-300 flex flex-col justify-between border ${
        isSpecial
          ? 'border-brand-500 ring-2 ring-brand-500/20 shadow-card hover:shadow-xl'
          : 'border-slate-200/90 shadow-sm hover:shadow-card hover:border-brand-300'
      } p-6`}
    >
      {/* Top Badges */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100/90 group-hover:bg-brand-50 flex items-center justify-center flex-shrink-0 transition-colors">
            {icon}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 justify-end">
            {isSpecial && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-600 text-white uppercase tracking-wider animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured / महत्त्वाची सेवा</span>
              </span>
            )}
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 group-hover:bg-slate-200">
              {language === 'mr' ? service.categoryNameMr : service.categoryName}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-govnavy-900 group-hover:text-brand-600 transition-colors leading-snug">
          <Link to={`/services/${service.slug}`} className="hover:underline">
            {language === 'mr' ? service.nameMr : service.name}
          </Link>
        </h3>

        {/* Marathi Subtitle if on English or vice versa */}
        <p className="text-xs font-semibold text-slate-500 font-marathi mt-0.5">
          {language === 'mr' ? service.name : service.nameMr}
        </p>

        {/* Short description */}
        <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
          {language === 'mr' ? service.shortDescriptionMr : service.shortDescription}
        </p>

        {/* Turnaround Pill if present */}
        {service.turnaroundTime && (
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span className="truncate">{language === 'mr' && service.turnaroundTimeMr ? service.turnaroundTimeMr : service.turnaroundTime}</span>
          </div>
        )}
      </div>

      {/* Card Action CTAs */}
      <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-govnavy-900 hover:text-brand-600 group/link transition-colors py-1.5"
        >
          <span>{language === 'mr' ? 'कागदपत्रे पहा' : 'View Checklist'}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>

        <a
          href={getServiceWhatsAppUrl(service.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
          title={`WhatsApp enquiry for ${service.name}`}
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>{language === 'mr' ? 'व्हॉट्सॲप' : 'WhatsApp'}</span>
        </a>
      </div>
    </div>
  );
};
