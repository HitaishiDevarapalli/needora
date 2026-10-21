'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import BottomCtaSection from '@/components/BottomCtaSection';
import { CATEGORIES, MOCK_MERCHANT_LISTINGS } from '@/data/mockData';
import { 
  Armchair, 
  Building2, 
  Utensils, 
  Hotel, 
  Flower2, 
  HardHat, 
  Truck, 
  HeartPulse, 
  Smile, 
  Users, 
  GraduationCap, 
  Wallet,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Star,
  MapPin,
  Phone,
  Search,
  ChevronRight
} from 'lucide-react';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function SingleCategoryPage({ params }: CategoryPageProps) {
  const category = CATEGORIES.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  // Filter listings matching category
  const listings = MOCK_MERCHANT_LISTINGS.filter(
    (m) => m.categorySlug === category.slug
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Navigation Row with Back Button */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined' && window.history.length > 1) {
                window.history.back();
              } else {
                window.location.href = '/categories';
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 shadow-xs transition-all cursor-pointer hover:border-blue-400"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          
          <nav className="text-xs text-slate-500 flex items-center gap-2">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-blue-600 transition-colors">Categories</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">{category.name}</span>
          </nav>
        </div>

        {/* Category Header Banner with Search (Matching Justdial Image 2) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Hyperlocal Business Directory
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
                {category.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
                {category.description}
              </p>
            </div>

            <Link
              href="/listing"
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs shrink-0 flex items-center gap-1.5"
            >
              <span>+ List Your {category.name} Store</span>
            </Link>
          </div>

          {/* Search bar inside category matching Image 2 */}
          <div className="pt-6 max-w-xl">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder={`Search All ${category.name} Categories, Stores, or Products...`}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* SUBCATEGORIES LIST (Matching Image 2: e.g. Room Furniture, Furnishing, Lamps & Lights, Kitchen & Dining, Interior Designers) */}
        {category.subcategories && category.subcategories.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">
                Explore {category.name} Sub-Categories
              </h2>
              <span className="text-xs text-slate-500">Click any subcategory to view merchant listings</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/categories/${category.slug}/${sub.slug}`}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base group-hover:scale-110 transition-transform">
                      {sub.name.slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {sub.name}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {sub.itemCount}
                      </span>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-slate-50 group-hover:bg-blue-600 text-slate-400 group-hover:text-white flex items-center justify-center transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Top Verified Merchants in this category */}
        {listings.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Featured Verified Stores in {category.name}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Top-rated businesses with direct contact and instant quotes
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {listings.map((m) => (
                <div
                  key={m.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-slate-100"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900 truncate">{m.name}</h3>
                          {m.verified && (
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200 shrink-0">
                              ✓ Verified
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1 bg-emerald-700 text-white px-2 py-0.5 rounded-md text-xs font-bold">
                            <span>{m.rating}</span>
                            <Star className="w-3 h-3 fill-current" />
                          </div>
                          <span className="text-xs text-slate-500">{m.ratingCount} Ratings</span>
                          {m.tag && (
                            <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                              {m.tag}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-500 mt-2 flex items-center gap-1 truncate">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{m.location}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {m.services.map((srv, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600 font-medium">
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <a
                      href={`tel:${m.phone}`}
                      className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{m.displayPhone}</span>
                    </a>

                    <a
                      href={`https://wa.me/${m.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 bg-[#25D366] hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>WhatsApp</span>
                    </a>

                    <Link
                      href={`/categories/${category.slug}/${m.subCategorySlug}`}
                      className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      <BottomCtaSection />
    </div>
  );
}
