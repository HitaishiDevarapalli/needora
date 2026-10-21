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
}

// REAL VIDEO UPLOADS API
export function getStoredVideos(): StoredVideo[] {
  return getStorage<StoredVideo[]>(STORAGE_KEYS.VIDEOS, []);
}

export function saveVideo(video: Omit<StoredVideo, 'id' | 'createdAt' | 'likes' | 'comments' | 'views'>): StoredVideo {
  const current = getStoredVideos();
  const newVid: StoredVideo = {
    ...video,
    id: 'VID-' + Date.now().toString().slice(-6),
    likes: [],
    comments: [],
    views: 1,
    createdAt: new Date().toISOString(),
  };
  setStorage(STORAGE_KEYS.VIDEOS, [newVid, ...current]);
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
