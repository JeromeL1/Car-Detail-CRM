// src/lib/supabase/server/admin.ts
// This is a server-side client for the Supabase admin API.
// It is used in the server-side code.
// It is used to create and manage admin users and roles.
// It is not used in the browser.

import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

// IMPORTANT: this client bypasses RLS – use only from trusted server code.
export const createAdminClient = () =>
  createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

    // never import this into files that beging with use client
    // EXAMPLE USAGE:
    // src/app/dashboard/admin-report/page.tsx
    // import { createAdminClient } from '@/lib/supabase/server/admin'

    // export default async function AdminReportPage() {
    // const supabase = createAdminClient()
    // const { data } = await supabase.from('payments').select('*')
    // render ...
    // }

    // EXAMPLE USAGE:
    // src/app/dashboard/admin-report/page.tsx
    // import { createAdminClient } from '@/lib/supabase/server/admin'

    // export default async function AdminReportPage() {
    // const supabase = createAdminClient()
    // const { data } = await supabase.from('payments').select('*')
    // render ...
    // }