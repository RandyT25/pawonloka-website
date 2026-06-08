'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Search, ToggleLeft, ToggleRight, ImagePlus } from 'lucide-react'
import { AdminHeader } from '@/components/layout/AdminHeader'
import { createClient } from '@/lib/supabase/client'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { MenuItem, MenuCategory } from '@/types'

export default function MenuManagementPage() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [form, setForm] = useState({ name: '', description: '', price: '', category_id: '', is_available: true, is_bestseller: false, is_recommended: false, badge_label: '' })
  const [saving, setSaving] = useState(false)

  const supabase = createClient()

  const loadData = async () => {
    setLoading(true)
    const [menuResult, catResult] = await Promise.all([
      supabase.from('menu_items').select('*, category:menu_categories(*)').order('category_id').order('display_order'),
      supabase.from('menu_categories').select('*').order('display_order'),
    ])
    if (menuResult.data) setItems(menuResult.data as MenuItem[])
    if (catResult.data) setCategories(catResult.data as MenuCategory[])
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const filteredItems = items.filter((item) => {
    if (activeCategory !== null && item.category_id !== activeCategory) return false
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const openAdd = () => {
    setEditingItem(null)
    setForm({ name: '', description: '', price: '', category_id: categories[0]?.id.toString() ?? '', is_available: true, is_bestseller: false, is_recommended: false, badge_label: '' })
    setShowForm(true)
  }

  const openEdit = (item: MenuItem) => {
    setEditingItem(item)
    setForm({ name: item.name, description: item.description ?? '', price: item.price.toString(), category_id: item.category_id.toString(), is_available: item.is_available, is_bestseller: item.is_bestseller, is_recommended: item.is_recommended, badge_label: item.badge_label ?? '' })
    setShowForm(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const payload = {
      name: form.name,
      description: form.description || null,
      price: parseInt(form.price),
      category_id: parseInt(form.category_id),
      is_available: form.is_available,
      is_bestseller: form.is_bestseller,
      is_recommended: form.is_recommended,
      badge_label: form.badge_label || null,
    }

    if (editingItem) {
      await supabase.from('menu_items').update(payload).eq('id', editingItem.id)
    } else {
      await supabase.from('menu_items').insert({ ...payload, display_order: items.length + 1 })
    }

    await loadData()
    setShowForm(false)
    setSaving(false)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus menu item ini?')) return
    await supabase.from('menu_items').delete().eq('id', id)
    await loadData()
  }

  const toggleAvailability = async (item: MenuItem) => {
    await supabase.from('menu_items').update({ is_available: !item.is_available }).eq('id', item.id)
    setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, is_available: !i.is_available } : i))
  }

  return (
    <>
      <AdminHeader title="Manajemen Menu" subtitle="Kelola item menu restoran" />
      <main className="flex-1 overflow-y-auto p-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
              <input
                type="search"
                placeholder="Cari menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-input rounded-lg text-sm bg-background w-48 focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Cari menu"
              />
            </div>
            <div className="flex gap-1.5 overflow-x-auto" role="group" aria-label="Filter kategori">
              <button
                onClick={() => setActiveCategory(null)}
                className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap', activeCategory === null ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80')}
              >
                Semua
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                  className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap', activeCategory === cat.id ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80')}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
          <button onClick={openAdd} className="btn-primary shrink-0">
            <Plus className="w-4 h-4" aria-hidden="true" />
            Tambah Menu
          </button>
        </div>

        {/* Table */}
        <div className="admin-card p-0 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-muted-foreground text-sm">Memuat data...</div>
          ) : filteredItems.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-muted-foreground text-sm">Tidak ada menu ditemukan.</p>
              <button onClick={openAdd} className="mt-3 btn-primary text-xs">
                <Plus className="w-3.5 h-3.5" /> Tambah Menu Pertama
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full" aria-label="Daftar menu">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 w-12">Foto</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Nama</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Kategori</th>
                    <th className="text-right text-xs font-semibold text-muted-foreground px-4 py-3">Harga</th>
                    <th className="text-center text-xs font-semibold text-muted-foreground px-4 py-3">Status</th>
                    <th className="text-right text-xs font-semibold text-muted-foreground px-5 py-3">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          {item.image_url ? (
                            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <ImagePlus className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-foreground text-sm">{item.name}</p>
                          {item.is_bestseller && (
                            <span className="text-[10px] bg-primary/10 text-primary rounded px-1.5 py-0.5 font-medium">Best Seller</span>
                          )}
                          {item.is_recommended && !item.is_bestseller && (
                            <span className="text-[10px] bg-amber-50 text-amber-600 rounded px-1.5 py-0.5 font-medium">Recommended</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {item.category?.name ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-medium text-foreground">
                        {formatPrice(item.price)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => toggleAvailability(item)}
                          className="cursor-pointer"
                          aria-label={item.is_available ? 'Menu tersedia, klik untuk nonaktifkan' : 'Menu tidak tersedia, klik untuk aktifkan'}
                        >
                          {item.is_available ? (
                            <ToggleRight className="w-6 h-6 text-green-500" aria-hidden="true" />
                          ) : (
                            <ToggleLeft className="w-6 h-6 text-muted-foreground" aria-hidden="true" />
                          )}
                        </button>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEdit(item)}
                            className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                            aria-label={`Edit ${item.name}`}
                          >
                            <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
                            aria-label={`Hapus ${item.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="form-title">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 id="form-title" className="font-semibold text-foreground">{editingItem ? 'Edit Menu' : 'Tambah Menu Baru'}</h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-muted cursor-pointer text-muted-foreground" aria-label="Tutup form">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label htmlFor="item-name" className="form-label">Nama Menu *</label>
                <input id="item-name" type="text" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="form-input" placeholder="Nasi Goreng Spesial" />
              </div>
              <div>
                <label htmlFor="item-desc" className="form-label">Deskripsi</label>
                <textarea id="item-desc" rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="form-textarea" placeholder="Deskripsi singkat menu..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="item-price" className="form-label">Harga (Rp) *</label>
                  <input id="item-price" type="number" required min="0" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} className="form-input" placeholder="25000" />
                </div>
                <div>
                  <label htmlFor="item-category" className="form-label">Kategori *</label>
                  <select id="item-category" required value={form.category_id} onChange={(e) => setForm((f) => ({ ...f, category_id: e.target.value }))} className="form-input cursor-pointer">
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="item-badge" className="form-label">Label Badge</label>
                <input id="item-badge" type="text" value={form.badge_label} onChange={(e) => setForm((f) => ({ ...f, badge_label: e.target.value }))} className="form-input" placeholder="Best Seller / Recommended" />
              </div>
              <div className="flex gap-5 pt-1">
                {[
                  { key: 'is_available', label: 'Tersedia' },
                  { key: 'is_bestseller', label: 'Best Seller' },
                  { key: 'is_recommended', label: 'Recommended' },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form[key as keyof typeof form] as boolean}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.checked }))}
                      className="w-4 h-4 rounded border-input text-primary focus:ring-ring cursor-pointer"
                    />
                    <span className="text-sm text-foreground">{label}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1">Batal</button>
                <button type="submit" disabled={saving} className="btn-primary flex-1">
                  {saving ? 'Menyimpan...' : (editingItem ? 'Simpan Perubahan' : 'Tambah Menu')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
