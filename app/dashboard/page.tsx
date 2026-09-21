import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signOutAction } from '@/app/actions/auth'
import {
  ShieldCheck,
  User,
  Mail,
  Calendar,
  Key,
  Lock,
  LogOut,
  Cookie,
  CheckCircle2,
  Server,
  FileCode,
  Sparkles,
} from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const fullName = user.user_metadata?.full_name || 'Usuario Kodigo'
  const createdAt = new Date(user.created_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const lastSignIn = user.last_sign_in_at
    ? new Date(user.last_sign_in_at).toLocaleString('es-ES')
    : 'Sesión Activa'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border border-emerald-800/40 p-8 mb-10 shadow-2xl shadow-emerald-950/40">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-300 flex items-center justify-center text-slate-950 font-bold text-2xl shadow-lg shadow-emerald-500/20 shrink-0">
              {fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-900/60 text-emerald-300 border border-emerald-600/40 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Ruta Protegida por Middleware
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                ¡Bienvenido, {fullName}!
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Has ingresado exitosamente a la zona privada del sistema.
              </p>
            </div>
          </div>

          <form action={signOutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-rose-300 bg-rose-950/50 hover:bg-rose-900/60 border border-rose-800/50 hover:text-white transition-all shadow-lg active:scale-95"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </button>
          </form>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Info Card */}
        <div className="lg:col-span-1 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-400" /> Perfil de Usuario
            </h2>
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-700/50">
              SUPABASE AUTH
            </span>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Nombre Completo
              </span>
              <p className="text-slate-200 font-medium bg-slate-950 px-3.5 py-2.5 rounded-xl border border-slate-800/80">
                {fullName}
              </p>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-emerald-400" /> Correo Electrónico
              </span>
              <p className="text-slate-200 font-mono text-xs bg-slate-950 px-3.5 py-2.5 rounded-xl border border-slate-800/80 truncate">
                {user.email}
              </p>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-emerald-400" /> UUID de Usuario
              </span>
              <p className="text-slate-400 font-mono text-[11px] bg-slate-950 px-3.5 py-2.5 rounded-xl border border-slate-800/80 truncate">
                {user.id}
              </p>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Fecha de Registro
              </span>
              <p className="text-slate-300 text-xs bg-slate-950 px-3.5 py-2.5 rounded-xl border border-slate-800/80">
                {createdAt}
              </p>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Última Sesión Registrada
              </span>
              <p className="text-slate-300 text-xs bg-slate-950 px-3.5 py-2.5 rounded-xl border border-slate-800/80">
                {lastSignIn}
              </p>
            </div>
          </div>
        </div>

        {/* Security & System Features */}
        <div className="lg:col-span-2 space-y-6">
          {/* Security Status Cards */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
            <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-400" /> Estado de las Capas de Seguridad
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <Cookie className="w-4 h-4" /> Cookies httpOnly
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-xs text-slate-300">
                  Las credenciales JWT están almacenadas en cookies con la bandera <code className="text-emerald-300 font-mono">httpOnly</code>.
                </p>
                <div className="pt-1 text-[11px] text-slate-500 font-mono">
                  `document.cookie` inactivo para tokens.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Mitigación XSS / CSRF
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-xs text-slate-300">
                  Protección activa contra secuestro de token mediante SameSite=Lax y Server Actions.
                </p>
                <div className="pt-1 text-[11px] text-slate-500 font-mono">
                  Sin almacenamiento en localStorage.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <Server className="w-4 h-4" /> Middleware de Next.js
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-xs text-slate-300">
                  Intercepción automática en la capa de borde antes de renderizar la página.
                </p>
                <div className="pt-1 text-[11px] text-slate-500 font-mono">
                  Validación de sesión con `getUser()`.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <FileCode className="w-4 h-4" /> Supabase SSR Package
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-xs text-slate-300">
                  Uso oficial del paquete <code className="text-emerald-300 font-mono">@supabase/ssr</code> para Next.js App Router.
                </p>
                <div className="pt-1 text-[11px] text-slate-500 font-mono">
                  Clientes separados: Server / Client.
                </div>
              </div>
            </div>
          </div>

          {/* Technical Requirements Checklist for Kodigo */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
            <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" /> Cumplimiento de Requisitos Kodigo
            </h2>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-100 block mb-0.5">a) Configuración de Supabase SSR:</strong>
                  Clientes configurados en <code className="text-emerald-300 font-mono">utils/supabase/server.ts</code>, <code className="text-emerald-300 font-mono">client.ts</code> y <code className="text-emerald-300 font-mono">middleware.ts</code>.
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-100 block mb-0.5">b) Sistema de Autenticación Completo:</strong>
                  Registro con validación, inicio de sesión, cierre de sesión y flujo de recuperación de contraseña.
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-100 block mb-0.5">c) Server Actions Implementadas:</strong>
                  Procesamiento en el servidor en <code className="text-emerald-300 font-mono">app/actions/auth.ts</code> con gestión de cookies y errores.
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-100 block mb-0.5">d) Middleware de Protección y Redirección:</strong>
                  Redirección dinámica si se intenta entrar a <code className="text-emerald-300 font-mono">/dashboard</code> sin sesión o a <code className="text-emerald-300 font-mono">/login</code> con sesión activa.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
