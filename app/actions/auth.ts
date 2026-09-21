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

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message || 'Credenciales inválidas. Por favor intenta de nuevo.' }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
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
}

/**
 * Server Action para Cierre de Sesión (Sign Out)
 */
export async function signOutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
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

  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reset-password`,
  })

  if (error) {
    return { error: error.message || 'No se pudo enviar el correo de recuperación.' }
  }

  return {
    success: 'Se ha enviado un enlace de recuperación a tu correo electrónico.',
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

  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    return { error: error.message || 'Error al actualizar la contraseña.' }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard?message=Contraseña+actualizada+correctamente')
}
