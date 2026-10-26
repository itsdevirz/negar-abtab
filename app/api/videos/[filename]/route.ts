import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

function getUploadDir() {
  return path.join(process.cwd(), 'public', 'uploads', 'videos');
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const resolvedParams = await params;
    const filename = resolvedParams.filename;

    if (!filename || filename.includes('..')) {
      return NextResponse.json({ error: 'نام فایل نامعتبر است' }, { status: 400 });
    }

    const filePath = path.join(getUploadDir(), filename);

    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json({ error: 'فایل ویدئو روی هاست یافت نشد' }, { status: 404 });
    }

    const fileBuffer = await fs.readFile(filePath);
    const ext = path.extname(filename).toLowerCase();

    let contentType = 'video/mp4';
    if (ext === '.webm') contentType = 'video/webm';
    else if (ext === '.mov') contentType = 'video/quicktime';
    else if (ext === '.mkv') contentType = 'video/x-matroska';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': fileBuffer.length.toString(),
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving host video:', error);
    return NextResponse.json({ error: 'خطا در بارگیری ویدئو از هاست' }, { status: 500 });
  }
}
