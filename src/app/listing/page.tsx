'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import BottomCtaSection from '@/components/BottomCtaSection';
import { 
  Building2, 
  CheckCircle, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  Upload, 
  ArrowRight, 
  Store,
  Users,
  TrendingUp,
  Tag
} from 'lucide-react';
import { CATEGORIES } from '@/data/mockData';

export default function FreeListingPage() {
  const [businessName, setBusinessName] = useState('');
  const [city, setCity] = useState('Mumbai');
  const [pincode, setPincode] = useState('400053');
  const [category, setCategory] = useState('Home Decor');
  const [ownerName, setOwnerName] = useState('Hitaishi Devarapalli');
  const [phone, setPhone] = useState('8977520059');
  const [gstin, setGstin] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [listingId, setListingId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = 'LST-' + Math.floor(100000 + Math.random() * 900000);
    setListingId(newId);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Free Business Listing</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left: Value Proposition */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
              <Tag className="w-3.5 h-3.5" />
              <span>Free Business Listing for Local Merchants</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Grow Your Business with Millions of Needora Customers
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed">
              List your retail shop, clinic, salon, or service center for free. Get direct telephone calls, WhatsApp inquiries, and orders with 0% setup fee.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Reach Hyperlocal Customers</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Show up whenever customers search in your pin code and neighborhood.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Direct Calls & WhatsApp Inquiries</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Customers contact you directly without any intermediaries or hidden commissions.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Needora Verified Trust Badge</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Gain trust with verified GST/FSSAI credentials and authentic customer reviews.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Merchant Registration Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Business Listing Submitted!</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Listing Reference: <span className="font-mono font-bold text-blue-600">{listingId}</span>. Your business profile has been created and will appear across Needora search in 15 minutes.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <Link
                    href="/merchant"
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-sm"
                  >
                    Go to Merchant Dashboard
                  </Link>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50"
                  >
                    List Another Business
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-xl font-bold text-slate-900">List Your Business in 2 Minutes</h2>
                  <p className="text-xs text-slate-500 mt-0.5">100% Free Forever • Instant Activation</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Business / Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Living Furniture & Decor Studio"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">City *</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                    >
                      <option>Mumbai</option>
                      <option>Hyderabad</option>
                      <option>Bengaluru</option>
                      <option>Delhi NCR</option>
                      <option>Pune</option>
                      <option>Chennai</option>
                      <option>Kolkata</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Pincode *</label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="e.g. 400053"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Business Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Owner / Contact Person *</label>
                    <input
                      type="text"
                      required
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="e.g. Ramesh Shah"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Mobile Number *</label>
                    <div className="flex rounded-xl border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                      <span className="bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600 border-r border-slate-200 flex items-center">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 focus:bg-white text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">GSTIN (Optional for Badge)</label>
                    <input
                      type="text"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value.toUpperCase())}
                      placeholder="e.g. 27AABCS1429B1Z8"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 font-mono text-slate-800"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Submit Free Business Listing</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    By submitting, you agree to Needora Merchant Terms of Service and receive lead notifications via SMS/WhatsApp.
                  </p>
                </div>
              </form>
            )}
          </div>

        </div>

      </main>

      <BottomCtaSection />
    </div>
  );
}
