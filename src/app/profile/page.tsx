'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  MessageSquare, 
  ShieldCheck, 
  LogOut, 
  ArrowRight, 
  Store,
  ExternalLink,
  CheckCircle,
  Tag
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCurrentUser, logoutUser, getStoredBusinesses, getStoredEnquiries, UserProfile, StoredBusiness, StoredEnquiry } from '@/lib/storage';

export default function CustomerProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [savedBusinesses, setSavedBusinesses] = useState<StoredBusiness[]>([]);
  const [userEnquiries, setUserEnquiries] = useState<StoredEnquiry[]>([]);

  useEffect(() => {
    const current = getCurrentUser();
    setUser(current);

    if (current) {
      const allBiz = getStoredBusinesses();
      setSavedBusinesses(allBiz.filter(b => current.savedBusinesses?.includes(b.id)));

      const allEnq = getStoredEnquiries();
      setUserEnquiries(allEnq.filter(e => e.customerPhone === current.phone || e.customerName.toLowerCase() === current.name.toLowerCase()));
    }
  }, []);

  const handleSignOut = () => {
    logoutUser();
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6 text-center">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-sm w-full space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <User className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Sign in to view your profile</h2>
            <p className="text-xs text-slate-500">
              Access your saved bookmarks, active enquiries, and account preferences.
            </p>
            <Link
              href="/login"
              className="block w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
            >
              Sign In Now
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md shadow-blue-500/20">
              {user.name.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">{user.name}</h1>
                <span className="text-[10px] font-extrabold uppercase bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">{user.email || 'Verified Account'}</p>
              {user.phone && <p className="text-xs text-slate-400 font-mono mt-0.5">+91 {user.phone}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user.role === 'merchant' && (
              <Link
                href="/merchant"
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Merchant Dashboard
              </Link>
            )}
            {user.role === 'admin' && (
              <Link
                href="/admin"
                className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Admin Panel
              </Link>
            )}
            <button
              type="button"
              onClick={handleSignOut}
              className="px-4 py-2.5 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Saved Bookmarks & Active Enquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Active Enquiries */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-bold text-slate-900">Your Dispatched Enquiries</h2>
              </div>
              <Link href="/my-enquiries" className="text-xs font-bold text-blue-600 hover:underline">
                View All →
              </Link>
            </div>

            {userEnquiries.length === 0 ? (
              <div className="p-6 bg-slate-50 rounded-2xl text-center text-xs text-slate-500">
                You haven&apos;t sent any enquiries yet. Browse local services and connect directly with merchants!
              </div>
            ) : (
              <div className="space-y-3">
                {userEnquiries.slice(0, 3).map(enq => (
                  <div key={enq.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">{enq.businessName}</span>
                      <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        {enq.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1">{enq.requirement}</p>
                    <span className="text-[10px] text-slate-400 block font-mono">Ref: {enq.enquiryRef}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bookmarked Businesses */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500" />
                <h2 className="text-base font-bold text-slate-900">Saved Stores & Bookmarks</h2>
              </div>
              <span className="text-xs font-bold text-slate-400">{savedBusinesses.length} Saved</span>
            </div>

            {savedBusinesses.length === 0 ? (
              <div className="p-6 bg-slate-50 rounded-2xl text-center text-xs text-slate-500">
                No saved businesses yet. Click the heart icon on any store to bookmark it.
              </div>
            ) : (
              <div className="space-y-3">
                {savedBusinesses.map(b => (
                  <Link
                    key={b.id}
                    href={`/businesses/${b.id}`}
                    className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-between transition-colors block"
                  >
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">{b.name}</span>
                      <span className="text-[10px] text-slate-500">{b.category} • {b.city}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}