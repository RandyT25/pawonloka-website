import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const GALLERY_ITEMS = [
  { id: 1, label: 'Ayam Bakar PawonLoka', category: 'Hidangan Utama', span: 'col-span-2 row-span-2', src: 'https://placehold.co/800x600/7B3A22/FDFAF7' },
  { id: 2, label: 'Suasana Warung',       category: 'Restoran',       span: 'col-span-1 row-span-1', src: 'https://placehold.co/400x300/6B5C44/FDFAF7' },
  { id: 3, label: 'Thai Tea & Lychee Tea', category: 'Minuman',       span: 'col-span-1 row-span-1', src: 'https://placehold.co/400x300/3A7D59/FDFAF7' },
  { id: 4, label: 'Nasi Goreng Kambing',  category: 'Nasi & Mie',     span: 'col-span-1 row-span-1', src: 'https://placehold.co/400x300/C4602B/FDFAF7' },
  { id: 5, label: 'Momen Bersama',        category: 'Pelanggan',      span: 'col-span-1 row-span-1', src: 'https://placehold.co/400x300/8B6914/FDFAF7' },
  { id: 6, label: 'Roti Bakar Coklat Keju', category: 'Dessert',      span: 'col-span-1 row-span-1', src: 'https://placehold.co/400x300/C0856C/1A1209' },
]

export function GalleryPreviewSection() {
  return (
    <section className="section-padding bg-white" aria-labelledby="gallery-heading">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeader
            label="Galeri"
            title="Momen di PawonLoka"
            subtitle="Dari hidangan istimewa hingga momen bersama keluarga tercinta."
            align="left"
          />
          <Link
            href="/galeri"
            className="flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-200 shrink-0 cursor-pointer"
          >
            Lihat Semua Foto
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div
          className="grid grid-cols-3 grid-rows-3 gap-3 h-[500px] md:h-[600px]"
          role="list"
          aria-label="Preview galeri foto PawonLoka"
        >
          {GALLERY_ITEMS.map(({ id, label, category, span, src }) => (
            <div
              key={id}
              className={`${span} relative rounded-2xl overflow-hidden group cursor-pointer`}
              role="listitem"
            >
              <Image
                src={src}
                alt={label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
                unoptimized
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

              {/* Category badge */}
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full border border-white/20">
                  {category}
                </span>
              </div>

              {/* Label */}
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                <p className="text-white font-semibold text-sm">{label}</p>
              </div>

              <span className="sr-only">{label} - {category}</span>
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="text-center mt-8 md:hidden">
          <Link
            href="/galeri"
            className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-xl font-semibold text-sm hover:bg-primary/5 transition-colors cursor-pointer"
          >
            Lihat Semua Foto
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <h2 id="gallery-heading" className="sr-only">Galeri Foto PawonLoka</h2>
    </section>
  )
}
