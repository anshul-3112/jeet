import React, { useState, useMemo } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ServiceCard } from '../components/services/ServiceCard';
import { ServiceCategoryTabs } from '../components/services/ServiceCategoryTabs';
import { servicesData } from '../data/services';
import { businessConfig } from '../data/business';
import { useLanguage } from '../context/LanguageContext';
import { Search, Phone, MessageCircle, AlertCircle, Layers } from 'lucide-react';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

export const ServicesPage: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: servicesData.length };
    servicesData.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter services by category and search
  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const matchesCategory =
        selectedCategory === 'all' || service.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        service.name.toLowerCase().includes(q) ||
        service.nameMr.toLowerCase().includes(q) ||
        service.shortDescription.toLowerCase().includes(q) ||
        service.shortDescriptionMr.toLowerCase().includes(q) ||
        service.categoryName.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-12">
      <SEOHead
        title="All Government & E-Governance Services in Nagpur | Jeet Digital Seva Kendra"
        description="Complete list of 20+ government and private documentation services at Ayodhya Nagar, Nagpur. Aadhaar, PAN, Caste Validity, Certificates, Gumasta, Food Licence, Rent Agreement & Online Forms."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: language === 'mr' ? 'सर्व सेवा' : 'Services' }]} />

        {/* Page Header */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10 mb-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200 mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? '२०+ अधिकृत सेवा' : '20+ Authorized Services'}</span>
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-govnavy-900 tracking-tight">
              {language === 'mr'
                ? 'शासकीय व खाजगी सेवांची संपूर्ण यादी'
                : 'Government & Documentation Services Catalog'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              {language === 'mr'
                ? 'आपल्याला हवी असलेली सेवा निवडा, आवश्यक कागदपत्रांची यादी तपासा आणि थेट व्हॉट्सॲप किंवा फोनद्वारे अर्ज करा.'
                : 'Browse through our full range of e-governance, identity, revenue certificates, business licences, and online recruitment services in Nagpur.'}
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-6 relative max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'mr'
                  ? 'सेवा शोधा (उदा. Caste Validity, PAN, Aadhaar, Gumasta...)'
                  : 'Search by service name or keyword (e.g. Caste Validity, PAN, Aadhaar, Gumasta...)'
              }
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-600 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600 font-semibold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <ServiceCategoryTabs
            activeCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            counts={categoryCounts}
          />
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-500 font-medium px-1">
          <span>
            Showing <strong>{filteredServices.length}</strong> of {servicesData.length} services
          </span>
          {searchQuery && (
            <span>
              Filtered by: "<strong>{searchQuery}</strong>"
            </span>
          )}
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-govnavy-900">No matching services found</h3>
            <p className="text-xs text-slate-500 mt-1">
              We provide many custom and unlisted documentation services. Call or WhatsApp us directly with your requirement!
            </p>
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <a
                href={`tel:${businessConfig.primaryPhone}`}
                className="w-full sm:w-auto px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {businessConfig.primaryPhone}</span>
              </a>
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Query</span>
              </a>
            </div>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-16 bg-govnavy-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold">Need a service not listed here?</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              From affidavit notarization to rare revenue record extracts, connect directly with Yash Chopade in Nagpur.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href={`tel:${businessConfig.primaryPhone}`}
              className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs sm:text-sm transition-all shadow-sm"
            >
              Call 8055203555
            </a>
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-sm"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
