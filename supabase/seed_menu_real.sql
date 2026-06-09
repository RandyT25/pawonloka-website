-- ============================================================
-- PawonLoka Real Menu Seed
-- Run this in Supabase SQL Editor to reset and seed real menu data
-- ============================================================

-- Clear existing menu data (order matters due to FK)
DELETE FROM menu_items;
DELETE FROM menu_categories;

-- ============================================================
-- CATEGORIES
-- ============================================================
INSERT INTO menu_categories (name, slug, description, icon, display_order) VALUES
  ('Hidangan Utama', 'hidangan-utama',  'Ayam bakar, sate, sop, dan tongseng pilihan', null, 1),
  ('Nasi & Mie',     'nasi-mie',        'Nasi goreng, mie goreng, dan bihun goreng',    null, 2),
  ('Snack',          'snack',           'Cemilan dan gorengan kekinian',                 null, 3),
  ('Extra',          'extra',           'Tambahan nasi dan sambal',                      null, 4),
  ('Gen-Z Special',  'genz-special',    'Menu kekinian favorit anak muda',               null, 5),
  ('Dessert',        'dessert',         'Penutup manis yang menggiurkan',                null, 6),
  ('Minuman',        'minuman',         'Minuman segar, kopi, wedang, dan teh',          null, 7);

-- ============================================================
-- MENU ITEMS
-- ============================================================
INSERT INTO menu_items (category_id, name, description, price, is_available, is_featured, is_bestseller, is_recommended, badge_label, display_order, image_url)

-- Hidangan Utama
SELECT id, 'Ayam Bakar + Nasi',           'Ayam bakar bumbu rempah pilihan, disajikan dengan nasi putih hangat dan lalapan segar.',             28000, true, true,  true,  false, 'Best Seller', 1,  'https://source.unsplash.com/600x400/?grilled+chicken+food&sig=1'       FROM menu_categories WHERE slug='hidangan-utama' UNION ALL
SELECT id, 'Ayam Bakar Taliwang + Nasi',  'Ayam bakar khas Lombok dengan bumbu pedas Taliwang yang kaya rempah, lengkap dengan nasi.',          33000, true, false, false, true,  null,          2,  'https://source.unsplash.com/600x400/?grilled+chicken+spicy&sig=2'      FROM menu_categories WHERE slug='hidangan-utama' UNION ALL
SELECT id, 'Sate Kambing + Nasi',         'Sate kambing pilihan empuk dengan bumbu kecap manis dan acar bawang, disajikan dengan nasi.',        38000, true, true,  false, false, 'Favorit',     3,  'https://source.unsplash.com/600x400/?satay+skewer+grilled&sig=3'       FROM menu_categories WHERE slug='hidangan-utama' UNION ALL
SELECT id, 'Sate Ayam + Nasi',            'Sate ayam bumbu kacang gurih dengan nasi, bumbu kacang khas nusantara.',                            33000, true, false, false, false, null,          4,  'https://source.unsplash.com/600x400/?chicken+satay+peanut&sig=4'       FROM menu_categories WHERE slug='hidangan-utama' UNION ALL
SELECT id, 'Tongseng Ayam',               'Tongseng ayam kuah kaya rempah dengan kol, tomat, dan daun bawang — hangat dan lezat.',              33000, true, false, false, true,  null,          5,  'https://source.unsplash.com/600x400/?chicken+stew+soup&sig=5'          FROM menu_categories WHERE slug='hidangan-utama' UNION ALL
SELECT id, 'Tongseng Kambing',            'Tongseng kambing empuk dengan kuah santan rempah, kol, dan tomat segar.',                           38000, true, false, false, false, null,          6,  'https://source.unsplash.com/600x400/?lamb+mutton+stew&sig=6'           FROM menu_categories WHERE slug='hidangan-utama' UNION ALL
SELECT id, 'Sop Iga Kambing',             'Sop iga kambing kuah bening segar dengan rempah pilihan, wortel, dan kentang.',                     38000, true, false, false, false, null,          7,  'https://source.unsplash.com/600x400/?lamb+rib+soup+clear&sig=7'        FROM menu_categories WHERE slug='hidangan-utama' UNION ALL
SELECT id, 'Sop Tulang Daging Kambing',   'Sop tulang kambing dengan daging tebal, kuah gurih yang menghangatkan badan.',                      38000, true, false, false, false, null,          8,  'https://source.unsplash.com/600x400/?bone+broth+soup+meat&sig=8'       FROM menu_categories WHERE slug='hidangan-utama' UNION ALL
SELECT id, 'Ayam Kremes + Nasi',          'Ayam goreng dengan balutan kremes renyah gurih, disajikan dengan nasi dan sambal.',                  30000, true, true,  true,  false, 'Favorit',     9,  'https://source.unsplash.com/600x400/?fried+chicken+crispy&sig=9'       FROM menu_categories WHERE slug='hidangan-utama' UNION ALL
SELECT id, 'Rica Kambing + Nasi',         'Kambing rica-rica pedas dengan bumbu merah dan kemangi, disajikan dengan nasi putih.',               38000, true, false, false, false, null,          10, 'https://source.unsplash.com/600x400/?spicy+lamb+stir+fry&sig=10'      FROM menu_categories WHERE slug='hidangan-utama' UNION ALL

-- Nasi & Mie
SELECT id, 'Nasi Goreng Telor',           'Nasi goreng wangi dengan bumbu tradisional dan telur ceplok — simpel tapi memuaskan.',               20000, true, false, false, false, null,          1,  'https://source.unsplash.com/600x400/?egg+fried+rice&sig=11'            FROM menu_categories WHERE slug='nasi-mie' UNION ALL
SELECT id, 'Nasi Goreng Ayam Kremes',     'Nasi goreng spesial dengan topping ayam kremes renyah dan sambal pilihan.',                         38000, true, true,  true,  false, 'Best Seller', 2,  'https://source.unsplash.com/600x400/?fried+rice+chicken+asian&sig=12'  FROM menu_categories WHERE slug='nasi-mie' UNION ALL
SELECT id, 'Nasi Goreng Kambing',         'Nasi goreng dengan potongan daging kambing empuk berbumbu, aroma rempah yang khas.',                 38000, true, false, false, true,  null,          3,  'https://source.unsplash.com/600x400/?fried+rice+meat+spicy&sig=13'    FROM menu_categories WHERE slug='nasi-mie' UNION ALL
SELECT id, 'Mie Goreng Telor',            'Mie goreng kenyal dengan bumbu khas dan telur orak-arik, sajian sederhana yang lezat.',              20000, true, false, false, false, null,          4,  'https://source.unsplash.com/600x400/?fried+noodles+egg&sig=14'         FROM menu_categories WHERE slug='nasi-mie' UNION ALL
SELECT id, 'Mie Goreng Ayam',             'Mie goreng dengan potongan ayam suwir dan sayuran segar, bumbu meresap sempurna.',                   28000, true, false, false, false, null,          5,  'https://source.unsplash.com/600x400/?fried+noodles+chicken&sig=15'    FROM menu_categories WHERE slug='nasi-mie' UNION ALL
SELECT id, 'Mie Nyemek Ayam',             'Mie nyemek semi-kuah khas Jogja dengan ayam, bumbu pedas manis yang menggugah selera.',              28000, true, false, false, true,  null,          6,  'https://source.unsplash.com/600x400/?noodles+soup+asian+food&sig=16'  FROM menu_categories WHERE slug='nasi-mie' UNION ALL
SELECT id, 'Bihun Goreng Ayam',           'Bihun goreng ringan dengan ayam suwir, telur, dan sayuran — cocok untuk semua usia.',                28000, true, false, false, false, null,          7,  'https://source.unsplash.com/600x400/?rice+vermicelli+stir+fry&sig=17' FROM menu_categories WHERE slug='nasi-mie' UNION ALL

-- Snack
SELECT id, 'Kentang Goreng Homemade',     'Kentang goreng buatan sendiri, renyah di luar lembut di dalam — lebih nikmat dari fast food.',       15000, true, false, false, true,  null,          1,  'https://source.unsplash.com/600x400/?french+fries+homemade&sig=18'    FROM menu_categories WHERE slug='snack' UNION ALL
SELECT id, 'Mendoan',                     'Tempe goreng tepung tipis khas Purwokerto, renyah dengan aroma daun kucai yang harum.',               15000, true, false, false, false, null,          2,  'https://source.unsplash.com/600x400/?tempeh+fried+tofu&sig=19'         FROM menu_categories WHERE slug='snack' UNION ALL
SELECT id, 'Siomay Ayam Mentai',          'Siomay ayam kukus atau goreng dengan saus mentai creamy yang kekinian.',                             20000, true, true,  false, false, null,          3,  'https://source.unsplash.com/600x400/?dim+sum+dumpling+food&sig=20'    FROM menu_categories WHERE slug='snack' UNION ALL
SELECT id, 'Cireng',                      'Aci digoreng khas Sunda, kenyal di dalam renyah di luar — camilan favorit semua kalangan.',           10000, true, false, false, false, null,          4,  'https://source.unsplash.com/600x400/?fried+snack+crispy&sig=21'        FROM menu_categories WHERE slug='snack' UNION ALL

-- Extra
SELECT id, 'Nasi',                        'Nasi putih pulen tambahan untuk melengkapi hidangan utama.',                                          5000, true, false, false, false, null,          1,  'https://source.unsplash.com/600x400/?white+rice+bowl+food&sig=22'     FROM menu_categories WHERE slug='extra' UNION ALL
SELECT id, 'Sambal Bawang',               'Sambal bawang pedas segar buatan sendiri — cocok untuk menambah cita rasa.',                          3000, true, false, false, false, null,          2,  'https://source.unsplash.com/600x400/?chili+sauce+spicy&sig=23'         FROM menu_categories WHERE slug='extra' UNION ALL

-- Gen-Z Special
SELECT id, 'Mac & Cheese',                'Makaroni dengan saus keju creamy kental, disajikan panas — comfort food yang hits.',                  30000, true, true,  false, false, null,          1,  'https://source.unsplash.com/600x400/?mac+cheese+pasta+creamy&sig=24'  FROM menu_categories WHERE slug='genz-special' UNION ALL
SELECT id, 'Chicken Steak BBQ',           'Chicken steak dengan saus BBQ smoky, pilihan nasi putih atau kentang goreng.',                        38000, true, false, false, true,  'Hits',        2,  'https://source.unsplash.com/600x400/?chicken+steak+bbq+plate&sig=25'  FROM menu_categories WHERE slug='genz-special' UNION ALL

-- Dessert
SELECT id, 'Roti Bakar Coklat Kacang',    'Roti bakar garing dengan olesan coklat dan taburan kacang — manis dan mengenyangkan.',                16000, true, false, false, false, null,          1,  'https://source.unsplash.com/600x400/?toast+chocolate+peanut&sig=26'   FROM menu_categories WHERE slug='dessert' UNION ALL
SELECT id, 'Roti Bakar Coklat Keju',      'Roti bakar dengan coklat lumer dan keju susu yang asin-manis sempurna.',                             16000, true, false, true,  false, 'Favorit',     2,  'https://source.unsplash.com/600x400/?toast+chocolate+cheese&sig=27'   FROM menu_categories WHERE slug='dessert' UNION ALL
SELECT id, 'Ronde',                       'Minuman dessert hangat dengan bola-bola tepung ketan isi kacang dalam kuah jahe manis.',               16000, true, false, false, false, null,          3,  'https://source.unsplash.com/600x400/?sweet+soup+dessert+warm&sig=28'  FROM menu_categories WHERE slug='dessert' UNION ALL
SELECT id, 'Pisang Susu',                 'Pisang bakar atau goreng dengan siraman susu kental manis — manis dan lembut.',                        15000, true, false, false, false, null,          4,  'https://source.unsplash.com/600x400/?banana+grilled+sweet&sig=29'     FROM menu_categories WHERE slug='dessert' UNION ALL
SELECT id, 'Pisang Coklat Keju',          'Pisang bakar atau goreng dengan topping coklat dan keju — kombinasi klasik yang selalu enak.',         16000, true, false, false, true,  null,          5,  'https://source.unsplash.com/600x400/?banana+chocolate+cheese&sig=30'  FROM menu_categories WHERE slug='dessert' UNION ALL
SELECT id, 'Pisang Semut',                'Pisang bakar atau goreng dengan taburan gula yang karamelisasi, crunchy dan manis.',                   15000, true, false, false, false, null,          6,  'https://source.unsplash.com/600x400/?caramelized+banana+dessert&sig=31' FROM menu_categories WHERE slug='dessert' UNION ALL

-- Minuman
SELECT id, 'Air Hangat',                  'Air putih hangat untuk menemani makan.',                                                               2000, true, false, false, false, null,          1,  'https://source.unsplash.com/600x400/?hot+water+cup+simple&sig=32'     FROM menu_categories WHERE slug='minuman' UNION ALL
SELECT id, 'Air Mineral',                 'Air mineral dingin menyegarkan.',                                                                      5000, true, false, false, false, null,          2,  'https://source.unsplash.com/600x400/?water+bottle+mineral&sig=33'     FROM menu_categories WHERE slug='minuman' UNION ALL
SELECT id, 'Lychee Tea',                  'Teh dengan cita rasa leci manis segar, disajikan dingin.',                                             20000, true, false, false, true,  null,          3,  'https://source.unsplash.com/600x400/?lychee+tea+drink+cold&sig=34'    FROM menu_categories WHERE slug='minuman' UNION ALL
SELECT id, 'Lemon Tea',                   'Teh lemon tawar atau manis, tersedia panas atau dingin.',                                              18000, true, false, false, false, null,          4,  'https://source.unsplash.com/600x400/?lemon+tea+drink&sig=35'           FROM menu_categories WHERE slug='minuman' UNION ALL
SELECT id, 'Thai Tea',                    'Thai tea creamy khas Thailand dengan susu kental, disajikan dingin.',                                   22000, true, true,  true,  false, 'Favorit',     5,  'https://source.unsplash.com/600x400/?thai+tea+orange+milk&sig=36'     FROM menu_categories WHERE slug='minuman' UNION ALL
SELECT id, 'Jeruk Tawar / Manis',         'Jeruk peras segar, tersedia panas atau dingin sesuai selera.',                                         12000, true, false, false, false, null,          6,  'https://source.unsplash.com/600x400/?orange+juice+fresh&sig=37'        FROM menu_categories WHERE slug='minuman' UNION ALL
SELECT id, 'Yuzu Lychee / Lemon',         'Minuman yuzu segar kombinasi leci atau lemon, disajikan dingin.',                                      25000, true, false, false, true,  null,          7,  'https://source.unsplash.com/600x400/?yuzu+lemon+drink+cold&sig=38'    FROM menu_categories WHERE slug='minuman' UNION ALL
SELECT id, 'Americano',                   'Kopi americano tawar atau manis, tersedia panas atau dingin.',                                          17000, true, false, false, false, null,          8,  'https://source.unsplash.com/600x400/?americano+coffee+black&sig=39'   FROM menu_categories WHERE slug='minuman' UNION ALL
SELECT id, 'Teh Tawar / Manis',           'Teh klasik tawar atau manis, tersedia panas atau dingin.',                                              8000, true, false, false, false, null,          9,  'https://source.unsplash.com/600x400/?hot+tea+cup+classic&sig=40'       FROM menu_categories WHERE slug='minuman' UNION ALL
SELECT id, 'Coffee Latte',                'Kopi latte dengan susu, tersedia panas atau dingin. Tambah +5K Salted Caramel / +7K Aren.',            20000, true, true,  false, false, null,          10, 'https://source.unsplash.com/600x400/?coffee+latte+milk+foam&sig=41'   FROM menu_categories WHERE slug='minuman' UNION ALL
SELECT id, 'Matcha / Redvelvet Latte',    'Latte matcha atau redvelvet dengan susu creamy, disajikan dingin.',                                    25000, true, false, false, true,  null,          11, 'https://source.unsplash.com/600x400/?matcha+latte+green+drink&sig=42' FROM menu_categories WHERE slug='minuman' UNION ALL
SELECT id, 'Wedang Jahe Susu',            'Wedang jahe hangat dengan susu — menghangatkan tubuh dan menenangkan.',                                15000, true, false, false, false, null,          12, 'https://source.unsplash.com/600x400/?ginger+milk+tea+warm&sig=43'     FROM menu_categories WHERE slug='minuman' UNION ALL
SELECT id, 'Wedang Jahe',                 'Wedang jahe tradisional hangat dengan rempah pilihan.',                                                 12000, true, false, false, false, null,          13, 'https://source.unsplash.com/600x400/?ginger+tea+traditional&sig=44'   FROM menu_categories WHERE slug='minuman' UNION ALL
SELECT id, 'Wedang Uwuh',                 'Minuman rempah tradisional Jawa dengan kayu secang, jahe, dan cengkeh.',                               15000, true, false, false, true,  null,          14, 'https://source.unsplash.com/600x400/?herbal+spice+drink+warm&sig=45'  FROM menu_categories WHERE slug='minuman' UNION ALL
SELECT id, 'Milo Dinosaur',               'Milo susu dingin dengan taburan bubuk Milo melimpah di atasnya.',                                       25000, true, false, false, false, 'Gen-Z',       15, 'https://source.unsplash.com/600x400/?milo+chocolate+milk+drink&sig=46' FROM menu_categories WHERE slug='minuman';

-- ============================================================
-- GALLERY IMAGES (dummy for layout preview)
-- ============================================================
DELETE FROM gallery_images;

INSERT INTO gallery_images (category_id, url, alt_text, caption, display_order, is_featured) VALUES
  (1, 'https://source.unsplash.com/800x600/?grilled+chicken+food&sig=47',      'Ayam Bakar PawonLoka',    'Ayam Bakar Bumbu Rempah',           1, true),
  (1, 'https://source.unsplash.com/800x600/?fried+rice+asian+food&sig=48',     'Nasi Goreng Kambing',     'Nasi Goreng Kambing Special',       2, true),
  (1, 'https://source.unsplash.com/800x600/?satay+skewer+grilled&sig=49',      'Sate Kambing',            'Sate Kambing Bakar',                3, false),
  (1, 'https://source.unsplash.com/600x800/?chicken+stew+meat+warm&sig=50',    'Tongseng Kambing',        'Tongseng Kambing Hangat',           4, false),
  (2, 'https://source.unsplash.com/800x600/?restaurant+interior+warm&sig=51',  'Interior PawonLoka',      'Suasana Warung yang Hangat',        5, true),
  (2, 'https://source.unsplash.com/800x600/?outdoor+restaurant+cafe&sig=52',   'Area Makan PawonLoka',    'Tempat Duduk yang Nyaman',          6, false),
  (4, 'https://source.unsplash.com/800x600/?family+restaurant+dinner&sig=53',  'Pelanggan Setia',         'Keluarga Bahagia di PawonLoka',     7, false),
  (4, 'https://source.unsplash.com/800x600/?friends+dining+community&sig=54',  'Momen Bersama',           'Kumpul Bersama di PawonLoka',       8, false);

-- ============================================================
-- UPDATE LOCATION: fix year to 2025
-- ============================================================
UPDATE locations SET opened_at = '2025-01-01' WHERE slug = 'citra-indah-city';

-- Done!
SELECT 'Seed completed: ' || COUNT(*) || ' menu items' AS result FROM menu_items;
