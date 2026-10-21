import React from 'react';
import Link from 'next/link';
import { POPULAR_SERVICES, CATEGORIES } from '@/data/mockData';
import Header from '@/components/Header';
import BottomCtaSection from '@/components/BottomCtaSection';
import { Star, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'All Services — Needora',
  description: 'Explore on-demand doorstep home services, food delivery, beauty, repairs, and coaching.',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <nav className="text-xs text-slate-500 mb-2 flex items-center gap-2">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Services</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Explore All Local Services
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-2xl">
            Verified, police-checked professionals and hygiene-certified stores delivered right to your doorstep across Hyderabad, Bengaluru, and major metro hubs.
          </p>
        </div>

        {/* Quick Category Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <span className="text-xs font-bold text-slate-700 shrink-0">Filter by Category:</span>
          <Link
            href="/services"
            className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-600 text-white shrink-0"
          >
            All Services
          </Link>
          {CATEGORIES.slice(0, 7).map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 shrink-0 transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {POPULAR_SERVICES.map((serv) => (
            <Link
              key={serv.id}
              href={`/services/${serv.slug}`}
              className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 transition-all flex flex-col"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={serv.image}
                  alt={serv.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {serv.badge && (
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-blue-700 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                    {serv.badge}
                  </span>
                )}
                <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{serv.rating}</span>
                  <span className="text-slate-400 font-normal">({serv.reviewCount})</span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-1">
                    {serv.category}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {serv.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {serv.description || serv.tagline}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Merchant Connection</span>
                    <span className="text-xs font-bold text-emerald-600">Free Enquiry</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                    <span>Send Enquiry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </main>

      <BottomCtaSection />
    </div>
  );
}
