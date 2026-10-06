import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { faqData } from '../../data/faq';
import { useLanguage } from '../../context/LanguageContext';

export const FAQPreview: React.FC = () => {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const previewFaqs = faqData.slice(0, 5);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-12 md:py-[72px] bg-white border-b border-slate-200/90">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 mb-3">
            <span>{language === 'mr' ? 'नेहमी विचारले जाणारे प्रश्न' : 'Frequently Asked Questions'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-sans mb-3">
            {language === 'mr' ? 'काही शंका आहेत का?' : 'Common Queries Answered'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {language === 'mr'
              ? 'जात पडताळणी, उत्पन्न दाखला आणि सेवांबद्दल नागरिकांनी विचारलेले महत्त्वाचे प्रश्न.'
              : 'Clear answers on required proofs, turnaround windows, privacy guarantees, and government charges.'}
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3">
          {previewFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className="bg-[#FAF9F6] rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug font-sans">
                    {language === 'mr' ? faq.questionMr : faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#0b3b32] text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-2 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200/80 bg-white">
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
            className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-white hover:bg-slate-50 text-[#0b3b32] font-bold text-xs sm:text-sm border border-slate-200 hover:border-emerald-300 shadow-2xs transition-all cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-emerald-700" />
            <span>{language === 'mr' ? 'सर्व वारंवार विचारले जाणारे प्रश्न पहा' : 'View All Frequently Asked Questions'}</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>

      </div>
    </section>
  );
};
