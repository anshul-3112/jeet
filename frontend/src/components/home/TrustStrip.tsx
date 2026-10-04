import React from 'react';
import { Clock, MapPin, Layers, CheckCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const TrustStrip: React.FC = () => {
  const { language } = useLanguage();

  const trustItems = [
    {
      icon: <Clock className="w-4 h-4 text-[#0B3830]" />,
      title: language === 'mr' ? '२४ तास अखंड सेवा' : 'Open 24 Hours',
      desc: language === 'mr' ? 'कधीही संपर्क करा' : '24x7 Assistance Available'
    },
    {
      icon: <MapPin className="w-4 h-4 text-[#0B3830]" />,
      title: language === 'mr' ? 'अयोध्या नगर चौक' : 'Ayodhya Nagar Square',
      desc: language === 'mr' ? 'नागपूर-२४ मोक्याचे ठिकाण' : 'Nagpur-24 Prime Center'
    },
    {
      icon: <Layers className="w-4 h-4 text-amber-700" />,
      title: language === 'mr' ? '२०+ सेवा एकाच छताखाली' : '20+ Services Under 1 Roof',
      desc: language === 'mr' ? 'शासकीय व खाजगी सेवा' : 'Govt & Private Solutions'
    },
    {
      icon: <CheckCheck className="w-4 h-4 text-[#0B3830]" />,
      title: language === 'mr' ? 'अचूक कागदपत्र तपासणी' : 'Verified Submissions',
      desc: language === 'mr' ? 'अर्ज नामंजूर होणार नाही' : 'Zero Rejection Guarantee'
    }
  ];

  return (
    <div className="bg-white border-y border-slate-200 py-6 relative z-10 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {trustItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-sm transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 shadow-2xs">
                {item.icon}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
