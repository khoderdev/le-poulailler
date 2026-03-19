import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MenuState, MenuCategory, MenuItem, Menu } from "../types";
import { supabase } from "../lib/supabase";
import type { DbMenuCategory, DbMenuItem, DbMenu } from "../lib/supabase";

// Helper: transform DbMenuItem to MenuItem (eliminates ~8 duplications)
const toMenuItem = (item: DbMenuItem): MenuItem => ({
  id: item.id,
  name: item.name,
  price: item.price,
  description: item.description || undefined,
  imageUrl: item.image_url || undefined,
  comingSoon: item.coming_soon
});

// Async thunk to fetch menu data from Supabase
export const fetchMenuData = createAsyncThunk("menu/fetchMenuData", async (_, { rejectWithValue }) => {
  try {
    // Parallel fetch — categories and items at the same time
    const [catResult, itemResult] = await Promise.all([
      supabase.from("menu_categories").select("*").order("sort_order", { ascending: true }),
      supabase.from("menu_items").select("*").order("created_at", { ascending: false })
    ]);

    if (catResult.error) throw catResult.error;
    if (itemResult.error) throw itemResult.error;

    const categories = catResult.data as DbMenuCategory[];
    const items = itemResult.data as DbMenuItem[];

    // Build a lookup map for O(1) category→items grouping
    const itemsByCategory = new Map<string, MenuItem[]>();
    for (const item of items) {
      const arr = itemsByCategory.get(item.category_id) || [];
      arr.push(toMenuItem(item));
      itemsByCategory.set(item.category_id, arr);
    }

    const shopCategories: MenuCategory[] = [];
    const restaurantCategories: MenuCategory[] = [];

    for (const cat of categories) {
      const menuCategory: MenuCategory = {
        id: cat.id,
        name: cat.name,
        items: itemsByCategory.get(cat.id) || []
      };

      if (cat.menu_type === "shop") {
        shopCategories.push(menuCategory);
      } else {
        restaurantCategories.push(menuCategory);
      }
    }

    return {
      shopMenu: shopCategories,
      restaurantMenu: restaurantCategories
    };
  } catch (error) {
    console.error("Error fetching menu data:", error);
    return rejectWithValue("Failed to fetch menu data");
  }
});

// Async thunk to update a menu item
export const updateMenuItem = createAsyncThunk(
  "menu/updateMenuItem",
  async (
    {
      itemId,
      updates
    }: {
      itemId: string;
      updates: Partial<{
        name: string;
        price: number | string;
        description: string | null;
        image_url: string | null;
        coming_soon: boolean;
      }>;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data, error } = await supabase
        .from("menu_items")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", itemId)
        .select()
        .single();

      if (error) throw error;
      return data as DbMenuItem;
    } catch (error) {
      console.error("Error updating menu item:", error);
      return rejectWithValue("Failed to update menu item");
    }
  }
);

// Async thunk to add a menu item
export const addMenuItem = createAsyncThunk(
  "menu/addMenuItem",
  async (
    item: {
      category_id: string;
      name: string;
      price: number | string;
      description?: string;
      image_url?: string;
      coming_soon?: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      // New items get sort_order 0 to appear at top
      const newItem = {
        id: `item-${Date.now()}`,
        category_id: item.category_id,
        name: item.name,
        price: item.price,
        description: item.description || null,
        image_url: item.image_url || null,
        coming_soon: item.coming_soon || false,
        sort_order: 0,
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase.from("menu_items").insert(newItem).select().single();

      if (error) throw error;
      return data as DbMenuItem;
    } catch (error) {
      console.error("Error adding menu item:", error);
      return rejectWithValue("Failed to add menu item");
    }
  }
);

// Async thunk to delete a menu item
export const deleteMenuItem = createAsyncThunk("menu/deleteMenuItem", async (itemId: string, { rejectWithValue }) => {
  try {
    const { error } = await supabase.from("menu_items").delete().eq("id", itemId);

    if (error) throw error;
    return itemId;
  } catch (error) {
    console.error("Error deleting menu item:", error);
    return rejectWithValue("Failed to delete menu item");
  }
});

// Async thunk to add a menu category
export const addMenuCategory = createAsyncThunk(
  "menu/addMenuCategory",
  async (
    category: {
      menu_type?: "shop" | "restaurant"; // Legacy support
      menu_id?: string; // New dynamic menu support
      name: string;
    },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as { menu: ExtendedMenuState };
      
      // Determine menu_id (support both legacy and new system)
      const menuId = category.menu_id || category.menu_type || "shop";
      
      // Get existing categories for sort order
      const existingCategories = category.menu_type === "shop" ? state.menu.shopMenu : state.menu.restaurantMenu;
      const maxSortOrder = existingCategories.reduce((max) => Math.max(max, 0), 0);

      const newCategory = {
        id: `${menuId}-${Date.now()}`,
        menu_id: menuId,
        menu_type: category.menu_type, // Keep for backward compatibility
        name: category.name,
        sort_order: maxSortOrder + 1,
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase.from("menu_categories").insert(newCategory).select().single();

      if (error) throw error;
      return data as DbMenuCategory;
    } catch (error) {
      console.error("Error adding menu category:", error);
      return rejectWithValue("Failed to add menu category");
    }
  }
);

// Async thunk to update a menu category
export const updateMenuCategory = createAsyncThunk(
  "menu/updateMenuCategory",
  async (
    payload: {
      categoryId: string;
      name: string;
      menuType: "shop" | "restaurant";
    },
    { rejectWithValue }
  ) => {
    try {
      const { data, error } = await supabase.from("menu_categories").update({ name: payload.name, updated_at: new Date().toISOString() }).eq("id", payload.categoryId).select().single();

      if (error) throw error;
      return { ...payload, data: data as DbMenuCategory };
    } catch (error) {
      console.error("Error updating menu category:", error);
      return rejectWithValue("Failed to update menu category");
    }
  }
);

// =============================================
// Menu CRUD Operations
// =============================================

// Fetch all menus
export const fetchMenus = createAsyncThunk("menu/fetchMenus", async (_, { rejectWithValue }) => {
  try {
    // Parallel fetch — all three queries at once
    const [menuResult, catResult, itemResult] = await Promise.all([
      supabase.from("menus").select("*").eq("is_active", true).order("sort_order", { ascending: true }),
      supabase.from("menu_categories").select("*").order("sort_order", { ascending: true }),
      supabase.from("menu_items").select("*").order("created_at", { ascending: false })
    ]);

    if (menuResult.error) throw menuResult.error;
    if (catResult.error) throw catResult.error;
    if (itemResult.error) throw itemResult.error;

    const menus = menuResult.data as DbMenu[];
    const categories = catResult.data as DbMenuCategory[];
    const items = itemResult.data as DbMenuItem[];

    // Build lookup maps for O(1) grouping
    const itemsByCategory = new Map<string, MenuItem[]>();
    for (const item of items) {
      const arr = itemsByCategory.get(item.category_id) || [];
      arr.push(toMenuItem(item));
      itemsByCategory.set(item.category_id, arr);
    }

    const categoriesByMenu = new Map<string, MenuCategory[]>();
    for (const cat of categories) {
      const menuId = cat.menu_id;
      const arr = categoriesByMenu.get(menuId) || [];
      arr.push({
        id: cat.id,
        name: cat.name,
        items: itemsByCategory.get(cat.id) || []
      });
      categoriesByMenu.set(menuId, arr);
    }

    const menusWithCategories: Menu[] = menus.map(menu => ({
      id: menu.id,
      name: menu.name,
      slug: menu.slug,
      color: menu.color,
      sortOrder: menu.sort_order,
      isActive: menu.is_active,
      categories: categoriesByMenu.get(menu.id) || []
    }));

    return menusWithCategories;
  } catch (error) {
    console.error("Error fetching menus:", error);
    return rejectWithValue("Failed to fetch menus");
  }
});

// Add a new menu
export const addMenu = createAsyncThunk(
  "menu/addMenu",
  async (
    menu: {
      name: string;
      color?: string;
    },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as { menu: ExtendedMenuState };
      const maxSortOrder = state.menu.menus.reduce((max, m) => Math.max(max, m.sortOrder), 0);
      const slug = menu.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

      const newMenu = {
        id: `menu-${Date.now()}`,
        name: menu.name,
        slug,
        color: menu.color || "#286091",
        sort_order: maxSortOrder + 1,
        is_active: true,
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase.from("menus").insert(newMenu).select().single();

      if (error) throw error;
      return data as DbMenu;
    } catch (error) {
      console.error("Error adding menu:", error);
      return rejectWithValue("Failed to add menu");
    }
  }
);

// Update a menu
export const updateMenu = createAsyncThunk(
  "menu/updateMenu",
  async (
    payload: {
      menuId: string;
      name?: string;
      color?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const updates: Partial<DbMenu> = {
        updated_at: new Date().toISOString()
      };
      if (payload.name) updates.name = payload.name;
      if (payload.color) updates.color = payload.color;

      const { data, error } = await supabase.from("menus").update(updates).eq("id", payload.menuId).select().single();

      if (error) throw error;
      return data as DbMenu;
    } catch (error) {
      console.error("Error updating menu:", error);
      return rejectWithValue("Failed to update menu");
    }
  }
);

// Delete a menu
export const deleteMenu = createAsyncThunk(
  "menu/deleteMenu",
  async (menuId: string, { rejectWithValue }) => {
    try {
      const { error } = await supabase.from("menus").delete().eq("id", menuId);

      if (error) throw error;
      return menuId;
    } catch (error) {
      console.error("Error deleting menu:", error);
      return rejectWithValue("Failed to delete menu");
    }
  }
);

// Async thunk to delete a menu category
export const deleteMenuCategory = createAsyncThunk(
  "menu/deleteMenuCategory",
  async (
    payload: {
      categoryId: string;
      menuType: "shop" | "restaurant";
    },
    { rejectWithValue }
  ) => {
    try {
      const { error } = await supabase.from("menu_categories").delete().eq("id", payload.categoryId);

      if (error) throw error;
      return payload;
    } catch (error) {
      console.error("Error deleting menu category:", error);
      return rejectWithValue("Failed to delete menu category");
    }
  }
);

interface ExtendedMenuState extends MenuState {
  isLoading: boolean;
  error: string | null;
  isDataFromSupabase: boolean;
}

const initialState: ExtendedMenuState = {
  menus: [],
  activeMenuId: "",
  activeCategoryByMenu: {},
  shopMenu: [],
  restaurantMenu: [],
  activeShopCategory: "",
  activeRestaurantCategory: "",
  isLoading: false,
  error: null,
  isDataFromSupabase: false
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setActiveShopCategory: (state, action: PayloadAction<string>) => {
      state.activeShopCategory = action.payload;
    },
    setActiveRestaurantCategory: (state, action: PayloadAction<string>) => {
      state.activeRestaurantCategory = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    // Realtime handlers
    realtimeItemInserted: (state, action: PayloadAction<DbMenuItem>) => {
      const item = action.payload;
      const newItem = toMenuItem(item);
      // Find category and add item at the beginning (top)
      for (const category of state.shopMenu) {
        if (category.id === item.category_id) {
          // Avoid duplicates
          if (!category.items.some(i => i.id === item.id)) {
            category.items.unshift(newItem);
          }
          return;
        }
      }
      for (const category of state.restaurantMenu) {
        if (category.id === item.category_id) {
          if (!category.items.some(i => i.id === item.id)) {
            category.items.unshift(newItem);
          }
          return;
        }
      }
    },
    realtimeItemUpdated: (state, action: PayloadAction<DbMenuItem>) => {
      const item = action.payload;
      const updated = toMenuItem(item);
      for (const category of [...state.shopMenu, ...state.restaurantMenu]) {
        const idx = category.items.findIndex(i => i.id === item.id);
        if (idx !== -1) {
          category.items[idx] = updated;
          return;
        }
      }
    },
    realtimeItemDeleted: (state, action: PayloadAction<{ id: string; category_id: string }>) => {
      const { id: itemId } = action.payload;
      for (const category of [...state.shopMenu, ...state.restaurantMenu]) {
        const idx = category.items.findIndex(i => i.id === itemId);
        if (idx !== -1) {
          category.items.splice(idx, 1);
          return;
        }
      }
    }
  },
  extraReducers: builder => {
    builder
      // Fetch menu data
      .addCase(fetchMenuData.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMenuData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDataFromSupabase = true;
        state.shopMenu = action.payload.shopMenu;
        state.restaurantMenu = action.payload.restaurantMenu;
        if (action.payload.shopMenu.length > 0) {
          state.activeShopCategory = action.payload.shopMenu[0].id;
        }
        if (action.payload.restaurantMenu.length > 0) {
          state.activeRestaurantCategory = action.payload.restaurantMenu[0].id;
        }
      })
      .addCase(fetchMenuData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update menu item
      .addCase(updateMenuItem.fulfilled, (state, action) => {
        const item = action.payload;
        const updated = toMenuItem(item);
        for (const category of [...state.shopMenu, ...state.restaurantMenu]) {
          const idx = category.items.findIndex(i => i.id === item.id);
          if (idx !== -1) {
            category.items[idx] = updated;
            return;
          }
        }
      })
      // Add menu item - insert at beginning so new items appear at top
      .addCase(addMenuItem.fulfilled, (state, action) => {
        const item = action.payload;
        const newItem = toMenuItem(item);
        for (const category of [...state.shopMenu, ...state.restaurantMenu]) {
          if (category.id === item.category_id) {
            category.items.unshift(newItem);
            return;
          }
        }
      })
      // Delete menu item
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        const itemId = action.payload;
        for (const category of [...state.shopMenu, ...state.restaurantMenu]) {
          const idx = category.items.findIndex(i => i.id === itemId);
          if (idx !== -1) {
            category.items.splice(idx, 1);
            return;
          }
        }
      })
      // Add menu category
      .addCase(addMenuCategory.fulfilled, (state, action) => {
        const category = action.payload;
        const newCategory: MenuCategory = {
          id: category.id,
          name: category.name,
          items: []
        };
        if (category.menu_type === "shop") {
          state.shopMenu.push(newCategory);
        } else {
          state.restaurantMenu.push(newCategory);
        }
      })
      // Update menu category
      .addCase(updateMenuCategory.fulfilled, (state, action) => {
        const { categoryId, name, menuType } = action.payload;
        const menu = menuType === "shop" ? state.shopMenu : state.restaurantMenu;
        const category = menu.find(cat => cat.id === categoryId);
        if (category) {
          category.name = name;
        }
      })
      // Delete menu category
      .addCase(deleteMenuCategory.fulfilled, (state, action) => {
        const { categoryId, menuType } = action.payload;
        if (menuType === "shop") {
          state.shopMenu = state.shopMenu.filter(cat => cat.id !== categoryId);
        } else {
          state.restaurantMenu = state.restaurantMenu.filter(cat => cat.id !== categoryId);
        }
      })
      // Fetch menus
      .addCase(fetchMenus.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.menus = action.payload;
        if (action.payload.length > 0) {
          state.activeMenuId = action.payload[0].id;
          // Set active category for each menu
          action.payload.forEach(menu => {
            if (menu.categories.length > 0) {
              state.activeCategoryByMenu[menu.id] = menu.categories[0].id;
            }
          });
        }
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add menu
      .addCase(addMenu.fulfilled, (state, action) => {
        const newMenu: Menu = {
          id: action.payload.id,
          name: action.payload.name,
          slug: action.payload.slug,
          color: action.payload.color,
          sortOrder: action.payload.sort_order,
          isActive: action.payload.is_active,
          categories: []
        };
        state.menus.push(newMenu);
      })
      // Update menu
      .addCase(updateMenu.fulfilled, (state, action) => {
        const menu = state.menus.find(m => m.id === action.payload.id);
        if (menu) {
          menu.name = action.payload.name;
          menu.color = action.payload.color;
        }
      })
      // Delete menu
      .addCase(deleteMenu.fulfilled, (state, action) => {
        state.menus = state.menus.filter(m => m.id !== action.payload);
        if (state.activeMenuId === action.payload && state.menus.length > 0) {
          state.activeMenuId = state.menus[0].id;
        }
      });
  }
});

export const { setActiveShopCategory, setActiveRestaurantCategory, clearError, realtimeItemInserted, realtimeItemUpdated, realtimeItemDeleted } = menuSlice.actions;
export type { MenuState };
export default menuSlice.reducer;

// =============================================
// Memoized Selectors (prevent unnecessary re-renders)
// =============================================
const selectMenuState = (state: { menu: ExtendedMenuState }) => state.menu;

export const selectShopMenu = createSelector(selectMenuState, menu => menu.shopMenu);
export const selectRestaurantMenu = createSelector(selectMenuState, menu => menu.restaurantMenu);
export const selectActiveShopCategory = createSelector(selectMenuState, menu => menu.activeShopCategory);
export const selectActiveRestaurantCategory = createSelector(selectMenuState, menu => menu.activeRestaurantCategory);
export const selectMenus = createSelector(selectMenuState, menu => menu.menus);
export const selectIsLoading = createSelector(selectMenuState, menu => menu.isLoading);
export const selectMenuError = createSelector(selectMenuState, menu => menu.error);

export const selectShopActiveItems = createSelector(
  [selectShopMenu, selectActiveShopCategory],
  (shopMenu, activeCategory) => shopMenu.find(cat => cat.id === activeCategory)?.items ?? []
);

export const selectRestaurantActiveItems = createSelector(
  [selectRestaurantMenu, selectActiveRestaurantCategory],
  (restaurantMenu, activeCategory) => restaurantMenu.find(cat => cat.id === activeCategory)?.items ?? []
);
