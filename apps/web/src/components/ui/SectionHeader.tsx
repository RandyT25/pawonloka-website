import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
  titleClassName?: string
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {label && (
        <p className="section-label mb-3">{label}</p>
      )}
      <h2 className={cn('font-display font-bold text-display-md text-warm-900 text-balance', titleClassName)}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-warm-600 leading-relaxed text-pretty">
          {subtitle}
        </p>
      )}
      <div className={cn('mt-5 w-12 h-1 bg-primary rounded-full', align === 'center' && 'mx-auto')} aria-hidden="true" />
    </div>
  )
}
