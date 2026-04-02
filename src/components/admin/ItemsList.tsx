import { useRef, useCallback, useState, useEffect } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import type { MenuItem, MenuCategory } from "../../types";
import Button from "../Button";

interface ItemsListProps {
  category: MenuCategory | undefined;
  activeTab: string;
  onAddItem: () => void;
  onEditItem: (item: MenuItem) => void;
  onDeleteItem: (itemId: string, itemName: string) => void;
  onReorder: (categoryId: string, itemIds: string[]) => void;
}

/* ------------------------------------------------------------------ */
/*  Single draggable row                                               */
/* ------------------------------------------------------------------ */
function DraggableItem({
  item,
  activeTab,
  onEditItem,
  onDeleteItem
}: {
  item: MenuItem;
  activeTab: string;
  onEditItem: (item: MenuItem) => void;
  onDeleteItem: (itemId: string, itemName: string) => void;
}) {
  const controls = useDragControls();
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      layout="position"
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
      whileDrag={{ zIndex: 50 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      style={{ position: "relative" }}
      className={`p-4 rounded-xl transition-shadow duration-200 ${
        isDragging
          ? "bg-white ring-2 ring-blue-200 border border-blue-100 shadow-lg"
          : "bg-white border border-gray-100 hover:border-gray-200 shadow-none"
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Drag handle */}
        <button
          onPointerDown={e => controls.start(e)}
          className={`shrink-0 mt-1 touch-none p-1.5 -ml-1 rounded-md transition-colors duration-150 ${
            isDragging
              ? "cursor-grabbing text-blue-500 bg-blue-50"
              : "cursor-grab text-gray-300 hover:text-gray-500 hover:bg-gray-50 active:cursor-grabbing"
          }`}
          aria-label="Drag to reorder"
        >
          <HiOutlineMenuAlt4 className="text-lg" />
        </button>

        {item.imageUrl && (
          <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-800">{item.name}</h3>
            {item.comingSoon && <span className="px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-700 rounded-full">Coming Soon</span>}
          </div>
          {item.description && <p className="text-gray-500 text-sm mt-1">{item.description}</p>}
          <p className={`font-semibold mt-1 ${activeTab === "shop" ? "text-[#286091]" : "text-[#9c2622]"}`}>{item.price} $</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="ghost" size="xs" icon={<FiEdit2 />} onClick={() => onEditItem(item)} aria-label="Edit" />
          <Button variant="danger" size="xs" icon={<FiTrash2 />} onClick={() => onDeleteItem(item.id, item.name)} aria-label="Delete" />
        </div>
      </div>
    </Reorder.Item>
  );
}

/* ------------------------------------------------------------------ */
/*  Main list component                                                */
/* ------------------------------------------------------------------ */
export default function ItemsList({ category, activeTab, onAddItem, onEditItem, onDeleteItem, onReorder }: ItemsListProps) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const reorderTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setItems(category?.items ?? []);
  }, [category?.items]);

  const handleReorder = useCallback(
    (newOrder: MenuItem[]) => {
      setItems(newOrder);

      if (reorderTimeoutRef.current) {
        clearTimeout(reorderTimeoutRef.current);
      }

      reorderTimeoutRef.current = setTimeout(() => {
        if (category) {
          onReorder(category.id, newOrder.map(item => item.id));
        }
      }, 400);
    },
    [category, onReorder]
  );

  useEffect(() => {
    return () => {
      if (reorderTimeoutRef.current) {
        clearTimeout(reorderTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="lg:col-span-3 min-h-0 flex flex-col">
      <div className="bg-white rounded-xl shadow-sm flex-1 flex flex-col min-h-0 max-h-[55vh] sm:max-h-[65vh] lg:max-h-none overflow-hidden -mt-8 sm:mt-0">
        <div className="px-4 border-b flex items-center justify-between">
          <h2 className="font-bold text-gray-900">{category?.name || "Select a category"}</h2>
          {category && (
            <Button variant="primary" size="sm" onClick={onAddItem} className="my-2">
              + Add
            </Button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {category && items.length > 0 ? (
            <Reorder.Group
              axis="y"
              values={items}
              onReorder={handleReorder}
              layoutScroll
              className="flex flex-col gap-1.5 p-2"
            >
              {items.map(item => (
                <DraggableItem key={item.id} item={item} activeTab={activeTab} onEditItem={onEditItem} onDeleteItem={onDeleteItem} />
              ))}
            </Reorder.Group>
          ) : (
            category && <div className="p-8 text-center text-gray-500">No items in this category yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
