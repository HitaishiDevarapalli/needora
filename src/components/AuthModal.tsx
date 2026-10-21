'use client';

import React, { useState, useEffect } from 'react';
import { X, Phone, Lock, User, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'login' | 'signup';
  onClose: () => void;
  onSuccess: (role: 'customer' | 'merchant') => void;
}

export default function AuthModal({ isOpen, mode, onClose, onSuccess }: AuthModalProps) {
  if (!isOpen) return null;

  const [authRole, setAuthRole] = useState<'customer' | 'merchant'>('customer');
  const [currentStep, setCurrentStep] = useState<'details' | 'otp'>('details');
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [fullName, setFullName] = useState('Priya Sharma');
  const [businessName, setBusinessName] = useState('Sri Balaji Enterprises');
  const [otp, setOtp] = useState('4821');
  const [agreed, setAgreed] = useState(true);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 'details') {
      setCurrentStep('otp');
    } else {
      onSuccess(authRole);
      onClose();
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
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {mode === 'login' ? 'Login to Needora' : 'Create an Account'}
            </h3>
            <p className="text-xs text-slate-500">
              {currentStep === 'details' ? 'Secure OTP-based verification' : 'Enter 4-digit code sent via SMS'}
            </p>
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

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Role selector */}
          <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setAuthRole('customer')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                authRole === 'customer'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => setAuthRole('merchant')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                authRole === 'merchant'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Merchant / Business Owner
            </button>
          </div>

          {currentStep === 'details' ? (
            <>
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {authRole === 'customer' ? 'Full Name' : 'Owner Name'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-800"
                    />
                  </div>
                </div>
              )}

              {mode === 'signup' && authRole === 'merchant' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Business / Store Name
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Sri Balaji Sweets & Bakery"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-800"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number
                </label>
                <div className="flex rounded-xl border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                  <span className="bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 border-r border-slate-200 flex items-center">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="10 digit phone number"
                    className="w-full px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="consent"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="consent" className="text-[11px] text-slate-500 leading-tight">
                  I agree to Needora Terms of Service, Privacy Policy and consent to receive transactional updates.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl transition-colors text-xs flex items-center justify-center gap-1.5 shadow-sm mt-4"
              >
                <span>Request OTP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-800">
                A verification code was sent to <span className="font-bold">+91 {phoneNumber}</span>. For this demo, code <span className="font-mono font-bold">4821</span> is pre-filled.
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Enter 4-digit OTP
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full text-center tracking-widest text-lg font-mono font-bold py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Resend OTP in 24s</span>
                <button
                  type="button"
                  onClick={() => setCurrentStep('details')}
                  className="text-blue-600 hover:underline"
                >
                  Change Number
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl transition-colors text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Check className="w-4 h-4" />
                <span>Verify & Enter {authRole === 'customer' ? 'Marketplace' : 'Merchant Portal'}</span>
              </button>
            </div>
          )}

        </form>

      </div>
    </div>
  );
}
