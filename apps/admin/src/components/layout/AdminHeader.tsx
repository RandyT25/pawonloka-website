import { Bell } from 'lucide-react'

interface AdminHeaderProps {
  title: string
  subtitle?: string
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-border">
      <div>
        <h1 className="font-semibold text-foreground text-base">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        <a
          href={process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-3 py-1.5 cursor-pointer"
        >
          Lihat Website →
        </a>
        <button
          className="relative w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          aria-label="Notifikasi"
        >
          <Bell className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
