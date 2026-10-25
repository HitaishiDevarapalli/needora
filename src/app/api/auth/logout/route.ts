import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (token) {
      try {
        await prisma.userSession.updateMany({
          where: { token },
          data: { revokedAt: new Date() },
        });
      } catch (e) {
        // Safe ignore
      }
    }

    return NextResponse.json({ success: true, message: 'Logged out successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to log out' }, { status: 500 });
  }
}
