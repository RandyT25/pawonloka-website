'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, MapPin, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS, RESTAURANT, WHATSAPP_ORDER_URL } from '@/lib/constants'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstLinkRef.current?.focus(), 100)
    }
  }, [isOpen])

  return (
    <div
      id="mobile-menu"
      className={cn(
        'fixed inset-0 z-40 lg:hidden transition-all duration-300',
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Menu navigasi mobile"
    >
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-warm-900/50 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={cn(
          'absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-warm-xl transition-transform duration-300 ease-out flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-warm-100">
          <div>
            <p className="font-display font-bold text-warm-900">PawonLoka</p>
            <p className="text-xs text-warm-500">Warung Hangat Citra Indah City</p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-warm-100 text-warm-600 hover:bg-warm-200 transition-colors cursor-pointer"
            aria-label="Tutup menu"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1" aria-label="Navigasi mobile">
          {NAV_LINKS.map(({ href, label }, index) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                ref={index === 0 ? firstLinkRef : undefined}
                onClick={onClose}
                className={cn(
                  'flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-150 cursor-pointer',
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-warm-800 hover:bg-warm-100 hover:text-primary'
                )}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Contact Info */}
        <div className="px-6 py-4 border-t border-warm-100 space-y-3">
          <div className="flex items-start gap-3 text-sm text-warm-600">
            <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
            <span className="leading-relaxed">{RESTAURANT.address.full}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-warm-600">
            <Clock className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
            <span>Senin–Jumat 16:00–23:00, Sabtu–Minggu 12:00–00:00</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="px-4 pb-8 pt-3 space-y-2">
          <a
            href={WHATSAPP_ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-primary text-white rounded-xl font-semibold text-sm transition-all duration-200 hover:bg-primary-600 cursor-pointer"
          >
            <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Pesan via WhatsApp
          </a>
          <a
            href={`tel:${RESTAURANT.phoneE164}`}
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3.5 border border-warm-200 text-warm-700 rounded-xl font-medium text-sm transition-all duration-200 hover:bg-warm-50 cursor-pointer"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            {RESTAURANT.phone}
          </a>
        </div>
      </div>
    </div>
  )
}
