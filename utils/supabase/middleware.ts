import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Actualiza la sesión de Supabase y protege rutas privadas en el Middleware de Next.js.
 * Incluye tolerancia a fallos si las variables de entorno no se han configurado aún en Vercel.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Si no se han configurado credenciales reales de Supabase en Vercel, permitir carga fluida
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('xyzcompany') || !supabaseUrl.startsWith('http')) {
    return supabaseResponse
  }

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // Refresca la sesión sin romper si falla la conexión
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const pathname = request.nextUrl.pathname

    // Protecciones de Ruta
    const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/profile')
    if (!user && isProtectedRoute) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }

    const isAuthRoute = pathname === '/login' || pathname === '/signup'
    if (user && isAuthRoute) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }

    return supabaseResponse
  } catch (error) {
    // Si hay cualquier error inesperado en middleware, devolver la respuesta sin interrupción
    return supabaseResponse
  }
}
