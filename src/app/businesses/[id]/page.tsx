'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Share2, 
  Heart, 
  CheckCircle, 
  Clock, 
  Store, 
  MessageSquare, 
  Send, 
  Star, 
  ExternalLink, 
  Play, 
  Sparkles,
  ShieldCheck,
  Tag
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import { 
  getStoredBusinesses, 
  getStoredVideos, 
  toggleFollowMerchant, 
  toggleSaveBusiness, 
  getCurrentUser, 
  StoredBusiness, 
  StoredVideo 
} from '@/lib/storage';

export default function BusinessDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const businessId = decodeURIComponent(rawId || '');

  const [business, setBusiness] = useState<StoredBusiness | null>(null);
  const [reels, setReels] = useState<StoredVideo[]>([]);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<StoredVideo | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const allBusinesses = getStoredBusinesses();
    const found = allBusinesses.find(b => b.id === businessId || b.slug === businessId);
    
    if (found) {
      setBusiness(found);
    } else {
      // Fallback fallback representation for direct URL discovery
      setBusiness({
        id: businessId,
        name: businessId.replace(/[-_]/g, ' ').toUpperCase(),
        slug: businessId.toLowerCase(),
        category: 'Local Retail & Services',
        city: 'Mumbai',
        pincode: '400001',
        address: 'Tank Bazar, Marine Lines',
        phone: '+91 98201 55667',
        ownerName: 'Authorized Merchant',
        verified: true,
        status: 'active',
        description: 'Verified neighborhood store on Needora. Connect directly with the merchant for quotes, catalog, and appointments with 0 middleman commissions.',
        hours: 'Mon - Sun: 09:30 AM - 09:00 PM',
        followersCount: 142,
        createdAt: new Date().toISOString(),
      });
    }

    const allVideos = getStoredVideos();
    setReels(allVideos.filter(v => v.merchantId === businessId || v.merchantName.toLowerCase() === found?.name.toLowerCase()));

    const user = getCurrentUser();
    setCurrentUser(user);
    if (user && found) {
      setIsFollowing(user.following.includes(found.id));
      setIsSaved(user.savedBusinesses.includes(found.id));
    }
  }, [businessId]);

  if (!business) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleFollow = () => {
    if (!currentUser) {
      alert('Please sign in to follow this merchant.');
      return;
    }
    const newStatus = toggleFollowMerchant(business.id, currentUser.id);
    setIsFollowing(newStatus);
    setBusiness(prev => prev ? { ...prev, followersCount: Math.max(0, (prev.followersCount || 0) + (newStatus ? 1 : -1)) } : null);
  };

  const handleSave = () => {
    const newStatus = toggleSaveBusiness(business.id);
    setIsSaved(newStatus);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${business.name} on Needora`,
        text: `Discover ${business.name} - ${business.category} in ${business.city}. Send a direct enquiry on Needora!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <Link href="/services" className="hover:text-blue-600 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Services
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              className={`p-2 rounded-xl border transition-all ${
                isSaved ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title="Bookmark Business"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all"
              title="Share Profile"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copied && <span className="text-emerald-600 font-bold text-xs">Link copied!</span>}
          </div>
        </div>

        {/* Business Hero Banner */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          {/* Cover Header */}
          <div className="h-48 sm:h-64 bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-800 relative">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white shadow-xl border-4 border-white flex items-center justify-center font-black text-2xl text-blue-600">
                  {business.name.slice(0, 1)}
                </div>
                <div className="text-white drop-shadow-md pb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl sm:text-3xl font-extrabold">{business.name}</h1>
                    {business.verified && (
                      <span className="bg-emerald-500 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verified Store</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-blue-100 mt-1">{business.category}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFollow}
                className={`hidden sm:inline-flex px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                  isFollowing
                    ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-md'
                    : 'bg-white text-blue-700 hover:bg-blue-50'
                }`}
              >
                {isFollowing ? '✓ Following' : '+ Follow Merchant'}
              </button>
            </div>
          </div>

          {/* Quick Actions Strip */}
          <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{business.address}, {business.city} ({business.pincode})</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Direct Free Enquiry CTA */}
              <button
                type="button"
                onClick={() => setEnquiryModalOpen(true)}
                className="flex-1 sm:flex-none px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Free Enquiry</span>
              </button>

              {/* Direct Phone Call */}
              <a
                href={`tel:${business.phone}`}
                className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>Call Store</span>
              </a>

              {/* Direct WhatsApp */}
              <a
                href={`https://wa.me/91${business.phone.replace(/[^0-9]/g, '').slice(-10)}?text=${encodeURIComponent(`Hi ${business.name}, I discovered your store on Needora and would like to enquire about your services.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
              >
                <span>WhatsApp</span>
              </a>

              {/* Get Directions */}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(`${business.name} ${business.address} ${business.city}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex px-3 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold text-xs rounded-xl transition-all items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Directions</span>
              </a>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-2">About {business.name}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {business.description}
                </p>
              </div>

              {/* Verified Business Guarantees */}
              <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-2xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-900">
                  <span className="font-bold block">100% Free Enquiry Guarantee</span>
                  Needora does not charge checkout payments or commission fees. Your enquiry is delivered directly to the store owner via SMS and WhatsApp.
                </div>
              </div>

              {/* Services & Offerings Preview */}
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-3">Popular Services & Specialties</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Custom Consultations & On-Site Estimates',
                    'Direct Store Walk-in & Inspection',
                    'Quality Warranties & Verified Staff',
                    'Fast Local Delivery & Responsive After-Sales'
                  ].map((srv, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Meta Info */}
            <div className="space-y-4">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Business Info</h4>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Working Hours:</span>
                  <span className="font-bold text-slate-800">{business.hours}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Owner / Manager:</span>
                  <span className="font-bold text-slate-800">{business.ownerName}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Primary Phone:</span>
                  <span className="font-mono font-bold text-blue-600">{business.phone}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Community Followers:</span>
                  <span className="font-bold text-slate-800">{business.followersCount} Followers</span>
                </div>

                {business.gstin && (
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200">
                    <span className="text-slate-500">GSTIN Registered:</span>
                    <span className="font-mono text-[11px] font-bold text-slate-700">{business.gstin}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Store Video Reels Showcase */}
        {reels.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Featured Video Reels from {business.name}</h3>
                <p className="text-xs text-slate-500">Watch authentic store walkthroughs and seasonal demonstrations</p>
              </div>
              <Link href="/videos" className="text-xs font-bold text-blue-600 hover:underline">
                Explore All Reels →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {reels.map(reel => (
                <div
                  key={reel.id}
                  onClick={() => setSelectedVideo(reel)}
                  className="group relative h-64 rounded-2xl overflow-hidden bg-slate-950 shadow-md cursor-pointer flex flex-col justify-between p-3"
                >
                  <video src={reel.videoUrl} className="absolute inset-0 w-full h-full object-cover" muted playsInline />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/30 pointer-events-none" />
                  
                  <div className="relative z-10 flex justify-end">
                    {reel.isPremium && (
                      <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full shadow-sm">
                        PREMIUM
                      </span>
                    )}
                  </div>

                  <div className="relative z-10 flex items-center justify-center my-auto pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md group-hover:bg-blue-600 text-white flex items-center justify-center transition-all">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  <div className="relative z-10 text-white">
                    <h4 className="text-xs font-bold line-clamp-2">{reel.title}</h4>
                    <span className="text-[10px] text-slate-300">{reel.views} views</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Enquiry Modal */}
      <BookingModal
        isOpen={enquiryModalOpen}
        businessId={business.id}
        businessName={business.name}
        category={business.category}
        onClose={() => setEnquiryModalOpen(false)}
        onOrderPlaced={() => {
          setEnquiryModalOpen(false);
          alert(`Your free enquiry has been dispatched directly to ${business.name}! A notification has been transmitted to their mobile phone.`);
        }}
      />

      <Footer />
    </div>
  );
}