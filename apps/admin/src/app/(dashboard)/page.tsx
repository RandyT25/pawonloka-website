import { createClient } from '@/lib/supabase/server'
import { AdminHeader } from '@/components/layout/AdminHeader'
import { Users, UtensilsCrossed, Images, MessageSquare, TrendingUp, Eye } from 'lucide-react'

async function getStats(supabase: Awaited<ReturnType<typeof createClient>>) {
  const [menuResult, galleryResult, submissionsResult] = await Promise.all([
    supabase.from('menu_items').select('id', { count: 'exact', head: true }),
    supabase.from('gallery_images').select('id', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('id', { count: 'exact', head: true }).eq('status', 'unread'),
  ])

  return {
    menuCount: menuResult.count ?? 0,
    galleryCount: galleryResult.count ?? 0,
    unreadSubmissions: submissionsResult.count ?? 0,
  }
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const stats = await getStats(supabase).catch(() => ({
    menuCount: 0,
    galleryCount: 0,
    unreadSubmissions: 0,
  }))

  const statCards = [
    { label: 'Total Menu', value: stats.menuCount.toString(), icon: UtensilsCrossed, color: 'text-primary', bg: 'bg-primary/10', trend: '+0' },
    { label: 'Foto Galeri', value: stats.galleryCount.toString(), icon: Images, color: 'text-secondary-500', bg: 'bg-secondary-50', trend: '+0' },
    { label: 'Pesan Baru', value: stats.unreadSubmissions.toString(), icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50', trend: '' },
    { label: 'Pengunjung Hari Ini', value: '—', icon: Eye, color: 'text-purple-600', bg: 'bg-purple-50', trend: '' },
  ]

  return (
    <>
      <AdminHeader title="Dashboard" subtitle="Selamat datang di panel admin PawonLoka" />
      <main className="flex-1 overflow-y-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map(({ label, value, icon: Icon, color, bg, trend }) => (
            <div key={label} className="admin-card">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${color}`} aria-hidden="true" />
                </div>
                {trend && (
                  <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                    <TrendingUp className="w-3 h-3" aria-hidden="true" />
                    {trend}
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="admin-card lg:col-span-2">
            <h2 className="font-semibold text-foreground mb-4">Aksi Cepat</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { href: '/menu', label: 'Tambah Menu Baru', desc: 'Tambah item menu ke database', icon: UtensilsCrossed },
                { href: '/galeri', label: 'Upload Foto', desc: 'Tambah foto ke galeri website', icon: Images },
                { href: '/pengaturan', label: 'Edit Info Restoran', desc: 'Perbarui informasi restoran', icon: Users },
                { href: '/seo', label: 'Kelola SEO', desc: 'Optimasi meta tag & deskripsi', icon: TrendingUp },
              ].map(({ href, label, desc, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer group"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="admin-card">
            <h2 className="font-semibold text-foreground mb-4">Info Website</h2>
            <div className="space-y-3">
              {[
                { label: 'Domain Utama', value: 'pawonloka.com' },
                { label: 'Admin Panel', value: 'admin.pawonloka.com' },
                { label: 'Database', value: 'Supabase' },
                { label: 'Deployment', value: 'Vercel' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium text-foreground text-xs bg-muted px-2 py-0.5 rounded">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" aria-hidden="true" />
                <span className="text-xs text-muted-foreground">Semua sistem berjalan normal</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
