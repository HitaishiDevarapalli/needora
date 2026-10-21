'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CreditCard, CheckCircle, ShieldCheck } from 'lucide-react';
import { ServiceItem } from '@/types';

interface BookingModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOrderPlaced: (orderData: any) => void;
}

export default function BookingModal({ service, onClose, onOrderPlaced }: BookingModalProps) {
  if (!service) return null;

  const [date, setDate] = useState('Tomorrow, 22 Oct');
  const [slot, setSlot] = useState('10:00 AM - 01:00 PM');
  const [fullName, setFullName] = useState('Priya Sharma');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [address, setAddress] = useState('Flat 402, Sai Residency, Indiranagar, Bengaluru - 560038');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Cash on Delivery'>('UPI');
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  const subtotal = service.priceStart;
  const deliveryFee = 40;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderRef = 'NDR-' + Math.floor(100000 + Math.random() * 900000);
    setOrderRef(newOrderRef);
    setIsSuccess(true);
    
    onOrderPlaced({
      orderNumber: newOrderRef,
      serviceTitle: service.title,
      customerName: fullName,
      phone,
      address,
      slot: `${date}, ${slot}`,
      total,
      paymentMethod
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {isSuccess ? 'Booking Confirmed' : `Book ${service.title}`}
            </h3>
            <p className="text-xs text-slate-500">
              {service.providerName}
            </p>
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
              <h4 className="text-xl font-bold text-slate-900">Order Placed Successfully!</h4>
              <p className="text-sm text-slate-500 mt-1">
                Booking Reference: <span className="font-mono font-bold text-brand-600">{orderRef}</span>
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 text-xs text-slate-600 text-left space-y-2 border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-400">Scheduled For:</span>
                <span className="font-semibold">{date} ({slot})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Amount:</span>
                <span className="font-bold text-slate-900">₹{total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment:</span>
                <span className="font-semibold text-emerald-600">{paymentMethod}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm"
            >
              Done & Return
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Service Summary Card */}
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <img
                src={service.image}
                alt={service.title}
                className="w-14 h-14 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-slate-900 truncate">{service.title}</div>
                <div className="text-xs text-slate-500">Starts at ₹{service.priceStart} • {service.duration || 'Fast delivery'}</div>
              </div>
            </div>

            {/* Date & Time Slot selection */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Date</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <select
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                  >
                    <option>Today (Express)</option>
                    <option>Tomorrow, 22 Oct</option>
                    <option>Thursday, 23 Oct</option>
                    <option>Friday, 24 Oct</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Time Slot</label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <select
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                  >
                    <option>09:00 AM - 12:00 PM</option>
                    <option>10:00 AM - 01:00 PM</option>
                    <option>02:00 PM - 05:00 PM</option>
                    <option>06:00 PM - 09:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Recipient Details */}
            <div className="space-y-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (with OTP verification)</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Delivery / Service Address</label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-800 resize-none"
                />
              </div>
            </div>

            {/* Payment Mode Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                {(['UPI', 'Card', 'Cash on Delivery'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setPaymentMethod(mode)}
                    className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                      paymentMethod === mode
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Transparency Breakdown */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Base Service Rate</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Convenience / Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Taxes (GST 5%)</span>
                <span>₹{tax}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold text-slate-900">
                <span>Total Payable</span>
                <span className="text-brand-700">₹{total}</span>
              </div>
            </div>

            {/* Confirm button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl shadow-md transition-all text-sm"
            >
              Confirm & Book (₹{total})
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
