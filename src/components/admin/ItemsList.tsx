import { FiEdit2, FiTrash2 } from "react-icons/fi";
import type { MenuItem, MenuCategory } from "../../types";
import Button from "../Button";

interface ItemsListProps {
  category: MenuCategory | undefined;
  activeTab: string;
  onAddItem: () => void;
  onEditItem: (item: MenuItem) => void;
  onDeleteItem: (itemId: string, itemName: string) => void;
}

export default function ItemsList({
  category,
  activeTab,
  onAddItem,
  onEditItem,
  onDeleteItem,
}: ItemsListProps) {
  return (
    <div className="lg:col-span-3 min-h-0 flex flex-col">
      <div className="bg-white rounded-xl shadow-sm flex-1 flex flex-col min-h-0 max-h-[55vh] sm:max-h-[65vh] lg:max-h-none overflow-hidden -mt-8 sm:mt-0">
        <div className="px-4 border-b flex items-center justify-between">
          <h2 className="font-bold text-gray-900">
            {category?.name || "Select a category"}
          </h2>
          {category && (
            <Button
              variant="primary"
              size="sm"
              onClick={onAddItem}
              className="my-2"
            >
              + Add
            </Button>
          )}
        </div>

        <div className="divide-y flex-1 overflow-y-auto">
          {category?.items.map(item => (
            <div key={item.id} className="p-4">
              <div className="flex items-start gap-4">
                {item.imageUrl && (
                  <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    {item.comingSoon && (
                      <span className="px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-700 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-gray-500 text-sm mt-1">
                      {item.description}
                    </p>
                  )}
                  <p
                    className={`font-semibold mt-1 ${
                      activeTab === "shop"
                        ? "text-[#286091]"
                        : "text-[#9c2622]"
                    }`}
                  >
                    {item.price} AED
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    variant="ghost"
                    size="xs"
                    icon={<FiEdit2 />}
                    onClick={() => onEditItem(item)}
                    aria-label="Edit"
                  />
                  <Button
                    variant="danger"
                    size="xs"
                    icon={<FiTrash2 />}
                    onClick={() => onDeleteItem(item.id, item.name)}
                    aria-label="Delete"
                  />
                </div>
              </div>
            </div>
          ))}

          {category?.items.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No items in this category yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
