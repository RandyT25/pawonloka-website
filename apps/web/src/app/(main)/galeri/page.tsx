'use client'

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  { id: 'all', label: 'Semua' },
  { id: 'food', label: 'Makanan' },
  { id: 'restaurant', label: 'Restoran' },
  { id: 'events', label: 'Event' },
  { id: 'community', label: 'Komunitas' },
]

const GALLERY_ITEMS = [
  { id: 1, category: 'food', label: 'Nasi Goreng Spesial', caption: 'Menu andalan yang selalu jadi favorit pelanggan', bg: 'from-amber-700 to-orange-900' },
  { id: 2, category: 'restaurant', label: 'Suasana Warung Malam', caption: 'Atmosfer hangat di malam hari', bg: 'from-stone-600 to-warm-800' },
  { id: 3, category: 'food', label: 'Ayam Bakar Pedas', caption: 'Dibakar dengan bumbu rempah pilihan', bg: 'from-red-700 to-orange-900' },
  { id: 4, category: 'food', label: 'Mie Goreng Spesial', caption: 'Kenyal dan bumbu yang meresap sempurna', bg: 'from-yellow-700 to-amber-800' },
  { id: 5, category: 'community', label: 'Gathering Keluarga', caption: 'Momen bersama yang tak terlupakan', bg: 'from-warm-600 to-warm-800' },
  { id: 6, category: 'food', label: 'Es Kelapa Muda', caption: 'Segar dan alami, langsung dari buahnya', bg: 'from-teal-600 to-emerald-800' },
  { id: 7, category: 'restaurant', label: 'Meja Outdoor', caption: 'Nikmati makan di udara segar', bg: 'from-green-700 to-warm-800' },
  { id: 8, category: 'events', label: 'Ulang Tahun Spesial', caption: 'Kami siap menyambut momen spesial Anda', bg: 'from-pink-700 to-rose-900' },
  { id: 9, category: 'food', label: 'Nasi Uduk Komplit', caption: 'Lauk komplit, rasa tak tertandingi', bg: 'from-amber-600 to-yellow-900' },
  { id: 10, category: 'community', label: 'Komunitas Jonggol', caption: 'Bersama membangun komunitas yang hangat', bg: 'from-blue-700 to-indigo-900' },
  { id: 11, category: 'food', label: 'Pisang Goreng Keju', caption: 'Cemilan favorit semua usia', bg: 'from-yellow-600 to-orange-800' },
  { id: 12, category: 'restaurant', label: 'Dapur PawonLoka', caption: 'Di sinilah keajaiban masakan tercipta', bg: 'from-warm-700 to-warm-900' },
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
                {/* Gradient background */}
                <div
                  className={`bg-gradient-to-br ${item.bg} transition-transform duration-500 group-hover:scale-105`}
                  style={{ aspectRatio: index % 3 === 0 ? '3/4' : '4/3' }}
                >
                  {/* Placeholder icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <Camera className="w-12 h-12 text-white" aria-hidden="true" />
                  </div>
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
            <Camera className="w-8 h-8 text-warm-400 mx-auto mb-3" aria-hidden="true" />
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
            <div
              className={`bg-gradient-to-br ${filteredItems[lightboxIndex]?.bg} rounded-2xl w-full aspect-video flex items-center justify-center`}
              aria-hidden="true"
            >
              <Camera className="w-20 h-20 text-white/20" />
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
