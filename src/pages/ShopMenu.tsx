import { useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setActiveShopCategory } from "../store/menuSlice";
import MenuPageLayout from "../components/MenuPageLayout";
import type { MenuCategory } from "../types";

const ShopMenu = () => {
  const dispatch = useAppDispatch();
  const { shopMenu, activeShopCategory } = useAppSelector(
    (state) => state.menu,
  );

  const activeItems = useMemo(() => {
    return (
      shopMenu.find((cat: MenuCategory) => cat.id === activeShopCategory)
        ?.items ?? []
    );
  }, [shopMenu, activeShopCategory]);

  return (
    <MenuPageLayout
      categories={shopMenu}
      activeCategory={activeShopCategory}
      items={activeItems}
      onCategoryChange={(id) => dispatch(setActiveShopCategory(id))}
    />
  );
};

export default ShopMenu;
