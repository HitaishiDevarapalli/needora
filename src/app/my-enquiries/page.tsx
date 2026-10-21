'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import BottomCtaSection from '@/components/BottomCtaSection';
import { MOCK_CUSTOMER_ENQUIRIES } from '@/data/mockData';
import { CustomerEnquiry } from '@/types';
import { 
  MessageSquare, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowLeft, 
  Send, 
  FileText, 
  AlertCircle, 
  X, 
  Filter, 
  Check, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Search,
  Scale
} from 'lucide-react';

export default function MyEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>(MOCK_CUSTOMER_ENQUIRIES);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Quotes Received' | 'Awaiting Response' | 'Business Responded' | 'Closed'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<CustomerEnquiry | null>(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  // Filter logic
  const filteredEnquiries = enquiries.filter((item) => {
    const matchesSearch = item.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.requirement.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.enquiryRef.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeFilter === 'Quotes Received') return item.status === 'Quote Provided';
    if (activeFilter === 'Awaiting Response') return item.status === 'Submitted' || item.status === 'Sent to Business' || item.status === 'Delivered';
    if (activeFilter === 'Business Responded') return item.status === 'Business Responded' || item.status === 'Customer Contacted';
    if (activeFilter === 'Closed') return item.status === 'Closed';

    return true;
  });

  const handleCloseEnquiry = (id: string) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: 'Closed' } : e))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Navigation Row with Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined' && window.history.length > 1) {
                  window.history.back();
                } else {
                  window.location.href = '/';
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 shadow-xs hover:border-blue-400 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            
            <nav className="text-xs text-slate-500 flex items-center gap-2">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-slate-800 font-semibold">My Enquiries & Leads</span>
            </nav>
          </div>

          {/* Quotations comparison button */}
          <button
            type="button"
            onClick={() => setCompareModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold shadow-xs hover:border-blue-400 transition-all cursor-pointer"
          >
            <Scale className="w-4 h-4 text-blue-600" />
            <span>Compare Received Quotations</span>
          </button>
        </div>

        {/* Dashboard Title & Quick Stats */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Customer Enquiry Dashboard</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                My Enquiries & Direct Leads
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                Track your real-time requests sent to local shops, service technicians, and verified businesses. Connect directly via Call, WhatsApp, or request an in-person callback.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <div className="text-xl font-bold text-slate-900">{enquiries.length}</div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Total Sent</div>
              </div>
              <div className="px-4 py-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
                <div className="text-xl font-bold text-emerald-700">
                  {enquiries.filter(e => e.status === 'Quote Provided' || e.status === 'Business Responded').length}
                </div>
                <div className="text-[10px] uppercase font-bold text-emerald-600">Responses</div>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by business name, requirement, or ref..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
              />
            </div>

            {/* Status Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {(['All', 'Quotes Received', 'Business Responded', 'Awaiting Response', 'Closed'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveFilter(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeFilter === tab
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Enquiries List */}
        <div className="space-y-4 mb-14">
          {filteredEnquiries.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No enquiries found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No customer enquiries matched your search or selected filter. You can search for local businesses on Needora and send free direct enquiries anytime.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold text-xs rounded-xl shadow-xs hover:bg-blue-700 transition-colors"
              >
                <span>Browse Services & Stores</span>
              </Link>
            </div>
          ) : (
            filteredEnquiries.map((enq) => (
              <div
                key={enq.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:border-blue-300 transition-all space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {enq.enquiryRef}
                    </span>
                    <span className="text-slate-300">•</span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">{enq.businessName}</h3>
                    <span className="text-[11px] text-slate-400 font-medium">({enq.category})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 font-medium">{enq.date}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      enq.status === 'Quote Provided'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : enq.status === 'Business Responded'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : enq.status === 'Customer Contacted'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : enq.status === 'Closed'
                        ? 'bg-slate-100 text-slate-600 border border-slate-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {enq.status}
                    </span>
                  </div>
                </div>

                {/* Requirement & Merchant Response Body */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs">
                  {/* Left: Client's submitted issue */}
                  <div className="lg:col-span-6 bg-slate-50/80 p-3.5 rounded-xl border border-slate-100 space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Your Submitted Requirement:
                    </div>
                    <p className="text-slate-800 font-medium leading-relaxed">
                      &ldquo;{enq.requirement}&rdquo;
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                      <span>Area: {enq.location}</span>
                      <span>•</span>
                      <span>Callback: {enq.preferredTime}</span>
                    </div>
                  </div>

                  {/* Right: Merchant Response / Quotation note */}
                  <div className="lg:col-span-6 bg-blue-50/40 p-3.5 rounded-xl border border-blue-100 space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                      Latest Merchant Response & Notes:
                    </div>
                    {enq.merchantResponse ? (
                      <p className="text-blue-950 font-medium leading-relaxed">
                        {enq.merchantResponse}
                      </p>
                    ) : (
                      <p className="text-slate-400 italic">
                        Merchant has received SMS & WhatsApp notification. Direct response expected shortly within SLA.
                      </p>
                    )}
                    {enq.quotationDetails && (
                      <div className="bg-white/80 p-2.5 rounded-lg border border-blue-200 text-[11px] text-blue-900 font-semibold mt-1">
                        📋 Quotation Overview: {enq.quotationDetails}
                      </div>
                    )}
                  </div>
                </div>

                {/* Direct Action Buttons matching Master Specification Section 2 & 14 */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{enq.businessAddress}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Call Business */}
                    <a
                      href={`tel:${enq.businessPhone.replace(/[^0-9+]/g, '')}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                      title="Direct phone dialler"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Business</span>
                    </a>

                    {/* WhatsApp Business */}
                    <a
                      href={`https://wa.me/${enq.businessWhatsapp}?text=${encodeURIComponent(`Hello ${enq.businessName}, I am following up on my enquiry (${enq.enquiryRef}) on Needora.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs transition-colors"
                      title="Open WhatsApp chat"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    {/* Get Directions */}
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(enq.businessName + ' ' + enq.businessAddress)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                      title="Get directions in Google Maps"
                    >
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span>Directions</span>
                    </a>

                    {/* Close enquiry toggle */}
                    {enq.status !== 'Closed' && (
                      <button
                        type="button"
                        onClick={() => handleCloseEnquiry(enq.id)}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium transition-colors"
                        title="Mark requirement fulfilled"
                      >
                        Close Enquiry
                      </button>
                    )}

                    {/* Report issue */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedEnquiry(enq);
                        setReportModalOpen(true);
                      }}
                      className="px-2.5 py-1.5 text-slate-400 hover:text-rose-600 text-xs transition-colors"
                      title="Report issue with business or enquiry"
                    >
                      Report
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        {/* COMPARE QUOTATIONS MODAL (Section 10 of Master Prompt) */}
        {compareModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
            onClick={(e) => {
              if (e.target === e.currentTarget) setCompareModalOpen(false);
            }}
          >
            <div 
              className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Informational Quotation Comparison</h3>
                    <p className="text-xs text-slate-500">Compare responses from multiple merchants for your requirements</p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setCompareModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900 leading-relaxed">
                  <strong>Notice:</strong> Quotations below are directly provided by local merchants for discussion. Needora does not process customer-to-business payments. You and the business decide final terms independently.
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enquiries.filter(e => e.quotationDetails || e.merchantResponse).slice(0, 2).map((item) => (
                    <div key={item.id} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="font-bold text-sm text-slate-900">{item.businessName}</span>
                        <span className="font-mono text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-bold">{item.enquiryRef}</span>
                      </div>
                      <div className="text-xs space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Merchant Response</span>
                        <p className="text-slate-700">{item.merchantResponse}</p>
                      </div>
                      {item.quotationDetails && (
                        <div className="text-xs space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <span className="text-[10px] uppercase font-bold text-emerald-600">Quote Scope</span>
                          <p className="text-slate-800 font-semibold">{item.quotationDetails}</p>
                        </div>
                      )}
                      <div className="pt-2 flex gap-2">
                        <a
                          href={`tel:${item.businessPhone.replace(/[^0-9+]/g, '')}`}
                          className="flex-1 py-2 text-center rounded-xl bg-emerald-600 text-white font-bold text-xs"
                        >
                          Call Business
                        </a>
                        <a
                          href={`https://wa.me/${item.businessWhatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 text-center rounded-xl bg-emerald-500 text-white font-bold text-xs"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REPORT ISSUE MODAL */}
        {reportModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
            onClick={(e) => {
              if (e.target === e.currentTarget) setReportModalOpen(false);
            }}
          >
            <div 
              className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                  <h3 className="font-bold text-slate-900 text-base">Report Listing or Enquiry</h3>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setReportModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {reportSuccess ? (
                <div className="p-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">Report Submitted to Trust & Safety</h4>
                  <p className="text-xs text-slate-500">
                    Our compliance team has received your report regarding {selectedEnquiry?.businessName}. We will audit this listing within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setReportModalOpen(false);
                      setReportSuccess(false);
                    }}
                    className="w-full py-2.5 bg-blue-600 text-white font-semibold text-xs rounded-xl"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setReportSuccess(true);
                  }}
                  className="p-6 space-y-4 text-xs"
                >
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Reason for Report</label>
                    <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800">
                      <option>Incorrect phone number or business details</option>
                      <option>Merchant did not respond within SLA</option>
                      <option>Suspected duplicate or unauthorized listing</option>
                      <option>Unprofessional conduct or misleading quotation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Additional Details</label>
                    <textarea
                      rows={3}
                      placeholder="Please describe what happened..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-colors shadow-xs"
                  >
                    Submit Report to Administrators
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </main>

      <BottomCtaSection />
    </div>
  );
}
