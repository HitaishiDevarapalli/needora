import { Category, ServiceItem, FeaturedItem, Testimonial, Merchant, Order, VerificationRequest, ComplaintTicket } from '@/types';

export const CATEGORIES: Category[] = [
  {
    id: 'food-dining',
    name: 'Food & Dining',
    slug: 'food-dining',
    iconName: 'Utensils',
    bgColor: '#FFF3EB',
    color: '#EA580C',
    count: '3,420+ Outlets',
    description: 'Fine dining, cloud kitchens, regional thalis, and bakeries.'
  },
  {
    id: 'shopping',
    name: 'Shopping',
    slug: 'shopping',
    iconName: 'ShoppingBag',
    bgColor: '#F3E8FF',
    color: '#9333EA',
    count: '4,100+ Stores',
    description: 'Apparel, footwear, electronics, groceries, and artisanal goods.'
  },
  {
    id: 'home-services',
    name: 'Home Services',
    slug: 'home-services',
    iconName: 'Home',
    bgColor: '#E0F2FE',
    color: '#0284C7',
    count: '1,890+ Pros',
    description: 'Deep cleaning, plumbing, electricians, painting, and appliance repair.'
  },
  {
    id: 'beauty-wellness',
    name: 'Beauty & Wellness',
    slug: 'beauty-wellness',
    iconName: 'Flower2',
    bgColor: '#FCE7F3',
    color: '#DB2777',
    count: '1,250+ Salons',
    description: 'Hair styling, Ayurvedic spas, skin therapy, and bridal studios.'
  },
  {
    id: 'education',
    name: 'Education',
    slug: 'education',
    iconName: 'GraduationCap',
    bgColor: '#DCFCE7',
    color: '#16A34A',
    count: '980+ Institutes',
    description: 'Home tutors, coaching academies, music teachers, and test prep.'
  },
  {
    id: 'travel-tourism',
    name: 'Travel & Tourism',
    slug: 'travel-tourism',
    iconName: 'Plane',
    bgColor: '#E0F7FA',
    color: '#0891B2',
    count: '740+ Agencies',
    description: 'Airport cabs, intercity rentals, holiday packages, and tour guides.'
  },
  {
    id: 'health-fitness',
    name: 'Health & Fitness',
    slug: 'health-fitness',
    iconName: 'Heart',
    bgColor: '#FFE4E6',
    color: '#E11D48',
    count: '1,120+ Centers',
    description: 'Clinics, diagnostic labs, yoga studios, gyms, and physiotherapists.'
  },
  {
    id: 'finance',
    name: 'Finance',
    slug: 'finance',
    iconName: 'Wallet',
    bgColor: '#FEF3C7',
    color: '#D97706',
    count: '430+ Advisors',
    description: 'Chartered accountants, tax consultants, GST filing, and mutual fund agents.'
  },
  {
    id: 'automotive',
    name: 'Automotive',
    slug: 'automotive',
    iconName: 'Car',
    bgColor: '#F3E8FF',
    color: '#7C3AED',
    count: '860+ Garages',
    description: 'Car wash, multi-brand service centers, tire care, and towing.'
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    slug: 'real-estate',
    iconName: 'Building',
    bgColor: '#ECFDF5',
    color: '#059669',
    count: '620+ Agencies',
    description: 'Rental flats, commercial spaces, land plots, and verified brokers.'
  },
  {
    id: 'jobs-careers',
    name: 'Jobs & Careers',
    slug: 'jobs-careers',
    iconName: 'Briefcase',
    bgColor: '#EFF6FF',
    color: '#2563EB',
    count: '510+ Firms',
    description: 'Local hiring, blue-collar staffing, recruitment, and career coaching.'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    slug: 'entertainment',
    iconName: 'Play',
    bgColor: '#F5F3FF',
    color: '#6D28D9',
    count: '390+ Venues',
    description: 'Event organizers, sound & light rentals, turf sports, and bowling.'
  }
];

export const POPULAR_SERVICES: ServiceItem[] = [
  {
    id: 'serv-1',
    title: 'Food Delivery',
    category: 'Food & Dining',
    tagline: 'Order from your favorite restaurants',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    rating: 4.6,
    reviewCount: '2.5M+',
    priceStart: 149,
    duration: '25-35 mins',
    providerName: 'Over 2,400 neighborhood restaurants',
    badge: 'Popular'
  },
  {
    id: 'serv-2',
    title: 'Grocery Delivery',
    category: 'Shopping',
    tagline: 'Fresh groceries at your doorstep',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
    rating: 4.5,
    reviewCount: '1.8M+',
    priceStart: 99,
    duration: '15-30 mins',
    providerName: 'Direct from verified farm marts',
    badge: 'Daily Fresh'
  },
  {
    id: 'serv-3',
    title: 'Home Cleaning',
    category: 'Home Services',
    tagline: 'Professional & trusted cleaning services',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewCount: '1.2M+',
    priceStart: 499,
    duration: '2-4 hours',
    providerName: 'Police-verified cleaning partners',
    badge: 'Best Seller'
  },
  {
    id: 'serv-4',
    title: 'Beauty & Salon',
    category: 'Beauty & Wellness',
    tagline: 'Look good, feel great',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=80',
    rating: 4.6,
    reviewCount: '980K+',
    priceStart: 349,
    duration: '45-90 mins',
    providerName: 'Certified estheticians & stylists',
    badge: 'Top Rated'
  },
  {
    id: 'serv-5',
    title: 'Tuition & Learning',
    category: 'Education',
    tagline: 'Learn from expert tutors',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=80',
    rating: 4.5,
    reviewCount: '760K+',
    priceStart: 600,
    duration: 'Per month',
    providerName: 'CBSE, ICSE & State Board tutors',
    badge: 'Verified'
  }
];

export const FEATURED_ITEMS: FeaturedItem[] = [
  {
    id: 'feat-1',
    title: 'Top 10 Food Delivery Apps',
    description: 'Best food apps for quick & tasty meals',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
    category: 'Food & Dining',
    linkText: 'Explore Food Partners',
    badgeIcon: 'Utensils'
  },
  {
    id: 'feat-2',
    title: 'Best Home Service Providers',
    description: 'Trusted professionals near you',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80',
    category: 'Home Services',
    linkText: 'Book Certified Pros',
    badgeIcon: 'Home'
  },
  {
    id: 'feat-3',
    title: 'Top Online Shopping Deals',
    description: 'Save more with exclusive offers',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&auto=format&fit=crop&q=80',
    category: 'Shopping',
    linkText: 'View Today Deals',
    badgeIcon: 'ShoppingBag'
  },
  {
    id: 'feat-4',
    title: 'Best Beauty & Wellness Services',
    description: 'Feel your best, always',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
    category: 'Beauty & Wellness',
    linkText: 'Find Salons Near You',
    badgeIcon: 'Flower2'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Priya Sharma',
    role: 'Resident, Indiranagar',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    text: 'Needora made my life so much easier! Found a great home cleaning service in minutes. Super reliable!',
    serviceUsed: 'Deep Home Cleaning'
  },
  {
    id: 't-2',
    name: 'Rahul Mehta',
    role: 'Software Engineer, Hitec City',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    text: 'Love the variety of services and the seamless booking process. Highly recommend!',
    serviceUsed: 'AC Repair & Servicing'
  },
  {
    id: 't-3',
    name: 'Sneha Reddy',
    role: 'Architect, Jubilee Hills',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    text: 'Great platform with trusted providers. I use it for everything — from food to shopping!',
    serviceUsed: 'Organic Grocery Delivery'
  }
];

export const STATS = [
  { value: '500K+', label: 'Active Users', icon: 'Users' },
  { value: '10K+', label: 'Service Providers', icon: 'Store' },
  { value: '50+', label: 'Categories', icon: 'Grid' },
  { value: '4.8 ★', label: 'Average Rating', icon: 'Star' },
];

export const MOCK_MERCHANTS: Merchant[] = [
  {
    id: 'm-101',
    businessName: 'Sri Balaji Sweets & Traditional Savories',
    category: 'Food & Dining',
    ownerName: 'Venkat Rao',
    phone: '+91 98490 12345',
    email: 'contact@sribalajisweets.in',
    city: 'Hyderabad',
    pincode: '500034',
    address: 'Shop 12, Road No 10, Banjara Hills',
    status: 'verified',
    badgeLevel: 'Gold',
    rating: 4.9,
    totalOrders: 1420,
    joinedDate: '12 Jan 2024',
    documents: {
      gstin: '36AABCS1429B1Z8',
      fssai: '13622011000452',
      tradeLicense: 'GHMC/TL/2023/8821'
    }
  },
  {
    id: 'm-102',
    businessName: 'CleanPro Hygiene Solutions',
    category: 'Home Services',
    ownerName: 'Manish Verma',
    phone: '+91 99887 65432',
    email: 'help@cleanprohyd.com',
    city: 'Hyderabad',
    pincode: '500081',
    address: 'Plot 44, Cyber Hills, Madhapur',
    status: 'verified',
    badgeLevel: 'Gold',
    rating: 4.8,
    totalOrders: 890,
    joinedDate: '04 Mar 2024',
    documents: {
      gstin: '36AAHCP4491D1Z2',
      tradeLicense: 'GHMC/TL/2024/1109'
    }
  },
  {
    id: 'm-103',
    businessName: 'Green Harvest Organics',
    category: 'Shopping',
    ownerName: 'Ananya Deshmukh',
    phone: '+91 97654 32109',
    email: 'support@greenharvest.co',
    city: 'Hyderabad',
    pincode: '500033',
    address: 'Lane 4, Jubilee Hills Checkpost',
    status: 'verified',
    badgeLevel: 'Silver',
    rating: 4.7,
    totalOrders: 650,
    joinedDate: '18 Apr 2024',
    documents: {
      gstin: '36BBCDE7712M1Z0',
      fssai: '13623011000998'
    }
  },
  {
    id: 'm-104',
    businessName: 'Royal Auto Garage & Detailing',
    category: 'Automotive',
    ownerName: 'Mohd. Farooq',
    phone: '+91 91234 56789',
    email: 'farooq@royalautogarage.com',
    city: 'Hyderabad',
    pincode: '500008',
    address: 'Near Pillar 140, Mehdipatnam',
    status: 'pending',
    badgeLevel: 'Bronze',
    rating: 4.6,
    totalOrders: 110,
    joinedDate: '10 Oct 2024',
    documents: {
      tradeLicense: 'GHMC/TL/2024/9934'
    }
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-8891',
    orderNumber: 'NDR-2025-8891',
    customerId: 'cust-1',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98765 43210',
    customerAddress: 'Flat 402, Sai Residency, Indiranagar, Bengaluru - 560038',
    merchantId: 'm-102',
    merchantName: 'CleanPro Hygiene Solutions',
    items: [
      { title: 'Full 2BHK Deep Cleaning & Sanitization', quantity: 1, price: 1499 },
      { title: 'Kitchen Exhaust Chimney Degreasing', quantity: 1, price: 399 }
    ],
    subtotal: 1898,
    deliveryFee: 0,
    tax: 95,
    total: 1993,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    status: 'Confirmed',
    date: '21 Oct 2025, 02:30 PM',
    slot: 'Tomorrow, 10:00 AM - 01:00 PM',
    trackingStep: 2
  },
  {
    id: 'ord-8874',
    orderNumber: 'NDR-2025-8874',
    customerId: 'cust-1',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98765 43210',
    customerAddress: 'Flat 402, Sai Residency, Indiranagar, Bengaluru - 560038',
    merchantId: 'm-101',
    merchantName: 'Sri Balaji Sweets & Traditional Savories',
    items: [
      { title: 'Pure Ghee Motichoor Ladoo (500g)', quantity: 2, price: 340 },
      { title: 'Special Madras Mixture (250g)', quantity: 1, price: 120 }
    ],
    subtotal: 800,
    deliveryFee: 40,
    tax: 40,
    total: 880,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    status: 'Delivered',
    date: '19 Oct 2025, 05:15 PM',
    slot: 'Delivered at 06:05 PM',
    trackingStep: 4
  }
];

export const MOCK_VERIFICATIONS: VerificationRequest[] = [
  {
    id: 'v-301',
    merchantId: 'm-104',
    businessName: 'Royal Auto Garage & Detailing',
    legalEntityName: 'Royal Motors & Detailing LLP',
    category: 'Automotive',
    ownerName: 'Mohd. Farooq',
    phone: '+91 91234 56789',
    address: 'Near Pillar 140, Mehdipatnam, Hyderabad',
    pincode: '500008',
    gstin: '36AABCR9912E1Z5',
    submittedAt: '20 Oct 2025, 11:20 AM',
    status: 'pending',
    riskScore: 'Low',
    duplicateMatchFound: false,
    duplicateNotes: 'Clear phone and location audit. Physical trade license verified.'
  },
  {
    id: 'v-302',
    merchantId: 'm-105',
    businessName: 'Kaveri Pure Veg Tiffin Center',
    legalEntityName: 'Kaveri Foods Enterprise',
    category: 'Food & Dining',
    ownerName: 'Suresh Kumar',
    phone: '+91 98480 55443',
    address: 'Opposite Metro Station, Ameerpet, Hyderabad',
    pincode: '500016',
    gstin: '36ABCK9876Q1Z3',
    fssaiNumber: '13621011000889',
    submittedAt: '18 Oct 2025, 04:45 PM',
    status: 'pending',
    riskScore: 'Medium',
    duplicateMatchFound: true,
    duplicateNotes: 'Potential duplicate candidate: "Kaveri Sweets & Fast Food" registered within 150m radius. Manual inspection recommended.'
  }
];

export const MOCK_COMPLAINTS: ComplaintTicket[] = [
  {
    id: 'cmp-501',
    ticketNumber: 'TKT-9921',
    customerName: 'Kavita Menon',
    customerPhone: '+91 98112 33445',
    orderNumber: 'NDR-2025-8850',
    merchantName: 'Sri Balaji Sweets & Traditional Savories',
    category: 'Food Quality / Packaging',
    issue: 'Package seal was partially torn upon doorstep arrival. Requesting replacement.',
    status: 'Under Investigation',
    priority: 'Medium',
    date: '20 Oct 2025',
    resolution: 'Store contacted. Replacement box dispatched via express courier.'
  },
  {
    id: 'cmp-502',
    ticketNumber: 'TKT-9884',
    customerName: 'Anil Kulkarni',
    customerPhone: '+91 97223 44556',
    orderNumber: 'NDR-2025-8790',
    merchantName: 'CleanPro Hygiene Solutions',
    category: 'Service Timing',
    issue: 'Technician arrived 25 minutes late due to heavy rain. Service was good.',
    status: 'Resolved',
    priority: 'Low',
    date: '17 Oct 2025',
    resolution: 'Apologized to customer, ₹150 credit voucher issued for next booking.'
  }
];
