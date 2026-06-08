export const SITE_NAME = 'PawonLoka'
export const SITE_TAGLINE = 'Warung Hangat untuk Keluarga dan Sahabat'
export const SITE_DESCRIPTION =
  'Nikmati cita rasa masakan Indonesia yang hangat dan autentik di PawonLoka, Citra Indah City. Tempat makan keluarga dengan suasana nyaman dan menu pilihan terbaik.'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pawonloka.com'

export const RESTAURANT = {
  name: 'PawonLoka',
  fullName: 'PawonLoka – Warung Hangat Citra Indah City',
  tagline: 'Warung Hangat untuk Keluarga dan Sahabat',
  address: {
    street: 'Citra Indah City Blok CH No.0025',
    village: 'Bukit Meranti',
    district: 'Kec. Jonggol',
    city: 'Kabupaten Bogor',
    province: 'Jawa Barat',
    postalCode: '16830',
    country: 'Indonesia',
    full: 'Citra Indah City Blok CH No.0025, Bukit Meranti, Kec. Jonggol, Kabupaten Bogor, Jawa Barat 16830',
  },
  phone: '0822-9923-8866',
  phoneE164: '+6282299238866',
  whatsapp: '6282299238866',
  whatsappUrl: 'https://wa.me/6282299238866',
  email: 'hello@pawonloka.com',
  googleRating: '4.8',
  reviewCount: '100+',
  yearsServing: '2+',
  menuCount: '50+',
  googleMapsUrl: 'https://maps.google.com/?q=Citra+Indah+City+Blok+CH+No.0025+Jonggol+Bogor',
  googleMapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.5!2d107.0!3d-6.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPawonLoka!5e0!3m2!1sid!2sid!4v1234567890',
  social: {
    instagram: 'https://instagram.com/pawonloka',
    facebook: 'https://facebook.com/pawonloka',
    tiktok: 'https://tiktok.com/@pawonloka',
    googleBusiness: 'https://g.page/pawonloka',
  },
} as const

export const BUSINESS_HOURS = [
  { day: 'Senin', open: '16:00', close: '00:00', isOpen: true },
  { day: 'Selasa', open: '16:00', close: '23:00', isOpen: true },
  { day: 'Rabu', open: '16:00', close: '23:00', isOpen: true },
  { day: 'Kamis', open: '16:00', close: '23:00', isOpen: true },
  { day: 'Jumat', open: '16:00', close: '00:00', isOpen: true },
  { day: 'Sabtu', open: '12:00', close: '00:00', isOpen: true },
  { day: 'Minggu', open: '12:00', close: '00:00', isOpen: true },
] as const

export const NAV_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/menu', label: 'Menu' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/tentang', label: 'Tentang' },
  { href: '/kontak', label: 'Kontak' },
] as const

export const WHATSAPP_MESSAGE = encodeURIComponent(
  'Halo PawonLoka! Saya ingin memesan / bertanya mengenai menu. Boleh dibantu? 😊'
)
export const WHATSAPP_ORDER_URL = `${RESTAURANT.whatsappUrl}?text=${WHATSAPP_MESSAGE}`

export const MENU_CATEGORIES = [
  { id: 1, name: 'Nasi', slug: 'nasi', icon: '🍚' },
  { id: 2, name: 'Mie', slug: 'mie', icon: '🍜' },
  { id: 3, name: 'Minuman', slug: 'minuman', icon: '🥤' },
  { id: 4, name: 'Cemilan', slug: 'cemilan', icon: '🍟' },
  { id: 5, name: 'Spesial', slug: 'spesial', icon: '⭐' },
] as const
