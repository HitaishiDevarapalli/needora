'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Share2, 
  CheckCircle, 
  Store, 
  MessageSquare, 
  ShieldCheck, 
  Tag, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';

export default function ProductDetailPage() {
  const params = useParams();
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const productId = decodeURIComponent(rawId || '');

  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  // Formatted demo product
  const productName = productId.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <Link href="/services" className="hover:text-blue-600 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
          </Link>
          <span className="text-slate-400">Shareable Product Listing: {productId}</span>
        </div>

        {/* Product Card */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10">
          
          {/* Product Image */}
          <div className="h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
              alt={productName}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
              Verified Local Listing
            </span>
          </div>

          {/* Product Meta & Actions */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Local Merchant Catalog</span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {productName}
                </h1>
                <p className="text-xs text-slate-500 mt-1">Item Ref: #{productId}</p>
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                <span className="text-xs font-bold text-emerald-800 block mb-0.5">Direct Merchant Quotation Model</span>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Needora does not charge checkout payments or commission fees. Request a free quote to discuss specifications, bulk discounts, and delivery directly with the store owner.
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Available for immediate local pickup or courier delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Verified store warranty and after-sales support</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEnquiryModalOpen(true)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Request Free Price Quote / Enquiry</span>
              </button>

              <div className="flex gap-2">
                <a
                  href="tel:+919820112345"
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Call Merchant</span>
                </a>
                <Link
                  href="/businesses/BIZ-DECOR-01"
                  className="flex-1 py-2.5 border border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-600 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <Store className="w-4 h-4 text-slate-500" />
                  <span>View Store Profile</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </main>

      <BookingModal
        isOpen={enquiryModalOpen}
        serviceName={productName}
        businessName="Royal Heritage Home Decor"
        category="Home Decor"
        onClose={() => setEnquiryModalOpen(false)}
        onOrderPlaced={() => {
          setEnquiryModalOpen(false);
          alert(`Your price quotation request for ${productName} has been transmitted to the merchant via SMS & WhatsApp!`);
        }}
      />

      <Footer />
    </div>
  );
}