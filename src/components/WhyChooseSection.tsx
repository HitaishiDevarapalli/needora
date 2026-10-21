'use client';

import React from 'react';
import { ShieldCheck, CreditCard, Headphones, CalendarCheck2, Search, Utensils, ShoppingBag, Sparkles } from 'lucide-react';

export default function WhyChooseSection() {
  const features = [
    {
      title: 'Trusted Providers',
      desc: 'Verified & reliable service partners',
      icon: ShieldCheck,
      bgColor: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      title: 'Secure Payments',
      desc: 'Safe & flexible payment options',
      icon: CreditCard,
      bgColor: 'bg-teal-50 text-teal-600 border-teal-100',
    },
    {
      title: '24/7 Support',
      desc: "We're always here to help",
      icon: Headphones,
      bgColor: 'bg-rose-50 text-rose-600 border-rose-100',
    },
    {
      title: 'Easy Booking',
      desc: 'Quick & hassle-free process',
      icon: CalendarCheck2,
      bgColor: 'bg-purple-50 text-purple-600 border-purple-100',
    },
  ];

  return (
    <section id="why-choose" className="py-16 bg-white overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & 4 Feature Blocks */}
          <div className="lg:col-span-7 flex flex-col">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3">
              Why Choose Needora?
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl mb-10 leading-relaxed">
              We make your everyday easier with trusted services, secure payments, and seamless experiences.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {features.map((feat) => {
                const IconComponent = feat.icon;
                return (
                  <div key={feat.title} className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${feat.bgColor}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 mb-1">
                        {feat.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: App Mockup & Store Badges matching reference screenshot */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            
            {/* Background Sky Wave Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-100/70 to-blue-50/50 rounded-3xl -z-10 transform rotate-1 scale-105" />

            <div className="relative flex flex-col items-center w-full max-w-sm py-4">
              
              {/* Handwritten "Download Our App" Callout */}
              <div className="absolute -top-3 right-0 sm:right-2 flex flex-col items-end z-20 pointer-events-none">
                <span className="text-sm font-bold text-blue-700 tracking-tight">
                  Download Our App
                </span>
                <svg className="w-10 h-8 text-blue-500 -mt-1 mr-4" viewBox="0 0 40 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 5 C 18 10, 22 20, 16 28" />
                  <path d="M12 24 L 16 28 L 20 22" />
                </svg>
              </div>

              {/* Realistic Smartphone Shell */}
              <div className="w-[260px] sm:w-[280px] bg-slate-900 rounded-[44px] p-3 shadow-2xl border-4 border-slate-800 relative">
                {/* Speaker pill */}
                <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-slate-700 mr-2" />
                  <div className="w-2 h-2 rounded-full bg-slate-900" />
                </div>

                {/* Phone Screen */}
                <div className="bg-white rounded-[32px] overflow-hidden p-4 flex flex-col text-left space-y-3 shadow-inner">
                  
                  {/* Mock App Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white text-[11px] font-black">
                        N
                      </div>
                      <span className="text-xs font-bold text-slate-900">Needora</span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>

                  <div className="text-[11px] font-bold text-slate-800 leading-tight">
                    Find. Book. Get It Done
                  </div>

                  {/* Mock Search Input */}
                  <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-[10px] text-slate-400">
                    <Search className="w-3 h-3 text-slate-400" />
                    <span>Search services...</span>
                  </div>

                  {/* 4 Mini Action Circles */}
                  <div className="grid grid-cols-4 gap-1.5 pt-1 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-[10px]">
                        <Utensils className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] text-slate-600 mt-1 font-medium">Food</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-[10px]">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] text-slate-600 mt-1 font-medium">Shopping</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-[10px]">
                        <CalendarCheck2 className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] text-slate-600 mt-1 font-medium">Services</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-bold">
                        •••
                      </div>
                      <span className="text-[9px] text-slate-600 mt-1 font-medium">More</span>
                    </div>
                  </div>

                </div>

                {/* Home Indicator bar */}
                <div className="w-24 h-1 bg-slate-700 rounded-full mx-auto mt-3" />
              </div>

              {/* Download Buttons matching reference screenshot */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 z-10 w-full justify-center">
                {/* Google Play */}
                <a
                  href="#download-play"
                  className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-black text-white hover:bg-slate-800 transition-colors shadow-md text-left"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M3.609 1.814L13.793 12 3.61 22.186c-.347-.318-.61-.798-.61-1.396V3.21c0-.598.263-1.078.61-1.396zM15.207 13.414l2.766 2.766-12.75 7.37c-.36.208-.737.242-1.05.132l11.034-10.268zm0-2.828L4.173.318C4.486.208 4.863.242 5.223.45l12.75 7.37-2.766 2.766zm1.414 1.414l3.757 2.174c1.096.634 1.096 1.674 0 2.308l-3.757 2.174-2.121-2.121 2.121-2.535z"/>
                  </svg>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-slate-400 leading-none">GET IT ON</div>
                    <div className="text-xs font-bold leading-tight">Google Play</div>
                  </div>
                </a>

                {/* App Store */}
                <a
                  href="#download-apple"
                  className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-black text-white hover:bg-slate-800 transition-colors shadow-md text-left"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.78 1.06-1.87.94-2.97-1 .04-2.14.65-2.81 1.43-.59.68-1.11 1.77-.97 2.83 1.11.09 2.22-.52 2.84-1.29z"/>
                  </svg>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-slate-400 leading-none">Download on the</div>
                    <div className="text-xs font-bold leading-tight">App Store</div>
                  </div>
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
