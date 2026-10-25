'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Heart, 
  MessageCircle, 
  Share2, 
  PlusCircle, 
  Store, 
  Send, 
  X, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import { 
  getStoredVideos, 
  toggleVideoLike, 
  addVideoComment, 
  getCurrentUser, 
  StoredVideo 
} from '@/lib/storage';

export default function VideosPage() {
  const [videos, setVideos] = useState<StoredVideo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [selectedBusinessForEnquiry, setSelectedBusinessForEnquiry] = useState<{ id: string; name: string; category: string } | null>(null);

  const REEL_CATEGORIES = [
    'All',
    'Home Decor',
    'Food & Dining',
    'Home Cleaning',
    'Beauty & Salon',
    'Repairs & Services',
    'Real Estate',
    'Healthcare'
  ];

  const loadVideos = () => {
    const list = getStoredVideos();
    setVideos(list);
    setCurrentUser(getCurrentUser());
  };

  useEffect(() => {
    loadVideos();
    window.addEventListener('needora_storage_update', loadVideos);
    return () => window.removeEventListener('needora_storage_update', loadVideos);
  }, []);

  const filteredVideos = selectedCategory === 'All'
    ? videos
    : videos.filter(v => v.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(v.category.toLowerCase()));

  const currentVideo = filteredVideos[currentIndex] || filteredVideos[0];

  const handleLike = (videoId: string) => {
    const uid = currentUser?.id || 'guest_user';
    toggleVideoLike(videoId, uid);
    loadVideos();
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentVideo) return;
    const author = commentAuthor.trim() || currentUser?.name || 'Verified Customer';
    addVideoComment(currentVideo.id, author, newComment.trim());
    setNewComment('');
    loadVideos();
  };

  const handleNext = () => {
    if (currentIndex < filteredVideos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center p-4 relative">
        {/* Top Back Navigation */}
        <div className="w-full max-w-lg flex items-center justify-between py-2 mb-2">
          <Link href="/explore" className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Explore
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-300">Needora Reels</span>
            <Link
              href="/create"
              className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-full transition-all inline-flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Upload Video
            </Link>
          </div>
        </div>

        {/* Category Discovery Pills (Requirement 1) */}
        <div className="w-full max-w-lg flex items-center gap-2 overflow-x-auto pb-3 mb-2 no-scrollbar">
          {REEL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-900/40'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredVideos.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 max-w-md w-full text-center my-12 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
              <PlusCircle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">No {selectedCategory !== 'All' ? selectedCategory : ''} reels yet</h2>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Be the first local merchant or customer to share a video showcase! Upload short store walkthroughs, services demos, or seasonal announcements.
            </p>
            <Link
              href="/create"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-rose-900/30"
            >
              <PlusCircle className="w-4 h-4" /> Upload First Video
            </Link>
          </div>
        ) : (
          <div className="relative w-full max-w-[420px] aspect-[9/16] max-h-[80vh] bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col justify-end">
            {/* Real HTML5 Video Player */}
            <video
              key={currentVideo.id}
              src={currentVideo.videoUrl}
              className="absolute inset-0 w-full h-full object-cover"
              controls
              playsInline
              autoPlay
              loop
            />

            {/* Top Reel Counter */}
            <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-white/90">
              {currentIndex + 1} / {filteredVideos.length}
            </div>

            {/* Vertical Video Navigation Arrows */}
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`p-2 rounded-full bg-black/60 backdrop-blur-md transition-all ${
                  currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/90 text-white'
                }`}
                title="Previous video"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex === filteredVideos.length - 1}
                className={`p-2 rounded-full bg-black/60 backdrop-blur-md transition-all ${
                  currentIndex === filteredVideos.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/90 text-white'
                }`}
                title="Next video"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Overlay Action Bar on Right */}
            <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-5">
              {/* Like Button */}
              {(() => {
                const uid = currentUser?.id || 'guest_user';
                const isLiked = currentVideo.likes.includes(uid);
                return (
                  <button
                    type="button"
                    onClick={() => handleLike(currentVideo.id)}
                    className="flex flex-col items-center gap-1 group"
                  >
                    <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Heart className={`w-6 h-6 ${isLiked ? 'text-rose-500 fill-rose-500' : 'text-white'}`} />
                    </div>
                    <span className="text-[11px] font-bold text-white drop-shadow">
                      {currentVideo.likes.length}
                    </span>
                  </button>
                );
              })()}

              {/* Comments Button */}
              <button
                type="button"
                onClick={() => setCommentsModalOpen(true)}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-[11px] font-bold text-white drop-shadow">
                  {currentVideo.comments.length}
                </span>
              </button>

              {/* Share Button */}
              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: currentVideo.title,
                      text: currentVideo.caption,
                      url: window.location.href,
                    }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Video link copied to clipboard!');
                  }
                }}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Share2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-[11px] font-bold text-white drop-shadow">Share</span>
              </button>
            </div>

            {/* Bottom Content Info Overlay with Premium Badge */}
            <div className="relative z-10 p-5 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-auto">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {currentVideo.isPremium && (
                  <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-amber-300">
                    <Sparkles className="w-3 h-3 text-slate-950 fill-current" />
                    <span>PREMIUM</span>
                  </span>
                )}
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
                  {currentVideo.merchantName.slice(0, 1)}
                </div>
                <span className="text-sm font-bold text-white truncate max-w-[150px]">{currentVideo.merchantName}</span>
                <span className="text-[10px] font-bold text-blue-300 bg-blue-900/60 px-2 py-0.5 rounded-full">
                  {currentVideo.category}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white mb-1">{currentVideo.title}</h3>
              <p className="text-xs text-slate-300 line-clamp-2 mb-4">{currentVideo.caption}</p>

              {/* Free Enquiry CTA & Store Profile Actions */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedBusinessForEnquiry({
                    id: currentVideo.merchantId,
                    name: currentVideo.merchantName,
                    category: currentVideo.category,
                  })}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Send Free Enquiry</span>
                </button>
                <Link
                  href={`/explore?category=${encodeURIComponent(currentVideo.category)}`}
                  className="px-3 py-2.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center"
                >
                  Profile
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Real Comments Sheet/Modal */}
        {commentsModalOpen && currentVideo && (
          <div 
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-xs"
            onClick={() => setCommentsModalOpen(false)}
          >
            <div 
              className="bg-slate-900 border border-slate-800 w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 max-h-[75vh] flex flex-col text-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <h4 className="font-bold text-sm text-white">
                  Comments ({currentVideo.comments.length})
                </h4>
                <button
                  type="button"
                  onClick={() => setCommentsModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Comments List */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-4 no-scrollbar">
                {currentVideo.comments.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-400">
                    No comments yet. Be the first to start the conversation!
                  </div>
                ) : (
                  currentVideo.comments.map(c => (
                    <div key={c.id} className="bg-slate-800/60 p-3 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-blue-400">{c.userName}</span>
                        <span className="text-[10px] text-slate-500">
                          {new Date(c.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{c.text}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="pt-2 border-t border-slate-800 space-y-2">
                {!currentUser && (
                  <input
                    type="text"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    placeholder="Your Name (optional)..."
                    className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                )}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Direct Enquiry Modal */}
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
