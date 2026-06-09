'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn, formatPrice } from '@/lib/utils'
import type { MenuItem } from '@/types'

interface MenuCardProps {
  item: MenuItem
  className?: string
}

const BADGE_STYLES = {
  bestseller: 'bg-primary text-white',
  recommended: 'bg-accent text-warm-900',
  favorite: 'bg-secondary text-white',
} as const

// Working food photos from Unsplash CDN (direct, not source.unsplash.com)
const PHOTO_POOL = [
  'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop',
]

function getPhotoFallback(id: number) {
  return PHOTO_POOL[id % PHOTO_POOL.length]
}

function isValidImageUrl(url: string | null): boolean {
  if (!url) return false
  // source.unsplash.com is deprecated — treat as no image
  if (url.includes('source.unsplash.com')) return false
  return true
}

export function MenuCard({ item, className }: MenuCardProps) {
  const initialSrc = isValidImageUrl(item.image_url) ? item.image_url! : getPhotoFallback(item.id)
  const [imgSrc, setImgSrc] = useState(initialSrc)
  const [imgError, setImgError] = useState(false)

  const badge = item.is_bestseller
    ? { label: item.badge_label ?? 'Best Seller', style: BADGE_STYLES.bestseller }
    : item.is_recommended
    ? { label: item.badge_label ?? 'Recommended', style: BADGE_STYLES.recommended }
    : item.is_featured
    ? { label: item.badge_label ?? 'Pilihan Kami', style: BADGE_STYLES.favorite }
    : null

  const handleImageError = () => {
    if (!imgError) {
      setImgError(true)
      setImgSrc(getPhotoFallback(item.id))
    }
  }

  return (
    <article
      className={cn(
        'group bg-white rounded-2xl overflow-hidden shadow-warm-sm border border-warm-100/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-warm-lg hover:border-warm-200',
        !item.is_available && 'opacity-60',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-warm-100">
        <Image
          src={imgSrc}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          unoptimized
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className={cn('px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm', badge.style)}>
              {badge.label}
            </span>
          </div>
        )}

        {item.category && (
          <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full border border-white/20">
              {item.category.name}
            </span>
          </div>
        )}

        {!item.is_available && (
          <div className="absolute inset-0 bg-warm-900/50 flex items-center justify-center z-10">
            <span className="bg-warm-900/80 text-white text-xs font-semibold px-3 py-1.5 rounded-lg backdrop-blur-sm tracking-wide uppercase">
              Habis
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <h3 className="font-display font-semibold text-warm-900 text-base leading-snug mb-1.5 group-hover:text-primary transition-colors duration-200">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-sm text-warm-500 leading-relaxed line-clamp-2 mb-4">
            {item.description}
          </p>
        )}
        <div className="flex items-center justify-between gap-2">
          <p className="font-display font-bold text-lg text-primary">{formatPrice(item.price)}</p>
          <span className="text-xs text-warm-400 flex items-center gap-1">
            <svg className="w-3 h-3 text-[#FBBF24] fill-current shrink-0" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            4.8
          </span>
        </div>
      </div>
    </article>
  )
}
