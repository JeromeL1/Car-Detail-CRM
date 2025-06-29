export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string
          user_id: string
          first_name: string
          last_name: string
          email: string | null
          phone: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          first_name: string
          last_name: string
          email?: string | null
          phone?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string
          last_name?: string
          email?: string | null
          phone?: string | null
          created_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
} 