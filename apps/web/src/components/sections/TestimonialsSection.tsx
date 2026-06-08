import { SectionHeader } from '@/components/ui/SectionHeader'

const testimonials = [
  {
    id: 1,
    name: 'Budi Santoso',
    initials: 'BS',
    rating: 5,
    date: '2 minggu lalu',
    content: 'Makanan di sini luar biasa enak! Rasanya seperti masakan rumah, hangat dan autentik. Keluarga kami selalu kembali ke sini setiap minggu. Nasi gorengnya juara banget!',
    color: 'bg-primary text-white',
  },
  {
    id: 2,
    name: 'Dewi Rahayu',
    initials: 'DR',
    rating: 5,
    date: '1 bulan lalu',
    content: 'Suasana yang nyaman dan pelayanan yang sangat ramah. Anak-anak saya suka banget dengan menu cemilan di sini. Sangat recommended untuk keluarga!',
    color: 'bg-secondary text-white',
  },
  {
    id: 3,
    name: 'Ahmad Fauzi',
    initials: 'AF',
    rating: 5,
    date: '3 minggu lalu',
    content: 'Harga terjangkau tapi kualitas bintang lima. Ayam bakar pedasnya benar-benar juara! Wajib coba kalau mampir ke Citra Indah City. Sudah jadi langganan tetap saya.',
    color: 'bg-accent text-warm-900',
  },
  {
    id: 4,
    name: 'Siti Nurhaliza',
    initials: 'SN',
    rating: 5,
    date: '1 minggu lalu',
    content: 'Tempatnya bersih, makanannya enak, dan yang paling penting rasanya konsisten setiap kunjungan. PawonLoka memang tempat makan terbaik di Jonggol!',
    color: 'bg-warm-700 text-white',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Rating ${count} dari 5 bintang`} role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? 'text-[#FBBF24] fill-current' : 'text-warm-200 fill-current'}`}
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-warm-50" aria-labelledby="testimonials-heading">
      <div className="container-wide">
        <SectionHeader
          label="Ulasan Pelanggan"
          title="Apa Kata Mereka?"
          subtitle="Lebih dari 100 ulasan bintang lima di Google Maps. Kepuasan pelanggan adalah prioritas utama kami."
          className="mb-12"
        />

        {/* Google Rating Badge */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-3 bg-white rounded-2xl shadow-warm px-6 py-4 border border-warm-100">
            <div className="flex flex-col items-center">
              <span className="font-display font-bold text-3xl text-warm-900 leading-none">4.8</span>
              <StarRating count={5} />
              <span className="text-xs text-warm-500 mt-1">100+ ulasan</span>
            </div>
            <div className="w-px h-12 bg-warm-200" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" aria-label="Google" role="img">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <div>
                <p className="font-semibold text-warm-800 text-sm">Google Reviews</p>
                <p className="text-xs text-warm-500">Verified rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {testimonials.map(({ id, name, initials, rating, date, content, color }) => (
            <article
              key={id}
              className="bg-white rounded-2xl p-6 shadow-warm-sm border border-warm-100 hover:-translate-y-1 hover:shadow-warm-md transition-all duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <div className="text-3xl text-primary/20 font-display font-bold leading-none mb-3 select-none" aria-hidden="true">
                "
              </div>

              <p className="text-warm-700 text-sm leading-relaxed flex-1 mb-5 text-pretty">
                {content}
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-warm-100">
                <div
                  className={`w-9 h-9 rounded-full ${color} flex items-center justify-center text-xs font-bold shrink-0`}
                  aria-hidden="true"
                >
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-warm-800 text-sm truncate">{name}</p>
                  <div className="flex items-center gap-2">
                    <StarRating count={rating} />
                    <span className="text-xs text-warm-400">{date}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA to Google */}
        <div className="text-center mt-10">
          <a
            href="https://g.page/r/CpawonlokaReview"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-warm-200 bg-white text-warm-700 rounded-xl text-sm font-medium hover:bg-warm-50 hover:border-warm-300 transition-all duration-200 cursor-pointer"
          >
            Baca semua ulasan di Google
          </a>
        </div>
      </div>
    </section>
  )
}
