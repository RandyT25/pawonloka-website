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
  { id: 1,  src: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&h=600&fit=crop', label: 'Ayam Bakar PawonLoka',  caption: 'Ayam bakar bumbu rempah pilihan',         tall: true  },
  { id: 2,  src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop', label: 'Suasana Warung Malam',   caption: 'Atmosfer hangat di malam hari',           tall: false },
  { id: 3,  src: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&h=600&fit=crop', label: 'Nasi Goreng Kambing',    caption: 'Nasi goreng dengan daging kambing empuk', tall: false },
  { id: 4,  src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop',    label: 'Thai Tea',               caption: 'Minuman favorit setiap hari',             tall: true  },
  { id: 5,  src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop', label: 'Gathering Keluarga',     caption: 'Momen bersama yang tak terlupakan',       tall: false },
  { id: 6,  src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',    label: 'Sate Kambing + Nasi',    caption: 'Sate kambing empuk dengan bumbu kecap',   tall: false },
  { id: 7,  src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',    label: 'Area Makan PawonLoka',   caption: 'Tempat duduk yang nyaman dan asri',       tall: false },
  { id: 8,  src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop', label: 'Ulang Tahun Spesial',    caption: 'Kami siap menyambut momen spesial Anda', tall: true  },
  { id: 9,  src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop',    label: 'Chicken Steak BBQ',      caption: 'Menu Gen-Z Special yang hits',            tall: false },
  { id: 10, src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop', label: 'Komunitas Citra Indah',  caption: 'Bersama membangun komunitas yang hangat', tall: false },
  { id: 11, src: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&h=600&fit=crop', label: 'Roti Bakar Coklat Keju', caption: 'Dessert favorit semua usia',              tall: false },
  { id: 12, src: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop', label: 'Dapur PawonLoka',        caption: 'Di sinilah keajaiban masakan tercipta',   tall: true  },
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
