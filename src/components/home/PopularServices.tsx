import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle, Sparkles } from 'lucide-react';
import { servicesData } from '../../data/services';
import { ServiceCard } from '../services/ServiceCard';
import { useLanguage } from '../../context/LanguageContext';

export const PopularServices: React.FC = () => {
  const { t, language } = useLanguage();

  // Filter popular services for the homepage grid
  const popularServices = servicesData.filter((s) => s.isPopular).slice(0, 9);

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.popularServices.tag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-govnavy-900 tracking-tight">
              {t.popularServices.title}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {t.popularServices.subtitle}
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-brand-600 font-bold text-xs sm:text-sm border border-slate-200 shadow-sm transition-all self-start md:self-auto hover:translate-x-0.5"
          >
            <span>{t.popularServices.viewAll}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Special Highlight Banner for Caste Validity (From Source Brochure) */}
        <div className="mb-10 bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl p-6 text-white shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-extrabold bg-amber-400 text-slate-900 uppercase tracking-wider mb-1">
                {language === 'mr' ? 'अत्यंत महत्त्वाचे' : 'Crucial for Students'}
              </span>
              <h3 className="text-lg sm:text-xl font-black tracking-tight font-marathi">
                {t.casteValidityBanner.alertTitle}
              </h3>
              <p className="text-xs sm:text-sm text-brand-100 mt-1 max-w-2xl leading-relaxed">
                {t.casteValidityBanner.alertDesc}
              </p>
            </div>
          </div>

          <Link
            to="/services/caste-validity"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-amber-50 text-brand-700 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95"
          >
            <span>{t.casteValidityBanner.cta}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        {/* Bottom CTA to view all */}
        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-govnavy-900 hover:bg-govnavy-800 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Browse Complete Service Catalog (20+ Services)</span>
            <ArrowRight className="w-4 h-4 text-brand-400" />
          </Link>
        </div>

      </div>
    </section>
  );
};
