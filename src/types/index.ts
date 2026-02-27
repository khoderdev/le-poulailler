export interface MenuItem {
  id: string;
  name: string;
  price: number | string;
  description?: string;
  comingSoon?: boolean;
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
