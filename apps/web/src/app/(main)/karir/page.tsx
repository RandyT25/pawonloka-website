import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Karir',
  description: 'Bergabunglah dengan tim PawonLoka. Lowongan kerja dan peluang karir di restoran keluarga Indonesia terbaik.',
  robots: { index: false },
}

export default function KarirPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-20 bg-warm-50">
      <div className="container-narrow text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
          <span className="text-primary text-sm font-medium">Segera Hadir</span>
        </div>
        <h1 className="font-display font-bold text-display-lg text-warm-900 mb-5">
          Halaman Karir
        </h1>
        <p className="text-warm-500 text-lg max-w-md mx-auto mb-8">
          Kami sedang menyiapkan halaman karir yang lengkap. Untuk informasi lowongan saat ini, hubungi kami via WhatsApp.
        </p>
        <Link href="/kontak" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors cursor-pointer">
          Hubungi Kami
        </Link>
      </div>
    </div>
  )
}
