import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Menu, X, UploadCloud, CreditCard } from 'lucide-react';
import { businessConfig } from '../../data/business';
import { LanguageToggle } from '../common/LanguageToggle';
import { useLanguage } from '../../context/LanguageContext';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t, language } = useLanguage();

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.services, path: '/services' },
    { name: language === 'mr' ? 'कागदपत्रे अपलोड' : 'Upload Docs', path: '/upload', highlight: true },
    { name: language === 'mr' ? 'ऑनलाईन फी भरा' : 'Pay Online', path: '/pay', isPay: true },
    { name: language === 'mr' ? 'स्थिती तपासा' : 'Track Status', path: '/track' },
    { name: t.nav.howItWorks, path: '/how-it-works' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.contact, path: '/contact' },
    { name: t.nav.faq, path: '/faq' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-xs">
      {/* Top Notification & Utility Bar */}
      <div className="bg-[#0B3830] text-white text-xs py-2 px-4 border-b border-[#134E43]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-4">
          <div className="flex items-center space-x-4 text-emerald-100/90">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-medium text-white">
                {language === 'mr' ? 'अयोध्या नगर चौक, नागपूर-२४' : 'Ayodhya Nagar Square, Nagpur - 440024'}
              </span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 pl-3 border-l border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-300 font-semibold">{t.header.open24Hours}</span>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href={`tel:${businessConfig.primaryPhone}`}
              className="inline-flex items-center gap-1.5 text-white hover:text-amber-300 font-bold transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>{businessConfig.formattedPrimaryPhone}</span>
            </a>
            <span className="text-emerald-700 hidden sm:inline">|</span>
            <LanguageToggle />
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="glass-nav-warm border-b border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Business Logo & Name */}
            <Link to="/" className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden p-1 flex-shrink-0">
                <img
                  src="/logo.jpg"
                  alt="Jeet Digital E-Governance Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-black text-base md:text-lg text-slate-900 tracking-tight font-sans">
                    JEET DIGITAL
                  </span>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    आपले सरकार
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-700 tracking-tight">
                  E-Governance &amp; Document Seva Kendra
                </span>
                <span className="text-[11px] text-slate-500 font-medium leading-tight">
                  {language === 'mr' ? 'अयोध्या नगर, नागपूर-२४' : 'Ayodhya Nagar, Nagpur-24'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-150 ${
                    isActive(link.path)
                      ? 'text-[#0B3830] bg-emerald-50 border border-emerald-200 font-bold shadow-2xs'
                      : (link as any).isPay
                      ? 'text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 font-bold'
                      : link.highlight
                      ? 'text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50/60 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden sm:flex items-center space-x-2.5">
              <Link
                to="/pay"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold text-amber-950 bg-amber-100 hover:bg-amber-200/80 border border-amber-300 transition-all cursor-pointer shadow-2xs"
                title="Pay Service Fee Online via Razorpay"
              >
                <CreditCard className="w-3.5 h-3.5 text-amber-800" />
                <span>{language === 'mr' ? 'ऑनलाईन फी' : 'Quick Pay'}</span>
              </Link>

              <a
                href={`https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent('Hi Yash, I need assistance with e-governance / documentation services.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              <Link
                to="/upload"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-[#0B3830] hover:bg-[#134E43] shadow-sm hover:shadow active:scale-95 transition-all"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'कागदपत्रे पाठवा' : 'Upload Files'}</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden space-x-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-slate-800 hover:text-slate-950 hover:bg-slate-100 focus:outline-none cursor-pointer"
                aria-label="Open mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Navigation</span>
            <LanguageToggle />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                  isActive(link.path)
                    ? 'text-[#0B3830] bg-emerald-50 font-bold border border-emerald-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/pay"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 bg-amber-50 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-2xs"
            >
              <CreditCard className="w-4 h-4 text-amber-700" />
              <span>{language === 'mr' ? 'ऑनलाईन फी भरा (Razorpay)' : 'Pay Online (Razorpay)'}</span>
            </Link>

            <Link
              to="/upload"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 px-4 bg-[#0B3830] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
            >
              <UploadCloud className="w-4 h-4" />
              <span>{language === 'mr' ? 'कागदपत्रे अपलोड करा' : 'Upload Documents'}</span>
            </Link>

            <a
              href={`tel:${businessConfig.primaryPhone}`}
              className="w-full py-2.5 px-4 bg-slate-100 text-slate-800 hover:bg-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-700" />
              <span>Call: {businessConfig.formattedPrimaryPhone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
