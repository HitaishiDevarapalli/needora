'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Store, 
  Package, 
  Clock, 
  Tag, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  Search, 
  Filter, 
  ArrowUpRight,
  ArrowLeft,
  Phone,
  Send,
  Eye,
  ShieldCheck,
  ChevronRight,
  MapPin,
  Check
} from 'lucide-react';
import { MOCK_MERCHANTS } from '@/data/mockData';

export default function MerchantDashboard() {
  const [activeTab, setActiveTab] = useState<'enquiries' | 'catalogue' | 'storefront' | 'offers' | 'analytics'>('enquiries');
  
  // Merchant active profile
  const merchant = MOCK_MERCHANTS[0]; // Sri Balaji Sweets & Traditional Savories

  // Live Customer Enquiries & Lead Alerts state (Zero Transactions, 100% Free Lead Model)
  const [enquiries, setEnquiries] = useState([
    {
      id: 'ENQ-901',
      clientName: 'Kavita Sundaram',
      phone: '+91 98480 99881',
      location: 'Andheri West, Mumbai (0.8 km away)',
      issue: 'Need urgent assorted festive sweets gift packaging & custom box design for 50 people for a family function tomorrow.',
      preferredSlot: 'Immediate Callback (Within 15 mins)',
      time: '6 mins ago',
      alertStatus: 'SMS & WhatsApp Alert Dispatched to Merchant (+91 98765 43210)',
      status: 'New Lead'
    },
    {
      id: 'ENQ-902',
      clientName: 'Devarapalli Hitaishi',
      phone: '+91 97001 22334',
      location: 'Tank Bazar, Mumbai (1.2 km away)',
      issue: 'Inquiring about bulk order for traditional pure ghee sweets and savoury snacks with customized sweet boxes.',
      preferredSlot: 'Today Afternoon (12 PM - 3 PM)',
      time: '24 mins ago',
      alertStatus: 'SMS & WhatsApp Alert Dispatched to Merchant (+91 98765 43210)',
      status: 'In Progress'
    },
    {
      id: 'ENQ-903',
      clientName: 'Meera Deshpande',
      phone: '+91 91234 88776',
      location: 'Banjara Hills, Hyderabad',
      issue: 'Need custom sugar-free dry fruit sweets combo for diabetic elderly guests. Require immediate ingredient confirmation.',
      preferredSlot: 'Today Evening (5 PM - 8 PM)',
      time: '45 mins ago',
      alertStatus: 'SMS & WhatsApp Alert Dispatched to Merchant (+91 98765 43210)',
      status: 'Contacted'
    }
  ]);

  // Catalogue / Services listed for customer enquiry
  const [catalogue, setCatalogue] = useState([
    { id: 'cat-1', name: 'Special Kaju Katli (500g)', category: 'Sweets', scope: 'Freshly Prepared on Order', enquiryCount: 42, status: 'Active for Enquiry' },
    { id: 'cat-2', name: 'Pure Ghee Motichoor Ladoo', category: 'Sweets', scope: 'Daily Fresh Batches', enquiryCount: 38, status: 'Active for Enquiry' },
    { id: 'cat-3', name: 'Special Madras Mixture (250g)', category: 'Savories', scope: 'Standard & Bulk Packaging', enquiryCount: 29, status: 'Active for Enquiry' },
    { id: 'cat-4', name: 'Dry Fruit Halwa', category: 'Sweets', scope: 'Custom Gift Tins Available', enquiryCount: 15, status: 'Active for Enquiry' },
    { id: 'cat-5', name: 'Spicy Ribbon Pakoda', category: 'Savories', scope: 'Festive Batch', enquiryCount: 19, status: 'Active for Enquiry' }
  ]);

  const updateEnquiryStatus = (enquiryId: string, nextStatus: string) => {
    setEnquiries((prev) =>
      prev.map((enq) => (enq.id === enquiryId ? { ...enq, status: nextStatus } : enq))
    );
  };

  const simulateNewEnquiry = () => {
    const newEnq = {
      id: `ENQ-${Math.floor(100 + Math.random() * 900)}`,
      clientName: 'Arun Kumar Verma',
      phone: '+91 98200 11456',
      location: 'Connaught Place, New Delhi',
      issue: 'Customer enquiry received: Need urgent doorstep delivery of festive hampers with personalized congratulation cards.',
      preferredSlot: 'Immediate Callback (Within 15 mins)',
      time: 'Just now',
      alertStatus: 'SMS & WhatsApp Alert Dispatched to Merchant (+91 98765 43210)',
      status: 'New Lead'
    };
    setEnquiries([newEnq, ...enquiries]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Top Merchant Workspace Bar */}
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
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Merchant Lead Portal
            </span>
            <span className="text-sm font-bold text-slate-800 truncate max-w-[200px] sm:max-w-none">
              {merchant.businessName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Store Online (Accepting Client Enquiries)
          </span>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Marketplace</span>
          </Link>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-64 bg-white rounded-2xl border border-slate-200 p-4 shrink-0 shadow-xs h-fit space-y-1">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Merchant Operations
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
              <span>Client Enquiries & Leads</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              activeTab === 'enquiries' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {enquiries.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('catalogue')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'catalogue'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4" />
              <span>Services Listed</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              activeTab === 'catalogue' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {catalogue.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('storefront')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'storefront'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Storefront & Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('offers')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'offers'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Offers & Reels</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'analytics'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Lead Telemetry</span>
          </button>

          <div className="pt-4 border-t border-slate-100 px-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Verification Status
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
              <div>
                <span className="font-bold block">Gold Verified Business</span>
                <span className="text-[11px] text-emerald-700">GST & Direct Connect cleared</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 space-y-6">
          
          {/* Quick Metrics Bar - 100% Lead-Based (No Currency / No Sales / Zero Transactions) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-medium text-slate-500">Today's Enquiries</span>
              <div className="text-xl font-black text-slate-900 mt-1">{enquiries.length + 15}</div>
              <span className="text-[10px] text-emerald-600 font-semibold">↑ 24% vs yesterday</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-medium text-slate-500">Connected Leads</span>
              <div className="text-xl font-black text-slate-900 mt-1">{enquiries.length}</div>
              <span className="text-[10px] text-blue-600 font-semibold">All within response SLA</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-medium text-slate-500">Avg Response Speed</span>
              <div className="text-xl font-black text-slate-900 mt-1">&lt; 4 mins</div>
              <span className="text-[10px] text-emerald-600 font-semibold">Fast callback rating</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-medium text-slate-500">Customer Rating</span>
              <div className="text-xl font-black text-slate-900 mt-1">4.9 ★</div>
              <span className="text-[10px] text-slate-500">1,420 client reviews</span>
            </div>
          </div>

          {/* TAB 1: LIVE CLIENT ENQUIRIES & LEAD DISPATCH */}
          {activeTab === 'enquiries' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Live Client Enquiries & Lead Alerts</h2>
                  <p className="text-xs text-slate-500">Direct enquiries submitted by clients for their specific requirements</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={simulateNewEnquiry}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
                    title="Simulate incoming customer enquiry"
                  >
                    <Plus className="w-3.5 h-3.5 text-blue-600" />
                    <span>Simulate New Lead</span>
                  </button>
                  <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-3 py-1 rounded-full border border-emerald-200">
                    Live Dispatch Active
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {enquiries.map((enq) => (
                  <div key={enq.id} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all bg-white flex flex-col gap-3 shadow-xs">
                    
                    {/* Header line */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {enq.id}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-sm font-bold text-slate-900">{enq.clientName}</span>
                        <span className="text-xs text-slate-500">({enq.phone})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400 font-medium">{enq.time}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          enq.status === 'New Lead'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : enq.status === 'In Progress'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {enq.status}
                        </span>
                      </div>
                    </div>

                    {/* Client Issue details */}
                    <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Client Issue / Requirement:
                      </div>
                      <p className="text-xs text-slate-800 font-medium leading-relaxed">
                        "{enq.issue}"
                      </p>
                    </div>

                    {/* Metadata & Dispatch alert */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{enq.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Callback requested: <strong>{enq.preferredSlot}</strong></span>
                        </div>
                      </div>

                      <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-emerald-800 text-[11px] font-semibold flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{enq.alertStatus}</span>
                      </div>
                    </div>

                    {/* Action Buttons: Direct Call & WhatsApp */}
                    <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <a
                        href={`tel:${enq.phone.replace(/[^0-9+]/g, '')}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Client ({enq.phone})</span>
                      </a>

                      <a
                        href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${enq.clientName}, this is ${merchant.businessName} regarding your enquiry on Needora.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-xs transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp Client</span>
                      </a>

                      {enq.status !== 'Contacted' ? (
                        <button
                          onClick={() => updateEnquiryStatus(enq.id, 'Contacted')}
                          className="px-3.5 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200 transition-colors"
                        >
                          Mark Contacted
                        </button>
                      ) : (
                        <span className="px-3 py-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 rounded-lg">
                          ✓ Lead Followed Up
                        </span>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SERVICES & ITEMS LISTED FOR ENQUIRY */}
          {activeTab === 'catalogue' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Services & Offerings Listed</h2>
                  <p className="text-xs text-slate-500">Manage categories and service scopes open for direct client enquiries</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newItem = {
                      id: `cat-${Date.now()}`,
                      name: 'Fresh Bengali Rasgulla Tin (1kg)',
                      category: 'Sweets',
                      scope: 'Direct Delivery Available',
                      enquiryCount: 0,
                      status: 'Active for Enquiry'
                    };
                    setCatalogue([newItem, ...catalogue]);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>List New Offering</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-y border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Offering Name</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Scope / Availability</th>
                      <th className="py-2.5 px-3">Enquiries Received</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {catalogue.map((it) => (
                      <tr key={it.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-3 font-semibold text-slate-800">{it.name}</td>
                        <td className="py-3 px-3 text-slate-500">{it.category}</td>
                        <td className="py-3 px-3 text-slate-600 font-medium">{it.scope}</td>
                        <td className="py-3 px-3 font-bold text-blue-600">{it.enquiryCount} leads</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {it.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button className="text-blue-600 hover:underline font-semibold">Edit Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: STOREFRONT PROFILE */}
          {activeTab === 'storefront' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
              <div>
                <h2 className="text-base font-bold text-slate-900">Storefront Profile & Enquiry Settings</h2>
                <p className="text-xs text-slate-500">Contact details where customer SMS & WhatsApp enquiry alerts will be transmitted</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Business Name</label>
                  <input
                    type="text"
                    defaultValue={merchant.businessName}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Category</label>
                  <input
                    type="text"
                    defaultValue={merchant.category}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Enquiry Alert Mobile Phone</label>
                  <input
                    type="text"
                    defaultValue={merchant.phone}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Client issues will be SMS/WhatsApp alerted to this number</span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Store Address / Location</label>
                  <input
                    type="text"
                    defaultValue={merchant.address}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs">
                  Save Store Profile Changes
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: OFFERS & REELS */}
          {activeTab === 'offers' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Promotional Campaigns & Video Reels</h2>
                  <p className="text-xs text-slate-500">Feature your business reel on Needora to drive higher client enquiries</p>
                </div>
                <Link href="/blog" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold">
                  + Upload Merchant Reel
                </Link>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900">Festive Sweets & Savouries Showcase Reel</span>
                  <p className="text-[11px] text-slate-500">Featured in Mumbai Local Discovery • 1.2k views • 42 enquiries generated</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  Active in Feed
                </span>
              </div>
            </div>
          )}

          {/* TAB 5: LEAD TELEMETRY & CONVERSIONS */}
          {activeTab === 'analytics' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Lead Telemetry & Performance</h2>
                <p className="text-xs text-slate-500">Track client enquiry volume, response velocity, and customer satisfaction</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
                  <BarChart3 className="w-6 h-6 text-blue-600 mx-auto" />
                  <div className="text-xl font-bold text-slate-900">486</div>
                  <span className="text-xs text-slate-500 font-medium">Total Enquiries Received</span>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
                  <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto" />
                  <div className="text-xl font-bold text-slate-900">92%</div>
                  <span className="text-xs text-slate-500 font-medium">Leads Converted to Clients</span>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
                  <Clock className="w-6 h-6 text-indigo-600 mx-auto" />
                  <div className="text-xl font-bold text-slate-900">3.8 mins</div>
                  <span className="text-xs text-slate-500 font-medium">Average Response Time</span>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
