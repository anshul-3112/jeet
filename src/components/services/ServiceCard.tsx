import React from 'react';
import { Link } from 'react-router-dom';
import {
  Fingerprint, CreditCard, Plane, QrCode, Car, ShieldCheck, Award, Receipt, Home, FileCheck2, FileBadge, Store, Utensils, BookOpen, FileText, Building2, Zap, Landmark, ShieldPlus, GraduationCap
} from 'lucide-react';
import type { ServiceItem } from '../../data/services';
import { useLanguage } from '../../context/LanguageContext';

const iconMap: Record<string, React.ReactNode> = {
  Fingerprint: <Fingerprint className="w-8 h-8 text-brand-600" />,
  CreditCard: <CreditCard className="w-8 h-8 text-brand-600" />,
  Plane: <Plane className="w-8 h-8 text-brand-600" />,
  QrCode: <QrCode className="w-8 h-8 text-brand-600" />,
  Car: <Car className="w-8 h-8 text-brand-600" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8 text-brand-600" />,
  Award: <Award className="w-8 h-8 text-brand-600" />,
  Receipt: <Receipt className="w-8 h-8 text-brand-600" />,
  Home: <Home className="w-8 h-8 text-brand-600" />,
  FileCheck2: <FileCheck2 className="w-8 h-8 text-brand-600" />,
  FileBadge: <FileBadge className="w-8 h-8 text-brand-600" />,
  Store: <Store className="w-8 h-8 text-brand-600" />,
  Utensils: <Utensils className="w-8 h-8 text-brand-600" />,
  BookOpen: <BookOpen className="w-8 h-8 text-brand-600" />,
  FileText: <FileText className="w-8 h-8 text-brand-600" />,
  Building2: <Building2 className="w-8 h-8 text-brand-600" />,
  Zap: <Zap className="w-8 h-8 text-brand-600" />,
  Landmark: <Landmark className="w-8 h-8 text-brand-600" />,
  ShieldPlus: <ShieldPlus className="w-8 h-8 text-brand-600" />,
  GraduationCap: <GraduationCap className="w-8 h-8 text-brand-600" />
};

export const ServiceCard: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const { language } = useLanguage();
  const icon = iconMap[service.iconName] || <FileText className="w-8 h-8 text-brand-600" />;

  return (
    <Link
      to={`/services/${service.slug}`}
      className="group block bg-white rounded-3xl p-8 transition-all duration-300 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 hover:border-brand-100"
    >
      {/* Icon Area */}
      <div className="mb-6">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
          {React.cloneElement(icon as React.ReactElement, { className: 'w-8 h-8 transition-colors' })}
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
