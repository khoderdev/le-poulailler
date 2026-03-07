-- =============================================
-- ADD IMAGE_URL COLUMN TO EXISTING menu_items TABLE
-- This will NOT delete any existing data
-- =============================================

-- Add image_url column to menu_items table (if it doesn't exist)
ALTER TABLE menu_items 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- =============================================
-- STORAGE BUCKET SETUP FOR MENU ITEM IMAGES
-- =============================================

-- Create storage bucket for menu item images
INSERT INTO storage.buckets (id, name, public)
VALUES ('menu-items', 'menu-items', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Public read access for menu item images" ON storage.objects;
DROP POLICY IF EXISTS "Allow upload of menu item images" ON storage.objects;
DROP POLICY IF EXISTS "Allow update of menu item images" ON storage.objects;
DROP POLICY IF EXISTS "Allow delete of menu item images" ON storage.objects;
DROP POLICY IF EXISTS "Allow all operations on menu item images" ON storage.objects;

-- Allow public read access to menu item images
CREATE POLICY "Public read access for menu item images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'menu-items');

-- Allow all operations on menu item images (admin auth handled at app level)
CREATE POLICY "Allow all operations on menu item images"
  ON storage.objects FOR ALL
  USING (bucket_id = 'menu-items')
  WITH CHECK (bucket_id = 'menu-items');
