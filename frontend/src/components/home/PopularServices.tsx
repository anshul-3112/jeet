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
    { id: 'student', name: '12th Science & Students', nameMr: '१२ वी सायन्स व विद्यार्थी' },
    { id: 'certificates', name: 'Revenue Certificates', nameMr: 'महसूल दाखले' },
    { id: 'identity', name: 'Identity & Business', nameMr: 'ओळखपत्र व व्यवसाय' },
  ];

  const filteredServices = servicesData.filter((s) => {
    if (selectedCategory === 'all') return s.isPopular;
    if (selectedCategory === 'student') {
      return s.slug.includes('caste') || s.slug.includes('scholarship') || s.slug.includes('admission');
    }
    if (selectedCategory === 'certificates') {
      return s.slug.includes('income') || s.slug.includes('domicile') || s.slug.includes('non-creamy') || s.slug.includes('affidavit');
    }
    if (selectedCategory === 'identity') {
      return s.slug.includes('pan') || s.slug.includes('aadhaar') || s.slug.includes('gumasta') || s.slug.includes('food');
    }
    return s.isPopular;
  }).slice(0, 9);

  return (
    <section className="py-16 md:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-[#F2F8F6] text-[#113D36] border border-[#C2DDD4] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'शासकीय सेवांची अचूक पूर्तता' : 'Government Services Portfolio'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#152220] tracking-tight font-serif mb-4">
            {language === 'mr' ? 'आमच्या प्रमुख सेवा' : 'Our Essential Services'}
          </h2>
          <p className="text-[#4A5B57] text-base sm:text-lg leading-relaxed">
            {language === 'mr'
              ? 'शासकीय आणि खाजगी कामांसाठी संपूर्ण मार्गदर्शन, अचूक कागदपत्रे व जलद प्रक्रिया.'
              : 'End-to-end guidance, verified checklists, and direct submission for all your citizen and student needs.'}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#113D36] text-white shadow-xs'
                    : 'bg-white text-[#4A5B57] border border-[#EAE4DC] hover:border-[#113D36]/30'
                }`}
              >
                {language === 'mr' ? cat.nameMr : cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        {/* Bottom CTA to view all */}
        <div className="mt-14 text-center">
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#113D36] hover:bg-[#144A42] text-white font-bold text-sm transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg"
          >
            <span>{language === 'mr' ? 'सर्व २०+ सेवांची यादी पहा' : 'View All 20+ Services'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
