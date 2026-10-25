import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { CATEGORIES } from '@/data/mockData';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    try {
      const dbCategories = await prisma.category.findMany({
        where: { parentId: null },
        include: {
          children: true,
          _count: {
            select: { businesses: true },
          },
        },
      });

      if (dbCategories && dbCategories.length > 0) {
        return NextResponse.json({
          categories: dbCategories.map(c => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            description: c.description,
            subcategories: c.children.map(ch => ({
              id: ch.id,
              name: ch.name,
              slug: ch.slug,
            })),
            count: `${c._count.businesses} Verified Stores`,
          })),
        });
      }
    } catch (e) {
      // Use standard category definitions if database not yet seeded
    }

    return NextResponse.json({
      categories: CATEGORIES,
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to retrieve categories' }, { status: 500 });
  }
}
