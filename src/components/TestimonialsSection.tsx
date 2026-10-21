'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { TESTIMONIALS } from '@/data/mockData';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              What Our Users Say
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-1">
              Real people. Real experiences.
            </p>
          </div>

          <Link 
            href="/about"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors self-start sm:self-auto group cursor-pointer"
          >
            <span>View All Reviews</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Testimonial Cards matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm border-2 border-white shadow-xs">
                  {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{t.name}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>

              <blockquote className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-medium text-slate-400">
                Verified review • {t.serviceUsed}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
