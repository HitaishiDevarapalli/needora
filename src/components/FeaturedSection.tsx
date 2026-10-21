'use client';

import React from 'react';
import { ArrowRight, Utensils, Home, ShoppingBag, Flower2, Users, Store, LayoutGrid, Star } from 'lucide-react';
import { FEATURED_ITEMS, STATS } from '@/data/mockData';

export default function FeaturedSection() {
  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils': return <Utensils className="w-3.5 h-3.5 text-orange-600" />;
      case 'Home': return <Home className="w-3.5 h-3.5 text-blue-600" />;
      case 'ShoppingBag': return <ShoppingBag className="w-3.5 h-3.5 text-purple-600" />;
      case 'Flower2': return <Flower2 className="w-3.5 h-3.5 text-pink-600" />;
      default: return <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />;
    }
  };

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="w-5 h-5 text-blue-600" />;
      case 'Store': return <Store className="w-5 h-5 text-blue-600" />;
      case 'Grid': return <LayoutGrid className="w-5 h-5 text-blue-600" />;
      case 'Star': return <Star className="w-5 h-5 text-blue-600" />;
      default: return <Star className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="featured" className="py-16 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Featured on Needora
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-1">
              Discover the latest and most popular services, handpicked for you.
            </p>
          </div>

          <button 
            type="button"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors self-start sm:self-auto group"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Featured Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {FEATURED_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-200 flex flex-col group cursor-pointer"
            >
              <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 flex flex-col flex-1">
                {/* Badge & Title */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center">
                    {getBadgeIcon(item.badgeIcon)}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                    {item.title}
                  </h3>
                </div>

                {/* Subtitle */}
                <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-1">
                  {item.description}
                </p>

                {/* Arrow Link */}
                <div className="flex items-center justify-end pt-2 border-t border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-slate-50 group-hover:bg-blue-600 text-slate-400 group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Row with Handwritten annotation matching reference */}
        <div className="relative bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  {getStatIcon(stat.icon)}
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Handwritten Annotation on Right */}
          <div className="hidden lg:flex absolute -top-5 right-6 items-center gap-2 pointer-events-none">
            <span className="text-xs font-bold text-blue-700 transform -rotate-3">
              Join thousands <br /> who trust Needora
            </span>
            <svg className="w-8 h-8 text-blue-500" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 25 C 10 15, 20 10, 25 5" />
              <path d="M18 5 L 25 5 L 25 12" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
