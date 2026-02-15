import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    // List all blobs in the uploads folder
    const { blobs } = await list({
      prefix: 'uploads/',
    });

    // Transform to our MediaFile format
    const media = blobs.map((blob) => ({
      id: blob.pathname,
      name: blob.pathname.split('/').pop()?.replace(/^\d+-/, '') || blob.pathname,
      url: blob.url,
      size: formatFileSize(blob.size),
      uploaded: formatDate(blob.uploadedAt),
    }));

    // Sort by upload date (newest first)
    media.sort((a, b) => {
      const dateA = new Date(blobs.find(b => b.pathname === a.id)?.uploadedAt || 0);
      const dateB = new Date(blobs.find(b => b.pathname === b.id)?.uploadedAt || 0);
      return dateB.getTime() - dateA.getTime();
    });

    return NextResponse.json({ media });
  } catch (error) {
    console.error('Error listing media:', error);
    return NextResponse.json(
      { error: 'Failed to load media', media: [] },
      { status: 500 }
    );
  }
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();

  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return Math.floor(diff / 60000) + ' min ago';
  if (diff < 86400000) return Math.floor(diff / 3600000) + ' hours ago';
  if (diff < 604800000) return Math.floor(diff / 86400000) + ' days ago';

  return new Date(date).toLocaleDateString();
}
