import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { CORS_HEADERS } from '@/lib/api-config';

function getUploadDir() {
  return path.join(process.cwd(), 'public', 'uploads', 'videos');
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: CORS_HEADERS,
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'هیچ فایلی برای بارگذاری ارسال نشده است' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = getUploadDir();

    // Ensure upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Clean filename and create unique timestamped name
    const sanitizeName = file.name.replace(/[^a-zA-Z0-9_.-]/g, '_');
    const uniqueFilename = `${Date.now()}_${sanitizeName}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    // Save file on server filesystem
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/api/videos/${uniqueFilename}`;

    return NextResponse.json(
      {
        success: true,
        url: publicUrl,
        filename: uniqueFilename,
        originalName: file.name,
        size: file.size,
        mimeType: file.type,
      },
      { headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error('Server Video Upload Error:', error);
    return NextResponse.json(
      { error: 'خطا در ذخیره‌سازی ویدئو روی سرور' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
