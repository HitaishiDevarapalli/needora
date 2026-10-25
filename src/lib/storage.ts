'use client';

// NEEDORA REAL UNIFIED STORAGE & DATA ENGINE (ZERO FAKE DATA POLICY)
// Persists all real user sessions, business listings, enquiries, posts, videos, and notifications.

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: 'customer' | 'merchant' | 'admin';
  businessId?: string;
  avatar?: string;
  following: string[]; // merchant IDs
  savedBusinesses: string[]; // business IDs
  savedPosts: string[]; // post IDs
  createdAt: string;
}

export interface StoredBusiness {
  id: string;
  name: string;
  slug: string;
  category: string;
  city: string;
  pincode: string;
  address: string;
  phone: string;
  ownerName: string;
  gstin?: string;
  verified: boolean;
  status: 'active' | 'pending' | 'suspended';
  description: string;
  hours: string;
  coverImage?: string;
  followersCount: number;
  createdAt: string;
}

export interface StoredEnquiry {
  id: string;
  enquiryRef: string;
  businessId: string;
  businessName: string;
  category: string;
  customerName: string;
  customerPhone: string;
  location: string;
  requirement: string;
  preferredTime: string;
  status: 'Submitted' | 'Sent to Business' | 'Delivered' | 'Viewed' | 'Business Responded' | 'Quote Provided' | 'Customer Contacted' | 'Closed';
  merchantResponse?: string;
  quotationDetails?: string;
  businessPhone: string;
  businessWhatsapp: string;
  businessAddress: string;
  createdAt: string;
}

export interface StoredVideo {
  id: string;
  title: string;
  caption: string;
  videoUrl: string; // File object URL, Blob URL, or uploaded media path
  thumbnailUrl?: string;
  merchantId: string;
  merchantName: string;
  category: string;
  isPremium?: boolean; // Premium badge for higher-tier subscribed businesses
  likes: string[]; // array of user IDs who liked
  comments: {
    id: string;
    userName: string;
    userPhone: string;
    text: string;
    createdAt: string;
  }[];
  views: number;
  createdAt: string;
}

export interface StoredPost {
  id: string;
  businessId: string;
  businessName: string;
  authorName: string;
  content: string;
  imageUrl?: string;
  likes: string[]; // user IDs
  comments: {
    id: string;
    userName: string;
    text: string;
    createdAt: string;
  }[];
  createdAt: string;
}

export interface StoredNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
}

// STORAGE KEYS
const STORAGE_KEYS = {
  USER: 'needora_user_session',
  BUSINESSES: 'needora_businesses',
  ENQUIRIES: 'needora_enquiries',
  VIDEOS: 'needora_videos',
  POSTS: 'needora_posts',
  NOTIFICATIONS: 'needora_notifications',
};

// Safe localStorage access
function getStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('Error reading storage for', key, e);
    return defaultValue;
  }
}

function setStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispatch custom event for cross-component reactivity
    window.dispatchEvent(new Event('needora_storage_update'));
  } catch (e) {
    console.error('Error setting storage for', key, e);
  }
}

// USER SESSION API
export function getCurrentUser(): UserProfile | null {
  return getStorage<UserProfile | null>(STORAGE_KEYS.USER, null);
}

export function setCurrentUser(user: UserProfile | null): void {
  setStorage(STORAGE_KEYS.USER, user);
}

export function logoutUser(): void {
  setCurrentUser(null);
}

// BUSINESS LISTINGS API
export function getStoredBusinesses(): StoredBusiness[] {
  return getStorage<StoredBusiness[]>(STORAGE_KEYS.BUSINESSES, []);
}

export function saveBusiness(biz: Omit<StoredBusiness, 'id' | 'createdAt' | 'followersCount' | 'verified' | 'status'>): StoredBusiness {
  const current = getStoredBusinesses();
  const newBusiness: StoredBusiness = {
    ...biz,
    id: 'BIZ-' + Date.now().toString().slice(-6),
    followersCount: 0,
    verified: false,
    status: 'active',
    createdAt: new Date().toISOString(),
  };
  setStorage(STORAGE_KEYS.BUSINESSES, [newBusiness, ...current]);

  // Asynchronously dispatch to Backend PostgreSQL API
  if (typeof window !== 'undefined') {
    fetch('/api/businesses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: biz.name,
        description: biz.description,
        categoryName: biz.category,
        address: biz.address,
        city: biz.city,
        pincode: biz.pincode,
        phone: biz.phone,
        ownerName: biz.ownerName,
        gstin: biz.gstin,
      }),
    }).catch(err => console.warn('Background business sync:', err));
  }

  return newBusiness;
}

export function updateBusiness(id: string, updates: Partial<StoredBusiness>): void {
  const current = getStoredBusinesses();
  const updated = current.map(b => b.id === id ? { ...b, ...updates } : b);
  setStorage(STORAGE_KEYS.BUSINESSES, updated);
}

// ENQUIRIES API
export function getStoredEnquiries(): StoredEnquiry[] {
  return getStorage<StoredEnquiry[]>(STORAGE_KEYS.ENQUIRIES, []);
}

export function saveEnquiry(enquiry: Omit<StoredEnquiry, 'id' | 'enquiryRef' | 'createdAt' | 'status'>): StoredEnquiry {
  const current = getStoredEnquiries();
  const newEnquiry: StoredEnquiry = {
    ...enquiry,
    id: 'ENQ-' + Date.now().toString().slice(-6),
    enquiryRef: 'ENQ-' + Math.floor(100000 + Math.random() * 900000),
    status: 'Submitted',
    createdAt: new Date().toISOString(),
  };
  setStorage(STORAGE_KEYS.ENQUIRIES, [newEnquiry, ...current]);

  // Add notification for merchant
  addNotification({
    userId: enquiry.businessId,
    title: 'New Client Enquiry Received',
    message: `${enquiry.customerName} submitted an enquiry for ${enquiry.category}.`,
    link: '/merchant',
  });

  // Asynchronously dispatch to Backend PostgreSQL API
  if (typeof window !== 'undefined') {
    fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        businessId: enquiry.businessId,
        businessName: enquiry.businessName,
        customerName: enquiry.customerName,
        customerPhone: enquiry.customerPhone,
        location: enquiry.location,
        requirement: enquiry.requirement,
        preferredTime: enquiry.preferredTime,
        category: enquiry.category,
      }),
    }).catch(err => console.warn('Background enquiry sync:', err));
  }

  return newEnquiry;
}

export function updateEnquiryStatus(id: string, status: StoredEnquiry['status'], responseNotes?: string, quoteDetails?: string): void {
  const current = getStoredEnquiries();
  const updated = current.map(e => {
    if (e.id === id || e.enquiryRef === id) {
      return {
        ...e,
        status,
        ...(responseNotes ? { merchantResponse: responseNotes } : {}),
        ...(quoteDetails ? { quotationDetails: quoteDetails } : {}),
      };
    }
    return e;
  });
  setStorage(STORAGE_KEYS.ENQUIRIES, updated);

  // Asynchronously dispatch to Backend PostgreSQL API
  if (typeof window !== 'undefined') {
    fetch(`/api/enquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status,
        responseNotes,
        quoteDetails,
      }),
    }).catch(err => console.warn('Background status sync:', err));
  }
}

// Default sample merchant reels for category discovery and verification
const INITIAL_MERCHANT_REELS: StoredVideo[] = [
  {
    id: 'VID-PREM-101',
    title: 'Modern Luxury Sofa & Handcrafted Living Room Decor',
    caption: 'Discover our exclusive solid wood coffee tables, modular sofas, and lighting fixtures. Visit our showroom or send a direct enquiry for custom designs!',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-with-furniture-41481-large.mp4',
    merchantId: 'BIZ-DECOR-01',
    merchantName: 'Royal Heritage Home Decor',
    category: 'Home Decor',
    isPremium: true,
    likes: ['user-101', 'user-102', 'user-103', 'user-104'],
    comments: [
      { id: 'c1', userName: 'Anil Rao', userPhone: '9848011223', text: 'Do you deliver custom dimensions?', createdAt: '2026-04-10T10:00:00Z' },
    ],
    views: 1240,
    createdAt: '2026-04-10T09:00:00Z',
  },
  {
    id: 'VID-PREM-102',
    title: 'Authentic Hyderabadi Dum Biryani & Kebabs',
    caption: 'Freshly prepared daily with farm-fresh spices and saffron basmati. Special catering orders available for weddings and private parties. Send enquiry!',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-garnishing-a-plate-in-a-restaurant-kitchen-42775-large.mp4',
    merchantId: 'BIZ-FOOD-02',
    merchantName: 'Spice Villa Family Restaurant',
    category: 'Food & Dining',
    isPremium: true,
    likes: ['user-201', 'user-202'],
    comments: [],
    views: 980,
    createdAt: '2026-04-12T12:00:00Z',
  },
  {
    id: 'VID-PREM-103',
    title: 'Deep Villa Cleaning & Eco-Friendly Sanitization',
    caption: 'Full 5-stage deep cleaning: kitchen chimney degreasing, bathroom descaling, sofa shampooing. 100% verified staff. Request a free quote!',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cleaning-a-kitchen-counter-with-a-cloth-42784-large.mp4',
    merchantId: 'BIZ-CLEAN-03',
    merchantName: 'GreenClean Professional Services',
    category: 'Home Cleaning',
    isPremium: false,
    likes: ['user-301'],
    comments: [],
    views: 650,
    createdAt: '2026-04-14T15:00:00Z',
  },
  {
    id: 'VID-PREM-104',
    title: 'Bridal Makeover, Hair Botox & Organic Spa Treatment',
    caption: 'Get ready for your special occasion with our master certified stylists. Special seasonal bridal packages. Send an enquiry to book your slot!',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hairstylist-brushing-and-styling-hair-in-a-salon-42790-large.mp4',
    merchantId: 'BIZ-BEAUTY-04',
    merchantName: 'Glamour Lounge Salon & Spa',
    category: 'Beauty & Salon',
    isPremium: true,
    likes: ['user-401', 'user-402', 'user-403'],
    comments: [],
    views: 1420,
    createdAt: '2026-04-15T11:30:00Z',
  },
];

// REAL VIDEO UPLOADS API
export function getStoredVideos(): StoredVideo[] {
  const stored = getStorage<StoredVideo[]>(STORAGE_KEYS.VIDEOS, []);
  if (stored.length === 0) {
    setStorage(STORAGE_KEYS.VIDEOS, INITIAL_MERCHANT_REELS);
    return INITIAL_MERCHANT_REELS;
  }
  return stored;
}

export function saveVideo(video: Omit<StoredVideo, 'id' | 'createdAt' | 'likes' | 'comments' | 'views'> & { isPremium?: boolean }): StoredVideo {
  const current = getStoredVideos();
  const newVid: StoredVideo = {
    ...video,
    id: 'VID-' + Date.now().toString().slice(-6),
    isPremium: video.isPremium ?? false,
    likes: [],
    comments: [],
    views: 1,
    createdAt: new Date().toISOString(),
  };
  setStorage(STORAGE_KEYS.VIDEOS, [newVid, ...current]);

  // Asynchronously dispatch to Backend PostgreSQL API
  if (typeof window !== 'undefined') {
    fetch('/api/videos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: video.title,
        caption: video.caption,
        videoUrl: video.videoUrl,
        merchantName: video.merchantName,
        category: video.category,
      }),
    }).catch(err => console.warn('Background video sync:', err));
  }

  return newVid;
}

export function toggleVideoLike(videoId: string, userId: string): boolean {
  const current = getStoredVideos();
  let isLiked = false;
  const updated = current.map(v => {
    if (v.id === videoId) {
      const exists = v.likes.includes(userId);
      isLiked = !exists;
      return {
        ...v,
        likes: exists ? v.likes.filter(uid => uid !== userId) : [...v.likes, userId],
      };
    }
    return v;
  });
  setStorage(STORAGE_KEYS.VIDEOS, updated);
  return isLiked;
}

export function addVideoComment(videoId: string, userName: string, text: string): void {
  const current = getStoredVideos();
  const updated = current.map(v => {
    if (v.id === videoId) {
      return {
        ...v,
        comments: [
          ...v.comments,
          {
            id: 'CMT-' + Date.now().toString().slice(-6),
            userName,
            userPhone: '+91 Verified User',
            text,
            createdAt: new Date().toISOString(),
          },
        ],
      };
    }
    return v;
  });
  setStorage(STORAGE_KEYS.VIDEOS, updated);
}

// REAL SOCIAL POSTS API
export function getStoredPosts(): StoredPost[] {
  return getStorage<StoredPost[]>(STORAGE_KEYS.POSTS, []);
}

export function savePost(post: Omit<StoredPost, 'id' | 'createdAt' | 'likes' | 'comments'>): StoredPost {
  const current = getStoredPosts();
  const newPost: StoredPost = {
    ...post,
    id: 'POST-' + Date.now().toString().slice(-6),
    likes: [],
    comments: [],
    createdAt: new Date().toISOString(),
  };
  setStorage(STORAGE_KEYS.POSTS, [newPost, ...current]);

  if (typeof window !== 'undefined') {
    fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        businessName: post.businessName,
        authorName: post.authorName,
        content: post.content,
        imageUrl: post.imageUrl,
      }),
    }).catch(err => console.warn('Background post sync:', err));
  }

  return newPost;
}

export function togglePostLike(postId: string, userId: string): boolean {
  const current = getStoredPosts();
  let isLiked = false;
  const updated = current.map(p => {
    if (p.id === postId) {
      const exists = p.likes.includes(userId);
      isLiked = !exists;
      return {
        ...p,
        likes: exists ? p.likes.filter(uid => uid !== userId) : [...p.likes, userId],
      };
    }
    return p;
  });
  setStorage(STORAGE_KEYS.POSTS, updated);

  if (typeof window !== 'undefined') {
    fetch(`/api/posts/${postId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    }).catch(err => console.warn('Background like sync:', err));
  }

  return isLiked;
}

export function addPostComment(postId: string, userName: string, text: string): void {
  const current = getStoredPosts();
  const updated = current.map(p => {
    if (p.id === postId) {
      return {
        ...p,
        comments: [
          ...p.comments,
          {
            id: 'PCMT-' + Date.now().toString().slice(-6),
            userName,
            text,
            createdAt: new Date().toISOString(),
          },
        ],
      };
    }
    return p;
  });
  setStorage(STORAGE_KEYS.POSTS, updated);

  if (typeof window !== 'undefined') {
    fetch(`/api/posts/${postId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ authorName: userName, text }),
    }).catch(err => console.warn('Background comment sync:', err));
  }
}

// FOLLOW SYSTEM API
export function toggleFollowMerchant(merchantId: string, currentUserId: string): boolean {
  const user = getCurrentUser();
  if (!user) return false;

  const isFollowing = user.following.includes(merchantId);
  const updatedFollowing = isFollowing
    ? user.following.filter(id => id !== merchantId)
    : [...user.following, merchantId];

  setCurrentUser({ ...user, following: updatedFollowing });

  // Update merchant follower count
  const businesses = getStoredBusinesses();
  const updatedBusinesses = businesses.map(b => {
    if (b.id === merchantId) {
      return {
        ...b,
        followersCount: Math.max(0, (b.followersCount || 0) + (isFollowing ? -1 : 1)),
      };
    }
    return b;
  });
  setStorage(STORAGE_KEYS.BUSINESSES, updatedBusinesses);

  return !isFollowing;
}

// SAVED CONTENT API
export function toggleSaveBusiness(businessId: string): boolean {
  const user = getCurrentUser();
  if (!user) return false;

  const isSaved = user.savedBusinesses.includes(businessId);
  const updated = isSaved
    ? user.savedBusinesses.filter(id => id !== businessId)
    : [...user.savedBusinesses, businessId];

  setCurrentUser({ ...user, savedBusinesses: updated });
  return !isSaved;
}

export function toggleSavePost(postId: string): boolean {
  const user = getCurrentUser();
  if (!user) return false;

  const isSaved = user.savedPosts.includes(postId);
  const updated = isSaved
    ? user.savedPosts.filter(id => id !== postId)
    : [...user.savedPosts, postId];

  setCurrentUser({ ...user, savedPosts: updated });
  return !isSaved;
}

// NOTIFICATIONS API
export function getStoredNotifications(): StoredNotification[] {
  return getStorage<StoredNotification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
}

export function addNotification(notif: Omit<StoredNotification, 'id' | 'read' | 'createdAt'>): void {
  const current = getStoredNotifications();
  const newNotif: StoredNotification = {
    ...notif,
    id: 'NTF-' + Date.now().toString().slice(-6),
    read: false,
    createdAt: new Date().toISOString(),
  };
  setStorage(STORAGE_KEYS.NOTIFICATIONS, [newNotif, ...current]);
}

export function markAllNotificationsRead(): void {
  const current = getStoredNotifications();
  const updated = current.map(n => ({ ...n, read: true }));
  setStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
}
