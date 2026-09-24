import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const HeroSection: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="bg-white pt-12 pb-20 lg:pt-24 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          
          {/* Left Column (Content & Form) */}
          <div className="w-full lg:w-5/12 space-y-6">
            
            {/* Tagline */}
            <p className="text-sm font-bold text-slate-700 tracking-wide uppercase">
              Expert Services | Quick Processing | Hassle-Free Paperwork
            </p>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              {language === 'mr' ? (
                <>
                  शासकीय काम? <br />
                  <span className="text-brand-600">आम्ही तयार आहोत!</span>
                </>
              ) : (
                <>
                  Government Forms? <br />
                  <span className="text-brand-600">We Are Ready!</span>
                </>
              )}
            </h1>

            {/* Form Card (Blue) */}
            <div className="bg-brand-600 rounded-3xl p-8 mt-8 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6">
                Book Your Service Now
              </h2>
              
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); /* form logic */ }}>
                <div>
                  <input 
                    type="text" 
                    placeholder="Enter your full name" 
                    className="w-full bg-white text-slate-900 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-saffron-500"
                    required
                  />
                </div>
                <div>
                  <select 
                    className="w-full bg-white text-slate-900 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-saffron-500 appearance-none"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>Select Service</option>
                    <option value="aadhaar">Aadhaar Services</option>
                    <option value="pan">PAN Card</option>
                    <option value="caste">Caste Validity</option>
                    <option value="other">Other Certificates</option>
                  </select>
                </div>
                <div>
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    className="w-full bg-white text-slate-900 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-saffron-500"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-saffron-500 hover:bg-saffron-400 text-slate-900 font-bold rounded-xl px-4 py-4 mt-2 transition-colors"
                >
                  Book Now
                </button>
              </form>
            </div>
          </div>

          {/* Right Column (Image) */}
          <div className="w-full lg:w-7/12 relative">
            <div className="rounded-[40px] overflow-hidden shadow-2xl relative bg-slate-100 aspect-[4/3] lg:aspect-auto lg:h-[700px]">
              <img 
                src="/hero-image.jpg" 
                alt="Seva Kendra Staff Assisting Customer" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
