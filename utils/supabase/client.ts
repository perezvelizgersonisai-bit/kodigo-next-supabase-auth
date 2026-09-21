import { createBrowserClient } from '@supabase/ssr'

/**
 * Cliente de Supabase para Client Components ("use client").
 * Permite realizar operaciones en el navegador sin almacenar tokens sensibles en localStorage.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key'

  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  )
}
