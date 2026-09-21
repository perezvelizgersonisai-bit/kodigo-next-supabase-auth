'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export type AuthFormState = {
  error?: string
  success?: string
}

/**
 * Server Action para Inicio de Sesión (Sign In)
 */
export async function loginAction(
  prevState: AuthFormState | null,
  formData: FormData
): Promise<AuthFormState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Validación básica del servidor
  if (!email || !password) {
    return { error: 'Por favor, ingresa tu correo y contraseña.' }
  }

  if (!email.includes('@')) {
    return { error: 'Formato de correo electrónico no válido.' }
  }

  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      if (error.message.includes('fetch failed') || error.message.includes('placeholder')) {
        return {
          error:
            'Para conectar con tu Supabase real, configura las variables NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en Vercel (Project Settings > Environment Variables).',
        }
      }
      return { error: error.message || 'Credenciales inválidas. Por favor intenta de nuevo.' }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
  } catch (err: any) {
    if (err?.message?.includes('fetch failed')) {
      return {
        error:
          'Configura las variables NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY de tu proyecto en Vercel (Project Settings > Environment Variables) para activar Supabase real.',
      }
    }
    return { error: err?.message || 'Error al conectar con el servidor de autenticación.' }
  }
}

/**
 * Server Action para Registro de Usuario (Sign Up)
 */
export async function signupAction(
  prevState: AuthFormState | null,
  formData: FormData
): Promise<AuthFormState> {
  const fullName = formData.get('fullName') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  // Validación estricta en el servidor
  if (!email || !password || !fullName) {
    return { error: 'Todos los campos son obligatorios.' }
  }

  if (password.length < 6) {
    return { error: 'La contraseña debe tener al menos 6 caracteres.' }
  }

  if (password !== confirmPassword) {
    return { error: 'Las contraseñas no coinciden.' }
  }

  try {
    const supabase = await createClient()

    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      if (error.message.includes('fetch failed') || error.message.includes('placeholder')) {
        return {
          error:
            'Para registrar usuarios reales en tu base de datos, agrega NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en Vercel (Project Settings > Environment Variables).',
        }
      }
      return { error: error.message || 'Ocurrió un error al registrar el usuario.' }
    }

    // Si requiere confirmación de email o si inició sesión automáticamente
    if (data?.user && data.session) {
      revalidatePath('/', 'layout')
      redirect('/dashboard')
    }

    return {
      success: '¡Registro exitoso! Por favor verifica tu correo electrónico para confirmar tu cuenta.',
    }
  } catch (err: any) {
    if (err?.message?.includes('fetch failed')) {
      return {
        error:
          'Para registrar usuarios reales en tu base de datos, agrega las variables NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en Vercel (Settings > Environment Variables).',
      }
    }
    return { error: err?.message || 'Error al conectar con el servidor de autenticación.' }
  }
}

/**
 * Server Action para Cierre de Sesión (Sign Out)
 */
export async function signOutAction() {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
  } catch {
    // Ignorar si no hay conexión
  }
  revalidatePath('/', 'layout')
  redirect('/login')
}

/**
 * Server Action para Solicitar Recuperación de Contraseña
 */
export async function forgotPasswordAction(
  prevState: AuthFormState | null,
  formData: FormData
): Promise<AuthFormState> {
  const email = formData.get('email') as string

  if (!email || !email.includes('@')) {
    return { error: 'Ingresa un correo electrónico válido.' }
  }

  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://kodigo-next-supabase-auth.vercel.app'}/reset-password`,
    })

    if (error) {
      return { error: error.message || 'No se pudo enviar el correo de recuperación.' }
    }

    return {
      success: 'Se ha enviado un enlace de recuperación a tu correo electrónico.',
    }
  } catch (err: any) {
    return {
      error:
        'Agrega las variables NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en Vercel para activar el envío de correos.',
    }
  }
}

/**
 * Server Action para Restablecer Contraseña
 */
export async function resetPasswordAction(
  prevState: AuthFormState | null,
  formData: FormData
): Promise<AuthFormState> {
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!password || password.length < 6) {
    return { error: 'La contraseña debe tener al menos 6 caracteres.' }
  }

  if (password !== confirmPassword) {
    return { error: 'Las contraseñas no coinciden.' }
  }

  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      return { error: error.message || 'Error al actualizar la contraseña.' }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard?message=Contraseña+actualizada+correctamente')
  } catch (err: any) {
    return { error: 'Error al conectar con Supabase.' }
  }
}
