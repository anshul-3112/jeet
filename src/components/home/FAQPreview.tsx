import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { faqData } from '../../data/faq';
import { useLanguage } from '../../context/LanguageContext';

export const FAQPreview: React.FC = () => {
  const { t, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Show first 5 FAQs on the homepage
  const previewFaqs = faqData.slice(0, 5);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200 mb-3">
            {t.faqSection.tag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-govnavy-900 tracking-tight">
            {t.faqSection.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            {t.faqSection.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {previewFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-govnavy-900 leading-snug">
                    {language === 'mr' ? faq.questionMr : faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-brand-50 text-brand-600' : 'text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fadeIn">
                    <p>{language === 'mr' ? faq.answerMr : faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View All FAQs Link */}
        <div className="mt-10 text-center">
          <Link
            to="/faq"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-govnavy-900 font-bold text-xs sm:text-sm border border-slate-200 shadow-sm transition-all"
          >
            <HelpCircle className="w-4 h-4 text-brand-600" />
            <span>View All Frequently Asked Questions</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>

      </div>
    </section>
  );
};
