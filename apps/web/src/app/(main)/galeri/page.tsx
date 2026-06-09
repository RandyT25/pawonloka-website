'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { GalleryImage } from '@/types'

type DisplayImage = {
  id: number
  src: string
  label: string
  caption: string
  tall: boolean
}

const FALLBACK: DisplayImage[] = [
  { id: 1,  src: 'https://source.unsplash.com/800x600/?grilled+chicken+food&sig=1',         label: 'Ayam Bakar PawonLoka',  caption: 'Ayam bakar bumbu rempah pilihan',         tall: true  },
  { id: 2,  src: 'https://source.unsplash.com/800x600/?restaurant+warm+dining&sig=2',       label: 'Suasana Warung Malam',   caption: 'Atmosfer hangat di malam hari',           tall: false },
  { id: 3,  src: 'https://source.unsplash.com/800x600/?fried+rice+asian+food&sig=3',        label: 'Nasi Goreng Kambing',    caption: 'Nasi goreng dengan daging kambing empuk', tall: false },
  { id: 4,  src: 'https://source.unsplash.com/600x800/?thai+tea+milk+tea+drink&sig=4',      label: 'Thai Tea',               caption: 'Minuman favorit setiap hari',             tall: true  },
  { id: 5,  src: 'https://source.unsplash.com/800x600/?family+restaurant+dinner&sig=5',     label: 'Gathering Keluarga',     caption: 'Momen bersama yang tak terlupakan',       tall: false },
  { id: 6,  src: 'https://source.unsplash.com/800x600/?satay+skewer+grilled+meat&sig=6',   label: 'Sate Kambing + Nasi',    caption: 'Sate kambing empuk dengan bumbu kecap',   tall: false },
  { id: 7,  src: 'https://source.unsplash.com/800x600/?restaurant+outdoor+cafe&sig=7',      label: 'Area Makan PawonLoka',   caption: 'Tempat duduk yang nyaman dan asri',       tall: false },
  { id: 8,  src: 'https://source.unsplash.com/800x600/?birthday+celebration+party&sig=8',  label: 'Ulang Tahun Spesial',    caption: 'Kami siap menyambut momen spesial Anda', tall: true  },
  { id: 9,  src: 'https://source.unsplash.com/800x600/?chicken+steak+bbq+plate&sig=9',     label: 'Chicken Steak BBQ',      caption: 'Menu Gen-Z Special yang hits',            tall: false },
  { id: 10, src: 'https://source.unsplash.com/800x600/?friends+community+dining&sig=10',   label: 'Komunitas Citra Indah',  caption: 'Bersama membangun komunitas yang hangat', tall: false },
  { id: 11, src: 'https://source.unsplash.com/800x600/?toast+chocolate+dessert&sig=11',    label: 'Roti Bakar Coklat Keju', caption: 'Dessert favorit semua usia',              tall: false },
  { id: 12, src: 'https://source.unsplash.com/800x600/?restaurant+kitchen+cooking&sig=12', label: 'Dapur PawonLoka',        caption: 'Di sinilah keajaiban masakan tercipta',   tall: true  },
]

function toDisplay(img: GalleryImage, index: number): DisplayImage {
  return {
    id: img.id,
    src: img.url,
    label: img.alt_text ?? `Foto ${index + 1}`,
    caption: img.caption ?? '',
    tall: img.is_featured,
  }
}

export default function GaleriPage() {
  const [images, setImages] = useState<DisplayImage[]>(FALLBACK)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const supabase = useRef(createClient()).current

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('gallery_images')
        .select('*')
        .order('display_order')
      if (data && data.length > 0) {
        setImages((data as GalleryImage[]).map(toDisplay))
      }
    }
    load()
  }, [supabase])

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (lightboxIndex === null) return
    const newIndex = direction === 'prev'
      ? (lightboxIndex - 1 + images.length) % images.length
      : (lightboxIndex + 1) % images.length
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

      {/* Gallery Grid */}
      <div className="section-padding bg-warm-50">
        <div className="container-wide">
          <p className="text-sm text-warm-500 mb-6">{images.length} foto</p>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((item, index) => (
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-semibold text-sm">{item.label}</p>
                  {item.caption && <p className="text-white/70 text-xs mt-0.5">{item.caption}</p>}
                </div>
                <span className="sr-only">{item.label}</span>
              </div>
            ))}
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
          <button onClick={closeLightbox} className="absolute top-4 right-4 p-2 text-white/70 hover:text-white cursor-pointer z-10">
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev') }}
            className="absolute left-4 p-2 text-white/70 hover:text-white cursor-pointer z-10"
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox('next') }}
            className="absolute right-4 p-2 text-white/70 hover:text-white cursor-pointer z-10"
            aria-label="Foto berikutnya"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative rounded-2xl overflow-hidden w-full aspect-video">
              <Image
                src={images[lightboxIndex]?.src ?? ''}
                alt={images[lightboxIndex]?.label ?? ''}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-white font-semibold">{images[lightboxIndex]?.label}</p>
              {images[lightboxIndex]?.caption && (
                <p className="text-white/60 text-sm mt-1">{images[lightboxIndex]?.caption}</p>
              )}
              <p className="text-white/40 text-xs mt-2">{lightboxIndex + 1} / {images.length}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
