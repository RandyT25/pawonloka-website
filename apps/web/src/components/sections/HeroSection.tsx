'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MapPin, ChevronDown } from 'lucide-react'
import { RESTAURANT, WHATSAPP_ORDER_URL, getIsOpenNow } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function HeroSection() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null)

  useEffect(() => {
    const check = () => setIsOpen(getIsOpenNow())
    check()
    const interval = setInterval(check, 60_000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Warm cinematic gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 25% 60%, rgba(196, 96, 43, 0.75) 0%, transparent 55%),
              radial-gradient(ellipse at 75% 20%, rgba(139, 105, 20, 0.5) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 100%, rgba(26, 18, 9, 0.9) 0%, transparent 60%),
              linear-gradient(160deg, #0D0905 0%, #2A1A0C 40%, #1A1209 100%)
            `,
          }}
        />

        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Warm vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(13,9,5,0.6) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide w-full pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-7 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {isOpen !== null && (
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2">
                <span
                  className={cn(
                    'w-2 h-2 rounded-full',
                    isOpen
                      ? 'bg-[#4ADE80] shadow-[0_0_6px_rgba(74,222,128,0.8)]'
                      : 'bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.8)]'
                  )}
                  aria-hidden="true"
                />
                <span className="text-white/85 text-sm font-medium">
                  {isOpen ? 'Buka Sekarang' : 'Sedang Tutup'}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-white/70 text-sm">
              <svg className="w-3.5 h-3.5 text-[#FBBF24] fill-current" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{RESTAURANT.googleRating} Rating · {RESTAURANT.reviewCount} Ulasan</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1
            id="hero-heading"
            className="font-display font-bold text-display-2xl text-white leading-[1.04] tracking-[-0.03em] text-balance mb-6 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            Warung Hangat<br />
            <span className="text-primary-300">untuk Keluarga</span><br />
            dan Sahabat
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl md:text-2xl text-white/70 font-light leading-relaxed max-w-xl mb-10 animate-fade-in text-pretty"
            style={{ animationDelay: '0.35s' }}
          >
            Cita rasa masakan Indonesia yang autentik dan menghangatkan hati, di jantung Citra Indah City.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap items-center gap-3 md:gap-4 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            {/* Primary: WhatsApp */}
            <a
              href={WHATSAPP_ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'group flex items-center gap-2.5 px-6 py-3.5 bg-primary text-white rounded-xl font-semibold text-base',
                'hover:bg-primary-600 active:scale-[0.98]',
                'shadow-[0_4px_20px_rgba(196,96,43,0.4)] hover:shadow-[0_6px_28px_rgba(196,96,43,0.5)]',
                'transition-all duration-200 cursor-pointer'
              )}
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Pesan via WhatsApp</span>
            </a>

            {/* Secondary: Menu */}
            <Link
              href="/menu"
              className={cn(
                'flex items-center gap-2 px-6 py-3.5 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-medium text-base',
                'hover:bg-white/20 hover:border-white/30 active:scale-[0.98]',
                'transition-all duration-200 cursor-pointer'
              )}
            >
              Lihat Menu
            </Link>

            {/* Tertiary: Direction */}
            <a
              href={RESTAURANT.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center gap-2 px-5 py-3.5 text-white/70 rounded-xl font-medium text-base',
                'hover:text-white hover:bg-white/10 active:scale-[0.98]',
                'transition-all duration-200 cursor-pointer'
              )}
              aria-label="Petunjuk arah ke PawonLoka"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              Petunjuk Arah
            </a>
          </div>

          {/* Location pill */}
          <div
            className="flex items-center gap-2 mt-10 animate-fade-in"
            style={{ animationDelay: '0.65s' }}
          >
            <MapPin className="w-3.5 h-3.5 text-primary-300 shrink-0" aria-hidden="true" />
            <span className="text-sm text-white/50">
              {RESTAURANT.address.street}, {RESTAURANT.address.district}, {RESTAURANT.address.city}
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors cursor-pointer animate-fade-in"
        style={{ animationDelay: '1s' }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        aria-label="Scroll ke bawah"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" aria-hidden="true" />
      </button>
    </section>
  )
}
