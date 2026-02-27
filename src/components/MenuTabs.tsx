// import { motion } from 'framer-motion';
// import type { MenuCategory } from '../types';

// interface MenuTabsProps {
//   categories: MenuCategory[];
//   activeCategory: string;
//   onCategoryChange: (categoryId: string) => void;
// }

// const MenuTabs = ({ categories, activeCategory, onCategoryChange }: MenuTabsProps) => {
//   return (
//     <nav className="w-full overflow-x-auto scrollbar-hide">
//       <div className="flex justify-center gap-2 md:gap-4 px-4 py-3 min-w-max">
//         {categories.map((category) => {
//           const isActive = activeCategory === category.id;
//           return (
//             <motion.button
//               key={category.id}
//               onClick={() => onCategoryChange(category.id)}
//               className={`relative px-5 py-2 md:px-8 md:py-2.5 text-sm md:text-base font-medium whitespace-nowrap transition-all duration-200 rounded-full border-2 ${
//                 isActive
//                   ? 'bg-cyan-500 text-white border-cyan-500 shadow-md'
//                   : 'bg-white text-gray-600 border-gray-200 hover:border-cyan-300 hover:text-cyan-600'
//               }`}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               {category.name}
//             </motion.button>
//           );
//         })}
//       </div>
//     </nav>
//   );
// };

// export default MenuTabs;
import { motion } from 'framer-motion';
import type { MenuCategory } from '../types';

interface MenuTabsProps {
  categories: MenuCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const MenuTabs = ({
  categories,
  activeCategory,
  onCategoryChange,
}: MenuTabsProps) => {
  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/70 border-b border-gray-100">
      <div className="relative flex gap-3 px-4 md:px-8 py-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`
                relative snap-start shrink-0 px-6 md:px-8 py-2.5 md:py-3
                text-sm md:text-base font-semibold rounded-full
                transition-all duration-200 focus:outline-none
                ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-600 hover:text-cyan-600'
                }
              `}
            >
              {isActive && (
                <motion.span
                  layoutId="activeTab"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="absolute inset-0 bg-cyan-500 rounded-full shadow-lg"
                />
              )}

              <span className="relative z-10">{category.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MenuTabs;