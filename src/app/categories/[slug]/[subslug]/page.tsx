'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import BottomCtaSection from '@/components/BottomCtaSection';
import { CATEGORIES, MOCK_MERCHANT_LISTINGS } from '@/data/mockData';
import { 
  Star, 
  ThumbsUp, 
  Phone, 
  MapPin, 
  Check, 
  SlidersHorizontal, 
  Zap, 
  ShieldCheck, 
  Send, 
  ChevronRight, 
  ArrowRight,
  ArrowLeft,
  Filter,
  CheckCircle2
} from 'lucide-react';

interface SubCategoryPageProps {
  params: {
    slug: string;
    subslug: string;
  };
}

export default function SubCategoryListingsPage({ params }: SubCategoryPageProps) {
  const category = CATEGORIES.find((c) => c.slug === params.slug);
  const subcategory = category?.subcategories?.find((s) => s.slug === params.subslug);

  if (!category || !subcategory) {
    notFound();
  }

  // Filter listings for this subcategory or fallback to category listings
  const filteredListings = MOCK_MERCHANT_LISTINGS.filter(
    (m) => m.subCategorySlug === subcategory.slug || m.categorySlug === category.slug
  );

  // Filter pill states
  const [activeFilter, setActiveFilter] = useState<'All' | 'Top Rated' | 'Verified' | 'Quick Response'>('All');
  const [enquirySent, setEnquirySent] = useState(false);
  const [enquiryName, setEnquiryName] = useState('DEVARAPALLI HITAISHI');
  const [enquiryPhone, setEnquiryPhone] = useState('8977520059');
  const [propertyType, setPropertyType] = useState<'Residential' | 'Commercial'>('Residential');
  const [callModalNumber, setCallModalNumber] = useState<string | null>(null);

  const displayListings = filteredListings.filter((item) => {
    if (activeFilter === 'Top Rated') return item.rating >= 4.8;
    if (activeFilter === 'Verified') return item.verified;
    if (activeFilter === 'Quick Response') return item.tag === 'Trending' || item.tag === 'Popular';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      {/* Direct Call Toast */}
      {callModalNumber && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in">
          <Phone className="w-4 h-4 text-emerald-400" />
          <span>Connecting you directly to verified merchant: <strong className="text-emerald-400 font-mono">{callModalNumber}</strong></span>
          <button onClick={() => setCallModalNumber(null)} className="ml-3 text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Top Navigation Row with Back Button */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined' && window.history.length > 1) {
                window.history.back();
              } else {
                window.location.href = `/categories/${category.slug}`;
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 shadow-xs transition-all cursor-pointer hover:border-blue-400"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          {/* Breadcrumb Navigation matching Image 3 */}
          <nav className="text-[11px] text-slate-500 flex flex-wrap items-center gap-1.5 font-medium">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>&gt;</span>
            <Link href="/categories" className="hover:text-blue-600 transition-colors">{category.name}</Link>
            <span>&gt;</span>
            <Link href={`/categories/${category.slug}`} className="hover:text-blue-600 transition-colors">{category.name} in Mumbai</Link>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">{subcategory.name} in Mumbai</span>
            <span>&gt;</span>
            <span className="text-slate-400">5543+ Listings</span>
          </nav>
        </div>

        {/* Page Heading matching Image 3 */}
        <div className="mb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Trusted {subcategory.name} in Mumbai & Metro Cities
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse verified store owners, photos, phone numbers, and request instant free quotes.
          </p>
        </div>

        {/* Filter Pills Bar matching Image 3 */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar text-xs font-medium">
          <div className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-semibold flex items-center gap-1 shrink-0 cursor-pointer">
            <span>Sort by</span>
            <span className="text-[10px]">▾</span>
          </div>

          <button
            onClick={() => setActiveFilter(activeFilter === 'Top Rated' ? 'All' : 'Top Rated')}
            className={`px-3 py-1.5 rounded-lg border transition-all shrink-0 flex items-center gap-1.5 ${
              activeFilter === 'Top Rated'
                ? 'bg-blue-600 border-blue-600 text-white font-bold'
                : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Top Rated</span>
          </button>

          <button
            onClick={() => setActiveFilter(activeFilter === 'Quick Response' ? 'All' : 'Quick Response')}
            className={`px-3 py-1.5 rounded-lg border transition-all shrink-0 flex items-center gap-1.5 ${
              activeFilter === 'Quick Response'
                ? 'bg-blue-600 border-blue-600 text-white font-bold'
                : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Quick Response</span>
          </button>

          <button
            onClick={() => setActiveFilter(activeFilter === 'Verified' ? 'All' : 'Verified')}
            className={`px-3 py-1.5 rounded-lg border transition-all shrink-0 flex items-center gap-1.5 ${
              activeFilter === 'Verified'
                ? 'bg-blue-600 border-blue-600 text-white font-bold'
                : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Needora Verified</span>
          </button>

          <div className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 shrink-0 cursor-pointer">
            Properties Served ▾
          </div>
          <div className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 shrink-0 cursor-pointer">
            Commercial Type ▾
          </div>
          <div className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 shrink-0 cursor-pointer">
            Residential Type ▾
          </div>

          <div className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-semibold flex items-center gap-1 shrink-0 ml-auto cursor-pointer">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>All Filters</span>
          </div>
        </div>

        {/* 2-Column Layout matching Image 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Merchant Listings Cards */}
          <div className="lg:col-span-8 space-y-5">
            {displayListings.map((merchant) => (
              <div
                key={merchant.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-lg transition-all"
              >
                <div className="flex flex-col sm:flex-row gap-5">
                  
                  {/* Merchant Storefront Image */}
                  <div className="relative w-full sm:w-48 h-40 sm:h-36 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                    <img
                      src={merchant.image}
                      alt={merchant.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-md font-medium">
                      Verified Store
                    </span>
                  </div>

                  {/* Merchant Details */}
                  <div className="flex-1 min-w-0 space-y-2">
                    
                    {/* Header with ThumbsUp matching Image 3 */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
                          <ThumbsUp className="w-3 h-3 fill-current" />
                        </div>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                          {merchant.name}
                        </h2>
                      </div>
                    </div>

                    {/* Rating row with Trending tag matching Image 3 */}
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1 bg-emerald-700 text-white px-2 py-0.5 rounded-md font-bold text-xs">
                        <span>{merchant.rating.toFixed(1)}</span>
                        <Star className="w-3 h-3 fill-current" />
                      </div>
                      <span className="text-slate-500 font-medium">{merchant.ratingCount} Ratings</span>
                      {merchant.tag && (
                        <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                          {merchant.tag}
                        </span>
                      )}
                    </div>

                    {/* Location with Pin */}
                    <p className="text-xs text-slate-600 flex items-start gap-1 leading-snug">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{merchant.location}</span>
                    </p>

                    {/* Services Tags matching Image 3 */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {merchant.services.map((srv, idx) => (
                        <span 
                          key={idx} 
                          className="px-2.5 py-0.5 bg-slate-100 rounded-md text-[11px] text-slate-700 font-medium"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>

                    {/* High Call Pickup Rate note */}
                    {merchant.callPickUpRate && (
                      <p className="text-[11px] text-amber-700 font-medium flex items-center gap-1 pt-0.5">
                        <Zap className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>{merchant.callPickUpRate}</span>
                      </p>
                    )}

                  </div>

                </div>

                {/* Bottom Action Row: Call, WhatsApp, Send Enquiry matching Image 3 */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2.5">
                  {/* Call Button */}
                  <a
                    href={`tel:${merchant.phone}`}
                    onClick={() => setCallModalNumber(merchant.displayPhone)}
                    className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{merchant.displayPhone}</span>
                  </a>

                  {/* WhatsApp Button */}
                  <a
                    href={`https://wa.me/${merchant.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2 bg-[#25D366] hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <span>WhatsApp</span>
                  </a>

                  {/* Send Enquiry Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setEnquirySent(true);
                      setTimeout(() => setEnquirySent(false), 3000);
                    }}
                    className="flex-1 sm:flex-none px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs ml-auto"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Enquiry</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Right Column: "Get the List of Top Estate Agents" Sticky Card matching Image 3 */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                Get the List of Top <span className="text-blue-600">{subcategory.name}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                We&apos;ll send you contact details in seconds for free
              </p>

              {enquirySent ? (
                <div className="py-8 text-center space-y-2">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Enquiry Dispatched!</h4>
                  <p className="text-xs text-slate-500">
                    Top 3 verified merchants have received your request and will call you on {enquiryPhone}.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setEnquirySent(true);
                  }}
                  className="space-y-4 mt-4"
                >
                  {/* Property type radio */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-2">
                      Type of Property / Service interested in?
                    </label>
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-800">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="ptype"
                          checked={propertyType === 'Residential'}
                          onChange={() => setPropertyType('Residential')}
                          className="text-blue-600"
                        />
                        <span>Residential</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="ptype"
                          checked={propertyType === 'Commercial'}
                          onChange={() => setPropertyType('Commercial')}
                          className="text-blue-600"
                        />
                        <span>Commercial</span>
                      </label>
                    </div>
                  </div>

                  {/* Name Input matching Image 3 */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 font-semibold text-slate-800"
                    />
                  </div>

                  {/* Phone Input matching Image 3 */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={enquiryPhone}
                      onChange={(e) => setEnquiryPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 font-semibold text-slate-800"
                    />
                  </div>

                  {/* Action button */}
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Send Enquiry &gt;&gt;&gt;</span>
                  </button>
                </form>
              )}
            </div>

            {/* Customers "Top Picks" Card matching Image 3 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <ThumbsUp className="w-3.5 h-3.5 text-blue-600" />
                <span>Customers &quot;Top Picks&quot;</span>
              </div>
              <p className="text-[11px] text-slate-500">
                {subcategory.name} in Mumbai with highest customer return orders.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative h-24 rounded-xl overflow-hidden bg-slate-100">
                  <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300" alt="Pick 1" className="w-full h-full object-cover" />
                </div>
                <div className="relative h-24 rounded-xl overflow-hidden bg-slate-100">
                  <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300" alt="Pick 2" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

      <BottomCtaSection />
    </div>
  );
}
