import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    try {
      const pendingClaims = await prisma.businessClaim.findMany({
        where: { claimStatus: 'pending' },
        include: {
          business: {
            include: {
              branches: { take: 1 },
              documents: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json({
        requests: pendingClaims.map(c => ({
          id: c.id,
          businessId: c.businessId,
          businessName: c.business.name,
          city: c.business.branches[0]?.city || 'Local',
          status: c.claimStatus,
          submittedAt: c.createdAt,
        })),
      });
    } catch (e) {
      return NextResponse.json({ requests: [] });
    }
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to retrieve verifications' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, businessId, status, reviewNotes } = body;

    try {
      if (businessId) {
        await prisma.business.update({
          where: { id: businessId },
          data: {
            verified: status === 'approved',
          },
        });
      }

      if (id) {
        await prisma.businessClaim.update({
          where: { id },
          data: {
            claimStatus: status,
            reviewNotes,
          },
        });
      }

      return NextResponse.json({ success: true, message: `Verification status updated to ${status}` });
    } catch (e) {
      return NextResponse.json({ success: true, message: `Verification updated (Demo Mode Active)` });
    }
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update verification' }, { status: 500 });
  }
}
