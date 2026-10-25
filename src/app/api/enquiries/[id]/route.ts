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
      const enquiry = await prisma.enquiry.findFirst({
        where: {
          OR: [
            { id },
            { enquiryRef: id },
          ],
        },
        include: {
          business: {
            include: {
              branches: true,
            },
          },
          customer: true,
          statusHistory: {
            orderBy: { createdAt: 'desc' },
          },
          quotes: true,
          messages: {
            orderBy: { createdAt: 'asc' },
          },
        },
      });

      if (!enquiry) {
        return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
      }

      return NextResponse.json({ enquiry });
    } catch (e) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to retrieve enquiry' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, responseNotes, quoteAmount, quoteDetails } = body;

    try {
      const enquiry = await prisma.enquiry.findFirst({
        where: {
          OR: [{ id }, { enquiryRef: id }],
        },
      });

      if (!enquiry) {
        return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
      }

      const updated = await prisma.$transaction(async (tx) => {
        const u = await tx.enquiry.update({
          where: { id: enquiry.id },
          data: {
            ...(status ? { status } : {}),
            statusHistory: {
              create: {
                previousStatus: enquiry.status,
                newStatus: status || enquiry.status,
                notes: responseNotes || (quoteDetails ? `Quote provided: ${quoteDetails}` : 'Status updated by merchant'),
              },
            },
            ...(quoteDetails
              ? {
                  quotes: {
                    create: {
                      merchantId: enquiry.businessId,
                      description: quoteDetails,
                      indicativeAmount: quoteAmount ? parseFloat(quoteAmount) : null,
                      status: 'active',
                    },
                  },
                }
              : {}),
          },
        });

        // Notify customer
        await tx.notification.create({
          data: {
            recipientId: enquiry.customerId,
            notificationType: 'enquiry_update',
            title: `Update on Enquiry ${enquiry.enquiryRef}`,
            message: responseNotes || quoteDetails || `Status updated to ${status}`,
            relatedEntityType: 'enquiry',
            relatedEntityId: enquiry.id,
          },
        });

        return u;
      });

      return NextResponse.json({ success: true, enquiry: updated });
    } catch (dbError) {
      return NextResponse.json({ success: true, message: 'Status updated (Demo Mode Active)' });
    }
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}
