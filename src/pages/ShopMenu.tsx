// import { useMemo } from 'react';
// import { motion } from 'framer-motion';
// import { useAppSelector, useAppDispatch } from '../store/hooks';
// import { setActiveShopCategory } from '../store/menuSlice';
// import MenuHeader from '../components/MenuHeader';
// import MenuTabs from '../components/MenuTabs';
// import MenuItems from '../components/MenuItems';
// import type { MenuCategory } from '../types';

// const ShopMenu = () => {
//   const dispatch = useAppDispatch();
//   const { shopMenu, activeShopCategory } = useAppSelector((state) => state.menu);

//   const activeItems = useMemo(() => {
//     const category = shopMenu.find((cat: MenuCategory) => cat.id === activeShopCategory);
//     return category?.items ?? [];
//   }, [shopMenu, activeShopCategory]);

//   const handleCategoryChange = (categoryId: string) => {
//     dispatch(setActiveShopCategory(categoryId));
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <MenuHeader />

//       <motion.main
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.3 }}
//         className="py-6 md:py-8"
//       >
//         <MenuTabs
//           categories={shopMenu}
//           activeCategory={activeShopCategory}
//           onCategoryChange={handleCategoryChange}
//         />

//         <div className="pt-6 pb-16">
//           <MenuItems items={activeItems} categoryId={activeShopCategory} />
//         </div>
//       </motion.main>
//     </div>
//   );
// };

// export default ShopMenu;
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
