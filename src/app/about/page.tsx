import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import BottomCtaSection from '@/components/BottomCtaSection';
import { ShieldCheck, Users, Store, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'About Us — Needora',
  description: 'Learn about Needora mission to empower local Indian merchants and connect consumers.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">About Us</span>
        </nav>

        {/* Hero */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 mb-12 shadow-xs">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Our Purpose & Story
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Empowering India’s Local Commerce Ecosystem
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Needora was born with a single vision: to bring trusted neighborhood sweet shops, certified home technicians, fresh farm marts, and salons together onto a unified, transparent digital marketplace.
            </p>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">100% Police & Document Verified</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every merchant goes through strict GSTIN, FSSAI, and physical address audits before receiving the Needora Gold Badge.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Fair Commission for Merchants</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Unlike traditional aggregator giants, Needora offers transparent flat platform fees so local family-run businesses thrive.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Vernacular Voice Search</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Built for every Indian customer with native support for Telugu, Hindi, and English voice discovery.
            </p>
          </div>
        </div>

      </main>

      <BottomCtaSection />
    </div>
  );
}
