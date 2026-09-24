import React from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const WhyChooseUs: React.FC = () => {
  const { language } = useLanguage();

  const benefits = language === 'mr' ? [
    'अधिकृत आणि शासकीय मान्यताप्राप्त सेवा केंद्र',
    'कमी वेळेत जलद सेवा',
    'चोवीस तास (24x7) सेवा उपलब्ध',
    'पारदर्शक प्रक्रिया आणि योग्य दर',
    'सर्व प्रकारची मदत आणि मार्गदर्शन'
  ] : [
    'Authorized E-Governance Seva Kendra',
    'Fast processing and quick turnaround',
    'Open 24/7 for emergency documentation',
    'Transparent pricing with no hidden fees',
    'Expert guidance on complex paperwork'
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Left Text & List */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
              {language === 'mr' 
                ? 'आमची निवड का करावी?' 
                : 'Why Choose Our Seva Kendra?'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
              {language === 'mr'
                ? 'शासकीय कामे वेळेत आणि योग्य पद्धतीने पूर्ण करण्यासाठी आमचे सेवा केंद्र नागपुरातील सर्वात विश्वसनीय केंद्र आहे.'
                : 'We ensure your government documentation and online forms are filed correctly the first time, saving you time and stress.'}
            </p>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded bg-brand-50 border border-slate-300">
                    <Check className="w-4 h-4 text-slate-700" />
                  </div>
                  <span className="text-slate-700 font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2">
            <div className="rounded-[40px] overflow-hidden aspect-square lg:aspect-[4/3] bg-slate-100 shadow-xl">
              <img 
                src="/hero-image.jpg" 
                alt="Seva Kendra Staff" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
