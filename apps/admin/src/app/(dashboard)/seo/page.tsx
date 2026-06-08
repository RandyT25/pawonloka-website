'use client'

import { useState, useEffect, useRef } from 'react'
import { Save, CheckCircle, Globe } from 'lucide-react'
import { AdminHeader } from '@/components/layout/AdminHeader'
import { createClient } from '@/lib/supabase/client'

const PAGES = [
  { path: '/', label: 'Beranda (Home)' },
  { path: '/menu', label: 'Menu' },
  { path: '/tentang', label: 'Tentang Kami' },
  { path: '/galeri', label: 'Galeri' },
  { path: '/kontak', label: 'Kontak' },
]

interface SeoData {
  meta_title: string
  meta_description: string
  canonical_url: string
  og_image_url: string
}

export default function SeoPage() {
  const [selectedPage, setSelectedPage] = useState('/')
  const [seoData, setSeoData] = useState<Record<string, SeoData>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const supabase = useRef(createClient()).current

  useEffect(() => {
    const loadSeo = async () => {
      const { data } = await supabase.from('seo_settings').select('*')
      if (data) {
        const map: Record<string, SeoData> = {}
        data.forEach((row) => {
          map[row.page_path] = {
            meta_title: row.meta_title ?? '',
            meta_description: row.meta_description ?? '',
            canonical_url: row.canonical_url ?? '',
            og_image_url: row.og_image_url ?? '',
          }
        })
        setSeoData(map)
      }
      setLoading(false)
    }
    loadSeo()
  }, [])

  const currentData = seoData[selectedPage] ?? { meta_title: '', meta_description: '', canonical_url: '', og_image_url: '' }

  const updateField = (field: keyof SeoData, value: string) => {
    setSeoData((prev) => ({
      ...prev,
      [selectedPage]: { ...currentData, [field]: value },
    }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await supabase.from('seo_settings').upsert({
      page_path: selectedPage,
      ...currentData,
    }, { onConflict: 'page_path' })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <>
      <AdminHeader title="Manajemen SEO" subtitle="Kelola meta tag dan optimasi mesin pencari" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl">
          {/* Page Selector */}
          <div className="flex gap-2 flex-wrap mb-6" role="group" aria-label="Pilih halaman untuk SEO">
            {PAGES.map(({ path, label }) => (
              <button
                key={path}
                onClick={() => setSelectedPage(path)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  selectedPage === path ? 'bg-primary text-white' : 'bg-white border border-border text-muted-foreground hover:bg-muted'
                }`}
              >
                <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center text-muted-foreground py-12">Memuat data SEO...</div>
          ) : (
            <form onSubmit={handleSave} className="admin-card space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <h2 className="font-semibold text-foreground">SEO: {PAGES.find((p) => p.path === selectedPage)?.label}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Halaman: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">{selectedPage}</code></p>
                </div>
              </div>

              <div>
                <label htmlFor="meta-title" className="form-label">Meta Title</label>
                <input
                  id="meta-title"
                  type="text"
                  value={currentData.meta_title}
                  onChange={(e) => updateField('meta_title', e.target.value)}
                  className="form-input"
                  placeholder="Judul halaman untuk mesin pencari (50-60 karakter)"
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground mt-1">{currentData.meta_title.length}/60 karakter</p>
              </div>

              <div>
                <label htmlFor="meta-desc" className="form-label">Meta Description</label>
                <textarea
                  id="meta-desc"
                  rows={3}
                  value={currentData.meta_description}
                  onChange={(e) => updateField('meta_description', e.target.value)}
                  className="form-textarea"
                  placeholder="Deskripsi halaman untuk mesin pencari (150-160 karakter)"
                  maxLength={160}
                />
                <p className="text-xs text-muted-foreground mt-1">{currentData.meta_description.length}/160 karakter</p>
              </div>

              <div>
                <label htmlFor="canonical" className="form-label">Canonical URL</label>
                <input
                  id="canonical"
                  type="url"
                  value={currentData.canonical_url}
                  onChange={(e) => updateField('canonical_url', e.target.value)}
                  className="form-input"
                  placeholder="https://pawonloka.com/..."
                />
              </div>

              <div>
                <label htmlFor="og-image" className="form-label">Open Graph Image URL</label>
                <input
                  id="og-image"
                  type="url"
                  value={currentData.og_image_url}
                  onChange={(e) => updateField('og_image_url', e.target.value)}
                  className="form-input"
                  placeholder="https://pawonloka.com/og-image.jpg"
                />
                <p className="text-xs text-muted-foreground mt-1">Ukuran ideal: 1200 × 630px</p>
              </div>

              {/* Preview */}
              {(currentData.meta_title || currentData.meta_description) && (
                <div className="bg-muted/50 rounded-xl p-4 border border-border">
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Preview Google</p>
                  <div className="text-blue-600 text-sm font-medium">{currentData.meta_title || 'Judul halaman'}</div>
                  <div className="text-green-700 text-xs">pawonloka.com{selectedPage}</div>
                  <div className="text-gray-600 text-xs mt-0.5 line-clamp-2">{currentData.meta_description || 'Deskripsi halaman akan muncul di sini...'}</div>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-primary">
                  {saving ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                      Menyimpan...
                    </span>
                  ) : (
                    <><Save className="w-4 h-4" aria-hidden="true" /> Simpan SEO</>
                  )}
                </button>
                {saved && (
                  <div className="flex items-center gap-2 text-green-600 text-sm" role="status" aria-live="polite">
                    <CheckCircle className="w-4 h-4" aria-hidden="true" />
                    Tersimpan!
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </main>
    </>
  )
}
