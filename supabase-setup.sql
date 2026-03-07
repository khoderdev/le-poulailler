-- =============================================
-- Le Poulailler Menu Database Setup
-- Run this SQL in your Supabase SQL Editor
-- =============================================

-- Create menu_categories table
CREATE TABLE IF NOT EXISTS menu_categories (
  id TEXT PRIMARY KEY,
  menu_type TEXT NOT NULL CHECK (menu_type IN ('shop', 'restaurant')),
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  coming_soon BOOLEAN DEFAULT FALSE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_categories_type ON menu_categories(menu_type);

-- Enable Row Level Security (RLS)
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on menu_categories"
  ON menu_categories FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on menu_items"
  ON menu_items FOR SELECT
  USING (true);

-- Create policies for authenticated write access (using anon key for simplicity)
-- In production, you might want to use service_role key for admin operations
CREATE POLICY "Allow all operations on menu_categories"
  ON menu_categories FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on menu_items"
  ON menu_items FOR ALL
  USING (true)
  WITH CHECK (true);

-- =============================================
-- STORAGE BUCKET SETUP FOR MENU ITEM IMAGES
-- =============================================

-- Create storage bucket for menu item images
INSERT INTO storage.buckets (id, name, public)
VALUES ('menu-items', 'menu-items', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to menu item images
CREATE POLICY "Public read access for menu item images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'menu-items');

-- Allow all operations on menu item images (admin auth handled at app level)
CREATE POLICY "Allow all operations on menu item images"
  ON storage.objects FOR ALL
  USING (bucket_id = 'menu-items')
  WITH CHECK (bucket_id = 'menu-items');

-- =============================================
-- INSERT INITIAL DATA - SHOP MENU
-- =============================================

-- Fresh Chicken Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('fresh-chicken', 'shop', 'Fresh Chicken', 1);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('fc-1', 'fresh-chicken', 'Whole Chicken /kg', '23', NULL, FALSE, 1),
('fc-2', 'fresh-chicken', 'Chicken Breast Bone-In/kg', '49', NULL, FALSE, 2),
('fc-3', 'fresh-chicken', 'Chicken Leg Bone-In/kg', '32', NULL, FALSE, 3),
('fc-4', 'fresh-chicken', 'Chicken ThighBone-In/kg', '30', NULL, FALSE, 4),
('fc-5', 'fresh-chicken', 'Drum Sticks Bone-In/kg', '33', NULL, FALSE, 5),
('fc-6', 'fresh-chicken', 'Chicken Wings Bone-In/kg', '24', NULL, FALSE, 6),
('fc-7', 'fresh-chicken', 'Chicken Breast Boneless /kg', '56', NULL, FALSE, 7),
('fc-8', 'fresh-chicken', 'Chicken Legs Boneless/kg', '52', NULL, FALSE, 8),
('fc-9', 'fresh-chicken', 'Whole Chicken Boneless /kg', '52', NULL, FALSE, 9),
('fc-10', 'fresh-chicken', 'Chicken Liver/kg', '25', NULL, FALSE, 10),
('fc-11', 'fresh-chicken', 'Chicken Gizzard', '25', NULL, FALSE, 11),
('fc-12', 'fresh-chicken', 'Chicken Heart', '25', NULL, FALSE, 12),
('fc-13', 'fresh-chicken', 'Minced Chicken', '55', NULL, FALSE, 13);

-- Chilled Items Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('chilled-items', 'shop', 'Chilled Items', 2);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('ci-1', 'chilled-items', 'Chicken Fajita /kg', '56', NULL, FALSE, 1),
('ci-2', 'chilled-items', 'Chicken Francisco /kg', '56', NULL, FALSE, 2),
('ci-3', 'chilled-items', 'Shish Taouk /Kg (White Or Red)', '56', NULL, FALSE, 3),
('ci-4', 'chilled-items', 'Chicken Breast Marinated /Kg', '56', NULL, FALSE, 4),
('ci-5', 'chilled-items', 'Wings /kg (BBQ/BUFFALO/PROVENCIA)', '30', NULL, FALSE, 5),
('ci-6', 'chilled-items', 'Chicken Kebab /Kg', '59', NULL, FALSE, 6),
('ci-7', 'chilled-items', 'Whole Chicken Marinated /Piece', '36', NULL, FALSE, 7),
('ci-8', 'chilled-items', 'Arayes Chicken /Kg', '51', NULL, FALSE, 8);

-- Frozen Items Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('frozen-items', 'shop', 'Frozen Items', 3);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('fi-1', 'frozen-items', 'Chicken Kiev /kg', '78', NULL, FALSE, 1),
('fi-2', 'frozen-items', 'Chicken Crispy Fillet /kg', '64', NULL, FALSE, 2),
('fi-3', 'frozen-items', 'Chicken Cordon Bleu /kg', '95', NULL, FALSE, 3),
('fi-4', 'frozen-items', 'Chicken Escalope /kg', '64', NULL, FALSE, 4),
('fi-5', 'frozen-items', 'Chicken Burger /kg', '52', NULL, FALSE, 5),
('fi-6', 'frozen-items', 'Chicken Makanek /kg', '52', NULL, FALSE, 6),
('fi-7', 'frozen-items', 'Chicken Sojouk /kg', '52', NULL, FALSE, 7),
('fi-8', 'frozen-items', 'Cheese Rolls /pcs', '4', NULL, FALSE, 8),
('fi-9', 'frozen-items', 'Kebbeh Chicken /pcs', '4', NULL, FALSE, 9),
('fi-10', 'frozen-items', 'Spinash Fatayer', '4', NULL, FALSE, 10);

-- =============================================
-- INSERT INITIAL DATA - RESTAURANT MENU
-- =============================================

-- Soup Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('soup', 'restaurant', 'Soup', 1);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('soup-1', 'soup', 'Lentil Soup شوربة عدس', '16', 'Pureed lentil soup served with fresh lemon wedges and crispy bread', FALSE, 1),
('soup-2', 'soup', 'Shorbet Adas Bel Hamod شوربة عدس بالحامض', '16', 'Whole green lentils with potato cubes, chards and fresh lemon juice', FALSE, 2);

-- Daily Dish Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('daily-dish', 'restaurant', 'Daily Dish', 2);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('dd-1', 'daily-dish', 'Rice with Chicken رز على دجاج', '45/55', 'Chicken served with spiced rice, demi glace sauce and fresh yogurt', FALSE, 1),
('dd-2', 'daily-dish', 'Kebbeh Bel Laban (Chicken) كبه بالبن', '45/55', 'Chicken kebbeh cooked and dipped in our special boiled yogurt served with white rice', FALSE, 2);

-- Cold Mezza Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('cold-mezza', 'restaurant', 'Cold Mezza', 3);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('cm-1', 'cold-mezza', 'Hommos حمّص', '26', 'Pureed chickpeas blended with tahini sauce, and drizzled with virgin olive oil', FALSE, 1),
('cm-2', 'cold-mezza', 'Hommos with Pine Nuts حمّص بالصنوبر', '31', 'Pureed chickpeas blended with tahini sauce, and topped with roasted pine seeds and virgin olive oil', FALSE, 2),
('cm-3', 'cold-mezza', 'Moutabal متبّل', '26', 'Chargrilled eggplants blended with tahini sauce and drizzled with virgin olive oil', FALSE, 3),
('cm-4', 'cold-mezza', 'Vine Leaves ورق عنب', '30', 'Stuffed vine leaves with rice, parsley, tomatoes, onions drizzled with pomegranate molasses, fresh lemon juice, and virgin olive oil', FALSE, 4),
('cm-5', 'cold-mezza', 'Hindbeh هندبه', '27', 'Cooked chicory leaves, garlic, onions with fresh lemon juice and virgin olive oil', FALSE, 5),
('cm-6', 'cold-mezza', 'Mouhammara محّمره', '27', 'Bread crumbs, walnuts, and red chilli blended with tahini sauce, pomegranate molasses, and virgin olive oil', FALSE, 6),
('cm-7', 'cold-mezza', 'Grilled Eggplant with Garlic باذنجان بالثوم', '27', 'Chargrilled eggplants and garlic drizzled with virgin olive oil', FALSE, 7),
('cm-8', 'cold-mezza', 'Labne لبنه', '24', 'Fresh Lebanese labne drizzled with virgin olive oil', FALSE, 8),
('cm-9', 'cold-mezza', 'Labne with Garlic لبنه بالثوم', '26', 'Fresh Lebanese labne with minced garlic, dry mint and virgin olive oil', FALSE, 9),
('cm-10', 'cold-mezza', 'Shanklish شنكليش', '28', 'Lebanese shanklish cheese with tomatoes, onions and virgin olive oil', FALSE, 10);

-- Hot Mezza Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('hot-mezza', 'restaurant', 'Hot Mezza', 4);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('hm-1', 'hot-mezza', 'Halloumi Grilled حلوم مشوي', '33', 'Grilled halloumi cheese', FALSE, 1),
('hm-2', 'hot-mezza', 'Foul Mdammas فول مدمّس', '27', 'Fava beans with tomatoes, garlic, parsley, onion cumin powder, fresh lemon juice and olive oil', FALSE, 2),
('hm-3', 'hot-mezza', 'Spicy Potato بطاطا حرّه', '28', 'Fried potato cubes sauteed with garlic, coriander, fresh lemon juice, virgin olive oil and chilli powder', FALSE, 3),
('hm-4', 'hot-mezza', 'Fried Egg بيض مقلي', '25', 'Fried scramble eggs', FALSE, 4),
('hm-5', 'hot-mezza', 'Sunny Side Up Eggs بيض عيون', '25', 'Fried eggs, sunny side up', FALSE, 5),
('hm-6', 'hot-mezza', 'Fattet Eggplant فتّة باذنجان', '28', 'Chargrilled eggplants with fresh yogurt, garlic, crispy bread and roasted pine nuts', TRUE, 6),
('hm-7', 'hot-mezza', 'Fattet Hommos فتّة حمّص', '28', 'Chickpeas with fresh yogurt, garlic, crispy bread and roasted pine nuts', TRUE, 7),
('hm-8', 'hot-mezza', 'Chicken Wings جوانح دجاج', '30', 'Fried chicken wings sauteed with garlic, coriander, fresh lemon juice and virgin olive oil', FALSE, 8),
('hm-9', 'hot-mezza', 'Chicken Liver كبدة دجاج', '32', 'Fried chicken liver sauteed with garlic, pomegranate molasses, fresh lemon juice and virgin olive oil', FALSE, 9),
('hm-10', 'hot-mezza', 'Chicken Gizzard قوانص دجاج', '32', 'Fried chicken gizzard sauteed with garlic, pomegranate molasses, fresh lemon juice and virgin olive oil', FALSE, 10),
('hm-11', 'hot-mezza', 'Chicken Hearts قلوب دجاج', '32', 'Fried chicken hearts sauteed with garlic, pomegranate molasses, fresh lemon juice and virgin olive oil', FALSE, 11),
('hm-12', 'hot-mezza', 'Cheese Rolls رقاقات جبنة', '20', '4 pieces of spring rolls stuffed with our special cheese mix', FALSE, 12),
('hm-13', 'hot-mezza', 'Fried Chicken Kebbeh كبة دجاج مقلية', '20', '4 pieces of grounded chicken and crushed wheat stuffed with minced chicken, onion & sumac', FALSE, 13),
('hm-14', 'hot-mezza', 'Mozzarella Sticks موزاريلا ستيكس', '20', 'Fried mozzarella sticks served with cocktail sauce', FALSE, 14),
('hm-15', 'hot-mezza', 'Makanek Plate مقانق دجاج', '32', 'Grilled chicken sausages served with grilled onions, tomatoes and pomegranate molasses', FALSE, 15),
('hm-16', 'hot-mezza', 'Soujouk Plate سجق دجاج', '32', 'Grilled spicy chicken sausages served with grilled onions and tomatoes', FALSE, 16),
('hm-17', 'hot-mezza', 'French Fries Plate بطاطا مقليّه', '20', 'Freshly fried fries', FALSE, 17),
('hm-18', 'hot-mezza', 'Chicken Nuggets ناجتس دجاج', '25', 'Fried breaded chicken served with cocktail sauce', FALSE, 18),
('hm-19', 'hot-mezza', 'Seasoned Fries بطاطا متبلة', '24', 'Seasoned freshly fried fries', FALSE, 19),
('hm-20', 'hot-mezza', 'Potato Wedges بطاطا ودجز', '23', 'Potato wedges served with ketchup', FALSE, 20),
('hm-21', 'hot-mezza', 'Falafel Plate فلافل', '26', 'Fried falafel with tahini, pickles, and vegetables', FALSE, 21),
('hm-22', 'hot-mezza', 'Hummus with Chicken Shawarma حمص مع شاورما دجاج', '31', 'Pureed chickpeas blended with tahini sauce, topped with chicken shawarma', TRUE, 22);

-- Salad Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('salad', 'restaurant', 'Salad', 5);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('sal-1', 'salad', 'Tabboule تبوله', '26', 'Freshly chopped parsley, tomatoes, onions, crushed wheat, with lemon juice and virgin olive oil', FALSE, 1),
('sal-2', 'salad', 'Fattoush فتوش', '26', 'Fresh lettuce, tomatoes, cucumber, capsicum, rocca, bakle, mint leaves, thyme, fresh pomegranate seeds, toasted bread, with lemon juice, pomegranate molasses and virgin olive oil', FALSE, 2),
('sal-3', 'salad', 'Taouk Fattoush فتوش مع طاووق', '42', 'Grilled taouk on a bed of fresh lettuce, tomatoes, cucumber, capsicum, rocca, bakle, mint leaves, thyme, fresh pomegranate seeds, toasted bread, with lemon juice, pomegranate molasses and virgin olive oil', FALSE, 3),
('sal-4', 'salad', 'Oriental Salad سلطة شرقية', '24', 'Fresh lettuce, tomatoes, cucumber, bakle, mint leaves with fresh lemon juice and virgin olive oil', FALSE, 4),
('sal-5', 'salad', 'Rocca Salad سلطة روكا', '24', 'Fresh rocca, tomatoes, onions, with fresh lemon juice, sumac powder, and virgin olive oil dressing', FALSE, 5),
('sal-6', 'salad', 'Bakle Salad سلطة بقله', '24', 'Fresh bakle, tomatoes, onions with fresh lemon juice and virgin olive oil', FALSE, 6),
('sal-7', 'salad', 'Zaatar Salad سلطة زعتر', '24', 'Fresh thyme, tomatoes, onions with fresh lemon juice and virgin olive oil', FALSE, 7),
('sal-8', 'salad', 'Rocca and Zaatar سلطة روكا و زعتر', '24', 'Fresh thyme, rocca, tomatoes, onions with fresh lemon juice and virgin olive oil', FALSE, 8),
('sal-9', 'salad', 'Rocca Zaatar and Bakle سلطة روكا و زعتر و بقله', '24', 'Fresh rocca, bakle, thyme, tomatoes, onions with fresh lemon juice and virgin olive oil', FALSE, 9),
('sal-10', 'salad', 'Beetroot and Rocca سلطة روكا وشمندر', '28', 'Fresh rocca, walnuts, beetroot with fresh lemon juice and virgin olive oil', FALSE, 10),
('sal-11', 'salad', 'Raheb Salad سلطة راهب', '26', 'Grilled eggplants, tomatoes, capsicum, mint leaves, fresh pomegranate seeds, with lemon juice and virgin olive oil', FALSE, 11),
('sal-12', 'salad', 'Cabbage Salad سلطة ملفوف', '20', 'Chopped cabbage, tomatoes, dry mint, minced garlic, fresh squeezed lemon juice and olive oil', FALSE, 12),
('sal-13', 'salad', 'Coleslaw Salad سلطة كول سلو', '24', 'Chopped cabbage, carrots, sweet corn with mayonnaise', FALSE, 13);

-- International Salad Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('international-salad', 'restaurant', 'International Salad', 6);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('is-1', 'international-salad', 'Grilled Halloumi حلوم مشوي', '34', 'Grilled halloumi slices on a bed of fresh lettuce, tomatoes, cucumber with a sprinkle of sumac on the top, drizzled with balsamic sauce', FALSE, 1),
('is-2', 'international-salad', 'Caesar سلطة سيزر', '34', 'Cherry tomatoes, crusty bread cubes, fresh iceberg lettuce drizzled with caesar dressing topped with grana padano cheese', FALSE, 2),
('is-3', 'international-salad', 'Chicken Caesar تشيكن سيزر', '42', 'Slices of grilled chicken breast, cherry tomatoes, crusty bread cubes on a bed of fresh iceberg lettuce drizzled with caesar dressing topped with grana padano cheese', FALSE, 3),
('is-4', 'international-salad', 'Taouk Caesar طاووق سيزر', '48', 'Slices of grilled chicken breast, cherry tomatoes, crusty bread cubes on a bed of fresh iceberg lettuce drizzled with caesar dressing topped with grana padano cheese', FALSE, 4),
('is-5', 'international-salad', 'Tuna Pasta تونا باستا', '43', 'Tuna, fusilli pasta, sweet corn, cucumber, tomatoes, lemon juice, olive oil', FALSE, 5),
('is-6', 'international-salad', 'Crab كراب', '48', 'Shredded crab sticks and avocado slices on a bed of iceberg lettuce, cherry tomatoes, sweet corn drizzled with mustard dressing', FALSE, 6),
('is-7', 'international-salad', 'Grilled Shrimps قريدس مشوي', '58', 'Grilled shrimps with avocado slices on a bed of rocca, thyme, fresh mushroom mixed with sesame seeds, drizzled with balsamic dressing', FALSE, 7);

-- Pasta Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('pasta', 'restaurant', 'Pasta', 7);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('pa-1', 'pasta', 'Penne Arabiata بيني ارابياتا', '46', 'Penne pasta made with red sauce (spicy)', FALSE, 1),
('pa-2', 'pasta', 'Vegetarian بالخضار', '46', 'Penne pasta made with red sauce, onions, broccoli, and mushrooms', FALSE, 2),
('pa-3', 'pasta', 'Alfredo الفريدو', '54', 'Penne pasta made with white sauce, chicken, and mushrooms', FALSE, 3),
('pa-4', 'pasta', 'Pink بينك', '54', 'Penne pasta made with pink sauce, chicken, and mushrooms', FALSE, 4),
('pa-5', 'pasta', 'Chicken Pesto تشيكن بستو', '58', 'Penne pasta made with white sauce, pesto, chicken, pine seeds and parmesan cheese', FALSE, 5);

-- Main Courses Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('main-courses', 'restaurant', 'Main Courses', 8);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('mc-1', 'main-courses', 'Escalope اسكالوب', '45', 'Fried breaded escalope topped with melted cheese, served with coleslaw and baked potato', FALSE, 1),
('mc-2', 'main-courses', 'Cordon Bleu Rolled كوردون بلو', '45', 'Chicken with cheese and turkey filling, breaded deep-fried. Served with mushroom sauce and wedges potatoes', FALSE, 2),
('mc-3', 'main-courses', 'Kiev كييف', '45', 'Breaded chicken stuffed with butter, parsley and garlic served with sauteed vegetables and wedges', FALSE, 3),
('mc-4', 'main-courses', 'Le Poulailler Mix Plate لو بولايي مكس بلايت', '65', '1 pc of chicken cordon bleu, 1 pc of chicken escalope served with fettuccine alfredo, wedges potatoes and mushroom sauce', FALSE, 4),
('mc-5', 'main-courses', 'Mushroom Chicken Breast مشروم تشكن برست', '51', 'Grilled chicken breast with fresh mushroom in demi-glace sauce served with mashed potatoes and sauteed vegetables', FALSE, 5),
('mc-6', 'main-courses', 'Pepper Chicken Breast بيبر تشكن برست', '51', 'Grilled chicken breast with black pepper in demi-glace sauce served with mashed potatoes and sauteed vegetables', FALSE, 6);

-- Broasted Chicken Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('broasted-chicken', 'restaurant', 'Broasted Chicken', 9);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('bc-1', 'broasted-chicken', 'B-Chicken Meal 2pcs وجبة بروستد', '29', 'Served with potato & garlic sauce', FALSE, 1),
('bc-2', 'broasted-chicken', 'B-Chicken Meal 4pcs وجبة بروستد', '49', 'Served with potato & garlic sauce', FALSE, 2),
('bc-3', 'broasted-chicken', 'B-Chicken Meal 8pcs وجبة بروستد', '86', 'Served with potato & garlic sauce', FALSE, 3),
('bc-4', 'broasted-chicken', 'B-Chicken Breast /pc صدر دجاج بروستد', '22', 'Served with potato & garlic sauce', FALSE, 4),
('bc-5', 'broasted-chicken', 'B-Chicken Thigh /pc ورك دجاج بروستد', '11', 'Served with potato & garlic sauce', FALSE, 5),
('bc-6', 'broasted-chicken', 'B-Chicken Drumstick /pc فخذ دجاج بروستد', '8', 'Served with potato & garlic sauce', FALSE, 6),
('bc-7', 'broasted-chicken', 'B-Chicken Wing /pc جانح دجاج بروستد', '5', 'Served with potato & garlic sauce', FALSE, 7);

-- Rotisserie Chicken Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('rotisserie-chicken', 'restaurant', 'Rotisserie Chicken', 10);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('rc-1', 'rotisserie-chicken', 'Full Rotisserie Chicken فروج ماكينة كامل', '79', 'Our signature roasted chicken served with garlic sauce, chili sauce & seasoned fries', TRUE, 1),
('rc-2', 'rotisserie-chicken', 'Half Rotisserie Chicken نصف فروج ماكينة', '49', 'Our signature roasted chicken served with garlic sauce, chili sauce & seasoned fries', TRUE, 2);

-- Burgers & Crispy Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('burgers-crispy', 'restaurant', 'Burgers & Crispy', 11);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('bg-1', 'burgers-crispy', 'Lebanese Burger برغر لبناني', '30', 'Our signature Lebanese burger made with a hand seasoned chicken patty grilled to perfection with coleslaw, tomatoes, pickles, fries, onions, mustard, mayonnaise, and ketchup', FALSE, 1),
('bg-2', 'burgers-crispy', 'Crispy Chicken كرسبي تشكن', '32', 'Our special burger bun with crispy chicken, cheddar slice, iceberg lettuce, cucumber pickles and mayonnaise sauce', FALSE, 2),
('bg-3', 'burgers-crispy', 'Spicy Crispy Chicken كرسبي تشكن (حار)', '32', 'Our special burger bun with spicy fried crunchy chicken breast, cheddar slice, iceberg lettuce, cucumber pickles and mayonnaise sauce', FALSE, 3),
('bg-4', 'burgers-crispy', 'Mozzarella Burger موزاريلا', '38', 'Our multigrain burger bun with our special marinated grilled breast, fried mozzarella, lettuce and our special burger sauce', FALSE, 4),
('bg-5', 'burgers-crispy', 'Crispy Tender Platter كرسبي', '47', '6 pieces of crispy chicken tender, served with french fries, bun mayo garlic sauce and cocktail sauce', FALSE, 5),
('bg-6', 'burgers-crispy', 'Half Crispy Tender Platter كرسبي', '31', '3 pieces of crispy chicken tender, served with french fries, bun mayo garlic sauce and cocktail sauce', FALSE, 6);

-- Shawarmas Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('shawarmas', 'restaurant', 'Shawarmas', 12);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('sh-1', 'shawarmas', 'Chicken Shawarma Small شاورما دجاج صغيرة', '11', 'Our special chicken shawarma with garlic, pickles, and fries (Arabic, Saj or Special Bread)', TRUE, 1),
('sh-2', 'shawarmas', 'Chicken Shawarma Large شاورما دجاج كبيرة', '24', 'Our special chicken shawarma with garlic, pickles, and fries (Arabic, Saj or Special Bread)', TRUE, 2),
('sh-3', 'shawarmas', 'Arabic Chicken Shawarma وجبة شاورما عربي', '42', 'Our special chicken shawarma with garlic, pickles, and fries (Arabic or Saj Bread)', TRUE, 3),
('sh-4', 'shawarmas', 'Chicken Shawarma Plate صحن شاورما دجاج', '43', 'Our special chicken shawarma served with garlic sauce, pickles & french fries', TRUE, 4);

-- International Sandwiches Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('international-sandwiches', 'restaurant', 'International Sandwiches & Wraps', 13);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('isw-1', 'international-sandwiches', 'Crispy Poulailler كرسبي بولايي', '36', 'Fried breaded crispy chicken, cheddar & craft cheese sliced, iceberg lettuce, sweet corn and our special homemade tartare sauce', FALSE, 1),
('isw-2', 'international-sandwiches', 'Chicken Escalope دجاج اسكالوب', '34', 'Fried breaded escalope with coleslaw, fries, ketchup, cheese served in special bread', FALSE, 2),
('isw-3', 'international-sandwiches', 'Fajitas فاهيتا', '34', 'Chicken slices seasoned with our special spices mixed with colored bell peppers, onions, mozzarella cheese and served with guacamole sauce', FALSE, 3),
('isw-4', 'international-sandwiches', 'Francisco فرنسيسكو', '34', 'Chicken, sweet corn, lettuce, pickles sliced with cheese, mayonnaise toasted in special bread', FALSE, 4),
('isw-5', 'international-sandwiches', 'Submarine صب مارين', '33', 'Smoked turkey, spicy salami, mayonnaise, lettuce, mix cheese, tomatoes and pickles served in special bread', FALSE, 5),
('isw-6', 'international-sandwiches', 'Chicken Sub Sandwich دجاج صب', '36', 'Grilled chicken with smoked turkey, cheese, iceberg lettuce, pesto & tartare sauce in special bread', FALSE, 6),
('isw-7', 'international-sandwiches', 'Turkey and Cheese Wrap حبش و جبنة راب', '36', 'Sliced smoked turkey with cheese, lettuce, tomatoes, pickles, mayo mustard sauce', FALSE, 7),
('isw-8', 'international-sandwiches', 'Escalope Wrap اسكالوب راب', '36', 'Fried breaded escalope, lettuce, pickles, sweet corn, ketchup, cheese and garlic mayo', FALSE, 8),
('isw-9', 'international-sandwiches', 'Chicken Wrap دجاج راب', '36', 'Grilled chicken with cheese, lettuce, tomatoes, pickles, garlic mayo sauce', FALSE, 9);

-- Lebanese Sandwiches Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('lebanese-sandwiches', 'restaurant', 'Lebanese Sandwiches', 14);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('ls-1', 'lebanese-sandwiches', 'Falafel فلافل', '19', 'Falafel with tomatoes, parsley, pickled turnip, cucumber pickles, and tahini wrapped in arabic bread', FALSE, 1),
('ls-2', 'lebanese-sandwiches', 'Cauliflower قرنبيط مقلي', '19', 'Cauliflower sandwich with pickles and tahini sauce', FALSE, 2),
('ls-3', 'lebanese-sandwiches', 'Halloumi حلوم', '22', 'Halloumi grilled with lettuce, tomatoes and fresh cucumber', FALSE, 3),
('ls-4', 'lebanese-sandwiches', 'Shish Taouk شيش طاووق', '26', 'Taouk with garlic and pickles', FALSE, 4),
('ls-5', 'lebanese-sandwiches', 'Lebanese Taouk طاووق لبناني', '28', 'Taouk with garlic, coleslaw salad, fries and cucumber pickles', FALSE, 5),
('ls-6', 'lebanese-sandwiches', 'Chicken with Garlic سندوش الدجاج بالثوم', '25', 'Roasted chicken with garlic, pickles, and fries served in Lebanese bread', FALSE, 6),
('ls-7', 'lebanese-sandwiches', 'Chicken Liver سودة دجاج', '25', 'Fried chicken liver with garlic paste and pickles served in soft french bread', FALSE, 7),
('ls-8', 'lebanese-sandwiches', 'Makanek مقانق', '24', 'Grilled chicken sausages, hommos, pickles, and tomatoes', FALSE, 8),
('ls-9', 'lebanese-sandwiches', 'Soujouk سجق', '24', 'Grilled spicy chicken sausages with hommos and pickles', FALSE, 9),
('ls-10', 'lebanese-sandwiches', 'Kabab Halabi Chicken كباب حلبي', '26', 'Kabab halabi chicken with hommos and pickles', FALSE, 10),
('ls-11', 'lebanese-sandwiches', 'Kabab Intabli Chicken كباب عنتبلي', '26', 'Spicy chicken kabab with hommos and pickles', FALSE, 11);

-- Grill Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('grill', 'restaurant', 'Grill', 15);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('gr-1', 'grill', 'Shish Taouk Plate شيش طاووق', '52', 'Grilled marinated chicken cubes served with garlic paste, fries, and hommos', FALSE, 1),
('gr-2', 'grill', 'Kabab Halabi Plate كباب حلبي', '49', 'Grilled chicken minced meat seasoned with parsley and onions served with fries and hommos', FALSE, 2),
('gr-3', 'grill', 'Kabab Intabli Plate كباب عنتبلي', '49', 'Grilled spicy chicken minced meat seasoned with parsley and onions served with fries and hommos', FALSE, 3),
('gr-4', 'grill', 'Mix Grill مشاوي مشكّل لشخص', '51', 'Shish taouk, kabab halabi, kabab intabli served with fries and hommos', FALSE, 4),
('gr-5', 'grill', 'Chicken Breast صدر مشوي', '52', 'Grilled marinated chicken breast served with pickles, fries, and hommos', FALSE, 5),
('gr-6', 'grill', 'Grilled Chicken Wings جوانح دجاج', '29', 'Grilled chicken wings served with garlic sauce', FALSE, 6),
('gr-7', 'grill', 'Soujouk سجق', '32', 'Grilled spicy chicken sausages served with grilled onions and tomatoes', FALSE, 7),
('gr-8', 'grill', 'Makanek مقانق', '32', 'Grilled chicken sausages served with grilled onions, tomatoes and pomegranate molasses', FALSE, 8),
('gr-9', 'grill', 'Arayes Chicken Plate عرايس دجاج', '42', 'Lebanese bread stuffed with our special Lebanese chicken mixture grilled to perfection (served with yogurt)', FALSE, 9),
('gr-10', 'grill', 'Half Chicken نصف فروج', '48', 'Half grilled chicken served with pickles, fries, and hommos', FALSE, 10),
('gr-11', 'grill', 'Full Chicken فروج', '78', 'Full grilled chicken served with pickles, fries, and hommos', FALSE, 11);

-- Beverages Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('beverages', 'restaurant', 'Beverages', 16);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('bv-1', 'beverages', 'Soft Drinks مشروبات غازية', '7', 'Pepsi, 7up, Miranda', FALSE, 1),
('bv-2', 'beverages', 'Water مياه', '4', 'Bottled water', FALSE, 2),
('bv-3', 'beverages', 'Ayran عيران', '10', 'Traditional yogurt drink', FALSE, 3),
('bv-4', 'beverages', 'Fresh Lemonade ليموناضة', '15', 'Freshly squeezed lemonade', FALSE, 4),
('bv-5', 'beverages', 'Fresh Orange Juice عصير برتقال', '18', 'Freshly squeezed orange juice', FALSE, 5);
