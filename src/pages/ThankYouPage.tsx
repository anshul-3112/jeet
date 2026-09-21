import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { CheckCircle2, Phone, MessageCircle, Home, ArrowRight } from 'lucide-react';
import { businessConfig } from '../data/business';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

export const ThankYouPage: React.FC = () => {
  const location = useLocation();
  const stateData = location.state as { name?: string; phone?: string; service?: string; note?: string } | null;

  return (
    <div className="min-h-[80vh] bg-slate-50 py-12 md:py-20 flex items-center justify-center">
      <SEOHead
        title="Thank You | Jeet Digital E-Governance Seva Kendra"
        description="Thank you for contacting Jeet Digital E-Governance Seva Kendra in Nagpur."
        noIndex={true}
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-12 text-center">
          
          {/* Green Success Badge */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-soft animate-bounce">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">
            Enquiry Received / व्हॉट्सॲप मेसेज तयार झाला
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-govnavy-900 tracking-tight">
            Thank You for Contacting Us!
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-lg mx-auto leading-relaxed">
            We have received your details for <strong>{stateData?.service || 'e-governance services'}</strong> at Jeet Digital E-Governance Seva Kendra, Nagpur.
          </p>

          {/* Submission Details Recap Card */}
          {stateData && (
            <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-700 max-w-md mx-auto space-y-1.5">
              <p className="font-bold text-govnavy-900 border-b border-slate-200 pb-1 mb-2">
                Submitted Details:
              </p>
              {stateData.name && <p><strong>Name:</strong> {stateData.name}</p>}
              {stateData.phone && <p><strong>Mobile:</strong> {stateData.phone}</p>}
              {stateData.service && <p><strong>Service Requested:</strong> {stateData.service}</p>}
            </div>
          )}

          {/* What happens next */}
          <div className="my-6 p-4 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs text-blue-900 max-w-md mx-auto text-left space-y-1">
            <p className="font-bold">Next Steps:</p>
            <p>1. If your WhatsApp tab didn't open automatically, tap the WhatsApp button below.</p>
            <p>2. Yash Chopade will review your requirement and share the exact document list.</p>
            <p>3. You may also call us directly for express / 24-hour urgent assistance.</p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={`tel:${businessConfig.primaryPhone}`}
              className="w-full sm:w-auto px-6 py-3.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-sm font-bold shadow-md flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Yash Chopade: {businessConfig.primaryPhone}</span>
            </a>

            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Open WhatsApp Chat</span>
            </a>
          </div>

          {/* Back Home Link */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-4 text-xs font-semibold text-slate-500">
            <Link to="/" className="hover:text-brand-600 flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <span>•</span>
            <Link to="/services" className="hover:text-brand-600 flex items-center gap-1">
              <span>Browse All Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
