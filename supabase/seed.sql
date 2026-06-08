-- ============================================================
-- PawonLoka Seed Data
-- Run after migrations to populate initial data
-- ============================================================

-- ============================================================
-- MENU CATEGORIES
-- ============================================================
INSERT INTO menu_categories (name, slug, description, icon, display_order) VALUES
  ('Nasi', 'nasi', 'Aneka pilihan nasi lezat', '🍚', 1),
  ('Mie', 'mie', 'Mie goreng, kuah, dan bihun', '🍜', 2),
  ('Minuman', 'minuman', 'Minuman segar dan hangat', '🥤', 3),
  ('Cemilan', 'cemilan', 'Snack dan gorengan', '🍟', 4),
  ('Spesial', 'spesial', 'Menu andalan PawonLoka', '⭐', 5)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- MENU ITEMS
-- ============================================================
INSERT INTO menu_items (category_id, name, description, price, is_available, is_featured, is_bestseller, is_recommended, badge_label, display_order) VALUES
  -- Nasi
  (1, 'Nasi Goreng Kampung', 'Nasi goreng dengan bumbu tradisional kampung, telur orak-arik, sayuran segar, dan kerupuk renyah.', 25000, true, false, false, false, NULL, 1),
  (1, 'Nasi Goreng Spesial', 'Nasi goreng premium dengan ayam suwir, telur ceplok, sambal terasi pilihan, dan acar segar.', 30000, true, true, true, false, 'Best Seller', 2),
  (1, 'Nasi Uduk Komplit', 'Nasi uduk gurih dengan lauk komplit: ayam goreng, tempe orek, sambal goreng kentang, dan kerupuk.', 28000, true, false, false, true, 'Recommended', 3),
  (1, 'Nasi Kuning', 'Nasi kuning aromatis dengan lauk pilihan, sambal, dan pelengkap tradisional.', 25000, true, false, false, false, NULL, 4),

  -- Mie
  (2, 'Mie Goreng Spesial', 'Mie goreng kenyal dengan bumbu khas, sayuran segar, telur, dan topping ayam suwir pilihan.', 25000, true, true, true, false, 'Best Seller', 1),
  (2, 'Mie Kuah Ayam', 'Mie kuah kaldu ayam bening yang menyegarkan dengan ayam suwir empuk dan daun bawang.', 22000, true, false, false, false, NULL, 2),
  (2, 'Bihun Goreng', 'Bihun goreng ringan dengan bumbu rempah, sayuran crispy, dan telur dadar.', 20000, true, false, false, false, NULL, 3),

  -- Minuman
  (3, 'Es Teh Manis', 'Teh manis segar dengan gula pasir pilihan. Dingin dan menyegarkan.', 5000, true, false, false, false, NULL, 1),
  (3, 'Teh Panas', 'Teh hangat original, cocok menemani makan malam Anda.', 4000, true, false, false, false, NULL, 2),
  (3, 'Es Jeruk Peras', 'Jeruk segar diperas langsung, kaya vitamin C dan menyegarkan.', 8000, true, false, false, false, NULL, 3),
  (3, 'Es Kelapa Muda', 'Kelapa muda segar langsung dari buahnya dengan air dan daging kelapa muda yang lembut.', 12000, true, false, false, true, 'Segar', 4),
  (3, 'Jus Alpukat', 'Jus alpukat creamy dengan susu kental manis dan madu. Kaya nutrisi.', 15000, true, false, false, false, NULL, 5),
  (3, 'Es Cincau Hitam', 'Cincau hitam segar dengan kuah santan manis dan es serut. Melegakan.', 8000, true, false, false, false, NULL, 6),

  -- Cemilan
  (4, 'Pisang Goreng Keju', 'Pisang goreng renyah di luar lembut di dalam dengan topping keju susu yang lumer.', 15000, true, false, false, false, NULL, 1),
  (4, 'Tahu Tempe Goreng', 'Tahu dan tempe goreng crispy dengan sambal kecap pedas manis khas rumahan.', 10000, true, false, false, false, NULL, 2),
  (4, 'Bakwan Sayur', 'Bakwan sayuran goreng crispy dengan bumbu yang harum dan gurih.', 5000, true, false, false, false, NULL, 3),
  (4, 'Ote-ote', 'Gorengan khas dengan isian sayuran dan bawang, renyah di luar lembut di dalam.', 5000, true, false, false, false, NULL, 4),

  -- Spesial
  (5, 'Ayam Bakar Pedas', 'Ayam bakar dengan bumbu pedas manis meresap sempurna ke dalam daging. Disajikan dengan nasi, lalapan, dan sambal.', 38000, true, true, true, false, 'Best Seller', 1),
  (5, 'Ayam Goreng Kremes', 'Ayam goreng dengan kremes renyah berlimpah dan bumbu kuning yang harum.', 35000, true, false, false, false, NULL, 2),
  (5, 'Ikan Bakar', 'Ikan segar pilihan dibakar dengan bumbu kecombrang dan rempah nusantara. Segar dan autentik.', 42000, true, false, false, true, 'Istimewa', 3),
  (5, 'Soto Ayam', 'Soto ayam kuah bening gurih dengan ayam suwir, telur, taoge, dan pelengkap lengkap.', 20000, true, false, false, false, NULL, 4)
ON CONFLICT DO NOTHING;

-- ============================================================
-- GALLERY CATEGORIES
-- ============================================================
INSERT INTO gallery_categories (name, slug, display_order) VALUES
  ('Makanan', 'makanan', 1),
  ('Restoran', 'restoran', 2),
  ('Event', 'event', 3),
  ('Pelanggan', 'pelanggan', 4),
  ('Komunitas', 'komunitas', 5)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- BUSINESS HOURS
-- ============================================================
INSERT INTO business_hours (day_of_week, day_name, is_open, open_time, close_time) VALUES
  (0, 'Minggu', true, '12:00', '00:00'),
  (1, 'Senin', true, '16:00', '00:00'),
  (2, 'Selasa', true, '16:00', '23:00'),
  (3, 'Rabu', true, '16:00', '23:00'),
  (4, 'Kamis', true, '16:00', '23:00'),
  (5, 'Jumat', true, '16:00', '00:00'),
  (6, 'Sabtu', true, '12:00', '00:00')
ON CONFLICT (day_of_week) DO UPDATE SET
  day_name = EXCLUDED.day_name,
  is_open = EXCLUDED.is_open,
  open_time = EXCLUDED.open_time,
  close_time = EXCLUDED.close_time;

-- ============================================================
-- SETTINGS
-- ============================================================
INSERT INTO settings (key, value, type, label, description) VALUES
  ('restaurant_name', 'PawonLoka', 'text', 'Nama Restoran', NULL),
  ('restaurant_tagline', 'Warung Hangat untuk Keluarga dan Sahabat', 'text', 'Tagline', NULL),
  ('restaurant_description', 'Nikmati cita rasa masakan Indonesia yang hangat dan autentik di PawonLoka, Citra Indah City. Tempat makan keluarga dengan suasana nyaman dan menu pilihan terbaik.', 'text', 'Deskripsi', NULL),
  ('restaurant_address', 'Citra Indah City Blok CH No.0025, Bukit Meranti, Kec. Jonggol, Kabupaten Bogor, Jawa Barat 16830', 'text', 'Alamat', NULL),
  ('phone', '0822-9923-8866', 'text', 'Nomor Telepon', NULL),
  ('whatsapp', '6282299238866', 'text', 'WhatsApp', NULL),
  ('email', 'hello@pawonloka.com', 'text', 'Email', NULL),
  ('google_maps_url', 'https://maps.google.com/?q=Citra+Indah+City+Blok+CH+No.0025+Jonggol+Bogor', 'text', 'URL Google Maps', NULL),
  ('instagram', 'https://instagram.com/pawonloka', 'text', 'Instagram', NULL),
  ('facebook', 'https://facebook.com/pawonloka', 'text', 'Facebook', NULL),
  ('tiktok', 'https://tiktok.com/@pawonloka', 'text', 'TikTok', NULL),
  ('google_rating', '4.8', 'text', 'Google Rating', NULL),
  ('review_count', '100+', 'text', 'Jumlah Ulasan', NULL),
  ('years_serving', '2+', 'text', 'Tahun Beroperasi', NULL),
  ('hero_title', 'Warung Hangat untuk Keluarga dan Sahabat', 'text', 'Judul Hero', NULL),
  ('hero_subtitle', 'Cita rasa masakan Indonesia yang autentik dan menghangatkan hati, di jantung Citra Indah City.', 'text', 'Subjudul Hero', NULL)
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- REVIEWS
-- ============================================================
INSERT INTO reviews (reviewer_name, rating, content, platform, is_featured, review_date) VALUES
  ('Budi Santoso', 5, 'Makanan di sini luar biasa enak! Rasanya seperti masakan rumah, hangat dan autentik. Keluarga kami selalu kembali ke sini setiap minggu. Nasi gorengnya juara banget!', 'google', true, CURRENT_DATE - INTERVAL '14 days'),
  ('Dewi Rahayu', 5, 'Suasana yang nyaman dan pelayanan yang sangat ramah. Anak-anak saya suka banget dengan menu di sini. Sangat recommended untuk keluarga!', 'google', true, CURRENT_DATE - INTERVAL '30 days'),
  ('Ahmad Fauzi', 5, 'Harga terjangkau tapi kualitas bintang lima. Ayam bakar pedasnya benar-benar juara! Wajib coba kalau mampir ke Citra Indah City.', 'google', true, CURRENT_DATE - INTERVAL '21 days'),
  ('Siti Nurhaliza', 5, 'Tempatnya bersih, makanannya enak, dan yang paling penting rasanya konsisten setiap kunjungan. PawonLoka memang tempat makan terbaik di Jonggol!', 'google', true, CURRENT_DATE - INTERVAL '7 days')
ON CONFLICT DO NOTHING;

-- ============================================================
-- SEO SETTINGS
-- ============================================================
INSERT INTO seo_settings (page_path, meta_title, meta_description) VALUES
  ('/', 'PawonLoka – Warung Hangat untuk Keluarga dan Sahabat', 'Nikmati cita rasa masakan Indonesia yang hangat dan autentik di PawonLoka, Citra Indah City, Jonggol. Tempat makan keluarga terbaik dengan rating 4.8⭐'),
  ('/menu', 'Menu PawonLoka – Nasi, Mie, Ayam Bakar & Lebih', 'Lihat menu lengkap PawonLoka. Nasi goreng, mie goreng, ayam bakar, minuman segar, dan cemilan lezat dengan harga terjangkau di Jonggol, Bogor.'),
  ('/tentang', 'Tentang PawonLoka – Warung Hangat Keluarga Indonesia', 'Kisah di balik PawonLoka – warung makan keluarga di Citra Indah City, Jonggol. Didirikan dengan filosofi kehangatan dapur tradisional Indonesia.'),
  ('/galeri', 'Galeri PawonLoka – Foto Makanan & Suasana Restoran', 'Lihat foto-foto hidangan lezat dan suasana hangat PawonLoka. Restoran keluarga di Citra Indah City, Jonggol, Kabupaten Bogor.'),
  ('/kontak', 'Kontak PawonLoka – Hubungi Kami', 'Hubungi PawonLoka di Citra Indah City, Jonggol. WhatsApp: 0822-9923-8866. Tersedia untuk reservasi, catering, dan pertanyaan lainnya.')
ON CONFLICT (page_path) DO NOTHING;

-- ============================================================
-- MAIN LOCATION
-- ============================================================
INSERT INTO locations (name, slug, address, city, province, phone, is_active, is_main, opened_at) VALUES
  ('PawonLoka Citra Indah City', 'citra-indah-city', 'Citra Indah City Blok CH No.0025, Bukit Meranti', 'Jonggol, Kabupaten Bogor', 'Jawa Barat', '0822-9923-8866', true, true, '2022-01-01')
ON CONFLICT (slug) DO NOTHING;
