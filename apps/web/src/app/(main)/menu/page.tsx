'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { MenuCard } from '@/components/ui/MenuCard'
import { MENU_CATEGORIES, WHATSAPP_ORDER_URL } from '@/lib/constants'
import type { MenuItem } from '@/types'
import { cn } from '@/lib/utils'

const cat = (id: number, name: string, slug: string) => ({
  id, name, slug, description: null, icon: null, display_order: id, is_active: true, created_at: '',
})

const item = (
  id: number,
  category_id: number,
  name: string,
  description: string,
  price: number,
  opts: Partial<{ is_featured: boolean; is_bestseller: boolean; is_recommended: boolean; badge_label: string }> = {}
): MenuItem => ({
  id,
  category_id,
  name,
  description,
  price,
  image_url: null,
  is_available: true,
  is_featured: opts.is_featured ?? false,
  is_bestseller: opts.is_bestseller ?? false,
  is_recommended: opts.is_recommended ?? false,
  badge_label: opts.badge_label ?? null,
  display_order: id,
  created_at: '',
  updated_at: '',
  category: cat(category_id, MENU_CATEGORIES.find(c => c.id === category_id)?.name ?? '', MENU_CATEGORIES.find(c => c.id === category_id)?.slug ?? ''),
})

const ALL_MENU_ITEMS: MenuItem[] = [
  // Hidangan Utama
  item(1, 1, 'Ayam Bakar + Nasi', 'Ayam bakar bumbu rempah pilihan, disajikan dengan nasi putih hangat dan lalapan segar.', 28000, { is_featured: true, is_bestseller: true, badge_label: 'Best Seller' }),
  item(2, 1, 'Ayam Bakar Taliwang + Nasi', 'Ayam bakar khas Lombok dengan bumbu pedas Taliwang yang kaya rempah, lengkap dengan nasi.', 33000, { is_recommended: true }),
  item(3, 1, 'Sate Kambing + Nasi', 'Sate kambing pilihan empuk dengan bumbu kecap manis dan acar bawang, disajikan dengan nasi.', 38000, { is_featured: true }),
  item(4, 1, 'Sate Ayam + Nasi', 'Sate ayam bumbu kacang gurih dengan lontong atau nasi, bumbu kacang khas nusantara.', 33000),
  item(5, 1, 'Tongseng Ayam', 'Tongseng ayam kuah kaya rempah dengan kol, tomat, dan daun bawang — hangat dan lezat.', 33000, { is_recommended: true }),
  item(6, 1, 'Tongseng Kambing', 'Tongseng kambing empuk dengan kuah santan rempah, kol, dan tomat segar.', 38000),
  item(7, 1, 'Sop Iga Kambing', 'Sop iga kambing kuah bening segar dengan rempah pilihan, wortel, dan kentang.', 38000),
  item(8, 1, 'Sop Tulang Daging Kambing', 'Sop tulang kambing dengan daging tebal, kuah gurih yang menghangatkan badan.', 38000),
  item(9, 1, 'Ayam Kremes + Nasi', 'Ayam goreng dengan balutan kremes renyah gurih, disajikan dengan nasi dan sambal.', 30000, { is_bestseller: true, badge_label: 'Favorit' }),
  item(10, 1, 'Rica Kambing + Nasi', 'Kambing rica-rica pedas dengan bumbu merah dan kemangi, disajikan dengan nasi putih.', 38000),

  // Nasi & Mie
  item(11, 2, 'Nasi Goreng Telor', 'Nasi goreng wangi dengan bumbu tradisional dan telur ceplok — simpel tapi memuaskan.', 20000),
  item(12, 2, 'Nasi Goreng Ayam Kremes', 'Nasi goreng spesial dengan topping ayam kremes renyah dan sambal pilihan.', 38000, { is_featured: true, is_bestseller: true, badge_label: 'Best Seller' }),
  item(13, 2, 'Nasi Goreng Kambing', 'Nasi goreng dengan potongan daging kambing empuk berbumbu, aroma rempah yang khas.', 38000, { is_recommended: true }),
  item(14, 2, 'Mie Goreng Telor', 'Mie goreng kenyal dengan bumbu khas dan telur orak-arik, sajian sederhana yang lezat.', 20000),
  item(15, 2, 'Mie Goreng Ayam', 'Mie goreng dengan potongan ayam suwir dan sayuran segar, bumbu meresap sempurna.', 28000),
  item(16, 2, 'Mie Nyemek Ayam', 'Mie nyemek semi-kuah khas Jogja dengan ayam, bumbu pedas manis yang menggugah selera.', 28000, { is_recommended: true }),
  item(17, 2, 'Bihun Goreng Ayam', 'Bihun goreng ringan dengan ayam suwir, telur, dan sayuran — cocok untuk semua usia.', 28000),

  // Snack
  item(18, 3, 'Kentang Goreng Homemade', 'Kentang goreng buatan sendiri, renyah di luar lembut di dalam — lebih nikmat dari fast food.', 15000, { is_recommended: true }),
  item(19, 3, 'Mendoan', 'Tempe goreng tepung tipis khas Purwokerto, renyah dengan aroma daun kucai yang harum.', 15000),
  item(20, 3, 'Siomay Ayam Mentai', 'Siomay ayam kukus atau goreng dengan saus mentai creamy yang kekinian.', 20000, { is_featured: true }),
  item(21, 3, 'Cireng', 'Aci digoreng khas Sunda, kenyal di dalam renyah di luar — camilan favorit semua kalangan.', 10000),

  // Extra
  item(22, 4, 'Nasi', 'Nasi putih pulen tambahan untuk melengkapi hidangan utama.', 5000),
  item(23, 4, 'Sambal Bawang', 'Sambal bawang pedas segar buatan sendiri — cocok untuk menambah cita rasa.', 3000),

  // Gen-Z Special
  item(24, 5, 'Mac & Cheese', 'Makaroni dengan saus keju creamy kental, disajikan panas — comfort food yang hits.', 30000, { is_featured: true }),
  item(25, 5, 'Chicken Steak BBQ', 'Chicken steak dengan saus BBQ smoky, pilihan nasi putih atau kentang goreng.', 38000, { is_recommended: true, badge_label: 'Hits' }),

  // Dessert
  item(26, 6, 'Roti Bakar Coklat Kacang', 'Roti bakar garing dengan olesan coklat dan taburan kacang — manis dan mengenyangkan.', 16000),
  item(27, 6, 'Roti Bakar Coklat Keju', 'Roti bakar dengan coklat lumer dan keju susu yang asin-manis sempurna.', 16000, { is_bestseller: true, badge_label: 'Favorit' }),
  item(28, 6, 'Ronde', 'Minuman/dessert hangat dengan bola-bola tepung ketan isi kacang dalam kuah jahe manis.', 16000),
  item(29, 6, 'Pisang Susu', 'Pisang bakar atau goreng dengan siraman susu kental manis — manis dan lembut.', 15000),
  item(30, 6, 'Pisang Coklat Keju', 'Pisang bakar atau goreng dengan topping coklat dan keju — kombinasi klasik yang selalu enak.', 16000, { is_recommended: true }),
  item(31, 6, 'Pisang Semut', 'Pisang bakar atau goreng dengan taburan gula yang karamelisasi, crunchy dan manis.', 15000),

  // Minuman
  item(32, 7, 'Air Hangat', 'Air putih hangat untuk menemani makan.', 2000),
  item(33, 7, 'Air Mineral', 'Air mineral dingin menyegarkan.', 5000),
  item(34, 7, 'Lychee Tea', 'Teh dengan cita rasa leci manis segar, disajikan dingin.', 20000, { is_recommended: true }),
  item(35, 7, 'Lemon Tea', 'Teh lemon tawar atau manis, tersedia panas atau dingin.', 18000),
  item(36, 7, 'Thai Tea', 'Thai tea creamy khas Thailand dengan susu kental, disajikan dingin.', 22000, { is_featured: true, is_bestseller: true, badge_label: 'Favorit' }),
  item(37, 7, 'Jeruk Tawar / Manis', 'Jeruk peras segar, tersedia panas atau dingin sesuai selera.', 12000),
  item(38, 7, 'Yuzu Lychee / Lemon', 'Minuman yuzu segar kombinasi leci atau lemon, disajikan dingin.', 25000, { is_recommended: true }),
  item(39, 7, 'Americano', 'Kopi americano tawar atau manis, tersedia panas atau dingin.', 17000),
  item(40, 7, 'Teh Tawar / Manis', 'Teh klasik tawar atau manis, tersedia panas atau dingin.', 8000),
  item(41, 7, 'Coffee Latte', 'Kopi latte tawar atau manis dengan susu, tersedia panas atau dingin. Tambah +5K Salted Caramel / +7K Aren.', 20000, { is_featured: true }),
  item(42, 7, 'Matcha / Redvelvet Latte', 'Latte matcha atau redvelvet dengan susu creamy, disajikan dingin.', 25000, { is_recommended: true }),
  item(43, 7, 'Wedang Jahe Susu', 'Wedang jahe hangat dengan susu — menghangatkan tubuh dan menenangkan.', 15000),
  item(44, 7, 'Wedang Jahe', 'Wedang jahe tradisional hangat dengan rempah pilihan.', 12000),
  item(45, 7, 'Wedang Uwuh', 'Minuman rempah tradisional Jawa dengan kayu secang, jahe, dan cengkeh.', 15000, { is_recommended: true }),
  item(46, 7, 'Milo Dinosaur', 'Milo susu dingin dengan taburan bubuk Milo melimpah di atasnya.', 25000, { badge_label: 'Gen-Z' }),
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
            Dari hidangan utama hingga dessert, dari cemilan hingga minuman — semua untuk Anda.
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
              {MENU_CATEGORIES.map(({ id, name }) => (
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
