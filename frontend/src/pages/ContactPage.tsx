import React, { useState } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { EnquiryForm } from '../components/forms/EnquiryForm';
import { LocationQRCode } from '../components/common/LocationQRCode';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Navigation
} from 'lucide-react';
import { businessConfig } from '../data/business';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import { useLanguage } from '../context/LanguageContext';

export const ContactPage: React.FC = () => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    const fullText = `${businessConfig.name}\n${businessConfig.address.fullEnglish}\nLandmark: ${businessConfig.address.landmark}\nPhone: ${businessConfig.primaryPhone}, ${businessConfig.alternatePhone}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-8 md:py-12">
      <SEOHead
        title="Contact Us & Location | Jeet Digital E-Governance Seva Kendra Nagpur"
        description="Contact Yash Chopade at Jeet Digital E-Governance Seva Kendra, Ayodhya Nagar Square, Nagpur. Phone: 8055203555 / 8550977877. Scan QR for live GPS directions on Google Maps. Open 24 Hours."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: language === 'mr' ? 'संपर्क' : 'Contact' }]} />

        {/* Page Header */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-10 mb-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#0B3830] border border-emerald-200 mb-3">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>Ayodhya Nagar, Nagpur • Open 24 Hours</span>
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight font-sans">
              {language === 'mr' ? 'केंद्राचा संपर्क पत्ता, QR व माहिती' : 'Contact, Location & Navigation QR'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
              Have questions regarding document requirements, form submissions, or affidavits? Call, WhatsApp, scan the location QR, or visit us in Ayodhya Nagar, Nagpur anytime.
            </p>
          </div>
        </div>

        {/* 2-Column Layout: Left (Contact Cards & Directions) & Right (Enquiry Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column (7 cols): Contact Cards, Location QR & Map Navigation */}
          <div className="lg:col-span-7 space-y-6">

            {/* Featured Location QR Code Card */}
            <LocationQRCode variant="card" showTitle={true} />
            
            {/* Primary & Alternate Phone Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 font-sans">
                <Phone className="w-5 h-5 text-emerald-700" />
                <span>Phone &amp; WhatsApp Support (24 Hours)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Primary Number */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 block">
                    Primary Contact &amp; WhatsApp
                  </span>
                  <a
                    href={`tel:${businessConfig.primaryPhone}`}
                    className="text-base font-black text-[#0B3830] hover:text-emerald-800 block mt-0.5"
                  >
                    {businessConfig.formattedPrimaryPhone}
                  </a>
                  <p className="text-[11px] text-slate-600 mt-1 font-medium">Yash Chopade (Direct)</p>
                  
                  <div className="mt-3 flex items-center gap-2">
                    <a
                      href={`tel:${businessConfig.primaryPhone}`}
                      className="px-3.5 py-1.5 bg-[#0B3830] hover:bg-[#134E43] text-white rounded-full text-xs font-bold transition-colors cursor-pointer"
                    >
                      Call Now
                    </a>
                    <a
                      href={getGeneralWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-emerald-600 text-white rounded-full text-xs font-bold hover:bg-emerald-500 transition-colors cursor-pointer"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>

                {/* Alternate Number */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                    Alternate Phone Number
                  </span>
                  <a
                    href={`tel:${businessConfig.alternatePhone}`}
                    className="text-base font-black text-slate-900 hover:text-[#0B3830] block mt-0.5"
                  >
                    {businessConfig.formattedAlternatePhone}
                  </a>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">Secondary Contact Line</p>

                  <div className="mt-3">
                    <a
                      href={`tel:${businessConfig.alternatePhone}`}
                      className="px-3.5 py-1.5 bg-slate-800 text-white rounded-full text-xs font-bold hover:bg-slate-900 transition-colors inline-block cursor-pointer"
                    >
                      Call Alternate
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Address & Landmark Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 font-sans">
                  <MapPin className="w-5 h-5 text-emerald-700" />
                  <span>Kendra Address &amp; Landmark</span>
                </h2>

                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  title="Copy full address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs sm:text-sm">
                <p className="font-bold text-slate-900 text-sm sm:text-base">
                  {businessConfig.name}
                </p>
                <p className="text-slate-700 leading-relaxed">
                  <strong>Street:</strong> {businessConfig.address.street}<br />
                  <strong>Landmark:</strong> {businessConfig.address.landmark}<br />
                  <strong>City:</strong> {businessConfig.address.city} - {businessConfig.address.pincode}, Maharashtra
                </p>
                <p className="text-[#0B3830] font-marathi font-bold pt-1 border-t border-slate-200 text-xs">
                  <strong>मराठी पत्ता:</strong> {businessConfig.address.fullMarathi}
                </p>
              </div>

              {/* Get Directions Button */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href={businessConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0B3830] hover:bg-[#134E43] text-white font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-amber-300" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
                </a>

                <span className="text-xs text-slate-500">
                  Beside Balaji Jewelers &amp; Lanjewar Cycle Stores
                </span>
              </div>
            </div>

            {/* Email & Hours Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-card space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <Mail className="w-4 h-4 text-emerald-700" />
                  <span>Official Email</span>
                </div>
                <a
                  href={`mailto:${businessConfig.email}`}
                  className="text-xs sm:text-sm font-bold text-slate-900 hover:text-[#0B3830] break-all block pt-1"
                >
                  {businessConfig.email}
                </a>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-card space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  <span>Operating Hours</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-emerald-700 pt-1">
                  {businessConfig.hours}
                </p>
                <p className="text-[11px] text-slate-500 font-marathi">
                  {businessConfig.hoursMr}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Enquiry Form & Embedded Map */}
          <div className="lg:col-span-5 space-y-6">
            <EnquiryForm
              title="Send an Enquiry"
              subtitle="Fill in your details and connect with Yash Chopade immediately."
            />

            {/* Embedded Live Google Map */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card overflow-hidden p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span>Interactive Map View</span>
                </div>
                <a
                  href={businessConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#0B3830] hover:underline font-bold inline-flex items-center gap-1"
                >
                  <span>Open Full Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <iframe
                  title="Jeet Digital Seva Kendra Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.439818817757!2d79.10841727587747!3d21.117143780556276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4b8aca0f558fb%3A0x68837911d0000000!2sJeet%20Digital%20E-Governance%20Seva%20Kendra!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
