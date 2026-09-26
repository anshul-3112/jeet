import React from 'react';
import { Clock, MapPin, Layers, CheckCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const TrustStrip: React.FC = () => {
  const { language } = useLanguage();

  const trustItems = [
    {
      icon: <Clock className="w-4 h-4 text-[#113D36]" />,
      title: language === 'mr' ? '२४ तास अखंड सेवा' : 'Open 24 Hours',
      desc: language === 'mr' ? 'कधीही संपर्क करा' : '24x7 Assistance'
    },
    {
      icon: <MapPin className="w-4 h-4 text-[#113D36]" />,
      title: language === 'mr' ? 'अयोध्या नगर चौक' : 'Ayodhya Nagar',
      desc: language === 'mr' ? 'नागपूर-२४ मोक्याचे ठिकाण' : 'Nagpur-24 Center'
    },
    {
      icon: <Layers className="w-4 h-4 text-[#C27E4B]" />,
      title: language === 'mr' ? '२०+ सेवा एकाच छताखाली' : '20+ Services Under 1 Roof',
      desc: language === 'mr' ? 'शासकीय व खाजगी सेवा' : 'Govt & Private Solutions'
    },
    {
      icon: <CheckCheck className="w-4 h-4 text-[#113D36]" />,
      title: language === 'mr' ? 'अचूक कागदपत्र तपासणी' : 'Verified Submissions',
      desc: language === 'mr' ? 'अर्ज नामंजूर होणार नाही' : 'Zero Error Guarantee'
    }
  ];

  return (
    <div className="bg-white border-y border-[#EAE4DC] py-6 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {trustItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3.5 p-2 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-[#F2F8F6] border border-[#C2DDD4] flex items-center justify-center flex-shrink-0 shadow-2xs">
                {item.icon}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#152220] leading-tight font-sans">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#798C87] font-medium mt-0.5">
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
