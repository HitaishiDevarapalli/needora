'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, ShieldCheck, Store, User, AlertCircle, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { setCurrentUser } from '@/lib/storage';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'customer' | 'merchant' | 'admin'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide your email address and password.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials.');
      }

      // Save real user session in storage engine
      const userObj = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone || '',
        role: (data.user.role === 'administrator' ? 'admin' : data.user.role) as 'customer' | 'merchant' | 'admin',
        following: [],
        savedBusinesses: [],
        savedPosts: [],
        createdAt: new Date().toISOString(),
      };

      setCurrentUser(userObj);
      setSuccess('Login successful! Redirecting...');

      setTimeout(() => {
        if (userObj.role === 'merchant') {
          router.push('/merchant');
        } else if (userObj.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/my-enquiries');
        }
      }, 700);

    } catch (err: any) {
      setError(err.message || 'Unable to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Top Banner */}
          <div className="p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white text-center">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3 font-black text-xl shadow-inner">
              N
            </div>
            <h1 className="text-xl font-bold">Welcome Back to Needora</h1>
            <p className="text-xs text-blue-100 mt-1">Discover verified local businesses or manage your store</p>
          </div>

          {/* Form Container */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Role Switcher */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-2xl text-xs font-bold text-slate-600">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`py-2 rounded-xl transition-all cursor-pointer ${
                  role === 'customer'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setRole('merchant')}
                className={`py-2 rounded-xl transition-all cursor-pointer ${
                  role === 'merchant'
                    ? 'bg-white text-rose-700 shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                Merchant
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`py-2 rounded-xl transition-all cursor-pointer ${
                  role === 'admin'
                    ? 'bg-white text-purple-700 shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                Admin
              </button>
            </div>

            {/* Error / Success Notifications */}
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address or Phone
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={role === 'merchant' ? 'merchant@store.com' : role === 'admin' ? 'admin@needora.com' : 'customer@gmail.com'}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Password
                  </label>
                  <a href="#" className="text-[11px] font-semibold text-blue-600 hover:underline">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your account password"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span>Remember me</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>{loading ? 'Authenticating...' : `Sign In as ${role.toUpperCase()}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Zero Fake Payment Reminder */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 text-center">
              🔒 100% Free Lead Model • Zero Payment Gateway or Checkout Fees
            </div>

            {/* Switch to Sign Up */}
            <div className="text-center text-xs text-slate-600 pt-2 border-t border-slate-100">
              Don&apos;t have an account yet?{' '}
              <Link href="/signup" className="font-bold text-blue-600 hover:underline">
                Create Account
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}