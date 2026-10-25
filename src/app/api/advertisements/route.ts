import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const city = searchParams.get('city');

    return NextResponse.json({
      success: true,
      data: [],
      message: 'Active advertisements query completed.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch advertisements.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, imageUrl, destinationUrl, businessId, category, targetCity, budgetTier } = body;

    if (!title || !description || !imageUrl) {
      return NextResponse.json({ error: 'Title, description, and image URL are required.' }, { status: 400 });
    }

    const newAd = {
      id: 'AD-' + Date.now().toString().slice(-6),
      title,
      description,
      imageUrl,
      destinationUrl: destinationUrl || `/businesses/${businessId}`,
      businessId: businessId || 'BIZ-DEFAULT',
      category: category || 'General',
      targetCity: targetCity || 'Mumbai',
      budgetTier: budgetTier || 'Growth',
      status: 'Active',
      impressions: 0,
      clicks: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      advertisement: newAd,
      message: 'Advertisement created and submitted for verification.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'Internal server error creating advertisement.' }, { status: 500 });
  }
}
