# Menu Item Image Upload Feature

## Overview
This feature allows administrators to upload, manage, and display images for menu items with optimized performance and excellent UX.

## Features Implemented

### 1. **Database Schema**
- Added `image_url` field to `menu_items` table
- Created Supabase Storage bucket `menu-items` for image storage
- Configured public read access and authenticated write access

### 2. **Image Upload Component** (`src/components/ImageUpload.tsx`)
- **Drag & Drop Support**: Intuitive drag-and-drop interface
- **Click to Upload**: Traditional file picker option
- **Image Preview**: Real-time preview before saving
- **File Validation**: 
  - Accepts only image files (PNG, JPG, GIF, etc.)
  - Maximum file size: 5MB
- **Visual Feedback**: Loading states and error handling
- **Remove Functionality**: Easy image removal with confirmation

### 3. **Image Upload Utilities** (`src/lib/imageUpload.ts`)
- **uploadMenuItemImage**: Uploads images to Supabase Storage
  - Generates unique filenames with timestamps
  - Returns public URL and storage path
- **deleteMenuItemImage**: Removes images from storage
- **getOptimizedImageUrl**: Returns optimized image URLs with query parameters
  - Supports width-based optimization
  - Quality optimization (80%)

### 4. **Admin Dashboard Integration**
- **Add New Item**: Image upload field in the add item form
- **Edit Item**: Update or replace existing images
- **Image Display**: Thumbnail preview in item list (24x24 grid)
- **Automatic Cleanup**: Old images are deleted when replaced

### 5. **Optimized Menu Rendering** (`src/components/MenuItems.tsx`)
- **Lazy Loading**: Images load only when visible in viewport
- **Progressive Loading**: Smooth fade-in effect
- **Loading States**: Spinner while image loads
- **Error Handling**: Graceful fallback if image fails to load
- **Responsive Images**: Aspect ratio maintained (16:9)
- **Performance**: Optimized image URLs for faster loading

### 6. **State Management** (`src/store/menuSlice.ts`)
- Updated all Redux actions to handle `image_url` field
- Real-time updates include image URLs
- Proper mapping between database and UI types

## Usage Guide

### For Administrators

#### Adding a New Menu Item with Image:
1. Navigate to Admin Dashboard
2. Select a category
3. Click "Add Item"
4. Fill in item details (name, price, description)
5. **Upload Image**:
   - Click the upload area or drag & drop an image
   - Preview appears immediately
   - Click X to remove if needed
6. Click "Save"

#### Editing an Existing Item's Image:
1. Click "Edit" on any menu item
2. The current image (if any) will be displayed
3. **To replace**: Upload a new image (old one auto-deletes)
4. **To remove**: Click the X on the image preview
5. Click "Save Changes"

### For Developers

#### Image Upload Flow:
```typescript
// 1. User selects image via ImageUpload component
<ImageUpload
  currentImageUrl={item.imageUrl}
  onImageChange={setImageFile}
  disabled={isSaving}
/>

// 2. On save, upload to Supabase
const uploadResult = await uploadMenuItemImage(file, itemId);

// 3. Update database with image URL
await dispatch(updateMenuItem({
  itemId,
  updates: { image_url: uploadResult.url }
}));

// 4. Image renders with optimization
const optimizedUrl = getOptimizedImageUrl(imageUrl, 400);
```

## Performance Optimizations

### 1. **Lazy Loading**
- Images only load when scrolled into view
- Reduces initial page load time
- Saves bandwidth for users

### 2. **Image Optimization**
- Width-based resizing via query parameters
- Quality compression (80%)
- Reduces file size by ~50-70%

### 3. **Progressive Enhancement**
- Loading spinners during image load
- Smooth fade-in transitions
- Graceful error handling

### 4. **Caching**
- Browser caches optimized images
- Supabase CDN caching (3600s)
- Faster subsequent loads

## Database Setup

Run the following SQL in your Supabase SQL Editor:

```sql
-- Already included in supabase-setup.sql

-- 1. Add image_url column (if not exists)
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS image_url TEXT;

-- 2. Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('menu-items', 'menu-items', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Set up storage policies (see supabase-setup.sql)
```

## File Structure

```
src/
├── components/
│   ├── ImageUpload.tsx          # Image upload component
│   └── MenuItems.tsx             # Menu display with images
├── lib/
│   ├── imageUpload.ts            # Image utilities
│   └── supabase.ts               # Supabase client
├── pages/
│   └── AdminDashboard.tsx        # Admin interface
├── store/
│   └── menuSlice.ts              # Redux state management
└── types/
    └── index.ts                  # TypeScript types
```

## Best Practices

### Image Guidelines:
- **Recommended Size**: 800x450px (16:9 aspect ratio)
- **Format**: JPG or PNG
- **File Size**: Under 2MB for best performance
- **Content**: High-quality food photography with good lighting

### Performance Tips:
- Upload compressed images when possible
- Use consistent aspect ratios
- Avoid extremely large images (>5MB)

## Troubleshooting

### Images Not Uploading:
1. Check Supabase Storage bucket exists
2. Verify storage policies are set correctly
3. Check file size (must be <5MB)
4. Ensure file is a valid image format

### Images Not Displaying:
1. Verify `image_url` is saved in database
2. Check browser console for errors
3. Ensure Supabase bucket is public
4. Check network tab for failed requests

### Performance Issues:
1. Compress images before upload
2. Clear browser cache
3. Check network speed
4. Verify image optimization is working

## Future Enhancements

Potential improvements:
- [ ] Image cropping tool
- [ ] Multiple images per item
- [ ] Image gallery view
- [ ] Automatic image compression on upload
- [ ] WebP format support
- [ ] Image CDN integration
- [ ] Bulk image upload
- [ ] Image search/filter in admin

## Technical Details

### Image Storage Path:
```
menu-items/{itemId}-{timestamp}.{extension}
```

### Public URL Format:
```
https://{project}.supabase.co/storage/v1/object/public/menu-items/{path}
```

### Optimized URL Format:
```
{publicUrl}?width=400&quality=80
```

## Support

For issues or questions:
1. Check this documentation
2. Review Supabase Storage logs
3. Check browser console for errors
4. Verify database schema matches expected structure
