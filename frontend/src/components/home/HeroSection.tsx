import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, CheckCircle2, Clock, ShieldCheck, FileCheck, Sparkles } from 'lucide-react';

interface ServiceQuickCheck {
  id: string;
  name: string;
  nameMr: string;
  turnaround: string;
  feeEstimate: string;
  docs: string[];
  docsMr: string[];
}

const quickServices: ServiceQuickCheck[] = [
  {
    id: 'caste-validity',
    name: '12th Science Caste Validity',
    nameMr: '१२ वी सायन्स जात पडताळणी',
    turnaround: 'Express Processing',
    feeEstimate: 'Govt Standard Charges',
    docs: [
      'Original Caste Certificate',
      '10th & 12th School Leaving Certificate (TC)',
      "Father's / Grandfather's School LC (Pre-1967)",
      'Affidavit Form 17 & 3 (We provide formats)'
    ],
    docsMr: [
      'मूळ जात प्रमाणपत्र',
      '१० वी व १२ वी शाळा सोडल्याचा दाखला (TC)',
      'वडिलांचा / आजोबांचा शाळा सोडल्याचा दाखला (१९६७ पूर्वीचा)',
      'प्रतिज्ञापत्र नमुना १७ व ३ (फॉर्मेट आम्ही देतो)'
    ]
  },
  {
    id: 'income-certificate',
    name: 'Tahsildar Income Certificate',
    nameMr: 'तहसीलदार उत्पन्न दाखला (१ व ३ वर्षे)',
    turnaround: '24 to 48 Hours',
    feeEstimate: 'Standard Govt Challan',
    docs: [
      'Aadhaar Card & Ration Card',
      'Salary Slip / Form 16 OR Talathi Ahwal',
      'Bank Statement (Last 6 Months)',
      'Passport size photograph'
    ],
    docsMr: [
      'आधार कार्ड व रेशन कार्ड',
      'पगार पावती / फॉर्म १६ किंवा तलाठी अहवाल',
      'बँक पासबुक झेरॉक्स',
      'पासपोर्ट फोटो'
    ]
  },
  {
    id: 'domicile-certificate',
    name: 'Domicile & Nationality',
    nameMr: 'अधिवास व राष्ट्रीयत्व प्रमाणपत्र',
    turnaround: '2 to 3 Working Days',
    feeEstimate: 'Standard Govt Challan',
    docs: [
      'Applicant Aadhaar Card',
      'School Leaving Certificate showing Birthplace in MH',
      'Electricity Bill or Ration Card (15 Yr Proof)',
      'Self Declaration & Voter ID'
    ],
    docsMr: [
      'अर्जदाराचे आधार कार्ड',
      'शाळा सोडल्याचा दाखला (जन्म महाराष्ट्रात नोंद)',
      'लाईट बिल किंवा रेशन कार्ड (१५ वर्षे वास्तव्याचा पुरावा)',
      'स्वयंघोषणापत्र व मतदान ओळखपत्र'
    ]
  },
  {
    id: 'pan-card',
    name: 'PAN Card (New / Correction)',
    nameMr: 'नवीन पॅन कार्ड / दुरुस्ती',
    turnaround: 'Instant e-PAN in 2 Hrs',
    feeEstimate: 'Official NSDL/UTI Fee',
    docs: [
      'Aadhaar Card (Linked with Mobile OTP)',
      '2 Passport Size Colour Photos',
      'Proof of Date of Birth (Birth Cert / LC)',
      'Existing PAN copy (if correction)'
    ],
    docsMr: [
      'आधार कार्ड (मोबाईल नंबर लिंक आवश्यक)',
      '२ पासपोर्ट साईज रंगीत फोटो',
      'जन्म दाखला किंवा शाळा सोडल्याचा दाखला',
      'जुने पॅन कार्ड झेरॉक्स (दुरुस्ती असल्यास)'
    ]
  }
];

export const HeroSection: React.FC = () => {
  const { language } = useLanguage();
  const [selectedServiceId, setSelectedServiceId] = useState<string>('caste-validity');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    '0': true,
    '1': true
  });

  const activeService = quickServices.find((s) => s.id === selectedServiceId) || quickServices[0];

  const toggleCheck = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      {/* Subtle organic background gradient accents */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-[#F2F8F6] rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 w-80 h-80 bg-[#FCF8F4] rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column (Editorial Typography, CTAs & Stats) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Live Operational Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2EFEA] border border-[#C2DDD4] text-[#113D36] text-xs font-semibold tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#113D36]"></span>
              </span>
              <span>
                {language === 'mr'
                  ? 'आपले सरकार सेवा केंद्र · २४ तास खुले · अयोध्या नगर, नागपूर'
                  : 'Aaple Sarkar Seva Kendra · Open 24 Hours · Nagpur'}
              </span>
            </div>

            {/* Editorial Serif Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-normal tracking-tight text-[#152220] leading-[1.12] font-serif">
              {language === 'mr' ? (
                <>
                  शासकीय काम आणि दाखले, <br />
                  <span className="italic font-serif text-[#113D36]">आता सहज आणि जलद.</span>
                </>
              ) : (
                <>
                  Government forms and certificates, <br />
                  <span className="italic font-serif text-[#113D36]">made effortless.</span>
                </>
              )}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#4A5B57] leading-relaxed max-w-xl font-normal">
              {language === 'mr'
                ? 'कास्ट व्हॅलिडिटी, उत्पन्न, अधिवास आणि सर्व शासकीय दाखले थेट ऑनलाइन अपलोड करा. यश चोपडे यांच्या केंद्राकडून १००% अचूक मार्गदर्शन व २४ तासांत सेवा.'
                : 'Upload your documents directly to Yash Chopade’s authorized center. Express processing, transparent fee breakdown, and automated 24-hour privacy purge.'}
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                to="/upload"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#113D36] hover:bg-[#144A42] text-white text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <span>{language === 'mr' ? 'कागदपत्रे अपलोड करा' : 'Upload Documents Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/track"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-[#FAF8F5] text-[#113D36] border border-[#EAE4DC] text-sm font-semibold hover:border-[#113D36]/30 transition-all shadow-xs"
              >
                <span>{language === 'mr' ? 'स्थिती तपासा' : 'Track Application Status'}</span>
              </Link>
            </div>

            {/* Key Trust Stats Ribbon */}
            <div className="pt-6 border-t border-[#EAE4DC] grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#113D36] font-serif tabular-nums">20+</div>
                <div className="text-xs text-[#798C87] font-medium mt-0.5">
                  {language === 'mr' ? 'शासकीय सेवा' : 'Govt Services'}
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#113D36] font-serif tabular-nums">24 Hrs</div>
                <div className="text-xs text-[#798C87] font-medium mt-0.5">
                  {language === 'mr' ? 'केंद्राची वेळ' : 'Round the Clock'}
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#C27E4B] font-serif tabular-nums">100%</div>
                <div className="text-xs text-[#798C87] font-medium mt-0.5">
                  {language === 'mr' ? 'गोपनीयता हमी' : 'Privacy Purge'}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Live Requirement & Turnaround Checker Widget */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE4DC] shadow-soft relative overflow-hidden">
              
              {/* Top Accent Strip */}
              <div className="flex items-center justify-between pb-5 border-b border-[#F3EFEA]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#F2F8F6] text-[#113D36] flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#152220]">
                      {language === 'mr' ? 'कागदपत्रे तपासणी व वेळ' : 'Interactive Document Checker'}
                    </h3>
                    <p className="text-[11px] text-[#798C87]">
                      {language === 'mr' ? 'सेवा निवडा आणि त्वरित यादी पहा' : 'Select a service to preview required proofs'}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#F2F8F6] text-[#113D36] border border-[#C2DDD4]">
                  <Clock className="w-3 h-3" />
                  <span>{activeService.turnaround}</span>
                </span>
              </div>

              {/* Service Selection Pills */}
              <div className="py-4">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#798C87] block mb-2">
                  {language === 'mr' ? 'सेवा निवडा' : 'Choose Service'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {quickServices.map((service) => {
                    const isSelected = service.id === selectedServiceId;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setSelectedServiceId(service.id)}
                        className={`text-left p-2.5 rounded-xl text-xs font-semibold transition-all border ${
                          isSelected
                            ? 'bg-[#113D36] text-white border-[#113D36] shadow-xs'
                            : 'bg-[#FAF8F5] text-[#4A5B57] border-[#EAE4DC] hover:border-[#C2DDD4] hover:bg-[#F2F8F6]'
                        }`}
                      >
                        <div className="font-bold truncate">
                          {language === 'mr' ? service.nameMr : service.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live Checklist Card */}
              <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-[#EAE4DC] space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#152220] flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-[#113D36]" />
                    <span>{language === 'mr' ? 'आवश्यक कागदपत्रे' : 'Mandatory Proofs Checklist'}</span>
                  </span>
                  <span className="text-[11px] text-[#A86938] font-semibold">
                    {language === 'mr' ? '१००% अचूक यादी' : 'Verified by Yash Chopade'}
                  </span>
                </div>

                <div className="space-y-1.5 pt-1">
                  {(language === 'mr' ? activeService.docsMr : activeService.docs).map((doc, idx) => {
                    const isChecked = !!checkedItems[idx];
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleCheck(idx)}
                        className="flex items-start gap-2.5 p-2 rounded-lg bg-white border border-[#EAE4DC]/60 cursor-pointer hover:border-[#113D36]/40 transition-colors select-none"
                      >
                        <div className="mt-0.5">
                          <CheckCircle2
                            className={`w-4 h-4 transition-colors ${
                              isChecked ? 'text-[#113D36] fill-[#E2EFEA]' : 'text-[#798C87]'
                            }`}
                          />
                        </div>
                        <span className={`text-xs ${isChecked ? 'text-[#152220] font-medium' : 'text-[#798C87]'}`}>
                          {doc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Fee Transparency & Direct Launch Button */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-[#4A5B57]">
                  <ShieldCheck className="w-4 h-4 text-[#113D36]" />
                  <span>
                    {language === 'mr'
                      ? 'सरकारी पावतीसह काम'
                      : 'Govt approved receipt guaranteed'}
                  </span>
                </div>

                <Link
                  to={`/upload?service=${selectedServiceId}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#113D36] hover:bg-[#144A42] text-white text-xs font-bold transition-all shadow-xs"
                >
                  <span>{language === 'mr' ? 'या सेवेसाठी कागदपत्रे पाठवा' : 'Upload for this Service'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
