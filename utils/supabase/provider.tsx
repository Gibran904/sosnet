'use client'

import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import type { Session } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'

export const SupabaseProvider = ({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session | null
}) => {
  const [supabase] = useState(() =>
    createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  )

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={session}>
      {children}
    </SessionContextProvider>
  )
}
