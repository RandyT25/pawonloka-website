'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import { MapPin, Phone, Clock, Instagram, Send, CheckCircle } from 'lucide-react'
import { BUSINESS_HOURS, RESTAURANT, SITE_URL, WHATSAPP_ORDER_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function KontakPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    // TODO: Connect to Supabase contact_submissions table
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setStatus('success')
    setForm({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-12 bg-warm-900">
        <div className="container-wide">
          <p className="section-label mb-4 text-primary-300">Hubungi Kami</p>
          <h1 className="font-display font-bold text-display-xl text-white text-balance max-w-lg mb-4">
            Ada Pertanyaan?<br />Kami Siap Membantu
          </h1>
          <p className="text-warm-400 text-lg max-w-md">
            Hubungi kami via WhatsApp untuk respons tercepat, atau gunakan form di bawah.
          </p>
        </div>
      </div>

      <div className="section-padding bg-warm-50">
        <div className="container-wide">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-5">
              {/* WhatsApp - Featured */}
              <a
                href={WHATSAPP_ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 bg-[#25D366] text-white rounded-2xl p-6 cursor-pointer hover:brightness-105 transition-all group"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-lg">WhatsApp</p>
                  <p className="text-white/80 text-sm mt-0.5">{RESTAURANT.phone}</p>
                  <p className="text-white/60 text-xs mt-1">Respons tercepat &lt; 15 menit</p>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${RESTAURANT.phoneE164}`}
                className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-warm-100 hover:shadow-warm-md transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-warm-800">Telepon</p>
                  <p className="text-warm-600 text-sm mt-0.5">{RESTAURANT.phone}</p>
                </div>
              </a>

              {/* Address */}
              <a
                href={RESTAURANT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-warm-100 hover:shadow-warm-md transition-all cursor-pointer"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-warm-800">Alamat</p>
                  <address className="text-warm-600 text-sm mt-0.5 not-italic leading-relaxed">
                    {RESTAURANT.address.street}<br />
                    {RESTAURANT.address.village}, {RESTAURANT.address.district}<br />
                    {RESTAURANT.address.city} {RESTAURANT.address.postalCode}
                  </address>
                </div>
              </a>

              {/* Hours */}
              <div className="bg-white rounded-2xl p-5 border border-warm-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <p className="font-semibold text-warm-800">Jam Buka</p>
                </div>
                <ul className="space-y-2">
                  {BUSINESS_HOURS.map(({ day, open, close, isOpen }) => (
                    <li key={day} className="flex items-center justify-between text-sm">
                      <span className="text-warm-600">{day}</span>
                      {isOpen ? (
                        <span className="text-warm-800 font-medium tabular-nums">{open} – {close}</span>
                      ) : (
                        <span className="text-warm-400 italic">Tutup</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social */}
              <div className="bg-white rounded-2xl p-5 border border-warm-100">
                <p className="font-semibold text-warm-800 mb-4">Ikuti Kami</p>
                <div className="flex gap-3">
                  <a
                    href={RESTAURANT.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-warm-50 text-warm-600 hover:bg-primary/10 hover:text-primary text-sm font-medium transition-all cursor-pointer border border-warm-100"
                    aria-label="Instagram PawonLoka"
                  >
                    <Instagram className="w-4 h-4" aria-hidden="true" />
                    Instagram
                  </a>
                  <a
                    href={RESTAURANT.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-warm-50 text-warm-600 hover:bg-primary/10 hover:text-primary text-sm font-medium transition-all cursor-pointer border border-warm-100"
                    aria-label="TikTok PawonLoka"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.15 8.15 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
                    </svg>
                    TikTok
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-8 border border-warm-100 shadow-warm">
                {status === 'success' ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-5" aria-hidden="true" />
                    <h2 className="font-display font-bold text-display-sm text-warm-900 mb-3">
                      Pesan Terkirim!
                    </h2>
                    <p className="text-warm-500 mb-6">
                      Terima kasih telah menghubungi kami. Kami akan merespons secepatnya.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors cursor-pointer"
                    >
                      Kirim Pesan Lain
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-display font-bold text-display-sm text-warm-900 mb-2">
                      Kirim Pesan
                    </h2>
                    <p className="text-warm-500 text-sm mb-7">
                      Isi form di bawah dan kami akan membalas pesan Anda.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-warm-700 mb-1.5">
                            Nama Lengkap <span className="text-primary" aria-hidden="true">*</span>
                          </label>
                          <input
                            id="name"
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                            className="w-full px-4 py-3 bg-warm-50 border border-warm-200 rounded-xl text-warm-800 text-sm placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            placeholder="Nama Anda"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-warm-700 mb-1.5">
                            Nomor WhatsApp
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                            className="w-full px-4 py-3 bg-warm-50 border border-warm-200 rounded-xl text-warm-800 text-sm placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            placeholder="08xx-xxxx-xxxx"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-warm-700 mb-1.5">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          className="w-full px-4 py-3 bg-warm-50 border border-warm-200 rounded-xl text-warm-800 text-sm placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                          placeholder="email@contoh.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-warm-700 mb-1.5">
                          Subjek
                        </label>
                        <select
                          id="subject"
                          value={form.subject}
                          onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                          className="w-full px-4 py-3 bg-warm-50 border border-warm-200 rounded-xl text-warm-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all cursor-pointer"
                        >
                          <option value="">Pilih subjek...</option>
                          <option value="pemesanan">Pemesanan / Reservasi</option>
                          <option value="catering">Catering / Event</option>
                          <option value="feedback">Masukan & Saran</option>
                          <option value="kerjasama">Kerjasama Bisnis</option>
                          <option value="lainnya">Lainnya</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-warm-700 mb-1.5">
                          Pesan <span className="text-primary" aria-hidden="true">*</span>
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={5}
                          value={form.message}
                          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                          className="w-full px-4 py-3 bg-warm-50 border border-warm-200 rounded-xl text-warm-800 text-sm placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                          placeholder="Tulis pesan Anda di sini..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className={cn(
                          'w-full flex items-center justify-center gap-2.5 py-3.5 bg-primary text-white rounded-xl font-semibold transition-all duration-200 cursor-pointer',
                          status === 'submitting'
                            ? 'opacity-70 cursor-not-allowed'
                            : 'hover:bg-primary-600 hover:shadow-warm'
                        )}
                      >
                        {status === 'submitting' ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                            Mengirim...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" aria-hidden="true" />
                            Kirim Pesan
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>

              {/* Map */}
              <div className="mt-6 rounded-2xl overflow-hidden border border-warm-200 h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.890245714456!2d107.0!3d-6.53!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPawonLoka!5e0!3m2!1sid!2sid!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi PawonLoka di Google Maps"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
