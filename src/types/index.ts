export type UserRole = 'customer' | 'merchant' | 'admin';

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  iconName?: string;
  itemCount: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  color: string;
  bgColor: string;
  count?: string;
  description?: string;
  subcategories?: SubCategory[];
}

export interface MerchantListing {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  subCategorySlug: string;
  rating: number;
  ratingCount: number;
  tag?: 'Trending' | 'Popular' | 'Top Rated' | 'Quick Response';
  location: string;
  city: string;
  address: string;
  phone: string;
  displayPhone: string;
  whatsapp: string;
  image: string;
  services: string[];
  callPickUpRate?: string;
  verified: boolean;
  yearsInBusiness?: number;
  propertyType?: 'Residential' | 'Commercial' | 'Both';
  priceRange?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  image: string;
  rating: number;
  reviewCount: string;
  priceStart: number;
  duration?: string;
  providerName: string;
  badge?: string;
  description?: string;
  features?: string[];
  packages?: {
    id: string;
    name: string;
    price: number;
    description: string;
    popular?: boolean;
  }[];
  faqs?: {
    q: string;
    a: string;
  }[];
}

export interface FeaturedItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  linkText: string;
  badgeIcon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  avatar: string;
  rating: number;
  text: string;
  serviceUsed: string;
}

export interface Merchant {
  id: string;
  businessName: string;
  category: string;
  ownerName: string;
  phone: string;
  email: string;
  city: string;
  pincode: string;
  address: string;
  status: 'verified' | 'pending' | 'rejected' | 'suspended';
  badgeLevel: 'Bronze' | 'Silver' | 'Gold';
  rating: number;
  totalOrders: number;
  joinedDate: string;
  documents: {
    gstin?: string;
    fssai?: string;
    tradeLicense?: string;
  };
}

export interface CartProduct {
  id: string;
  merchantId: string;
  merchantName: string;
  title: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  unit: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  merchantId: string;
  merchantName: string;
  items: {
    title: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  paymentMethod: 'UPI' | 'Card' | 'Cash on Delivery';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  status: 'Placed' | 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  date: string;
  slot: string;
  trackingStep: number;
}

export interface VerificationRequest {
  id: string;
  merchantId: string;
  businessName: string;
  legalEntityName: string;
  category: string;
  ownerName: string;
  phone: string;
  address: string;
  pincode: string;
  gstin: string;
  fssaiNumber?: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  riskScore: 'Low' | 'Medium' | 'High';
  duplicateMatchFound: boolean;
  duplicateNotes?: string;
}

export interface ComplaintTicket {
  id: string;
  ticketNumber: string;
  customerName: string;
  customerPhone: string;
  orderNumber: string;
  merchantName: string;
  category: string;
  issue: string;
  status: 'Open' | 'Under Investigation' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High';
  date: string;
  resolution?: string;
}

export interface BlogReel {
  id: string;
  title: string;
  merchantName: string;
  merchantCity: string;
  category: string;
  thumbnail: string;
  offerText: string;
  likes: number;
  commentsCount: number;
  sharesCount: number;
  tags: string[];
  description: string;
  musicTrack: string;
  duration: string;
  verified: boolean;
}
