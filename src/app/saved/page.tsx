'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Bookmark, 
  Store, 
  Sparkles, 
  MapPin, 
  Trash2, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import { 
  getCurrentUser, 
  getStoredBusinesses, 
  getStoredPosts, 
  toggleSaveBusiness, 
  toggleSavePost, 
  StoredBusiness, 
  StoredPost 
} from '@/lib/storage';

export default function SavedPage() {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [savedBusinesses, setSavedBusinesses] = useState<StoredBusiness[]>([]);
  const [savedPosts, setSavedPosts] = useState<StoredPost[]>([]);
  const [activeTab, setActiveTab] = useState<'businesses' | 'posts'>('businesses');
  const [selectedBusinessForEnquiry, setSelectedBusinessForEnquiry] = useState<{ id: string; name: string; category: string } | null>(null);

  const loadData = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
    const allBusinesses = getStoredBusinesses();
    const allPosts = getStoredPosts();

    const savedBizIds = user?.savedBusinesses || [];
    const savedPostIds = user?.savedPosts || [];

    setSavedBusinesses(allBusinesses.filter(b => savedBizIds.includes(b.id)));
    setSavedPosts(allPosts.filter(p => savedPostIds.includes(p.id)));
  };

  useEffect(() => {
    loadData();
    window.addEventListener('needora_storage_update', loadData);
    return () => window.removeEventListener('needora_storage_update', loadData);
  }, []);

  const handleRemoveSavedBusiness = (id: string) => {
    toggleSaveBusiness(id);
    loadData();
  };

  const handleRemoveSavedPost = (id: string) => {
    toggleSavePost(id);
    loadData();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Saved Items</span>
        </div>

        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Bookmark className="w-6 h-6 text-blue-600" />
              Saved Bookmarks & Stores
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Quickly access local merchants and offers you&apos;ve saved for future enquiries.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab('businesses')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'businesses'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Saved Businesses ({savedBusinesses.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('posts')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'posts'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Saved Posts ({savedPosts.length})
            </button>
          </div>
        </div>

        {/* TAB 1: SAVED BUSINESSES */}
        {activeTab === 'businesses' && (
          <div>
            {savedBusinesses.length === 0 ? (
              <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center max-w-lg mx-auto my-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                  <Store className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">No saved businesses yet</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Browse local listings in Explore or Categories and bookmark the ones you want to contact later.
                </p>
                <div className="mt-6">
                  <Link
                    href="/explore"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all inline-block"
                  >
                    Explore Businesses
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedBusinesses.map(biz => (
                  <div 
                    key={biz.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <h3 className="font-bold text-slate-900 text-base">{biz.name}</h3>
                          <span className="inline-block mt-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                            {biz.category}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveSavedBusiness(biz.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 my-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{biz.address}, {biz.city}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedBusinessForEnquiry({ id: biz.id, name: biz.name, category: biz.category })}
                        className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg text-center transition-all"
                      >
                        Send Free Enquiry
                      </button>
                      <a
                        href={`tel:${biz.phone}`}
                        className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg transition-all"
                      >
                        Call
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SAVED POSTS */}
        {activeTab === 'posts' && (
          <div>
            {savedPosts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center max-w-lg mx-auto my-8">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">No saved posts yet</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Save merchant announcements, offers, and tips to review them at your convenience.
                </p>
                <div className="mt-6">
                  <Link
                    href="/explore"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all inline-block"
                  >
                    Browse Local Feed
                  </Link>
                </div>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto space-y-4">
                {savedPosts.map(post => (
                  <div key={post.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{post.businessName}</h4>
                        <span className="text-[10px] text-slate-400">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSavedPost(post.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-sm text-slate-700 mb-3 whitespace-pre-line">{post.content}</p>

                    {post.imageUrl && (
                      <div className="rounded-xl overflow-hidden max-h-72 mb-3">
                        <img src={post.imageUrl} alt="Saved Post" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Free Direct Enquiry Modal */}
      {selectedBusinessForEnquiry && (
        <BookingModal
          isOpen={true}
          onClose={() => setSelectedBusinessForEnquiry(null)}
          serviceName={selectedBusinessForEnquiry.name}
          category={selectedBusinessForEnquiry.category}
          providerName={selectedBusinessForEnquiry.name}
        />
      )}

      <Footer />
    </div>
  );
}
