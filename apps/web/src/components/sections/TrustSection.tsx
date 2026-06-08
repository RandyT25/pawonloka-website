import { Star, MessageCircle, Clock, UtensilsCrossed } from 'lucide-react'
import { RESTAURANT } from '@/lib/constants'

const stats = [
  {
    icon: Star,
    value: RESTAURANT.googleRating,
    suffix: '/5',
    label: 'Google Rating',
    description: 'Rating bintang dari pelanggan kami',
    color: 'text-[#FBBF24]',
    bgColor: 'bg-[#FBBF24]/10',
  },
  {
    icon: MessageCircle,
    value: RESTAURANT.reviewCount,
    suffix: '',
    label: 'Ulasan Pelanggan',
    description: 'Ulasan positif di Google Maps',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Clock,
    value: RESTAURANT.yearsServing,
    suffix: ' Tahun',
    label: 'Melayani',
    description: 'Pengalaman melayani keluarga Indonesia',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    icon: UtensilsCrossed,
    value: RESTAURANT.menuCount,
    suffix: '',
    label: 'Menu Pilihan',
    description: 'Varian menu yang terus berkembang',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
] as const

export function TrustSection() {
  return (
    <section className="bg-white border-b border-warm-100" aria-labelledby="trust-heading">
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-warm-100">
          {stats.map(({ icon: Icon, value, suffix, label, description, color, bgColor }) => (
            <div
              key={label}
              className="group flex flex-col items-center text-center px-6 py-10 lg:py-12 hover:bg-warm-50 transition-colors duration-200"
            >
              <div className={`w-12 h-12 ${bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <Icon className={`w-5 h-5 ${color}`} aria-hidden="true" />
              </div>
              <p className="font-display font-bold text-display-sm text-warm-900 leading-none mb-1" aria-label={`${value}${suffix} ${label}`}>
                {value}
                <span className="text-xl">{suffix}</span>
              </p>
              <p className="font-semibold text-warm-700 text-sm mb-1">{label}</p>
              <p className="text-xs text-warm-400 leading-relaxed hidden md:block">{description}</p>
            </div>
          ))}
        </div>
      </div>
      <h2 id="trust-heading" className="sr-only">Kepercayaan Pelanggan PawonLoka</h2>
    </section>
  )
}
