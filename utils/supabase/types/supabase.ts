export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          content: string
          created_at: string
          email: string
        }
        Insert: {
          id?: string
          content: string
          created_at?: string
          email: string
        }
        Update: {
          id?: string
          content?: string
          created_at?: string
          email?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}
