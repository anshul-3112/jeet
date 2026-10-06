import React from 'react';
import { Check, Clock, MapPin, Phone, Award, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { businessConfig } from '../../data/business';

export const WhyChooseUs: React.FC = () => {
  const { language } = useLanguage();

  const benefits = language === 'mr' ? [
    'अधिकृत आणि आपले सरकार शासन मान्यताप्राप्त केंद्र',
    '१२ वी सायन्स जात पडताळणीमध्ये १००% अचूक रेकॉर्ड',
    '२४ तास अखंड सेवा (आपत्कालीन कामांसाठी रात्रंदिवस उपलब्ध)',
    'शासकीय फीची अधिकृत संगणकीय पोचपावती',
    'सर्व कागदपत्रे २४ तासांनंतर आपोआप सुरक्षित नष्ट (Privacy Guarantee)'
  ] : [
    'Authorized Aaple Sarkar Government Seva Kendra in Nagpur',
    'Specialized expertise in 12th Science Caste Validity filing & genealogy',
    'Open 24/7 round the clock for urgent submissions & admission deadlines',
    'Official government treasury payment receipt issued for every application',
    'Automated 24-hour privacy purge ensuring citizen identity safety'
  ];

  return (
    <section className="py-12 md:py-[72px] bg-[#FAF9F6] border-b border-slate-200/90">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Text & Benefits List (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-[#0b3b32] border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'mr' ? 'नागपुरातील विश्वासू केंद्र' : 'Nagpur’s Trusted Seva Kendra'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-sans leading-[1.15]">
              {language === 'mr' ? (
                <>
                  नागपूरकरांचा विश्वास, <br />
                  <span className="text-[#0b3b32]">अचूक आणि जलद शासकीय सेवा.</span>
                </>
              ) : (
                <>
                  Built on citizen trust, <br />
                  <span className="text-[#0b3b32]">crafted for zero application delays.</span>
                </>
              )}
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              {language === 'mr'
                ? 'शासकीय कामे वेळेत आणि विना त्रुटी पूर्ण करण्यासाठी आमचे सेवा केंद्र अयोध्या नगर व संपूर्ण नागपुरात प्रसिद्ध आहे. यश चोपडे यांच्या मार्गदर्शनाखाली प्रत्येक अर्जाची बारकाईने तपासणी केली जाते.'
                : 'Government paperwork doesn’t have to be stressful. Yash Chopade personally oversees all submissions, ensuring pre-1967 genealogy records, affidavits, and treasury challans are spot-on.'}
            </p>

            {/* Benefits Checklist */}
            <div className="space-y-3 pt-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#0B3830]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Highlight Craft Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-elevated space-y-6 relative overflow-hidden">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mb-1.5">
                    Verified Operator
                  </span>
                  <h3 className="text-lg font-black text-slate-900">
                    {businessConfig.owner}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {businessConfig.name}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-[#0b3b32] text-white flex items-center justify-center font-bold text-base shadow-2xs">
                  JD
                </div>
              </div>

              {/* Verified Details List */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <MapPin className="w-4 h-4 text-[#0b3b32] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Location Landmark</span>
                    <span className="text-slate-600">{businessConfig.address.landmark}, Nagpur-24</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <Clock className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Working Hours</span>
                    <span className="text-emerald-700 font-bold">{businessConfig.hours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <Award className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Services Offered</span>
                    <span className="text-slate-600">Aadhaar, PAN, Caste Validity, Revenue Proofs &amp; MahaDBT</span>
                  </div>
                </div>
              </div>

              {/* Direct Call Button */}
              <a
                href={`tel:${businessConfig.primaryPhone}`}
                className="w-full inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full bg-[#0b3b32] hover:bg-[#072722] text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow active:scale-95 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call Center: {businessConfig.formattedPrimaryPhone}</span>
              </a>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
