import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === '/authpage' || path === '/'

  // Get the token from the cookies
  const token = request.cookies.get('accessToken')?.value || ''

  // Redirect logic
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/pages/InfoAdmine/profile', request.url))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/authpage', request.url))
  }
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    '/',
    '/authpage',
    '/pages/InfoAdmine/profile',
    '/pages/pagesofsidebar/:path*',
  ],
} 