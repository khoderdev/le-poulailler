import { motion, AnimatePresence } from "framer-motion";
import type { MenuItem } from "../types";
import { AedSymbol } from "../assets/AEDSymbol";

interface MenuItemsProps {
  items: MenuItem[];
  categoryId: string;
  variant?: "shop" | "restaurant";
}

const MenuItems = ({ items, categoryId, variant = "shop" }: MenuItemsProps) => {
  const priceColor = variant === "shop" ? "text-[#286091]" : "text-[#9c2622]";
  const hoverBorder =
    variant === "shop"
      ? "hover:border-[#286091]/30"
      : "hover:border-[#9c2622]/30";
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={categoryId}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="max-w-4xl mx-auto px-6 md:px-8 touch-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={`group py-3 border-b border-gray-100 ${hoverBorder} transition-colors`}
            >
              <div className="flex items-baseline justify-between">
                <div className="flex items-center gap-2 pr-4">
                  <h3 className="text-gray-700 text-sm md:text-base font-bold group-hover:text-gray-900 transition-colors">
                    {item.name}
                  </h3>
                  {item.comingSoon && (
                    <span className="px-2 py-0.5 text-[10px] md:text-xs font-semibold bg-amber-100 text-amber-700 rounded-full whitespace-nowrap">
                      Coming Soon
                    </span>
                  )}
                </div>
                <div
                  className={`flex items-center gap-1 ${priceColor} font-semibold text-sm md:text-base whitespace-nowrap`}
                >
                  {item.price}
                  <AedSymbol className="h-3 w-auto" />
                </div>
              </div>
              {item.description && (
                <p className="text-gray-500 text-xs md:text-sm mt-1 leading-relaxed">
                  {item.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MenuItems;
