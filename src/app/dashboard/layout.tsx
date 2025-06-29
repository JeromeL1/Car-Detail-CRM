import Link from 'next/link'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <aside className="w-56 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-lg font-bold">Car Detail CRM</h2>
        <nav className="flex flex-col space-y-2 text-sm">
          <Link href="/dashboard" className="hover:underline">
            Home
          </Link>
          <Link href="/dashboard/customers" className="hover:underline">
            Customers
          </Link>
        </nav>
        <Link
          href="/auth/logout"
          className="mt-auto inline-block rounded bg-red-600 px-3 py-2 text-xs font-medium hover:bg-red-500"
        >
          Log out
        </Link>
      </aside>
      <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
    </div>
  )
} 