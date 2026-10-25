'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  ShieldCheck, 
  Send, 
  MessageSquare, 
  Phone, 
  FileText,
  BellRing
} from 'lucide-react';
import { ServiceItem } from '@/types';
import { saveEnquiry } from '@/lib/storage';

export interface BookingModalProps {
  service?: ServiceItem | null;
  serviceName?: string;
  category?: string;
  providerName?: string;
  businessName?: string;
  businessId?: string;
  isOpen?: boolean;
  onClose: () => void;
  onOrderPlaced?: (enquiryData: any) => void;
}

export default function BookingModal({ 
  service, 
  serviceName, 
  category, 
  providerName,
  businessName,
  businessId,
  isOpen = true, 
  onClose, 
  onOrderPlaced 
}: BookingModalProps) {
  if (!isOpen && !service && !serviceName && !businessName) return null;
  if (!service && !serviceName && !businessName) return null;

  const title = service?.title || serviceName || 'General Enquiry';
  const provider = businessName || service?.providerName || providerName || 'Verified Merchant';
  const cat = service?.category || category || 'General';

  const [fullName, setFullName] = useState('Priya Sharma');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [location, setLocation] = useState('Indiranagar, Bengaluru');
  const [preferredTime, setPreferredTime] = useState('Immediate Callback (Within 15 mins)');
  const [clientIssue, setClientIssue] = useState(`Need urgent assistance and quote for ${title}. Looking for verified service with warranty.`);
  const [isSuccess, setIsSuccess] = useState(false);
  const [enquiryRef, setEnquiryRef] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to real persistent storage engine
    const saved = saveEnquiry({
      businessId: businessId || ('BIZ-' + Math.floor(100 + Math.random() * 900)),
      businessName: provider,
      category: cat,
      customerName: fullName,
      customerPhone: phone,
      location,
      requirement: clientIssue,
      preferredTime,
      businessPhone: '+91 98765 43210',
      businessWhatsapp: '+919876543210',
      businessAddress: `${location}`,
    });

    setEnquiryRef(saved.enquiryRef);
    setIsSuccess(true);
    
    if (onOrderPlaced) {
      onOrderPlaced({
        orderNumber: saved.enquiryRef,
        serviceTitle: title,
        customerName: fullName,
        phone,
        location,
        issue: clientIssue,
        preferredTime,
        merchantName: provider
      });
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isSuccess ? 'Enquiry Sent to Merchant' : `Send Free Enquiry — ${title}`}
              </h3>
              <p className="text-[11px] text-slate-500">
                Direct lead message dispatched to {provider}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close modal"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-sm">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900">Enquiry Dispatched to Merchant!</h4>
              <p className="text-xs text-slate-500 mt-1">
                Enquiry Reference: <span className="font-mono font-bold text-blue-600">{enquiryRef}</span>
              </p>
            </div>

            {/* Merchant Dispatch Alert notification */}
            <div className="bg-blue-50/80 rounded-2xl p-4 text-xs text-blue-900 text-left space-y-2 border border-blue-200">
              <div className="flex items-center gap-2 font-bold text-blue-700">
                <BellRing className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Instant Merchant Alert Dispatched</span>
              </div>
              <p className="text-[11px] text-blue-800 leading-relaxed">
                An automated SMS and WhatsApp notification was just transmitted to <strong className="font-semibold">{provider}</strong>:
              </p>
              <div className="bg-white/90 p-3 rounded-xl font-mono text-[11px] text-slate-700 border border-blue-100">
                &ldquo;New Client Enquiry from <span className="font-bold">{fullName}</span> ({phone}). Issue: <span className="font-bold">{clientIssue}</span>. Callback requested: {preferredTime}.&rdquo;
              </div>
              <p className="text-[10px] text-blue-600 pt-1 font-semibold">
                ✓ No transaction required. The verified merchant will call your mobile number directly.
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm text-xs cursor-pointer"
            >
              Done & Return to Marketplace
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Service Summary Card with NO PRICES */}
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
              {service?.image ? (
                <img
                  src={service.image}
                  alt={title}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 font-bold flex items-center justify-center shrink-0">
                  {title.slice(0, 2)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">{cat}</div>
                <div className="text-sm font-bold text-slate-900 truncate">{title}</div>
                <div className="text-xs text-slate-500">{provider}</div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full shrink-0">
                100% Free
              </span>
            </div>

            {/* Recipient Details */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Mobile Phone (for SMS / Call) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Area / Address</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Indiranagar, Bengaluru or GPS detected location"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Describe Your Issue / Requirement for the Merchant *
                </label>
                <textarea
                  required
                  rows={3}
                  value={clientIssue}
                  onChange={(e) => setClientIssue(e.target.value)}
                  placeholder="e.g. Need quotation for kitchen deep cleaning and chimney degreasing this Saturday..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Time for Merchant to Call</label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium"
                >
                  <option>Immediate Callback (Within 15 mins)</option>
                  <option>Today Afternoon (12 PM - 3 PM)</option>
                  <option>Today Evening (5 PM - 8 PM)</option>
                  <option>Tomorrow Morning (9 AM - 12 PM)</option>
                </select>
              </div>
            </div>

            {/* Zero Cost Assurance Banner */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span className="font-medium">Direct Enquiry Fee:</span>
              <span className="font-bold text-emerald-600 uppercase">100% Free Service Enquiry</span>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Enquiry to {provider}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
