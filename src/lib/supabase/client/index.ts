import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/supabase'

// Create a single instance of the client to prevent hydration mismatches
let supabase: ReturnType<typeof createClientComponentClient<Database>> | null = null

export const createClient = () => {
  if (!supabase) {
    supabase = createClientComponentClient<Database>({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    })
  }
  return supabase
}

// Use in client components like:
// const supabase = createClient() 