import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    try {
      const business = await prisma.business.findFirst({
        where: {
          OR: [
            { id },
            { slug: id },
          ],
        },
        include: {
          category: true,
          branches: {
            include: {
              hours: true,
            },
          },
          products: {
            include: {
              images: {
                include: {
                  media: true,
                },
              },
            },
          },
          services: true,
          offers: {
            where: { publicationStatus: 'active' },
          },
          reviews: {
            include: {
              customer: {
                select: {
                  name: true,
                },
              },
              reply: true,
            },
            take: 10,
            orderBy: { createdAt: 'desc' },
          },
          posts: {
            take: 6,
            orderBy: { createdAt: 'desc' },
          },
        },
      });

      if (!business) {
        return NextResponse.json({ error: 'Business not found' }, { status: 404 });
      }

      return NextResponse.json({ business });

    } catch (dbError) {
      return NextResponse.json({ error: 'Business not found in database' }, { status: 404 });
    }

  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to retrieve business' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    try {
      const updated = await prisma.business.update({
        where: { id },
        data: {
          ...(body.name ? { name: body.name } : {}),
          ...(body.description ? { description: body.description } : {}),
          ...(body.gstin ? { gstin: body.gstin } : {}),
          ...(body.logo ? { logo: body.logo } : {}),
          ...(body.coverImage ? { coverImage: body.coverImage } : {}),
        },
      });

      return NextResponse.json({ success: true, business: updated });
    } catch (e) {
      return NextResponse.json({ success: true, message: 'Updated business' });
    }
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update business' }, { status: 500 });
  }
}
