import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { businessConfig } from '../../data/business';
import { getGeneralWhatsAppUrl } from '../../utils/whatsapp';
import { useLanguage } from '../../context/LanguageContext';

export const HeroSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-govnavy-900 via-govnavy-950 to-slate-900 text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-brand-600/15 via-amber-500/10 to-blue-600/15 blur-3xl pointer-events-none" />
      <div className="absolute -top-24 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Location & 24H Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white">
              {language === 'mr' ? (
                <span>
                  सर्व शासकीय आणि खाजगी सेवा <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-amber-300 to-amber-400">
                    एकाच छताखाली उपलब्ध
                  </span>
                </span>
              ) : (
                <span>
                  Government &amp; Private Documentation <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-amber-300 to-amber-400">
                    Made Simple &amp; Fast in Nagpur
                  </span>
                </span>
              )}
            </h1>

            {/* Marathi / English Authentic Tagline Banner */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 backdrop-blur-sm">
              <p className="text-sm sm:text-base font-medium text-amber-200 font-marathi">
                {businessConfig.taglineMr}
              </p>
              <p className="text-xs text-slate-300 mt-1">
                {language === 'mr'
                  ? businessConfig.formsBannerMr
                  : 'Aadhaar, PAN, Caste Validity, Certificates, Licences, Affidavits & Online Forms.'}
              </p>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href={`tel:${businessConfig.primaryPhone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm sm:text-base shadow-cta transition-all hover:scale-[1.02] active:scale-[0.98]"
                id="hero-call-cta"
              >
                <Phone className="w-5 h-5 text-white" />
                <span>{t.hero.callCta} ({businessConfig.primaryPhone})</span>
              </a>

              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-soft transition-all hover:scale-[1.02] active:scale-[0.98]"
                id="hero-whatsapp-cta"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>{t.hero.whatsappCta}</span>
              </a>
            </div>

            {/* Secondary CTA Links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-slate-400">
              <Link to="/services" className="inline-flex items-center gap-1 text-slate-300 hover:text-white font-semibold underline underline-offset-4">
                <span>View all 20+ services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span>•</span>
              <Link to="/services/caste-validity" className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-semibold">
                <span>Caste Validity Checklist</span>
              </Link>
            </div>
          </div>

          {/* Right Hero Card / Fast Info Box (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl text-slate-100 space-y-5">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center gap-3">
                  <img src="/logo-badge.svg" alt="Jeet Digital Seva Kendra" className="w-12 h-12" />
                  <div>
                    <h2 className="text-sm font-black text-white uppercase tracking-wider">
                      JEET DIGITAL
                    </h2>
                    <p className="text-xs text-amber-300 font-semibold">Seva Kendra • Nagpur-24</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500 text-white">
                    OPEN 24H
                  </span>
                </div>
              </div>

              {/* Quick Trust Checklist */}
              <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Authorized E-Governance</strong> services under Aaple Sarkar portal</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>12th Science &amp; Diploma</strong> Caste Validity document dossier guidance</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Online Form Filling</strong> for Admissions, MPSC, Police &amp; Banking exams</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Ayodhya Nagar Square</strong> beside Balaji Jewelers &amp; Lanjewar Stores</span>
                </li>
              </ul>

              {/* Contact Snapshot Pill */}
              <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Owner / Contact</span>
                  <span className="text-white font-bold">{businessConfig.owner}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase">Direct Assistance</span>
                  <a href={`tel:${businessConfig.primaryPhone}`} className="text-brand-300 hover:text-white font-bold">
                    {businessConfig.formattedPrimaryPhone}
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
