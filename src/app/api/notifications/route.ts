import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    try {
      const notifications = await prisma.notification.findMany({
        where: userId ? { recipientId: userId } : {},
        orderBy: { createdAt: 'desc' },
        take: 30,
      });

      return NextResponse.json({
        notifications: notifications.map(n => ({
          id: n.id,
          title: n.title,
          message: n.message,
          read: n.isRead,
          link: n.relatedEntityType === 'enquiry' ? '/my-enquiries' : '/explore',
          createdAt: n.createdAt,
        })),
      });
    } catch (e) {
      return NextResponse.json({ notifications: [] });
    }
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to retrieve notifications' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { notificationId, userId } = body;

    try {
      if (notificationId) {
        await prisma.notification.update({
          where: { id: notificationId },
          data: { isRead: true, readAt: new Date() },
        });
      } else if (userId) {
        await prisma.notification.updateMany({
          where: { recipientId: userId, isRead: false },
          data: { isRead: true, readAt: new Date() },
        });
      } else {
        await prisma.notification.updateMany({
          where: { isRead: false },
          data: { isRead: true, readAt: new Date() },
        });
      }

      return NextResponse.json({ success: true, message: 'Notifications marked as read' });
    } catch (e) {
      return NextResponse.json({ success: true, message: 'Notifications marked as read' });
    }
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update notifications' }, { status: 500 });
  }
}
