import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, memo } from "react";
import type { MenuItem } from "../types";
import { AedSymbol } from "../assets/AEDSymbol";
import { getOptimizedImageUrl, preloadImage } from "../lib/imageUpload";

interface MenuItemsProps {
  items: MenuItem[];
  categoryId: string;
  variant?: "shop" | "restaurant";
}

interface MenuItemCardProps {
  item: MenuItem;
  itemVariants: Record<string, unknown>;
  hoverBorder: string;
  priceColor: string;
}

const MenuItemCard = memo(({ item, itemVariants, hoverBorder, priceColor }: MenuItemCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);

  const optimizedImageUrl = item.imageUrl ? getOptimizedImageUrl(item.imageUrl, 200) : null;
  const fullImageUrl = item.imageUrl || null;

  // Keyboard support: Escape to close lightbox
  useEffect(() => {
    if (!showLightbox) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowLightbox(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [showLightbox]);

  // Preload full-size image on hover so lightbox opens instantly
  const handleThumbnailHover = useCallback(() => {
    if (fullImageUrl) preloadImage(fullImageUrl);
  }, [fullImageUrl]);

  return (
    <>
      <motion.div variants={itemVariants} className={`group py-3 border-b border-gray-100 ${hoverBorder} transition-colors`}>
        <div className="flex items-start justify-between gap-3">
          {/* Left side: Text content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-gray-700 text-sm md:text-base font-bold group-hover:text-gray-900 transition-colors">{item.name}</h3>
              {item.comingSoon && <span className="px-2 py-0.5 text-[10px] md:text-xs font-semibold bg-amber-100 text-amber-700 rounded-full whitespace-nowrap">Coming Soon</span>}
            </div>
            {item.description && (
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-2">
                {item.description}
              </p>
            )}
            <div className={`flex items-center gap-1 ${priceColor} font-semibold text-sm md:text-base`}>
              {item.price}
              <AedSymbol className="h-3 w-auto" />
            </div>
          </div>

          {/* Right side: Image thumbnail */}
          {optimizedImageUrl && !imageError && (
            <div 
              onClick={() => setShowLightbox(true)}
              onMouseEnter={handleThumbnailHover}
              onTouchStart={handleThumbnailHover}
              className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-gray-100 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-gray-300 transition-all shadow-sm"
            >
              {!imageLoaded && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                </div>
              )}
              <img 
                src={optimizedImageUrl} 
                alt={item.name} 
                loading="lazy" 
                decoding="async" 
                onLoad={() => setImageLoaded(true)} 
                onError={() => setImageError(true)} 
                className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`} 
              />
            </div>
          )}
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {showLightbox && fullImageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowLightbox(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${item.name} image preview`}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowLightbox(false)}
                aria-label="Close preview"
                className="absolute -top-12 right-0 text-white/80 hover:text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
              >
                ✕
              </button>
              <img
                src={fullImageUrl}
                alt={item.name}
                className="w-full h-full object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                <h3 className="text-white font-bold text-lg">{item.name}</h3>
                {item.description && <p className="text-gray-200 text-sm mt-1">{item.description}</p>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

const MenuItems = ({ items, categoryId, variant = "shop" }: MenuItemsProps) => {
  const priceColor = variant === "shop" ? "text-[#286091]" : "text-[#9c2622]";
  const hoverBorder = variant === "shop" ? "hover:border-[#286091]/30" : "hover:border-[#9c2622]/30";
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02
      }
    },
    exit: { opacity: 0, transition: { duration: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div key={categoryId} variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="max-w-4xl mx-auto px-6 md:px-8 touch-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
          {items.map(item => (
            <MenuItemCard key={item.id} item={item} itemVariants={itemVariants} hoverBorder={hoverBorder} priceColor={priceColor} />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MenuItems;
