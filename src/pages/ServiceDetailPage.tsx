import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ServiceChecklist } from '../components/services/ServiceChecklist';
import { EnquiryForm } from '../components/forms/EnquiryForm';
import { ServiceCard } from '../components/services/ServiceCard';
import { servicesData } from '../../src/data/services';
import { businessConfig } from '../data/business';
import { useLanguage } from '../context/LanguageContext';
import { getServiceWhatsAppUrl } from '../utils/whatsapp';
import {
  Clock,
  Phone,
  MessageCircle,
  CheckCircle2,
  Users,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();

  // Find the matching service item
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/404" replace />;
  }

  // Find related services
  const relatedServices = servicesData.filter((s) =>
    service.relatedSlugs.includes(s.slug)
  );

  const isCasteValidity = service.slug === 'caste-validity';

  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-12">
      {/* Dynamic SEO Meta & Schema */}
      <SEOHead
        title={`${service.name} in Nagpur | Jeet Digital E-Governance Seva Kendra`}
        description={`Apply for ${service.name} (${service.nameMr}) at Jeet Digital Seva Kendra in Ayodhya Nagar, Nagpur. Document checklist, fast processing, and direct assistance. Call +91 8055203555.`}
        schema={{
          '@type': 'Service',
          name: service.name,
          serviceType: service.categoryName,
          provider: {
            '@type': 'LocalBusiness',
            name: businessConfig.name,
            telephone: businessConfig.formattedPrimaryPhone,
            address: {
              '@type': 'PostalAddress',
              streetAddress: businessConfig.address.street,
              addressLocality: businessConfig.address.city,
              postalCode: businessConfig.address.pincode,
              addressRegion: businessConfig.address.state
            }
          },
          description: service.detailedDescription
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: language === 'mr' ? 'सर्व सेवा' : 'Services', href: '/services' },
            { label: language === 'mr' ? service.nameMr : service.name }
          ]}
        />

        {/* Hero Banner for Service */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-10 mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-govnavy-50 text-govnavy-800 border border-govnavy-200">
              <Layers className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? service.categoryNameMr : service.categoryName}</span>
            </span>

            {isCasteValidity && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-brand-600 text-white uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Priority Service</span>
              </span>
            )}

            {service.turnaroundTime && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'mr' && service.turnaroundTimeMr ? service.turnaroundTimeMr : service.turnaroundTime}</span>
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-govnavy-900 tracking-tight leading-tight">
            {language === 'mr' ? service.nameMr : service.name}
          </h1>

          <p className="text-sm font-semibold text-slate-500 font-marathi mt-1">
            {language === 'mr' ? service.name : service.nameMr}
          </p>

          <p className="text-sm sm:text-base text-slate-700 mt-4 max-w-4xl leading-relaxed">
            {language === 'mr' ? service.detailedDescriptionMr : service.detailedDescription}
          </p>

          {/* Featured Notice Banner (e.g. Caste Validity student warning from brochure) */}
          {service.featuredNotice && (
            <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-3.5 text-xs sm:text-sm text-amber-900 font-medium">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed font-marathi font-bold">
                {language === 'mr' && service.featuredNoticeMr ? service.featuredNoticeMr : service.featuredNotice}
              </p>
            </div>
          )}

          {/* Quick Action CTAs */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={getServiceWhatsAppUrl(service.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm active:scale-[0.98] transition-all"
              id="service-whatsapp-cta"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Apply / Inquire on WhatsApp</span>
            </a>

            <a
              href={`tel:${businessConfig.primaryPhone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-sm active:scale-[0.98] transition-all"
              id="service-call-cta"
            >
              <Phone className="w-4 h-4" />
              <span>Call Yash Chopade ({businessConfig.primaryPhone})</span>
            </a>

            <span className="text-xs text-slate-500 font-medium sm:ml-auto">
              📍 Ayodhya Nagar Square, Nagpur
            </span>
          </div>
        </div>

        {/* 2-Column Grid: Content (Checklist + Who + Process) & Sticky Sidebar (Enquiry Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Main Content (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Who This Service Is For */}
            {service.whoIsThisFor && service.whoIsThisFor.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
                <h3 className="text-lg font-bold text-govnavy-900 flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-brand-600" />
                  <span>{language === 'mr' ? 'कोणासाठी आवश्यक आहे?' : 'Who Is This Service For?'}</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  {service.whoIsThisFor.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 2. Interactive Required Documents Checklist */}
            <ServiceChecklist
              documentSections={service.documentSections}
              serviceName={service.name}
            />

            {/* 3. Step-by-Step Process Timeline */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
              <h3 className="text-lg font-bold text-govnavy-900 flex items-center gap-2 mb-6">
                <ShieldCheck className="w-5 h-5 text-brand-600" />
                <span>{language === 'mr' ? 'अर्ज प्रक्रिया व पायऱ्या' : 'Step-by-Step Processing'}</span>
              </h3>

              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
                {service.processSteps.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    <div className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 z-10 shadow-sm">
                      {idx + 1}
                    </div>
                    <div className="pt-0.5">
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sticky Sidebar (5 cols): Preselected Enquiry Form & Contact Info */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <EnquiryForm
              preselectedService={service.name}
              title={`Enquire for ${service.name}`}
              subtitle="Fill in your details to get started. We will guide you immediately."
            />

            {/* Direct Visit Card */}
            <div className="bg-govnavy-900 text-white rounded-2xl p-6 shadow-sm border border-slate-800">
              <h4 className="text-sm font-bold tracking-tight uppercase text-amber-300 mb-3">
                Visit In Person / थेट केंद्रावर या
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>{businessConfig.name}</strong><br />
                {businessConfig.address.fullEnglish}<br />
                <span className="text-amber-200 font-marathi text-[11px] block mt-1">
                  {businessConfig.address.fullMarathi}
                </span>
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-semibold">{businessConfig.hours}</span>
                <a
                  href={businessConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-brand-300 font-bold underline"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-govnavy-900">
                Related Documentation Services in Nagpur
              </h3>
              <Link to="/services" className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1">
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((rel) => (
                <ServiceCard key={rel.slug} service={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
