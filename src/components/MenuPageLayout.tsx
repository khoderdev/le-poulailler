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
}

const MenuPageLayout = ({
  categories,
  activeCategory,
  items,
  onCategoryChange,
}: MenuPageLayoutProps) => {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <MenuHeader />

      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="max-w-7xl mx-auto"
      >
        <MenuTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
        />

        <section className="px-4 md:px-8 pt-8 pb-20">
          <MenuItems items={items} categoryId={activeCategory} />
        </section>
      </motion.main>
    </div>
  );
};

export default MenuPageLayout;
