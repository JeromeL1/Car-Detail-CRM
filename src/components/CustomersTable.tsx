'use client'

import { useState } from 'react'
import type { Database } from '@/types/supabase'

// NOTE: customer data comes from `customers` joined with the related `profiles`
type Customer = Database['public']['Tables']['customers']['Row'] & {
  profiles: {
    first_name: string | null
    last_name: string | null
    email: string | null
    phone_number: string | null
  } | null
}

type Props = {
  initialCustomers: Customer[]
}

export default function CustomersTable({ initialCustomers }: Props) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers)
  const [showForm, setShowForm] = useState(false)
  const [formState, setFormState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  })
  const [saving, setSaving] = useState(false)

  const addCustomer = async () => {
    setSaving(true)

    const res = await fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: formState.first_name,
        last_name: formState.last_name,
        email: formState.email,
        phone: formState.phone,
      }),
    })

    if (res.ok) {
      const { customer } = await res.json()
      // Attach the profile info so the UI can display it immediately
      const newCustomer: Customer = {
        ...customer,
        profiles: {
          first_name: formState.first_name,
          last_name: formState.last_name,
          email: formState.email,
          phone_number: formState.phone,
        },
      }
      setCustomers([...customers, newCustomer])
      setShowForm(false)
      setFormState({ first_name: '', last_name: '', email: '', phone: '' })
    } else {
      const { error } = await res.json()
      alert(error ?? 'Failed to add customer')
    }
    setSaving(false)
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Customers</h2>
        <button
          onClick={() => setShowForm(true)}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-500"
        >
          Add Customer
        </button>
      </div>

      <table className="min-w-full border divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {customers.map((c) => (
            <tr key={c.id}>
              <td className="px-4 py-2">
                {c.profiles?.first_name} {c.profiles?.last_name}
              </td>
              <td className="px-4 py-2">{c.profiles?.email}</td>
              <td className="px-4 py-2">{c.profiles?.phone_number}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-full max-w-md space-y-4">
            <h3 className="text-lg font-medium">Add Customer</h3>
            <div className="space-y-3">
              <input
                className="w-full border px-3 py-2"
                placeholder="First name"
                value={formState.first_name}
                onChange={(e) =>
                  setFormState({ ...formState, first_name: e.target.value })
                }
              />
              <input
                className="w-full border px-3 py-2"
                placeholder="Last name"
                value={formState.last_name}
                onChange={(e) =>
                  setFormState({ ...formState, last_name: e.target.value })
                }
              />
              <input
                className="w-full border px-3 py-2"
                placeholder="Email"
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
              />
              <input
                className="w-full border px-3 py-2"
                placeholder="Phone"
                value={formState.phone}
                onChange={(e) =>
                  setFormState({ ...formState, phone: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 text-sm"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                disabled={saving}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                onClick={addCustomer}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}