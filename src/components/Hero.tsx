'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Mic, ArrowRight, Sparkles, MapPin } from 'lucide-react';

interface HeroProps {
  onSearchSubmit?: (query: string) => void;
  onOpenVoiceSearch?: () => void;
}

export default function Hero({ onSearchSubmit, onOpenVoiceSearch }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery);
    }
  };

  const quickPills = [
    'Home Services',
    'Food Delivery',
    'Beauty & Wellness',
    'Education',
    'Shopping'
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Search */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            
            {/* Pill Badge matching reference */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs sm:text-sm font-semibold tracking-wide mb-6 shadow-xs">
              <span>Your Everyday Needs, One Platform</span>
            </div>

            {/* Main Headline matching reference */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] mb-6">
              Find. Book. Get It Done <br className="hidden sm:inline" />
              with <span className="text-brand-600 drop-shadow-xs">Needora</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mb-8">
              From local services to online solutions, Needora connects you with trusted providers — making your life easier, faster and smarter.
            </p>

            {/* Search Bar Container matching Image 1 layout */}
            <div className="w-full max-w-2xl">
              <form 
                onSubmit={handleSearch}
                className="relative flex flex-col sm:flex-row items-center bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 p-2 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/10 transition-all gap-2 sm:gap-0"
              >
                {/* Location indicator inside Search Bar matching Image 1 */}
                <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border sm:border-r sm:border-y-0 sm:border-l-0 border-slate-200 rounded-xl sm:rounded-none sm:rounded-l-xl text-xs font-semibold text-slate-700 shrink-0 cursor-pointer">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="truncate max-w-[130px]">Tank Bazar, Mumbai</span>
                </div>

                <div className="flex items-center flex-1 w-full">
                  <div className="pl-3 pr-2 text-slate-400">
                    <Search className="w-4 h-4" />
                  </div>

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for Spa, Home Decor, Doctors, Services..."
                    className="w-full py-2.5 px-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                  />

                  {/* Voice Search Button */}
                  <button
                    type="button"
                    onClick={onOpenVoiceSearch}
                    className="p-2 text-slate-400 hover:text-brand-600 hover:bg-slate-50 rounded-xl transition-colors mr-2"
                    title="Speak in Telugu, Hindi, or English"
                    aria-label="Voice Search"
                  >
                    <Mic className="w-4 h-4" />
                  </button>

                  {/* Search Action Button */}
                  <button
                    type="submit"
                    className="shrink-0 px-6 sm:px-8 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Popular tags below search bar */}
              <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Popular:</span>
                {quickPills.map((pill, idx) => (
                  <React.Fragment key={pill}>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery(pill);
                        if (onSearchSubmit) onSearchSubmit(pill);
                      }}
                      className="text-slate-600 hover:text-brand-600 hover:underline transition-colors cursor-pointer"
                    >
                      {pill}
                    </button>
                    {idx < quickPills.length - 1 && (
                      <span className="text-slate-300">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual with floating app badges matching reference */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            {/* Background Pastel Blue Curved Backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] bg-gradient-to-tr from-sky-100/90 to-blue-50/70 rounded-full blur-2xl -z-10" />

            {/* Playful Handwritten Annotation & Arrow */}
            <div className="absolute -top-6 right-2 sm:right-6 z-20 flex flex-col items-end pointer-events-none">
              <div className="bg-white/95 backdrop-blur-xs px-4 py-1.5 rounded-full shadow-md border border-slate-100 text-[13px] font-bold text-slate-800 font-sans tracking-tight">
                Everything you need, <br className="sm:hidden" />
                <span className="text-blue-600">just a tap away!</span>
              </div>
              <svg className="w-12 h-10 text-blue-500 -mt-1 mr-6" viewBox="0 0 50 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 5 C 25 15, 30 25, 20 35" />
                <path d="M14 30 L 20 35 L 24 28" />
              </svg>
            </div>

            {/* Center Image Container */}
            <div className="relative w-[320px] sm:w-[400px] h-[400px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl shadow-indigo-100/70 border-4 border-white bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=85"
                alt="Happy Indian customer using Needora platform"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
            </div>

            {/* Floating Brand Badges matching the reference screenshot */}
            {/* Amazon */}
            <div className="absolute -top-3 left-4 sm:left-2 bg-white rounded-2xl p-2.5 shadow-lg shadow-slate-200/80 border border-slate-100 flex items-center justify-center animate-bounce duration-1000">
              <span className="text-xs font-black text-slate-900 tracking-tighter">amazon</span>
            </div>

            {/* Instagram */}
            <div className="absolute top-20 -left-6 sm:-left-8 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white rounded-2xl p-2.5 shadow-lg flex items-center justify-center">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>

            {/* Zomato */}
            <div className="absolute top-24 left-16 sm:left-12 bg-red-600 text-white rounded-2xl px-3 py-1.5 shadow-lg font-black italic text-xs tracking-wider">
              zomato
            </div>

            {/* Flipkart */}
            <div className="absolute bottom-28 -left-5 bg-[#2874F0] text-white rounded-2xl p-2.5 shadow-lg flex items-center justify-center font-bold text-xs">
              <span className="text-yellow-400 font-extrabold mr-1">f</span>
              <span>Flipkart</span>
            </div>

            {/* Uber */}
            <div className="absolute bottom-12 left-14 bg-black text-white rounded-2xl px-3 py-1.5 shadow-lg font-bold text-xs">
              Uber
            </div>

            {/* WhatsApp */}
            <div className="absolute top-36 -right-5 sm:-right-7 bg-[#25D366] text-white rounded-2xl p-2.5 shadow-lg flex items-center justify-center">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
