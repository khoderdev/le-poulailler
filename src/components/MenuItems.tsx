import { motion, AnimatePresence } from "framer-motion";
import type { MenuItem } from "../types";
import aedSymbol from "../assets/aed-symbol.svg";

interface MenuItemsProps {
  items: MenuItem[];
  categoryId: string;
}

const MenuItems = ({ items, categoryId }: MenuItemsProps) => {
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
              className="group flex items-baseline justify-between py-2 border-b border-gray-100 hover:border-cyan-200 transition-colors"
            >
              <h3 className="text-gray-700 text-sm md:text-base font-bold group-hover:text-gray-900 transition-colors pr-4">
                {item.name}
              </h3>
              <div className="flex items-center gap-1 text-cyan-600 font-semibold text-sm md:text-base whitespace-nowrap">
                {item.price}
                <img
                  src={aedSymbol}
                  alt="AED"
                  className="h-3 w-auto opacity-80"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MenuItems;
