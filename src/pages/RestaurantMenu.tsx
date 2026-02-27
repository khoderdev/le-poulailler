import { useMemo } from "react";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setActiveRestaurantCategory } from "../store/menuSlice";
import MenuHeader from "../components/MenuHeader";
import MenuTabs from "../components/MenuTabs";
import MenuItems from "../components/MenuItems";
import type { MenuCategory } from "../types";

const RestaurantMenu = () => {
  const dispatch = useAppDispatch();
  const { restaurantMenu, activeRestaurantCategory } = useAppSelector(
    (state) => state.menu,
  );

  const activeItems = useMemo(() => {
    const category = restaurantMenu.find(
      (cat: MenuCategory) => cat.id === activeRestaurantCategory,
    );
    return category?.items ?? [];
  }, [restaurantMenu, activeRestaurantCategory]);

  const handleCategoryChange = (categoryId: string) => {
    dispatch(setActiveRestaurantCategory(categoryId));
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <MenuHeader />

      <MenuTabs
        categories={restaurantMenu}
        activeCategory={activeRestaurantCategory}
        onCategoryChange={handleCategoryChange}
      />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1 overflow-y-auto"
      >
        <div className="pt-6 pb-16">
          <MenuItems
            items={activeItems}
            categoryId={activeRestaurantCategory}
          />
        </div>
      </motion.main>
    </div>
  );
};

export default RestaurantMenu;
