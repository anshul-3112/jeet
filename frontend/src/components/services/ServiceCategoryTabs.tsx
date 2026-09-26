import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface ServiceCategoryTabsProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  counts: Record<string, number>;
}

export const ServiceCategoryTabs: React.FC<ServiceCategoryTabsProps> = ({
  activeCategory,
  onSelectCategory,
  counts
}) => {
  const { language } = useLanguage();

  const tabs: { id: string; label: string; labelMr: string }[] = [
    { id: 'all', label: 'All Services', labelMr: 'सर्व सेवा' },
    { id: 'identity-travel', label: 'Identity & Travel', labelMr: 'ओळख व प्रवास' },
    { id: 'certificates', label: 'Govt Certificates', labelMr: 'शासकीय दाखले' },
    { id: 'business-legal-financial', label: 'Business & Legal', labelMr: 'व्यवसाय व इतर' }
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
      {tabs.map((tab) => {
        const isActive = activeCategory === tab.id;
        const count = counts[tab.id] || 0;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectCategory(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{language === 'mr' ? tab.labelMr : tab.label}</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
