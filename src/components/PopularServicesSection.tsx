'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ArrowRight, ArrowUpRight, Utensils, ShoppingBag, Home, Flower2, GraduationCap } from 'lucide-react';
import { POPULAR_SERVICES } from '@/data/mockData';
import { ServiceItem } from '@/types';

interface PopularServicesSectionProps {
  onSelectService?: (service: ServiceItem) => void;
}

export default function PopularServicesSection({ onSelectService }: PopularServicesSectionProps) {
  
  const getBadgeIcon = (title: string) => {
    switch (title) {
      case 'Food Delivery':
        return <Utensils className="w-3.5 h-3.5 text-orange-600" />;
      case 'Grocery Delivery':
        return <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />;
      case 'Home Cleaning':
        return <Home className="w-3.5 h-3.5 text-blue-600" />;
      case 'Beauty & Salon':
        return <Flower2 className="w-3.5 h-3.5 text-pink-600" />;
      case 'Tuition & Learning':
        return <GraduationCap className="w-3.5 h-3.5 text-teal-600" />;
      default:
        return <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />;
    }
  };

  const getBadgeBg = (title: string) => {
    switch (title) {
      case 'Food Delivery': return 'bg-orange-50 border-orange-100';
      case 'Grocery Delivery': return 'bg-emerald-50 border-emerald-100';
      case 'Home Cleaning': return 'bg-blue-50 border-blue-100';
      case 'Beauty & Salon': return 'bg-pink-50 border-pink-100';
      case 'Tuition & Learning': return 'bg-teal-50 border-teal-100';
      default: return 'bg-blue-50 border-blue-100';
    }
  };

  return (
    <section id="popular-services" className="py-14 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Popular Services
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-1">
              Top services loved by millions of users.
            </p>
          </div>

          <Link 
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors self-start sm:self-auto group"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 5 Cards Row matching reference screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {POPULAR_SERVICES.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-200 flex flex-col group cursor-pointer"
            >
              {/* Image banner */}
              <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Card Body */}
              <div className="p-4 flex flex-col flex-1">
                {/* Title with small badge icon */}
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center border ${getBadgeBg(service.title)}`}>
                    {getBadgeIcon(service.title)}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                    {service.title}
                  </h3>
                </div>

                {/* Subtitle / Description */}
                <p className="text-xs text-slate-500 leading-snug line-clamp-2 mb-4 flex-1">
                  {service.tagline}
                </p>

                {/* Bottom Row: Rating and Action Circle Button */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-auto">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-slate-800">{service.rating}</span>
                    <span className="text-[11px] text-slate-400">({service.reviewCount})</span>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-slate-50 group-hover:bg-blue-600 text-slate-400 group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
