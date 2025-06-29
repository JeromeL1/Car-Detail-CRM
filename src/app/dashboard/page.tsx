import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="mb-4 text-3xl font-bold">Dashboard</h1>
      {user ? (
        <p className="text-lg">Signed in as <strong>{user.email}</strong></p>
      ) : (
        <p className="text-lg text-red-600">No user session found</p>
      )}
    </main>
  )
} 