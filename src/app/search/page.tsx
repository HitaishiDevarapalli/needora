'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Search, 
  MapPin, 
  Filter, 
  Store, 
  CheckCircle, 
  X, 
  Phone, 
  MessageSquare, 
  SlidersHorizontal 
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import { getStoredBusinesses, StoredBusiness } from '@/lib/storage';
import { CATEGORIES } from '@/data/mockData';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [businesses, setBusinesses] = useState<StoredBusiness[]>([]);
  const [selectedBusinessForEnquiry, setSelectedBusinessForEnquiry] = useState<{ id: string; name: string; category: string } | null>(null);

  useEffect(() => {
    const list = getStoredBusinesses();
    setBusinesses(list);
  }, []);

  const filteredBusinesses = businesses.filter(b => {
    const matchesSearch = 
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || b.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesCity = selectedCity === 'all' || b.city.toLowerCase().includes(selectedCity.toLowerCase());
    const matchesVerified = !verifiedOnly || b.verified;

    return matchesSearch && matchesCategory && matchesCity && matchesVerified;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Search Platform</span>
        </div>

        {/* Search Header Banner */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
            Search Local Businesses & Services
          </h1>
          <p className="text-sm text-slate-600 mb-6 max-w-2xl">
            Find verified stores, electricians, home decor, tuition, restaurants, and medical services near you. Zero payment required to connect.
          </p>

          {/* Search Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by business name, service (e.g. AC repair, bakery, salon)..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-3 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3 flex items-center gap-2">
              <label className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Verified Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Search Results</h2>
            <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
              {filteredBusinesses.length} found
            </span>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Direct Contact & Free Enquiry Model
          </div>
        </div>

        {/* Results List */}
        {filteredBusinesses.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center max-w-xl mx-auto my-8">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">No matching businesses found</h3>
            <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">
              We couldn&apos;t find any businesses matching your search criteria. You can register your store or try a different search keyword.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setVerifiedOnly(false);
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
              >
                Clear Filters
              </button>
              <Link
                href="/listing"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
              >
                List Your Business
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map(biz => (
              <div 
                key={biz.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-slate-900 text-base">{biz.name}</h3>
                        {biz.verified && (
                          <span title="Verified by Needora Admin">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                          </span>
                        )}
                      </div>
                      <span className="inline-block mt-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                        {biz.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                    {biz.description || 'Verified local merchant offering prompt customer support.'}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{biz.address}, {biz.city}</span>
                  </div>

                  <div className="text-[11px] text-slate-400">
                    Hours: <span className="text-slate-700 font-semibold">{biz.hours || 'Open Mon-Sun 9AM - 9PM'}</span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedBusinessForEnquiry({ id: biz.id, name: biz.name, category: biz.category })}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg text-center transition-all"
                  >
                    Send Free Enquiry
                  </button>
                  <a
                    href={`tel:${biz.phone}`}
                    className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg transition-all"
                    title="Call Merchant"
                  >
                    <Phone className="w-4 h-4 text-blue-600" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Free Direct Enquiry Modal */}
      {selectedBusinessForEnquiry && (
        <BookingModal
          isOpen={true}
          onClose={() => setSelectedBusinessForEnquiry(null)}
          serviceName={selectedBusinessForEnquiry.name}
          category={selectedBusinessForEnquiry.category}
          providerName={selectedBusinessForEnquiry.name}
        />
      )}

      <Footer />
    </div>
  );
}
