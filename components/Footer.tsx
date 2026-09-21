import { ShieldAlert, Cookie, KeyRound, Globe } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-slate-200 font-bold mb-3 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-emerald-400" /> KODIGO — Seguridad Web Moderna
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Proyecto práctico enfocado en implementar capas de seguridad a nivel de servidor, tokens httpOnly, mitigación XSS/CSRF y SSR con Next.js y Supabase.
            </p>
          </div>
          <div>
            <h4 className="text-slate-300 font-semibold mb-3 flex items-center gap-2 text-sm">
              <Cookie className="w-4 h-4 text-emerald-400" /> Banderas de Seguridad Activas
            </h4>
            <ul className="text-xs space-y-1.5 text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Cookie Flag: <code className="text-emerald-300">httpOnly</code> (No JS access)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Cookie Flag: <code className="text-emerald-300">SameSite=Lax</code> (CSRF protection)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Cookie Flag: <code className="text-emerald-300">Secure</code> (HTTPS enforcement)
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-300 font-semibold mb-3 flex items-center gap-2 text-sm">
              <KeyRound className="w-4 h-4 text-emerald-400" /> Arquitectura del Sistema
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              Next.js 15 (App Router) + Supabase SSR Clients (`@supabase/ssr`).
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <Globe className="w-3.5 h-3.5" /> Next.js Middleware Active
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} KODIGO. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Desarrollado para la evaluación de <span className="text-slate-300 font-medium">Seguridad Web con Next.js & Supabase</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
