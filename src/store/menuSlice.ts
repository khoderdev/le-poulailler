import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MenuState, MenuCategory, MenuItem } from "../types";
import { supabase } from "../lib/supabase";
import type { DbMenuCategory, DbMenuItem } from "../lib/supabase";

// Async thunk to fetch menu data from Supabase
export const fetchMenuData = createAsyncThunk("menu/fetchMenuData", async (_, { rejectWithValue }) => {
  try {
    // Fetch categories
    const { data: categories, error: catError } = await supabase.from("menu_categories").select("*").order("sort_order", { ascending: true });

    if (catError) throw catError;

    // Fetch items - sort by created_at descending so newest items appear first
    const { data: items, error: itemError } = await supabase.from("menu_items").select("*").order("created_at", { ascending: false });

    if (itemError) throw itemError;

    // Transform data to match existing structure
    const shopCategories: MenuCategory[] = [];
    const restaurantCategories: MenuCategory[] = [];

    (categories as DbMenuCategory[])?.forEach(cat => {
      const categoryItems: MenuItem[] = (items as DbMenuItem[])
        ?.filter(item => item.category_id === cat.id)
        .map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          description: item.description || undefined,
          imageUrl: item.image_url || undefined,
          comingSoon: item.coming_soon
        }));

      const menuCategory: MenuCategory = {
        id: cat.id,
        name: cat.name,
        items: categoryItems
      };

      if (cat.menu_type === "shop") {
        shopCategories.push(menuCategory);
      } else {
        restaurantCategories.push(menuCategory);
      }
    });

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
      menu_type: "shop" | "restaurant";
      name: string;
    },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as { menu: ExtendedMenuState };
      const existingCategories = category.menu_type === "shop" ? state.menu.shopMenu : state.menu.restaurantMenu;
      const maxSortOrder = existingCategories.reduce(max => Math.max(max, 0), 0);

      const newCategory = {
        id: `${category.menu_type}-${Date.now()}`,
        menu_type: category.menu_type,
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
      const newItem: MenuItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description || undefined,
        imageUrl: item.image_url || undefined,
        comingSoon: item.coming_soon
      };
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
      // Update in shopMenu
      for (const category of state.shopMenu) {
        const idx = category.items.findIndex(i => i.id === item.id);
        if (idx !== -1) {
          category.items[idx] = {
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description || undefined,
            imageUrl: item.image_url || undefined,
            comingSoon: item.coming_soon
          };
          return;
        }
      }
      // Update in restaurantMenu
      for (const category of state.restaurantMenu) {
        const idx = category.items.findIndex(i => i.id === item.id);
        if (idx !== -1) {
          category.items[idx] = {
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description || undefined,
            imageUrl: item.image_url || undefined,
            comingSoon: item.coming_soon
          };
          return;
        }
      }
    },
    realtimeItemDeleted: (state, action: PayloadAction<{ id: string; category_id: string }>) => {
      const { id: itemId } = action.payload;
      for (const category of state.shopMenu) {
        const idx = category.items.findIndex(i => i.id === itemId);
        if (idx !== -1) {
          category.items.splice(idx, 1);
          return;
        }
      }
      for (const category of state.restaurantMenu) {
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
        // Update in shopMenu
        for (const category of state.shopMenu) {
          const idx = category.items.findIndex(i => i.id === item.id);
          if (idx !== -1) {
            category.items[idx] = {
              id: item.id,
              name: item.name,
              price: item.price,
              description: item.description || undefined,
              imageUrl: item.image_url || undefined,
              comingSoon: item.coming_soon
            };
            return;
          }
        }
        // Update in restaurantMenu
        for (const category of state.restaurantMenu) {
          const idx = category.items.findIndex(i => i.id === item.id);
          if (idx !== -1) {
            category.items[idx] = {
              id: item.id,
              name: item.name,
              price: item.price,
              description: item.description || undefined,
              imageUrl: item.image_url || undefined,
              comingSoon: item.coming_soon
            };
            return;
          }
        }
      })
      // Add menu item - insert at beginning so new items appear at top
      .addCase(addMenuItem.fulfilled, (state, action) => {
        const item = action.payload;
        const newItem: MenuItem = {
          id: item.id,
          name: item.name,
          price: item.price,
          description: item.description || undefined,
          imageUrl: item.image_url || undefined,
          comingSoon: item.coming_soon
        };
        // Find category and add item at the beginning (top)
        for (const category of state.shopMenu) {
          if (category.id === item.category_id) {
            category.items.unshift(newItem);
            return;
          }
        }
        for (const category of state.restaurantMenu) {
          if (category.id === item.category_id) {
            category.items.unshift(newItem);
            return;
          }
        }
      })
      // Delete menu item
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        const itemId = action.payload;
        for (const category of state.shopMenu) {
          const idx = category.items.findIndex(i => i.id === itemId);
          if (idx !== -1) {
            category.items.splice(idx, 1);
            return;
          }
        }
        for (const category of state.restaurantMenu) {
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
      });
  }
});

export const { setActiveShopCategory, setActiveRestaurantCategory, clearError, realtimeItemInserted, realtimeItemUpdated, realtimeItemDeleted } = menuSlice.actions;
export type { MenuState };
export default menuSlice.reducer;
