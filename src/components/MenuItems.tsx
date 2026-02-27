import { motion, AnimatePresence } from "framer-motion";
import type { MenuItem } from "../types";

const AedSymbol = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor">
    {/* D letter with serifs */}
    <path d="M8 4 H28 V10 H22 V90 H28 V96 H8 V90 H16 V10 H8 V4 Z" />
    <path d="M22 4 H50 C78 4 94 26 94 50 C94 74 78 96 50 96 H22 V90 H50 C72 90 84 72 84 50 C84 28 72 10 50 10 H22 V4 Z" />
    {/* Upper horizontal line */}
    <rect x="0" y="32" width="50" height="7" />
    {/* Lower horizontal line */}
    <rect x="0" y="58" width="50" height="7" />
  </svg>
);

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
        className="max-w-4xl mx-auto px-6 md:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={`group py-3 border-b border-gray-100 ${hoverBorder} transition-colors`}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-gray-700 text-sm md:text-base font-bold group-hover:text-gray-900 transition-colors pr-4">
                  {item.name}
                </h3>
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
