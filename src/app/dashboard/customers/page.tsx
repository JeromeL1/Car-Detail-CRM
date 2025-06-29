import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import CustomersTable from '@/components/CustomersTable'
import type { Database } from '@/types/supabase'

export default async function CustomersPage() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data } = await supabase
    .from('customers')
    .select('*')
    .eq('user_id', user?.id ?? '')
    .order('created_at')

  return (
    <div className="p-6">
      <CustomersTable initialCustomers={data ?? []} />
    </div>
  )
} 