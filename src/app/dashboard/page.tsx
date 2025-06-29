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
        <>
          <p className="text-lg mb-4">Signed in as <strong>{user.email}</strong></p>
          <a
            href="/auth/logout"
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
          >
            Log out
          </a>
        </>
      ) : (
        <p className="text-lg text-red-600">No user session found</p>
      )}
    </main>
  )
}