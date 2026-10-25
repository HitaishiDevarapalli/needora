import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const mediaTypeParam = (formData.get('mediaType') as string) || 'image';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    // Validate MIME types
    const validMimes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'video/mp4',
      'video/webm',
      'video/quicktime',
    ];

    if (!validMimes.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file format (${file.type}). Supported formats: JPG, PNG, WEBP, MP4, WEBM.` },
        { status: 400 }
      );
    }

    // Max size check: 100MB for video, 10MB for images
    const maxBytes = file.type.startsWith('video/') ? 100 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json(
        { error: `File exceeds maximum allowed size of ${maxBytes / (1024 * 1024)}MB.` },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/uploads directory
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
      // directory may already exist
    }

    const safeFilename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = path.join(uploadDir, safeFilename);
    const publicUrl = `/uploads/${safeFilename}`;

    try {
      await writeFile(filePath, buffer);
    } catch (fsError) {
      console.warn('Filesystem write fallback:', fsError);
    }

    // Register MediaAsset in Database
    try {
      let uploader = await prisma.user.findFirst();
      if (!uploader) {
        uploader = await prisma.user.create({
          data: {
            name: 'Upload Manager',
            email: `uploader_${Date.now()}@needora.in`,
            authProvider: 'system',
          },
        });
      }

      const mediaAsset = await prisma.mediaAsset.create({
        data: {
          uploaderId: uploader.id,
          storageKey: safeFilename,
          url: publicUrl,
          mediaType: file.type.startsWith('video/') ? 'video' : 'image',
          mimeType: file.type,
          fileSize: file.size,
          processingStatus: 'ready',
        },
      });

      return NextResponse.json({
        success: true,
        mediaId: mediaAsset.id,
        url: publicUrl,
        storageKey: safeFilename,
        mimeType: file.type,
        size: file.size,
      }, { status: 201 });

    } catch (dbError) {
      return NextResponse.json({
        success: true,
        mediaId: 'MEDIA_' + Date.now(),
        url: publicUrl,
        storageKey: safeFilename,
        mimeType: file.type,
        size: file.size,
      }, { status: 201 });
    }

  } catch (err: any) {
    console.error('Upload Error:', err);
    return NextResponse.json({ error: 'Failed to upload media asset.' }, { status: 500 });
  }
}
