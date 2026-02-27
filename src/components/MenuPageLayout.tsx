import { motion } from "framer-motion";
import MenuHeader from "../components/MenuHeader";
import MenuTabs from "../components/MenuTabs";
import MenuItems from "../components/MenuItems";
import type { MenuCategory } from "../types";

interface MenuPageLayoutProps {
  categories: MenuCategory[];
  activeCategory: string;
  items: any[];
  onCategoryChange: (id: string) => void;
  variant?: 'shop' | 'restaurant';
}

const MenuPageLayout = ({
  categories,
  activeCategory,
  items,
  onCategoryChange,
  variant = 'shop',
}: MenuPageLayoutProps) => {
  return (
    <div className="h-full flex flex-col bg-linear-to-b from-gray-50 to-white overflow-hidden">
      <MenuHeader />

      <MenuTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
        variant={variant}
      />

      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex-1 overflow-y-auto"
      >
        <section className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-20">
          <MenuItems items={items} categoryId={activeCategory} variant={variant} />
        </section>
      </motion.main>
    </div>
  );
};

export default MenuPageLayout;
