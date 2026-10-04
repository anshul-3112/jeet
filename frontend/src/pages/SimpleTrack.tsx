
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SimpleTrack: React.FC = () => {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8 mt-10 text-center border border-slate-100">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 font-semibold mb-6 self-start mr-auto">
          <ArrowLeft className="w-4 h-4" /> {language === 'mr' ? 'मागे' : 'Back'}
        </Link>
        
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Tracking Status</h1>
        
        {id ? (
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <p className="text-blue-600 font-bold mb-2">Tracking ID</p>
            <p className="text-3xl font-black text-slate-900 tracking-widest">{id}</p>
            <p className="mt-4 text-slate-700 font-medium">Status: <b>Received</b></p>
            <p className="mt-2 text-sm text-slate-500">We will notify you when it's ready.</p>
          </div>
        ) : (
          <p className="text-slate-500">No tracking ID provided.</p>
        )}
      </div>
    </div>
  );
};
