import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import BottomCtaSection from '@/components/BottomCtaSection';
import { CATEGORIES, MOCK_MERCHANTS, POPULAR_SERVICES } from '@/data/mockData';
import { Star, ShieldCheck, MapPin, Phone, ArrowRight, Store, Clock } from 'lucide-react';

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

  // Filter merchants matching category or related
  const matchingMerchants = MOCK_MERCHANTS.filter(
    (m) => m.category.toLowerCase().includes(category.name.toLowerCase()) || 
           category.name.toLowerCase().includes(m.category.toLowerCase())
  );

  // Filter services matching category
  const matchingServices = POPULAR_SERVICES.filter(
    (s) => s.category.toLowerCase().includes(category.name.toLowerCase()) || 
           category.name.toLowerCase().includes(s.category.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-slate-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-blue-600 transition-colors">Categories</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">{category.name}</span>
        </nav>

        {/* Category Header Banner */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
              style={{ backgroundColor: category.bgColor }}
            >
              <span className="text-xl font-bold" style={{ color: category.color }}>
                {category.name.slice(0, 2)}
              </span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {category.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                {category.description}
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-slate-600">
                <span className="text-blue-600">{category.count}</span>
                <span>•</span>
                <span>Available across Hyderabad & Bengaluru</span>
              </div>
            </div>
          </div>

          <Link
            href="/services"
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors shrink-0"
          >
            Browse All Services
          </Link>
        </div>

        {/* Matching Services Section */}
        {matchingServices.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Featured Doorstep Services in {category.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingServices.map((serv) => (
                <Link
                  key={serv.id}
                  href={`/services/${serv.slug}`}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-blue-400 transition-all flex flex-col group"
                >
                  <div className="relative h-44 w-full bg-slate-100">
                    <img src={serv.image} alt={serv.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-full text-xs font-bold text-blue-700 shadow-xs">
                      Starts ₹{serv.priceStart}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {serv.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {serv.tagline}
                      </p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                      <span className="text-amber-600 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {serv.rating}
                      </span>
                      <span className="text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        <span>Book Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Verified Merchants Directory */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Verified Local Stores & Providers
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Police-verified and GST/FSSAI-registered businesses near you
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(matchingMerchants.length > 0 ? matchingMerchants : MOCK_MERCHANTS.slice(0, 2)).map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
                        {m.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900">{m.businessName}</h3>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{m.badgeLevel} Verified</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{m.address}, {m.city} - {m.pincode}</span>
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{m.phone}</span>
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-900">{m.rating}</span>
                    <span className="text-slate-400">({m.totalOrders}+ orders fulfilled)</span>
                  </div>

                  <Link
                    href={`/services/${matchingServices[0]?.slug || 'home-cleaning'}`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    View Storefront
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <BottomCtaSection />
    </div>
  );
}
