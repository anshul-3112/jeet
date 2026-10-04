import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { HeroSection } from '../components/home/HeroSection';
import { TrustStrip } from '../components/home/TrustStrip';
import { PopularServices } from '../components/home/PopularServices';
import { HowItWorksPreview } from '../components/home/HowItWorksPreview';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { FAQPreview } from '../components/home/FAQPreview';
import { FinalCTA } from '../components/home/FinalCTA';
import { EnquiryForm } from '../components/forms/EnquiryForm';
import { LocationQRCode } from '../components/common/LocationQRCode';
import { businessConfig } from '../data/business';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Clock, ShieldCheck } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <SEOHead
        title="Jeet Digital E-Governance Seva Kendra | Aadhaar, PAN, Certificates & More — Nagpur"
        description="Official Seva Kendra in Ayodhya Nagar, Nagpur. Apply for Aadhaar, PAN Card, 12th Science Caste Validity, Income & Domicile Certificates, Gumasta, Food Licence, and Online Recruitment/Admission Forms. Open 24 Hours. Call +91 8055203555."
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Trust Strip */}
      <TrustStrip />

      {/* Quick Enquiry & Highlights Row */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Quick Overview (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>आपले सरकार सेवा केंद्र • नागपूर</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-[1.18] font-sans">
                {language === 'mr' ? (
                  <>
                    सर्व प्रकारच्या शासकीय दाखल्यांसाठी <br />
                    <span className="text-[#0B3830]">एकाच ठिकाणी संपूर्ण अचूक मार्गदर्शन.</span>
                  </>
                ) : (
                  <>
                    One-stop authorized Kendra for <br />
                    <span className="text-[#0B3830]">all citizen &amp; student documentation.</span>
                  </>
                )}
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
                {businessConfig.bio}
              </p>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
                  <MapPin className="w-5 h-5 text-[#0B3830] flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block font-sans">Location Landmark</span>
                    <span className="text-slate-600">{businessConfig.address.landmark}, Nagpur-24</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
                  <Clock className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block font-sans">Working Hours</span>
                    <span className="text-emerald-700 font-bold">{businessConfig.hours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Fast Enquiry Form (5 cols) */}
            <div className="lg:col-span-5">
              <EnquiryForm
                title="Instant Document Consultation"
                subtitle="Submit your query to receive the exact document checklist on WhatsApp."
              />
            </div>

          </div>
        </div>
      </section>

      {/* Popular Services Grid with Caste Validity Callout */}
      <PopularServices />

      {/* 4-Step Process */}
      <HowItWorksPreview />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Location QR Code Navigation Banner */}
      <section className="py-12 bg-[#FAF9F6] border-b border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LocationQRCode variant="banner" />
        </div>
      </section>

      {/* FAQ Preview */}
      <FAQPreview />

      {/* Final Large Conversion Section */}
      <FinalCTA />
    </div>
  );
};
