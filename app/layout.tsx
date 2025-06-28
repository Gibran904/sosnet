// app/layout.tsx

import './globals.css'
import { createClient } from '@/utils/supabase/server'
import { SupabaseProvider } from '@/utils/supabase/provider'

export const metadata = {
  title: 'Sosnet',
  description: 'Sosial networking mini buatan Gibran 🔥',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en">
      <body>
        <SupabaseProvider session={session}>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  )
}
