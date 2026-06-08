'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const [email, setEmail]               = useState('')
  const [password, setPassword]         = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading]           = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError]               = useState<string | null>(null)
  const router = useRouter()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message === 'Invalid login credentials'
        ? 'Email atau password salah. Silakan coba lagi.'
        : error.message)
      setLoading(false)
      return
    }
    router.push('/')
    router.refresh()
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) {
      setError(error.message)
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* ── LEFT BRAND PANEL ─────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between overflow-hidden bg-[#140A04]">

        {/* Layered warm gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(196,96,43,0.35) 0%, transparent 70%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 80%, rgba(139,68,20,0.25) 0%, transparent 65%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 40% 40% at 10% 90%, rgba(212,150,10,0.12) 0%, transparent 60%)' }} />
        </div>

        {/* Decorative batik-inspired SVG pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="batik" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="30" fill="none" stroke="#C4602B" strokeWidth="1"/>
              <circle cx="40" cy="40" r="20" fill="none" stroke="#C4602B" strokeWidth="0.8"/>
              <circle cx="40" cy="40" r="10" fill="none" stroke="#C4602B" strokeWidth="0.6"/>
              <circle cx="0"  cy="0"  r="6"  fill="none" stroke="#C4602B" strokeWidth="0.8"/>
              <circle cx="80" cy="0"  r="6"  fill="none" stroke="#C4602B" strokeWidth="0.8"/>
              <circle cx="0"  cy="80" r="6"  fill="none" stroke="#C4602B" strokeWidth="0.8"/>
              <circle cx="80" cy="80" r="6"  fill="none" stroke="#C4602B" strokeWidth="0.8"/>
              <line x1="10" y1="40" x2="30" y2="40" stroke="#C4602B" strokeWidth="0.5"/>
              <line x1="50" y1="40" x2="70" y2="40" stroke="#C4602B" strokeWidth="0.5"/>
              <line x1="40" y1="10" x2="40" y2="30" stroke="#C4602B" strokeWidth="0.5"/>
              <line x1="40" y1="50" x2="40" y2="70" stroke="#C4602B" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#batik)"/>
        </svg>

        {/* Top: Logo */}
        <div className="relative z-10 p-10">
          <div className="flex items-center gap-3">
            <Image src="/logo-dark.png" alt="PawonLoka" width={120} height={48}
              className="h-12 w-auto" priority />
            <span className="text-white/30 text-xs tracking-widest uppercase border-l border-white/20 pl-3">Admin Panel</span>
          </div>
        </div>

        {/* Center: Hero text */}
        <div className="relative z-10 px-10 py-8">
          {/* Decorative line */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary/60" />
            <span className="text-primary/80 text-xs tracking-[0.2em] uppercase font-medium">Dapur Digital Anda</span>
          </div>

          <h1 className="font-display font-bold text-white text-4xl leading-[1.15] mb-4">
            Kelola Menu &<br />
            <span className="text-primary">Konten Website</span><br />
            dengan Mudah
          </h1>

          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Perbarui menu, galeri, jam operasional, dan pengaturan restoran Anda dari satu tempat.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 mt-6">
            {['Menu & Harga', 'Galeri Foto', 'Jam Operasional', 'SEO'].map(f => (
              <span key={f}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/8 text-white/60 border border-white/10">
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom: Quote */}
        <div className="relative z-10 p-10 border-t border-white/8">
          <blockquote className="text-white/40 text-sm italic leading-relaxed">
            &ldquo;Cita rasa masakan Indonesia yang hangat dan autentik.&rdquo;
          </blockquote>
          <p className="text-white/25 text-xs mt-2">— PawonLoka, Citra Indah City</p>
        </div>
      </div>

      {/* ── RIGHT FORM PANEL ─────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center bg-[#FDFAF7] px-6 py-12 sm:px-12">

        {/* Mobile logo */}
        <div className="flex flex-col items-center gap-1 mb-10 lg:hidden">
          <Image src="/logo.png" alt="PawonLoka" width={140} height={56} className="h-14 w-auto" priority />
          <span className="text-[#B09D8E] text-xs tracking-widest uppercase">Admin Panel</span>
        </div>

        <div className="w-full max-w-[400px]">

          {/* Heading */}
          <div className="mb-8">
            <h2 className="font-display font-bold text-[#1A0F0A] text-3xl mb-2">Selamat Datang</h2>
            <p className="text-[#7B6A5C] text-sm">Masuk untuk mengelola konten PawonLoka</p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl p-3.5 mb-5"
              role="alert">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" aria-hidden="true" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-[#E8DDD5] rounded-xl text-[#3D2F25] text-sm font-medium shadow-sm hover:bg-[#FDF8F5] hover:border-[#C4602B]/30 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {googleLoading ? (
              <span className="w-4 h-4 border-2 border-gray-300 border-t-[#C4602B] rounded-full animate-spin" aria-hidden="true" />
            ) : (
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-label="Google" role="img">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            Masuk dengan Google
          </button>

          {/* Divider */}
          <div className="relative flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-[#E8DDD5]" aria-hidden="true" />
            <span className="text-xs text-[#B09D8E]">atau</span>
            <div className="flex-1 h-px bg-[#E8DDD5]" aria-hidden="true" />
          </div>

          {/* Email form */}
          <form onSubmit={handleEmailLogin} className="space-y-4" noValidate>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#3D2F25] mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B09D8E]"
                  aria-hidden="true" />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@pawonloka.com"
                  className={cn(
                    'w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-[#1A0F0A] text-sm',
                    'placeholder:text-[#C9B8AC] border-[#E8DDD5]',
                    'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                    'transition-all duration-200'
                  )}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#3D2F25] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B09D8E]"
                  aria-hidden="true" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={cn(
                    'w-full pl-10 pr-12 py-3 bg-white border rounded-xl text-[#1A0F0A] text-sm',
                    'placeholder:text-[#C9B8AC] border-[#E8DDD5]',
                    'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                    'transition-all duration-200'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B09D8E] hover:text-[#7B6A5C] transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showPassword
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading || !email || !password}
              className={cn(
                'w-full py-3 mt-1 rounded-xl font-semibold text-sm text-white',
                'bg-primary hover:bg-primary-600 active:bg-primary-700',
                'shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30',
                'focus:outline-none focus:ring-2 focus:ring-primary/40',
                'transition-all duration-200 cursor-pointer',
                'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none'
              )}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                    aria-hidden="true" />
                  Masuk...
                </span>
              ) : 'Masuk'}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-[#B09D8E] text-xs mt-8">
            Akses terbatas &middot; PawonLoka Admin {new Date().getFullYear()}
          </p>
        </div>
      </div>

    </div>
  )
}
