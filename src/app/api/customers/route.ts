import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server/admin'

export async function POST(request: Request) {
  const {
    first_name,
    last_name,
    email,
    phone,
  }: {
    first_name: string
    last_name: string
    email: string
    phone: string
  } = await request.json()

  const supabase = createAdminClient()

  // 1) Create the auth user – this requires the service-role key
  const {
    data: userData,
    error: userError,
  } = await supabase.auth.admin.createUser({
    email: email || undefined,
    phone: phone || undefined,
    password: crypto.randomUUID(), // random, they will reset later if needed
    email_confirm: !!email,
  })

  if (userError || !userData?.user?.id) {
    return NextResponse.json(
      { error: userError?.message || 'Failed to create auth user' },
      { status: 400 },
    )
  }

  const userId = userData.user.id

  // 2) Insert profile row
  const { error: profileError } = await supabase.from('profiles').insert({
    id: userId,
    first_name,
    last_name,
    phone_number: phone || null,
    email: email || null,
    role: 'customer',
  })

  if (profileError) {
    return NextResponse.json(
      { error: profileError.message },
      { status: 400 },
    )
  }

  // 3) Insert customer row (address & other fields can be updated later)
  const {
    data: customer,
    error: customerError,
  } = await supabase
    .from('customers')
    .insert({ id: userId })
    .select('*')
    .single()

  if (customerError) {
    return NextResponse.json(
      { error: customerError.message },
      { status: 400 },
    )
  }

  return NextResponse.json({ customer })
}

