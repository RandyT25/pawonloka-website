'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  UtensilsCrossed,
  Images,
  Settings,
  Search,
  Clock,
  BarChart3,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

const NAV_ITEMS = [
  {
    group: 'Utama',
    items: [
      { href: '/', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/analytics', label: 'Analitik', icon: BarChart3 },
    ],
  },
  {
    group: 'Konten',
    items: [
      { href: '/menu', label: 'Manajemen Menu', icon: UtensilsCrossed },
      { href: '/galeri', label: 'Galeri', icon: Images },
    ],
  },
  {
    group: 'Pengaturan',
    items: [
      { href: '/pengaturan', label: 'Pengaturan Restoran', icon: Settings },
      { href: '/jam-operasional', label: 'Jam Operasional', icon: Clock },
      { href: '/seo', label: 'SEO', icon: Search },
    ],
  },
]

interface AdminSidebarProps {
  user: { email?: string; user_metadata?: { full_name?: string; avatar_url?: string } } | null
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const displayName = user?.user_metadata?.full_name ?? user?.email?.split('@')[0] ?? 'Admin'
  const initials = displayName.split(' ').slice(0, 2).map((n: string) => n[0]).join('').toUpperCase()

  return (
    <aside className="w-64 shrink-0 bg-sidebar flex flex-col h-full" aria-label="Navigasi admin">
      {/* Logo */}
      <div className="flex flex-col items-center justify-center h-20 border-b border-sidebar-border px-4">
        <Image src="/logo-dark.png" alt="PawonLoka" width={150} height={60} className="h-12 w-auto" priority />
        <p className="text-sidebar-muted text-[9px] tracking-wider uppercase mt-1">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3" aria-label="Menu admin">
        {NAV_ITEMS.map(({ group, items }) => (
          <div key={group} className="mb-6">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-muted px-3 mb-2">
              {group}
            </p>
            <ul className="space-y-0.5">
              {items.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group cursor-pointer',
                        isActive
                          ? 'bg-primary/20 text-white border border-primary/20'
                          : 'text-sidebar-muted hover:bg-sidebar-hover hover:text-white'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <Icon
                        className={cn(
                          'w-4 h-4 shrink-0 transition-colors',
                          isActive ? 'text-primary' : 'text-sidebar-muted group-hover:text-white'
                        )}
                        aria-hidden="true"
                      />
                      {label}
                      {isActive && (
                        <ChevronRight className="w-3 h-3 ml-auto text-primary" aria-hidden="true" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User Footer */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg mb-1">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{displayName}</p>
            <p className="text-sidebar-muted text-xs truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2.5 w-full px-3 py-2 text-sidebar-muted hover:text-white hover:bg-sidebar-hover rounded-lg text-sm transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" aria-hidden="true" />
          Keluar
        </button>
      </div>
    </aside>
  )
}
