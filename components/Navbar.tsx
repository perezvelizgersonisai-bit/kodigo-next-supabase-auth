import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { signOutAction } from '@/app/actions/auth'
import { ShieldCheck, LogOut, LayoutDashboard, LogIn, UserPlus, Lock } from 'lucide-react'

export async function Navbar() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-900/30 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-bold group-hover:scale-105 transition-transform shadow-md shadow-emerald-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-slate-100 tracking-tight flex items-center gap-1.5">
              Kodigo <span className="text-emerald-400 font-extrabold text-sm px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30">Auth Security</span>
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" /> Cookies httpOnly SSR
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-emerald-300 hover:text-white hover:bg-emerald-950/50 border border-emerald-800/40 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-rose-300 hover:text-white hover:bg-rose-950/40 border border-rose-900/40 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Cerrar Sesión</span>
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Iniciar Sesión</span>
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all shadow-md shadow-emerald-500/20"
              >
                <UserPlus className="w-4 h-4" />
                <span>Registrarse</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
