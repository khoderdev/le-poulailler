-- =============================================
-- Le Poulailler Menu Update Migration
-- Run this SQL in your Supabase SQL Editor
-- This will update all restaurant AND shop menu items to match the new data
-- =============================================

-- First, delete all existing restaurant menu items and categories
DELETE FROM menu_items WHERE category_id IN (
  SELECT id FROM menu_categories WHERE menu_type = 'restaurant'
);
DELETE FROM menu_categories WHERE menu_type = 'restaurant';

-- =============================================
-- INSERT UPDATED DATA - RESTAURANT MENU
-- =============================================

-- Soup Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('soup', 'restaurant', 'Soup', 1);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('soup-1', 'soup', 'Lentil Soup شوربة عدس', '16', 'Pureed lentil soup served with fresh lemon wedges and Crispy bread', FALSE, 1),
('soup-2', 'soup', 'Shorbet Adas Bel Hamod شوربة عدس بالحامض', '16', 'Whole green lentils with potato cubes, chards and fresh lemon juice', FALSE, 2);

-- Daily Dish Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('daily-dish', 'restaurant', 'Daily Dish', 2);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('dd-1', 'daily-dish', 'Rice with Chicken رز على دجاج', '45/55', 'Chicken Served with Spiced Rice, Demi Glace sauce and Fresh Yogurt', FALSE, 1),
('dd-2', 'daily-dish', 'Kebbeh Bel Laban (Chicken) كبه بالبن (دجاج)', '45/55', 'Chicken kebbeh cooked and dipped in our special boiled yogurt served with white rice', FALSE, 2);

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
('hm-6', 'hot-mezza', 'Fattet Eggplant فتّة باذنجان', '28', 'Chargrilled eggplants with fresh yoghurt, garlic, crispy bread and roasted pine nuts', TRUE, 6),
('hm-7', 'hot-mezza', 'Fattet Hommos فتّة حمّص', '28', 'Chickpeas with fresh yoghurt, garlic, crispy bread and roasted pine nuts', TRUE, 7),
('hm-8', 'hot-mezza', 'Chicken Wings جوانح دجاج', '30', 'Fried chicken wings sauteed with garlic coriender fresh lemon juice and virgin olive oil', FALSE, 8),
('hm-9', 'hot-mezza', 'Chicken Liver كبدة دجاج', '32', 'Fried chicken liver sauteed with garlic, pomegranate molasses, fresh lemon juice and virgin olive oil', FALSE, 9),
('hm-10', 'hot-mezza', 'Chicken Gizzard قوانص دجاج', '32', 'Fried chicken gizzard sauteed with garlic, pomegranate molasses, fresh lemon juice and virgin olive oil', FALSE, 10),
('hm-11', 'hot-mezza', 'Chicken Hearts قلوب دجاج', '32', 'Fried chicken hearts sauteed with garlic, pomegranate molasses, fresh lemon juice and virgin olive oil', FALSE, 11),
('hm-12', 'hot-mezza', 'Cheese Rolls رقاقات جبنة', '20', '4 pieces of spring rolls stuffed with our special cheese mix.', FALSE, 12),
('hm-13', 'hot-mezza', 'Fried Chicken Kebbeh كبة دجاج مقلية', '20', '4 pieces of grounded chicken and crushed wheat stuffed with minced chicken, onion & sumak', FALSE, 13),
('hm-14', 'hot-mezza', 'Mozzarella Sticks موزاريلا ستيكس', '20', 'Fried mozzarella sticks served with cocktail sauce.', FALSE, 14),
('hm-15', 'hot-mezza', 'Makanek Plate مقانق دجاج', '32', 'Grilled chicken sausages served with grilled onions, tomatoes and pomegranate molasses', FALSE, 15),
('hm-16', 'hot-mezza', 'Soujouk Plate سجق دجاج', '32', 'Grilled spicy chicken sausages served with grilled onions and tomatoes', FALSE, 16),
('hm-17', 'hot-mezza', 'French Fries Plate بطاطا مقليّه', '20', 'Freshly fried fries', FALSE, 17),
('hm-18', 'hot-mezza', 'Chicken Nuggets ناجتس دجاج', '25', 'Fried breaded chicken served with cocktail sauce.', FALSE, 18),
('hm-19', 'hot-mezza', 'Seasoned Fries بطاطا متبلة', '24', 'Seasoned freshly fried fries', FALSE, 19),
('hm-20', 'hot-mezza', 'Potato Wedges بطاطا ودجز', '23', 'Potato wedges served with ketchup.', FALSE, 20),
('hm-21', 'hot-mezza', 'Falafel Plate فلافل', '26', 'Fried falafel with tahini, pickles, and vegetables', FALSE, 21),
('hm-22', 'hot-mezza', 'Hummus with Chicken Shawarma حمص مع شاورما دجاج', '31', 'Pureed chickpeas blended with tahini sauce, topped with chicken shawarma', TRUE, 22);

-- Salad Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('salad', 'restaurant', 'Salad', 5);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('sal-1', 'salad', 'Tabboule تبوله', '26', 'Freshly chopped parsley, tomatoes, onions, crushed wheat, with lemon juice and virgin olive oil', FALSE, 1),
('sal-2', 'salad', 'Fattoush فتوش', '26', 'Fresh lettuce, tomatoes, cucumber, capsicum, rocca, bakle, mint leaves, thyme, fresh pomegranate seeds, toasted bread, with lemon juice, pomegranate molasses and virgin olive oil', FALSE, 2),
('sal-3', 'salad', 'Taouk Fattoush فتوش مع طاووق', '42', 'Grilled taouk on a bed of fresh lettuce, tomatoes, cucumber, capsicum, rocca, bakle, mint leaves, thyme, fresh pomegranate seeds, toasted bread, with lemon juice, pomegranate molasses and virgin olive oil', FALSE, 3),
('sal-4', 'salad', 'Oriental Salad سلطة شرقية', '24', 'Fresh lettuce, tomatoes, cucumber, bakle, mint leaves with fresh lemon juice and virgin olive', FALSE, 4),
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
('is-1', 'international-salad', 'Grilled Halloumi حلوم مشوي', '34', 'Grilled Halloumi Slices on a bed of fresh lettuce, tomatoes, cucumber with a sprinkle of sumac on the top, drizzled with balsamic sauce', FALSE, 1),
('is-2', 'international-salad', 'Caesar سلطة سيزر', '34', 'Cherry tomatoes, crusty bread cubes, Fresh iceberg lettuce drizzled with caesar dressing topped with grana padano cheese', FALSE, 2),
('is-3', 'international-salad', 'Chicken Caesar تشيكن سيزر', '42', 'Slices of grilled chicken breast, cherry tomatoes, crusty bread cubes on a bed of Fresh iceberg lettuce drizzled with caesar dressing topped with grana padano cheese', FALSE, 3),
('is-4', 'international-salad', 'Taouk Caesar طاووق سيزر', '48', 'Slices of grilled chicken breast, cherry tomatoes, crusty bread cubes on a bed of Fresh iceberg lettuce drizzled with caesar dressing topped with grana padano cheese', FALSE, 4),
('is-5', 'international-salad', 'Tuna Pasta تونا باستا', '43', 'Tuna, fusilli pasta, sweet corn, cucumber, tomatoes, lemon juice, olive oil', FALSE, 5),
('is-6', 'international-salad', 'Crab كراب', '48', 'Shredded Crab Sticks and avocado slices on a bed of iceberg lettuce, cherry tomatoes, sweet corn drizzled with mustard dressing', FALSE, 6),
('is-7', 'international-salad', 'Grilled Shrimps قريدس مشوي', '58', 'Grilled Shrimps with avocado slices on a bed of rocca, thyme, fresh mushroom mixed with sesame seeds, drizzled with balsamic dressing', FALSE, 7);

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
('mc-4', 'main-courses', 'Le Poulailler Mix Plate لو بولايي مكس بلايت', '65', '1 pc of chicken cordon bleu 1 pc of chicken escalope served with fettuccine alfredo wedges potatoes and mushroom sauce.', FALSE, 4),
('mc-5', 'main-courses', 'Mushroom Chicken Breast مشروم تشكن برست', '51', 'Grilled chicken breast with Fresh mushroom in demi-glass sauce served with mashed potatoes and sauteed vegetables', FALSE, 5),
('mc-6', 'main-courses', 'Pepper Chicken Breast بيبر تشكن برست', '51', 'Grilled chicken breast with black pepper in demi-glass sauce served with mashed potatoes and sauteed vegetables', FALSE, 6);

-- Broasted Chicken Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('broasted-chicken', 'restaurant', 'Broasted Chicken', 9);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('bc-1', 'broasted-chicken', 'B-Chicken Meal 2pcs وجبة بروستد', '29', 'served with potato & garlic sauce', FALSE, 1),
('bc-2', 'broasted-chicken', 'B-Chicken Meal 5pcs وجبة بروستد', '49', 'served with potato & garlic sauce', FALSE, 2),
('bc-3', 'broasted-chicken', 'B-Chicken Meal 10pcs وجبة بروستد', '86', 'served with potato & garlic sauce', FALSE, 3),
('bc-4', 'broasted-chicken', 'B-Chicken Breast /pc صدر دجاج بروستد', '22', 'served with potato & garlic sauce', FALSE, 4),
('bc-5', 'broasted-chicken', 'B-Chicken Thigh /pc ورك دجاج بروستد', '11', 'served with potato & garlic sauce', FALSE, 5),
('bc-6', 'broasted-chicken', 'B-Chicken Drumstick /pc فخذ دجاج بروستد', '8', 'served with potato & garlic sauce', FALSE, 6),
('bc-7', 'broasted-chicken', 'B-Chicken Wing /pc جانح دجاج بروستد', '5', 'served with potato & garlic sauce', FALSE, 7);

-- Rotisserie Chicken Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('rotisserie-chicken', 'restaurant', 'Rotisserie Chicken', 10);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('rc-1', 'rotisserie-chicken', 'Full Rotisserie Chicken فروج ماكينة كامل', '79', 'our signature roasted chicken served with garlic sauce, chilly sauce & seasoned fries.', TRUE, 1),
('rc-2', 'rotisserie-chicken', 'Half Rotisserie Chicken نصف فروج ماكينة', '49', 'our signature roasted chicken served with garlic sauce, chilly sauce & seasoned fries.', TRUE, 2);

-- Burgers & Crispy Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('burgers-crispy', 'restaurant', 'Burgers & Crispy', 11);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('bg-1', 'burgers-crispy', 'Lebanese Burger برغر لبناني', '30', 'Our signature lebanese burger made with a hand seasoned chicken patty grilled to perfection with coleslaw, tomatoes, pickles, fries, onions, mustard, mayonnaise, and ketchup', FALSE, 1),
('bg-2', 'burgers-crispy', 'Crispy Chicken كرسبي تشكن', '32', 'Our Special Burger Bun with Crispy chicken, cheddar slice, iceberg lettuce, cucumber pickles and mayonnaise sauce', FALSE, 2),
('bg-3', 'burgers-crispy', 'Spicy Crispy Chicken كرسبي تشكن (حار)', '32', 'Our Special Burger Bun with Crispy chicken, cheddar slice, iceberg lettuce, cucumber pickles and mayonnaise sauce', FALSE, 3),
('bg-4', 'burgers-crispy', 'Mozzarella Burger موزاريلا', '38', 'Our multigrain Burger Bun with our special marinated grilled breast Fried Mozzarella, lettuce and our special burger sauce', FALSE, 4),
('bg-5', 'burgers-crispy', 'Crispy Tender Platter كرسبي', '47', '6 pieces of Crispy chicken tender, served with french fries, bun mayo garlic sauce and cocktail sauce', FALSE, 5),
('bg-6', 'burgers-crispy', 'Half Crispy Tender Platter كرسبي', '31', '3 pieces of Crispy chicken tender, served with french fries, bun mayo garlic sauce and cocktail sauce', FALSE, 6);

-- Shawarmas Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('shawarmas', 'restaurant', 'Shawarmas', 12);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('sh-1', 'shawarmas', 'Chicken Shawarma Small شاورما دجاج صغيرة', '11', 'our special chicken shawarma with garlic, pickles, and fries (Arabic, Saj Or Special Bread)', TRUE, 1),
('sh-2', 'shawarmas', 'Chicken Shawarma Large شاورما دجاج كبيرة', '24', 'our special chicken shawarma with garlic, pickles, and fries (Arabic, Saj Or Special Bread)', TRUE, 2),
('sh-3', 'shawarmas', 'Arabic Chicken Shawarma وجبة شاورما عربي', '42', 'our special chicken shawarma with garlic, pickles, and fries (Arabic Or Saj Bread)', TRUE, 3),
('sh-4', 'shawarmas', 'Chicken Shawarma Plate صحن شاورما دجاج', '43', 'our special chicken shawarma served with garlic sauce, pickles & french fries', TRUE, 4);

-- International Sandwiches & Wraps Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('international-sandwiches', 'restaurant', 'International Sandwich & Wraps', 13);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('isw-1', 'international-sandwiches', 'Crispy Poulailler كرسبي بولايي', '36', 'fried breaded Crispy chicken, cheddar & craft cheese sliced, iceberg lettuce, sweet corn and our special homemade tartare sauce', FALSE, 1),
('isw-2', 'international-sandwiches', 'Chicken Escalope دجاج اسكالوب', '34', 'Fried breaded escalope with coleslaw, fries, ketchup, cheese served in special bread', FALSE, 2),
('isw-3', 'international-sandwiches', 'Fajitas فاهيتا', '34', 'Chicken slices seasoned with our special spices mixed with colored bell peppers, onions, mozzarella cheese and served with guacamole sauce', FALSE, 3),
('isw-4', 'international-sandwiches', 'Francisco فرنسيسكو', '34', 'Chicken, sweet corn, lettuce, pickles sliced with cheese, mayonnaise toasted in special bread', FALSE, 4),
('isw-5', 'international-sandwiches', 'Submarine صب مارين', '33', 'Smoked turkey, spicy salami, mayonnaise, lettuce, mix cheese, tomatoes and pickles served in special bread', FALSE, 5),
('isw-6', 'international-sandwiches', 'Chicken Sub Sandwich دجاج صب', '36', 'Grilled Chicken with Smoked Turkey, cheese ice burg lettuce pesto & tartare sauce in special bread', FALSE, 6),
('isw-7', 'international-sandwiches', 'Turkey and Cheese Wrap حبش و جبنة راب', '36', 'Sliced smoked turkey, with cheese, lettuce, tomatoes, pickles, mayo mustard sauce', FALSE, 7),
('isw-8', 'international-sandwiches', 'Escalope Wrap اسكالوب راب', '36', 'Fried breaded escalope, lettuce, pickles, sweet corn, ketchup, cheese and garlic mayo', FALSE, 8),
('isw-9', 'international-sandwiches', 'Chicken Wrap دجاج راب', '36', 'Grilled chicken, with cheese, lettuce, tomatoes, pickles, garlic mayo sauce', FALSE, 9);

-- Lebanese Sandwiches & Grilled Sandwiches Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('lebanese-sandwiches', 'restaurant', 'Lebanese Sandwiches & Grilled Sandwiches', 14);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('ls-1', 'lebanese-sandwiches', 'Falafel فلافل', '19', 'Falafel with tomatoes, parsley, pickled turnip, cucumber pickles, and tahini served in arabic bread', FALSE, 1),
('ls-2', 'lebanese-sandwiches', 'Cauliflower قرنبيط مقلي', '19', 'Cauliflower sandwich with pickles and tahini sauce served in arabic bread', FALSE, 2),
('ls-3', 'lebanese-sandwiches', 'French Fries Sandwich بطاطا مقليّه', '19', 'French fries with ketchup, coleslaw and pickles served in arabic bread', FALSE, 3),
('ls-4', 'lebanese-sandwiches', 'Labneh لبنه', '20', 'Lebanese Labne with mint and virgin olive oil served in arabic bread', FALSE, 4),
('ls-5', 'lebanese-sandwiches', 'Labne with Vegetables لبنه و خضرة', '22', 'Lebanese labne with mint leaves, tomatoes and fresh cucumber served in arabic bread', FALSE, 5),
('ls-6', 'lebanese-sandwiches', 'Halloumi حلوم', '22', 'Halloumi grilled with lettuce, tomatoes and fresh cucumber served in arabic bread', FALSE, 6),
('ls-7', 'lebanese-sandwiches', 'Shish Taouk شيش طاووق', '26', 'Taouk with garlic and pickles served in arabic bread', FALSE, 7),
('ls-8', 'lebanese-sandwiches', 'Lebanese Taouk طاووق لبناني', '28', 'Taouk with garlic coleslaw salad fries and cucumber pickles served in arabic bread', FALSE, 8),
('ls-9', 'lebanese-sandwiches', 'Chicken with Garlic سندوش الدجاج بالثوم', '25', 'Roasted Chicken with garlic, pickles, and fries served in arabic bread', FALSE, 9),
('ls-10', 'lebanese-sandwiches', 'Chicken Liver سودة دجاج', '25', 'Fried chicken liver with garlic paste and pickles served in soft french bread', FALSE, 10),
('ls-11', 'lebanese-sandwiches', 'Makanek Chicken مقانق دجاج', '24', 'Grilled chicken sausages, hommos, pickles, and tomatoes served in arabic bread', FALSE, 11),
('ls-12', 'lebanese-sandwiches', 'Soujouk Chicken سجق دجاج', '24', 'Grilled spicy chicken sausages with hommos and pickles served in arabic bread', FALSE, 12),
('ls-13', 'lebanese-sandwiches', 'Kabab Halabi Chicken كباب حلبي دجاج', '26', 'kabab halabi chicken with hommos and pickles served in arabic bread', FALSE, 13),
('ls-14', 'lebanese-sandwiches', 'Kabab Intabli Chicken كباب عنتبلي دجاج', '26', 'Spicy chicken kabab with hommos and pickles served in arabic bread', FALSE, 14);

-- Grill Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('grill', 'restaurant', 'Grill', 15);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('gr-1', 'grill', 'Shish Taouk Plate طبق شيش طاووق', '52', 'Grilled marinated chicken cubes served with garlic paste, fries, and hommos', FALSE, 1),
('gr-2', 'grill', 'Kabab Halabi Chicken Plate طبق كباب حلبي دجاج', '49', 'Grilled chicken minced meat seasoned with parsley and onions served with fries and hommos', FALSE, 2),
('gr-3', 'grill', 'Kabab Intabli Chicken Plate طبق كباب عنتبلي دجاج', '49', 'Grilled spicy chicken minced meat seasoned with parsley and onions served with fries and hommos', FALSE, 3),
('gr-4', 'grill', 'Chicken Mix Grill Plate طبق مشاوي دجاج مشكّل', '51', 'shish taouk, kabab halabi chicken, kabab intabli chicken served with fries and hommos', FALSE, 4),
('gr-5', 'grill', 'Chicken Breast صدر مشوي', '52', 'Grilled marinated chicken breast served with pickles, fries, and hommos', FALSE, 5),
('gr-6', 'grill', 'Grilled Chicken Wings جوانح دجاج', '29', 'Grilled chicken wings served with garlic sauce.', FALSE, 6),
('gr-7', 'grill', 'Soujouk Chicken سجق دجاج', '32', 'Grilled spicy chicken sausages served with grilled onions and tomatoes', FALSE, 7),
('gr-8', 'grill', 'Makanek Chicken مقانق دجاج', '32', 'Grilled chicken sausages served with grilled onions, tomatoes and pomegranate molasses', FALSE, 8),
('gr-9', 'grill', 'Half Chicken نصف فروج', '48', 'Half grilled chicken served with pickles, fries, and hommos', FALSE, 9),
('gr-10', 'grill', 'Full Chicken فروج', '78', 'Full grilled chicken served with pickles, fries, and hommos', FALSE, 10),
('gr-11', 'grill', 'Taouk Half KG شيش طاووق', '76', 'shish taouk served with fries, hummus & garlic sauce', FALSE, 11),
('gr-12', 'grill', 'Kabab Intabli Chicken Half KG كباب عنتبلي دجاج', '72', 'kabab intabli chicken served with fries, hummus & garlic sauce', FALSE, 12),
('gr-13', 'grill', 'Kabab Halabi Chicken Half KG كباب حلبي دجاج', '72', 'kabab halabi chicken served with fries, hummus & garlic sauce', FALSE, 13),
('gr-14', 'grill', 'Chicken Mix Grilled Half KG مشاوي دجاج مشكّل', '75', 'shish taouk, kabab halabi chicken, kabab intabli chicken, makanek chicken, and soujouk chicken served with fries, hummus & garlic sauce', FALSE, 14),
('gr-15', 'grill', 'Taouk 1 KG شيش طاووق', '151', 'shish taouk served with fries, hummus & garlic sauce', FALSE, 15),
('gr-16', 'grill', 'Kabab Intabli Chicken 1 KG كباب عنتبلي دجاج', '141', 'kabab intabli chicken served with fries, hummus & garlic sauce', FALSE, 16),
('gr-17', 'grill', 'Kabab Halabi Chicken 1 KG كباب حلبي دجاج', '141', 'kabab halabi chicken served with fries, hummus & garlic sauce', FALSE, 17),
('gr-18', 'grill', 'Chicken Mix Grilled 1 KG مشاوي دجاج مشكّل', '149', 'shish taouk, kabab halabi chicken, kabab intabli chicken, makanek chicken, and soujouk chicken served with fries, hummus & garlic sauce', FALSE, 18);

-- Coffee Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('coffee', 'restaurant', 'Coffee', 16);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('cf-1', 'coffee', 'American Coffee اميريكان كوفي', '14', NULL, FALSE, 1),
('cf-2', 'coffee', 'Espresso Single اسبريسو سينجل', '10', NULL, FALSE, 2),
('cf-3', 'coffee', 'Espresso Double اسبريسو دبل', '14', NULL, FALSE, 3),
('cf-4', 'coffee', 'Cappuccino كابوتشينو', '15', NULL, FALSE, 4),
('cf-5', 'coffee', 'Café Latte كافي لاتي', '15', NULL, FALSE, 5),
('cf-6', 'coffee', 'Nescafe with Coffeemate نسكافيه و كوفي ميية', '15', NULL, FALSE, 6),
('cf-7', 'coffee', 'Nescafe with Milk نسكافيه و حليب', '15', NULL, FALSE, 7),
('cf-8', 'coffee', 'Nescafe Black نسكافيه بلاك', '13', NULL, FALSE, 8),
('cf-9', 'coffee', 'Nescafe Gold نسكافيه غولد', '14', NULL, FALSE, 9),
('cf-10', 'coffee', 'Nescafe 3in1 نسكافيه', '13', NULL, FALSE, 10),
('cf-11', 'coffee', 'Hot Chocolate هوت شوكلاته', '17', NULL, FALSE, 11),
('cf-12', 'coffee', 'Turkish Coffee (Cup) قهوة تركية (كوب)', '13', NULL, FALSE, 12),
('cf-13', 'coffee', 'Raqwe Turkish for Two ركوة تركية لشخصين', '18', NULL, FALSE, 13),
('cf-14', 'coffee', 'Raqwe Turkish for Four ركوة تركية لاربع اشخاص', '26', NULL, FALSE, 14);

-- Tea Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('tea', 'restaurant', 'Tea', 17);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('te-1', 'tea', 'Matte متة', '31', NULL, FALSE, 1),
('te-2', 'tea', 'Black Tea شاي', '13', NULL, FALSE, 2),
('te-3', 'tea', 'Green Tea شاي اخضر', '13', NULL, FALSE, 3),
('te-4', 'tea', 'Earl-Gray Tea شاي اخضر', '13', NULL, FALSE, 4),
('te-5', 'tea', 'Moroccan Tea for One شاي مغربي لشخص', '16', NULL, FALSE, 5),
('te-6', 'tea', 'Moroccan Tea for Two شاي مغربي لشخصين', '24', NULL, FALSE, 6),
('te-7', 'tea', 'Moroccan Tea for Four شاي مغربي لأربع اشخاص', '36', NULL, FALSE, 7);

-- Fresh Juices Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('fresh-juices', 'restaurant', 'Fresh Juices', 18);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('fj-1', 'fresh-juices', 'Watermelon Juice عصير بطيخ', '19', NULL, FALSE, 1),
('fj-2', 'fresh-juices', 'Carrot Juice عصير جزر', '19', NULL, FALSE, 2),
('fj-3', 'fresh-juices', 'Kiwi Juice عصير كيوي', '19', NULL, FALSE, 3),
('fj-4', 'fresh-juices', 'Mango Juice عصير مانجو', '21', NULL, FALSE, 4),
('fj-5', 'fresh-juices', 'Pomegranate Juice عصير رمان', '19', NULL, FALSE, 5),
('fj-6', 'fresh-juices', 'Lemonade عصير ليمون', '19', NULL, FALSE, 6),
('fj-7', 'fresh-juices', 'Lemon and Mint ليمون بالنعناع', '20', NULL, FALSE, 7),
('fj-8', 'fresh-juices', 'Orange Juice عصير برتقال', '19', NULL, FALSE, 8),
('fj-9', 'fresh-juices', 'Apple Juice عصير تفاح', '19', NULL, FALSE, 9),
('fj-10', 'fresh-juices', 'Pineapple Juice عصير الاناناس', '21', NULL, FALSE, 10),
('fj-11', 'fresh-juices', 'Strawberry Juice عصير فراولة', '21', NULL, FALSE, 11),
('fj-12', 'fresh-juices', 'Sweetmelon Juice عصير شمام', '19', NULL, FALSE, 12),
('fj-13', 'fresh-juices', 'Cocktail Juice عصير كوكتيل', '30', NULL, FALSE, 13),
('fj-14', 'fresh-juices', 'Lebanese Cocktail Fruit عصير كوكتيل لبناني', '35', NULL, FALSE, 14),
('fj-15', 'fresh-juices', 'Avocado Juice عصير الافوكادوا', '35', NULL, FALSE, 15),
('fj-16', 'fresh-juices', 'Avocado with Nutella عصير الافوكادوا مع نوتيلا', '39', NULL, FALSE, 16);

-- Cold Coffee Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('cold-coffee', 'restaurant', 'Cold Coffee', 19);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('cc-1', 'cold-coffee', 'Cappuccino Frappe كابوتشينو فرابي', '21', NULL, FALSE, 1),
('cc-2', 'cold-coffee', 'Ice Latte ايس لاتيه', '21', NULL, FALSE, 2),
('cc-3', 'cold-coffee', 'Ice Americano ايس اميريكانو', '21', NULL, FALSE, 3);

-- Milk Shake Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('milk-shake', 'restaurant', 'Milk Shake', 20);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('ms-1', 'milk-shake', 'Chocolate Milk-Shake شوكولات ميلك شيك', '24', NULL, FALSE, 1),
('ms-2', 'milk-shake', 'Strawberry Milk-Shake ستروبيري ميلك شيك', '24', NULL, FALSE, 2),
('ms-3', 'milk-shake', 'Vanilla Milk-Shake فانيلا ميلك شيك', '24', NULL, FALSE, 3),
('ms-4', 'milk-shake', 'Mango Passion Milk-Shake مانجو باشون ميلك شيك', '24', NULL, FALSE, 4),
('ms-5', 'milk-shake', 'Banana Milk-Shake بانانا ميلك شيك', '24', NULL, FALSE, 5),
('ms-6', 'milk-shake', 'Oreo Milk-Shake اوريو ميلك شيك', '24', NULL, FALSE, 6);

-- Water & Softdrinks Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('water-softdrinks', 'restaurant', 'Water & Softdrinks', 21);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('ws-1', 'water-softdrinks', 'Small Lebanese Water مياه لبنانية', '5', NULL, FALSE, 1),
('ws-2', 'water-softdrinks', 'Large Lebanese Water مياه لبنانية', '14', NULL, FALSE, 2),
('ws-3', 'water-softdrinks', 'Small Sparkling Water Perrier مياه غازية', '12', NULL, FALSE, 3),
('ws-4', 'water-softdrinks', 'Large Sparkling Water Perrier مياه غازية', '18', NULL, FALSE, 4),
('ws-5', 'water-softdrinks', 'Top Juice توب جوس', '5', NULL, FALSE, 5),
('ws-6', 'water-softdrinks', 'Soft Drink مشروبات غازية', '6', NULL, FALSE, 6),
('ws-7', 'water-softdrinks', 'Laban Ayran لبن عيران', '13', NULL, FALSE, 7);

-- Dessert Category
INSERT INTO menu_categories (id, menu_type, name, sort_order) VALUES
('dessert', 'restaurant', 'Dessert', 22);

INSERT INTO menu_items (id, category_id, name, price, description, coming_soon, sort_order) VALUES
('ds-1', 'dessert', 'Lazy Cake بسكويت بالشوكولا', '15', 'biscuit dipped in our special chocolate recipe', FALSE, 1),
('ds-2', 'dessert', 'Custard كاسترد', '15', 'mix of double custard flavors vanilla & chocolate topped with biscuit.', TRUE, 2),
('ds-3', 'dessert', 'Kunafa كنافة', '29', 'Baked semolina pastry with cheese', TRUE, 3),
('ds-4', 'dessert', 'Ghazal Al Banat غزل البنات بالايس كريم', '29', 'Mastic (Mistika) ice cream and Lebanese cotton candy. And a sprinkling of pistachios for good measure', TRUE, 4),
('ds-5', 'dessert', 'Baklawa Mix بقلاوة مشكلة', '29', 'Assorted baklawa', FALSE, 5);

-- =============================================
-- INSERT UPDATED DATA - SHOP MENU
-- =============================================

-- First, delete all existing shop menu items and categories
DELETE FROM menu_items WHERE category_id IN (
  SELECT id FROM menu_categories WHERE menu_type = 'shop'
);
DELETE FROM menu_categories WHERE menu_type = 'shop';

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
