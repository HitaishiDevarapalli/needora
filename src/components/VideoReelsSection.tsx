'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Play, 
  Upload, 
  Eye, 
  Heart, 
  ShieldCheck, 
  ArrowRight, 
  Tag, 
  X, 
  CheckCircle, 
  Sparkles,
  Video,
  Plus
} from 'lucide-react';
import { BLOG_REELS } from '@/data/mockData';
import { BlogReel } from '@/types';

export default function VideoReelsSection() {
  const [selectedVideo, setSelectedVideo] = useState<BlogReel | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Food & Dining');
  const [uploadOffer, setUploadOffer] = useState('');
  const [fileName, setFileName] = useState('');

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setUploadModalOpen(false);
      setUploadTitle('');
      setUploadOffer('');
      setFileName('');
    }, 2500);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white via-slate-50 to-white border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>Watch & Discover • Hyperlocal Video Stories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Featured Video Stories & Merchant Reels
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-2xl leading-relaxed">
              Watch 30-second behind-the-scenes transformations, kitchen secrets, and product showcases from verified local neighborhood merchants.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            {/* Merchant Upload Button */}
            <button
              type="button"
              onClick={() => setUploadModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs shadow-xs hover:border-slate-400 transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4 text-blue-600" />
              <span>Upload Store Video</span>
            </button>

            {/* View All Reels in Fullscreen feed */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs shadow-md transition-all group"
            >
              <span>Watch Reels Feed</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 5 Vertical Reel Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {BLOG_REELS.map((reel) => (
            <div
              key={reel.id}
              onClick={() => setSelectedVideo(reel)}
              className="group relative h-[380px] sm:h-[400px] rounded-3xl overflow-hidden bg-slate-900 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between p-4"
            >
              {/* Background Media Thumbnail */}
              <img
                src={reel.thumbnail}
                alt={reel.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/40 group-hover:via-slate-950/20 transition-all" />

              {/* Top Row: Duration & Live Eye Count */}
              <div className="relative z-10 flex items-center justify-between text-white text-[11px] font-bold">
                <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1">
                  <Eye className="w-3 h-3 text-slate-300" />
                  <span>{(reel.likes * 1.8 / 1000).toFixed(1)}k</span>
                </span>

                <span className="bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md font-mono text-[10px]">
                  {reel.duration}
                </span>
              </div>

              {/* Center Floating Pulsating Play Button */}
              <div className="relative z-10 flex items-center justify-center my-auto">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-blue-600 text-white flex items-center justify-center transition-all duration-300 shadow-xl group-hover:scale-110 border border-white/40">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
              </div>

              {/* Bottom Details Overlay */}
              <div className="relative z-10 space-y-2 text-white">
                {/* Offer Pill */}
                <div className="inline-flex items-center gap-1 bg-amber-500/90 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold shadow-sm">
                  <Tag className="w-3 h-3" />
                  <span className="truncate max-w-[170px]">{reel.offerText}</span>
                </div>

                {/* Title */}
                <h3 className="text-xs font-bold line-clamp-2 leading-snug group-hover:text-blue-300 transition-colors">
                  {reel.title}
                </h3>

                {/* Merchant Name & Verified Badge */}
                <div className="flex items-center justify-between pt-1 border-t border-white/15 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1 truncate font-medium">
                    <span className="truncate max-w-[130px]">{reel.merchantName}</span>
                    {reel.verified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    )}
                  </div>

                  <div className="flex items-center gap-0.5 text-rose-400 font-bold shrink-0">
                    <Heart className="w-3 h-3 fill-current" />
                    <span className="text-[10px]">{(reel.likes / 1000).toFixed(1)}k</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* POPUP VIDEO PLAYER MODAL */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-sm sm:max-w-md h-[85vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col justify-end animate-in zoom-in-95 duration-200">
            
            {/* Background Media */}
            <img
              src={selectedVideo.thumbnail}
              alt={selectedVideo.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />

            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-30 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Full Reel Content */}
            <div className="relative z-20 p-6 space-y-3.5 text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs">
                  {selectedVideo.merchantName.slice(0, 2)}
                </div>
                <div>
                  <h4 className="font-bold text-sm flex items-center gap-1">
                    <span>{selectedVideo.merchantName}</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </h4>
                  <p className="text-[11px] text-slate-300">{selectedVideo.merchantCity}</p>
                </div>
              </div>

              <div className="bg-amber-500 text-white px-3 py-1 rounded-xl text-xs font-bold inline-block">
                {selectedVideo.offerText}
              </div>

              <h3 className="text-base font-bold leading-snug">{selectedVideo.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedVideo.description}</p>

              <div className="pt-2 flex gap-2">
                <Link
                  href="/blog"
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold text-center shadow-lg transition-colors"
                >
                  Watch in Fullscreen Feed
                </Link>
                <Link
                  href="/services"
                  className="px-4 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-xl text-xs font-bold transition-colors"
                >
                  View Store
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MERCHANT VIDEO UPLOAD MODAL */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Upload Store Reel / Video Story</h3>
                  <p className="text-xs text-slate-500">Showcase your shop or services to customers</p>
                </div>
              </div>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {uploadSuccess ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Video Uploaded Successfully!</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Your promotional reel has been submitted for instant automated quality check. It will be live on the Needora Blog feed in a few minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Video Story Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Master Chef Making Royal Hyderabadi Dum Biryani!"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Business Category *</label>
                    <select
                      value={uploadCategory}
                      onChange={(e) => setUploadCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium"
                    >
                      <option>Food & Dining</option>
                      <option>Home Services</option>
                      <option>Home Decor</option>
                      <option>Beauty & Spa</option>
                      <option>Real Estate</option>
                      <option>Shopping</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Discount Tag (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. FLAT 25% OFF"
                      value={uploadOffer}
                      onChange={(e) => setUploadOffer(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                    />
                  </div>
                </div>

                {/* Video File Picker Simulation */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Video File (MP4, MOV up to 60s)</label>
                  <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-6 text-center cursor-pointer bg-slate-50/50 hover:bg-blue-50/30 transition-all">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setFileName(e.target.files[0].name);
                        }
                      }}
                      className="hidden"
                      id="video-file-input"
                    />
                    <label htmlFor="video-file-input" className="cursor-pointer flex flex-col items-center">
                      <Upload className="w-8 h-8 text-blue-600 mb-2" />
                      <span className="text-xs font-bold text-slate-800">
                        {fileName ? `Selected: ${fileName}` : 'Click to Browse Video from Device'}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1">Recommended ratio: 9:16 vertical (Reels format)</span>
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Publish Video Reel to Needora Blog Feed</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
