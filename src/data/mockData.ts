import { Category, ServiceItem, FeaturedItem, Testimonial, Merchant, Order, VerificationRequest, ComplaintTicket, BlogReel } from '@/types';

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
    slug: 'food-delivery',
    title: 'Food Delivery',
    category: 'Food & Dining',
    tagline: 'Order from your favorite restaurants',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    rating: 4.6,
    reviewCount: '2.5M+',
    priceStart: 149,
    duration: '25-35 mins',
    providerName: 'Over 2,400 neighborhood restaurants',
    badge: 'Popular',
    description: 'Get hot, authentic regional delicacies, biryanis, pure ghee sweets, and thalis delivered right to your doorstep from hygiene-certified local kitchens.',
    features: [
      'Live temperature tracking & sealed tamper-proof packaging',
      'No minimum order limit with free doorstep delivery above ₹299',
      'Direct order dispatch to top regional chefs & sweet marts',
      'Instant refund guarantee on any spill or transit delays'
    ],
    packages: [
      { id: 'p-1', name: 'South Indian Tiffin Combo', price: 149, description: '2 Ghee Masala Dosas, 2 Steamed Idlis, Vada with 3 varieties of chutneys & sambar.', popular: true },
      { id: 'p-2', name: 'Royal Dum Biryani Feast (Serves 2)', price: 449, description: 'Authentic Hyderabadi Dum Biryani, Mirchi ka Salan, Raita & Double ka Meetha.' },
      { id: 'p-3', name: 'Assorted Traditional Sweets Box (1kg)', price: 620, description: 'Motichoor Ladoo, Kaju Katli, Besan Ladoo, and Dry Fruit Halwa.' }
    ],
    faqs: [
      { q: 'How fast is food delivered in my area?', a: 'Neighborhood restaurant orders are usually dispatched within 10 minutes and reach your doorstep within 25 to 35 minutes.' },
      { q: 'Can I pay via cash on delivery or UPI?', a: 'Yes! Needora accepts all UPI apps (GPay, PhonePe, Paytm), credit/debit cards, and cash on delivery.' }
    ]
  },
  {
    id: 'serv-2',
    slug: 'grocery-delivery',
    title: 'Grocery Delivery',
    category: 'Shopping',
    tagline: 'Fresh groceries at your doorstep',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
    rating: 4.5,
    reviewCount: '1.8M+',
    priceStart: 99,
    duration: '15-30 mins',
    providerName: 'Direct from verified farm marts',
    badge: 'Daily Fresh',
    description: 'Handpicked fresh farm vegetables, seasonal fruits, organic cold-pressed oils, premium grains, and everyday pantry essentials delivered in under 30 minutes.',
    features: [
      'Zero preservative farm produce delivered fresh every morning',
      'Direct sourcing from local verified farmers & mandi distributors',
      '100% replacement guarantee if any vegetable or fruit is bruised',
      'Weighing scale verification at your doorstep upon request'
    ],
    packages: [
      { id: 'g-1', name: 'Essential Kitchen Veggie Basket (5kg)', price: 299, description: 'Tomatoes, Onions, Potatoes, Coriander, Green Chilies, Ginger, and Spinach.', popular: true },
      { id: 'g-2', name: 'Organic Fresh Fruits Hamper (3kg)', price: 449, description: 'Pomegranate, Apples, Robusta Bananas, Papaya, and Sweet Oranges.' },
      { id: 'g-3', name: 'Monthly Staple Ration Pack', price: 1499, description: '10kg Premium Sona Masoori Rice, 5kg Whole Wheat Atta, 2kg Toor Dal, 1L Cold-Pressed Ghee.' }
    ],
    faqs: [
      { q: 'Are the vegetables washed and sanitized?', a: 'Yes, all farm greens and produce undergo ozone purification and hygienic food-grade sorting before packing.' }
    ]
  },
  {
    id: 'serv-3',
    slug: 'home-cleaning',
    title: 'Home Cleaning',
    category: 'Home Services',
    tagline: 'Professional & trusted cleaning services',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewCount: '1.2M+',
    priceStart: 499,
    duration: '2-4 hours',
    providerName: 'Police-verified cleaning partners',
    badge: 'Best Seller',
    description: 'Comprehensive residential deep cleaning by background-verified professionals using industrial-grade scrubbers, eco-friendly detergents, and hospital-grade sanitizers.',
    features: [
      'Police-verified & Aadhaar-authenticated service technicians',
      'Hospital-grade non-toxic European cleaning chemicals',
      'Specialized motorized rotary disc scrubbing machines',
      '30-day rework guarantee if you are not 100% satisfied'
    ],
    packages: [
      { id: 'hc-1', name: 'Bathroom & Kitchen Intensive Clean', price: 899, description: 'Deep descaling of wall tiles, taps, exhaust fans, sink, and grout line whitening.', popular: true },
      { id: 'hc-2', name: 'Full 2BHK Home Deep Cleaning', price: 1799, description: 'All rooms, balconies, fans, windows, cupboards exterior, and floor machine scrubbing.' },
      { id: 'hc-3', name: 'Luxury 3BHK / Villa Deep Sanitization', price: 2599, description: 'Comprehensive top-to-bottom scrub, sofa shampooing, chimney degreasing, and steam sanitization.' }
    ],
    faqs: [
      { q: 'Do I need to provide buckets, mops, or cleaning chemicals?', a: 'No, our team arrives fully equipped with heavy-duty vacuums, scrubbing machines, ladders, and eco-friendly chemicals.' }
    ]
  },
  {
    id: 'serv-4',
    slug: 'beauty-salon',
    title: 'Beauty & Salon',
    category: 'Beauty & Wellness',
    tagline: 'Look good, feel great',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80',
    rating: 4.6,
    reviewCount: '980K+',
    priceStart: 349,
    duration: '45-90 mins',
    providerName: 'Certified estheticians & stylists',
    badge: 'Top Rated',
    description: 'Pamper yourself with premium salon & spa services in the comfort and privacy of your home. Delivered exclusively by certified beauticians with single-use sterile kits.',
    features: [
      '100% single-use mono-dose packs opened right in front of you',
      'Branded products including L’Oreal, Cheryl’s, Lotus, and Sara',
      'Strict post-service clean-up — we leave your space spotless',
      'Female beauticians assigned for female clients'
    ],
    packages: [
      { id: 'bs-1', name: 'Express Glow Facial & Threading', price: 499, description: 'Herbal fruit cleanse, exfoliating scrub, rejuvenating mask, and eyebrow threading.', popular: true },
      { id: 'bs-2', name: 'Mani-Pedi Spa & Relaxing Head Massage', price: 799, description: 'Rose petal foot soak, cuticles care, heel scrub, and 20-min warm coconut oil massage.' },
      { id: 'bs-3', name: 'Bridal Glow & Full Body Polishing', price: 2199, description: 'Gold radiance treatment, full body chocolate wax, and lavender aroma massage.' }
    ],
    faqs: [
      { q: 'Is it hygienic to take salon services at home?', a: 'Yes! Our beauticians wear sanitised aprons, use disposable sheets, and single-use sealed kits.' }
    ]
  },
  {
    id: 'serv-5',
    slug: 'tuition-learning',
    title: 'Tuition & Learning',
    category: 'Education',
    tagline: 'Learn from expert tutors',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80',
    rating: 4.5,
    reviewCount: '760K+',
    priceStart: 600,
    duration: 'Per month',
    providerName: 'CBSE, ICSE & State Board tutors',
    badge: 'Verified',
    description: 'Find verified, compassionate home tutors and subject-matter experts for K-12 academics, engineering competitive exams, classical music, and spoken English.',
    features: [
      'Background and educational credential-checked tutors',
      'Free 1-hour demo session before committing to the month',
      'Weekly progress diagnostic tests and direct parent feedback',
      'Flexible scheduling: home visits or 1-on-1 live interactive sessions'
    ],
    packages: [
      { id: 'tl-1', name: 'Primary School All-Subjects (Classes 1-5)', price: 1499, description: 'Maths, Science, English, Hindi/Regional language — 3 days/week, 1 hour each.', popular: true },
      { id: 'tl-2', name: 'Secondary Maths & Science (Classes 6-10)', price: 2499, description: 'Conceptual clarity, board exam preparation, NCERT solving — 4 days/week.' },
      { id: 'tl-3', name: 'Senior Secondary Physics, Chemistry & Maths', price: 3999, description: 'JEE / NEET foundation, doubt-solving, formula practice — 5 days/week.' }
    ],
    faqs: [
      { q: 'Can I change the tutor if my child is not comfortable?', a: 'Absolutely. We offer a no-questions-asked replacement guarantee within the first 14 days.' }
    ]
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

export const BLOG_REELS: BlogReel[] = [
  {
    id: 'reel-1',
    title: 'Secret Behind Making Authentic 100% Pure Ghee Motichoor Ladoos! ✨',
    merchantName: 'Sri Balaji Sweets & Savories',
    merchantCity: 'Banjara Hills, Hyderabad',
    category: 'Food & Dining',
    thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80',
    offerText: 'FLAT 20% OFF on all Festive Boxes with code DIWALI20',
    likes: 14200,
    commentsCount: 384,
    sharesCount: 1820,
    tags: ['#HyderabadSweets', '#PureGhee', '#LocalBites', '#NeedoraPicks'],
    description: 'Watch master confectioner Venkat Rao create hot pearl motichoor straight from copper cauldrons with pure desi ghee and saffron syrup. Order fresh boxes for your family right on Needora!',
    musicTrack: 'Original Audio • Hyderabad Culinary Heritage',
    duration: '0:42',
    verified: true
  },
  {
    id: 'reel-2',
    title: 'Transforming a Dusty Kitchen Exhaust in Under 15 Minutes! 🧼',
    merchantName: 'CleanPro Hygiene Solutions',
    merchantCity: 'Madhapur, Hyderabad',
    category: 'Home Services',
    thumbnail: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&auto=format&fit=crop&q=80',
    offerText: 'Book Full 2BHK Deep Cleaning at ₹1,499 Today!',
    likes: 21800,
    commentsCount: 512,
    sharesCount: 2900,
    tags: ['#DeepCleanChallenge', '#SatisfyingCleaning', '#HomeCare', '#NeedoraVerified'],
    description: 'See the power of our Italian rotary steam scrubber tackling stubborn grease on chimney mesh. 100% police-verified technicians with hospital grade sanitizers.',
    musicTrack: 'Trending Beat • Clean Vibes India',
    duration: '0:35',
    verified: true
  },
  {
    id: 'reel-3',
    title: 'From Organic Farms to Your Doorstep in 20 Minutes 🥦🥕',
    merchantName: 'Green Harvest Organics',
    merchantCity: 'Jubilee Hills, Hyderabad',
    category: 'Shopping',
    thumbnail: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&auto=format&fit=crop&q=80',
    offerText: 'Free Fresh Palak & Coriander with Every Veggie Basket',
    likes: 9840,
    commentsCount: 219,
    sharesCount: 890,
    tags: ['#OrganicIndia', '#DailyHarvest', '#HealthyLiving', '#FarmFresh'],
    description: 'Watch how our morning batch of hydroponic greens and farm-fresh bell peppers are inspected, weighed, and sealed into zero-plastic biodegradable totes for lightning delivery.',
    musicTrack: 'Acoustic Morning • Green Rhythms',
    duration: '0:28',
    verified: true
  },
  {
    id: 'reel-4',
    title: 'Ayurvedic Kesh Kanti Hair Spa: Ancient Herbs for Modern Stress 🌿💆‍♀️',
    merchantName: 'Dr. Kavita Wellness Studio',
    merchantCity: 'Indiranagar, Bengaluru',
    category: 'Beauty & Wellness',
    thumbnail: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&auto=format&fit=crop&q=80',
    offerText: 'Get 25% OFF on First At-Home Spa Appointment',
    likes: 18900,
    commentsCount: 462,
    sharesCount: 2140,
    tags: ['#AyurvedaSpa', '#SelfCareSunday', '#NaturalBeauty', '#SalonAtHome'],
    description: 'Warm sesame oil infused with Brahmi, Bhringraj and Amla gently massaged into the scalp followed by herbal steam infusion. Book your relaxing session today.',
    musicTrack: 'Flute & Sitar Meditation • Traditional Chants',
    duration: '0:48',
    verified: true
  },
  {
    id: 'reel-5',
    title: 'How 1-on-1 Personalized Tutoring Helped Aarav Score 98% in Maths 📚🎯',
    merchantName: 'Acuity Scholars Academy',
    merchantCity: 'Hitec City, Hyderabad',
    category: 'Education',
    thumbnail: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&auto=format&fit=crop&q=80',
    offerText: 'Book Free 60-Minute Diagnostic Demo Class',
    likes: 12400,
    commentsCount: 330,
    sharesCount: 1450,
    tags: ['#CBSETips', '#MathsMadeEasy', '#TutorsNearMe', '#EducationFirst'],
    description: 'No rote learning, only first-principle visual intuition. Meet our verified math educator Shweta Sen as she explains algebraic factorisation using 3D blocks.',
    musicTrack: 'Upbeat Focus • LoFi Study Study Study',
    duration: '0:50',
    verified: true
  }
];
