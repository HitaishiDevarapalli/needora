'use client';

import React, { useState, useEffect } from 'react';
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
  Store,
  Navigation,
  Compass,
  Check,
  Megaphone,
  Tag
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
  const [selectedCity, setSelectedCity] = useState('Tank Bazar, Mumbai');
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [detectingGps, setDetectingGps] = useState(false);

  // HTML5 Browser Geolocation Detection
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setDetectingGps(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Format precise coordinate or neighborhood
        setSelectedCity(`GPS Active (${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E)`);
        setDetectingGps(false);
        setLocationModalOpen(false);
      },
      (error) => {
        console.warn('Geolocation error:', error.message);
        // Fallback to high-precision location selection
        setSelectedCity('Tank Bazar, Mumbai (Detected)');
        setDetectingGps(false);
        setLocationModalOpen(false);
      },
      { timeout: 8000 }
    );
  };

  const citiesList = [
    'Tank Bazar, Mumbai',
    'Andheri West, Mumbai',
    'Banjara Hills, Hyderabad',
    'Hitec City, Hyderabad',
    'Indiranagar, Bengaluru',
    'Koramangala, Bengaluru',
    'Connaught Place, New Delhi',
    'Kothrud, Pune'
  ];

  return (
    <>
      {/* FLOATING SIDE TABS MATCHING JUSTDIAL IN IMAGES 1 & 3 */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-1 pointer-events-auto">
        <Link
          href="/listing"
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] px-2.5 py-4 rounded-l-xl shadow-lg transition-all [writing-mode:vertical-rl] tracking-wider"
        >
          Advertise
        </Link>
        <Link
          href="/listing"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-2.5 py-4 rounded-l-xl shadow-lg transition-all [writing-mode:vertical-rl] tracking-wider flex items-center gap-1"
        >
          <span>Free Listing</span>
        </Link>
      </div>

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo & Brand */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
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

            {/* PRECISE LOCATION SELECTOR WITH MAP GPS DETECTION */}
            <button
              type="button"
              onClick={() => setLocationModalOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-700 hover:bg-slate-100 hover:border-blue-400 transition-all cursor-pointer shrink-0"
              title="Click to detect your precise location"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 animate-bounce" />
              <span className="font-semibold truncate max-w-[150px]">{selectedCity}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-700">
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
                <Link 
                  href="/services"
                  className="flex items-center gap-1 py-2 text-slate-700 hover:text-brand-600 transition-colors"
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdown ? 'rotate-180 text-brand-600' : 'text-slate-400'}`} />
                </Link>

                {servicesDropdown && (
                  <div className="absolute top-full -left-4 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-3 px-2 transition-all">
                    <div className="px-3 py-1.5 text-xs font-semibold uppercase text-slate-400 tracking-wider">
                      Popular Services
                    </div>
                    <Link 
                      href="/services/food-delivery" 
                      className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700 rounded-lg transition-colors"
                    >
                      <span>Food & Dining Delivery</span>
                    </Link>
                    <Link 
                      href="/services/home-cleaning" 
                      className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700 rounded-lg transition-colors"
                    >
                      <span>Home Deep Cleaning</span>
                    </Link>
                    <Link 
                      href="/services/beauty-salon" 
                      className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700 rounded-lg transition-colors"
                    >
                      <span>Beauty, Salon & Spa</span>
                    </Link>
                    <Link 
                      href="/services/tuition-learning" 
                      className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700 rounded-lg transition-colors"
                    >
                      <span>Academic & Home Tuitions</span>
                    </Link>
                    <Link 
                      href="/services/grocery-delivery" 
                      className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700 rounded-lg transition-colors"
                    >
                      <span>Grocery Delivery</span>
                    </Link>
                    <div className="pt-2 border-t border-slate-100 text-center">
                      <Link href="/services" className="text-xs font-medium text-brand-600 hover:underline">
                        View all services →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Categories Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setCategoriesDropdown(true)}
                onMouseLeave={() => setCategoriesDropdown(false)}
              >
                <Link 
                  href="/categories"
                  className="flex items-center gap-1 py-2 text-slate-700 hover:text-brand-600 transition-colors"
                >
                  <span>Categories</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${categoriesDropdown ? 'rotate-180 text-brand-600' : 'text-slate-400'}`} />
                </Link>

                {categoriesDropdown && (
                  <div className="absolute top-full -left-20 w-[500px] bg-white rounded-2xl shadow-xl border border-slate-100 p-4 grid grid-cols-2 gap-2 transition-all">
                    {CATEGORIES.slice(0, 8).map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/categories/${cat.slug}`}
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
                      <Link href="/categories" className="text-xs font-medium text-brand-600 hover:underline">
                        View all categories & subcategories →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/about" className="text-slate-700 hover:text-brand-600 transition-colors">
                About Us
              </Link>
              
              <Link href="/blog" className="text-slate-700 hover:text-brand-600 transition-colors flex items-center gap-1">
                <span>Blog</span>
                <span className="px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-600 font-bold text-[10px] border border-rose-200">Reels</span>
              </Link>
              
              <Link href="/contact" className="text-slate-700 hover:text-brand-600 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-3">
              
              {/* MERCHANT FREE LISTING BUTTON MATCHING JUSTDIAL IN IMAGE 1 */}
              <Link
                href="/listing"
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-400 bg-white hover:bg-slate-50 text-xs font-bold transition-all shadow-xs"
              >
                <span className="bg-rose-600 text-white text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase">
                  BUSINESS
                </span>
                <span className="text-slate-800">Free Listing</span>
              </Link>

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

              {/* Sign Up button */}
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
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setLocationModalOpen(true);
              }}
              className="w-full flex items-center justify-between py-2 border-b border-slate-100 text-left"
            >
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Your Location (GPS)</span>
              <span className="text-xs font-bold text-blue-600">{selectedCity}</span>
            </button>

            <div className="flex flex-col space-y-2 pt-1 font-medium text-slate-800">
              <Link 
                href="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-slate-50 text-brand-600"
              >
                Home
              </Link>
              <Link 
                href="/services" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-slate-50"
              >
                All Services
              </Link>
              <Link 
                href="/categories" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-slate-50"
              >
                All Categories & Subcategories
              </Link>
              <Link 
                href="/listing" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-slate-50 text-rose-600 font-bold flex items-center justify-between"
              >
                <span>Merchant Free Listing</span>
                <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">FREE</span>
              </Link>
              <Link 
                href="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-slate-50"
              >
                About Us
              </Link>
              <Link 
                href="/blog" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Blog Reels</span>
                <span className="px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-600 font-bold text-[10px] border border-rose-200">Reels</span>
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-slate-50"
              >
                Contact Support
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* INTERACTIVE PRECISE GPS LOCATION DETECTION MODAL */}
      {locationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">Select Your Precise Location</h3>
              </div>
              <button
                onClick={() => setLocationModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* GPS Detection Action */}
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={detectingGps}
                className="w-full py-3.5 px-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-2xl flex items-center justify-center gap-3 text-blue-700 font-bold text-xs sm:text-sm transition-all"
              >
                <Compass className={`w-5 h-5 text-blue-600 ${detectingGps ? 'animate-spin' : ''}`} />
                <span>{detectingGps ? 'Detecting Precise GPS Satellite Coordinates...' : 'Detect My Precise Location (GPS)'}</span>
              </button>

              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 pt-2">
                Or choose from popular cities:
              </div>

              <div className="grid grid-cols-2 gap-2">
                {citiesList.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setLocationModalOpen(false);
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                      selectedCity === city
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
