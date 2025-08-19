import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PRESALE_DATE, SALE_DATE } from './lib/constants';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define paths that are always accessible without any restrictions
  const publicPaths = ['/v', '/api/', '_next', 'favicon.ico'];
  
  // Skip middleware for public paths
  if (publicPaths.some(p => path.startsWith(p))) {
    return NextResponse.next();
  }

  // Get the current time and check the sale and presale dates
  const currentTime = new Date().getTime();
  const isSale = currentTime >= SALE_DATE.getTime();
  const isPresale = currentTime >= PRESALE_DATE.getTime() && currentTime < SALE_DATE.getTime();

  // Redirect all requests to the landing page if neither sale nor presale is active
  if (!isSale && !isPresale) {
    return NextResponse.redirect(new URL('/v', request.url));
  }

  // If it's the presale period, check for the passcode
  if (isPresale) {
    const passcodeKey = process.env.PASSCODE_LOCALSTORAGE_KEY;
    const passcodeValue = process.env.PREACCESS_CODE;

    // Ensure we have the required environment variables
    if (!passcodeKey || !passcodeValue) {
      console.error('Missing required environment variables for passcode validation');
      return NextResponse.next(); // Continue without restriction in case of misconfiguration
    }

    const storedPasscode = request.cookies.get(passcodeKey)?.value;

    // If the passcode is missing or incorrect, redirect to the landing page
    if (storedPasscode !== passcodeValue) {
      return NextResponse.redirect(new URL('/v', request.url));
    }
  }

  // Allow access to the requested page
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)']
};