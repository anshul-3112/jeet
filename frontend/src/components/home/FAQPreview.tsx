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
    <section className="py-16 md:py-24 bg-white border-t border-[#EAE4DC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-[#F7EFE7] text-[#A86938] border border-[#EFDCB9] mb-3">
            <span>{language === 'mr' ? 'नेहमी विचारले जाणारे प्रश्न' : 'Frequently Asked Questions'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#152220] tracking-tight font-serif mb-4">
            {language === 'mr' ? 'काही शंका आहेत का?' : 'Common Queries Answered'}
          </h2>
          <p className="text-base text-[#4A5B57] max-w-xl mx-auto">
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
                className="bg-[#FAF8F5] rounded-2xl border border-[#EAE4DC] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[#152220] leading-snug font-sans">
                    {language === 'mr' ? faq.questionMr : faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#113D36] text-white' : 'bg-[#F3EFEA] text-[#798C87]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-2 text-xs sm:text-sm text-[#4A5B57] leading-relaxed border-t border-[#EAE4DC]/60 animate-fadeIn">
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#FAF8F5] text-[#113D36] font-bold text-xs sm:text-sm border border-[#EAE4DC] hover:border-[#113D36]/30 shadow-xs transition-all"
          >
            <HelpCircle className="w-4 h-4 text-[#113D36]" />
            <span>{language === 'mr' ? 'सर्व वारंवार विचारले जाणारे प्रश्न पहा' : 'View All Frequently Asked Questions'}</span>
            <ArrowRight className="w-4 h-4 text-[#798C87]" />
          </Link>
        </div>

      </div>
    </section>
  );
};
