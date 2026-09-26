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
import { businessConfig } from '../data/business';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Clock, ShieldCheck } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Jeet Digital E-Governance Seva Kendra | Aadhaar, PAN, Certificates & More — Nagpur"
        description="Official Seva Kendra in Ayodhya Nagar, Nagpur. Apply for Aadhaar, PAN Card, 12th Science Caste Validity, Income & Domicile Certificates, Gumasta, Food Licence, and Online Recruitment/Admission Forms. Open 24 Hours. Call +91 8055203555."
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Trust Strip */}
      <TrustStrip />

      {/* Quick Enquiry & Highlights Row */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Quick Overview (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>आपले सरकार सेवा केंद्र • नागपूर</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-govnavy-900 tracking-tight leading-tight">
                {language === 'mr' ? (
                  <span>सर्व प्रकारच्या शासकीय दाखल्यांसाठी एकाच ठिकाणी संपूर्ण मार्गदर्शन</span>
                ) : (
                  <span>One-Stop Kendra for All Government &amp; Private Documentation</span>
                )}
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                {businessConfig.bio}
              </p>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <MapPin className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-govnavy-900 block">Location Landmark</span>
                    <span className="text-slate-600">{businessConfig.address.landmark}, Nagpur-24</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <Clock className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-govnavy-900 block">Working Hours</span>
                    <span className="text-emerald-700 font-semibold">{businessConfig.hours}</span>
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

      {/* FAQ Preview */}
      <FAQPreview />

      {/* Final Large Conversion Section */}
      <FinalCTA />
    </div>
  );
};
