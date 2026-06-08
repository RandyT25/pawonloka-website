import { AdminHeader } from '@/components/layout/AdminHeader'
import { BarChart3, ExternalLink } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <>
      <AdminHeader title="Analitik" subtitle="Data pengunjung dan performa website" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {/* GA4 */}
          <div className="admin-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-orange-500" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Google Analytics 4</h2>
                <p className="text-xs text-muted-foreground">Pantau pengunjung website</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Lihat data pengunjung, sumber traffic, dan perilaku pengguna secara detail di Google Analytics.
            </p>
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm w-full justify-center cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              Buka Google Analytics
            </a>
          </div>

          {/* Clarity */}
          <div className="admin-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Microsoft Clarity</h2>
                <p className="text-xs text-muted-foreground">Heatmap & session recording</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Lihat rekaman sesi pengguna dan heatmap untuk memahami bagaimana pengunjung berinteraksi dengan website.
            </p>
            <a
              href="https://clarity.microsoft.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm w-full justify-center cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              Buka Microsoft Clarity
            </a>
          </div>
        </div>

        {/* Setup Guide */}
        <div className="admin-card max-w-4xl mt-6">
          <h2 className="font-semibold text-foreground mb-4">Cara Setup Analytics</h2>
          <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
            <li>Buat akun <strong className="text-foreground">Google Analytics 4</strong> dan dapatkan Measurement ID (G-XXXXXXXXXX)</li>
            <li>Tambahkan <code className="bg-muted px-1.5 py-0.5 rounded text-xs">NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX</code> ke environment variables Vercel</li>
            <li>Buat akun <strong className="text-foreground">Microsoft Clarity</strong> dan dapatkan Project ID</li>
            <li>Tambahkan <code className="bg-muted px-1.5 py-0.5 rounded text-xs">NEXT_PUBLIC_CLARITY_PROJECT_ID=xxxxxxxxxx</code> ke environment variables Vercel</li>
            <li>Deploy ulang website untuk mengaktifkan tracking</li>
          </ol>
        </div>
      </main>
    </>
  )
}
