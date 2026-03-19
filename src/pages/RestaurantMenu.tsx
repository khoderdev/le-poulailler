import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setActiveRestaurantCategory, selectRestaurantMenu, selectActiveRestaurantCategory, selectRestaurantActiveItems } from "../store/menuSlice";
import MenuPageLayout from "../components/MenuPageLayout";

const RestaurantMenu = () => {
  const dispatch = useAppDispatch();
  const restaurantMenu = useAppSelector(selectRestaurantMenu);
  const activeRestaurantCategory = useAppSelector(selectActiveRestaurantCategory);
  const activeItems = useAppSelector(selectRestaurantActiveItems);

  return (
    <MenuPageLayout
      categories={restaurantMenu}
      activeCategory={activeRestaurantCategory}
      items={activeItems}
      onCategoryChange={(id) => dispatch(setActiveRestaurantCategory(id))}
      variant="restaurant"
    />
  );
};

export default RestaurantMenu;
