import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDate(dateString: string, locale = 'id-ID'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '…'
}

export function getCurrentDayHours(
  hours: Array<{ day: string; open: string; close: string; isOpen: boolean }>
): { today: (typeof hours)[0]; isCurrentlyOpen: boolean } {
  const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  const now = new Date()
  const dayIndex = now.getDay()
  const todayName = dayNames[dayIndex]
  const today = hours.find((h) => h.day === todayName) ?? hours[0]

  if (!today.isOpen) return { today, isCurrentlyOpen: false }

  const [openHour, openMin] = today.open.split(':').map(Number)
  const [closeHour, closeMin] = today.close.split(':').map(Number)
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const openMinutes = openHour * 60 + openMin
  let closeMinutes = closeHour * 60 + closeMin
  if (closeMinutes < openMinutes) closeMinutes += 24 * 60

  const isCurrentlyOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes

  return { today, isCurrentlyOpen }
}
