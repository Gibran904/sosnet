'use client'

import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Terserah lo mau pake yg mana, tapi ini paling common:
export const supabase = createPagesBrowserClient()