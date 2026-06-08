import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { MenuCard } from '@/components/ui/MenuCard'
import type { MenuItem } from '@/types'

const DEMO_MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    category_id: 1,
    name: 'Nasi Goreng Spesial',
    description: 'Nasi goreng dengan campuran bumbu rahasia, telur, ayam suwir, dan acar segar. Favorit pelanggan kami.',
    price: 30000,
    image_url: null,
    is_available: true,
    is_featured: true,
    is_bestseller: true,
    is_recommended: false,
    badge_label: 'Best Seller',
    display_order: 1,
    created_at: '',
    updated_at: '',
    category: { id: 1, name: 'Nasi', slug: 'nasi', description: null, icon: null, display_order: 1, is_active: true, created_at: '' },
  },
  {
    id: 2,
    category_id: 1,
    name: 'Nasi Uduk Komplit',
    description: 'Nasi uduk gurih dengan lauk komplit: ayam goreng, tempe orek, sambal goreng, dan kerupuk.',
    price: 28000,
    image_url: null,
    is_available: true,
    is_featured: true,
    is_bestseller: false,
    is_recommended: true,
    badge_label: 'Recommended',
    display_order: 2,
    created_at: '',
    updated_at: '',
    category: { id: 1, name: 'Nasi', slug: 'nasi', description: null, icon: null, display_order: 1, is_active: true, created_at: '' },
  },
  {
    id: 3,
    category_id: 2,
    name: 'Mie Goreng Spesial',
    description: 'Mie goreng kenyal dengan bumbu khas, sayuran segar, telur, dan pilihan topping ayam atau seafood.',
    price: 25000,
    image_url: null,
    is_available: true,
    is_featured: true,
    is_bestseller: true,
    is_recommended: false,
    badge_label: 'Best Seller',
    display_order: 3,
    created_at: '',
    updated_at: '',
    category: { id: 2, name: 'Mie', slug: 'mie', description: null, icon: null, display_order: 2, is_active: true, created_at: '' },
  },
  {
    id: 4,
    category_id: 5,
    name: 'Ayam Bakar Pedas',
    description: 'Ayam bakar empuk dengan bumbu pedas manis meresap, disajikan dengan nasi putih dan lalapan segar.',
    price: 38000,
    image_url: null,
    is_available: true,
    is_featured: true,
    is_bestseller: true,
    is_recommended: false,
    badge_label: 'Best Seller',
    display_order: 4,
    created_at: '',
    updated_at: '',
    category: { id: 5, name: 'Spesial', slug: 'spesial', description: null, icon: null, display_order: 5, is_active: true, created_at: '' },
  },
  {
    id: 5,
    category_id: 3,
    name: 'Es Kelapa Muda',
    description: 'Kelapa muda segar langsung dari buahnya, menyegarkan dengan rasa alami yang murni.',
    price: 12000,
    image_url: null,
    is_available: true,
    is_featured: false,
    is_bestseller: false,
    is_recommended: true,
    badge_label: 'Segar',
    display_order: 5,
    created_at: '',
    updated_at: '',
    category: { id: 3, name: 'Minuman', slug: 'minuman', description: null, icon: null, display_order: 3, is_active: true, created_at: '' },
  },
  {
    id: 6,
    category_id: 4,
    name: 'Pisang Goreng Keju',
    description: 'Pisang goreng renyah di luar lembut di dalam, dipadu topping keju susu yang melimpah.',
    price: 15000,
    image_url: null,
    is_available: true,
    is_featured: false,
    is_bestseller: false,
    is_recommended: false,
    badge_label: null,
    display_order: 6,
    created_at: '',
    updated_at: '',
    category: { id: 4, name: 'Cemilan', slug: 'cemilan', description: null, icon: null, display_order: 4, is_active: true, created_at: '' },
  },
]

export function FeaturedMenuSection() {
  return (
    <section className="section-padding bg-warm-50" aria-labelledby="featured-menu-heading">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeader
            label="Menu Kami"
            title="Pilihan Favorit Pelanggan"
            subtitle="Dari nasi goreng hingga ayam bakar, setiap hidangan dibuat dengan bahan segar dan bumbu pilihan."
            align="left"
          />
          <Link
            href="/menu"
            className="flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-200 shrink-0 cursor-pointer"
          >
            Lihat Semua Menu
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_MENU_ITEMS.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary-600 shadow-warm hover:shadow-warm-lg transition-all duration-200 cursor-pointer"
          >
            Lihat Menu Lengkap
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <h2 id="featured-menu-heading" className="sr-only">Menu Unggulan PawonLoka</h2>
    </section>
  )
}
