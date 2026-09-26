import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, UploadCloud, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const HowItWorksPreview: React.FC = () => {
  const { language } = useLanguage();

  const steps = [
    {
      step: '01',
      icon: <MessageSquare className="w-5 h-5 text-[#113D36]" />,
      title: language === 'mr' ? 'सेवा निवडा व कागदपत्रे तपासा' : 'Select Service & Checklist',
      desc: language === 'mr'
        ? 'आमच्या पोर्टलवर आवश्यक दाखल्याची माहिती घ्या किंवा व्हॉट्सअ‍ॅपवर यादी मागवा.'
        : 'Choose your desired service, view the exact government-required proof list, and avoid rejection.'
    },
    {
      step: '02',
      icon: <UploadCloud className="w-5 h-5 text-[#113D36]" />,
      title: language === 'mr' ? 'ऑनलाइन अपलोड करा' : 'Secure Online Upload',
      desc: language === 'mr'
        ? 'केंद्रावर न जाता मोबाईलवरून स्पष्ट फोटो किंवा PDF सहज अपलोड करा.'
        : 'Upload clean smartphone photos or PDFs directly from home. Encrypted and strictly auto-purged in 24 hours.'
    },
    {
      step: '03',
      icon: <Cpu className="w-5 h-5 text-[#C27E4B]" />,
      title: language === 'mr' ? 'तज्ज्ञांकडून त्वरित पडताळणी' : 'Expert Verification & Filing',
      desc: language === 'mr'
        ? 'यश चोपडे वैयक्तिकरित्या सर्व कागदपत्रे तपासून शासकीय पोर्टलवर नोंदणी करतात.'
        : 'Yash Chopade personally reviews documents for 100% accuracy before official portal submission.'
    },
    {
      step: '04',
      icon: <CheckCircle2 className="w-5 h-5 text-[#113D36]" />,
      title: language === 'mr' ? 'पावती व प्रमाणपत्र प्राप्त करा' : 'Instant Receipt & Delivery',
      desc: language === 'mr'
        ? 'अधिकृत सरकारी पोचपावती व्हॉट्सअ‍ॅपवर मिळवा आणि तयार दाखला प्राप्त करा.'
        : 'Receive the official government application acknowledgment and track your final certificate status.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-t border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-[#F7EFE7] text-[#A86938] border border-[#EFDCB9] mb-3">
            <span>{language === 'mr' ? 'पारदर्शक कार्यपद्धती' : 'Simple 4-Step Process'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#152220] tracking-tight font-serif mb-4">
            {language === 'mr' ? 'तुमचे काम कसे पूर्ण होते?' : 'How Your Work Gets Done'}
          </h2>
          <p className="text-[#4A5B57] text-base sm:text-lg leading-relaxed">
            {language === 'mr'
              ? 'कोणत्याही रांगेत न थांबता, घरबसल्या शासकीय दाखल्यांची सुरक्षित व अचूक पूर्तता.'
              : 'Zero queues, zero guesswork. Fully transparent turnaround with verified government receipts.'}
          </p>
        </div>

        {/* 4-Step Numbered Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-7 border border-[#EAE4DC] flex flex-col justify-between group hover:bg-white hover:border-[#113D36]/40 hover:shadow-soft transition-all duration-300"
            >
              <div>
                {/* Top Number Pill & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#EAE4DC] flex items-center justify-center shadow-2xs group-hover:bg-[#F2F8F6] transition-colors">
                    {item.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-black font-sans bg-[#F7EFE7] text-[#A86938] border border-[#EFDCB9]">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#152220] mb-2.5 leading-snug font-sans">
                  {item.title}
                </h3>

                <p className="text-xs text-[#4A5B57] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#EAE4DC]/60 flex items-center justify-between text-[11px] font-semibold text-[#113D36]">
                <span>Step {item.step} of 04</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#113D36]" />
              </div>
            </div>
          ))}
        </div>

        {/* Read More Link */}
        <div className="mt-12 text-center">
          <Link
            to="/how-it-works"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#113D36] hover:text-[#144A42] underline underline-offset-4 transition-colors"
          >
            <span>{language === 'mr' ? 'संपूर्ण मार्गदर्शक व नियम पहा' : 'Read complete step-by-step submission guide'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
