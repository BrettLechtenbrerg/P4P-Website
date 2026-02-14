import { NextResponse } from 'next/server';

// Simple auth - in production, use a proper auth system like Clerk or NextAuth
// Credentials can be set via environment variables
const PORTAL_USERNAME = process.env.PORTAL_USERNAME || 'p4padmin';
const PORTAL_PASSWORD = process.env.PORTAL_PASSWORD || 'p4p2026';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (username === PORTAL_USERNAME && password === PORTAL_PASSWORD) {
      // Generate a simple token (in production, use JWT)
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');

      return NextResponse.json({
        success: true,
        token,
        user: { username },
      });
    }

    return NextResponse.json(
      { error: 'Invalid username or password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  // Verify token
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'No token provided' },
      { status: 401 }
    );
  }

  const token = authHeader.substring(7);

  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const [username] = decoded.split(':');

    if (username === PORTAL_USERNAME) {
      return NextResponse.json({
        authenticated: true,
        user: { username },
      });
    }
  } catch {
    // Invalid token format
  }

  return NextResponse.json(
    { error: 'Invalid token' },
    { status: 401 }
  );
}
