'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { createClient } from '@/lib/supabase/client'
import type { GalleryImage } from '@/types'

type DisplayItem = {
  id: number
  label: string
  category: string
  span: string
  src: string
}

const FALLBACK: DisplayItem[] = [
  { id: 1, label: 'Ayam Bakar PawonLoka',   category: 'Hidangan Utama', span: 'col-span-2 row-span-2', src: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&h=600&fit=crop' },
  { id: 2, label: 'Suasana Warung',          category: 'Restoran',       span: 'col-span-1 row-span-1', src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop' },
  { id: 3, label: 'Thai Tea & Lychee Tea',   category: 'Minuman',        span: 'col-span-1 row-span-1', src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' },
  { id: 4, label: 'Nasi Goreng Kambing',     category: 'Nasi & Mie',     span: 'col-span-1 row-span-1', src: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop' },
  { id: 5, label: 'Momen Bersama',           category: 'Pelanggan',      span: 'col-span-1 row-span-1', src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop' },
  { id: 6, label: 'Roti Bakar Coklat Keju', category: 'Dessert',         span: 'col-span-1 row-span-1', src: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop' },
]

const SPANS = ['col-span-2 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1']

function toDisplay(img: GalleryImage, index: number): DisplayItem {
  return {
    id: img.id,
    src: img.url,
    label: img.alt_text ?? `Foto ${index + 1}`,
    category: img.category?.name ?? 'Galeri',
    span: SPANS[index] ?? 'col-span-1 row-span-1',
  }
}

export function GalleryPreviewSection() {
  const [items, setItems] = useState<DisplayItem[]>(FALLBACK)
  const supabase = useRef(createClient()).current

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('gallery_images')
        .select('*, category:gallery_categories(*)')
        .eq('is_featured', true)
        .order('display_order')
        .limit(6)
      if (data && data.length > 0) {
        setItems((data as GalleryImage[]).map(toDisplay))
      }
    }
    load()
  }, [supabase])

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

        <div
          className="grid grid-cols-3 grid-rows-3 gap-3 h-[500px] md:h-[600px]"
          role="list"
          aria-label="Preview galeri foto PawonLoka"
        >
          {items.map(({ id, label, category, span, src }) => (
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

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full border border-white/20">
                  {category}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                <p className="text-white font-semibold text-sm">{label}</p>
              </div>

              <span className="sr-only">{label} - {category}</span>
            </div>
          ))}
        </div>

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
