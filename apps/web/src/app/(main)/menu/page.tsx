'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { Search } from 'lucide-react'
import { MenuCard } from '@/components/ui/MenuCard'
import { WHATSAPP_ORDER_URL } from '@/lib/constants'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import type { MenuItem, MenuCategory } from '@/types'

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const supabase = useRef(createClient()).current

  useEffect(() => {
    const load = async () => {
      const [itemsRes, catsRes] = await Promise.all([
        supabase.from('menu_items').select('*, category:menu_categories(*)').eq('is_available', true).order('display_order'),
        supabase.from('menu_categories').select('*').eq('is_active', true).order('display_order'),
      ])
      if (itemsRes.data && itemsRes.data.length > 0) setItems(itemsRes.data as MenuItem[])
      if (catsRes.data && catsRes.data.length > 0) setCategories(catsRes.data as MenuCategory[])
      setLoading(false)
    }
    load()
  }, [supabase])

  const filteredItems = useMemo(() => {
    let list = items
    if (activeCategory !== null) list = list.filter(i => i.category_id === activeCategory)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(i => i.name.toLowerCase().includes(q) || (i.description?.toLowerCase().includes(q) ?? false))
    }
    return list
  }, [items, activeCategory, searchQuery])

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
            Dari hidangan utama hingga dessert, dari cemilan hingga minuman — semua untuk Anda.
          </p>
        </div>
      </div>

      {/* Sticky Filters */}
      <div className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-warm-100 shadow-warm-sm">
        <div className="container-wide py-4">
          <div className="flex flex-col sm:flex-row gap-4">
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
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5" role="group" aria-label="Filter kategori menu">
              <button
                onClick={() => setActiveCategory(null)}
                className={cn('flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 shrink-0 cursor-pointer', activeCategory === null ? 'bg-primary text-white shadow-warm-sm' : 'bg-warm-100 text-warm-600 hover:bg-warm-200')}
                aria-pressed={activeCategory === null}
              >
                Semua
              </button>
              {categories.map(({ id, name }) => (
                <button
                  key={id}
                  onClick={() => setActiveCategory(activeCategory === id ? null : id)}
                  className={cn('flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 shrink-0 cursor-pointer', activeCategory === id ? 'bg-primary text-white shadow-warm-sm' : 'bg-warm-100 text-warm-600 hover:bg-warm-200')}
                  aria-pressed={activeCategory === id}
                >
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
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-warm-100 animate-pulse aspect-[3/4]" />
              ))}
            </div>
          ) : filteredItems.length > 0 ? (
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
              <p className="font-display font-bold text-warm-800 text-xl mb-2">Menu tidak ditemukan</p>
              <p className="text-warm-500 text-sm">Coba kata kunci lain atau pilih kategori yang berbeda.</p>
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
          <h2 className="font-display font-bold text-display-sm text-white mb-3">Siap Memesan?</h2>
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
