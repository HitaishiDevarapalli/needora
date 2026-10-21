'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Search, 
  MapPin, 
  Store, 
  Video, 
  Share2, 
  Heart, 
  MessageCircle, 
  Filter, 
  PlusCircle, 
  Sparkles, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import { 
  getStoredBusinesses, 
  getStoredPosts, 
  getStoredVideos, 
  getCurrentUser, 
  toggleFollowMerchant, 
  togglePostLike,
  StoredBusiness, 
  StoredPost, 
  StoredVideo 
} from '@/lib/storage';
import { CATEGORIES } from '@/data/mockData';

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'businesses' | 'posts' | 'videos'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [businesses, setBusinesses] = useState<StoredBusiness[]>([]);
  const [posts, setPosts] = useState<StoredPost[]>([]);
  const [videos, setVideos] = useState<StoredVideo[]>([]);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [selectedBusinessForEnquiry, setSelectedBusinessForEnquiry] = useState<{ id: string; name: string; category: string } | null>(null);

  const loadData = () => {
    setBusinesses(getStoredBusinesses());
    setPosts(getStoredPosts());
    setVideos(getStoredVideos());
    setCurrentUser(getCurrentUser());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('needora_storage_update', loadData);
    return () => window.removeEventListener('needora_storage_update', loadData);
  }, []);

  const handleLikePost = (postId: string) => {
    const uid = currentUser?.id || 'guest_user';
    togglePostLike(postId, uid);
    loadData();
  };

  const handleFollow = (merchantId: string) => {
    const uid = currentUser?.id || 'guest_user';
    toggleFollowMerchant(merchantId, uid);
    loadData();
  };

  const filteredBusinesses = businesses.filter(b => 
    selectedCategory === 'all' || b.category.toLowerCase().includes(selectedCategory.toLowerCase())
  );

  const filteredVideos = videos.filter(v => 
    selectedCategory === 'all' || v.category.toLowerCase().includes(selectedCategory.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </Link>
              <span>/</span>
              <span className="text-slate-800 font-semibold">Explore Local Community</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Explore Hyperlocal Needora
              <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Live Community
              </span>
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Discover real verified local shops, store updates, and promotional videos directly from merchants.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create / Upload</span>
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-sm font-semibold rounded-xl shadow-xs transition-all"
            >
              <Search className="w-4 h-4 text-blue-600" />
              <span>Advanced Search</span>
            </Link>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
            {(['all', 'businesses', 'posts', 'videos'] as const).map(tab => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab === 'all' ? 'All Content' : tab}
              </button>
            ))}
          </div>

          {/* Category Scroller */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.slice(0, 8).map(c => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCategory(c.name)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedCategory === c.name
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT SECTIONS */}
        <div className="space-y-12">
          
          {/* 1. Real Businesses Section */}
          {(activeTab === 'all' || activeTab === 'businesses') && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Store className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-slate-900">Verified Local Merchants</h2>
                  <span className="text-xs bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                    {filteredBusinesses.length}
                  </span>
                </div>
                <Link href="/listing" className="text-xs font-bold text-blue-600 hover:underline">
                  + Add Your Business
                </Link>
              </div>

              {filteredBusinesses.length === 0 ? (
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center max-w-xl mx-auto my-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                    <Store className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">No registered businesses in this view yet</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    Be the first local merchant to get listed in your neighborhood or invite your favorite local store to join for free.
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <Link
                      href="/listing"
                      className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 shadow-xs transition-all"
                    >
                      Register Business Free
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBusinesses.map(biz => {
                    const isFollowing = currentUser?.following.includes(biz.id);
                    return (
                      <div 
                        key={biz.id}
                        className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                      >
                        <div className="p-5">
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h3 className="font-bold text-slate-900 text-base hover:text-blue-600 transition-colors">
                                  {biz.name}
                                </h3>
                                {biz.verified && (
                                  <span title="Verified Business">
                                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                                  </span>
                                )}
                              </div>
                              <span className="inline-block mt-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                                {biz.category}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleFollow(biz.id)}
                              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                                isFollowing
                                  ? 'bg-slate-100 text-slate-700 border border-slate-300'
                                  : 'bg-blue-600 text-white hover:bg-blue-700'
                              }`}
                            >
                              {isFollowing ? 'Following' : 'Follow'}
                            </button>
                          </div>

                          <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                            {biz.description || 'Verified local provider ready to assist with custom quotes and rapid customer service.'}
                          </p>

                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{biz.address}, {biz.city}</span>
                          </div>

                          <div className="text-[11px] text-slate-400">
                            <span>Followers: </span>
                            <span className="font-bold text-slate-700">{biz.followersCount || 0}</span>
                          </div>
                        </div>

                        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedBusinessForEnquiry({ id: biz.id, name: biz.name, category: biz.category })}
                            className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg text-center transition-all"
                          >
                            Send Free Enquiry
                          </button>
                          <a
                            href={`tel:${biz.phone}`}
                            className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg transition-all"
                          >
                            Call
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          {/* 2. Real Store Videos / Reels Section */}
          {(activeTab === 'all' || activeTab === 'videos') && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-rose-600" />
                  <h2 className="text-xl font-bold text-slate-900">Merchant Video Reels</h2>
                  <span className="text-xs bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                    {filteredVideos.length}
                  </span>
                </div>
                <Link href="/videos" className="text-xs font-bold text-blue-600 hover:underline">
                  Full Video Player →
                </Link>
              </div>

              {filteredVideos.length === 0 ? (
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center max-w-xl mx-auto my-4">
                  <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
                    <Video className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">No merchant videos uploaded yet</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    Merchants can upload promotional walkthroughs, work showcases, and product reviews to gain real local visibility.
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/create"
                      className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-700 shadow-xs transition-all inline-flex items-center gap-1.5"
                    >
                      <PlusCircle className="w-4 h-4" /> Upload Local Video
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredVideos.map(vid => (
                    <div 
                      key={vid.id}
                      className="bg-black rounded-2xl overflow-hidden relative group aspect-[9/16] max-h-[420px] shadow-sm flex flex-col justify-end"
                    >
                      <video 
                        src={vid.videoUrl} 
                        className="absolute inset-0 w-full h-full object-cover"
                        controls
                        playsInline
                      />
                      <div className="relative z-10 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
                        <span className="text-[10px] font-bold text-white bg-blue-600/80 px-2 py-0.5 rounded">
                          {vid.merchantName}
                        </span>
                        <h4 className="text-white text-xs font-bold truncate mt-1">{vid.title}</h4>
                        <p className="text-slate-300 text-[11px] truncate">{vid.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* 3. Real Social Posts Section */}
          {(activeTab === 'all' || activeTab === 'posts') && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-xl font-bold text-slate-900">Local Merchant Updates & Posts</h2>
                  <span className="text-xs bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                    {posts.length}
                  </span>
                </div>
                <Link href="/create" className="text-xs font-bold text-blue-600 hover:underline">
                  + Publish Update
                </Link>
              </div>

              {posts.length === 0 ? (
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center max-w-xl mx-auto my-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">No community posts yet</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    Publish seasonal offers, announcements, and store arrivals to reach nearby residents.
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/create"
                      className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 shadow-xs transition-all inline-block"
                    >
                      Post an Update
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto space-y-4">
                  {posts.map(post => {
                    const isLiked = post.likes.includes(currentUser?.id || 'guest_user');
                    return (
                      <div key={post.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{post.businessName}</h4>
                            <span className="text-[10px] text-slate-400">
                              By {post.authorName} • {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-slate-700 mb-4 whitespace-pre-line">{post.content}</p>

                        {post.imageUrl && (
                          <div className="mb-4 rounded-xl overflow-hidden max-h-80 bg-slate-100 border border-slate-100">
                            <img src={post.imageUrl} alt="Post attachment" className="w-full h-full object-cover" />
                          </div>
                        )}

                        <div className="flex items-center gap-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
                          <button
                            type="button"
                            onClick={() => handleLikePost(post.id)}
                            className={`flex items-center gap-1.5 font-semibold transition-colors ${
                              isLiked ? 'text-rose-600' : 'hover:text-rose-600'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-600' : ''}`} />
                            <span>{post.likes.length} Likes</span>
                          </button>
                          <div className="flex items-center gap-1.5 font-semibold">
                            <MessageCircle className="w-4 h-4 text-slate-400" />
                            <span>{post.comments.length} Comments</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          )}

        </div>
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
