import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Clock, ShieldCheck, UserCheck, ArrowRight } from 'lucide-react';
import { businessConfig } from '../data/business';
import { useLanguage } from '../context/LanguageContext';

export const AboutPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-8 md:py-12">
      <SEOHead
        title="About Jeet Digital E-Governance Seva Kendra | Nagpur"
        description="Learn about Yash Chopade and Jeet Digital E-Governance Seva Kendra in Ayodhya Nagar, Nagpur. Transparent, accessible, and hassle-free government documentation assistance. Open 24 Hours."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: language === 'mr' ? 'आमच्याबद्दल' : 'About Us' }]} />

        {/* Hero Banner */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>आपले सरकार सेवा केंद्र • नागपूर-२४</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight font-sans">
                {language === 'mr'
                  ? 'जीत डिजिटल ई-गव्हर्नन्स सेवा केंद्र, नागपूर'
                  : 'About Jeet Digital E-Governance Seva Kendra'}
              </h1>

              <p className="text-sm sm:text-base font-bold text-[#0B3830] font-marathi">
                {businessConfig.taglineMr}
              </p>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-2 font-normal">
                {businessConfig.bio}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{businessConfig.hours}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
                  <UserCheck className="w-3.5 h-3.5 text-slate-600" />
                  <span>Lead: {businessConfig.owner}</span>
                </span>
              </div>
            </div>

            {/* Emblem / Badge Visual */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative p-6 bg-slate-50 rounded-3xl border border-slate-200 shadow-inner text-center max-w-xs w-full">
                <div className="w-28 h-28 mx-auto rounded-3xl bg-white border border-slate-200 p-2 mb-4 flex items-center justify-center shadow-md overflow-hidden">
                  <img
                    src="/logo.jpg"
                    alt="Jeet Digital Official Emblem"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-sans">
                  JEET DIGITAL
                </h3>
                <p className="text-xs text-amber-700 font-bold">E-Governance Seva Kendra</p>
                <p className="text-[11px] text-slate-600 mt-1 font-marathi">
                  {businessConfig.address.fullMarathi}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Mission & Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#0B3830] flex items-center justify-center font-bold text-sm border border-emerald-200">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {language === 'mr' ? 'नागरिकांसाठी सुलभ प्रवेश' : 'Citizen-Centric Accessibility'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              We eliminate procedural complexity and technical barriers so every citizen, student, and senior citizen can effortlessly access government schemes and documentation.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm border border-blue-200">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {language === 'mr' ? '२४ तास उपलब्धता' : '24-Hour Availability'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Recognizing that students and working professionals often face tight admission deadlines or urgent legal filing dates, our assistance is available 24/7.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm border border-amber-200">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {language === 'mr' ? 'अचूकता व खात्रीशीर काम' : 'Accuracy & Verification'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              From assembling complex family tree records for Caste Validity to drafting legally sound affidavits, we verify every detail to prevent application rejection.
            </p>
          </div>

        </div>

        {/* Location & Contact Snapshot */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-10 mb-12">
          <h2 className="text-xl font-black text-slate-900 mb-6 font-sans">
            Official Location &amp; Contact Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="space-y-1 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-400 uppercase font-bold text-[10px] block">Center Address</span>
              <p className="font-bold text-slate-800">{businessConfig.address.fullEnglish}</p>
              <p className="text-slate-500 font-marathi text-[11px] mt-1">{businessConfig.address.fullMarathi}</p>
            </div>

            <div className="space-y-1 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-400 uppercase font-bold text-[10px] block">Primary Phone / WhatsApp</span>
              <p className="font-bold text-[#0B3830] text-sm">{businessConfig.formattedPrimaryPhone}</p>
              <span className="text-slate-400 uppercase font-bold text-[10px] block mt-2">Alternate Phone</span>
              <p className="font-bold text-slate-700">{businessConfig.formattedAlternatePhone}</p>
            </div>

            <div className="space-y-1 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-400 uppercase font-bold text-[10px] block">Official Email</span>
              <p className="font-bold text-slate-800 break-all">{businessConfig.email}</p>
              <span className="text-slate-400 uppercase font-bold text-[10px] block mt-2">Owner / Lead</span>
              <p className="font-bold text-slate-700">{businessConfig.owner}</p>
            </div>

            <div className="space-y-1 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-400 uppercase font-bold text-[10px] block">Business Hours</span>
              <p className="font-bold text-emerald-700">{businessConfig.hours}</p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 text-[#0B3830] hover:underline font-bold"
                >
                  <span>Go to Contact Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
