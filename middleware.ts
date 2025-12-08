import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const headers = new Headers(req.headers);
  const response = NextResponse.next({ headers });

  // const url = new URL('/api/health', req.url);
  // url.searchParams.set('next', '/page1');
  // return NextResponse.redirect(url);
  return response;
}

export const config = {
  matcher: [
    {
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|monitoring|\\.well-known).*)',
      missing: [{ type: 'header', key: 'next-action' }],
    },
  ],
};
