import type { Metadata } from 'next'
import { Heart, Leaf, Users, Star, Target, Lightbulb } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description:
    'Kisah di balik PawonLoka – warung hangat keluarga Indonesia di Citra Indah City, Jonggol. Temukan filosofi, visi, misi, dan nilai-nilai kami.',
  alternates: { canonical: `${SITE_URL}/tentang` },
}

const values = [
  { icon: Heart, title: 'Keramahan Hangat', description: 'Setiap tamu adalah keluarga yang disambut dengan senyum tulus dan pelayanan dari hati.' },
  { icon: Leaf, title: 'Warisan Indonesia', description: 'Resep dan teknik memasak yang terinspirasi dari kekayaan kuliner nusantara.' },
  { icon: Star, title: 'Makanan Jujur', description: 'Bahan segar, tanpa pengawet, dengan rasa asli yang apa adanya—jujur dari dapur ke meja.' },
  { icon: Users, title: 'Keluarga & Komunitas', description: 'Kami percaya makanan mempererat hubungan. PawonLoka adalah tempat berkumpul untuk semua.' },
  { icon: Target, title: 'Konsistensi', description: 'Rasa yang sama lezatnya setiap hari. Kualitas adalah janji kami kepada setiap pelanggan.' },
  { icon: Lightbulb, title: 'Pertumbuhan', description: 'Terus berinovasi dalam menu, layanan, dan pengalaman untuk memberikan yang terbaik.' },
]

const milestones = [
  { year: 'Jan 2025', event: 'Grand Opening PawonLoka di Citra Indah City, Jonggol — menyambut keluarga dan komunitas lokal dengan menu penuh cinta.' },
  { year: 'Mar 2025', event: 'Respons luar biasa dari komunitas. Rating perdana 4.8 di Google Maps dengan puluhan ulasan bintang 5 dalam bulan-bulan pertama.' },
  { year: 'Jun 2025', event: 'Menu berkembang pesat — kini lebih dari 40 pilihan dari Hidangan Utama, Nasi & Mie, hingga Gen-Z Special.' },
  { year: '2026+', event: 'Komunitas pelanggan setia terus bertumbuh. Fondasi kuat untuk terus berinovasi dan membawa kehangatan PawonLoka lebih jauh.' },
]

export default function TentangPage() {
  return (
    <>
      {/* Page Header */}
      <div className="pt-32 pb-16 bg-warm-50">
        <div className="container-wide">
          <p className="section-label mb-4">Tentang PawonLoka</p>
          <h1 className="font-display font-bold text-display-xl text-warm-900 text-balance max-w-2xl">
            Dapur Hangat yang<br />
            <span className="text-primary">Menyatukan Hati</span>
          </h1>
          <p className="mt-6 text-lg text-warm-600 max-w-xl leading-relaxed text-pretty">
            Dari sebuah dapur kecil yang penuh cinta, PawonLoka hadir membawa cita rasa
            masakan Indonesia yang autentik ke meja keluarga Anda.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <section className="section-padding bg-white" aria-labelledby="story-heading">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="story-heading" className="font-display font-bold text-display-md text-warm-900 mb-6">
                Kisah di Balik Nama
              </h2>
              <div className="space-y-5 text-warm-600 leading-relaxed">
                <p>
                  <span className="font-semibold text-warm-800">Pawon</span> dalam bahasa Jawa berarti dapur—tempat di mana kehangatan
                  tercipta, di mana bumbu-bumbu nusantara bertemu, dan di mana masakan ibu selalu terasa
                  paling istimewa. <span className="font-semibold text-warm-800">Loka</span> berarti tempat atau dunia,
                  sebuah ruang untuk berkumpul dan berbagi.
                </p>
                <p>
                  PawonLoka lahir dari keyakinan sederhana: bahwa makanan yang baik memiliki kekuatan untuk
                  menyatukan orang. Di tengah kesibukan modern, kami ingin menjadi tempat di mana keluarga
                  bisa duduk bersama, menikmati hidangan yang hangat, dan menciptakan kenangan indah.
                </p>
                <p>
                  Berlokasi di kawasan Citra Indah City, Jonggol, kami melayani keluarga, pasangan, pekerja,
                  dan komunitas lokal dengan menu-menu yang terinspirasi dari kekayaan kuliner nusantara—
                  dari nasi goreng yang legendaris hingga ayam bakar yang meresap bumbunya.
                </p>
                <p>
                  Masa depan PawonLoka adalah menjadi jaringan restoran keluarga Indonesia yang bisa dirasakan
                  di berbagai kota, membawa kehangatan pawon (dapur) ke setiap pelosok Indonesia.
                </p>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div
                className="rounded-3xl overflow-hidden aspect-square max-w-md mx-auto lg:max-w-none"
                style={{
                  background: `
                    radial-gradient(ellipse at 30% 30%, rgba(196, 96, 43, 0.7) 0%, transparent 55%),
                    radial-gradient(ellipse at 70% 70%, rgba(212, 168, 75, 0.4) 0%, transparent 50%),
                    linear-gradient(145deg, #1A1209 0%, #3A2E1E 100%)
                  `,
                }}
                aria-hidden="true"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
                  <p className="font-display text-white/15 font-bold text-7xl leading-tight select-none">PL</p>
                  <div className="mt-6 space-y-3">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/10">
                      <p className="text-3xl font-display font-bold text-white">Pawon</p>
                      <p className="text-sm text-white/60 mt-1">Dapur Tradisional</p>
                    </div>
                    <div className="text-primary-300 text-2xl font-display">+</div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/10">
                      <p className="text-3xl font-display font-bold text-white">Loka</p>
                      <p className="text-sm text-white/60 mt-1">Tempat Berkumpul</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-warm-50" aria-labelledby="mission-heading">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 border border-warm-100 shadow-warm-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <h2 id="mission-heading" className="font-display font-bold text-display-sm text-warm-900 mb-4">Misi Kami</h2>
              <p className="text-warm-600 leading-relaxed">
                Menyajikan masakan Indonesia yang autentik, bergizi, dan terjangkau dalam suasana hangat
                yang menjadikan setiap kunjungan sebagai pengalaman bersama yang tak terlupakan.
                Kami berkomitmen untuk mempertahankan cita rasa nusantara di setiap hidangan.
              </p>
            </div>
            <div className="bg-primary rounded-3xl p-8 text-white">
              <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <h2 className="font-display font-bold text-display-sm mb-4">Visi Kami</h2>
              <p className="text-white/80 leading-relaxed">
                Menjadi jaringan restoran keluarga Indonesia yang dikenal dan dicintai di seluruh Nusantara—
                sebuah merek yang menghadirkan kehangatan pawon ke setiap meja keluarga Indonesia,
                dari Sabang sampai Merauke.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white" aria-labelledby="values-heading">
        <div className="container-wide">
          <SectionHeader
            label="Nilai Kami"
            title="Apa yang Kami Pegang Teguh"
            subtitle="Nilai-nilai ini bukan sekadar kata-kata. Mereka adalah panduan kami dalam setiap keputusan, setiap hidangan, dan setiap interaksi."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group bg-warm-50 rounded-2xl p-6 hover:bg-white hover:shadow-warm-md transition-all duration-300 border border-transparent hover:border-warm-100"
              >
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-display font-semibold text-warm-900 text-lg mb-2">{title}</h3>
                <p className="text-warm-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-warm-50" aria-labelledby="timeline-heading">
        <div className="container-narrow">
          <SectionHeader
            label="Perjalanan Kami"
            title="Langkah Pertama Kami"
            className="mb-12"
          />
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-warm-200 -translate-x-1/2" aria-hidden="true" />
            <div className="space-y-8">
              {milestones.map(({ year, event }, index) => (
                <div
                  key={year}
                  className={`relative flex gap-6 md:gap-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`flex-1 pl-14 md:pl-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white rounded-2xl p-5 shadow-warm-sm border border-warm-100 inline-block w-full">
                      <p className="font-display font-bold text-primary text-xl mb-2">{year}</p>
                      <p className="text-warm-600 text-sm leading-relaxed">{event}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div
                    className="absolute left-4 md:left-1/2 top-5 w-5 h-5 bg-primary rounded-full border-4 border-warm-50 -translate-x-1/2 shadow-warm-sm z-10"
                    aria-hidden="true"
                  />

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Future / Mascot placeholder */}
      <section className="section-padding-sm bg-warm-900 text-center">
        <div className="container-narrow">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-6">
            <span className="text-primary-300 text-sm font-medium">Segera Hadir</span>
          </div>
          <h2 className="font-display font-bold text-display-md text-white mb-4">
            Berkenalan dengan <span className="text-primary-300">Loka</span>
          </h2>
          <p className="text-warm-400 text-lg max-w-md mx-auto">
            Maskot PawonLoka yang hangat dan ramah sedang dalam perjalanan untuk menyapa Anda.
          </p>
        </div>
      </section>
    </>
  )
}
