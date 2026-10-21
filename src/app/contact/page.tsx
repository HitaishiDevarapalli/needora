'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import BottomCtaSection from '@/components/BottomCtaSection';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Contact & Support</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 space-y-6">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Need Help?</span>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1">Get in Touch</h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                Our support coordinators and dispute officers are available 24/7 to resolve merchant queries and customer bookings.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Hyderabad Headquarters</span>
                  <span className="text-slate-500">Plot 44, Cyber Hills, Hitec City, Hyderabad, Telangana - 500081</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Customer Care Hotline</span>
                  <span className="text-slate-500">+91 1800 425 8899 (Toll Free, 24x7)</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Official Support Email</span>
                  <span className="text-slate-500">support@needora.in / complaints@needora.in</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  A support ticket has been created. A Needora officer will call you back within 15 minutes.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }} 
                className="space-y-4"
              >
                <h2 className="text-xl font-bold text-slate-900">Send an Enquiry or Grievance</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Issue Category</label>
                  <select className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-800">
                    <option>General Service Inquiry</option>
                    <option>Order Delivery or Tracking Delay</option>
                    <option>Refund or Replacement Request</option>
                    <option>Merchant Onboarding & GST Verification</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Message / Details</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your query or order number..."
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Support Request</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </main>

      <BottomCtaSection />
    </div>
  );
}
