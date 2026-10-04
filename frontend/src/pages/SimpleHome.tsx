
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { UploadCloud, Search, Phone, Globe } from 'lucide-react';

export const SimpleHome: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <button 
        onClick={() => setLanguage(language === 'en' ? 'mr' : 'en')}
        className="absolute top-4 right-4 px-4 py-2 bg-white rounded-full shadow font-bold text-slate-700 flex items-center gap-2"
      >
        <Globe className="w-4 h-4" />
        {language === 'en' ? 'मराठी' : 'English'}
      </button>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-6 text-center border border-slate-100">
        <div className="w-20 h-20 bg-blue-600 text-white rounded-2xl mx-auto flex items-center justify-center text-3xl font-black shadow-lg shadow-blue-600/30">
          JD
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 leading-tight">
          {t.homeTitle}
        </h1>
        
        <p className="text-slate-500 font-medium pb-4">
          {language === 'mr' 
            ? 'सर्व शासकीय कामांसाठी व दाखल्यांसाठी संपर्क साधा.' 
            : 'Your one-stop center for all government documents.'}
        </p>

        <div className="flex flex-col gap-4">
          <Link to="/upload" className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-md transition-transform active:scale-95">
            <UploadCloud className="w-6 h-6" />
            {t.uploadBtn}
          </Link>
          
          <Link to="/track" className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 py-4 rounded-2xl font-bold text-lg transition-transform active:scale-95">
            <Search className="w-6 h-6 text-slate-400" />
            {t.trackBtn}
          </Link>

          <a href="tel:8055203555" className="w-full flex items-center justify-center gap-3 bg-green-50 hover:bg-green-100 text-green-700 py-4 rounded-2xl font-bold text-lg transition-transform active:scale-95">
            <Phone className="w-6 h-6 text-green-600" />
            {t.contactBtn} (8055203555)
          </a>
        </div>
      </div>
    </div>
  );
};
