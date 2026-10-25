'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Play, 
  Upload, 
  Eye, 
  Heart, 
  ArrowRight, 
  X, 
  CheckCircle, 
  Video, 
  PlusCircle,
  AlertCircle,
  Sparkles,
  Store
} from 'lucide-react';
import { 
  getStoredVideos, 
  saveVideo, 
  toggleVideoLike, 
  getCurrentUser, 
  StoredVideo 
} from '@/lib/storage';

export default function VideoReelsSection() {
  const [videos, setVideos] = useState<StoredVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<StoredVideo | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadMerchantName, setUploadMerchantName] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Food & Dining');
  const [uploadCaption, setUploadCaption] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

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
    setVideos(getStoredVideos());
    setCurrentUser(getCurrentUser());
  };

  useEffect(() => {
    loadVideos();
    window.addEventListener('needora_storage_update', loadVideos);
    return () => window.removeEventListener('needora_storage_update', loadVideos);
  }, []);

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setUploadError('Please select a valid video file.');
      return;
    }

    setUploadError('');
    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoPreviewUrl(url);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim() || !uploadMerchantName.trim() || !videoPreviewUrl) {
      setUploadError('Please provide a title, merchant name, and video file.');
      return;
    }

    saveVideo({
      title: uploadTitle.trim(),
      caption: uploadCaption.trim(),
      videoUrl: videoPreviewUrl,
      merchantId: currentUser?.businessId || 'BIZ-GUEST',
      merchantName: uploadMerchantName.trim(),
      category: uploadCategory,
    });

    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setUploadModalOpen(false);
      setUploadTitle('');
      setUploadMerchantName('');
      setUploadCaption('');
      setVideoFile(null);
      setVideoPreviewUrl(null);
      loadVideos();
    }, 1500);
  };

  const handleLike = (e: React.MouseEvent, vidId: string) => {
    e.stopPropagation();
    const uid = currentUser?.id || 'guest_user';
    toggleVideoLike(vidId, uid);
    loadVideos();
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white via-slate-50 to-white border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>Real Merchant Stories • Hyperlocal Video Reels</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Featured Video Stories & Merchant Reels
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-2xl leading-relaxed">
              Watch authentic video walkthroughs, work showcases, and offers published directly by verified local neighborhood businesses.
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
              href="/videos"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs shadow-md transition-all group"
            >
              <span>Watch Reels Feed</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Category-Wise Filter Tabs (Requirement 1) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {REEL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video Cards Grid or Empty State */}
        {(() => {
          const displayedVideos = selectedCategory === 'All' 
            ? videos 
            : videos.filter(v => v.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(v.category.toLowerCase()));

          if (displayedVideos.length === 0) {
            return (
              <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-10 text-center max-w-lg mx-auto shadow-xs">
                <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
                  <Video className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">No {selectedCategory !== 'All' ? selectedCategory : ''} reels yet</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Local store owners can showcase their craft, store walkthroughs, or daily offers in {selectedCategory}. Zero fake videos.
                </p>
                <div className="mt-5 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setUploadCategory(selectedCategory === 'All' ? 'Food & Dining' : selectedCategory);
                      setUploadModalOpen(true);
                    }}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Upload First Reel</span>
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {displayedVideos.map((vid) => {
                const isLiked = vid.likes.includes(currentUser?.id || 'guest_user');
                return (
                  <div
                    key={vid.id}
                    onClick={() => setSelectedVideo(vid)}
                    className="group relative h-[380px] sm:h-[400px] rounded-3xl overflow-hidden bg-slate-950 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between p-4"
                  >
                    <video
                      src={vid.videoUrl}
                      className="absolute inset-0 w-full h-full object-cover"
                      muted
                      playsInline
                    />

                    {/* Gradient Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30 group-hover:via-slate-950/20 transition-all pointer-events-none" />

                    {/* Top Details with Premium Tag */}
                    <div className="relative z-10 flex items-center justify-between text-white text-[11px] font-bold">
                      {vid.isPremium ? (
                        <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-amber-300">
                          <Sparkles className="w-3 h-3 text-slate-950 fill-current" />
                          <span>PREMIUM</span>
                        </span>
                      ) : (
                        <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1">
                          <Eye className="w-3 h-3 text-slate-300" />
                          <span>{vid.views} views</span>
                        </span>
                      )}

                      <span className="bg-blue-600/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px]">
                        {vid.category}
                      </span>
                    </div>

                    {/* Center Play Button */}
                    <div className="relative z-10 flex items-center justify-center my-auto pointer-events-none">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-blue-600 text-white flex items-center justify-center transition-all duration-300 shadow-xl group-hover:scale-110 border border-white/40">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Bottom Details Overlay */}
                    <div className="relative z-10 space-y-2 text-white">
                      <h3 className="text-xs font-bold line-clamp-2 leading-snug group-hover:text-blue-300 transition-colors">
                        {vid.title}
                      </h3>

                      <div className="flex items-center justify-between pt-1 border-t border-white/15 text-[11px] text-slate-300">
                        <span className="truncate max-w-[130px] font-medium">{vid.merchantName}</span>

                        <button
                          type="button"
                          onClick={(e) => handleLike(e, vid.id)}
                          className={`flex items-center gap-1 font-bold ${
                            isLiked ? 'text-rose-500' : 'text-slate-300 hover:text-rose-400'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                          <span className="text-[10px]">{vid.likes.length}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}

      </div>

      {/* POPUP VIDEO PLAYER MODAL */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedVideo(null);
            }
          }}
        >
          <div 
            className="relative w-full max-w-sm sm:max-w-md h-[85vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col justify-end animate-in zoom-in-95 duration-200 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={selectedVideo.videoUrl}
              className="absolute inset-0 w-full h-full object-cover"
              controls
              autoPlay
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40 pointer-events-none" />

            <button
              type="button"
              aria-label="Close video player"
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative z-10 p-5 space-y-3 text-white bg-gradient-to-t from-black via-black/80 to-transparent">
              <div className="flex items-center gap-2 flex-wrap">
                {selectedVideo.isPremium && (
                  <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-amber-300">
                    <Sparkles className="w-3 h-3 text-slate-950 fill-current" />
                    <span>PREMIUM</span>
                  </span>
                )}
                <span className="text-xs font-bold bg-blue-600 px-2.5 py-0.5 rounded-md">
                  {selectedVideo.merchantName}
                </span>
                <span className="text-[10px] text-slate-300 bg-white/10 px-2 py-0.5 rounded-md">
                  {selectedVideo.category}
                </span>
              </div>

              <h3 className="text-base font-bold leading-snug">{selectedVideo.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedVideo.caption}</p>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <Link
                  href={`/services?category=${encodeURIComponent(selectedVideo.category)}`}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold text-center shadow-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Send Free Enquiry to Merchant</span>
                </Link>
                <Link
                  href="/videos"
                  className="py-3 px-4 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold text-center transition-colors"
                >
                  Full Reels Feed
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MERCHANT VIDEO UPLOAD MODAL */}
      {uploadModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs cursor-pointer"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setUploadModalOpen(false);
            }
          }}
        >
          <div 
            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
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
                type="button"
                aria-label="Close upload modal"
                onClick={() => setUploadModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer hover:bg-slate-200/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {uploadSuccess ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                  <CheckCircle className="w-8 h-8 animate-bounce" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Video Uploaded Successfully!</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Your video is live on Needora Video Reels!
                </p>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
                {uploadError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Business / Shop Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Sweets & Bakery"
                    value={uploadMerchantName}
                    onChange={(e) => setUploadMerchantName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Video Story Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fresh Morning Sweets Preparation"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Caption</label>
                  <input
                    type="text"
                    placeholder="Describe your showcase or offer..."
                    value={uploadCaption}
                    onChange={(e) => setUploadCaption(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                  />
                </div>

                {/* Video File Picker */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Video File *</label>
                  <label className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-6 text-center cursor-pointer bg-slate-50/50 hover:bg-blue-50/30 transition-all flex flex-col items-center">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoSelect}
                      className="hidden"
                    />
                    <Upload className="w-8 h-8 text-blue-600 mb-2" />
                    <span className="text-xs font-bold text-slate-800">
                      {videoFile ? `Selected: ${videoFile.name}` : 'Click to Browse Video from Device'}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1">MP4, WebM (Reels format 9:16 recommended)</span>
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Publish Video Reel</span>
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
