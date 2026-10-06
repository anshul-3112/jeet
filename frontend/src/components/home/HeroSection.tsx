import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, CheckCircle2, Clock, ShieldCheck, FileCheck, Sparkles, UploadCloud, Search } from 'lucide-react';

interface ServiceQuickCheck {
  id: string;
  name: string;
  nameMr: string;
  turnaround: string;
  docs: string[];
  docsMr: string[];
}

const quickServices: ServiceQuickCheck[] = [
  {
    id: 'caste-validity',
    name: '12th Science Caste Validity',
    nameMr: '१२ वी सायन्स जात पडताळणी',
    turnaround: 'Express Processing',
    docs: [
      'Original Caste Certificate',
      '10th & 12th School Leaving Certificate (TC)',
      "Father's / Grandfather's School LC (Pre-1967)",
      'Affidavit Form 17 & 3 (Formats Provided)'
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
    name: 'Income Certificate (1 & 3 Yr)',
    nameMr: 'तहसीलदार उत्पन्न दाखला',
    turnaround: '24 to 48 Hours',
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
      'पासपोर्ट साईज रंगीत फोटो'
    ]
  },
  {
    id: 'domicile-certificate',
    name: 'Domicile & Nationality',
    nameMr: 'अधिवास व राष्ट्रीयत्व प्रमाणपत्र',
    turnaround: '2 to 3 Working Days',
    docs: [
      'Applicant Aadhaar Card',
      'School Leaving Certificate (Birthplace in MH)',
      'Electricity Bill / Ration Card (15 Yr Proof)',
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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F0F7F5] via-[#FAF9F6] to-[#FAF9F6] py-10 sm:py-12 lg:py-14 border-b border-slate-200/80">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column CSS Grid (1.1fr / 1fr, gap 48px, collapse below 900px) */}
        <div className="grid grid-cols-1 min-[900px]:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Subtitle, Dual CTAs, Stats */}
          <div className="space-y-5">
            
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-[#0b3b32] text-xs font-bold tracking-wide">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <span className="truncate">
                {language === 'mr'
                  ? 'आपले सरकार सेवा केंद्र · २४ तास खुले · नागपूर'
                  : 'Aaple Sarkar Seva Kendra · Open 24/7 · Nagpur'}
              </span>
            </div>

            {/* Headline with Gold Underline */}
            <h1 className="text-[clamp(34px,3.8vw,52px)] font-black tracking-tight text-slate-900 leading-[1.1] font-sans">
              {language === 'mr' ? (
                <>
                  शासकीय दाखले आणि कामे, <br />
                  <span className="text-[#0b3b32] underline decoration-[#f5b800] decoration-4 underline-offset-4">
                    आता जलद व विना त्रुटी.
                  </span>
                </>
              ) : (
                <>
                  Government Services &amp; Forms, <br />
                  <span className="text-[#0b3b32] underline decoration-[#f5b800] decoration-4 underline-offset-4">
                    made effortless &amp; verified.
                  </span>
                </>
              )}
            </h1>

            {/* Body Text */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-[520px] font-normal">
              {language === 'mr'
                ? '१२ वी सायन्स जात पडताळणी, उत्पन्न, अधिवास आणि सर्व शासकीय दाखल्यांसाठी अधिकृत केंद्र. यश चोपडे यांच्याकडून १००% अचूक मार्गदर्शन व २४ तासांत सेवा.'
                : 'Upload your documents directly to Yash Chopade’s authorized center in Nagpur. Verified checklists, zero queue delay, and automated 24-hour privacy purge.'}
            </p>

            {/* Primary and Secondary Hero Buttons (Same Height, Row Layout with 12px Gap) */}
            <div className="flex flex-row items-center gap-3 pt-1 flex-wrap sm:flex-nowrap">
              <Link
                to="/upload"
                className="h-12 px-6 rounded-full bg-[#0b3b32] hover:bg-[#072722] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <UploadCloud className="w-4 h-4" />
                <span>{language === 'mr' ? 'कागदपत्रे अपलोड करा' : 'Upload Documents'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/track"
                className="h-12 px-5 rounded-full bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 hover:border-[#0b3b32] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
              >
                <Search className="w-4 h-4 text-emerald-700" />
                <span>{language === 'mr' ? 'स्थिती तपासा' : 'Track Status'}</span>
              </Link>
            </div>

            {/* Key Trust Stats Ribbon */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-3 gap-3 max-w-[520px]">
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs text-center">
                <div className="text-xl sm:text-2xl font-black text-[#0b3b32] tabular-nums">20+</div>
                <div className="text-[11px] text-slate-600 font-semibold truncate">
                  {language === 'mr' ? 'शासकीय सेवा' : 'Govt Services'}
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs text-center">
                <div className="text-xl sm:text-2xl font-black text-emerald-700 tabular-nums">24 Hrs</div>
                <div className="text-[11px] text-slate-600 font-semibold truncate">
                  {language === 'mr' ? 'केंद्राची वेळ' : 'Assistance'}
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs text-center">
                <div className="text-xl sm:text-2xl font-black text-amber-600 tabular-nums">100%</div>
                <div className="text-[11px] text-slate-600 font-semibold truncate">
                  {language === 'mr' ? 'खात्रीशीर' : 'Verified'}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Document Checker Card (Max-width ~520px) */}
          <div className="w-full flex justify-center min-[900px]:justify-end">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-elevated w-full max-w-[520px] flex flex-col justify-between space-y-4">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#0b3b32] flex items-center justify-center border border-emerald-200 flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                      {language === 'mr' ? 'कागदपत्रे तपासणी' : 'Interactive Document Checker'}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
                      {language === 'mr' ? 'सेवा निवडा आणि त्वरित यादी पहा' : 'Select a service to preview required proofs'}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 whitespace-nowrap flex-shrink-0">
                  <Clock className="w-3 h-3 text-emerald-600" />
                  <span>{activeService.turnaround}</span>
                </span>
              </div>

              {/* Service Picker: Clean 2x2 Grid of Equal-Size Buttons */}
              <div>
                <div className="grid grid-cols-2 gap-2">
                  {quickServices.map((service) => {
                    const isSelected = service.id === selectedServiceId;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setSelectedServiceId(service.id)}
                        className={`text-left px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer h-10 flex items-center overflow-hidden ${
                          isSelected
                            ? 'bg-[#0b3b32] text-white border-[#0b3b32] shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                        }`}
                      >
                        <span className="truncate">
                          {language === 'mr' ? service.nameMr : service.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Checklist Container: Equal Height Rows & Consistent Spacing */}
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/90 space-y-2">
                <div className="flex items-center justify-between text-xs px-1">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5 text-[11px]">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{language === 'mr' ? 'आवश्यक कागदपत्रे' : 'Mandatory Proofs Checklist'}</span>
                  </span>
                  <span className="text-[10px] text-amber-900 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    {language === 'mr' ? '१००% अचूक यादी' : 'Official Checklist'}
                  </span>
                </div>

                <div className="space-y-1.5 pt-0.5">
                  {(language === 'mr' ? activeService.docsMr : activeService.docs).map((doc, idx) => {
                    const isChecked = !!checkedItems[idx];
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleCheck(idx)}
                        className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200/90 cursor-pointer hover:border-emerald-400 transition-colors select-none h-8 sm:h-8"
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${
                            isChecked ? 'text-emerald-700 fill-emerald-100' : 'text-slate-300'
                          }`}
                        />
                        <span className={`text-[11px] sm:text-xs truncate ${isChecked ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
                          {doc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card Footer Action: Upload for this Service Button INSIDE the Card */}
              <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                  <span>
                    {language === 'mr' ? 'सरकारी पावतीसह काम' : 'Govt receipt guaranteed'}
                  </span>
                </div>

                <Link
                  to={`/upload?service=${selectedServiceId}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full bg-[#0b3b32] hover:bg-[#072722] text-white text-xs font-bold transition-all shadow-xs active:scale-95 whitespace-nowrap"
                >
                  <span>{language === 'mr' ? 'कागदपत्रे पाठवा' : 'Upload for this Service'}</span>
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
