import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MapPin, Menu, X, UploadCloud, CreditCard } from 'lucide-react';
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
    { name: t.nav.howItWorks, path: '/how-it-works' },
    { name: t.nav.trackStatus, path: '/track' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.contact, path: '/#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path === '/#contact' || path === '#contact') {
      if (location.pathname === '/') {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', '/#contact');
        }
      }
    }
  };

  const isActive = (path: string) => {
    if (path === '/#contact') return location.hash === '#contact';
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname === path || (path !== '/' && !path.includes('#') && location.pathname.startsWith(path));
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-xs">
      {/* Top Notification & Utility Bar */}
      <div className="bg-[#0b3b32] text-white text-xs py-1.5 px-4 border-b border-[#072722]">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center gap-2 sm:gap-4">
          <div className="flex items-center space-x-4 text-emerald-100/90 overflow-hidden">
            <span className="inline-flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#f5b800] flex-shrink-0" />
              <span className="font-medium text-white truncate text-[11px] sm:text-xs">
                {language === 'mr' ? 'अयोध्या नगर चौक, नागपूर-२४' : 'Ayodhya Nagar Square, Nagpur - 440024'}
              </span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 pl-3 border-l border-emerald-800 flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-300 font-semibold">{t.header.open24Hours}</span>
            </span>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            <a
              href={`tel:${businessConfig.primaryPhone}`}
              className="inline-flex items-center gap-1.5 text-white hover:text-[#f5b800] font-bold text-[11px] sm:text-xs transition-colors"
            >
              <Phone className="w-3 h-3 text-[#f5b800]" />
              <span>{businessConfig.formattedPrimaryPhone}</span>
            </a>
            <span className="text-emerald-700 hidden sm:inline">|</span>
            <LanguageToggle />
          </div>
        </div>
      </div>

      {/* Main Header Bar: Fixed 72px Height */}
      <div className="border-b border-slate-200/90 h-[72px] flex items-center bg-white/95 backdrop-blur-md">
        <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 flex justify-between items-center h-full">
          
          {/* Left: Compact Brand Block */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-[44px] h-[44px] rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden p-0.5 flex-shrink-0">
              <img
                src="/logo.jpg"
                alt="Jeet Digital Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight leading-tight font-sans whitespace-nowrap">
                  Jeet Digital
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#f5b800]/15 text-[#92400E] border border-[#f5b800]/40 whitespace-nowrap">
                  आपले सरकार
                </span>
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-600 tracking-tight whitespace-nowrap">
                E-Governance &amp; Document Seva Kendra
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation (>= 900px) */}
          <nav className="hidden min-[900px]:flex items-center gap-5 xl:gap-7 mx-4">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`text-xs xl:text-sm font-semibold whitespace-nowrap py-1 transition-all relative ${
                    active
                      ? 'text-[#0b3b32] font-bold after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[2px] after:bg-[#f5b800] after:rounded-full'
                      : 'text-slate-700 hover:text-[#0b3b32] hover:after:absolute hover:after:bottom-[-2px] hover:after:left-0 hover:after:right-0 hover:after:h-[2px] hover:after:bg-[#f5b800] hover:after:rounded-full'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Desktop Action Buttons (>= 900px) */}
          <div className="hidden min-[900px]:flex items-center gap-3 flex-shrink-0">
            <Link
              to="/pay"
              className="inline-flex items-center justify-center gap-1.5 h-[42px] px-4 rounded-full text-xs font-bold text-[#0b3b32] border-2 border-[#0b3b32] hover:bg-[#0b3b32]/5 transition-all cursor-pointer whitespace-nowrap"
              title="Pay Service Fee Online"
            >
              <CreditCard className="w-3.5 h-3.5 text-[#0b3b32]" />
              <span>{t.nav.payOnline}</span>
            </Link>

            <Link
              to="/upload"
              className="inline-flex items-center justify-center gap-1.5 h-[42px] px-5 rounded-full text-xs font-bold text-white bg-[#0b3b32] hover:bg-[#072722] shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>{t.nav.uploadDocuments}</span>
            </Link>
          </div>

          {/* Mobile/Tablet Header (< 900px): Upload button + Hamburger */}
          <div className="flex min-[900px]:hidden items-center gap-2">
            <Link
              to="/upload"
              className="inline-flex items-center justify-center gap-1.5 h-[38px] px-3.5 rounded-full text-xs font-bold text-white bg-[#0b3b32] hover:bg-[#072722] shadow-xs active:scale-95 transition-all whitespace-nowrap"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'अपलोड' : 'Upload'}</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-800 hover:text-slate-950 hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Slide-down Menu (< 900px) */}
      {mobileMenuOpen && (
        <div className="min-[900px]:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {language === 'mr' ? 'मेनू' : 'Navigation Menu'}
            </span>
            <LanguageToggle />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, link.path);
                }}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                  isActive(link.path)
                    ? 'text-[#0b3b32] bg-emerald-50 font-bold border border-emerald-200'
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
              className="w-full h-11 px-4 border-2 border-[#0b3b32] text-[#0b3b32] hover:bg-emerald-50 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-2xs"
            >
              <CreditCard className="w-4 h-4 text-[#0b3b32]" />
              <span>{t.nav.payOnline}</span>
            </Link>

            <Link
              to="/upload"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full h-11 px-4 bg-[#0b3b32] text-white rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
            >
              <UploadCloud className="w-4 h-4" />
              <span>{t.nav.uploadDocuments}</span>
            </Link>

            <a
              href={`tel:${businessConfig.primaryPhone}`}
              className="w-full h-10 px-4 bg-slate-100 text-slate-800 hover:bg-slate-200 rounded-full text-xs font-bold flex items-center justify-center gap-2"
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
