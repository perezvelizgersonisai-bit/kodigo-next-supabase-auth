import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import {
  ShieldCheck,
  Lock,
  Cookie,
  Server,
  UserCheck,
  KeyRound,
  ArrowRight,
  Code2,
  CheckCircle,
  ExternalLink,
} from 'lucide-react'

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-[85vh] flex flex-col justify-center">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-8 shadow-lg shadow-emerald-500/10">
          <ShieldCheck className="w-4 h-4" /> KODIGO — Seguridad de Autenticación en Next.js
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight">
          Protección de Sesión Avanzada con{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Cookies httpOnly
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Aplicación profesional desarrollada en Next.js 15 (App Router) con Supabase Auth SSR, Server Actions, Middleware de protección de rutas y mitigación contra ataques XSS y CSRF.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {user ? (
            <Link
              href="/dashboard"
              className="px-6 py-3.5 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-2"
            >
              <span>Ir al Dashboard Protegido</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <>
              <Link
                href="/signup"
                className="px-6 py-3.5 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-2"
              >
                <span>Crear Cuenta Gratis</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/login"
                className="px-6 py-3.5 rounded-2xl font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all flex items-center gap-2"
              >
                <span>Iniciar Sesión</span>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
            <div className="p-3.5 rounded-2xl bg-emerald-950/80 text-emerald-400 w-fit mb-6 border border-emerald-500/20">
              <Cookie className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3">Cookies httpOnly</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Los tokens de sesión de Supabase no se exponen en <code className="text-emerald-400 font-mono">localStorage</code>. Son gestionados exclusivamente por el servidor HTTP con banderas de máxima seguridad.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
            <div className="p-3.5 rounded-2xl bg-emerald-950/80 text-emerald-400 w-fit mb-6 border border-emerald-500/20">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3">Server Actions</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Formularios procesados al 100% en el servidor (<code className="text-emerald-400 font-mono">use server</code>) con validación de datos estricta y control de respuestas seguras.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
            <div className="p-3.5 rounded-2xl bg-emerald-950/80 text-emerald-400 w-fit mb-6 border border-emerald-500/20">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3">Middleware de Protección</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Intercepta cualquier intento de acceso no autorizado a rutas privadas como <code className="text-emerald-400 font-mono">/dashboard</code> y redirige dinámicamente.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Specifications */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 sm:p-12 backdrop-blur-xl">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 flex items-center gap-3">
              <Code2 className="w-8 h-8 text-emerald-400" /> Especificaciones del Stack Tecnológico
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Cumplimiento completo de los estándares evaluados en la actividad de Kodigo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-300">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span><strong>Next.js 15+</strong> con App Router</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span><strong>Supabase Auth + SSR</strong> (`@supabase/ssr`)</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span><strong>TypeScript</strong> con tipado estricto</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span><strong>Server Actions</strong> (`app/actions/auth.ts`)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
