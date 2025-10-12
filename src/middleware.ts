import { NextRequest, NextResponse } from 'next/server';

// Define paths that require authentication
const protectedPaths = [
  '/dashboard',
];

// Define paths that are only accessible for non-authenticated users
const authOnlyPaths = [
  '/login',
  '/signup',
];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Log for debugging
  console.log('Middleware running for path:', pathname);
  
  // Check for token cookie presence - this will work with HTTP-only cookies
  const hasTokenCookie = request.cookies.has('token');
  console.log('Has token cookie:', hasTokenCookie);
  
  const isAuthenticated = hasTokenCookie;
  
  // Check if the path is protected and user is not authenticated
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  console.log('Is protected path:', isProtectedPath);
  
  if (isProtectedPath && !isAuthenticated) {
    console.log('Redirecting to login because user is not authenticated');
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }
  
  // Check if the path is for non-authenticated users only and user is authenticated
  const isAuthOnlyPath = authOnlyPaths.some(path => pathname.startsWith(path));
  console.log('Is auth only path:', isAuthOnlyPath);
  
  if (isAuthOnlyPath && isAuthenticated) {
    console.log('Redirecting to dashboard because user is authenticated');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  console.log('Continuing to next middleware/handler');
  return NextResponse.next();
}

// Configure the paths that should be matched by the middleware
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};