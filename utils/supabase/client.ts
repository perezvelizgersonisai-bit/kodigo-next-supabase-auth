import { createBrowserClient } from '@supabase/ssr'

/**
 * Cliente de Supabase para Client Components ("use client").
 * Permite realizar operaciones en el navegador sin almacenar tokens sensibles en localStorage.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
