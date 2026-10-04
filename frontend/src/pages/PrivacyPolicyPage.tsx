import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ShieldCheck, Lock, Eye, FileText, Phone } from 'lucide-react';
import { businessConfig } from '../data/business';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] py-8 md:py-12">
      <SEOHead
        title="Privacy Policy | Jeet Digital E-Governance Seva Kendra Nagpur"
        description="Privacy policy and data handling terms for Jeet Digital E-Governance Seva Kendra, Ayodhya Nagar, Nagpur."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Privacy Policy' }]} />

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-12 space-y-8">
          
          <div className="border-b border-slate-100 pb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-[#0B3830] border border-emerald-200 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Data Confidentiality &amp; 24-Hour Purge Guarantee</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 font-sans">
                <Lock className="w-4 h-4 text-[#0B3830]" />
                <span>1. Overview</span>
              </h2>
              <p>
                <strong>{businessConfig.name}</strong> ("we", "our", "us"), located at <strong>{businessConfig.address.fullEnglish}</strong>, is committed to respecting and protecting the privacy of citizens, students, and clients who interact with our website, communication channels, and physical Seva Kendra.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 font-sans">
                <FileText className="w-4 h-4 text-[#0B3830]" />
                <span>2. Information We Collect</span>
              </h2>
              <p>
                When you use our online forms or initiate WhatsApp inquiries, we may collect the following basic information that you voluntarily provide:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Your Full Name</li>
                <li>Mobile / WhatsApp Phone Number</li>
                <li>The specific Government / Private documentation service requested</li>
                <li>Any optional notes or requirements you provide regarding your documents</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 font-sans">
                <Eye className="w-4 h-4 text-[#0B3830]" />
                <span>3. How We Use Your Information</span>
              </h2>
              <p>
                The information collected is used strictly for:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Responding to your specific service inquiry or consultation request</li>
                <li>Sharing the required document checklist and process guidelines via WhatsApp or phone</li>
                <li>Processing your authorized application on designated government portals (such as Aaple Sarkar, CCVIS/Barti, NSDL, Parivahan, etc.) with your explicit consent</li>
                <li>Sharing application status tracking receipts and updates</li>
              </ul>
              <p className="font-bold text-slate-900 pt-1">
                We do NOT sell, rent, trade, or distribute your personal contact information to third-party telemarketers or advertisers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 font-sans">
                <ShieldCheck className="w-4 h-4 text-[#0B3830]" />
                <span>4. Confidentiality of Official Documents &amp; 24-Hour Purge</span>
              </h2>
              <p>
                Copies of identity proofs (Aadhaar, PAN, School Leaving Certificates, Kotwal records, and family documents) provided for online submissions are treated with utmost confidentiality and permanently deleted from our servers automatically after 24 hours.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 font-sans">
                <Phone className="w-4 h-4 text-[#0B3830]" />
                <span>5. Contact for Privacy Inquiries</span>
              </h2>
              <p>
                If you have any questions about this Privacy Policy or wish to have your contact record deleted from our communication history, please contact:
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1 text-slate-700">
                <p><strong>Contact Person:</strong> {businessConfig.owner}</p>
                <p><strong>Business:</strong> {businessConfig.name}</p>
                <p><strong>Address:</strong> {businessConfig.address.fullEnglish}</p>
                <p><strong>Email:</strong> {businessConfig.email}</p>
                <p><strong>Phone:</strong> {businessConfig.formattedPrimaryPhone} / {businessConfig.formattedAlternatePhone}</p>
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
};
