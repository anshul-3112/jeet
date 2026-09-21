import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Languages } from 'lucide-react';

export const LanguageToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      type="button"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
        language === 'mr'
          ? 'bg-amber-500/10 text-amber-900 border-amber-400/50 hover:bg-amber-500/20'
          : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
      } ${className}`}
      title="Switch Language / भाषा बदला"
      aria-label="Toggle language between English and Marathi"
    >
      <Languages className="w-3.5 h-3.5 text-brand-600" />
      <span className={language === 'en' ? 'font-bold text-brand-700' : 'text-slate-500'}>EN</span>
      <span className="text-slate-300">|</span>
      <span className={language === 'mr' ? 'font-bold text-amber-800 font-marathi' : 'text-slate-500 font-marathi'}>मराठी</span>
    </button>
  );
};
