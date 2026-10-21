'use client';

import React, { useState } from 'react';
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

interface BookingModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOrderPlaced: (enquiryData: any) => void;
}

export default function BookingModal({ service, onClose, onOrderPlaced }: BookingModalProps) {
  if (!service) return null;

  const [fullName, setFullName] = useState('Priya Sharma');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [location, setLocation] = useState('Indiranagar, Bengaluru');
  const [preferredTime, setPreferredTime] = useState('Immediate Callback (Within 15 mins)');
  const [clientIssue, setClientIssue] = useState(`Need urgent assistance and quote for ${service.title}. Looking for verified service with warranty.`);
  const [isSuccess, setIsSuccess] = useState(false);
  const [enquiryRef, setEnquiryRef] = useState('');

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const newEnquiryRef = 'ENQ-' + Math.floor(100000 + Math.random() * 900000);
    setEnquiryRef(newEnquiryRef);
    setIsSuccess(true);
    
    onOrderPlaced({
      orderNumber: newEnquiryRef,
      serviceTitle: service.title,
      customerName: fullName,
      phone,
      location,
      issue: clientIssue,
      preferredTime,
      merchantName: service.providerName
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isSuccess ? 'Enquiry Sent to Merchant' : `Send Free Enquiry — ${service.title}`}
              </h3>
              <p className="text-[11px] text-slate-500">
                Direct lead message dispatched to {service.providerName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-full transition-colors"
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
                An automated SMS and WhatsApp notification was just transmitted to <strong className="font-semibold">{service.providerName}</strong>:
              </p>
              <div className="bg-white/90 p-3 rounded-xl font-mono text-[11px] text-slate-700 border border-blue-100">
                &ldquo;New Client Enquiry from <span className="font-bold">{fullName}</span> ({phone}). Issue: <span className="font-bold">{clientIssue}</span>. Callback requested: {preferredTime}.&rdquo;
              </div>
              <p className="text-[10px] text-blue-600 pt-1 font-semibold">
                ✓ No transaction required. The verified merchant will call your mobile number directly.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm text-xs"
            >
              Done & Return to Marketplace
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Service Summary Card with NO PRICES */}
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <img
                src={service.image}
                alt={service.title}
                className="w-14 h-14 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">{service.category}</div>
                <div className="text-sm font-bold text-slate-900 truncate">{service.title}</div>
                <div className="text-xs text-slate-500">{service.providerName}</div>
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Mobile Phone *</label>
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your City / Area *</label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Indiranagar, Bengaluru or Tank Bazar, Mumbai"
                    className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium"
                  />
                </div>
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
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Enquiry to {service.providerName}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
