'use client'

import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { MenuCard } from '@/components/ui/MenuCard'
import { MENU_CATEGORIES, WHATSAPP_ORDER_URL } from '@/lib/constants'
import type { MenuItem } from '@/types'
import { cn } from '@/lib/utils'

const ALL_MENU_ITEMS: MenuItem[] = [
  { id: 1, category_id: 1, name: 'Nasi Goreng Kampung', description: 'Nasi goreng dengan bumbu tradisional kampung, telur orak-arik, sayuran, dan kerupuk.', price: 25000, image_url: null, is_available: true, is_featured: false, is_bestseller: false, is_recommended: false, badge_label: null, display_order: 1, created_at: '', updated_at: '', category: { id: 1, name: 'Nasi', slug: 'nasi', description: null, icon: null, display_order: 1, is_active: true, created_at: '' } },
  { id: 2, category_id: 1, name: 'Nasi Goreng Spesial', description: 'Nasi goreng premium dengan ayam suwir, telur ceplok, dan sambal terasi pilihan.', price: 30000, image_url: null, is_available: true, is_featured: true, is_bestseller: true, is_recommended: false, badge_label: 'Best Seller', display_order: 2, created_at: '', updated_at: '', category: { id: 1, name: 'Nasi', slug: 'nasi', description: null, icon: null, display_order: 1, is_active: true, created_at: '' } },
  { id: 3, category_id: 1, name: 'Nasi Uduk Komplit', description: 'Nasi uduk gurih dengan lauk komplit: ayam goreng, tempe orek, sambal goreng, dan kerupuk.', price: 28000, image_url: null, is_available: true, is_featured: false, is_bestseller: false, is_recommended: true, badge_label: 'Recommended', display_order: 3, created_at: '', updated_at: '', category: { id: 1, name: 'Nasi', slug: 'nasi', description: null, icon: null, display_order: 1, is_active: true, created_at: '' } },
  { id: 4, category_id: 1, name: 'Nasi Kuning', description: 'Nasi kuning aromatis dengan lauk pilihan, sambal, dan pelengkap tradisional.', price: 25000, image_url: null, is_available: true, is_featured: false, is_bestseller: false, is_recommended: false, badge_label: null, display_order: 4, created_at: '', updated_at: '', category: { id: 1, name: 'Nasi', slug: 'nasi', description: null, icon: null, display_order: 1, is_active: true, created_at: '' } },
  { id: 5, category_id: 2, name: 'Mie Goreng Spesial', description: 'Mie goreng kenyal dengan bumbu khas, sayuran segar, telur, dan topping ayam.', price: 25000, image_url: null, is_available: true, is_featured: true, is_bestseller: true, is_recommended: false, badge_label: 'Best Seller', display_order: 1, created_at: '', updated_at: '', category: { id: 2, name: 'Mie', slug: 'mie', description: null, icon: null, display_order: 2, is_active: true, created_at: '' } },
  { id: 6, category_id: 2, name: 'Mie Kuah Ayam', description: 'Mie kuah kaldu ayam bening yang menyegarkan dengan ayam suwir dan daun bawang.', price: 22000, image_url: null, is_available: true, is_featured: false, is_bestseller: false, is_recommended: false, badge_label: null, display_order: 2, created_at: '', updated_at: '', category: { id: 2, name: 'Mie', slug: 'mie', description: null, icon: null, display_order: 2, is_active: true, created_at: '' } },
  { id: 7, category_id: 2, name: 'Bihun Goreng', description: 'Bihun goreng ringan dengan bumbu rempah, sayuran crispy, dan telur.', price: 20000, image_url: null, is_available: true, is_featured: false, is_bestseller: false, is_recommended: false, badge_label: null, display_order: 3, created_at: '', updated_at: '', category: { id: 2, name: 'Mie', slug: 'mie', description: null, icon: null, display_order: 2, is_active: true, created_at: '' } },
  { id: 8, category_id: 3, name: 'Es Teh Manis', description: 'Teh manis segar dengan gula pilihan, dingin menyegarkan.', price: 5000, image_url: null, is_available: true, is_featured: false, is_bestseller: false, is_recommended: false, badge_label: null, display_order: 1, created_at: '', updated_at: '', category: { id: 3, name: 'Minuman', slug: 'minuman', description: null, icon: null, display_order: 3, is_active: true, created_at: '' } },
  { id: 9, category_id: 3, name: 'Es Jeruk Peras', description: 'Jeruk segar diperas langsung, segar dan kaya vitamin C.', price: 8000, image_url: null, is_available: true, is_featured: false, is_bestseller: false, is_recommended: false, badge_label: null, display_order: 2, created_at: '', updated_at: '', category: { id: 3, name: 'Minuman', slug: 'minuman', description: null, icon: null, display_order: 3, is_active: true, created_at: '' } },
  { id: 10, category_id: 3, name: 'Es Kelapa Muda', description: 'Kelapa muda asli, segar langsung dari buahnya dengan air dan daging kelapa muda.', price: 12000, image_url: null, is_available: true, is_featured: false, is_bestseller: false, is_recommended: true, badge_label: 'Segar', display_order: 3, created_at: '', updated_at: '', category: { id: 3, name: 'Minuman', slug: 'minuman', description: null, icon: null, display_order: 3, is_active: true, created_at: '' } },
  { id: 11, category_id: 3, name: 'Jus Alpukat', description: 'Jus alpukat creamy dengan susu dan madu, kaya nutrisi dan mengenyangkan.', price: 15000, image_url: null, is_available: true, is_featured: false, is_bestseller: false, is_recommended: false, badge_label: null, display_order: 4, created_at: '', updated_at: '', category: { id: 3, name: 'Minuman', slug: 'minuman', description: null, icon: null, display_order: 3, is_active: true, created_at: '' } },
  { id: 12, category_id: 4, name: 'Pisang Goreng Keju', description: 'Pisang goreng renyah di luar lembut di dalam dengan topping keju susu lumer.', price: 15000, image_url: null, is_available: true, is_featured: false, is_bestseller: false, is_recommended: false, badge_label: null, display_order: 1, created_at: '', updated_at: '', category: { id: 4, name: 'Cemilan', slug: 'cemilan', description: null, icon: null, display_order: 4, is_active: true, created_at: '' } },
  { id: 13, category_id: 4, name: 'Tahu Tempe Goreng', description: 'Tahu dan tempe goreng crispy dengan sambal kecap pedas manis khas rumahan.', price: 10000, image_url: null, is_available: true, is_featured: false, is_bestseller: false, is_recommended: false, badge_label: null, display_order: 2, created_at: '', updated_at: '', category: { id: 4, name: 'Cemilan', slug: 'cemilan', description: null, icon: null, display_order: 4, is_active: true, created_at: '' } },
  { id: 14, category_id: 5, name: 'Ayam Bakar Pedas', description: 'Ayam bakar dengan bumbu pedas manis meresap sempurna, disajikan dengan nasi dan lalapan.', price: 38000, image_url: null, is_available: true, is_featured: true, is_bestseller: true, is_recommended: false, badge_label: 'Best Seller', display_order: 1, created_at: '', updated_at: '', category: { id: 5, name: 'Spesial', slug: 'spesial', description: null, icon: null, display_order: 5, is_active: true, created_at: '' } },
  { id: 15, category_id: 5, name: 'Ikan Bakar', description: 'Ikan segar pilihan dibakar dengan bumbu kecombrang dan rempah nusantara.', price: 42000, image_url: null, is_available: true, is_featured: false, is_bestseller: false, is_recommended: true, badge_label: 'Istimewa', display_order: 2, created_at: '', updated_at: '', category: { id: 5, name: 'Spesial', slug: 'spesial', description: null, icon: null, display_order: 5, is_active: true, created_at: '' } },
]

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredItems = useMemo(() => {
    let items = ALL_MENU_ITEMS
    if (activeCategory !== null) {
      items = items.filter((item) => item.category_id === activeCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.description?.toLowerCase().includes(q) ?? false)
      )
    }
    return items
  }, [activeCategory, searchQuery])

  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-12 bg-warm-900">
        <div className="container-wide">
          <p className="section-label mb-4 text-primary-300">Menu Kami</p>
          <h1 className="font-display font-bold text-display-xl text-white text-balance max-w-lg mb-4">
            Semua Ada di Sini
          </h1>
          <p className="text-warm-400 text-lg max-w-md text-pretty">
            Dari nasi hingga cemilan, dari minuman segar hingga hidangan spesial — semua untuk Anda.
          </p>
        </div>
      </div>

      {/* Sticky Filters */}
      <div className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-warm-100 shadow-warm-sm">
        <div className="container-wide py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" aria-hidden="true" />
              <input
                type="search"
                placeholder="Cari menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-warm-50 border border-warm-200 rounded-xl text-sm text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                aria-label="Cari menu"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5" role="group" aria-label="Filter kategori menu">
              <button
                onClick={() => setActiveCategory(null)}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 shrink-0 cursor-pointer',
                  activeCategory === null
                    ? 'bg-primary text-white shadow-warm-sm'
                    : 'bg-warm-100 text-warm-600 hover:bg-warm-200'
                )}
                aria-pressed={activeCategory === null}
              >
                Semua
              </button>
              {MENU_CATEGORIES.map(({ id, name, icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveCategory(activeCategory === id ? null : id)}
                  className={cn(
                    'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 shrink-0 cursor-pointer',
                    activeCategory === id
                      ? 'bg-primary text-white shadow-warm-sm'
                      : 'bg-warm-100 text-warm-600 hover:bg-warm-200'
                  )}
                  aria-pressed={activeCategory === id}
                >
                  <span aria-hidden="true">{icon}</span>
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="section-padding bg-warm-50 min-h-96">
        <div className="container-wide">
          {filteredItems.length > 0 ? (
            <>
              <p className="text-sm text-warm-500 mb-6">
                Menampilkan <span className="font-semibold text-warm-800">{filteredItems.length}</span> menu
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredItems.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4" aria-hidden="true">🍽️</div>
              <p className="font-display font-bold text-warm-800 text-xl mb-2">Menu tidak ditemukan</p>
              <p className="text-warm-500 text-sm">
                Coba kata kunci lain atau pilih kategori yang berbeda.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory(null) }}
                className="mt-4 text-primary text-sm font-medium hover:underline cursor-pointer"
              >
                Reset filter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* WhatsApp Order Banner */}
      <div className="bg-primary py-12">
        <div className="container-wide text-center">
          <h2 className="font-display font-bold text-display-sm text-white mb-3">
            Siap Memesan?
          </h2>
          <p className="text-white/80 mb-6">Hubungi kami via WhatsApp untuk pesanan dan informasi lebih lanjut.</p>
          <a
            href={WHATSAPP_ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-primary rounded-xl font-bold hover:bg-warm-50 transition-colors shadow-warm-lg cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Pesan via WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}
