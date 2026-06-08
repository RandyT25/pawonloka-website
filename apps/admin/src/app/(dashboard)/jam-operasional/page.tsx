'use client'

import { useState, useEffect, useRef } from 'react'
import { Save, CheckCircle } from 'lucide-react'
import { AdminHeader } from '@/components/layout/AdminHeader'
import { createClient } from '@/lib/supabase/client'
import { BUSINESS_HOURS } from '@/lib/constants'

const DAY_NAMES = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

interface HourData { day_name: string; is_open: boolean; open_time: string; close_time: string }

const DEFAULT_HOURS: HourData[] = [
  { day_name: 'Minggu', is_open: true, open_time: '12:00', close_time: '00:00' },
  { day_name: 'Senin', is_open: true, open_time: '16:00', close_time: '00:00' },
  { day_name: 'Selasa', is_open: true, open_time: '16:00', close_time: '23:00' },
  { day_name: 'Rabu', is_open: true, open_time: '16:00', close_time: '23:00' },
  { day_name: 'Kamis', is_open: true, open_time: '16:00', close_time: '23:00' },
  { day_name: 'Jumat', is_open: true, open_time: '16:00', close_time: '00:00' },
  { day_name: 'Sabtu', is_open: true, open_time: '12:00', close_time: '00:00' },
]

export default function JamOperasionalPage() {
  const [hours, setHours] = useState<HourData[]>(DEFAULT_HOURS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const supabase = useRef(createClient()).current

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('business_hours').select('*').order('day_of_week')
      if (data && data.length > 0) {
        setHours(data.map((row) => ({
          day_name: row.day_name,
          is_open: row.is_open,
          open_time: row.open_time ?? '08:00',
          close_time: row.close_time ?? '22:00',
        })))
      }
      setLoading(false)
    }
    load()
  }, [])

  const updateHour = (index: number, field: keyof HourData, value: string | boolean) => {
    setHours((prev) => prev.map((h, i) => i === index ? { ...h, [field]: value } : h))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const upserts = hours.map((h, i) => ({
      day_of_week: i,
      day_name: h.day_name,
      is_open: h.is_open,
      open_time: h.is_open ? h.open_time : null,
      close_time: h.is_open ? h.close_time : null,
    }))

    await supabase.from('business_hours').upsert(upserts, { onConflict: 'day_of_week' })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <>
      <AdminHeader title="Jam Operasional" subtitle="Atur jam buka restoran" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-xl">
          {loading ? (
            <div className="text-center text-muted-foreground py-12">Memuat data...</div>
          ) : (
            <form onSubmit={handleSave} className="admin-card space-y-3">
              <h2 className="font-semibold text-foreground pb-3 border-b border-border">Jadwal Mingguan</h2>

              {hours.map((hour, index) => (
                <div key={hour.day_name} className="flex items-center gap-4 py-2">
                  <div className="w-20 shrink-0">
                    <span className="text-sm font-medium text-foreground">{hour.day_name}</span>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={hour.is_open}
                      onChange={(e) => updateHour(index, 'is_open', e.target.checked)}
                      className="w-4 h-4 rounded border-input text-primary focus:ring-ring cursor-pointer"
                      aria-label={`${hour.day_name} buka`}
                    />
                    <span className="text-xs text-muted-foreground">{hour.is_open ? 'Buka' : 'Tutup'}</span>
                  </label>

                  {hour.is_open ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="time"
                        value={hour.open_time}
                        onChange={(e) => updateHour(index, 'open_time', e.target.value)}
                        className="form-input py-1.5 text-xs w-28"
                        aria-label={`Jam buka ${hour.day_name}`}
                      />
                      <span className="text-muted-foreground text-xs">–</span>
                      <input
                        type="time"
                        value={hour.close_time}
                        onChange={(e) => updateHour(index, 'close_time', e.target.value)}
                        className="form-input py-1.5 text-xs w-28"
                        aria-label={`Jam tutup ${hour.day_name}`}
                      />
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground italic">Tutup</span>
                  )}
                </div>
              ))}

              <div className="flex items-center gap-3 pt-3 border-t border-border">
                <button type="submit" disabled={saving} className="btn-primary">
                  {saving ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                      Menyimpan...
                    </span>
                  ) : (
                    <><Save className="w-4 h-4" aria-hidden="true" /> Simpan Jadwal</>
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
