import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import BottomCtaSection from '@/components/BottomCtaSection';
import { CATEGORIES } from '@/data/mockData';
import { 
  Utensils, 
  ShoppingBag, 
  Home, 
  Flower2, 
  GraduationCap, 
  Plane, 
  Heart, 
  Wallet, 
  Car, 
  Building2, 
  Briefcase, 
  PlayCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export const metadata = {
  title: 'All Categories — Needora',
  description: 'Browse all local service & retail categories across your city.',
};

export default function CategoriesPage() {
  const renderIcon = (name: string, color: string) => {
    const props = { className: "w-6 h-6", style: { color } };
    switch (name) {
      case 'Utensils': return <Utensils {...props} />;
      case 'ShoppingBag': return <ShoppingBag {...props} />;
      case 'Home': return <Home {...props} />;
      case 'Flower2': return <Flower2 {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'Plane': return <Plane {...props} />;
      case 'Heart': return <Heart {...props} />;
      case 'Wallet': return <Wallet {...props} />;
      case 'Car': return <Car {...props} />;
      case 'Building': return <Building2 {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      case 'Play': return <PlayCircle {...props} />;
      default: return <ShoppingBag {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Breadcrumb & Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 shadow-xs hover:border-blue-400 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <nav className="text-xs text-slate-500 flex items-center gap-2">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-slate-800 font-semibold">Categories</span>
            </nav>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Explore All Business Categories
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-2xl">
            Select a category to discover neighborhood stores, certified service professionals, and special regional offers.
          </p>
        </div>

        {/* 12 Categories Detailed Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-xl hover:border-blue-400 transition-all flex flex-col justify-between group"
            >
              <div>
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: cat.bgColor }}
                >
                  {renderIcon(cat.iconName, cat.color)}
                </div>

                <h2 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">{cat.count}</span>
                <span className="inline-flex items-center gap-1 font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </main>

      <BottomCtaSection />
    </div>
  );
}
