export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      menu_categories: {
        Row: MenuCategory
        Insert: Omit<MenuCategory, 'id' | 'created_at'>
        Update: Partial<Omit<MenuCategory, 'id' | 'created_at'>>
      }
      menu_items: {
        Row: MenuItem
        Insert: Omit<MenuItem, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<MenuItem, 'id' | 'created_at' | 'updated_at'>>
      }
      gallery_categories: {
        Row: GalleryCategory
        Insert: Omit<GalleryCategory, 'id' | 'created_at'>
        Update: Partial<Omit<GalleryCategory, 'id' | 'created_at'>>
      }
      gallery_images: {
        Row: GalleryImage
        Insert: Omit<GalleryImage, 'id' | 'created_at'>
        Update: Partial<Omit<GalleryImage, 'id' | 'created_at'>>
      }
      reviews: {
        Row: Review
        Insert: Omit<Review, 'id' | 'created_at'>
        Update: Partial<Omit<Review, 'id' | 'created_at'>>
      }
      settings: {
        Row: Setting
        Insert: Omit<Setting, 'id' | 'updated_at'>
        Update: Partial<Omit<Setting, 'id' | 'updated_at'>>
      }
      business_hours: {
        Row: BusinessHour
        Insert: Omit<BusinessHour, 'id'>
        Update: Partial<Omit<BusinessHour, 'id'>>
      }
      seo_settings: {
        Row: SeoSetting
        Insert: Omit<SeoSetting, 'id' | 'updated_at'>
        Update: Partial<Omit<SeoSetting, 'id' | 'updated_at'>>
      }
      contact_submissions: {
        Row: ContactSubmission
        Insert: Omit<ContactSubmission, 'id' | 'created_at'>
        Update: Partial<Omit<ContactSubmission, 'id' | 'created_at'>>
      }
      analytics_events: {
        Row: AnalyticsEvent
        Insert: Omit<AnalyticsEvent, 'id' | 'created_at'>
        Update: never
      }
    }
  }
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

export interface GalleryCategory {
  id: number
  name: string
  slug: string
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
  category?: GalleryCategory
}

export interface Review {
  id: number
  reviewer_name: string
  reviewer_avatar: string | null
  rating: number
  content: string
  platform: 'google' | 'manual'
  is_featured: boolean
  review_date: string
  created_at: string
}

export interface Setting {
  id: number
  key: string
  value: string | null
  type: 'text' | 'number' | 'boolean' | 'json' | 'image'
  label: string
  description: string | null
  updated_at: string
}

export interface BusinessHour {
  id: number
  day_of_week: 0 | 1 | 2 | 3 | 4 | 5 | 6
  day_name: string
  is_open: boolean
  open_time: string | null
  close_time: string | null
}

export interface SeoSetting {
  id: number
  page_path: string
  meta_title: string | null
  meta_description: string | null
  canonical_url: string | null
  og_image_url: string | null
  structured_data: Json | null
  updated_at: string
}

export interface ContactSubmission {
  id: number
  name: string
  email: string | null
  phone: string | null
  subject: string | null
  message: string
  status: 'unread' | 'read' | 'replied'
  created_at: string
}

export interface AnalyticsEvent {
  id: number
  event_type: 'whatsapp_click' | 'call_click' | 'direction_click' | 'menu_view' | 'contact_submit' | 'page_view'
  page_path: string | null
  metadata: Json | null
  created_at: string
}

export interface RestaurantSettings {
  name: string
  tagline: string
  description: string
  address: string
  phone: string
  whatsapp: string
  email: string
  google_maps_url: string
  google_maps_embed: string
  instagram: string
  facebook: string
  tiktok: string
  google_rating: string
  review_count: string
  years_serving: string
  hero_title: string
  hero_subtitle: string
  hero_image_url: string
  about_story: string
  logo_url: string
  favicon_url: string
  og_image_url: string
}

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6
