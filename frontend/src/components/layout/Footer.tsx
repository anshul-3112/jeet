import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, MessageCircle, Shield, ArrowRight } from 'lucide-react';
import { businessConfig } from '../../data/business';
import { useLanguage } from '../../context/LanguageContext';
import { LocationQRCode } from '../common/LocationQRCode';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-[#0B1513] text-slate-300 pt-14 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Banner with Aaple Sarkar Tagline */}
        <div className="bg-[#122A24] rounded-3xl p-6 sm:p-8 mb-12 border border-[#1B4239] flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0">
              <Shield className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <p className="text-white font-bold text-base sm:text-lg font-marathi">
                {businessConfig.taglineMr}
              </p>
              <p className="text-amber-300 text-xs sm:text-sm font-medium font-marathi mt-0.5">
                {businessConfig.formsBannerMr}
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent('Hi Yash, I would like to get more information on e-governance services.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp: {businessConfig.primaryPhone}</span>
          </a>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: About Business */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white border border-emerald-600/40 p-1 flex items-center justify-center overflow-hidden shadow-sm flex-shrink-0">
                <img src="/logo.jpg" alt="Jeet Digital Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-white font-black text-lg tracking-tight font-sans">JEET DIGITAL</h3>
                <p className="text-[11px] text-amber-400 font-bold tracking-wider uppercase">E-GOVERNANCE SEVA KENDRA</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {t.footer.aboutText}
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{businessConfig.hours}</span>
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-4 border-l-2 border-emerald-500 pl-2">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>{t.nav.home}</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>{t.nav.services}</span>
                </Link>
              </li>
              <li>
                <Link to="/upload" className="text-amber-300 hover:text-amber-200 font-bold transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                  <span>{language === 'mr' ? 'कागदपत्रे अपलोड करा' : 'Upload Documents'}</span>
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>{language === 'mr' ? 'स्थिती तपासा' : 'Track Application Status'}</span>
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>{t.nav.howItWorks}</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>{t.nav.about}</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>{t.nav.contact}</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>{t.nav.faq}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Services */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-4 border-l-2 border-emerald-500 pl-2">
              {t.footer.servicesTitle}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/services/caste-validity" className="text-amber-300 hover:text-amber-200 font-bold transition-colors">
                  ★ 12th Science Caste Validity (जात पडताळणी)
                </Link>
              </li>
              <li>
                <Link to="/services/aadhaar-card" className="text-slate-300 hover:text-white transition-colors">
                  Aadhaar Card Services
                </Link>
              </li>
              <li>
                <Link to="/services/pan-card" className="text-slate-300 hover:text-white transition-colors">
                  PAN Card (New &amp; Correction)
                </Link>
              </li>
              <li>
                <Link to="/services/income-certificate" className="text-slate-300 hover:text-white transition-colors">
                  Income Certificate (उत्पन्न दाखला)
                </Link>
              </li>
              <li>
                <Link to="/services/domicile-certificate" className="text-slate-300 hover:text-white transition-colors">
                  Domicile &amp; Nationality Certificate
                </Link>
              </li>
              <li>
                <Link to="/services/gumasta-shop-licence" className="text-slate-300 hover:text-white transition-colors">
                  Gumasta (Shop Act Licence)
                </Link>
              </li>
              <li>
                <Link to="/services/food-licence" className="text-slate-300 hover:text-white transition-colors">
                  FSSAI Food Licence
                </Link>
              </li>
              <li>
                <Link to="/services/online-admission-recruitment-forms" className="text-slate-300 hover:text-white transition-colors">
                  Online Recruitment &amp; Admission Forms
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Details & Location QR */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase border-l-2 border-emerald-500 pl-2">
              {t.footer.contactInfo}
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-bold">Jeet Digital E-Governance</p>
                  <p className="text-slate-300">{businessConfig.address.street}</p>
                  <p className="text-slate-400">{businessConfig.address.landmark}</p>
                  <p className="text-slate-400">{businessConfig.address.city} - {businessConfig.address.pincode}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <a href={`tel:${businessConfig.primaryPhone}`} className="text-white hover:text-amber-300 font-bold block">
                    {businessConfig.formattedPrimaryPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href={`mailto:${businessConfig.email}`} className="text-slate-300 hover:text-white break-all">
                  {businessConfig.email}
                </a>
              </div>
            </div>

            {/* Location QR Component in Footer */}
            <LocationQRCode variant="compact" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {businessConfig.name}. Yash Chopade. {t.footer.rights}</p>
          <div className="flex items-center space-x-4">
            <span>Ayodhya Nagar, Nagpur</span>
            <span className="text-slate-700">•</span>
            <Link to="/privacy-policy" className="text-slate-400 hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
