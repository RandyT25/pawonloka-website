-- ============================================================
-- Row Level Security (RLS) Policies
-- Migration: 002_rls_policies
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE menu_categories     ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items          ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_categories  ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images      ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews             ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings            ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_hours      ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_settings        ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events    ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations           ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- PUBLIC READ POLICIES (no auth required for website)
-- ============================================================

CREATE POLICY "Public read menu_categories"
  ON menu_categories FOR SELECT TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Public read menu_items"
  ON menu_items FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Public read gallery_categories"
  ON gallery_categories FOR SELECT TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Public read gallery_images"
  ON gallery_images FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Public read reviews"
  ON reviews FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Public read settings"
  ON settings FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Public read business_hours"
  ON business_hours FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Public read seo_settings"
  ON seo_settings FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Public read locations"
  ON locations FOR SELECT TO anon, authenticated
  USING (is_active = true);

-- ============================================================
-- PUBLIC INSERT (for contact form & analytics)
-- ============================================================

CREATE POLICY "Public insert contact_submissions"
  ON contact_submissions FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Public insert analytics_events"
  ON analytics_events FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- ============================================================
-- AUTHENTICATED ADMIN POLICIES
-- ============================================================

-- Menu Categories
CREATE POLICY "Admin manage menu_categories"
  ON menu_categories FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Menu Items
CREATE POLICY "Admin manage menu_items"
  ON menu_items FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Gallery Categories
CREATE POLICY "Admin manage gallery_categories"
  ON gallery_categories FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Gallery Images
CREATE POLICY "Admin manage gallery_images"
  ON gallery_images FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Reviews
CREATE POLICY "Admin manage reviews"
  ON reviews FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Settings
CREATE POLICY "Admin manage settings"
  ON settings FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Business Hours
CREATE POLICY "Admin manage business_hours"
  ON business_hours FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- SEO Settings
CREATE POLICY "Admin manage seo_settings"
  ON seo_settings FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Contact Submissions
CREATE POLICY "Admin read contact_submissions"
  ON contact_submissions FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admin update contact_submissions"
  ON contact_submissions FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

-- Analytics
CREATE POLICY "Admin read analytics_events"
  ON analytics_events FOR SELECT TO authenticated
  USING (true);

-- Locations
CREATE POLICY "Admin manage locations"
  ON locations FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'pawonloka',
  'pawonloka',
  true,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']
) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read storage"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'pawonloka');

CREATE POLICY "Authenticated upload storage"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'pawonloka');

CREATE POLICY "Authenticated delete storage"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'pawonloka');
