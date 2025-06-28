// utils/supabase/provider.tsx
'use client'

import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import type { Session } from '@supabase/auth-helpers-nextjs' // ⬅️ LO TARO DI SINI

export function SupabaseProvider({
  children,
  session,
}: {
  children: React.ReactNode
  session?: Session | null
}) {
  const [supabaseClient] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  )

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={session}>
      {children}
    </SessionContextProvider>
  )
}
