import { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'
import { appointmentInsertSchema } from '@/lib/validation/schemas'
import { AppError, fromSupabase } from '@/lib/errors'

export type Appointment = Database['public']['Tables']['appointments']['Row']
export type AppointmentWithJoins = Appointment & {
  service_packages: Database['public']['Tables']['service_packages']['Row'] | null
  vehicles: Database['public']['Tables']['vehicles']['Row'] | null
}

// List appointments for a given customer, newest first.
export async function getAppointmentsByCustomer(
  supabase: SupabaseClient<Database>,
  customerId: string,
): Promise<AppointmentWithJoins[]> {
  const { data, error } = await supabase
    .from('appointments')
    .select('*, service_packages(*), vehicles(*)')
    .eq('customer_id', customerId)
    .order('start_time', { ascending: false })

  if (error) throw fromSupabase(error as any)
  return (data ?? []) as AppointmentWithJoins[]
}

// Create a new appointment. Caller must supply all required fields.
export async function createAppointment(
  supabase: SupabaseClient<Database>,
  payload: Database['public']['Tables']['appointments']['Insert'],
): Promise<Appointment> {
  // Validate first
  const parsed = appointmentInsertSchema.safeParse(payload)
  if (!parsed.success) {
    throw new AppError('VALIDATION_ERROR', parsed.error.message)
  }

  const { data, error } = await supabase
    .from('appointments')
    .insert(parsed.data)
    .select('*')
    .single()

  if (error) throw fromSupabase(error as any)
  return data as Appointment
} 