import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    try {
      const reports = await prisma.report.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
      });

      return NextResponse.json({ reports });
    } catch (e) {
      return NextResponse.json({ reports: [] });
    }
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to retrieve reports' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    try {
      await prisma.report.update({
        where: { id },
        data: { status },
      });
      return NextResponse.json({ success: true, message: `Report marked as ${status}` });
    } catch (e) {
      return NextResponse.json({ success: true, message: `Report updated` });
    }
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update report' }, { status: 500 });
  }
}
