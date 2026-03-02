import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import type { MenuCategory } from "../types";

interface MenuTabsProps {
  categories: MenuCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  variant?: "shop" | "restaurant";
}

const MenuTabs = ({
  categories,
  activeCategory,
  onCategoryChange,
  variant = "shop",
}: MenuTabsProps) => {
  const accentColor = variant === "shop" ? "bg-[#286091]" : "bg-[#9c2622]";
  const shadowColor =
    variant === "shop" ? "shadow-[#286091]/25" : "shadow-[#9c2622]/25";
  const focusRing =
    variant === "shop"
      ? "focus-visible:ring-[#286091]"
      : "focus-visible:ring-[#9c2622]";
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const animationFrame = useRef<number | null>(null);

  /* -------------------------------------------------
     Auto scroll active tab into center
  ------------------------------------------------- */
  const scrollToActive = useCallback(() => {
    const container = containerRef.current;
    const activeTab = tabRefs.current[activeCategory];

    if (!container || !activeTab) return;

    const containerRect = container.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();

    const offset =
      tabRect.left -
      containerRect.left -
      containerRect.width / 2 +
      tabRect.width / 2;

    container.scrollBy({
      left: offset,
      behavior: "smooth",
    });
  }, [activeCategory]);

  useEffect(() => {
    scrollToActive();
  }, [scrollToActive]);

  /* -------------------------------------------------
     Momentum scrolling animation
  ------------------------------------------------- */
  const applyMomentum = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const friction = 0.95;
    const minVelocity = 0.5;

    const animate = () => {
      velocity.current *= friction;

      if (Math.abs(velocity.current) < minVelocity) {
        if (animationFrame.current) {
          cancelAnimationFrame(animationFrame.current);
          animationFrame.current = null;
        }
        return;
      }

      container.scrollLeft -= velocity.current;
      animationFrame.current = requestAnimationFrame(animate);
    };

    animate();
  }, []);

  /* -------------------------------------------------
     Mouse Drag Scrolling
  ------------------------------------------------- */
  const onMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }

    setIsDragging(true);
    setHasDragged(false);
    startX.current = e.pageX;
    lastX.current = e.pageX;
    scrollLeft.current = container.scrollLeft;
    velocity.current = 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const container = containerRef.current;
    if (!container) return;

    e.preventDefault();
    const x = e.pageX;
    const walk = x - startX.current;

    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }

    velocity.current = x - lastX.current;
    lastX.current = x;

    container.scrollLeft = scrollLeft.current - walk;
  };

  const stopDragging = () => {
    if (isDragging && Math.abs(velocity.current) > 1) {
      applyMomentum();
    }
    setIsDragging(false);
  };

  /* -------------------------------------------------
     Horizontal wheel scrolling
  ------------------------------------------------- */
  const onWheel = (e: React.WheelEvent) => {
    const container = containerRef.current;
    if (!container) return;

    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      return;
    }

    e.preventDefault();
    container.scrollLeft += e.deltaY;
  };

  /* -------------------------------------------------
     Handle tab click (prevent if dragged)
  ------------------------------------------------- */
  const handleTabClick = (categoryId: string) => {
    if (hasDragged) return;
    onCategoryChange(categoryId);
  };

  /* -------------------------------------------------
     Cleanup animation frame on unmount
  ------------------------------------------------- */
  useEffect(() => {
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <nav className="shrink-0 justify-center flex z-30 w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
      {/* Fade Edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-white via-white/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-white via-white/80 to-transparent z-10" />

      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseLeave={stopDragging}
        onMouseUp={stopDragging}
        onWheel={onWheel}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className={`
          relative flex gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-4
          overflow-x-auto
          [&::-webkit-scrollbar]:hidden
          select-none
          ${isDragging ? "cursor-grabbing" : "cursor-grab"}
        `}
      >
        {categories.map((category) => {
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              ref={(el) => {
                tabRefs.current[category.id] = el;
              }}
              onClick={() => handleTabClick(category.id)}
              className={`
                relative shrink-0 px-5 md:px-7 py-2 md:py-2.5
                text-sm md:text-base font-medium
                rounded-full transition-all duration-200
                focus:outline-none focus-visible:ring-2 ${focusRing} focus-visible:ring-offset-2
                ${isActive ? "text-white" : "text-gray-500 hover:text-gray-800"}
              `}
            >
              {isActive && (
                <motion.span
                  layoutId="activeTab"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  }}
                  className={`absolute inset-0 ${accentColor} rounded-full shadow-lg ${shadowColor}`}
                />
              )}

              <span className="relative z-10 whitespace-nowrap">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MenuTabs;
