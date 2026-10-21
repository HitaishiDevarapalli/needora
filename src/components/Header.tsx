'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ChevronDown, 
  Menu, 
  X, 
  MapPin, 
  User, 
  ShoppingBag,
  Phone,
  ShieldCheck,
  Store
} from 'lucide-react';
import { CATEGORIES } from '@/data/mockData';

interface HeaderProps {
  onOpenSearch?: () => void;
  onOpenAuth?: (mode: 'login' | 'signup') => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export default function Header({
  onOpenSearch,
  onOpenAuth,
  cartCount = 2,
  onOpenCart
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [categoriesDropdown, setCategoriesDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Hyderabad, Telangana');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-2xl tracking-tighter">N</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-slate-900 tracking-tight leading-none group-hover:text-brand-700 transition-colors">
                Needora
              </span>
              <span className="text-[10px] font-medium text-slate-500 tracking-wider mt-1">
                Discover. Connect. Get It Done.
              </span>
            </div>
          </Link>

          {/* Location Selector (Subtle, authentic) */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer">
            <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
            <span className="font-medium truncate max-w-[140px]">{selectedCity}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-medium text-slate-700">
            <Link 
              href="/" 
              className="text-brand-600 font-semibold relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-600"
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button 
                type="button"
                className="flex items-center gap-1 py-2 text-slate-700 hover:text-brand-600 transition-colors"
                aria-expanded={servicesDropdown}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdown ? 'rotate-180 text-brand-600' : 'text-slate-400'}`} />
              </button>

              {servicesDropdown && (
                <div className="absolute top-full -left-4 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-3 px-2 transition-all">
                  <div className="px-3 py-1.5 text-xs font-semibold uppercase text-slate-400 tracking-wider">
                    Popular Services
                  </div>
                  <Link 
                    href="#popular-services" 
                    className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700 rounded-lg transition-colors"
                  >
                    <span>Food & Dining Delivery</span>
                  </Link>
                  <Link 
                    href="#popular-services" 
                    className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700 rounded-lg transition-colors"
                  >
                    <span>Home Deep Cleaning</span>
                  </Link>
                  <Link 
                    href="#popular-services" 
                    className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700 rounded-lg transition-colors"
                  >
                    <span>Beauty, Salon & Spa</span>
                  </Link>
                  <Link 
                    href="#popular-services" 
                    className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700 rounded-lg transition-colors"
                  >
                    <span>Academic & Home Tuitions</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Categories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setCategoriesDropdown(true)}
              onMouseLeave={() => setCategoriesDropdown(false)}
            >
              <button 
                type="button"
                className="flex items-center gap-1 py-2 text-slate-700 hover:text-brand-600 transition-colors"
                aria-expanded={categoriesDropdown}
              >
                <span>Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${categoriesDropdown ? 'rotate-180 text-brand-600' : 'text-slate-400'}`} />
              </button>

              {categoriesDropdown && (
                <div className="absolute top-full -left-20 w-[480px] bg-white rounded-2xl shadow-xl border border-slate-100 p-4 grid grid-cols-2 gap-2 transition-all">
                  {CATEGORIES.slice(0, 8).map((cat) => (
                    <Link
                      key={cat.id}
                      href={`#category-${cat.slug}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <span 
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: cat.bgColor, color: cat.color }}
                      >
                        {cat.name.slice(0, 2)}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-800">{cat.name}</span>
                        <span className="text-[10px] text-slate-500">{cat.count}</span>
                      </div>
                    </Link>
                  ))}
                  <div className="col-span-2 pt-2 border-t border-slate-100 text-center">
                    <Link href="#categories" className="text-xs font-medium text-brand-600 hover:underline">
                      View all 50+ categories →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="#why-choose" className="text-slate-700 hover:text-brand-600 transition-colors">
              About Us
            </Link>
            <Link href="#featured" className="text-slate-700 hover:text-brand-600 transition-colors">
              Blog
            </Link>
            <Link href="#contact" className="text-slate-700 hover:text-brand-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-slate-600 hover:text-brand-600 hover:bg-slate-100 rounded-full transition-colors"
              title="Search services, products, or stores"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-slate-600 hover:text-brand-600 hover:bg-slate-100 rounded-full transition-colors"
              title="View Cart"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Login button */}
            <button
              onClick={() => onOpenAuth && onOpenAuth('login')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg transition-colors bg-white hover:bg-slate-50 shadow-xs"
            >
              Login
            </button>

            {/* Sign Up button (primary matching reference image) */}
            <button
              onClick={() => onOpenAuth && onOpenAuth('signup')}
              className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm hover:shadow transition-all"
            >
              Sign Up
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-brand-600 rounded-lg"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Your Location</span>
            <span className="text-xs font-medium text-brand-600">{selectedCity}</span>
          </div>

          <div className="flex flex-col space-y-2 pt-1 font-medium text-slate-800">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 text-brand-600"
            >
              Home
            </Link>
            <Link 
              href="#popular-services" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              Services
            </Link>
            <Link 
              href="#categories" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              Categories
            </Link>
            <Link 
              href="#why-choose" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              About Us
            </Link>
            <Link 
              href="#featured" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              Featured Stories
            </Link>
            <Link 
              href="#testimonials" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              Reviews
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth && onOpenAuth('login');
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              Login to Account
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth && onOpenAuth('signup');
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Sign Up as Customer
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
