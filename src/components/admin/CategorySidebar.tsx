import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MenuCategory } from "../../types";
import Button from "../Button";
import type { SaveStatus } from "./types";

interface CategorySidebarProps {
  categories: MenuCategory[];
  selectedCategory: string;
  activeTab: string;
  onSelectCategory: (id: string) => void;
  onAddCategory: (name: string) => Promise<void>;
  onEditCategory: (id: string, name: string) => Promise<void>;
  onDeleteCategory: (id: string, name: string) => void;
}

export default function CategorySidebar({
  categories,
  selectedCategory,
  activeTab,
  onSelectCategory,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
}: CategorySidebarProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [addStatus, setAddStatus] = useState<SaveStatus>("idle");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  /* ---- Add category ---- */
  const handleAdd = async () => {
    if (!newName.trim()) return;
    setAddStatus("saving");
    try {
      await onAddCategory(newName.trim());
      setAddStatus("saved");
      setNewName("");
      setTimeout(() => {
        setIsAdding(false);
        setAddStatus("idle");
      }, 600);
    } catch {
      setAddStatus("error");
    }
  };

  /* ---- Edit category ---- */
  const startEdit = (id: string, name: string) => {
    setEditingId(id);
    setEditingName(name);
  };

  const saveEdit = async () => {
    if (!editingId || !editingName.trim()) return;
    try {
      await onEditCategory(editingId, editingName.trim());
      setEditingId(null);
      setEditingName("");
    } catch {
      alert("Failed to update category. Please try again.");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  return (
    <div className="lg:col-span-1 min-h-0 flex flex-col">
      <div className="bg-white rounded-xl shadow-sm p-4 flex-1 min-h-0 max-h-[25vh] sm:max-h-[35vh] lg:max-h-none overflow-y-auto flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800">Categories</h2>
          <Button
            variant="primary"
            size="xs"
            onClick={() => setIsAdding(!isAdding)}
          >
            + Add
          </Button>
        </div>

        {/* Add Category Form */}
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 bg-green-50 rounded-lg"
            >
              <input
                type="text"
                placeholder="Category name"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAdd()}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm mb-2"
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="xs"
                  disabled={addStatus === "saving" || !newName.trim()}
                  onClick={handleAdd}
                  className="flex-1"
                >
                  {addStatus === "saving" ? "Saving..." : "Save"}
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => {
                    setIsAdding(false);
                    setNewName("");
                    setAddStatus("idle");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-2 flex-1 overflow-y-auto p-1">
          {categories.map(category => (
            <div key={category.id} className="relative group">
              {editingId === category.id ? (
                <div className="p-2 bg-blue-50 rounded-lg">
                  <input
                    type="text"
                    value={editingName}
                    onChange={e => setEditingName(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter") saveEdit();
                      if (e.key === "Escape") cancelEdit();
                    }}
                    className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 outline-none mb-2"
                    autoFocus
                  />
                  <div className="flex gap-1">
                    <Button
                      variant="primary"
                      size="xs"
                      onClick={saveEdit}
                      className="flex-1"
                    >
                      Save
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={cancelEdit}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => onSelectCategory(category.id)}
                    className={`w-full text-left px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-sm sm:text-base transition-colors ${
                      selectedCategory === category.id
                        ? activeTab === "shop"
                          ? "bg-[#286091] text-white"
                          : "bg-[#9c2622] text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm opacity-75 ml-2">
                      ({category.items.length})
                    </span>
                  </button>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        startEdit(category.id, category.name);
                      }}
                      className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded"
                      title="Edit category"
                    >
                      ✎
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onDeleteCategory(category.id, category.name);
                      }}
                      className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded"
                      title="Delete category"
                    >
                      ×
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
