import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { Home, Layers, Phone, MessageCircle, AlertTriangle } from 'lucide-react';
import { businessConfig } from '../data/business';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] bg-[#FAF9F6] py-16 flex items-center justify-center">
      <SEOHead
        title="Page Not Found (404) | Jeet Digital Seva Kendra"
        description="The page you are looking for does not exist."
        noIndex={true}
      />

      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-6 shadow-soft border border-amber-200">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-200 text-slate-800 uppercase tracking-widest mb-3">
          Error 404
        </span>

        <h1 className="text-3xl font-black text-slate-900 tracking-tight font-sans">
          That page doesn't exist.
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed">
          The link you followed may be broken or the page may have been moved. Let's get you back on track!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3.5 bg-[#0B3830] hover:bg-[#134E43] text-white rounded-full text-xs sm:text-sm font-bold shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>

          <Link
            to="/services"
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-full text-xs sm:text-sm font-bold shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Layers className="w-4 h-4 text-emerald-700" />
            <span>Browse Services</span>
          </Link>
        </div>

        {/* Quick Contact Option */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-bold text-slate-500">
          <a
            href={`tel:${businessConfig.primaryPhone}`}
            className="hover:text-[#0B3830] flex items-center gap-1"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-700" />
            <span>Call: {businessConfig.primaryPhone}</span>
          </a>
          <span>•</span>
          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-700 flex items-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>WhatsApp Us</span>
          </a>
        </div>

      </div>
    </div>
  );
};
