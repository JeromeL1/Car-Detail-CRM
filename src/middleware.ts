import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    // Refresh session if expired
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
      console.error('Auth session error:', error)
      return res
    }

    // If no session and trying to access protected routes, redirect to login
    if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/auth/login'
      redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // If has session and trying to access auth pages, redirect to dashboard
    if (session && (req.nextUrl.pathname.startsWith('/auth'))) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/dashboard'
      return NextResponse.redirect(redirectUrl)
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/:path*'
  ]
} 