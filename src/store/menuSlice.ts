import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MenuState } from "../types";
import { shopMenuData, restaurantMenuData } from "../types";

const initialState: MenuState = {
  shopMenu: shopMenuData,
  restaurantMenu: restaurantMenuData,
  activeShopCategory: "fresh-chicken",
  activeRestaurantCategory: "soup",
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
  },
});

export const { setActiveShopCategory, setActiveRestaurantCategory } =
  menuSlice.actions;
export type { MenuState };
export default menuSlice.reducer;
