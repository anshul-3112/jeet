import React, { useState } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { EnquiryForm } from '../components/forms/EnquiryForm';
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
    <div className="min-h-screen bg-slate-50 py-8 md:py-12">
      <SEOHead
        title="Contact Us | Jeet Digital E-Governance Seva Kendra Nagpur"
        description="Contact Yash Chopade at Jeet Digital E-Governance Seva Kendra, Ayodhya Nagar Square, Nagpur. Phone: 8055203555 / 8550977877. Email: digitalsevangp@gmail.com. Open 24 Hours."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: language === 'mr' ? 'संपर्क' : 'Contact' }]} />

        {/* Page Header */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-10 mb-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200 mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>Ayodhya Nagar, Nagpur • Open 24 Hours</span>
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-govnavy-900 tracking-tight leading-tight">
              {language === 'mr' ? 'केंद्राचा संपर्क पत्ता व माहिती' : 'Contact & Location Details'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Have questions regarding document requirements, form submissions, or affidavits? Call, WhatsApp, or visit us in Ayodhya Nagar, Nagpur anytime.
            </p>
          </div>
        </div>

        {/* 2-Column Layout: Left (Contact Cards & Directions) & Right (Enquiry Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column (7 cols): Contact Cards & Map Navigation */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Primary & Alternate Phone Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
              <h2 className="text-base font-bold text-govnavy-900 flex items-center gap-2">
                <Phone className="w-5 h-5 text-brand-600" />
                <span>Phone &amp; WhatsApp Support (24 Hours)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Primary Number */}
                <div className="p-4 rounded-xl bg-brand-50/60 border border-brand-200/80">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-brand-800 block">
                    Primary Contact &amp; WhatsApp
                  </span>
                  <a
                    href={`tel:${businessConfig.primaryPhone}`}
                    className="text-base font-black text-brand-700 hover:text-brand-800 block mt-0.5"
                  >
                    {businessConfig.formattedPrimaryPhone}
                  </a>
                  <p className="text-[11px] text-slate-600 mt-1">Yash Chopade (Direct)</p>
                  
                  <div className="mt-3 flex items-center gap-2">
                    <a
                      href={`tel:${businessConfig.primaryPhone}`}
                      className="px-3 py-1.5 bg-brand-600 text-white rounded-lg text-xs font-bold hover:bg-brand-700 transition-colors"
                    >
                      Call Now
                    </a>
                    <a
                      href={getGeneralWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>

                {/* Alternate Number */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                    Alternate Phone Number
                  </span>
                  <a
                    href={`tel:${businessConfig.alternatePhone}`}
                    className="text-base font-black text-slate-800 hover:text-brand-600 block mt-0.5"
                  >
                    {businessConfig.formattedAlternatePhone}
                  </a>
                  <p className="text-[11px] text-slate-500 mt-1">Secondary Contact Line</p>

                  <div className="mt-3">
                    <a
                      href={`tel:${businessConfig.alternatePhone}`}
                      className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-900 transition-colors inline-block"
                    >
                      Call Alternate
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Address & Landmark Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-base font-bold text-govnavy-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-600" />
                  <span>Kendra Address &amp; Landmark</span>
                </h2>

                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
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

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 text-xs sm:text-sm">
                <p className="font-bold text-govnavy-900 text-sm sm:text-base">
                  {businessConfig.name}
                </p>
                <p className="text-slate-700 leading-relaxed">
                  <strong>Street:</strong> {businessConfig.address.street}<br />
                  <strong>Landmark:</strong> {businessConfig.address.landmark}<br />
                  <strong>City:</strong> {businessConfig.address.city} - {businessConfig.address.pincode}, Maharashtra
                </p>
                <p className="text-slate-700 font-marathi font-medium pt-1 border-t border-slate-200 text-xs">
                  <strong>मराठी पत्ता:</strong> {businessConfig.address.fullMarathi}
                </p>
              </div>

              {/* Get Directions Button */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href={businessConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-govnavy-900 hover:bg-govnavy-800 text-white font-bold text-xs sm:text-sm transition-all"
                >
                  <Navigation className="w-4 h-4 text-amber-400" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <span className="text-xs text-slate-500">
                  Beside Balaji Jewelers &amp; Lanjewar Cycle Stores
                </span>
              </div>
            </div>

            {/* Email & Hours Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Mail className="w-4 h-4 text-brand-600" />
                  <span>Official Email</span>
                </div>
                <a
                  href={`mailto:${businessConfig.email}`}
                  className="text-xs sm:text-sm font-bold text-govnavy-900 hover:text-brand-600 break-all block pt-1"
                >
                  {businessConfig.email}
                </a>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Clock className="w-4 h-4 text-emerald-600" />
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

          {/* Right Column (5 cols): Enquiry Form */}
          <div className="lg:col-span-5">
            <EnquiryForm
              title="Send an Enquiry"
              subtitle="Fill in your details and connect with Yash Chopade immediately."
            />
          </div>

        </div>

      </div>
    </div>
  );
};
