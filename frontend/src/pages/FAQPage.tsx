import React, { useState, useMemo } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { faqData } from '../data/faq';
import { businessConfig } from '../data/business';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown, HelpCircle, Search, Phone, MessageCircle } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ['All', 'General', 'Caste Validity', 'Documents', 'Assistance', 'Services', 'Process'];

  const filteredFaqs = useMemo(() => {
    return faqData.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.questionMr.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.answerMr.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-12">
      <SEOHead
        title="Frequently Asked Questions (FAQ) | Jeet Digital Seva Kendra Nagpur"
        description="Find answers to common questions regarding government document requirements, Caste Validity procedure, turnaround time, online form filling, and WhatsApp assistance in Nagpur."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: language === 'mr' ? 'प्रश्नोत्तरे' : 'FAQ' }]} />

        {/* Page Header */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-10 mb-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'मदत व मार्गदर्शन' : 'Help & Answers'}</span>
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-govnavy-900 tracking-tight">
            {language === 'mr' ? 'वारंवार विचारले जाणारे प्रश्न' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about preparing documents, turnaround times, and applying for government certificates in Nagpur.
          </p>

          {/* Search Bar */}
          <div className="mt-6 relative max-w-lg mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your question (e.g. Caste Validity, WhatsApp, family...)"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-600 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-govnavy-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-3.5 mb-12">
            {filteredFaqs.map((faq, index) => {
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
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 animate-fadeIn">
                      <p>{language === 'mr' ? faq.answerMr : faq.answer}</p>
                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500 font-semibold">
                        <span className="text-brand-600">Category: {faq.category}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center mb-12">
            <p className="text-sm text-slate-600">No questions matched your search query.</p>
          </div>
        )}

        {/* Bottom Direct Help Card */}
        <div className="bg-govnavy-900 text-white rounded-3xl p-6 sm:p-8 text-center">
          <h3 className="text-lg sm:text-xl font-bold">Have a specific question not covered here?</h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
            Contact Yash Chopade directly. We are open 24 hours to help you with your documentation questions.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`tel:${businessConfig.primaryPhone}`}
              className="w-full sm:w-auto px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call {businessConfig.primaryPhone}</span>
            </a>

            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
