import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { servicesData } from '../../data/services';
import { ServiceCard } from '../services/ServiceCard';
import { useLanguage } from '../../context/LanguageContext';

export const PopularServices: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Popular', nameMr: 'सर्व प्रमुख' },
    { id: 'certificates', name: 'Govt Certificates', nameMr: 'शासकीय दाखले' },
    { id: 'identity-travel', name: 'Identity & Travel', nameMr: 'ओळख व प्रवास' },
    { id: 'business-legal-financial', name: 'Business & Legal', nameMr: 'व्यवसाय व कायदेशीर' },
  ];

  const filteredServices = servicesData.filter((s) => {
    if (selectedCategory === 'all') return s.isPopular;
    return s.category === selectedCategory && s.isPopular;
  }).slice(0, 8); // 8 cards for a balanced 4-col desktop / 2-col tablet grid

  return (
    <section className="py-12 md:py-[72px] bg-[#FAF9F6] border-b border-slate-200/90">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Centered Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-[#0b3b32] border border-emerald-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'mr' ? 'शासकीय सेवांची अचूक पूर्तता' : 'Government Services Portfolio'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-sans mb-3">
            {language === 'mr' ? 'आमच्या प्रमुख सेवा' : 'Our Essential Services'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
            {language === 'mr'
              ? 'शासकीय आणि खाजगी कामांसाठी संपूर्ण मार्गदर्शन, अचूक कागदपत्रे व जलद प्रक्रिया.'
              : 'End-to-end guidance, verified checklists, and direct online submission for citizen and business documentation.'}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#0b3b32] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40'
                }`}
              >
                {language === 'mr' ? cat.nameMr : cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Service Cards Grid (Equal Heights: 4-col desktop, 2-col tablet, 1-col mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 items-stretch">
          {filteredServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        {/* Bottom CTA to view all catalog */}
        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-[#0b3b32] hover:bg-[#072722] text-white font-bold text-xs sm:text-sm transition-all shadow-xs hover:shadow active:scale-95 cursor-pointer"
          >
            <span>{language === 'mr' ? 'सर्व २०+ सेवांची यादी पहा' : 'View All 20+ Services Catalog'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
