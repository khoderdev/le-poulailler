import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setActiveShopCategory, selectShopMenu, selectActiveShopCategory, selectShopActiveItems } from "../store/menuSlice";
import MenuPageLayout from "../components/MenuPageLayout";

const ShopMenu = () => {
  const dispatch = useAppDispatch();
  const shopMenu = useAppSelector(selectShopMenu);
  const activeShopCategory = useAppSelector(selectActiveShopCategory);
  const activeItems = useAppSelector(selectShopActiveItems);

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
