import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/types/supabase'

export const createClient = () => {
  return createServerComponentClient<Database>({ cookies })
}


// Use in server components like:
// const supabase = createClient() 