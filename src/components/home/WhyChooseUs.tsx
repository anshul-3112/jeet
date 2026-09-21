import React from 'react';
import { Clock, ShieldCheck, MapPin, Layers, PhoneCall, CheckCircle } from 'lucide-react';
import { businessConfig } from '../../data/business';
import { useLanguage } from '../../context/LanguageContext';

export const WhyChooseUs: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Clock className="w-6 h-6 text-emerald-600" />,
      title: t.whyChooseUs.point1Title,
      desc: t.whyChooseUs.point1Desc
    },
    {
      icon: <Layers className="w-6 h-6 text-brand-600" />,
      title: t.whyChooseUs.point2Title,
      desc: t.whyChooseUs.point2Desc
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-600" />,
      title: t.whyChooseUs.point3Title,
      desc: t.whyChooseUs.point3Desc
    },
    {
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      title: t.whyChooseUs.point4Title,
      desc: t.whyChooseUs.point4Desc
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-amber-300 border border-white/15 mb-3">
            {t.whyChooseUs.tag}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
            {t.whyChooseUs.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            {t.whyChooseUs.subtitle}
          </p>
        </div>

        {/* Features 4-Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 hover:border-brand-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/10 flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Verified Local Service</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner with Marathi Slogan from Brochure */}
        <div className="mt-12 bg-white/10 border border-white/15 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-sm font-bold text-amber-300 font-marathi">
              {businessConfig.taglineMr}
            </p>
            <p className="text-xs text-slate-300 font-marathi mt-0.5">
              {businessConfig.address.fullMarathi}
            </p>
          </div>
          <a
            href={`tel:${businessConfig.primaryPhone}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex-shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call {businessConfig.primaryPhone}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
