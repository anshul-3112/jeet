import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  MapPin,
  Phone,
  Mail,
  Navigation,
  ExternalLink,
  Copy,
  Check,
  Compass,
  PhoneCall,
} from 'lucide-react';
import { businessConfig } from '../../data/business';
import { useLanguage } from '../../context/LanguageContext';

export const VisitOurKendraSection: React.FC = () => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const isMr = language === 'mr';

  const handleCopyAddress = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(
      `${businessConfig.name}\nBeside Lanjewar Cycle Stores, Ayodhya Nagar Chowk, Nagpur – 440024\nPhone: 8055203555, 8550977877\nEmail: digitalsevangp@gmail.com`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-12 md:py-[72px] bg-white border-b border-slate-200/90 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#f5b800]/15 text-[#92400E] border border-[#f5b800]/40 mb-3">
            <Compass className="w-3.5 h-3.5 text-[#B45309]" />
            <span>{isMr ? 'केंद्राचा अचूक पत्ता व थेट संपर्क' : 'Authorized Center Location'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-sans mb-3">
            {isMr ? 'आमच्या सेवा केंद्राला भेट द्या' : 'Visit Our Seva Kendra'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {isMr
              ? 'अयोध्या नगर चौकात लांजेवार सायकल स्टोअर्सच्या बाजूला प्रत्यक्ष भेटा किंवा थेट गुगल मॅप्सवर नेव्हिगेट करा.'
              : 'Located at Ayodhya Nagar Chowk, Nagpur. Walk in anytime for instant assistance or scan the QR code for live Google Maps directions.'}
          </p>
        </div>

        {/* 2-Column Responsive Grid (Stacks on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side: Shop details, phones, email, actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Shop Name & Status */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#0b3b32] text-xs font-bold border border-emerald-200 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{businessConfig.hours}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-sans">
                {businessConfig.name}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-amber-700 font-sans mt-0.5">
                {isMr ? 'यश चोपडे — अधिकृत आपले सरकार सेवा केंद्र' : 'Yash Chopade — Official Aaple Sarkar Seva Kendra'}
              </p>
            </div>

            {/* Info Cards Grid */}
            <div className="space-y-3">
              {/* Address Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#0b3b32] flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-emerald-700" />
                </div>
                <div className="text-xs sm:text-sm">
                  <span className="font-bold text-slate-900 block font-sans">
                    {isMr ? 'पत्ता (Address)' : 'Address'}
                  </span>
                  <p className="text-slate-700 font-medium mt-0.5 leading-relaxed">
                    Beside Lanjewar Cycle Stores, Ayodhya Nagar Chowk, Nagpur – 440024
                  </p>
                  <p className="text-slate-500 font-marathi text-xs mt-1 font-semibold">
                    लांजेवार सायकल स्टोअर्सच्या बाजूला, अयोध्यानगर चौक, नागपूर-२४
                  </p>
                </div>
              </div>

              {/* Phones Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#0b3b32] flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5 text-emerald-700" />
                </div>
                <div className="text-xs sm:text-sm flex-1">
                  <span className="font-bold text-slate-900 block font-sans">
                    {isMr ? 'संपर्क क्रमांक (Phone Numbers)' : 'Phone Numbers (24 Hours)'}
                  </span>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                    <a
                      href="tel:8055203555"
                      className="font-bold text-[#0b3b32] hover:text-[#072722] hover:underline text-sm sm:text-base inline-flex items-center gap-1"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-[#f5b800]" />
                      <span>8055203555</span>
                    </a>
                    <span className="text-slate-400">•</span>
                    <a
                      href="tel:8550977877"
                      className="font-bold text-slate-800 hover:text-[#0b3b32] hover:underline text-sm sm:text-base inline-flex items-center gap-1"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-[#f5b800]" />
                      <span>8550977877</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#0b3b32] flex-shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-emerald-700" />
                </div>
                <div className="text-xs sm:text-sm">
                  <span className="font-bold text-slate-900 block font-sans">
                    {isMr ? 'ईमेल (Email Address)' : 'Official Email'}
                  </span>
                  <a
                    href="mailto:digitalsevangp@gmail.com"
                    className="font-bold text-[#0b3b32] hover:underline break-all block mt-0.5"
                  >
                    digitalsevangp@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons: Get Directions & Call Now */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={businessConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-6 rounded-full bg-[#0b3b32] hover:bg-[#072722] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs hover:shadow active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                id="get-directions-btn"
              >
                <Navigation className="w-4 h-4 text-[#f5b800]" />
                <span>{isMr ? 'गुगल मॅप्सवर दिशा पहा' : 'Get Directions'}</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
              </a>

              <a
                href="tel:8055203555"
                className="h-12 px-6 rounded-full bg-white hover:bg-slate-50 text-[#0b3b32] border-2 border-[#0b3b32] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                id="call-now-btn"
              >
                <Phone className="w-4 h-4 text-[#0b3b32]" />
                <span>{isMr ? 'कॉल करा (8055203555)' : 'Call Now'}</span>
              </a>

              <button
                type="button"
                onClick={handleCopyAddress}
                className="h-12 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Copy Address & Contact Info"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">{isMr ? 'कॉपी झाले!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500" />
                    <span>{isMr ? 'पत्ता कॉपी' : 'Copy Info'}</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right Side: QR Code in White Rounded Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-elevated flex flex-col items-center justify-center text-center w-full max-w-sm relative group hover:shadow-2xl transition-all duration-300">
              
              {/* Top Accent Badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-[#0b3b32] border border-emerald-200 mb-5">
                <Navigation className="w-3.5 h-3.5 text-emerald-700" />
                <span>Google Maps GPS</span>
              </span>

              {/* QR Code Container Generated via qrcode.react */}
              <div className="p-4 bg-white rounded-2xl border-2 border-emerald-100 shadow-sm relative group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                <QRCodeSVG
                  value={businessConfig.googleMapsUrl}
                  size={190}
                  level="H"
                  includeMargin={false}
                  bgColor="#FFFFFF"
                  fgColor="#0b3b32"
                />
              </div>

              {/* Required Caption */}
              <h4 className="text-sm font-bold text-slate-900 mt-5 leading-snug font-sans">
                {isMr
                  ? 'गुगल मॅप्सवर लोकेशन पाहण्यासाठी स्कॅन करा'
                  : 'Scan to open location in Google Maps'}
              </h4>

              <p className="text-[11px] text-slate-500 mt-1 max-w-[220px]">
                {isMr
                  ? 'मोबाईल कॅमेरा किंवा Google Lens ने स्कॅन करून थेट केंद्रावर पोहोचा'
                  : 'Point your phone camera or Google Lens to launch live GPS turn-by-turn route'}
              </p>

              {/* Direct Link Under QR */}
              <div className="mt-4 pt-4 border-t border-slate-100 w-full flex items-center justify-center">
                <a
                  href={businessConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b3b32] hover:text-[#072722] hover:underline transition-colors"
                >
                  <span>{isMr ? 'थेट मॅप्स लिंक उघडा' : 'Open Direct Map Link'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
