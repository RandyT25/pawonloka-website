import Link from 'next/link'
import { ArrowRight, Heart, Leaf, Users, Star } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Keramahan Hangat',
    description: 'Setiap tamu disambut seperti keluarga sendiri dengan senyum tulus.',
  },
  {
    icon: Leaf,
    title: 'Bahan Pilihan',
    description: 'Bahan-bahan segar dipilih setiap hari untuk menjaga kualitas rasa.',
  },
  {
    icon: Users,
    title: 'Untuk Semua',
    description: 'Menu terjangkau yang dapat dinikmati seluruh lapisan masyarakat.',
  },
  {
    icon: Star,
    title: 'Konsisten',
    description: 'Rasa yang sama lezatnya di setiap kunjungan, setiap harinya.',
  },
]

export function AboutPreviewSection() {
  return (
    <section className="section-padding bg-white" aria-labelledby="about-heading">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Visual */}
          <div className="relative order-2 lg:order-1">
            {/* Main card */}
            <div
              className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:max-w-none"
              style={{
                background: `
                  radial-gradient(ellipse at 30% 30%, rgba(196, 96, 43, 0.6) 0%, transparent 60%),
                  radial-gradient(ellipse at 70% 70%, rgba(139, 105, 20, 0.4) 0%, transparent 50%),
                  linear-gradient(145deg, #2A1A0C 0%, #1A1209 100%)
                `,
              }}
            >
              {/* Decorative elements */}
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <div className="text-center text-white/10 select-none">
                  <p className="font-display text-8xl font-bold tracking-tight leading-none">Pawon</p>
                  <p className="font-display text-8xl font-bold tracking-tight leading-none">Loka</p>
                </div>
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <blockquote className="text-white/90">
                  <p className="font-display text-2xl font-semibold leading-snug mb-4">
                    "Pawon" berarti dapur,<br />
                    "Loka" berarti tempat berkumpul.
                  </p>
                  <footer className="text-primary-300 text-sm font-medium">
                    — Filosofi PawonLoka
                  </footer>
                </blockquote>
              </div>
            </div>

            {/* Floating stat card */}
            <div
              className="absolute -top-4 -right-4 lg:right-0 xl:-right-8 bg-white rounded-2xl p-5 w-44"
              style={{ boxShadow: '0 0 32px rgba(0,0,0,0.14)' }}
              aria-label="Didirikan 2025, berlokasi di Citra Indah City"
            >
              <p className="font-display font-bold text-3xl text-warm-900 leading-none">2025</p>
              <p className="text-sm text-warm-500 mt-1">Berdiri sejak</p>
              <p className="text-sm font-semibold text-primary mt-0.5">Citra Indah City</p>
              <div className="mt-3 flex gap-0.5" aria-label="Rating 5 bintang" role="img">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-[#FBBF24] fill-current" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div className="order-1 lg:order-2">
            <p className="section-label mb-4">Tentang Kami</p>
            <h2 id="about-heading" className="font-display font-bold text-display-lg text-warm-900 text-balance mb-6">
              Lebih dari Sekadar<br />
              <span className="text-primary">Tempat Makan</span>
            </h2>
            <div className="space-y-4 text-warm-600 leading-relaxed mb-8">
              <p>
                PawonLoka lahir dari kecintaan mendalam terhadap masakan Indonesia yang hangat dan autentik.
                Nama kami merangkum seluruh filosofi kami: <span className="text-warm-800 font-medium">Pawon</span> (dapur tradisional)
                dan <span className="text-warm-800 font-medium">Loka</span> (tempat berkumpul) — sebuah tempat di mana makanan
                menjadi jembatan antar hati.
              </p>
              <p>
                Berlokasi di Citra Indah City, Jonggol, kami hadir untuk keluarga, sahabat, dan komunitas sekitar
                dengan menu-menu yang terinspirasi dari kekayaan cita rasa nusantara.
              </p>
            </div>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {values.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex gap-3 items-start">
                  <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-warm-800 text-sm mb-0.5">{title}</p>
                    <p className="text-xs text-warm-500 leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/tentang"
              className="inline-flex items-center gap-2 px-6 py-3 bg-warm-900 text-white rounded-xl font-semibold hover:bg-warm-800 transition-colors cursor-pointer"
            >
              Baca Cerita Kami
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
