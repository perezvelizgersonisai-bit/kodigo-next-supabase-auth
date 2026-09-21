import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: 'Kodigo — Autenticación Segura con Supabase y Cookies httpOnly en Next.js',
  description:
    'Proyecto práctico de seguridad web moderna. Implementación de Supabase Auth SSR, Server Actions, Middleware de protección y cookies httpOnly en Next.js App Router.',
  keywords: [
    'Next.js',
    'Supabase',
    'httpOnly cookies',
    'Authentication',
    'Server Actions',
    'Middleware',
    'Security',
    'XSS Protection',
    'CSRF Protection',
    'Kodigo',
  ],
  authors: [{ name: 'Kodigo Student' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${outfit.variable} dark scroll-smooth`}>
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
