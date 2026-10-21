'use client';

import React from 'react';
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
  ArrowRight
} from 'lucide-react';
import { CATEGORIES } from '@/data/mockData';

interface CategoriesSectionProps {
  onSelectCategory?: (categoryName: string) => void;
}

export default function CategoriesSection({ onSelectCategory }: CategoriesSectionProps) {
  // Map icon names to Lucide components
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
    <section id="categories" className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Explore Categories
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-1">
              Browse through our wide range of categories and find what you need.
            </p>
          </div>
          
          <button 
            type="button"
            onClick={() => onSelectCategory && onSelectCategory('All')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors self-start sm:self-auto group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 12 Category Tiles in 6x2 grid matching reference screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory && onSelectCategory(category.name)}
              className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-lg hover:shadow-slate-100/80 transition-all duration-200 text-center group cursor-pointer"
            >
              {/* Icon Container in soft pastel matching screenshot */}
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200"
                style={{ backgroundColor: category.bgColor }}
              >
                {renderIcon(category.iconName, category.color)}
              </div>

              {/* Title */}
              <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                {category.name}
              </span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
