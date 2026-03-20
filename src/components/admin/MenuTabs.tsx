import { FiPlus, FiTrash2 } from "react-icons/fi";
import type { Menu } from "../../types";
import Button from "../Button";

interface MenuTabsProps {
  activeTab: string;
  menus: Menu[];
  onTabChange: (tab: string) => void;
  onDeleteMenu: (menuId: string, menuName: string) => void;
  onAddMenu: () => void;
}

export default function MenuTabs({ activeTab, menus, onTabChange, onDeleteMenu, onAddMenu }: MenuTabsProps) {
  const customMenus = menus?.filter(m => m.id !== "shop" && m.id !== "restaurant") ?? [];

  return (
    <div className="flex gap-2 mb-2 sm:mb-4 shrink-0 flex-wrap items-center">
      {/* Shop Menu - Default */}
      <button onClick={() => onTabChange("shop")} className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-colors ${activeTab === "shop" ? "bg-primary text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
        Shop Menu
      </button>

      {/* Restaurant Menu - Default */}
      <button onClick={() => onTabChange("restaurant")} className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-colors ${activeTab === "restaurant" ? "bg-[#9c2622] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
        Restaurant Menu
      </button>

      {/* Dynamic Custom Menus */}
      {customMenus.map(menu => (
        <div key={menu.id} className="relative group">
          <button
            onClick={() => onTabChange(menu.id)}
            style={{
              backgroundColor: activeTab === menu.id ? menu.color : undefined
            }}
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-colors ${activeTab === menu.id ? "text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
          >
            {menu.name}
          </button>
          {/* Delete button - only shows on hover */}
          <button
            onClick={e => {
              e.stopPropagation();
              onDeleteMenu(menu.id, menu.name);
            }}
            className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg"
            title="Delete Menu"
          >
            <FiTrash2 className="w-3 h-3" />
          </button>
        </div>
      ))}

      {/* Add New Menu Button */}
      <Button variant="ghost" icon={<FiPlus />} size="sm" onClick={onAddMenu} className="border-2 border-dashed border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50" title="Add New Menu"></Button>
    </div>
  );
}
