-- ============================================================
-- PawonLoka Database Schema
-- Migration: 001_initial_schema
-- ============================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- MENU CATEGORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS menu_categories (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  icon        TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- MENU ITEMS
-- ============================================================
CREATE TABLE IF NOT EXISTS menu_items (
  id              SERIAL PRIMARY KEY,
  category_id     INTEGER NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  description     TEXT,
  price           INTEGER NOT NULL CHECK (price >= 0),
  image_url       TEXT,
  is_available    BOOLEAN NOT NULL DEFAULT true,
  is_featured     BOOLEAN NOT NULL DEFAULT false,
  is_bestseller   BOOLEAN NOT NULL DEFAULT false,
  is_recommended  BOOLEAN NOT NULL DEFAULT false,
  badge_label     TEXT,
  display_order   INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER menu_items_updated_at
  BEFORE UPDATE ON menu_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- GALLERY CATEGORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS gallery_categories (
  id            SERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active     BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- GALLERY IMAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS gallery_images (
  id            SERIAL PRIMARY KEY,
  category_id   INTEGER REFERENCES gallery_categories(id) ON DELETE SET NULL,
  url           TEXT NOT NULL,
  alt_text      TEXT,
  caption       TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_featured   BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- REVIEWS
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
  id              SERIAL PRIMARY KEY,
  reviewer_name   TEXT NOT NULL,
  reviewer_avatar TEXT,
  rating          SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  content         TEXT NOT NULL,
  platform        TEXT NOT NULL DEFAULT 'manual' CHECK (platform IN ('google', 'manual')),
  is_featured     BOOLEAN NOT NULL DEFAULT false,
  review_date     DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- SETTINGS (Key-Value store for all site settings)
-- ============================================================
CREATE TABLE IF NOT EXISTS settings (
  id          SERIAL PRIMARY KEY,
  key         TEXT NOT NULL UNIQUE,
  value       TEXT,
  type        TEXT NOT NULL DEFAULT 'text' CHECK (type IN ('text', 'number', 'boolean', 'json', 'image')),
  label       TEXT NOT NULL,
  description TEXT,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- BUSINESS HOURS
-- ============================================================
CREATE TABLE IF NOT EXISTS business_hours (
  id           SERIAL PRIMARY KEY,
  day_of_week  SMALLINT NOT NULL UNIQUE CHECK (day_of_week BETWEEN 0 AND 6),
  day_name     TEXT NOT NULL,
  is_open      BOOLEAN NOT NULL DEFAULT true,
  open_time    TIME,
  close_time   TIME
);

-- ============================================================
-- SEO SETTINGS
-- ============================================================
CREATE TABLE IF NOT EXISTS seo_settings (
  id               SERIAL PRIMARY KEY,
  page_path        TEXT NOT NULL UNIQUE,
  meta_title       TEXT,
  meta_description TEXT,
  canonical_url    TEXT,
  og_image_url     TEXT,
  structured_data  JSONB,
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER seo_settings_updated_at
  BEFORE UPDATE ON seo_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- CONTACT SUBMISSIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT,
  phone      TEXT,
  subject    TEXT,
  message    TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- ANALYTICS EVENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS analytics_events (
  id         SERIAL PRIMARY KEY,
  event_type TEXT NOT NULL CHECK (event_type IN (
    'whatsapp_click', 'call_click', 'direction_click',
    'menu_view', 'contact_submit', 'page_view'
  )),
  page_path  TEXT,
  metadata   JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- LOCATIONS (future multi-location support)
-- ============================================================
CREATE TABLE IF NOT EXISTS locations (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  address     TEXT NOT NULL,
  city        TEXT NOT NULL,
  province    TEXT NOT NULL,
  phone       TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  is_main     BOOLEAN NOT NULL DEFAULT false,
  opened_at   DATE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON menu_items(is_available);
CREATE INDEX IF NOT EXISTS idx_menu_items_featured ON menu_items(is_featured);
CREATE INDEX IF NOT EXISTS idx_gallery_images_category ON gallery_images(category_id);
CREATE INDEX IF NOT EXISTS idx_gallery_images_featured ON gallery_images(is_featured);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key);
