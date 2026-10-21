import { Category, ServiceItem, FeaturedItem, Testimonial, Merchant, Order, VerificationRequest, ComplaintTicket, BlogReel, MerchantListing, CustomerEnquiry } from '@/types';

export const CATEGORIES: Category[] = [
  {
    id: 'home-decor',
    name: 'Home Decor',
    slug: 'home-decor',
    iconName: 'Armchair',
    bgColor: '#EFF6FF',
    color: '#2563EB',
    count: '2,840+ Stores',
    description: 'Room furniture, designer furnishings, lamps, modular kitchens & luxury interior architects.',
    subcategories: [
      { id: 'hd-1', name: 'Room Furniture', slug: 'room-furniture', itemCount: '840+ Showrooms', description: 'Solid teakwood sofas, recliners, king size beds, ergonomic wardrobes, and modular study desks.' },
      { id: 'hd-2', name: 'Furnishing', slug: 'furnishing', itemCount: '620+ Outlets', description: 'Blackout curtains, Egyptian cotton bedsheets, artisanal cushions, rugs, and custom blinds.' },
      { id: 'hd-3', name: 'Lamps & Lights', slug: 'lamps-lights', itemCount: '430+ Studios', description: 'Crystal chandeliers, architectural ambient LEDs, pendant ceiling lights, and outdoor garden lamps.' },
      { id: 'hd-4', name: 'Kitchen & Dining', slug: 'kitchen-dining', itemCount: '510+ Stores', description: 'German acrylic modular kitchens, quartz dining tables, brass crockery, and chimney appliances.' },
      { id: 'hd-5', name: 'Interior Designers', slug: 'interior-designers', itemCount: '390+ Firms', description: '3D turnkey home renovation, modular kitchen architects, false ceiling experts, and vastu planning.' }
    ]
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    slug: 'real-estate',
    iconName: 'Building',
    bgColor: '#ECFDF5',
    color: '#059669',
    count: '3,120+ Agents',
    description: 'Trusted estate agents for commercial plots, residential flats, farm lands, and rental leases.',
    subcategories: [
      { id: 're-1', name: 'Estate Agents For Land', slug: 'estate-agents-for-land', itemCount: '1,240+ Agents', description: 'Verified clear-title NA farm plots, industrial land parcels, highway acreage, and DTCP approved layouts.' },
      { id: 're-2', name: 'Commercial Spaces & Offices', slug: 'commercial-spaces', itemCount: '890+ Agencies', description: 'Co-working spaces, retail retail shop leases, corporate IT towers, and warehouse godowns.' },
      { id: 're-3', name: 'Residential Flats & Villas', slug: 'residential-flats', itemCount: '990+ Brokers', description: 'Gated community luxury apartments, independent duplex villas, and premium resale penthouses.' }
    ]
  },
  {
    id: 'restaurants',
    name: 'Restaurants',
    slug: 'restaurants',
    iconName: 'Utensils',
    bgColor: '#FFF3EB',
    color: '#EA580C',
    count: '5,420+ Outlets',
    description: 'Pure vegetarian thalis, authentic Dum Biryanis, sweet houses, rooftop dining, and bakeries.',
    subcategories: [
      { id: 'rst-1', name: 'Pure Veg & Regional Thalis', slug: 'pure-veg-thali', itemCount: '1,420+ Outlets', description: 'Unlimited Gujarati, Marwari, South Indian banana leaf meals, and sattvic dining.' },
      { id: 'rst-2', name: 'Dum Biryani & Kebabs', slug: 'dum-biryani', itemCount: '1,890+ Outlets', description: 'Royal Hyderabadi Dum Biryani, Lucknowi handi meat, and clay oven tandoori platters.' },
      { id: 'rst-3', name: 'Sweets & Confectioneries', slug: 'sweets-confectioneries', itemCount: '920+ Sweet Marts', description: 'Pure ghee motichoor ladoos, kaju katli, Bengali rasgullas, and dry fruit hampers.' }
    ]
  },
  {
    id: 'hotels',
    name: 'Hotels',
    slug: 'hotels',
    iconName: 'Hotel',
    bgColor: '#FEF3C7',
    color: '#D97706',
    count: '1,120+ Properties',
    description: 'Budget business stays, 5-star heritage resorts, transit airport rooms, and serviced suites.',
    subcategories: [
      { id: 'htl-1', name: 'Luxury 4 & 5 Star Resorts', slug: 'luxury-resorts', itemCount: '240+ Hotels', description: 'Spa resorts, swimming pools, multi-cuisine banquets, and presidential suites.' },
      { id: 'htl-2', name: 'Business Transit Hotels', slug: 'business-hotels', itemCount: '580+ Hotels', description: 'Near IT hubs and airports with express check-in, high-speed WiFi, and conference rooms.' }
    ]
  },
  {
    id: 'beauty-spa',
    name: 'Beauty Spa',
    slug: 'beauty-spa',
    iconName: 'Flower2',
    bgColor: '#FCE7F3',
    color: '#DB2777',
    count: '2,150+ Salons',
    description: 'Unisex hair salons, Ayurvedic spas, bridal makeup studios, and clinical skincare.',
    subcategories: [
      { id: 'bsp-1', name: 'Hair & Styling Salons', slug: 'hair-salons', itemCount: '980+ Salons', description: 'Keratin treatments, botox hair therapy, global coloring, and beard grooming.' },
      { id: 'bsp-2', name: 'Ayurvedic & Wellness Spas', slug: 'ayurvedic-spas', itemCount: '640+ Spas', description: 'Panchakarma, hot stone body therapy, aromatherapy, and herbal steam baths.' }
    ]
  },
  {
    id: 'contractors',
    name: 'Contractors',
    slug: 'contractors',
    iconName: 'HardHat',
    bgColor: '#FFF7ED',
    color: '#C2410C',
    count: '1,640+ Vendors',
    description: 'Civil building contractors, electrical supervisors, plumbing masters, and waterproofers.',
    subcategories: [
      { id: 'cnt-1', name: 'Civil Construction & Masonry', slug: 'civil-construction', itemCount: '720+ Contractors', description: 'RCC foundation, structural beams, slab casting, brickwork, and plastering.' },
      { id: 'cnt-2', name: 'Electricians & Industrial Wiring', slug: 'electricians', itemCount: '540+ Contractors', description: 'Three-phase wiring, DB panel installation, inverter setups, and earthing audits.' }
    ]
  },
  {
    id: 'packers-movers',
    name: 'Packers & Movers',
    slug: 'packers-movers',
    iconName: 'Truck',
    bgColor: '#F0FDFA',
    color: '#0D9488',
    count: '980+ Transporters',
    description: 'Doorstep household shifting, vehicle carriers, corporate office relocation, and storage.',
    subcategories: [
      { id: 'pm-1', name: 'Household Goods Shifting', slug: 'household-shifting', itemCount: '620+ Movers', description: 'Multi-layer bubble wrapping, furniture dismantling, and doorstep unpack setup.' },
      { id: 'pm-2', name: 'Intercity Car & Bike Relocation', slug: 'vehicle-relocation', itemCount: '360+ Movers', description: 'Covered hydraulic car containers and insured bike transport pan-India.' }
    ]
  },
  {
    id: 'hospitals',
    name: 'Hospitals',
    slug: 'hospitals',
    iconName: 'HeartPulse',
    bgColor: '#FFE4E6',
    color: '#E11D48',
    count: '890+ Facilities',
    description: 'Multi-speciality hospitals, 24x7 emergency trauma units, diagnostic imaging, and ICU care.',
    subcategories: [
      { id: 'hsp-1', name: 'Multi-Speciality Hospitals', slug: 'multi-speciality', itemCount: '380+ Hospitals', description: 'Cardiology, Orthopaedics, Neurology, Oncology, and 24x7 Casualty.' },
      { id: 'hsp-2', name: 'Diagnostic Labs & Scan Centers', slug: 'diagnostic-labs', itemCount: '510+ Centers', description: 'MRI, CT Scan, ultrasound, blood pathology, and preventive health packages.' }
    ]
  },
  {
    id: 'dentists',
    name: 'Dentists',
    slug: 'dentists',
    iconName: 'Smile',
    bgColor: '#E0F2FE',
    color: '#0284C7',
    count: '1,240+ Clinics',
    description: 'Painless root canals, dental implants, invisible clear aligners, and teeth whitening.',
    subcategories: [
      { id: 'dnt-1', name: 'Root Canal & Laser Dentistry', slug: 'root-canal', itemCount: '640+ Clinics', description: 'Single-sitting laser RCT, ceramic crowns, and painless tooth extraction.' },
      { id: 'dnt-2', name: 'Orthodontics & Clear Aligners', slug: 'orthodontics', itemCount: '420+ Specialists', description: 'Invisible teeth braces, aligners for adults, and smile design studios.' }
    ]
  },
  {
    id: 'wedding-planning',
    name: 'Wedding Planning',
    slug: 'wedding-planning',
    iconName: 'Users',
    bgColor: '#FDF2F8',
    color: '#BE185D',
    count: '1,420+ Vendors',
    description: 'AC convention halls, royal mandap decorators, catering thalis, and drone cinematography.',
    subcategories: [
      { id: 'wd-1', name: 'Banquet Halls & Lawns', slug: 'banquet-halls', itemCount: '520+ Venues', description: 'Capacity from 200 to 5,000 guests, AC dining halls, and bridal guest suites.' },
      { id: 'wd-2', name: 'Luxury Mandap Decorators', slug: 'mandap-decorators', itemCount: '460+ Studios', description: 'Exotic floral stages, thematic entry tunnels, and LED ambient lighting.' }
    ]
  },
  {
    id: 'education',
    name: 'Education',
    slug: 'education',
    iconName: 'GraduationCap',
    bgColor: '#DCFCE7',
    color: '#16A34A',
    count: '980+ Institutes',
    description: 'CBSE/ICSE home tutors, JEE/NEET coaching academies, music teachers, and test prep.'
  },
  {
    id: 'loans',
    name: 'Loans',
    slug: 'loans',
    iconName: 'Wallet',
    bgColor: '#FEF3C7',
    color: '#D97706',
    count: '640+ Advisors',
    description: 'Instant home loans, business expansion capital, gold loans, and MSME subsidy consultants.'
  }
];

export const MOCK_MERCHANT_LISTINGS: MerchantListing[] = [
  // REAL ESTATE - ESTATE AGENTS FOR LAND (From Image 3)
  {
    id: 'm-est-1',
    name: 'K. K Group & Associates',
    slug: 'kk-group-associates',
    categorySlug: 'real-estate',
    subCategorySlug: 'estate-agents-for-land',
    rating: 5.0,
    ratingCount: 3,
    tag: 'Trending',
    location: 'Near Panchayat Samiti Wada, Palghar',
    city: 'Mumbai',
    address: 'Shop No. 4, Ground Floor, Samiti Commercial Complex, Wada, Palghar, Maharashtra - 421303',
    phone: '08734912840',
    displayPhone: '08734912840',
    whatsapp: '918734912840',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop&q=80',
    services: [
      'Estate Agents For Commercial Spaces',
      'Estate Agents For Land',
      'NA Plot Clearances',
      'Industrial Land Acquisition'
    ],
    verified: true,
    yearsInBusiness: 12,
    propertyType: 'Both',
    callPickUpRate: '98% High Call Response Rate'
  },
  {
    id: 'm-est-2',
    name: 'HEAVEN PROPERTY',
    slug: 'heaven-property',
    categorySlug: 'real-estate',
    subCategorySlug: 'estate-agents-for-land',
    rating: 4.7,
    ratingCount: 106,
    tag: 'Popular',
    location: 'Near Station Jogeshwari West, Mumbai',
    city: 'Mumbai',
    address: 'G-12, Green View Apartments, SV Road, Opp Railway Station, Jogeshwari West, Mumbai - 400102',
    phone: '08401931062',
    displayPhone: '08401931062',
    whatsapp: '918401931062',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
    services: [
      'Estate Agents For Residential Rental',
      'Real Estate Agents For Land',
      'Commercial Retail Spaces',
      'Lease Agreements & Legal Drafting'
    ],
    verified: true,
    yearsInBusiness: 15,
    propertyType: 'Both',
    callPickUpRate: 'High call pick up rate'
  },
  {
    id: 'm-est-3',
    name: 'Nikhil Consultants & Prime Realtors',
    slug: 'nikhil-consultants',
    categorySlug: 'real-estate',
    subCategorySlug: 'estate-agents-for-land',
    rating: 4.9,
    ratingCount: 84,
    tag: 'Top Rated',
    location: 'Bandra Kurla Complex (BKC), Mumbai',
    city: 'Mumbai',
    address: 'Tower B, Floor 6, Capital Plaza, G Block, BKC, Mumbai - 400051',
    phone: '09820144552',
    displayPhone: '09820144552',
    whatsapp: '919820144552',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&auto=format&fit=crop&q=80',
    services: [
      'High-Value Agricultural & Industrial Land',
      'Commercial Corporate Leasing',
      'Luxury Resale Penthouses'
    ],
    verified: true,
    yearsInBusiness: 20,
    propertyType: 'Commercial',
    callPickUpRate: 'Instant WhatsApp & Call Support'
  },

  // HOME DECOR - ROOM FURNITURE (From Image 2)
  {
    id: 'm-dec-1',
    name: 'Royal Heritage Teak & Furniture Studio',
    slug: 'royal-heritage-furniture',
    categorySlug: 'home-decor',
    subCategorySlug: 'room-furniture',
    rating: 4.9,
    ratingCount: 245,
    tag: 'Top Rated',
    location: 'Tank Bazar, Mumbai',
    city: 'Mumbai',
    address: 'Plot 18, Timber Market Road, Tank Bazar, Mumbai - 400010',
    phone: '09819923410',
    displayPhone: '09819923410',
    whatsapp: '919819923410',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80',
    services: [
      'Handcrafted Teakwood Sofas',
      'King Size Storage Beds',
      'Solid Sheesham Dining Sets',
      'Custom Wardrobe Fabrication'
    ],
    verified: true,
    yearsInBusiness: 18,
    priceRange: '₹12,000 - ₹1,80,000',
    callPickUpRate: 'Verified Showroom'
  },
  {
    id: 'm-dec-2',
    name: 'Urban Living Modern Decor Hub',
    slug: 'urban-living-modern-decor',
    categorySlug: 'home-decor',
    subCategorySlug: 'room-furniture',
    rating: 4.8,
    ratingCount: 189,
    tag: 'Popular',
    location: 'Link Road, Andheri West, Mumbai',
    city: 'Mumbai',
    address: 'Shop 4-6, Crystal Mall Annex, Link Road, Andheri West, Mumbai - 400053',
    phone: '09821155440',
    displayPhone: '09821155440',
    whatsapp: '919821155440',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80',
    services: [
      'L-Shaped Recliner Sofas',
      'Ergonomic Work From Home Desks',
      'Minimalist TV Consoles',
      'Accent Lounge Chairs'
    ],
    verified: true,
    yearsInBusiness: 9,
    priceRange: '₹8,500 - ₹95,000',
    callPickUpRate: 'Quick Quotation Support'
  },

  // HOME DECOR - INTERIOR DESIGNERS
  {
    id: 'm-dec-3',
    name: 'Aura Spazio Interior Architects',
    slug: 'aura-spazio-interiors',
    categorySlug: 'home-decor',
    subCategorySlug: 'interior-designers',
    rating: 5.0,
    ratingCount: 88,
    tag: 'Top Rated',
    location: 'Jubilee Hills / Banjara Hills, Hyderabad',
    city: 'Hyderabad',
    address: 'Road No 36, Beside Metro Pillar 22, Jubilee Hills, Hyderabad - 500033',
    phone: '09849077651',
    displayPhone: '09849077651',
    whatsapp: '919849077651',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=80',
    services: [
      '3D Photorealistic Interior Walkthroughs',
      'Turnkey Residential Villa Renovation',
      'Luxury Acrylic Modular Kitchens',
      'Vastu Compliant Layout Drafting'
    ],
    verified: true,
    yearsInBusiness: 14,
    callPickUpRate: 'Free 3D Estimate Consultation'
  },

  // HOME DECOR - LAMPS & LIGHTS
  {
    id: 'm-dec-4',
    name: 'Lumiere Crystal & Architectural Lighting',
    slug: 'lumiere-lighting',
    categorySlug: 'home-decor',
    subCategorySlug: 'lamps-lights',
    rating: 4.8,
    ratingCount: 112,
    tag: 'Trending',
    location: 'Lohar Chawl, Marine Lines, Mumbai',
    city: 'Mumbai',
    address: '144, Electric Market, Lohar Chawl, Mumbai - 400002',
    phone: '09820033112',
    displayPhone: '09820033112',
    whatsapp: '919820033112',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&auto=format&fit=crop&q=80',
    services: [
      'Bohemian Crystal Chandeliers',
      'Architectural COB LED Magnetic Tracks',
      'Vintage Brass Lanterns & Sconces',
      'Smart WiFi App-Controlled Mood Lights'
    ],
    verified: true,
    yearsInBusiness: 22,
    priceRange: '₹1,500 - ₹3,50,000'
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
    description: 'Handpicked fresh farm vegetables, seasonal fruits, organic cold-pressed oils, premium grains, and everyday pantry essentials delivered in under 30 minutes.'
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
    description: 'Comprehensive residential deep cleaning by background-verified professionals using industrial-grade scrubbers, eco-friendly detergents, and hospital-grade sanitizers.'
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
    description: 'Pamper yourself with premium salon & spa services in the comfort and privacy of your home. Delivered exclusively by certified beauticians with single-use sterile kits.'
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
    description: 'Find verified, compassionate home tutors and subject-matter experts for K-12 academics, engineering competitive exams, classical music, and spoken English.'
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
    category: 'Restaurants',
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
    offerText: 'Book Full 2BHK Deep Cleaning Free Quote Today!',
    likes: 21800,
    commentsCount: 512,
    sharesCount: 2900,
    tags: ['#DeepCleanChallenge', '#SatisfyingCleaning', '#HomeCare', '#NeedoraVerified'],
    description: 'See the power of our Italian rotary steam scrubber tackling stubborn grease on chimney mesh. 100% police-verified technicians with hospital grade sanitizers.',
    musicTrack: 'Trending Beat • Clean Vibes India',
    duration: '0:35',
    verified: true
  }
];

export const MOCK_CUSTOMER_ENQUIRIES: CustomerEnquiry[] = [
  {
    id: 'enq-1',
    enquiryRef: 'ENQ-992101',
    businessName: 'Sri Balaji Sweets & Traditional Savories',
    category: 'Food & Dining',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98765 43210',
    location: 'Indiranagar, Bengaluru',
    requirement: 'Need customized corporate Diwali festive gift packaging with pure ghee sweets for 40 boxes. Require delivery by Friday.',
    preferredTime: 'Today Afternoon (12 PM - 3 PM)',
    date: '21 Oct 2026, 11:30 AM',
    status: 'Quote Provided',
    merchantResponse: 'Hello Priya, we can prepare 40 custom branded tins with assorted Kaju Katli & Dry Fruit Halwa. Prepared freshly on Friday morning and delivered via courier.',
    quotationDetails: 'Custom Box Option A (500g Assorted): Fresh batch preparation with custom logo card included. Free doorstep transit.',
    businessPhone: '+91 98765 43210',
    businessWhatsapp: '919876543210',
    businessAddress: 'Tank Bazar, Mumbai / Indiranagar Express Center'
  },
  {
    id: 'enq-2',
    enquiryRef: 'ENQ-884102',
    businessName: 'Royal Furniture & Modular Studio',
    category: 'Home Decor',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98765 43210',
    location: 'Indiranagar, Bengaluru',
    requirement: 'Inquiring about 3D modular kitchen design estimate, acrylic finish cabinets, and German soft-close hinges. Site measurement visit required.',
    preferredTime: 'Immediate Callback (Within 15 mins)',
    date: '20 Oct 2026, 04:15 PM',
    status: 'Business Responded',
    merchantResponse: 'Our lead interior architect can visit your Indiranagar residence tomorrow at 11 AM with laminate swatches and laser measurement tools for free consultation.',
    businessPhone: '+91 98201 55667',
    businessWhatsapp: '919820155667',
    businessAddress: '12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru'
  },
  {
    id: 'enq-3',
    enquiryRef: 'ENQ-773103',
    businessName: 'UrbanSpark Deep Cleaning Solutions',
    category: 'Home Services',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98765 43210',
    location: 'Indiranagar, Bengaluru',
    requirement: 'Complete 3BHK deep cleaning including chimney degreasing, bathroom descaling, and balcony jet wash before housewarming function.',
    preferredTime: 'Tomorrow Morning (9 AM - 12 PM)',
    date: '19 Oct 2026, 09:40 AM',
    status: 'Customer Contacted',
    merchantResponse: 'Technician team of 3 verified cleaning specialists assigned. Equipment includes single-disc scrubbers and eco-friendly chemicals.',
    businessPhone: '+91 98481 11223',
    businessWhatsapp: '919848111223',
    businessAddress: 'Plot 44, Cyber Hills, Bengaluru'
  },
  {
    id: 'enq-4',
    enquiryRef: 'ENQ-662104',
    businessName: 'QuickFix Electrical & Appliance Care',
    category: 'Home Services',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98765 43210',
    location: 'Indiranagar, Bengaluru',
    requirement: 'Master bedroom split AC not cooling adequately. Fan blower makes vibration sound. Need technician inspection.',
    preferredTime: 'Today Evening (5 PM - 8 PM)',
    date: '18 Oct 2026, 02:10 PM',
    status: 'Closed',
    merchantResponse: 'Technician visited and completed filter deep-clean and gas pressure check. Diagnostic confirmed working at optimal 18°C.',
    businessPhone: '+91 98110 99887',
    businessWhatsapp: '919811099887',
    businessAddress: 'Indiranagar BDA Complex, Bengaluru'
  }
];
