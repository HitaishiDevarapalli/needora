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
  Send
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      {orderToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
          <span>✓ Booking confirmed for {service.title}! Reference: {orderToast}</span>
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

            {/* Right Column: Hero Visual & Quick Book Card */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-xs font-medium text-slate-200 block">Managed by</span>
                  <span className="text-sm font-bold">{service.providerName}</span>
                </div>
              </div>

              {/* Direct Free Enquiry Action Pill */}
              <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Client Connection</span>
                  <span className="text-sm font-bold text-white">No Payment • Free Enquiry</span>
                </div>

                <button
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Enquiry to Merchant</span>
                </button>
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
