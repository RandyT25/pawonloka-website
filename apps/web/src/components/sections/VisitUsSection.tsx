import Link from 'next/link'
import { MapPin, Phone, Clock, Navigation } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { BUSINESS_HOURS, RESTAURANT, WHATSAPP_ORDER_URL } from '@/lib/constants'

export function VisitUsSection() {
  return (
    <section className="section-padding bg-warm-900" aria-labelledby="visit-heading">
      <div className="container-wide">
        <SectionHeader
          label="Kunjungi Kami"
          title="Temukan PawonLoka"
          subtitle="Kami ada untuk Anda setiap hari. Datang dan nikmati kehangatan bersama keluarga."
          className="mb-12 [&_h2]:text-white [&_p]:text-warm-400 [&_.section-label]:text-primary-300"
        />

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Info Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address */}
            <div className="bg-warm-800 rounded-2xl p-6 border border-warm-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">Alamat</p>
                  <address className="text-sm text-warm-300 not-italic leading-relaxed">
                    {RESTAURANT.address.street}<br />
                    {RESTAURANT.address.village}<br />
                    {RESTAURANT.address.district}<br />
                    {RESTAURANT.address.city}, {RESTAURANT.address.province} {RESTAURANT.address.postalCode}
                  </address>
                  <a
                    href={RESTAURANT.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-primary-300 text-sm hover:text-primary-200 transition-colors cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                    Buka di Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-warm-800 rounded-2xl p-6 border border-warm-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">Hubungi Kami</p>
                  <a
                    href={`tel:${RESTAURANT.phoneE164}`}
                    className="text-warm-300 hover:text-white text-sm transition-colors cursor-pointer block"
                  >
                    {RESTAURANT.phone}
                  </a>
                  <a
                    href={RESTAURANT.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 mt-2 text-[#4ADE80] text-sm hover:text-[#86EFAC] transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Chat WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-warm-800 rounded-2xl p-6 border border-warm-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <p className="font-semibold text-white">Jam Operasional</p>
              </div>
              <ul className="space-y-2.5">
                {BUSINESS_HOURS.map(({ day, open, close, isOpen }) => (
                  <li key={day} className="flex items-center justify-between text-sm">
                    <span className="text-warm-400">{day}</span>
                    {isOpen ? (
                      <span className="text-warm-200 font-medium tabular-nums">{open} – {close}</span>
                    ) : (
                      <span className="text-warm-600 italic">Tutup</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-3">
            <div className="relative rounded-2xl overflow-hidden border border-warm-700 h-full min-h-80">
              {/* Map iframe */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.890245714456!2d107.0!3d-6.53!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPawonLoka!5e0!3m2!1sid!2sid!4v1234567890!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta lokasi PawonLoka di Citra Indah City, Jonggol, Bogor"
                className="absolute inset-0 w-full h-full"
              />

              {/* CTA overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={RESTAURANT.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 flex-1 py-3 bg-white text-warm-900 rounded-xl font-semibold text-sm shadow-warm-lg hover:bg-warm-50 transition-colors cursor-pointer"
                  >
                    <Navigation className="w-4 h-4 text-primary" aria-hidden="true" />
                    Petunjuk Arah
                  </a>
                  <a
                    href={WHATSAPP_ORDER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 flex-1 py-3 bg-primary text-white rounded-xl font-semibold text-sm shadow-warm-lg hover:bg-primary-600 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Pesan Sekarang
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 id="visit-heading" className="sr-only">Informasi Kunjungan PawonLoka</h2>
    </section>
  )
}
