export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuState {
  shopMenu: MenuCategory[];
  restaurantMenu: MenuCategory[];
  activeShopCategory: string;
  activeRestaurantCategory: string;
}
