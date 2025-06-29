import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

export const createClient = (): SupabaseClient<Database> =>
  createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies,
    }
  )
