'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Volume2, 
  VolumeX, 
  ArrowLeft, 
  ChevronUp, 
  ChevronDown, 
  ShieldCheck, 
  ShoppingBag, 
  Tag, 
  Music2, 
  X, 
  Send,
  Sparkles,
  Check
} from 'lucide-react';
import { BLOG_REELS, POPULAR_SERVICES } from '@/data/mockData';
import BookingModal from '@/components/BookingModal';

export default function BlogReelsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(
    BLOG_REELS.reduce((acc, reel) => ({ ...acc, [reel.id]: reel.likes }), {})
  );
  const [activeCommentReel, setActiveCommentReel] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');
  const [copiedToast, setCopiedToast] = useState(false);
  const [bookingService, setBookingService] = useState<any>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Key navigation for reels
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        goToNext();
      } else if (e.key === 'ArrowUp') {
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const goToNext = () => {
    if (currentIndex < BLOG_REELS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const toggleLike = (reelId: string) => {
    setLikedReels((prev) => {
      const isLiked = !prev[reelId];
      setLikeCounts((c) => ({
        ...c,
        [reelId]: isLiked ? c[reelId] + 1 : c[reelId] - 1
      }));
      return { ...prev, [reelId]: isLiked };
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  const currentReel = BLOG_REELS[currentIndex];

  const sampleComments = [
    { name: 'Siddharth R.', text: 'Ordered this for family Diwali party, absolutely delicious! 🤤' },
    { name: 'Dr. Meenakshi', text: 'Cleanliness standard is so high! Highly recommend this service.' },
    { name: 'Rohit K.', text: 'Does this code work in Madhapur area? Yes, just verified!' }
  ];

  return (
    <div className="relative h-screen w-screen bg-black text-white overflow-hidden flex flex-col font-sans select-none">
      
      {/* Top Floating App Bar */}
      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-8 py-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <Link 
          href="/" 
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>

        {/* Brand center */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-xs font-black">N</div>
          <span className="font-bold tracking-tight text-sm">Needora Reels & Stories</span>
        </div>

        {/* Audio Mute/Unmute */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full transition-all"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </header>

      {/* Copied Toast */}
      {copiedToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 bg-white text-slate-900 text-xs font-bold px-4 py-2 rounded-full shadow-2xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Reel link copied to clipboard!</span>
        </div>
      )}

      {/* Main Full-Height Reel Stage */}
      <div className="relative flex-1 flex items-center justify-center w-full h-full">
        
        {/* Background Blurred Ambient Glow */}
        <div 
          className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-30 scale-125 transition-all duration-700 pointer-events-none"
          style={{ backgroundImage: `url(${currentReel.thumbnail})` }}
        />

        {/* Reel Container Card (9:16 Aspect Mobile Experience on desktop or full phone) */}
        <div className="relative w-full sm:max-w-md h-full sm:h-[94vh] bg-slate-900 rounded-none sm:rounded-3xl overflow-hidden shadow-2xl border-0 sm:border border-slate-800 flex flex-col justify-end">
          
          {/* Reel Visual Media (Simulated live video stream) */}
          <img
            src={currentReel.thumbnail}
            alt={currentReel.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Vignette Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/30 pointer-events-none" />

          {/* Sound / Playing Indicator */}
          {!isMuted && (
            <div className="absolute top-20 right-4 z-20 flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-slate-300">
              <span className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse" />
              <span className="w-1 h-4 bg-emerald-400 rounded-full animate-pulse delay-75" />
              <span className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse delay-150" />
              <span className="ml-1">Playing Audio</span>
            </div>
          )}

          {/* RIGHT ACTION DOCK (Like, Comment, Share, Order) */}
          <div className="absolute right-3.5 bottom-24 z-20 flex flex-col items-center gap-5">
            
            {/* Like */}
            <button
              onClick={() => toggleLike(currentReel.id)}
              className="flex flex-col items-center group"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                likedReels[currentReel.id] 
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/50 scale-110' 
                  : 'bg-black/50 hover:bg-black/70 text-white'
              }`}>
                <Heart className={`w-6 h-6 ${likedReels[currentReel.id] ? 'fill-current' : ''}`} />
              </div>
              <span className="text-[11px] font-bold mt-1 shadow-sm">
                {(likeCounts[currentReel.id] / 1000).toFixed(1)}k
              </span>
            </button>

            {/* Comments */}
            <button
              onClick={() => setActiveCommentReel(currentReel.id)}
              className="flex flex-col items-center group"
            >
              <div className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white transition-all">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold mt-1">
                {currentReel.commentsCount}
              </span>
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="flex flex-col items-center group"
            >
              <div className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white transition-all">
                <Share2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold mt-1">
                Share
              </span>
            </button>

            {/* Rotating Audio Disk */}
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-slate-800 to-slate-900 border-2 border-white/40 flex items-center justify-center animate-spin duration-3000 mt-2">
              <div className="w-4 h-4 rounded-full bg-blue-600" />
            </div>

          </div>

          {/* BOTTOM REEL CONTENT & CAPTION */}
          <div className="relative z-20 p-5 sm:p-6 space-y-3.5 pr-16">
            
            {/* Merchant Pill */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-blue-600 border border-white flex items-center justify-center text-white text-xs font-bold shrink-0">
                {currentReel.merchantName.slice(0, 2)}
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm text-white">
                  <span>{currentReel.merchantName}</span>
                  {currentReel.verified && (
                    <ShieldCheck className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                  )}
                </div>
                <div className="text-[11px] text-slate-300">{currentReel.merchantCity}</div>
              </div>
            </div>

            {/* Promotional Offer Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-extrabold shadow-md">
              <Tag className="w-3.5 h-3.5" />
              <span>{currentReel.offerText}</span>
            </div>

            {/* Caption & Description */}
            <h2 className="text-base font-bold text-white leading-snug">
              {currentReel.title}
            </h2>
            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
              {currentReel.description}
            </p>

            {/* Hashtags */}
            <div className="flex flex-wrap gap-2 text-[11px] text-blue-300 font-semibold">
              {currentReel.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            {/* Music Track */}
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <Music2 className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <span className="truncate">{currentReel.musicTrack}</span>
            </div>

            {/* DIRECT ORDER / BOOK CTA BUTTON */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setBookingService(POPULAR_SERVICES[0])}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Claim Offer & Order From This Store</span>
              </button>
            </div>

          </div>

          {/* UP / DOWN NAVIGATION BUTTONS FOR DESKTOP */}
          <div className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 flex-col gap-2">
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className={`w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-opacity ${
                currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-80 hover:opacity-100'
              }`}
            >
              <ChevronUp className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              disabled={currentIndex === BLOG_REELS.length - 1}
              className={`w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-opacity ${
                currentIndex === BLOG_REELS.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-80 hover:opacity-100'
              }`}
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>

      {/* SLIDE-IN COMMENTS DRAWER */}
      {activeCommentReel && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-slate-900 text-white h-full flex flex-col p-5 shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-sm">Customer Comments ({currentReel.commentsCount})</h3>
              <button 
                onClick={() => setActiveCommentReel(null)}
                className="p-1 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {sampleComments.map((c, i) => (
                <div key={i} className="space-y-1 text-xs">
                  <span className="font-bold text-blue-400">{c.name}</span>
                  <p className="text-slate-300">{c.text}</p>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="Add a comment for this merchant..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button 
                onClick={() => {
                  if (commentInput.trim()) {
                    sampleComments.push({ name: 'You', text: commentInput });
                    setCommentInput('');
                  }
                }}
                className="p-2 bg-blue-600 rounded-xl hover:bg-blue-700 text-white"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal from reel offer */}
      <BookingModal
        service={bookingService}
        onClose={() => setBookingService(null)}
        onOrderPlaced={(order) => {
          setBookingService(null);
          setCopiedToast(true);
        }}
      />

    </div>
  );
}
