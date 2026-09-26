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
      <div className="glass-nav-warm border-b border-[#EAE4DC]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Business Logo & Name */}
            <Link to="/" className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 md:w-13 md:h-13 rounded-2xl bg-[#113D36] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform overflow-hidden p-2">
                <img
                  src="/logo-badge.svg"
                  alt="Jeet Digital Logo"
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base md:text-lg text-[#152220] tracking-tight font-sans">
                    JEET DIGITAL
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#F7EFE7] text-[#A86938] border border-[#EFDCB9]">
                    आपले सरकार
                  </span>
                </div>
                <span className="text-xs font-semibold text-[#4A5B57] tracking-tight">
                  E-Governance &amp; Document Seva Kendra
                </span>
                <span className="text-[10px] text-[#798C87] font-medium leading-tight">
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
                      ? 'text-[#113D36] bg-[#E2EFEA] font-bold shadow-xs'
                      : 'text-[#4A5B57] hover:text-[#113D36] hover:bg-[#F3EFEA]'
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
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-[#113D36] bg-[#F2F8F6] hover:bg-[#E2EFEA] border border-[#C2DDD4] transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-[#113D36] text-[#113D36]" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${businessConfig.primaryPhone}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-white bg-[#113D36] hover:bg-[#144A42] shadow-sm hover:shadow active:scale-95 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-white" />
                <span>Call Center</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden space-x-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-[#152220] hover:text-[#113D36] hover:bg-[#F3EFEA] focus:outline-none"
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
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#EAE4DC] shadow-xl px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="flex justify-between items-center py-2 border-b border-[#EAE4DC]">
            <span className="text-xs font-semibold text-[#798C87]">Navigation</span>
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
                    ? 'text-[#113D36] bg-[#E2EFEA] font-bold'
                    : 'text-[#4A5B57] hover:bg-[#F3EFEA]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-[#EAE4DC] flex flex-col gap-2">
            <a
              href={`tel:${businessConfig.primaryPhone}`}
              className="w-full py-2.5 px-4 bg-[#113D36] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Primary: {businessConfig.formattedPrimaryPhone}</span>
            </a>
            <a
              href={`tel:${businessConfig.alternatePhone}`}
              className="w-full py-2 px-4 bg-[#F3EFEA] text-[#152220] hover:bg-[#EAE4DC] rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#798C87]" />
              <span>Alternate: {businessConfig.formattedAlternatePhone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
