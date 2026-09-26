import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, UploadCloud, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const HowItWorksPreview: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      step: '01',
      icon: <MessageSquare className="w-6 h-6 text-brand-600" />,
      title: t.process.step1Title,
      desc: t.process.step1Desc
    },
    {
      step: '02',
      icon: <UploadCloud className="w-6 h-6 text-blue-600" />,
      title: t.process.step2Title,
      desc: t.process.step2Desc
    },
    {
      step: '03',
      icon: <Cpu className="w-6 h-6 text-amber-600" />,
      title: t.process.step3Title,
      desc: t.process.step3Desc
    },
    {
      step: '04',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
      title: t.process.step4Title,
      desc: t.process.step4Desc
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-govnavy-50 text-govnavy-700 border border-govnavy-200 mb-3">
            {t.process.tag}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-govnavy-900 tracking-tight">
            {t.process.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {t.process.subtitle}
          </p>
        </div>

        {/* 4-Step Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, index) => (
            <div key={index} className="relative bg-slate-50 rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-between group hover:bg-white hover:shadow-card hover:border-brand-200 transition-all duration-300">
              
              {/* Step Number Watermark */}
              <div className="absolute top-4 right-4 text-3xl font-black text-slate-200 group-hover:text-brand-100 transition-colors">
                {item.step}
              </div>

              <div>
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>

                <h3 className="text-base font-bold text-govnavy-900 mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60">
                <span className="text-[11px] font-semibold text-brand-600 inline-flex items-center gap-1">
                  <span>Fast Assistance</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Read More Link */}
        <div className="mt-12 text-center">
          <Link
            to="/how-it-works"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-700 underline underline-offset-4"
          >
            <span>Read complete step-by-step submission guide</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
