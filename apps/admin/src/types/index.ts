export interface MenuItem {
  id: number
  category_id: number
  name: string
  description: string | null
  price: number
  image_url: string | null
  is_available: boolean
  is_featured: boolean
  is_bestseller: boolean
  is_recommended: boolean
  badge_label: string | null
  display_order: number
  created_at: string
  updated_at: string
  category?: MenuCategory
}

export interface MenuCategory {
  id: number
  name: string
  slug: string
  description: string | null
  icon: string | null
  display_order: number
  is_active: boolean
  created_at: string
}

export interface GalleryImage {
  id: number
  category_id: number | null
  url: string
  alt_text: string | null
  caption: string | null
  display_order: number
  is_featured: boolean
  created_at: string
}
