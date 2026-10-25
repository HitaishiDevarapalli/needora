// NEEDORA TYPED BACKEND API CLIENT
// Connects frontend user actions to backend PostgreSQL REST APIs

export interface ApiResponse<T = any> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
}

const API_BASE = '/api';

async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('needora_auth_token') : null;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options?.headers || {}),
  };

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `API request failed with status ${res.status}`);
  }
  return data as T;
}

// 1. Auth API
export const authApi = {
  register: (payload: { name: string; email: string; phone?: string; password: string; role?: string }) =>
    fetcher('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload: { email: string; password: string }) =>
    fetcher('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  logout: () =>
    fetcher('/auth/logout', { method: 'POST' }),
  me: () =>
    fetcher('/auth/me'),
};

// 2. Business Directory API
export const businessApi = {
  list: (params?: { q?: string; category?: string; city?: string; verified?: boolean; page?: number }) => {
    const sp = new URLSearchParams();
    if (params?.q) sp.append('q', params.q);
    if (params?.category) sp.append('category', params.category);
    if (params?.city) sp.append('city', params.city);
    if (params?.verified) sp.append('verified', 'true');
    if (params?.page) sp.append('page', params.page.toString());
    return fetcher(`/businesses?${sp.toString()}`);
  },
  getById: (id: string) =>
    fetcher(`/businesses/${id}`),
  create: (payload: {
    name: string;
    description?: string;
    categoryName?: string;
    address?: string;
    city?: string;
    pincode?: string;
    phone: string;
    ownerEmail?: string;
    ownerName?: string;
    gstin?: string;
  }) =>
    fetcher('/businesses', { method: 'POST', body: JSON.stringify(payload) }),
};

// 3. Enquiry & Lead API (100% Free Model, Zero Payments)
export const enquiryApi = {
  list: (params?: { businessId?: string; customerId?: string; status?: string }) => {
    const sp = new URLSearchParams();
    if (params?.businessId) sp.append('businessId', params.businessId);
    if (params?.customerId) sp.append('customerId', params.customerId);
    if (params?.status) sp.append('status', params.status);
    return fetcher(`/enquiries?${sp.toString()}`);
  },
  submit: (payload: {
    businessId?: string;
    businessName: string;
    customerName: string;
    customerPhone: string;
    location?: string;
    requirement: string;
    preferredTime?: string;
    category?: string;
  }) =>
    fetcher('/enquiries', { method: 'POST', body: JSON.stringify(payload) }),
  updateStatus: (id: string, payload: { status?: string; responseNotes?: string; quoteAmount?: number; quoteDetails?: string }) =>
    fetcher(`/enquiries/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
};

// 4. Posts & Community Feed API
export const postApi = {
  list: (page = 1) =>
    fetcher(`/posts?page=${page}`),
  create: (payload: { businessName?: string; authorName?: string; content: string; imageUrl?: string }) =>
    fetcher('/posts', { method: 'POST', body: JSON.stringify(payload) }),
  toggleLike: (postId: string, userId?: string) =>
    fetcher(`/posts/${postId}/like`, { method: 'POST', body: JSON.stringify({ userId }) }),
  addComment: (postId: string, payload: { text: string; authorName?: string }) =>
    fetcher(`/posts/${postId}/comments`, { method: 'POST', body: JSON.stringify(payload) }),
};

// 5. Video Reels API
export const videoApi = {
  list: () =>
    fetcher('/videos'),
  upload: (payload: { title: string; caption?: string; videoUrl: string; merchantName?: string; category?: string }) =>
    fetcher('/videos', { method: 'POST', body: JSON.stringify(payload) }),
};

// 6. Media Asset Upload API
export const mediaApi = {
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('mediaType', file.type.startsWith('video/') ? 'video' : 'image');

    const res = await fetch(`${API_BASE}/media/upload`, {
      method: 'POST',
      body: formData,
    });
    return res.json();
  },
};

// 7. Dora AI Assistant API
export const doraApi = {
  chat: (payload: { message: string; conversationId?: string; userId?: string }) =>
    fetcher('/dora/chat', { method: 'POST', body: JSON.stringify(payload) }),
};

// 8. Notifications API
export const notificationApi = {
  list: (userId?: string) =>
    fetcher(`/notifications${userId ? `?userId=${userId}` : ''}`),
  markRead: (notificationId?: string) =>
    fetcher('/notifications', { method: 'PATCH', body: JSON.stringify({ notificationId }) }),
};

// 9. Health & Database Check
export const healthApi = {
  check: () => fetcher('/health'),
};
