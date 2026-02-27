import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import Logo from "./Logo";

const MenuHeader = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl py-4 md:py-5 px-4 border-b border-gray-100/80"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-500 hover:text-cyan-600 hover:bg-cyan-50 transition-all duration-200 group"
          >
            <FiArrowLeft className="text-lg md:text-xl transition-transform group-hover:-translate-x-0.5" />
            <span className="text-sm font-medium hidden sm:inline">Back</span>
          </motion.button>
        </Link>

        <div className="absolute left-1/2 -translate-x-1/2">
          <Logo size="sm" animate={false} />
        </div>

        <div className="w-20" />
      </div>
    </motion.header>
  );
};

export default MenuHeader;
