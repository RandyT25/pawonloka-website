'use client'

import Image from 'next/image'
import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  { id: 'all', label: 'Semua' },
  { id: 'food', label: 'Makanan' },
  { id: 'restaurant', label: 'Restoran' },
  { id: 'events', label: 'Event' },
  { id: 'community', label: 'Komunitas' },
]

const GALLERY_ITEMS = [
  { id: 1,  category: 'food',       label: 'Ayam Bakar PawonLoka',   caption: 'Ayam bakar bumbu rempah pilihan',           src: 'https://placehold.co/800x600/7B3A22/FDFAF7', tall: true  },
  { id: 2,  category: 'restaurant', label: 'Suasana Warung Malam',    caption: 'Atmosfer hangat di malam hari',             src: 'https://placehold.co/800x600/4A3728/FDFAF7', tall: false },
  { id: 3,  category: 'food',       label: 'Nasi Goreng Kambing',     caption: 'Nasi goreng dengan daging kambing empuk',   src: 'https://placehold.co/800x600/C4602B/FDFAF7', tall: false },
  { id: 4,  category: 'food',       label: 'Thai Tea',                caption: 'Minuman favorit setiap hari',               src: 'https://placehold.co/600x800/3A7D59/FDFAF7', tall: true  },
  { id: 5,  category: 'community',  label: 'Gathering Keluarga',      caption: 'Momen bersama yang tak terlupakan',         src: 'https://placehold.co/800x600/8B6914/FDFAF7', tall: false },
  { id: 6,  category: 'food',       label: 'Sate Kambing + Nasi',     caption: 'Sate kambing empuk dengan bumbu kecap',     src: 'https://placehold.co/800x600/8B4513/FDFAF7', tall: false },
  { id: 7,  category: 'restaurant', label: 'Area Makan PawonLoka',    caption: 'Tempat duduk yang nyaman dan asri',         src: 'https://placehold.co/800x600/6B5C44/FDFAF7', tall: false },
  { id: 8,  category: 'events',     label: 'Ulang Tahun Spesial',     caption: 'Kami siap menyambut momen spesial Anda',    src: 'https://placehold.co/800x600/A84462/FDFAF7', tall: true  },
  { id: 9,  category: 'food',       label: 'Chicken Steak BBQ',       caption: 'Menu Gen-Z Special yang hits',              src: 'https://placehold.co/800x600/6B4A8A/FDFAF7', tall: false },
  { id: 10, category: 'community',  label: 'Komunitas Citra Indah',   caption: 'Bersama membangun komunitas yang hangat',   src: 'https://placehold.co/800x600/3A6B8A/FDFAF7', tall: false },
  { id: 11, category: 'food',       label: 'Roti Bakar Coklat Keju',  caption: 'Dessert favorit semua usia',                src: 'https://placehold.co/800x600/C0856C/1A1209',  tall: false },
  { id: 12, category: 'restaurant', label: 'Dapur PawonLoka',         caption: 'Di sinilah keajaiban masakan tercipta',     src: 'https://placehold.co/800x600/5C4433/FDFAF7',  tall: true  },
]

export default function GaleriPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (lightboxIndex === null) return
    const newIndex = direction === 'prev'
      ? (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
      : (lightboxIndex + 1) % filteredItems.length
    setLightboxIndex(newIndex)
  }

  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-12 bg-warm-900">
        <div className="container-wide">
          <p className="section-label mb-4 text-primary-300">Galeri Foto</p>
          <h1 className="font-display font-bold text-display-xl text-white text-balance max-w-lg mb-4">
            Momen di PawonLoka
          </h1>
          <p className="text-warm-400 text-lg max-w-md text-pretty">
            Setiap gambar menceritakan kisah tentang kehangatan, kelezatan, dan kebersamaan.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-warm-100">
        <div className="container-wide py-4">
          <div
            className="flex items-center gap-2 overflow-x-auto no-scrollbar"
            role="group"
            aria-label="Filter kategori galeri"
          >
            {CATEGORIES.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 shrink-0 cursor-pointer',
                  activeCategory === id
                    ? 'bg-primary text-white shadow-warm-sm'
                    : 'bg-warm-100 text-warm-600 hover:bg-warm-200'
                )}
                aria-pressed={activeCategory === id}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="section-padding bg-warm-50">
        <div className="container-wide">
          <p className="text-sm text-warm-500 mb-6">
            {filteredItems.length} foto
          </p>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(index)}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
                role="button"
                tabIndex={0}
                aria-label={`Lihat foto: ${item.label}`}
              >
                <div className="relative" style={{ aspectRatio: item.tall ? '3/4' : '4/3' }}>
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    unoptimized
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-semibold text-sm">{item.label}</p>
                  <p className="text-white/70 text-xs mt-0.5">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Upload note */}
          <div className="mt-12 bg-warm-100 rounded-2xl p-6 text-center border border-warm-200">
            <p className="text-warm-600 text-sm">
              Foto-foto ini akan digantikan dengan galeri asli PawonLoka.
              Tambahkan foto melalui panel admin.
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Lightbox galeri"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors cursor-pointer z-10"
            aria-label="Tutup lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev') }}
            className="absolute left-4 p-2 text-white/70 hover:text-white transition-colors cursor-pointer z-10"
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox('next') }}
            className="absolute right-4 p-2 text-white/70 hover:text-white transition-colors cursor-pointer z-10"
            aria-label="Foto berikutnya"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div
            className="relative max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden w-full aspect-video">
              <Image
                src={filteredItems[lightboxIndex]?.src ?? ''}
                alt={filteredItems[lightboxIndex]?.label ?? ''}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-white font-semibold">{filteredItems[lightboxIndex]?.label}</p>
              <p className="text-white/60 text-sm mt-1">{filteredItems[lightboxIndex]?.caption}</p>
              <p className="text-white/40 text-xs mt-2">{lightboxIndex + 1} / {filteredItems.length}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
