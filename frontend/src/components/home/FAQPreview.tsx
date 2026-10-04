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
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/90">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 mb-3">
            <span>{language === 'mr' ? 'नेहमी विचारले जाणारे प्रश्न' : 'Frequently Asked Questions'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-sans mb-4">
            {language === 'mr' ? 'काही शंका आहेत का?' : 'Common Queries Answered'}
          </h2>
          <p className="text-base text-slate-600 max-w-xl mx-auto">
            {language === 'mr'
              ? 'कास्ट व्हॅलिडिटी, उत्पन्नाचा दाखला आणि सेवांबद्दल नागरिकांनी विचारलेले महत्त्वाचे प्रश्न.'
              : 'Clear answers on required proofs, turnaround windows, privacy guarantees, and government charges.'}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
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
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug font-sans">
                    {language === 'mr' ? faq.questionMr : faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#0B3830] text-white' : 'bg-slate-200/80 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-2 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200/80 animate-fadeIn">
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
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#0B3830] font-bold text-xs sm:text-sm border border-slate-200 hover:border-emerald-300 shadow-xs transition-all cursor-pointer"
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
