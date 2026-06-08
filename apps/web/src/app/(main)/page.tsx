import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustSection } from '@/components/sections/TrustSection'
import { FeaturedMenuSection } from '@/components/sections/FeaturedMenuSection'
import { AboutPreviewSection } from '@/components/sections/AboutPreviewSection'
import { GalleryPreviewSection } from '@/components/sections/GalleryPreviewSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { VisitUsSection } from '@/components/sections/VisitUsSection'
import { RESTAURANT, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'PawonLoka – Warung Hangat untuk Keluarga dan Sahabat',
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    url: SITE_URL,
  },
}

const restaurantSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: RESTAURANT.fullName,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  telephone: RESTAURANT.phoneE164,
  address: {
    '@type': 'PostalAddress',
    streetAddress: RESTAURANT.address.street,
    addressLocality: RESTAURANT.address.district,
    addressRegion: RESTAURANT.address.province,
    postalCode: RESTAURANT.address.postalCode,
    addressCountry: 'ID',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -6.53,
    longitude: 107.0,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday'],
      opens: '16:00',
      closes: '00:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday'],
      opens: '16:00',
      closes: '23:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday', 'Saturday', 'Sunday'],
      opens: ['16:00', '12:00', '12:00'],
      closes: '00:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '100',
    bestRating: '5',
  },
  servesCuisine: 'Indonesian',
  priceRange: 'Rp',
  currenciesAccepted: 'IDR',
  paymentAccepted: 'Cash',
  hasMap: RESTAURANT.googleMapsUrl,
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <HeroSection />
      <TrustSection />
      <FeaturedMenuSection />
      <AboutPreviewSection />
      <GalleryPreviewSection />
      <TestimonialsSection />
      <VisitUsSection />
    </>
  )
}
