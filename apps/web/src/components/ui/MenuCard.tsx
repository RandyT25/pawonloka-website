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
        'group bg-white rounded-2xl overflow-hidden shadow-warm-sm border border-warm-100/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-warm-lg hover:border-warm-200',
        !item.is_available && 'opacity-60',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-warm-100">
        {item.image_url ? (
          <>
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              unoptimized
            />
            {/* Subtle permanent gradient at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" aria-hidden="true" />
            {/* Stronger hover gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-warm-200 to-warm-300 flex items-center justify-center" aria-hidden="true">
            <svg className="w-14 h-14 text-warm-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className={cn('px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm', badge.style)}>
              {badge.label}
            </span>
          </div>
        )}

        {/* Category pill - shows on hover */}
        {item.category && (
          <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full border border-white/20">
              {item.category.name}
            </span>
          </div>
        )}

        {/* Unavailable overlay */}
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
