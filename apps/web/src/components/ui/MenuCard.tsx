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

export function MenuCard({ item, className }: MenuCardProps) {
  const badge = item.is_bestseller
    ? { label: item.badge_label ?? 'Best Seller', style: BADGE_STYLES.bestseller }
    : item.is_recommended
    ? { label: item.badge_label ?? 'Recommended', style: BADGE_STYLES.recommended }
    : item.is_featured
    ? { label: item.badge_label ?? 'Pilihan Kami', style: BADGE_STYLES.favorite }
    : null

  return (
    <article
      className={cn(
        'group bg-white rounded-2xl overflow-hidden shadow-warm-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-warm-lg',
        !item.is_available && 'opacity-60',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-warm-100">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-warm-200 to-warm-300 flex items-center justify-center" aria-hidden="true">
            <svg className="w-12 h-12 text-warm-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3">
            <span className={cn('px-2.5 py-1 rounded-lg text-xs font-semibold shadow-warm-sm', badge.style)}>
              {badge.label}
            </span>
          </div>
        )}

        {/* Unavailable overlay */}
        {!item.is_available && (
          <div className="absolute inset-0 bg-warm-900/40 flex items-center justify-center">
            <span className="bg-warm-900/80 text-white text-xs font-medium px-3 py-1.5 rounded-lg backdrop-blur-sm">
              Habis
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-warm-900 text-base leading-snug mb-1.5">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-sm text-warm-500 leading-relaxed line-clamp-2 mb-3">
            {item.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <p className="price-tag text-lg">{formatPrice(item.price)}</p>
          {item.category && (
            <span className="text-xs text-warm-400 bg-warm-100 px-2.5 py-1 rounded-full">
              {item.category.name}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
