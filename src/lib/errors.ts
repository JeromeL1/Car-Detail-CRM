import { PostgrestError } from '@supabase/supabase-js'

export class AppError extends Error {
  constructor(public code: string, message: string) {
    super(message)
    this.name = 'AppError'
  }
}

export function fromSupabase(error: PostgrestError): AppError {
  // Supabase errors include message, code, details, hint, and code
  return new AppError(error.code, error.message)
} 