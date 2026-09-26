import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { servicesData } from '../../data/services';
import { ServiceCard } from '../services/ServiceCard';
import { useLanguage } from '../../context/LanguageContext';

export const PopularServices: React.FC = () => {
  const { language } = useLanguage();

  // Filter popular services for the homepage grid
  const popularServices = servicesData.filter((s) => s.isPopular).slice(0, 9);

  return (
    <section className="py-16 md:py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            {language === 'mr' ? 'आमच्या प्रमुख सेवा' : 'Our Essential Services'}
          </h2>
          <p className="text-slate-600 text-lg">
            {language === 'mr'
              ? 'शासकीय आणि खाजगी कामांसाठी संपूर्ण मार्गदर्शन आणि कागदपत्रांची पूर्तता.'
              : 'Complete documentation and processing solutions designed for all your government and private needs.'}
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        {/* Bottom CTA to view all */}
        <div className="mt-16 text-center">
          <Link
            to="/services"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all hover:-translate-y-0.5 shadow-lg shadow-slate-200"
          >
            <span>View All Services</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>

      </div>
    </section>
  );
};
