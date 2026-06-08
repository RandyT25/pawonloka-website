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

export function getIsOpenNow(): boolean {
  try {
    const jakartaDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }))
    const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    const todayName = dayNames[jakartaDate.getDay()]
    const todayHours = BUSINESS_HOURS.find((h) => h.day === todayName)
    if (!todayHours || !todayHours.isOpen) return false
    const current = jakartaDate.getHours() * 60 + jakartaDate.getMinutes()
    const [oh, om] = todayHours.open.split(':').map(Number)
    const [ch, cm] = todayHours.close.split(':').map(Number)
    const openMin = oh * 60 + om
    const closeMin = ch === 0 && cm === 0 ? 24 * 60 : ch * 60 + cm
    return current >= openMin && current < closeMin
  } catch {
    return false
  }
}

export const NAV_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/menu', label: 'Menu' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/tentang', label: 'Tentang' },
  { href: '/kontak', label: 'Kontak' },
] as const

export const WHATSAPP_MESSAGE = encodeURIComponent(
  'Halo PawonLoka! Saya ingin memesan / bertanya mengenai menu. Boleh dibantu? Terima kasih'
)
export const WHATSAPP_ORDER_URL = `${RESTAURANT.whatsappUrl}?text=${WHATSAPP_MESSAGE}`

export const MENU_CATEGORIES = [
  { id: 1, name: 'Hidangan Utama', slug: 'hidangan-utama' },
  { id: 2, name: 'Nasi & Mie', slug: 'nasi-mie' },
  { id: 3, name: 'Snack', slug: 'snack' },
  { id: 4, name: 'Extra', slug: 'extra' },
  { id: 5, name: 'Gen-Z Special', slug: 'genz-special' },
  { id: 6, name: 'Dessert', slug: 'dessert' },
  { id: 7, name: 'Minuman', slug: 'minuman' },
] as const
