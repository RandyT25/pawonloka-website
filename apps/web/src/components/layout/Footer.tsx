import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react'
import { BUSINESS_HOURS, NAV_LINKS, RESTAURANT } from '@/lib/constants'

const LEGAL_LINKS = [
  { href: '/kebijakan-privasi', label: 'Kebijakan Privasi' },
  { href: '/syarat-ketentuan', label: 'Syarat & Ketentuan' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-warm-900 text-warm-300" role="contentinfo">
      {/* Main Footer */}
      <div className="container-wide section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5 group">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/logo-dark.png`}
                alt="PawonLoka"
                width={160}
                height={64}
                className="h-14 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-200"
              />
            </Link>
            <p className="text-sm leading-relaxed text-warm-400 mb-6">
              Warung hangat tempat keluarga dan sahabat berkumpul menikmati cita rasa masakan Indonesia yang autentik dan menghangatkan hati.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href={RESTAURANT.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-warm-800 text-warm-400 hover:bg-primary/20 hover:text-primary transition-all duration-200 cursor-pointer"
                aria-label="Instagram PawonLoka"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={RESTAURANT.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-warm-800 text-warm-400 hover:bg-primary/20 hover:text-primary transition-all duration-200 cursor-pointer"
                aria-label="Facebook PawonLoka"
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={RESTAURANT.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-warm-800 text-warm-400 hover:bg-primary/20 hover:text-primary transition-all duration-200 cursor-pointer"
                aria-label="TikTok PawonLoka"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.15 8.15 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm tracking-wide uppercase">Navigasi</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-warm-400 hover:text-primary transition-colors duration-150 cursor-pointer"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Jam Operasional */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm tracking-wide uppercase flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
              Jam Buka
            </h3>
            <ul className="space-y-2">
              {BUSINESS_HOURS.map(({ day, open, close, isOpen }) => (
                <li key={day} className="flex items-center justify-between text-sm">
                  <span className="text-warm-400">{day}</span>
                  {isOpen ? (
                    <span className="text-warm-300 font-medium tabular-nums">
                      {open} – {close}
                    </span>
                  ) : (
                    <span className="text-warm-600 italic">Tutup</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm tracking-wide uppercase">Kontak</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${RESTAURANT.phoneE164}`}
                  className="flex items-start gap-3 text-sm text-warm-400 hover:text-primary transition-colors cursor-pointer group"
                >
                  <Phone className="w-4 h-4 mt-0.5 shrink-0 group-hover:text-primary" aria-hidden="true" />
                  <span>{RESTAURANT.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={RESTAURANT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-warm-400 hover:text-primary transition-colors cursor-pointer group"
                >
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 group-hover:text-primary" aria-hidden="true" />
                  <span className="leading-relaxed">{RESTAURANT.address.full}</span>
                </a>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href={RESTAURANT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-warm-800">
        <div className="container-wide py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-warm-600">
            <p>© {currentYear} PawonLoka. Dibuat dengan ❤️ untuk keluarga Indonesia.</p>
            <div className="flex items-center gap-4">
              {LEGAL_LINKS.map(({ href, label }) => (
                <Link key={href} href={href} className="hover:text-warm-400 transition-colors cursor-pointer">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
