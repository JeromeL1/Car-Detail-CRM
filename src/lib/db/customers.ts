import { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'
import { idSchema } from '@/lib/validation/schemas'
import { AppError, fromSupabase } from '@/lib/errors'

// Data shapes
export type Customer = Database['public']['Tables']['customers']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
export type CustomerWithProfile = Customer & { profiles: Profile | null }

// Fetch all customers with their related profile fields.
// Caller supplies a Supabase client that is already configured
// for the correct context (server component, client component,
// service-role, etc.).
export async function getCustomers(
  supabase: SupabaseClient<Database>,
): Promise<CustomerWithProfile[]> {
  const { data, error } = await supabase
    .from('customers')
    .select('*, profiles(*)')
    .order('created_at')

  if (error) throw fromSupabase(error as any)
  return (data ?? []) as CustomerWithProfile[]
}

// Fetch a single customer by id (including profile fields)
export async function getCustomerById(
  supabase: SupabaseClient<Database>,
  id: string,
): Promise<CustomerWithProfile | null> {
  const parsedId = idSchema.safeParse(id)
  if (!parsedId.success) {
    throw new AppError('VALIDATION_ERROR', parsedId.error.message)
  }

  const { data, error } = await supabase
    .from('customers')
    .select('*, profiles(*)')
    .eq('id', parsedId.data)
    .single()

  if (error) {
    if ((error as any).code === 'PGRST116') return null // no rows
    throw fromSupabase(error as any)
  }
  return data as CustomerWithProfile
} 