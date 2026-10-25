import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { CATEGORIES } from '@/data/mockData';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, conversationId: clientConvId, userId } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message query is required.' }, { status: 400 });
    }

    const q = message.toLowerCase().trim();

    // 1. Payment or Pricing queries
    if (q.includes('pay') || q.includes('payment') || q.includes('upi') || q.includes('price') || q.includes('cost') || q.includes('fee')) {
      return NextResponse.json({
        reply: 'Needora does NOT collect online payments, UPI transfers, or checkout fees! Our platform connects you directly to local businesses for 100% free enquiries. You discuss quotes, scope, and payment directly with the merchant with no middlemen.',
        links: [
          { label: 'View All Services', href: '/services' },
          { label: 'Check My Enquiries', href: '/my-enquiries' }
        ],
      });
    }

    // 2. Business listing queries
    if (q.includes('register') || q.includes('list') || q.includes('merchant') || q.includes('add my shop') || q.includes('owner')) {
      return NextResponse.json({
        reply: 'Listing your shop on Needora is completely FREE! You get a dedicated merchant profile, direct customer enquiries via SMS/WhatsApp, and can upload promotional video reels to reach local customers.',
        links: [
          { label: 'Open Free Listing Form', href: '/listing' },
          { label: 'Go to Merchant Dashboard', href: '/merchant' }
        ],
      });
    }

    // 3. Video or Reels queries
    if (q.includes('video') || q.includes('reel') || q.includes('watch') || q.includes('clip')) {
      return NextResponse.json({
        reply: 'You can explore vertical video reels uploaded by real local merchants, or upload your own store walkthroughs!',
        links: [
          { label: 'Watch Video Reels', href: '/videos' },
          { label: 'Upload Store Video', href: '/create' }
        ],
      });
    }

    // 4. Query PostgreSQL database for matching businesses
    try {
      const dbBusinesses = await prisma.business.findMany({
        where: {
          status: 'active',
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } },
          ],
        },
        include: {
          category: true,
          branches: { take: 1 },
        },
        take: 3,
      });

      if (dbBusinesses && dbBusinesses.length > 0) {
        return NextResponse.json({
          reply: `I found ${dbBusinesses.length} verified business(es) on Needora matching "${message}":`,
          businessResults: dbBusinesses.map(b => ({
            id: b.id,
            name: b.name,
            category: b.category?.name || 'Local Store',
            address: b.branches[0]?.address || 'Local Address',
            city: b.branches[0]?.city || 'Local',
          })),
          links: [{ label: 'View in Full Search', href: '/search' }],
        });
      }
    } catch (e) {
      // safe fallback
    }

    // 5. Match category
    const matchedCategory = CATEGORIES.find(c =>
      c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)
    );

    if (matchedCategory) {
      return NextResponse.json({
        reply: `Looking for ${matchedCategory.name}? You can explore verified local providers, compare quotes, and send instant enquiries for this category!`,
        links: [
          { label: `Explore ${matchedCategory.name}`, href: `/categories/${matchedCategory.slug}` },
          { label: 'Submit Free Enquiry', href: '/services' }
        ],
      });
    }

    // Default intelligent guidance
    return NextResponse.json({
      reply: `I can help you locate trusted local professionals, find store hours, track your enquiries, or publish your own business. What would you like to explore next?`,
      links: [
        { label: 'Search All Services', href: '/services' },
        { label: 'Browse Categories', href: '/categories' },
        { label: 'Explore Community Feed', href: '/explore' },
        { label: 'Register Free Business', href: '/listing' }
      ],
    });

  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to process Dora AI query' }, { status: 500 });
  }
}
