import { createServerClient } from '@supabase/ssr'

export async function createClient() {
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      cookies: {
        getAll() {
          return []
        },
        setAll() {
        },
      },
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false, },
    }
  )
}