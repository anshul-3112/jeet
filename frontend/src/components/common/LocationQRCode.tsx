import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  ExternalLink,
  QrCode,
  Copy,
  Check,
  Smartphone,
  Compass
} from 'lucide-react';
import { businessConfig } from '../../data/business';
import { useLanguage } from '../../context/LanguageContext';

interface LocationQRCodeProps {
  variant?: 'card' | 'compact' | 'banner';
  className?: string;
  showTitle?: boolean;
}

export const LocationQRCode: React.FC<LocationQRCodeProps> = ({
  variant = 'card',
  className = '',
  showTitle = true,
}) => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(businessConfig.googleMapsUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isMr = language === 'mr';

  // Compact Variant (e.g. for Footer, Small Sidebars)
  if (variant === 'compact') {
    return (
      <div className={`p-4 rounded-2xl bg-[#122A24] border border-[#1B4239] text-slate-200 shadow-md ${className}`}>
        <div className="flex items-center gap-3">
          <div className="relative group/qr flex-shrink-0 bg-white p-2 rounded-xl border border-slate-700 shadow-sm transition-transform duration-200 hover:scale-105">
            <img
              src={businessConfig.locationQrImage}
              alt="Scan QR for Net Cafe Location"
              className="w-16 h-16 object-contain rounded"
              loading="lazy"
            />
            <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-0.5 rounded-full shadow-xs">
              <Navigation className="w-2.5 h-2.5" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-0.5">
              <QrCode className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>{isMr ? 'केंद्राचे लोकेशन QR' : 'Center Location QR'}</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-tight mb-2">
              {isMr
                ? 'कॅमेऱ्याने स्कॅन करा व थेट गुगल मॅप्सवर या'
                : 'Scan with phone camera to navigate directly on Google Maps'}
            </p>
            <div className="flex items-center gap-2">
              <a
                href={businessConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-amber-200 transition-colors"
              >
                <span>{isMr ? 'मॅप्स उघडा' : 'Open Maps'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-slate-600">•</span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Copy Google Maps link"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">{isMr ? 'कॉपी झाले!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>{isMr ? 'लिंक कॉपी' : 'Copy'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Banner Variant (Horizontal strip)
  if (variant === 'banner') {
    return (
      <div
        className={`relative overflow-hidden rounded-3xl bg-[#0B3830] text-white p-6 sm:p-8 border border-[#134E43] shadow-md ${className}`}
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 text-amber-300 mt-1">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/10 text-emerald-200 border border-white/20 mb-2">
                <MapPin className="w-3 h-3 text-amber-300" />
                <span>Ayodhya Nagar, Nagpur</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black tracking-tight font-sans">
                {isMr ? 'केंद्राचा अचूक पत्ता व थेट GPS नेव्हिगेशन' : 'Live GPS Navigation & Location QR Code'}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-xl leading-relaxed">
                {businessConfig.address.fullEnglish}
              </p>
              <p className="text-xs text-amber-300 font-marathi mt-1 font-bold">
                {businessConfig.address.fullMarathi}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-3.5 rounded-3xl border border-white/15 flex-shrink-0">
            <div className="bg-white p-2 rounded-2xl shadow-lg">
              <img
                src={businessConfig.locationQrImage}
                alt="Jeet Digital Seva Kendra Location QR Code"
                className="w-24 h-24 object-contain rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-white block">
                {isMr ? 'फोनने स्कॅन करा:' : 'Scan to Navigate:'}
              </span>
              <a
                href={businessConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{isMr ? 'मॅप उघडा' : 'Google Maps'}</span>
              </a>
              <button
                type="button"
                onClick={handleCopyLink}
                className="block w-full text-center text-[10px] text-emerald-200 hover:text-white transition-colors cursor-pointer py-1 font-semibold"
              >
                {copied ? '✓ Link Copied' : 'Copy Map Link'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default 'card' Variant (Detailed interactive card)
  return (
    <div
      className={`bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-8 relative overflow-hidden transition-all duration-300 hover:shadow-elevated ${className}`}
    >
      {/* Decorative subtle background gradient blob */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-50/60 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

      {showTitle && (
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0B3830] flex items-center justify-center border border-emerald-200">
              <Navigation className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight font-sans">
                {isMr ? 'केंद्राचे लोकेशन QR कोड' : 'Center Location QR Code'}
              </h3>
              <p className="text-xs text-slate-500">
                {isMr
                  ? 'स्कॅन करून थेट केंद्रावर पोहोचा'
                  : 'Scan for direct Google Maps turn-by-turn directions'}
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <Smartphone className="w-3 h-3 text-emerald-600" />
            <span>{isMr ? 'कॅमेरा स्कॅन' : 'Mobile Ready'}</span>
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
        {/* QR Visual Showcase (5 cols) */}
        <div className="sm:col-span-5 flex flex-col items-center justify-center">
          <div className="relative p-3 bg-gradient-to-b from-white to-slate-50 rounded-3xl border-2 border-emerald-200 shadow-md group transition-transform duration-300 hover:scale-[1.02]">
            <img
              src={businessConfig.locationQrImage}
              alt="Jeet Digital Net Cafe Google Maps Location QR"
              className="w-36 h-36 sm:w-40 sm:h-40 object-contain rounded-2xl bg-white"
            />

            <div className="mt-2 text-center">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#0B3830] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <QrCode className="w-3 h-3" />
                <span>Google Maps GPS</span>
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 text-center mt-2.5 max-w-[200px] leading-tight">
            {isMr
              ? 'मोबाईल कॅमेरा किंवा Google Lens ने स्कॅन करा'
              : 'Point phone camera or Google Lens at this QR to open route'}
          </p>
        </div>

        {/* Address Details & Action Buttons (7 cols) */}
        <div className="sm:col-span-7 space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B3830]">
              <MapPin className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>{businessConfig.name}</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              {businessConfig.address.street}, {businessConfig.address.city} - {businessConfig.address.pincode}
            </p>
            <p className="text-xs text-slate-600">
              <span className="font-semibold text-slate-700">Landmark:</span> {businessConfig.address.landmark}
            </p>
            <p className="text-xs text-[#0B3830] font-marathi pt-1 border-t border-slate-100 font-bold">
              {businessConfig.address.fullMarathi}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <a
              href={businessConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0B3830] hover:bg-[#134E43] text-white font-bold text-xs sm:text-sm transition-all shadow-sm hover:shadow-md flex-1 sm:flex-initial cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-amber-300" />
              <span>{isMr ? 'गुगल मॅप्सवर उघडा' : 'Open in Google Maps'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
            </a>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              title="Copy link to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">{isMr ? 'कॉपी झाले!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>{isMr ? 'लिंक कॉपी' : 'Copy Link'}</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open 24 Hours • Fast Internet &amp; Online Forms Help</span>
          </div>
        </div>
      </div>
    </div>
  );
};
