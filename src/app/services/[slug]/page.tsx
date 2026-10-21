'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import BottomCtaSection from '@/components/BottomCtaSection';
import BookingModal from '@/components/BookingModal';
import { POPULAR_SERVICES } from '@/data/mockData';
import { 
  Star, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  CheckCircle, 
  Calendar, 
  Award, 
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  PhoneCall,
  Send,
  Heart,
  Share2,
  Navigation,
  MessageSquare,
  Phone,
  Check
} from 'lucide-react';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export default function SingleServicePage({ params }: ServicePageProps) {
  const service = POPULAR_SERVICES.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const [selectedPackage, setSelectedPackage] = useState(service.packages?.[0] || null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [orderToast, setOrderToast] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [sharedToast, setSharedToast] = useState(false);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setSharedToast(true);
      setTimeout(() => setSharedToast(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      {sharedToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in">
          <span>✓ Profile link copied to clipboard!</span>
        </div>
      )}

      {orderToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
          <span>✓ Enquiry dispatched to {service.providerName}! Ref: {orderToast}</span>
          <button onClick={() => setOrderToast(null)} className="ml-2 font-bold text-emerald-200">✕</button>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Navigation Row with Back Button */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined' && window.history.length > 1) {
                window.history.back();
              } else {
                window.location.href = '/services';
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
            <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">{service.title}</span>
          </nav>
        </div>

        {/* Hero Banner for Service */}
        <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm p-6 sm:p-8 lg:p-10 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Verified Hyperlocal Partner Network</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {service.description || service.tagline}
              </p>

              {/* Rating & Trust Metrics */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 text-amber-800 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{service.rating} Rating</span>
                  <span className="text-amber-600 font-medium">({service.reviewCount} verified customers)</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Typical Arrival: {service.duration || '30 mins'}</span>
                </div>
              </div>

              {/* Inclusions / Highlights */}
              <div className="pt-4 space-y-2">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Service Guarantees & Features:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {(service.features || [
                    'Background-verified technicians',
                    'Transparent upfront pricing in INR',
                    'Contactless doorstep execution',
                    '24/7 Needora Customer Protection'
                  ]).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual & Direct Contact Actions (Master Spec Section 7 & 14) */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                {/* Save & Share floating pill buttons */}
                <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                  <button
                    type="button"
                    onClick={() => setIsSaved(!isSaved)}
                    className={`p-2 rounded-full backdrop-blur-md transition-all ${
                      isSaved ? 'bg-rose-500 text-white' : 'bg-black/40 hover:bg-black/60 text-white'
                    }`}
                    title={isSaved ? 'Saved in My Favourites' : 'Save Business'}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all"
                    title="Share Business Profile"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-[11px] font-medium text-slate-300 block">Verified Business Provider</span>
                  <span className="text-base font-bold">{service.providerName}</span>
                  <div className="flex items-center gap-2 text-[10px] text-emerald-300 font-semibold mt-0.5">
                    <span>Open Now • 9:00 AM - 9:30 PM</span>
                    <span>•</span>
                    <span>Est. 2014</span>
                  </div>
                </div>
              </div>

              {/* Direct Actions Matrix */}
              <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Direct Merchant Contact</span>
                    <span className="text-xs font-bold text-emerald-400">100% Free • No Payment Required</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setBookingOpen(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Enquiry / Quote</span>
                  </button>
                </div>

                {/* 3 Quick Action Buttons: Call, WhatsApp, Directions */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-xs font-bold">
                  <a
                    href="tel:+919876543210"
                    className="py-2 px-2 rounded-xl bg-slate-800 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 transition-colors text-center"
                    title="Launch device dialler"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Call Now</span>
                  </a>

                  <a
                    href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hello ${service.providerName}, I found your business on Needora and would like to enquire about ${service.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-2 rounded-xl bg-slate-800 hover:bg-emerald-600 text-white flex items-center justify-center gap-1.5 transition-colors text-center"
                    title="Chat on WhatsApp"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(service.providerName + ' Bangalore Mumbai')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-2 rounded-xl bg-slate-800 hover:bg-blue-600 text-white flex items-center justify-center gap-1.5 transition-colors text-center"
                    title="Get directions in Google Maps"
                  >
                    <Navigation className="w-3.5 h-3.5 text-blue-400" />
                    <span>Directions</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Packages & Service Options with NO AMOUNT */}
        {service.packages && service.packages.length > 0 && (
          <section className="mb-14">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Service Scopes & Inclusions
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Select an option below to notify the merchant of your exact issue.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => {
                    setSelectedPackage(pkg);
                    setBookingOpen(true);
                  }}
                  className={`relative p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedPackage?.id === pkg.id
                      ? 'border-blue-600 bg-white ring-2 ring-blue-600/20 shadow-md'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 right-6 bg-blue-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                      Most Requested
                    </span>
                  )}

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">{pkg.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">{pkg.description}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400">Direct Contact</span>
                      <div className="text-xs font-bold text-emerald-600">Free Enquiry Lead</div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPackage(pkg);
                        setBookingOpen(true);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Enquiry</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        {service.faqs && (
          <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 mb-14">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <span>Frequently Asked Questions</span>
            </h2>
            <div className="divide-y divide-slate-100">
              {service.faqs.map((faq, i) => (
                <div key={i} className="py-4">
                  <h3 className="text-sm font-bold text-slate-900 mb-1">{faq.q}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Booking Modal */}
      <BookingModal
        service={service}
        onClose={() => setBookingOpen(false)}
        onOrderPlaced={(order) => {
          setOrderToast(order.orderNumber);
        }}
      />

      <BottomCtaSection />
    </div>
  );
}
