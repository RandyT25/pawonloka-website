'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { MenuCard } from '@/components/ui/MenuCard'
import { createClient } from '@/lib/supabase/client'
import type { MenuItem } from '@/types'

const FALLBACK_ITEMS: MenuItem[] = [
  { id: 1, category_id: 1, name: 'Ayam Bakar + Nasi', description: 'Ayam bakar bumbu rempah pilihan, disajikan dengan nasi putih hangat dan lalapan segar.', price: 28000, image_url: 'https://source.unsplash.com/600x400/?grilled+chicken+food&sig=11', is_available: true, is_featured: true, is_bestseller: true, is_recommended: false, badge_label: 'Best Seller', display_order: 1, created_at: '', updated_at: '', category: { id: 1, name: 'Hidangan Utama', slug: 'hidangan-utama', description: null, icon: null, display_order: 1, is_active: true, created_at: '' } },
  { id: 2, category_id: 1, name: 'Ayam Kremes + Nasi', description: 'Ayam goreng dengan balutan kremes renyah gurih, disajikan dengan nasi dan sambal.', price: 30000, image_url: 'https://source.unsplash.com/600x400/?fried+chicken+crispy&sig=12', is_available: true, is_featured: true, is_bestseller: true, is_recommended: false, badge_label: 'Favorit', display_order: 9, created_at: '', updated_at: '', category: { id: 1, name: 'Hidangan Utama', slug: 'hidangan-utama', description: null, icon: null, display_order: 1, is_active: true, created_at: '' } },
  { id: 3, category_id: 2, name: 'Nasi Goreng Ayam Kremes', description: 'Nasi goreng spesial dengan topping ayam kremes renyah dan sambal pilihan.', price: 38000, image_url: 'https://source.unsplash.com/600x400/?fried+rice+asian+food&sig=13', is_available: true, is_featured: true, is_bestseller: true, is_recommended: false, badge_label: 'Best Seller', display_order: 2, created_at: '', updated_at: '', category: { id: 2, name: 'Nasi & Mie', slug: 'nasi-mie', description: null, icon: null, display_order: 2, is_active: true, created_at: '' } },
  { id: 4, category_id: 2, name: 'Mie Nyemek Ayam', description: 'Mie nyemek semi-kuah khas Jogja dengan ayam, bumbu pedas manis yang menggugah selera.', price: 28000, image_url: 'https://source.unsplash.com/600x400/?noodles+soup+asian&sig=14', is_available: true, is_featured: false, is_bestseller: false, is_recommended: true, badge_label: null, display_order: 6, created_at: '', updated_at: '', category: { id: 2, name: 'Nasi & Mie', slug: 'nasi-mie', description: null, icon: null, display_order: 2, is_active: true, created_at: '' } },
  { id: 5, category_id: 7, name: 'Thai Tea', description: 'Thai tea creamy khas Thailand dengan susu kental, disajikan dingin.', price: 22000, image_url: 'https://source.unsplash.com/600x400/?thai+tea+milk+tea&sig=15', is_available: true, is_featured: true, is_bestseller: true, is_recommended: false, badge_label: 'Favorit', display_order: 5, created_at: '', updated_at: '', category: { id: 7, name: 'Minuman', slug: 'minuman', description: null, icon: null, display_order: 7, is_active: true, created_at: '' } },
  { id: 6, category_id: 5, name: 'Chicken Steak BBQ', description: 'Chicken steak dengan saus BBQ smoky, pilihan nasi putih atau kentang goreng.', price: 38000, image_url: 'https://source.unsplash.com/600x400/?chicken+steak+bbq&sig=16', is_available: true, is_featured: false, is_bestseller: false, is_recommended: true, badge_label: 'Hits', display_order: 2, created_at: '', updated_at: '', category: { id: 5, name: 'Gen-Z Special', slug: 'genz-special', description: null, icon: null, display_order: 5, is_active: true, created_at: '' } },
]

export function FeaturedMenuSection() {
  const [items, setItems] = useState<MenuItem[]>(FALLBACK_ITEMS)
  const supabase = useRef(createClient()).current

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('menu_items')
        .select('*, category:menu_categories(*)')
        .eq('is_available', true)
        .or('is_featured.eq.true,is_bestseller.eq.true')
        .order('display_order')
        .limit(6)
      if (data && data.length > 0) setItems(data as MenuItem[])
    }
    load()
  }, [supabase])

  return (
    <section className="section-padding bg-warm-50" aria-labelledby="featured-menu-heading">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeader
            label="Menu Kami"
            title="Pilihan Favorit Pelanggan"
            subtitle="Dari ayam bakar hingga mie nyemek, setiap hidangan dibuat dengan bahan segar dan bumbu pilihan."
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
          {items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

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
