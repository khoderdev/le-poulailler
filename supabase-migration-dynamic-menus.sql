CREATE TABLE IF NOT EXISTS menus (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL DEFAULT '#286091',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE menu_categories ADD COLUMN IF NOT EXISTS menu_id TEXT REFERENCES menus(id) ON DELETE CASCADE;

-- Make menu_type nullable for backward compatibility (now using menu_id)
ALTER TABLE menu_categories ALTER COLUMN menu_type DROP NOT NULL;

CREATE INDEX IF NOT EXISTS idx_menu_categories_menu_id ON menu_categories(menu_id);

ALTER TABLE menus ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on menus"
  ON menus FOR SELECT
  USING (true);

CREATE POLICY "Allow all operations on menus"
  ON menus FOR ALL
  USING (true)
  WITH CHECK (true);

INSERT INTO menus (id, name, slug, color, sort_order, is_active) VALUES
('shop', 'Shop Menu', 'shop', '#286091', 1, true),
('restaurant', 'Restaurant Menu', 'restaurant', '#9c2622', 2, true)
ON CONFLICT (id) DO NOTHING;

UPDATE menu_categories SET menu_id = menu_type WHERE menu_id IS NULL;
