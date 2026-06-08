import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta', display: 'swap', weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: { default: 'PawonLoka Admin', template: '%s | PawonLoka Admin' },
  description: 'Admin dashboard untuk manajemen konten PawonLoka',
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
