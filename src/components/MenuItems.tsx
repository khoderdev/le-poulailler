import { motion, AnimatePresence, useMotionValue, animate as motionAnimate } from "framer-motion";
import { useState, useEffect, useCallback, memo, useRef } from "react";
import type { MenuItem } from "../types";
import { AedSymbol } from "../assets/AEDSymbol";
import { getOptimizedImageUrl, preloadImage } from "../lib/imageUpload";

interface DragInfo {
  point: { x: number; y: number };
  delta: { x: number; y: number };
  offset: { x: number; y: number };
  velocity: { x: number; y: number };
}

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

const ZOOM_LEVEL = 2.5;
const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };
const DISMISS_THRESHOLD = 120;

const MenuItemCard = memo(({ item, itemVariants, hoverBorder, priceColor }: MenuItemCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  const imgX = useMotionValue(0);
  const imgY = useMotionValue(0);
  const bgOpacity = useMotionValue(1);
  const wasDragged = useRef(false);

  const optimizedImageUrl = item.imageUrl ? getOptimizedImageUrl(item.imageUrl, 200) : null;
  const fullImageUrl = item.imageUrl || null;

  // Keyboard + scroll lock
  useEffect(() => {
    if (!showLightbox) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isZoomed) setIsZoomed(false);
        else closeLightbox();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [showLightbox, isZoomed]);

  // Reset pan position when zooming out
  useEffect(() => {
    if (!isZoomed) {
      motionAnimate(imgX, 0, SPRING);
      motionAnimate(imgY, 0, SPRING);
      bgOpacity.set(1);
    }
  }, [isZoomed, imgX, imgY, bgOpacity]);

  // Full reset when lightbox closes
  useEffect(() => {
    if (!showLightbox) {
      setIsZoomed(false);
      setOrigin("50% 50%");
      imgX.set(0);
      imgY.set(0);
      bgOpacity.set(1);
    }
  }, [showLightbox, imgX, imgY, bgOpacity]);

  const handleThumbnailHover = useCallback(() => {
    if (fullImageUrl) preloadImage(fullImageUrl);
  }, [fullImageUrl]);

  const closeLightbox = useCallback(() => {
    setIsZoomed(false);
    setShowLightbox(false);
  }, []);

  // Toggle zoom on click — zoom from the exact tap point
  const handleImageClick = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      e.stopPropagation();
      if (wasDragged.current) return;

      if (!isZoomed) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setOrigin(`${x}% ${y}%`);
        setIsZoomed(true);
      } else {
        setIsZoomed(false);
      }
    },
    [isZoomed]
  );

  // Backdrop click: zoom out first, then close
  const handleBackdropClick = useCallback(() => {
    if (isZoomed) setIsZoomed(false);
    else closeLightbox();
  }, [isZoomed, closeLightbox]);

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

      {/* Threads-style Lightbox */}
      <AnimatePresence>
        {showLightbox && fullImageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-label={`${item.name} image preview`}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            {/* Backdrop — opacity tracks swipe-to-dismiss drag */}
            <motion.div className="absolute inset-0 bg-black/95" style={{ opacity: bgOpacity }} />

            {/* Close button — fades out when zoomed */}
            <motion.button
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                closeLightbox();
              }}
              animate={{ opacity: isZoomed ? 0 : 1 }}
              transition={{ duration: 0.15 }}
              aria-label="Close preview"
              className="absolute top-4 right-4 z-10 text-white/80 hover:text-white text-xl w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
              style={{ pointerEvents: isZoomed ? "none" : "auto" }}
            >
              ✕
            </motion.button>

            {/* Zoomable, pannable, swipe-to-dismiss image */}
            <motion.img
              src={fullImageUrl}
              alt={item.name}
              className={`relative z-1 max-w-[92vw] max-h-[82vh] object-contain select-none touch-none rounded-2xl ${isZoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
              style={{ x: imgX, y: imgY, transformOrigin: origin }}
              animate={{
                scale: isZoomed ? ZOOM_LEVEL : 1,
                borderRadius: isZoomed ? "0px" : "16px"
              }}
              transition={SPRING}
              drag={isZoomed ? true : "y"}
              dragElastic={isZoomed ? 0.15 : 0.7}
              dragMomentum={isZoomed}
              dragConstraints={
                isZoomed
                  ? { top: -400, bottom: 400, left: -400, right: 400 }
                  : { top: 0, bottom: 0 }
              }
              onDragStart={() => {
                wasDragged.current = true;
              }}
              onDrag={(_e: Event, info: DragInfo) => {
                // Swipe-to-dismiss: fade backdrop as user drags down (only when not zoomed)
                if (!isZoomed) {
                  const progress = Math.min(Math.abs(info.offset.y) / 300, 1);
                  bgOpacity.set(1 - progress * 0.6);
                }
              }}
              onDragEnd={(_e: Event, info: DragInfo) => {
                if (!isZoomed) {
                  // Dismiss if swiped far or fast enough
                  if (Math.abs(info.offset.y) > DISMISS_THRESHOLD || Math.abs(info.velocity.y) > 600) {
                    closeLightbox();
                  } else {
                    motionAnimate(bgOpacity, 1, { duration: 0.2 });
                  }
                }
                setTimeout(() => {
                  wasDragged.current = false;
                }, 100);
              }}
              onClick={handleImageClick}
            />

            {/* Info overlay — slides away when zoomed */}
            <motion.div
              animate={{ opacity: isZoomed ? 0 : 1, y: isZoomed ? 30 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 z-2 bg-linear-to-t from-black/70 via-black/30 to-transparent p-6 pb-8 pointer-events-none"
            >
              <div className="max-w-4xl mx-auto">
                <h3 className="text-white font-bold text-lg">{item.name}</h3>
                {item.description && <p className="text-gray-300 text-sm mt-1">{item.description}</p>}
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
