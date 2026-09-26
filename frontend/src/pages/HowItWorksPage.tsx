import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumb } from '../components/common/Breadcrumb';
import {
  MessageSquare,
  FileCheck2,
  Send,
  Award,
  Phone,
  MessageCircle,
  CheckCircle,
  ShieldAlert
} from 'lucide-react';
import { businessConfig } from '../data/business';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import { useLanguage } from '../context/LanguageContext';

export const HowItWorksPage: React.FC = () => {
  const { language } = useLanguage();

  const steps = [
    {
      num: '01',
      icon: <MessageSquare className="w-8 h-8 text-brand-600" />,
      title: 'Step 1: Tell Us What You Need',
      titleMr: 'पायरी १: आपली गरज सांगा',
      desc: 'Reach out to Yash Chopade via phone (+91 8055203555), WhatsApp, or visit our centre at Ayodhya Nagar Square, Nagpur. Tell us which document or service you need (e.g. Caste Validity, PAN Card, Income Certificate, Gumasta).',
      descMr: 'कॉल, व्हॉट्सॲप किंवा प्रत्यक्ष केंद्रावर भेट देऊन आपल्याला हव्या असणाऱ्या सेवेबद्दल विचारणा करा. आम्ही आपल्याला आवश्यक कागदपत्रांची अचूक माहिती देऊ.'
    },
    {
      num: '02',
      icon: <FileCheck2 className="w-8 h-8 text-blue-600" />,
      title: 'Step 2: Submit / Provide Documents',
      titleMr: 'पायरी २: कागदपत्रे जमा करा',
      desc: 'You can either send clear photos/PDFs via WhatsApp or bring physical photocopies to our counter. We scrutinize all records to check for spelling consistency, cutoff dates, and completeness before submission.',
      descMr: 'कागदपत्रे व्हॉट्सॲपवर पाठवा किंवा केंद्रावर आणा. अर्ज नामंजूर होऊ नये म्हणून आम्ही सर्व कागदपत्रांची बारकाईने तपासणी करतो.'
    },
    {
      num: '03',
      icon: <Send className="w-8 h-8 text-amber-600" />,
      title: 'Step 3: Application Processing & Filing',
      titleMr: 'पायरी ३: ऑनलाईन अर्ज व शपथपत्र तयार करणे',
      desc: 'We draft the necessary legal affidavits (such as Namuna Form 3 & 17 for Caste Validity or Gap Affidavits) and file your application on official government portals (Aaple Sarkar, CCVIS/Barti, NSDL, Parivahan, Mahavitaran, etc.).',
      descMr: 'आवश्यक शपथपत्रे तयार करून अधिकृत शासकीय पोर्टलवर (आपले सरकार, बार्टी, एनएसडीएल) अचूक फॉर्म भरून त्वरित पावती दिली जाते.'
    },
    {
      num: '04',
      icon: <Award className="w-8 h-8 text-emerald-600" />,
      title: 'Step 4: Receive Token & Approved Document',
      titleMr: 'पायरी ४: पावती व दाखला प्राप्त करा',
      desc: 'You immediately receive your official government Application Token / Acknowledgement Slip. Once verified by competent authorities, collect your digitally signed certificate with QR verification.',
      descMr: 'अर्जाची अधिकृत पावती तात्काळ मिळवा आणि प्रक्रिया पूर्ण झाल्यावर आपला डिजिटल स्वाक्षरी असलेला दाखला प्राप्त करा.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-12">
      <SEOHead
        title="How It Works — E-Governance Application Process | Jeet Digital Seva Kendra Nagpur"
        description="Learn the simple 4-step process to apply for government certificates, Caste Validity, PAN, Aadhaar, and business licences at Jeet Digital E-Governance Seva Kendra in Nagpur."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: language === 'mr' ? 'कार्यपद्धती' : 'How It Works' }]} />

        {/* Page Header */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-10 mb-12 text-center max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-govnavy-50 text-govnavy-800 border border-govnavy-200 mb-3">
            Transparent &amp; Reliable Process
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-govnavy-900 tracking-tight">
            {language === 'mr'
              ? 'कागदपत्रे तयार करण्याची सोपी कार्यपद्धती'
              : 'How We Process Your Government Documentation'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            No confusion, no multiple counter visits, and no unnecessary delays. Here is exactly how we assist you from initial consultation to final delivery.
          </p>
        </div>

        {/* 4 Detailed Process Cards */}
        <div className="space-y-8 max-w-4xl mx-auto mb-16">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-card transition-all p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6"
            >
              <div className="flex sm:flex-col items-center justify-between w-full sm:w-auto gap-4 flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-inner">
                  {item.icon}
                </div>
                <span className="text-2xl font-black text-slate-300">
                  {item.num}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-govnavy-900 leading-snug">
                  {language === 'mr' ? item.titleMr : item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {language === 'mr' ? item.descMr : item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Document Preparation Tips Section */}
        <div className="bg-amber-50/90 rounded-3xl border border-amber-200/80 p-6 sm:p-10 max-w-4xl mx-auto mb-16">
          <div className="flex items-center gap-3 mb-6">
            <ShieldAlert className="w-7 h-7 text-amber-700 flex-shrink-0" />
            <h2 className="text-xl font-bold text-amber-950">
              {language === 'mr' ? 'कागदपत्रे सादर करताना घ्यायची दक्षता' : 'Important Tips for Smooth Processing'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-amber-900">
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <span><strong>Aadhaar Mobile Linkage:</strong> Ensure your active mobile number is linked to Aadhaar for instant OTP authentication.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <span><strong>Name Spelling Consistency:</strong> Check that name and date of birth spellings match across School TC and Identity Cards.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <span><strong>Ancestral Caste Proofs:</strong> For Caste Validity, collect father's/grandfather's school TC or Kotwal book extracts well in advance.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <span><strong>Clear Photos:</strong> If sharing on WhatsApp, send clear, well-lit, flat photos without shadows or cut-off corners.</span>
            </div>
          </div>
        </div>

        {/* Action CTA Box */}
        <div className="bg-govnavy-900 text-white rounded-3xl p-8 sm:p-10 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Ready to start your application today?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl mx-auto">
            Contact Yash Chopade at Jeet Digital E-Governance Seva Kendra, Ayodhya Nagar Square, Nagpur.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-6">
            <a
              href={`tel:${businessConfig.primaryPhone}`}
              className="w-full sm:w-auto px-6 py-3.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-sm font-bold shadow-md flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Primary: {businessConfig.primaryPhone}</span>
            </a>

            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Consultation</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
