import React from 'react';
import { Link } from 'react-router-dom';
import {
  Fingerprint, CreditCard, Plane, QrCode, Car, ShieldCheck, Award, Receipt, Home, FileCheck2, FileBadge, Store, Utensils, BookOpen, FileText, Building2, Zap, Landmark, ShieldPlus, GraduationCap, type LucideIcon
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
      className="group block bg-white rounded-3xl p-8 transition-all duration-300 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 hover:border-brand-100"
    >
      {/* Icon Area */}
      <div className="mb-6">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
          <IconComponent className="w-8 h-8 transition-colors" />
        </div>
      </div>

      {/* Content Area */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">
          {language === 'mr' ? service.nameMr : service.name}
        </h3>
        
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
          {language === 'mr' ? service.shortDescriptionMr : service.shortDescription}
        </p>
      </div>
    </Link>
  );
};
