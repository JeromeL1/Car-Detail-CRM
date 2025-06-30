import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import CustomersTable from '@/components/CustomersTable'
import type { Database } from '@/types/supabase'
import { customersRepo } from '@/lib/db'

export default async function CustomersPage() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const data = await customersRepo.getCustomers(supabase)

  return (
    <div className="p-6">
      <CustomersTable initialCustomers={data} />
    </div>
  )
}

export const dynamic = 'force-dynamic'