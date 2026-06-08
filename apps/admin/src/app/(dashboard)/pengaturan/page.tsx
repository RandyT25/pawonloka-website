'use client'

import { useState, useEffect, useRef } from 'react'
import { Save, CheckCircle } from 'lucide-react'
import { AdminHeader } from '@/components/layout/AdminHeader'
import { createClient } from '@/lib/supabase/client'

interface SettingField {
  key: string
  label: string
  type: 'text' | 'textarea' | 'url' | 'tel'
  placeholder?: string
}

const SETTING_GROUPS: { title: string; fields: SettingField[] }[] = [
  {
    title: 'Informasi Restoran',
    fields: [
      { key: 'restaurant_name', label: 'Nama Restoran', type: 'text', placeholder: 'PawonLoka' },
      { key: 'restaurant_tagline', label: 'Tagline', type: 'text', placeholder: 'Warung Hangat untuk Keluarga dan Sahabat' },
      { key: 'restaurant_description', label: 'Deskripsi', type: 'textarea', placeholder: 'Deskripsi restoran...' },
      { key: 'restaurant_address', label: 'Alamat Lengkap', type: 'textarea', placeholder: 'Citra Indah City Blok CH...' },
    ],
  },
  {
    title: 'Kontak',
    fields: [
      { key: 'phone', label: 'Nomor Telepon', type: 'tel', placeholder: '0822-9923-8866' },
      { key: 'whatsapp', label: 'Nomor WhatsApp', type: 'tel', placeholder: '0822-9923-8866' },
      { key: 'email', label: 'Email', type: 'text', placeholder: 'hello@pawonloka.com' },
      { key: 'google_maps_url', label: 'URL Google Maps', type: 'url', placeholder: 'https://maps.google.com/...' },
    ],
  },
  {
    title: 'Media Sosial',
    fields: [
      { key: 'instagram', label: 'Instagram URL', type: 'url', placeholder: 'https://instagram.com/pawonloka' },
      { key: 'facebook', label: 'Facebook URL', type: 'url', placeholder: 'https://facebook.com/pawonloka' },
      { key: 'tiktok', label: 'TikTok URL', type: 'url', placeholder: 'https://tiktok.com/@pawonloka' },
    ],
  },
  {
    title: 'Hero Section',
    fields: [
      { key: 'hero_title', label: 'Judul Hero', type: 'text', placeholder: 'Warung Hangat untuk Keluarga dan Sahabat' },
      { key: 'hero_subtitle', label: 'Subjudul Hero', type: 'textarea', placeholder: 'Authentic Indonesian comfort food...' },
    ],
  },
]

export default function PengaturanPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const supabase = useRef(createClient()).current

  useEffect(() => {
    const loadSettings = async () => {
      const { data } = await supabase.from('settings').select('key, value')
      if (data) {
        const map: Record<string, string> = {}
        data.forEach(({ key, value }) => { map[key] = value ?? '' })
        setSettings(map)
      }
      setLoading(false)
    }
    loadSettings()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const upserts = Object.entries(settings).map(([key, value]) => ({
      key,
      value,
      type: 'text' as const,
      label: key,
    }))

    await supabase.from('settings').upsert(upserts, { onConflict: 'key' })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <>
      <AdminHeader title="Pengaturan Restoran" subtitle="Kelola informasi dan konten website" />
      <main className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="text-center text-muted-foreground py-20">Memuat pengaturan...</div>
        ) : (
          <form onSubmit={handleSave} className="max-w-2xl space-y-6">
            {SETTING_GROUPS.map(({ title, fields }) => (
              <div key={title} className="admin-card">
                <h2 className="font-semibold text-foreground mb-5 pb-3 border-b border-border">{title}</h2>
                <div className="space-y-4">
                  {fields.map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label htmlFor={`setting-${key}`} className="form-label">{label}</label>
                      {type === 'textarea' ? (
                        <textarea
                          id={`setting-${key}`}
                          rows={3}
                          value={settings[key] ?? ''}
                          onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))}
                          className="form-textarea"
                          placeholder={placeholder}
                        />
                      ) : (
                        <input
                          id={`setting-${key}`}
                          type={type}
                          value={settings[key] ?? ''}
                          onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))}
                          className="form-input"
                          placeholder={placeholder}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex items-center gap-3">
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                    Menyimpan...
                  </span>
                ) : (
                  <><Save className="w-4 h-4" aria-hidden="true" /> Simpan Perubahan</>
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
      </main>
    </>
  )
}
