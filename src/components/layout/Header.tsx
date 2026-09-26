import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Clock, Menu, X } from 'lucide-react';
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
    { name: language === 'mr' ? 'कागदपत्रे अपलोड' : 'Upload Docs', path: '/upload' },
    { name: language === 'mr' ? 'स्थिती तपासा' : 'Track Status', path: '/track' },
    { name: t.nav.howItWorks, path: '/how-it-works' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.contact, path: '/contact' },
    { name: t.nav.faq, path: '/faq' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm">
      {/* Top Notification Strip */}
      <div className="bg-govnavy-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-4">
          <div className="flex items-center space-x-4 text-slate-300">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-500" />
              <span className="font-medium text-slate-200">
                {language === 'mr' ? 'अयोध्या नगर चौक, नागपूर-२४' : 'Ayodhya Nagar Square, Nagpur'}
              </span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300 font-semibold">{t.header.open24Hours}</span>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href={`tel:${businessConfig.primaryPhone}`}
              className="inline-flex items-center gap-1 text-slate-200 hover:text-white font-medium"
            >
              <Phone className="w-3 h-3 text-brand-400" />
              <span>{businessConfig.formattedPrimaryPhone}</span>
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <LanguageToggle />
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="glass-nav border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Business Logo & Name */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/logo-badge.svg"
                alt="Jeet Digital E-Governance Logo"
                className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-lg md:text-xl text-brand-600 tracking-tight">
                    JEET DIGITAL
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                    आपले सरकार
                  </span>
                </div>
                <span className="text-xs md:text-sm font-bold text-govnavy-900 tracking-tight leading-none">
                  E-Governance Seva Kendra
                </span>
                <span className="text-[10px] text-slate-500 font-medium leading-tight">
                  {language === 'mr' ? 'लांजेवार स्टोअर्सजवळ, नागपूर-२४' : 'Beside Balaji Jewelers, Nagpur'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 ${
                    isActive(link.path)
                      ? 'text-brand-600 bg-brand-50'
                      : 'text-slate-700 hover:text-brand-600 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden sm:flex items-center space-x-3">
              <a
                href={`https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent('Hi Yash, I need assistance with e-governance / documentation services.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-500 text-emerald-700" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${businessConfig.primaryPhone}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm hover:shadow active:scale-95 transition-all"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>Call {businessConfig.primaryPhone}</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden space-x-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:text-brand-600 hover:bg-slate-100 focus:outline-none"
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
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500">Navigation</span>
            <LanguageToggle />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-semibold text-left transition-colors ${
                  isActive(link.path)
                    ? 'text-brand-600 bg-brand-50 font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`tel:${businessConfig.primaryPhone}`}
              className="w-full py-2.5 px-4 bg-brand-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Primary: {businessConfig.formattedPrimaryPhone}</span>
            </a>
            <a
              href={`tel:${businessConfig.alternatePhone}`}
              className="w-full py-2 px-4 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              <span>Alternate: {businessConfig.formattedAlternatePhone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
