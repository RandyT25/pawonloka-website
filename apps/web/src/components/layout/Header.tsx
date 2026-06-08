'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS, RESTAURANT, WHATSAPP_ORDER_URL } from '@/lib/constants'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const isTransparent = isHome && !isScrolled && !isMobileMenuOpen

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isTransparent
            ? 'bg-transparent'
            : 'bg-white/95 backdrop-blur-md shadow-warm-sm border-b border-warm-200/60'
        )}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center group"
              aria-label="PawonLoka - Kembali ke Beranda"
            >
              <Image
                src={isTransparent ? '/logo-dark.png' : '/logo.png'}
                alt="PawonLoka"
                width={160}
                height={64}
                className="h-12 w-auto transition-all duration-300"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Navigasi utama">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      'hover:bg-primary/8',
                      isTransparent
                        ? cn(
                            'text-white/85 hover:text-white hover:bg-white/15',
                            isActive && 'text-white bg-white/15'
                          )
                        : cn(
                            'text-warm-700 hover:text-primary',
                            isActive && 'text-primary bg-primary/8'
                          )
                    )}
                  >
                    {label}
                    {isActive && (
                      <span
                        className={cn(
                          'absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full',
                          isTransparent ? 'bg-white' : 'bg-primary'
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Right CTAs */}
            <div className="flex items-center gap-2">
              <a
                href={`tel:${RESTAURANT.phoneE164}`}
                className={cn(
                  'hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isTransparent
                    ? 'text-white/80 hover:text-white hover:bg-white/15'
                    : 'text-warm-600 hover:text-primary hover:bg-primary/8'
                )}
                aria-label="Hubungi kami via telepon"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">{RESTAURANT.phone}</span>
              </a>

              <a
                href={WHATSAPP_ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                  'cursor-pointer',
                  isTransparent
                    ? 'bg-white text-primary hover:bg-white/90'
                    : 'bg-primary text-white hover:bg-primary-600 shadow-warm-sm hover:shadow-warm'
                )}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Pesan Sekarang
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'lg:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 cursor-pointer',
                  isTransparent
                    ? 'text-white hover:bg-white/15'
                    : 'text-warm-700 hover:bg-warm-100'
                )}
                aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  )
}
