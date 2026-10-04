import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, CheckCircle2, Clock, ShieldCheck, FileCheck, Sparkles, UploadCloud, Search } from 'lucide-react';

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
    <section className="relative pt-6 pb-14 md:pt-12 md:pb-20 overflow-hidden bg-gradient-to-b from-[#F2F7F5] via-[#FAF9F6] to-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (Editorial Typography, CTAs & Key Stats) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Live Operational Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-[#0B3830] text-xs font-bold tracking-wide">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <span>
                {language === 'mr'
                  ? 'आपले सरकार सेवा केंद्र · २४ तास खुले · नागपूर'
                  : 'Aaple Sarkar Seva Kendra · Open 24/7 · Ayodhya Nagar, Nagpur'}
              </span>
            </div>

            {/* Authority Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.14] font-sans">
              {language === 'mr' ? (
                <>
                  शासकीय दाखले आणि कामे, <br />
                  <span className="text-[#0B3830] underline decoration-amber-400 decoration-4 underline-offset-4">आता जलद व विना त्रुटी.</span>
                </>
              ) : (
                <>
                  Government Services &amp; Forms, <br />
                  <span className="text-[#0B3830] underline decoration-amber-400 decoration-4 underline-offset-4">made effortless &amp; verified.</span>
                </>
              )}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl font-normal">
              {language === 'mr'
                ? '१२ वी सायन्स जात पडताळणी, उत्पन्न, अधिवास आणि सर्व शासकीय दाखल्यांसाठी अधिकृत केंद्र. यश चोपडे यांच्याकडून १००% अचूक मार्गदर्शन व २४ तासांत सेवा.'
                : 'Upload your documents directly to Yash Chopade’s authorized center in Nagpur. Verified checklists, zero queue delay, and automated 24-hour privacy purge.'}
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                to="/upload"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#0B3830] hover:bg-[#134E43] text-white text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <UploadCloud className="w-4 h-4" />
                <span>{language === 'mr' ? 'कागदपत्रे अपलोड करा' : 'Upload Documents Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/track"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-sm font-bold hover:border-[#0B3830] transition-all shadow-xs cursor-pointer"
              >
                <Search className="w-4 h-4 text-emerald-700" />
                <span>{language === 'mr' ? 'स्थिती तपासा' : 'Track Status'}</span>
              </Link>
            </div>

            {/* Key Trust Stats Ribbon */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4">
              <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="text-2xl sm:text-3xl font-black text-[#0B3830] tabular-nums">20+</div>
                <div className="text-xs text-slate-600 font-semibold mt-0.5">
                  {language === 'mr' ? 'शासकीय सेवा' : 'Govt Services'}
                </div>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="text-2xl sm:text-3xl font-black text-emerald-700 tabular-nums">24 Hrs</div>
                <div className="text-xs text-slate-600 font-semibold mt-0.5">
                  {language === 'mr' ? 'केंद्राची वेळ' : 'Assistance'}
                </div>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="text-2xl sm:text-3xl font-black text-amber-700 tabular-nums">100%</div>
                <div className="text-xs text-slate-600 font-semibold mt-0.5">
                  {language === 'mr' ? 'गोपनीयता हमी' : 'Privacy Purge'}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Live Requirement & Turnaround Checker Widget */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-elevated relative overflow-hidden">
              
              {/* Top Accent Strip */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0B3830] flex items-center justify-center border border-emerald-200">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">
                      {language === 'mr' ? 'कागदपत्रे तपासणी व वेळ' : 'Interactive Document Checker'}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      {language === 'mr' ? 'सेवा निवडा आणि त्वरित यादी पहा' : 'Select a service to preview required proofs'}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <Clock className="w-3 h-3 text-emerald-600" />
                  <span>{activeService.turnaround}</span>
                </span>
              </div>

              {/* Service Selection Pills */}
              <div className="py-4">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
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
                        className={`text-left p-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-[#0B3830] text-white border-[#0B3830] shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                        }`}
                      >
                        <div className="truncate">
                          {language === 'mr' ? service.nameMr : service.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live Checklist Card */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{language === 'mr' ? 'आवश्यक कागदपत्रे' : 'Mandatory Proofs Checklist'}</span>
                  </span>
                  <span className="text-[11px] text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
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
                        className="flex items-start gap-2.5 p-2 rounded-lg bg-white border border-slate-200 cursor-pointer hover:border-emerald-400 transition-colors select-none"
                      >
                        <div className="mt-0.5">
                          <CheckCircle2
                            className={`w-4 h-4 transition-colors ${
                              isChecked ? 'text-emerald-700 fill-emerald-100' : 'text-slate-300'
                            }`}
                          />
                        </div>
                        <span className={`text-xs ${isChecked ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
                          {doc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Fee Transparency & Direct Launch Button */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>
                    {language === 'mr'
                      ? 'सरकारी पावतीसह काम'
                      : 'Govt approved receipt guaranteed'}
                  </span>
                </div>

                <Link
                  to={`/upload?service=${selectedServiceId}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0B3830] hover:bg-[#134E43] text-white text-xs font-bold transition-all shadow-xs"
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
