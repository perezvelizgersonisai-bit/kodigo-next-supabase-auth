'use client'

import { useActionState } from 'react'
import { loginAction } from '@/app/actions/auth'
import { SubmitButton } from '@/components/SubmitButton'
import Link from 'next/link'
import { ShieldCheck, Mail, Lock, AlertCircle, ArrowRight, KeyRound } from 'lucide-react'

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, null)

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-emerald-950/30">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 mb-4 shadow-lg shadow-emerald-500/10">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Iniciar Sesión</h1>
          <p className="text-sm text-slate-400 mt-2">
            Ingresa a tu cuenta protegida con cookies <code className="text-emerald-400 font-mono">httpOnly</code>.
          </p>
        </div>

        {state?.error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-950/60 border border-rose-800/60 flex items-start gap-3 text-rose-300 text-sm animate-in fade-in slide-in-from-top-2 duration-200">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-rose-200">Error de Autenticación</p>
              <p className="mt-0.5 text-xs text-rose-300/90">{state.error}</p>
            </div>
          </div>
        )}

        <form action={formAction} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-500" />
              <input
                name="email"
                type="email"
                required
                placeholder="usuario@ejemplo.com"
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Contraseña
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
              >
                <KeyRound className="w-3 h-3" /> ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-500" />
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm transition-all"
              />
            </div>
          </div>

          <SubmitButton pendingText="Iniciando sesión...">
            <span>Iniciar Sesión</span>
            <ArrowRight className="w-4 h-4" />
          </SubmitButton>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
          <p className="text-sm text-slate-400">
            ¿No tienes una cuenta?{' '}
            <Link
              href="/signup"
              className="font-semibold text-emerald-400 hover:text-emerald-300 hover:underline transition-colors"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
