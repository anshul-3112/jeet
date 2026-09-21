import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink, Shield } from 'lucide-react';
import { businessConfig } from '../../data/business';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-govnavy-950 text-slate-300 pt-14 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Banner with Marathi Tagline */}
        <div className="bg-govnavy-900/90 rounded-2xl p-6 mb-12 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-brand-500" />
            </div>
            <div>
              <p className="text-white font-bold text-base md:text-lg font-marathi">
                {businessConfig.taglineMr}
              </p>
              <p className="text-amber-400 text-xs md:text-sm font-medium font-marathi">
                {businessConfig.formsBannerMr}
              </p>
            </div>
          </div>
          <a
            href={`https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent('Hi Yash, I would like to get more information on e-governance services.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp 8055203555</span>
          </a>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: About Business */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo-badge.svg" alt="Jeet Digital Logo" className="w-12 h-12" />
              <div>
                <h3 className="text-white font-black text-lg tracking-tight">JEET DIGITAL</h3>
                <p className="text-xs text-amber-400 font-semibold tracking-wide">E-GOVERNANCE SEVA KENDRA</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footer.aboutText}
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Clock className="w-3.5 h-3.5" />
                <span>{businessConfig.hours}</span>
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-l-2 border-brand-500 pl-2">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-slate-400 hover:text-white transition-colors">
                  {t.nav.howItWorks}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-400 hover:text-white transition-colors">
                  {t.nav.faq}
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Services */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-l-2 border-brand-500 pl-2">
              {t.footer.servicesTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services/caste-validity" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1">
                  <span>★ Caste Validity (जात पडताळणी)</span>
                </Link>
              </li>
              <li>
                <Link to="/services/aadhaar-card" className="text-slate-400 hover:text-white transition-colors">
                  Aadhaar Card Services
                </Link>
              </li>
              <li>
                <Link to="/services/pan-card" className="text-slate-400 hover:text-white transition-colors">
                  PAN Card (New &amp; Correction)
                </Link>
              </li>
              <li>
                <Link to="/services/caste-certificate" className="text-slate-400 hover:text-white transition-colors">
                  Caste Certificate (जातीचा दाखला)
                </Link>
              </li>
              <li>
                <Link to="/services/income-certificate" className="text-slate-400 hover:text-white transition-colors">
                  Income Certificate (उत्पन्न दाखला)
                </Link>
              </li>
              <li>
                <Link to="/services/gumasta-shop-licence" className="text-slate-400 hover:text-white transition-colors">
                  Gumasta (Shop Act Licence)
                </Link>
              </li>
              <li>
                <Link to="/services/food-licence" className="text-slate-400 hover:text-white transition-colors">
                  FSSAI Food Licence
                </Link>
              </li>
              <li>
                <Link to="/services/online-admission-recruitment-forms" className="text-slate-400 hover:text-white transition-colors">
                  Online Recruitment &amp; Admission Forms
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Details & Location */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-l-2 border-brand-500 pl-2">
              {t.footer.contactInfo}
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Jeet Digital E-Governance</p>
                  <p className="text-slate-400">{businessConfig.address.street}</p>
                  <p className="text-slate-400">{businessConfig.address.landmark}</p>
                  <p className="text-slate-400">{businessConfig.address.city} - {businessConfig.address.pincode}</p>
                  <p className="text-slate-400 font-marathi text-[11px] mt-1">{businessConfig.address.fullMarathi}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <div>
                  <a href={`tel:${businessConfig.primaryPhone}`} className="text-white hover:text-brand-400 font-bold block">
                    {businessConfig.formattedPrimaryPhone} (Primary)
                  </a>
                  <a href={`tel:${businessConfig.alternatePhone}`} className="text-slate-400 hover:text-slate-200 block">
                    {businessConfig.formattedAlternatePhone} (Alt)
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <a href={`mailto:${businessConfig.email}`} className="text-slate-300 hover:text-white break-all">
                  {businessConfig.email}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={businessConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Get Directions on Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {businessConfig.name}. Yash Chopade. {t.footer.rights}</p>
          <div className="flex items-center space-x-4">
            <span className="text-slate-600">•</span>
            <span>Ayodhya Nagar, Nagpur</span>
            <span className="text-slate-600">•</span>
            <Link to="/privacy-policy" className="text-slate-400 hover:text-slate-200">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
