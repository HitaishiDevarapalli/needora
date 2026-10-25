'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Megaphone, 
  PlusCircle, 
  Play, 
  Pause, 
  Trash2, 
  Edit3, 
  Eye, 
  MousePointer, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  Building, 
  X,
  Calendar,
  Layers,
  MapPin,
  ExternalLink
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  getStoredAdvertisements, 
  saveAdvertisement, 
  updateAdvertisement, 
  deleteAdvertisement, 
  getCurrentUser, 
  getStoredBusinesses, 
  StoredAdvertisement,
  StoredBusiness 
} from '@/lib/storage';
import { CATEGORIES } from '@/data/mockData';

export default function AdvertisePage() {
  const [ads, setAds] = useState<StoredAdvertisement[]>([]);
  const [businesses, setBusinesses] = useState<StoredBusiness[]>([]);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<StoredAdvertisement | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [destinationUrl, setDestinationUrl] = useState('');
  const [selectedBusinessId, setSelectedBusinessId] = useState('');
  const [targetCategory, setTargetCategory] = useState('Home Decor');
  const [targetCity, setTargetCity] = useState('Mumbai');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [budgetTier, setBudgetTier] = useState<'Starter' | 'Growth' | 'Enterprise'>('Growth');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const loadData = () => {
    setAds(getStoredAdvertisements());
    setBusinesses(getStoredBusinesses());
    setCurrentUser(getCurrentUser());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('needora_storage_update', loadData);
    return () => window.removeEventListener('needora_storage_update', loadData);
  }, []);

  const handleOpenCreate = () => {
    setEditingAd(null);
    setTitle('');
    setDescription('');
    setImageUrl('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80');
    setDestinationUrl('');
    setSelectedBusinessId(businesses[0]?.id || 'BIZ-DECOR-01');
    setTargetCategory('Home Decor');
    setTargetCity('Mumbai');
    setBudgetTier('Growth');
    setFormError('');
    setFormSuccess('');
    setCreateModalOpen(true);
  };

  const handleOpenEdit = (ad: StoredAdvertisement) => {
    setEditingAd(ad);
    setTitle(ad.title);
    setDescription(ad.description);
    setImageUrl(ad.imageUrl);
    setDestinationUrl(ad.destinationUrl);
    setSelectedBusinessId(ad.businessId);
    setTargetCategory(ad.category);
    setTargetCity(ad.targetCity);
    setStartDate(ad.startDate);
    setEndDate(ad.endDate);
    setBudgetTier(ad.budgetTier);
    setFormError('');
    setFormSuccess('');
    setCreateModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !imageUrl.trim()) {
      setFormError('Please fill in the title, description, and promotional image URL.');
      return;
    }

    const business = businesses.find(b => b.id === selectedBusinessId) || businesses[0];
    const bName = business ? business.name : 'Verified Merchant';

    if (editingAd) {
      updateAdvertisement(editingAd.id, {
        title: title.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        destinationUrl: destinationUrl.trim() || `/businesses/${selectedBusinessId}`,
        businessId: selectedBusinessId,
        businessName: bName,
        category: targetCategory,
        targetCity,
        startDate,
        endDate,
        budgetTier,
      });
      setFormSuccess('Campaign updated successfully!');
    } else {
      saveAdvertisement({
        title: title.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        destinationUrl: destinationUrl.trim() || `/businesses/${selectedBusinessId}`,
        businessId: selectedBusinessId || 'BIZ-DECOR-01',
        businessName: bName,
        category: targetCategory,
        targetCity,
        startDate,
        endDate,
        budgetTier,
        status: 'Active', // Default active upon verified merchant submission
      });
      setFormSuccess('New Ad Campaign launched successfully!');
    }

    setTimeout(() => {
      setCreateModalOpen(false);
      loadData();
    }, 700);
  };

  const handleToggleStatus = (ad: StoredAdvertisement) => {
    const nextStatus = ad.status === 'Active' ? 'Paused' : 'Active';
    updateAdvertisement(ad.id, { status: nextStatus });
    loadData();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this advertising campaign?')) {
      deleteAdvertisement(id);
      loadData();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top Hero Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl border border-slate-800">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hyperlocal Targeted Promotions • Zero Commission</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Promote Your Business with Needora Ads
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Showcase your store, products, or service discounts to high-intent local customers looking for recommendations in your neighborhood.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleOpenCreate}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create New Campaign</span>
              </button>
              <Link
                href="/services"
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-1.5"
              >
                <span>Browse Live Listings</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-radial-gradient pointer-events-none" />
        </div>

        {/* Pricing / Campaign Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Neighborhood</span>
                <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">Starter</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Local Spotlight</h3>
              <p className="text-xs text-slate-500 mb-4">Target customers within 3 km radius of your store.</p>
              <ul className="text-xs text-slate-600 space-y-2 mb-6">
                <li className="flex items-center gap-2">✓ Category search priority placement</li>
                <li className="flex items-center gap-2">✓ Direct phone & WhatsApp enquiry CTA</li>
                <li className="flex items-center gap-2">✓ Verified Business badge highlight</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={handleOpenCreate}
              className="w-full py-2.5 border border-slate-300 hover:border-blue-600 text-slate-800 hover:text-blue-600 font-bold text-xs rounded-xl transition-all text-center"
            >
              Select Starter Plan
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-blue-600 shadow-md flex flex-col justify-between relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full shadow-sm">
              Most Popular
            </span>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">City Wide</span>
                <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">Growth</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Featured Discovery</h3>
              <p className="text-xs text-slate-500 mb-4">Reach shoppers across your entire city with banners.</p>
              <ul className="text-xs text-slate-600 space-y-2 mb-6">
                <li className="flex items-center gap-2">✓ Homepage Featured Story banner slot</li>
                <li className="flex items-center gap-2">✓ Verified Gold Premium Tag on Reels</li>
                <li className="flex items-center gap-2">✓ Priority customer enquiry routing</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={handleOpenCreate}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all text-center"
            >
              Select Growth Plan
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600">Omni-Channel</span>
                <span className="text-xs font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">Enterprise</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Multi-Store Brand Boost</h3>
              <p className="text-xs text-slate-500 mb-4">Unlimited campaigns, reel promotions, and CRM leads.</p>
              <ul className="text-xs text-slate-600 space-y-2 mb-6">
                <li className="flex items-center gap-2">✓ Full-screen video reel priority banner</li>
                <li className="flex items-center gap-2">✓ Platinum Enterprise badge</li>
                <li className="flex items-center gap-2">✓ Dedicated account manager support</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={handleOpenCreate}
              className="w-full py-2.5 border border-slate-300 hover:border-amber-600 text-slate-800 hover:text-amber-600 font-bold text-xs rounded-xl transition-all text-center"
            >
              Select Enterprise Plan
            </button>
          </div>
        </div>

        {/* Active Advertising Campaigns List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Your Active & Scheduled Campaigns</h2>
              <p className="text-xs text-slate-500">Track impressions, customer clicks, and status</p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {ads.length} Total Campaigns
            </span>
          </div>

          {ads.length === 0 ? (
            <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center max-w-md mx-auto">
              <Megaphone className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="font-bold text-slate-800 text-base">No advertisement campaigns yet</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Launch your first local store promotion to reach thousands of nearby customers.
              </p>
              <button
                type="button"
                onClick={handleOpenCreate}
                className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl"
              >
                Create First Ad
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ads.map(ad => (
                <div
                  key={ad.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Media Thumbnail */}
                    <div className="h-44 bg-slate-900 relative overflow-hidden">
                      <img
                        src={ad.imageUrl}
                        alt={ad.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase shadow-sm ${
                          ad.status === 'Active'
                            ? 'bg-emerald-500 text-white'
                            : ad.status === 'Pending Approval'
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-700 text-white'
                        }`}>
                          {ad.status}
                        </span>
                        <span className="bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-full text-[10px] font-semibold">
                          {ad.budgetTier} Plan
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-bold text-blue-600">{ad.businessName}</span>
                        <span>{ad.category}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                        {ad.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {ad.description}
                      </p>

                      {/* Performance Bar */}
                      <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-center">
                        <div className="bg-slate-50 p-2 rounded-xl">
                          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Impressions</span>
                          <span className="text-sm font-black text-slate-800">{ad.impressions.toLocaleString()}</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-xl">
                          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Leads / Clicks</span>
                          <span className="text-sm font-black text-blue-600">{ad.clicks.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                        <span>City: <b className="text-slate-700">{ad.targetCity}</b></span>
                        <span>Until: <b className="text-slate-700">{ad.endDate}</b></span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(ad)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors ${
                        ad.status === 'Active'
                          ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      }`}
                    >
                      {ad.status === 'Active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{ad.status === 'Active' ? 'Pause' : 'Activate'}</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(ad)}
                        className="p-2 text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
                        title="Edit Campaign"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(ad.id)}
                        className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors"
                        title="Delete Campaign"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>

      {/* CREATE / EDIT CAMPAIGN MODAL */}
      {createModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs cursor-pointer"
          onClick={(e) => {
            if (e.target === e.currentTarget) setCreateModalOpen(false);
          }}
        >
          <div 
            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  {editingAd ? 'Edit Advertising Campaign' : 'Create New Ad Campaign'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {formError && (
                <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}
              {formSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{formSuccess}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Promoted Business / Store
                </label>
                <select
                  value={selectedBusinessId}
                  onChange={(e) => setSelectedBusinessId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                >
                  {businesses.map(b => (
                    <option key={b.id} value={b.id}>{b.name} ({b.category})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Campaign Title / Headline
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 30% Off Living Room Sofas & Free Interior Consultation"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Offer Description / Call to Action
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Highlight your seasonal discount, warranties, or free delivery..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Promotional Banner Image URL
                </label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Category</label>
                  <select
                    value={targetCategory}
                    onChange={(e) => setTargetCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target City</label>
                  <input
                    type="text"
                    value={targetCity}
                    onChange={(e) => setTargetCity(e.target.value)}
                    placeholder="e.g. Mumbai"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Campaign Plan</label>
                  <select
                    value={budgetTier}
                    onChange={(e) => setBudgetTier(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold"
                  >
                    <option value="Starter">Starter (Neighborhood)</option>
                    <option value="Growth">Growth (City Featured)</option>
                    <option value="Enterprise">Enterprise (Omni-channel)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs shadow-md transition-all mt-4 cursor-pointer"
              >
                {editingAd ? 'Save Campaign Changes' : 'Launch Ad Campaign'}
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}