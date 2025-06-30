import { z } from 'zod'

export const idSchema = z.string().uuid()

export const appointmentInsertSchema = z.object({
  customer_id: idSchema,
  vehicle_id: idSchema,
  service_package_id: idSchema,
  start_time: z.string(), // ISO timestamp
  end_time: z.string(), // ISO timestamp
  total_price: z.number().nonnegative(),
  notes: z.string().nullable().optional(),
  detailer_id: idSchema.nullable().optional(),
  status: z.enum(['scheduled', 'in_progress', 'completed', 'cancelled']).nullable().optional(),
}) 