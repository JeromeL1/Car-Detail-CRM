import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  await supabase.auth.signOut()
  // Redirect to landing page
  return NextResponse.redirect(new URL('/', request.url))
} 