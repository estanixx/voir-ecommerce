import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PRESALE_DATE, SALE_DATE } from './lib/constants';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Skip middleware for landing page and API routes
  if (path === '/v' || path.startsWith('/api/') || path.includes('_next') || path.includes('favicon.ico')) {
    return NextResponse.next();
  }

  // Check if we're in the ecommerce group (not in landing group)
  if (!path.startsWith('/v')) {
    // Get the passcode from cookies
    const passcodeKey = process.env.PASSCODE_LOCALSTORAGE_KEY;
    const passcodeValue = process.env.PREACCESS_CODE;
    
    // Ensure we have the required environment variables
    if (!passcodeKey || !passcodeValue) {
      console.error('Missing required environment variables for passcode validation');
      return NextResponse.next();
    }
    
    const storedPasscode = request.cookies.get(passcodeKey)?.value;
    
    // Check current date against sale and presale dates
    const currentTime = new Date().getTime();
    const isSale = currentTime >= SALE_DATE.getTime();
    const isPresale = currentTime < SALE_DATE.getTime() && currentTime >= PRESALE_DATE.getTime();
    
    // Redirect to landing page if:
    // 1. It's not sale time yet, AND
    // 2. Either it's not presale time OR the passcode is incorrect
    if (!isSale && (!isPresale || storedPasscode !== passcodeValue)) {
      return NextResponse.redirect(new URL('/v', request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};