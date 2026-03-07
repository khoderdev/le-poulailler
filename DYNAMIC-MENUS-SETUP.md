# Dynamic Menu System - Setup Guide

This guide explains how to set up and use the new dynamic menu creation feature in the Le Poulailler admin dashboard.

## Overview

The dynamic menu system allows you to create custom menus (like "Lent Menu", "Seasonal Menu", etc.) alongside the existing Shop and Restaurant menus. Each menu can have its own categories and items, with customizable colors.

## Database Migration

### Step 1: Run the Migration SQL

Execute the migration file in your Supabase SQL Editor:

```bash
supabase-migration-dynamic-menus.sql
```

This will:
- Create a new `menus` table to store menu definitions
- Add a `menu_id` column to `menu_categories` table
- Create default "Shop" and "Restaurant" menus
- Set up proper indexes and RLS policies

### Step 2: Verify Migration

Check that the following tables exist in your Supabase database:
- `menus` - Stores menu definitions (name, color, slug, etc.)
- `menu_categories` - Now has a `menu_id` foreign key
- `menu_items` - Unchanged

## Features

### 1. Create New Menus

In the Admin Dashboard:
1. Click the **"+ New Menu"** button next to the existing menu tabs
2. Enter a menu name (e.g., "Lent Menu")
3. Choose a color for the menu (used for buttons and highlights)
4. Click "Create Menu"

### 2. Menu Properties

Each menu has:
- **Name**: Display name shown in the UI
- **Slug**: Auto-generated URL-friendly identifier
- **Color**: Hex color code for UI theming
- **Sort Order**: Determines the order menus appear
- **Active Status**: Whether the menu is visible

### 3. Categories and Items

Once a menu is created:
- Add categories specific to that menu
- Add items to those categories
- Manage everything through the existing admin interface

## Technical Details

### Database Schema

**menus table:**
```sql
- id (TEXT, PRIMARY KEY)
- name (TEXT, NOT NULL)
- slug (TEXT, UNIQUE, NOT NULL)
- color (TEXT, DEFAULT '#286091')
- sort_order (INTEGER, DEFAULT 0)
- is_active (BOOLEAN, DEFAULT true)
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```

**menu_categories table (updated):**
```sql
- id (TEXT, PRIMARY KEY)
- menu_id (TEXT, REFERENCES menus(id))
- menu_type (TEXT) -- kept for backward compatibility
- name (TEXT, NOT NULL)
- sort_order (INTEGER, DEFAULT 0)
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```

### Redux Store

New actions available:
- `fetchMenus()` - Fetch all active menus with categories and items
- `addMenu({ name, color })` - Create a new menu
- `updateMenu({ menuId, name, color })` - Update menu properties
- `deleteMenu(menuId)` - Delete a menu (cascades to categories/items)

### TypeScript Types

```typescript
interface Menu {
  id: string;
  name: string;
  slug: string;
  color: string;
  sortOrder: number;
  isActive: boolean;
  categories: MenuCategory[];
}
```

## Usage Examples

### Creating a Lent Menu

1. Click "+ New Menu"
2. Name: "Lent Menu"
3. Color: "#4a5568" (or any color you prefer)
4. Click "Create Menu"

The menu will appear as a new tab in the admin dashboard.

### Adding Categories to the New Menu

1. Select your new menu tab
2. Click "+ Add" in the Categories section
3. Add categories like "Lent Soups", "Lent Salads", etc.
4. Add items to each category

## Backward Compatibility

The system maintains backward compatibility with the existing Shop and Restaurant menus:
- Existing data is automatically migrated
- The `menu_type` column is kept for compatibility
- All existing functionality continues to work

## Best Practices

1. **Menu Colors**: Choose colors that provide good contrast with white text
2. **Menu Names**: Keep them short and descriptive (2-3 words max)
3. **Slugs**: Auto-generated, but ensure they're unique
4. **Sort Order**: Menus appear in the order they were created

## Troubleshooting

### Menu not appearing after creation
- Check that `is_active` is set to `true` in the database
- Verify the menu was created successfully in Supabase
- Refresh the admin dashboard

### Categories not showing
- Ensure `menu_id` matches the parent menu's ID
- Check that categories have proper `sort_order` values

### Items not displaying
- Verify `category_id` references a valid category
- Check that the category belongs to the correct menu

## Future Enhancements

Potential features to add:
- Drag-and-drop menu reordering
- Menu duplication
- Menu templates
- Seasonal menu scheduling
- Menu-specific permissions

## Support

For issues or questions, check:
1. Supabase logs for database errors
2. Browser console for frontend errors
3. Redux DevTools for state management issues
