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
    'Authorized Aaple Sarkar Government Seva Kendra',
    'Specialized expertise in 12th Science Caste Validity filing',
    'Open 24/7 round the clock for urgent submissions & deadlines',
    'Official government treasury payment receipt issued for every application',
    'Automated 24-hour privacy purge ensuring your identity safety'
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text & Benefits List (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-[#F2F8F6] text-[#113D36] border border-[#C2DDD4]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'नागपुरातील विश्वासू केंद्र' : 'Nagpur’s Trusted E-Kendra'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#152220] tracking-tight font-serif leading-[1.15]">
              {language === 'mr' ? (
                <>
                  नागपूरकरांचा विश्वास, <br />
                  <span className="italic font-serif text-[#113D36]">अचूक आणि जलद शासकीय सेवा.</span>
                </>
              ) : (
                <>
                  Built on local trust, <br />
                  <span className="italic font-serif text-[#113D36]">crafted for zero delays.</span>
                </>
              )}
            </h2>

            <p className="text-[#4A5B57] text-base leading-relaxed max-w-xl">
              {language === 'mr'
                ? 'शासकीय कामे वेळेत आणि विना त्रुटी पूर्ण करण्यासाठी आमचे सेवा केंद्र अयोध्या नगर व संपूर्ण नागपुरात प्रसिद्ध आहे. यश चोपडे यांच्या मार्गदर्शनाखाली प्रत्येक अर्जाची बारकाईने तपासणी केली जाते.'
                : 'Government paperwork doesn’t have to be stressful. Yash Chopade personally oversees all submissions, ensuring pre-1967 genealogy records, affidavits, and treasury challans are spot-on.'}
            </p>

            {/* Benefits Checklist */}
            <div className="space-y-3 pt-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E2EFEA] border border-[#C2DDD4] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#113D36]" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-[#152220]">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Highlight Craft Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE4DC] shadow-soft space-y-6 relative overflow-hidden">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-5 border-b border-[#F3EFEA]">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#A86938] block mb-1">
                    Verified Operator
                  </span>
                  <h3 className="text-lg font-bold text-[#152220]">
                    {businessConfig.owner}
                  </h3>
                  <p className="text-xs text-[#798C87]">
                    {businessConfig.name}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-[#113D36] text-white flex items-center justify-center font-serif text-lg font-bold">
                  JD
                </div>
              </div>

              {/* Verified Details List */}
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DC]">
                  <MapPin className="w-4 h-4 text-[#113D36] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#152220] block">Location Landmark</span>
                    <span className="text-[#4A5B57]">{businessConfig.address.landmark}, Nagpur-24</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DC]">
                  <Clock className="w-4 h-4 text-[#113D36] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#152220] block">Working Hours</span>
                    <span className="text-[#113D36] font-semibold">{businessConfig.hours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DC]">
                  <Award className="w-4 h-4 text-[#C27E4B] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#152220] block">Services Offered</span>
                    <span className="text-[#4A5B57]">Aadhaar, PAN, Caste Validity, Revenue Proofs &amp; MahaDBT</span>
                  </div>
                </div>
              </div>

              {/* Direct Call Button */}
              <a
                href={`tel:${businessConfig.primaryPhone}`}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#113D36] hover:bg-[#144A42] text-white font-bold text-xs shadow-xs transition-all"
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
