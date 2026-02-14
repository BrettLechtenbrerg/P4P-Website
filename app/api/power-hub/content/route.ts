import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Content directory path
const CONTENT_DIR = path.join(process.cwd(), 'content');

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('file');

    // If no specific file requested, return list of all content files
    if (!filename) {
      const files = await fs.readdir(CONTENT_DIR);
      const jsonFiles = files.filter(f => f.endsWith('.json'));

      const fileList = await Promise.all(
        jsonFiles.map(async (file) => {
          const filePath = path.join(CONTENT_DIR, file);
          const stats = await fs.stat(filePath);
          return {
            filename: file,
            lastModified: stats.mtime.toISOString(),
          };
        })
      );

      return NextResponse.json({ files: fileList });
    }

    // Return specific file content
    const filePath = path.join(CONTENT_DIR, filename);

    // Security check
    if (!filePath.startsWith(CONTENT_DIR)) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 400 }
      );
    }

    const content = await fs.readFile(filePath, 'utf-8');
    const stats = await fs.stat(filePath);

    return NextResponse.json({
      filename,
      content: JSON.parse(content),
      lastModified: stats.mtime.toISOString(),
    });
  } catch (error) {
    console.error('Content read error:', error);
    return NextResponse.json(
      { error: 'Failed to read content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { filename, content } = await request.json();

    if (!filename || !content) {
      return NextResponse.json(
        { error: 'Filename and content required' },
        { status: 400 }
      );
    }

    const filePath = path.join(CONTENT_DIR, filename);

    // Security check
    if (!filePath.startsWith(CONTENT_DIR)) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 400 }
      );
    }

    // Write formatted JSON
    await fs.writeFile(filePath, JSON.stringify(content, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      filename,
      savedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Content write error:', error);
    return NextResponse.json(
      { error: 'Failed to save content' },
      { status: 500 }
    );
  }
}
