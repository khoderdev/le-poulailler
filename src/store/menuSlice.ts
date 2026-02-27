import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { MenuState, MenuCategory } from '../types';

const shopMenuData: MenuCategory[] = [
  {
    id: 'fresh-chicken',
    name: 'Fresh Chicken',
    items: [
      { id: 'fc-1', name: 'Whole Chicken /kg', price: 23 },
      { id: 'fc-2', name: 'Chicken Breast Bone-In/kg', price: 49 },
      { id: 'fc-3', name: 'Chicken Leg Bone-In/kg', price: 32 },
      { id: 'fc-4', name: 'Chicken ThighBone-In/kg', price: 30 },
      { id: 'fc-5', name: 'Drum Sticks Bone-In/kg', price: 33 },
      { id: 'fc-6', name: 'Chicken Wings Bone-In/kg', price: 24 },
      { id: 'fc-7', name: 'Chicken Breast Boneless /kg', price: 56 },
      { id: 'fc-8', name: 'Chicken Legs Boneless/kg', price: 52 },
      { id: 'fc-9', name: 'Whole Chicken Boneless /kg', price: 52 },
      { id: 'fc-10', name: 'Chicken Liver/kg', price: 25 },
      { id: 'fc-11', name: 'Chicken Gizzard', price: 25 },
      { id: 'fc-12', name: 'Chicken Heart', price: 25 },
      { id: 'fc-13', name: 'Minced Chicken', price: 55 },
    ],
  },
  {
    id: 'chilled-items',
    name: 'Chilled Items',
    items: [
      { id: 'ci-1', name: 'Chicken Fajita /kg', price: 56 },
      { id: 'ci-2', name: 'Chicken Francisco /kg', price: 56 },
      { id: 'ci-3', name: 'shish Taouk /kg ( white or red )', price: 56 },
      { id: 'ci-4', name: 'Chicken Breast marinated /kg', price: 56 },
      { id: 'ci-5', name: 'Wings /kg (BBQ/BUFFALO/PROVENCIA)', price: 30 },
      { id: 'ci-6', name: 'Chiken Kebab /kg', price: 59 },
      { id: 'ci-7', name: 'Whole Chicken marinated /piece', price: 36 },
      { id: 'ci-8', name: 'Arayes Chikcen /kg', price: 51 },
    ],
  },
  {
    id: 'frozen-items',
    name: 'Frozen Items',
    items: [
      { id: 'fi-1', name: 'Chicken Kiev /kg', price: 78 },
      { id: 'fi-2', name: 'Chicken Crispy Fillet /kg', price: 64 },
      { id: 'fi-3', name: 'Chicken Cordon Bleu /kg', price: 95 },
      { id: 'fi-4', name: 'Chicken Escalope /kg', price: 64 },
      { id: 'fi-5', name: 'Chicken Burger /kg', price: 52 },
      { id: 'fi-6', name: 'Chicken Makanek /kg', price: 52 },
      { id: 'fi-7', name: 'Chicken Sojouk /kg', price: 52 },
      { id: 'fi-8', name: 'Cheese Rolls /pcs', price: 4 },
      { id: 'fi-9', name: 'Kebbeh Chicken /pcs', price: 4 },
      { id: 'fi-10', name: 'Spinash Fatayer', price: 4 },
    ],
  },
];

const restaurantMenuData: MenuCategory[] = [
  {
    id: 'starters',
    name: 'Starters',
    items: [
      { id: 'st-1', name: 'Chicken Soup', price: 18 },
      { id: 'st-2', name: 'Chicken Wings (6pcs)', price: 28 },
      { id: 'st-3', name: 'Chicken Nuggets', price: 22 },
      { id: 'st-4', name: 'Chicken Spring Rolls', price: 20 },
      { id: 'st-5', name: 'Crispy Chicken Strips', price: 25 },
      { id: 'st-6', name: 'Chicken Samosa (4pcs)', price: 18 },
    ],
  },
  {
    id: 'main-course',
    name: 'Main Course',
    items: [
      { id: 'mc-1', name: 'Grilled Chicken Plate', price: 55 },
      { id: 'mc-2', name: 'Chicken Shawarma Plate', price: 45 },
      { id: 'mc-3', name: 'Chicken Biryani', price: 48 },
      { id: 'mc-4', name: 'Butter Chicken with Rice', price: 52 },
      { id: 'mc-5', name: 'Chicken Tikka Masala', price: 50 },
      { id: 'mc-6', name: 'Roasted Half Chicken', price: 58 },
      { id: 'mc-7', name: 'Chicken Steak', price: 62 },
      { id: 'mc-8', name: 'Chicken Fried Rice', price: 38 },
    ],
  },
  {
    id: 'sandwiches',
    name: 'Sandwiches',
    items: [
      { id: 'sw-1', name: 'Classic Chicken Sandwich', price: 28 },
      { id: 'sw-2', name: 'Chicken Club Sandwich', price: 35 },
      { id: 'sw-3', name: 'Grilled Chicken Wrap', price: 30 },
      { id: 'sw-4', name: 'Chicken Burger', price: 32 },
      { id: 'sw-5', name: 'Spicy Chicken Sandwich', price: 30 },
      { id: 'sw-6', name: 'Chicken Caesar Wrap', price: 33 },
    ],
  },
  {
    id: 'beverages',
    name: 'Beverages',
    items: [
      { id: 'bv-1', name: 'Fresh Lemonade', price: 12 },
      { id: 'bv-2', name: 'Iced Tea', price: 10 },
      { id: 'bv-3', name: 'Soft Drinks', price: 8 },
      { id: 'bv-4', name: 'Fresh Orange Juice', price: 15 },
      { id: 'bv-5', name: 'Mineral Water', price: 5 },
      { id: 'bv-6', name: 'Coffee', price: 12 },
    ],
  },
];

const initialState: MenuState = {
  shopMenu: shopMenuData,
  restaurantMenu: restaurantMenuData,
  activeShopCategory: 'fresh-chicken',
  activeRestaurantCategory: 'starters',
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActiveShopCategory: (state, action: PayloadAction<string>) => {
      state.activeShopCategory = action.payload;
    },
    setActiveRestaurantCategory: (state, action: PayloadAction<string>) => {
      state.activeRestaurantCategory = action.payload;
    },
  },
});

export const { setActiveShopCategory, setActiveRestaurantCategory } = menuSlice.actions;
export type { MenuState };
export default menuSlice.reducer;
