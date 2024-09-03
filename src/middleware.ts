import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken } from './services/cookie';

export async function middleware(request: NextRequest) {
  const accessToken = await getAccessToken();

  if (!request.url.includes('/auth') && !accessToken) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/customers/:path*', '/staff/:path*'],
};
