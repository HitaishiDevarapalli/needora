'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  FileText, 
  Search, 
  Filter, 
  Users, 
  Store, 
  BarChart, 
  Check, 
  X, 
  MapPin, 
  ExternalLink, 
  MessageSquare, 
  Phone, 
  Send, 
  Video, 
  Layers, 
  Clock, 
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  Tag
} from 'lucide-react';
import { 
  MOCK_VERIFICATIONS, 
  MOCK_COMPLAINTS, 
  MOCK_MERCHANTS, 
  CATEGORIES, 
  POPULAR_SERVICES, 
  BLOG_REELS 
} from '@/data/mockData';
import { VerificationRequest } from '@/types';
import { 
  getStoredEnquiries, 
  getStoredBusinesses, 
  getStoredVideos, 
  updateEnquiryStatus as persistAdminEnquiryStatus,
  updateBusiness 
} from '@/lib/storage';

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState<'enquiries' | 'verifications' | 'listings' | 'categories' | 'reels' | 'complaints'>('enquiries');
  
  // Real-time client enquiries state matching main website 100% free lead dispatch model
  const [enquiries, setEnquiries] = useState<any[]>([]);

  const loadAdminData = () => {
    const stored = getStoredEnquiries();
    if (stored && stored.length > 0) {
      setEnquiries(stored.map(s => ({
        id: s.enquiryRef || s.id,
        rawId: s.id,
        clientName: s.customerName,
        phone: s.customerPhone,
        city: s.location || 'Local',
        location: s.location || 'Nearby',
        merchantName: s.businessName,
        issue: s.requirement,
        time: new Date(s.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        dispatchAlert: `SMS & WhatsApp Alert Dispatched to Merchant (${s.businessPhone || '+91 98765 43210'})`,
        status: s.status,
      })));
    } else {
      setEnquiries([
        {
          id: 'ENQ-901',
          clientName: 'Kavita Sundaram',
          phone: '+91 98480 99881',
          city: 'Mumbai',
          location: 'Andheri West (0.8 km)',
          merchantName: 'Sri Balaji Sweets & Traditional Savories',
          issue: 'Need urgent assorted festive sweets gift packaging & custom box design for 50 people.',
          time: '6 mins ago',
          dispatchAlert: 'SMS & WhatsApp Alert Dispatched to Merchant (+91 98765 43210)',
          status: 'Dispatched'
        },
        {
          id: 'ENQ-902',
          clientName: 'Devarapalli Hitaishi',
          phone: '+91 97001 22334',
          city: 'Mumbai',
          location: 'Tank Bazar (1.2 km)',
          merchantName: 'Royal Furniture & Modular Studio',
          issue: 'Inquiring about 3D modular kitchen design estimate and site measurement visit.',
          time: '24 mins ago',
          dispatchAlert: 'SMS & WhatsApp Alert Dispatched to Merchant (+91 98201 55667)',
          status: 'Contacted'
        }
      ]);
    }
  };

  useEffect(() => {
    loadAdminData();
    window.addEventListener('needora_storage_update', loadAdminData);
    return () => window.removeEventListener('needora_storage_update', loadAdminData);
  }, []);

  // Verification requests state
  const [verifications, setVerifications] = useState<VerificationRequest[]>(MOCK_VERIFICATIONS);
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(MOCK_VERIFICATIONS[1]);

  // Reels moderation state
  const [reelsList, setReelsList] = useState(BLOG_REELS);

  const handleDecision = (id: string, status: 'approved' | 'rejected') => {
    setVerifications((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status } : v))
    );
    if (selectedRequest?.id === id) {
      setSelectedRequest((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const updateEnquiryStatus = (id: string, status: string) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
    try {
      persistAdminEnquiryStatus(id, status as any);
    } catch (e) {
      // fallback
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      {/* Top Admin Navigation Header (Matching Needora Visual Identity) */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
              N
            </div>
            <span className="font-bold text-slate-900 hidden sm:inline">Needora</span>
          </Link>

          <div className="h-5 w-px bg-slate-200 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              Super Admin Control Suite
            </span>
            <span className="text-xs text-slate-500 hidden md:inline">
              Session: adm-99201 • Central Telemetry & Governance
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-400 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Marketplace</span>
          </Link>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        
        {/* Left Admin Navigation Sidebar */}
        <aside className="w-full lg:w-64 bg-white rounded-2xl border border-slate-200 p-4 shrink-0 shadow-xs h-fit space-y-1">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Platform Governance
          </div>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'enquiries'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4" />
              <span>Client Enquiries</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              activeTab === 'enquiries' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {enquiries.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('verifications')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'verifications'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Merchant Verification</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              activeTab === 'verifications' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
            }`}>
              {verifications.filter(v => v.status === 'pending').length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('listings')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'listings'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Store className="w-4 h-4" />
              <span>Free Listings Feed</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {MOCK_MERCHANTS.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'categories'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Categories & Services</span>
          </button>

          <button
            onClick={() => setActiveTab('reels')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'reels'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Video Stories & Reels</span>
          </button>

          <button
            onClick={() => setActiveTab('complaints')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'complaints'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4" />
              <span>Customer Complaints</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
              {MOCK_COMPLAINTS.length}
            </span>
          </button>

          <div className="pt-4 border-t border-slate-100 px-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              System Health
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>SMS / WhatsApp Gateways</span>
              </div>
              <p className="text-[10px] text-emerald-700">All direct merchant alert pipelines 100% operational.</p>
            </div>
          </div>
        </aside>

        {/* Admin Content Workspace */}
        <main className="flex-1 space-y-6">
          
          {/* Quick Real-Time Metrics Bar (Zero Transaction, 100% Lead & Operational Metrics) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-medium text-slate-500">Total Enquiries Today</span>
              <div className="text-xl font-black text-slate-900 mt-1">{enquiries.length + 84}</div>
              <span className="text-[10px] text-emerald-600 font-semibold">↑ 32% across 8 metros</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-medium text-slate-500">Verified Merchants</span>
              <div className="text-xl font-black text-slate-900 mt-1">1,280</div>
              <span className="text-[10px] text-blue-600 font-semibold">Gold Badge Certified</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-medium text-slate-500">Avg Lead Callback SLA</span>
              <div className="text-xl font-black text-slate-900 mt-1">&lt; 3.6 mins</div>
              <span className="text-[10px] text-emerald-600 font-semibold">98.4% within target</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-medium text-slate-500">Active Listing Cities</span>
              <div className="text-xl font-black text-slate-900 mt-1">8 Cities</div>
              <span className="text-[10px] text-slate-500">Mumbai, Hyd, Blr & more</span>
            </div>
          </div>

          {/* TAB 1: CLIENT ENQUIRIES & REAL-TIME LEAD OVERSIGHT */}
          {activeTab === 'enquiries' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Live Client Enquiries Oversight</h2>
                  <p className="text-xs text-slate-500">Monitor all direct customer issues dispatched to verified local merchants</p>
                </div>
                <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-3 py-1 rounded-full border border-emerald-200">
                  Real-time Dispatch Stream
                </span>
              </div>

              <div className="space-y-3">
                {enquiries.map((enq) => (
                  <div key={enq.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all shadow-xs space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {enq.id}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs font-bold text-slate-900">{enq.clientName}</span>
                        <span className="text-xs text-slate-500">({enq.phone})</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs font-medium text-slate-600">{enq.location}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400">{enq.time}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          enq.status === 'Dispatched'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : enq.status === 'Contacted'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {enq.status}
                        </span>
                      </div>
                    </div>

                    {/* Merchant & Issue description */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assigned Merchant</span>
                        <div className="font-bold text-slate-900">{enq.merchantName}</div>
                        <div className="text-[11px] text-emerald-700 font-semibold">{enq.dispatchAlert}</div>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Client Requirement / Issue</span>
                        <div className="font-medium text-slate-800 leading-relaxed">&ldquo;{enq.issue}&rdquo;</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <a
                        href={`tel:${enq.phone.replace(/[^0-9+]/g, '')}`}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                      >
                        Call Client
                      </a>
                      {enq.status !== 'Resolved' && (
                        <button
                          onClick={() => updateEnquiryStatus(enq.id, 'Resolved')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
                        >
                          Mark Resolved
                        </button>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: VERIFICATION & AUDIT WORKSPACE */}
          {activeTab === 'verifications' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Request List */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Verification Queue ({verifications.length})
                  </h3>
                  <span className="text-[11px] text-blue-600 font-semibold">Pending Audit</span>
                </div>

                <div className="space-y-2">
                  {verifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedRequest(item)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        selectedRequest?.id === item.id
                          ? 'border-blue-500 bg-blue-50/60 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900 truncate max-w-[180px]">
                          {item.businessName}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          item.status === 'approved'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : item.status === 'rejected'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {item.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">{item.category} • {item.ownerName}</div>
                      <div className="text-[10px] text-slate-400 mt-1">Submitted: {item.submittedAt}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inspection Workspace */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
                {selectedRequest ? (
                  <>
                    <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                      <div>
                        <h2 className="text-base font-bold text-slate-900">{selectedRequest.businessName}</h2>
                        <p className="text-xs text-slate-500">Legal: {selectedRequest.legalEntityName}</p>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                        selectedRequest.riskScore === 'Low'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        Risk: {selectedRequest.riskScore}
                      </span>
                    </div>

                    {/* Duplicate Candidate warning if detected */}
                    {selectedRequest.duplicateMatchFound && (
                      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs space-y-1">
                        <div className="flex items-center gap-2 font-bold text-amber-900">
                          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                          <span>Duplicate Candidate Detected</span>
                        </div>
                        <p className="text-[11px] leading-relaxed">
                          {selectedRequest.duplicateNotes}
                        </p>
                      </div>
                    )}

                    {/* Official Credentials */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <span className="text-slate-500 text-[10px] uppercase font-bold">GSTIN Reference</span>
                        <div className="font-mono font-semibold text-slate-900">{selectedRequest.gstin}</div>
                        <span className="text-[10px] text-emerald-600 font-semibold">Verified via GST API</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <span className="text-slate-500 text-[10px] uppercase font-bold">FSSAI License</span>
                        <div className="font-mono font-semibold text-slate-900">{selectedRequest.fssaiNumber || 'Not Required'}</div>
                        <span className="text-[10px] text-slate-500">Standard Category</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <span className="text-slate-500 text-[10px] uppercase font-bold">Phone Audit</span>
                        <div className="font-medium text-slate-900">{selectedRequest.phone}</div>
                        <span className="text-[10px] text-emerald-600 font-semibold">SMS OTP Verified</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <span className="text-slate-500 text-[10px] uppercase font-bold">Location & Pincode</span>
                        <div className="font-medium text-slate-900">{selectedRequest.pincode}</div>
                        <span className="text-[10px] text-slate-500">{selectedRequest.address}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div className="text-xs text-slate-500">
                        Status: <span className="font-bold text-slate-900 capitalize">{selectedRequest.status}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDecision(selectedRequest.id, 'rejected')}
                          className="px-4 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-bold transition-colors"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleDecision(selectedRequest.id, 'approved')}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
                        >
                          Approve & Issue Gold Badge
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    Select a verification request from the left queue.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: FREE LISTINGS DIRECTORY */}
          {activeTab === 'listings' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Merchant Directory & Free Listings</h2>
                  <p className="text-xs text-slate-500">All local businesses registered for discovery and enquiry routing</p>
                </div>
                <Link
                  href="/listing"
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold shadow-xs"
                >
                  + Add New Listing
                </Link>
              </div>

              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-y border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Business Name</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">City</th>
                      <th className="py-2.5 px-3">Phone</th>
                      <th className="py-2.5 px-3">Badge Status</th>
                      <th className="py-2.5 px-3">Customer Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MOCK_MERCHANTS.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-3 font-semibold text-slate-900">{m.businessName}</td>
                        <td className="py-3 px-3 text-slate-500">{m.category}</td>
                        <td className="py-3 px-3 text-slate-500">{m.city}</td>
                        <td className="py-3 px-3 font-mono text-slate-700">{m.phone}</td>
                        <td className="py-3 px-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {m.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-bold text-slate-900">{m.rating} ★</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CATEGORIES & SERVICES MASTER DIRECTORY */}
          {activeTab === 'categories' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Categories & Services Master Directory</h2>
                  <p className="text-xs text-slate-500">All 12 core platform discovery categories with subcategory routing</p>
                </div>
                <Link
                  href="/categories"
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700"
                >
                  View Public Categories Page →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {CATEGORIES.map((cat) => (
                  <div key={cat.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{cat.name}</span>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {cat.count}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Subcategories: {cat.subcategories?.map(s => s.name).join(', ') || 'Direct Directory'}
                    </p>
                    <div className="pt-2">
                      <Link
                        href={`/categories/${cat.slug}`}
                        className="text-xs text-blue-600 font-semibold hover:underline"
                      >
                        Explore Listings in {cat.name} →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: VIDEO STORIES & REELS MODERATION */}
          {activeTab === 'reels' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Promotional Reels & Video Stories Moderation</h2>
                  <p className="text-xs text-slate-500">Manage merchant video stories featured on the homepage and blog feed</p>
                </div>
                <Link
                  href="/blog"
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold shadow-xs"
                >
                  View Live Reels Feed →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reelsList.map((reel) => (
                  <div key={reel.id} className="p-3 rounded-2xl border border-slate-200 bg-white space-y-2 shadow-xs">
                    <div className="relative h-36 rounded-xl overflow-hidden bg-slate-100">
                      <img src={reel.thumbnail} alt={reel.title} className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {reel.likes} likes
                      </span>
                    </div>
                    <div className="font-bold text-xs text-slate-900 truncate">{reel.title}</div>
                    <div className="text-[11px] text-slate-500">{reel.merchantName} • {reel.merchantCity}</div>
                    <div className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded inline-block">
                      {reel.offerText}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CUSTOMER COMPLAINTS & GRIEVANCE REDRESSAL */}
          {activeTab === 'complaints' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Consumer Grievances & Resolution Log</h2>
                <p className="text-xs text-slate-500">Track and redress client complaints with 24/7 SLA enforcement</p>
              </div>

              <div className="space-y-3">
                {MOCK_COMPLAINTS.map((cmp) => (
                  <div key={cmp.id} className="p-4 rounded-xl border border-slate-200 bg-white text-xs space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-blue-600">{cmp.ticketNumber}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[10px]">
                        {cmp.status}
                      </span>
                    </div>
                    <div className="text-slate-900 font-medium">{cmp.issue}</div>
                    <div className="text-slate-500 text-[11px]">
                      Customer: {cmp.customerName} ({cmp.customerPhone}) • Store: {cmp.merchantName}
                    </div>
                    {cmp.resolution && (
                      <div className="text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-[11px]">
                        <strong>Resolution:</strong> {cmp.resolution}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
