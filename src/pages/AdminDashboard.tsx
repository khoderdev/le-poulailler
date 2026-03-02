import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { checkSession, logout } from "../store/adminSlice";
import { fetchMenuData, updateMenuItem, addMenuItem, deleteMenuItem } from "../store/menuSlice";
import type { MenuItem } from "../types";

interface EditingItem extends MenuItem {
  category_id: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.admin);
  const { shopMenu, restaurantMenu, isLoading } = useAppSelector(state => state.menu);

  const [activeTab, setActiveTab] = useState<"shop" | "restaurant">("shop");
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  // New item form state
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    description: "",
    coming_soon: false
  });

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(fetchMenuData());
  }, [dispatch]);

  const currentMenu = useMemo(() => (activeTab === "shop" ? shopMenu : restaurantMenu), [activeTab, shopMenu, restaurantMenu]);

  useEffect(() => {
    if (currentMenu.length > 0 && !selectedCategory) {
      setSelectedCategory(currentMenu[0].id);
    }
  }, [currentMenu, selectedCategory]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate("/admin");
  }, [dispatch, navigate]);

  const handleEditItem = useCallback((item: MenuItem, categoryId: string) => {
    setEditingItem({ ...item, category_id: categoryId });
    setIsAddingNew(false);
  }, []);

  const handleSaveEdit = useCallback(async () => {
    if (!editingItem) return;

    setSaveStatus("saving");
    try {
      await dispatch(
        updateMenuItem({
          itemId: editingItem.id,
          updates: {
            name: editingItem.name,
            price: editingItem.price,
            description: editingItem.description || null,
            coming_soon: editingItem.comingSoon || false
          }
        })
      ).unwrap();
      setSaveStatus("saved");
      setTimeout(() => {
        setEditingItem(null);
        setSaveStatus("idle");
      }, 1000);
    } catch {
      setSaveStatus("error");
    }
  }, [dispatch, editingItem]);

  const handleAddItem = useCallback(async () => {
    if (!selectedCategory || !newItem.name) return;

    setSaveStatus("saving");
    try {
      await dispatch(
        addMenuItem({
          category_id: selectedCategory,
          name: newItem.name,
          price: newItem.price ? parseFloat(newItem.price) || newItem.price : 0,
          description: newItem.description || undefined,
          coming_soon: newItem.coming_soon
        })
      ).unwrap();
      setSaveStatus("saved");
      setNewItem({ name: "", price: "", description: "", coming_soon: false });
      setTimeout(() => {
        setIsAddingNew(false);
        setSaveStatus("idle");
      }, 1000);
    } catch {
      setSaveStatus("error");
    }
  }, [dispatch, selectedCategory, newItem]);

  const handleDeleteItem = useCallback(
    async (itemId: string) => {
      if (!confirm("Are you sure you want to delete this item?")) return;

      try {
        await dispatch(deleteMenuItem(itemId)).unwrap();
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
    },
    [dispatch]
  );

  const currentCategory = useMemo(() => currentMenu.find(cat => cat.id === selectedCategory), [currentMenu, selectedCategory]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between relative">
          <Link to="/">
            <motion.button whileHover={{ scale: 1.05, x: -2 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-500 hover:text-cyan-600 hover:bg-cyan-50 transition-all duration-200 group">
              <FiArrowLeft className="text-lg md:text-xl transition-transform group-hover:-translate-x-0.5" />
              <span className="text-sm font-medium hidden sm:inline">Back</span>
            </motion.button>
          </Link>
          <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold text-gray-800">Menu Management</h1>
          <button onClick={handleLogout} className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-4 sm:py-6 overflow-hidden flex flex-col min-h-0">
        {/* Menu Type Tabs */}
        <div className="flex gap-2 mb-4 sm:mb-6 shrink-0">
          <button
            onClick={() => {
              setActiveTab("shop");
              setSelectedCategory("");
            }}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${activeTab === "shop" ? "bg-[#286091] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
          >
            Shop Menu
          </button>
          <button
            onClick={() => {
              setActiveTab("restaurant");
              setSelectedCategory("");
            }}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${activeTab === "restaurant" ? "bg-[#9c2622] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
          >
            Restaurant Menu
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 flex-1 min-h-0 lg:grid-rows-[1fr]">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1 min-h-0 flex flex-col">
              <div className="bg-white rounded-xl shadow-sm p-4 flex-1 min-h-0 max-h-[40vh] lg:max-h-none overflow-y-auto">
                <h2 className="font-semibold text-gray-800 mb-4">Categories</h2>
                <div className="space-y-2">
                  {currentMenu.map(category => (
                    <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${selectedCategory === category.id ? (activeTab === "shop" ? "bg-[#286091] text-white" : "bg-[#9c2622] text-white") : "hover:bg-gray-100 text-gray-700"}`}>
                      <span className="font-medium">{category.name}</span>
                      <span className="text-sm opacity-75 ml-2">({category.items.length})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="lg:col-span-3 min-h-0 flex flex-col">
              <div className="bg-white rounded-xl shadow-sm flex-1 flex flex-col min-h-0 max-h-[50vh] sm:max-h-[60vh] lg:max-h-none overflow-hidden">
                <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="font-semibold text-gray-800">{currentCategory?.name || "Select a category"}</h2>
                  {currentCategory && (
                    <button
                      onClick={() => {
                        setIsAddingNew(true);
                        setEditingItem(null);
                      }}
                      className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${activeTab === "shop" ? "bg-[#286091] hover:bg-[#1e4a6f]" : "bg-[#9c2622] hover:bg-[#7a1e1b]"}`}
                    >
                      + Add Item
                    </button>
                  )}
                </div>

                <div className="divide-y flex-1 overflow-y-auto">
                  {/* Add New Item Form */}
                  <AnimatePresence>
                    {isAddingNew && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="p-4 bg-green-50">
                        <h3 className="font-medium text-gray-800 mb-4">Add New Item</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input type="text" placeholder="Item name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                          <input type="text" placeholder="Price (e.g., 25 or 45/55)" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: e.target.value })} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                          <textarea
                            placeholder="Description (optional)"
                            value={newItem.description}
                            onChange={e =>
                              setNewItem({
                                ...newItem,
                                description: e.target.value
                              })
                            }
                            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none md:col-span-2"
                            rows={2}
                          />
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={newItem.coming_soon}
                              onChange={e =>
                                setNewItem({
                                  ...newItem,
                                  coming_soon: e.target.checked
                                })
                              }
                              className="w-4 h-4"
                            />
                            <span className="text-gray-700">Coming Soon</span>
                          </label>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button onClick={handleAddItem} disabled={saveStatus === "saving"} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">
                            {saveStatus === "saving" ? "Saving..." : "Save"}
                          </button>
                          <button onClick={() => setIsAddingNew(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Items */}
                  {currentCategory?.items.map(item => (
                    <div key={item.id} className="p-4">
                      {editingItem?.id === item.id ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                              <input
                                type="text"
                                value={editingItem.name}
                                onChange={e =>
                                  setEditingItem({
                                    ...editingItem,
                                    name: e.target.value
                                  })
                                }
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-600 mb-1">Price</label>
                              <input
                                type="text"
                                value={editingItem.price}
                                onChange={e =>
                                  setEditingItem({
                                    ...editingItem,
                                    price: e.target.value
                                  })
                                }
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                              <textarea
                                value={editingItem.description || ""}
                                onChange={e =>
                                  setEditingItem({
                                    ...editingItem,
                                    description: e.target.value
                                  })
                                }
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                rows={2}
                              />
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={editingItem.comingSoon || false}
                                onChange={e =>
                                  setEditingItem({
                                    ...editingItem,
                                    comingSoon: e.target.checked
                                  })
                                }
                                className="w-4 h-4"
                              />
                              <span className="text-gray-700">Coming Soon</span>
                            </label>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={handleSaveEdit} disabled={saveStatus === "saving"} className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${saveStatus === "saved" ? "bg-green-600" : saveStatus === "error" ? "bg-red-600" : "bg-blue-600 hover:bg-blue-700"} disabled:opacity-50`}>
                              {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved!" : saveStatus === "error" ? "Error" : "Save Changes"}
                            </button>
                            <button
                              onClick={() => {
                                setEditingItem(null);
                                setSaveStatus("idle");
                              }}
                              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-gray-800">{item.name}</h3>
                              {item.comingSoon && <span className="px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-700 rounded-full">Coming Soon</span>}
                            </div>
                            {item.description && <p className="text-gray-500 text-sm mt-1">{item.description}</p>}
                            <p className={`font-semibold mt-1 ${activeTab === "shop" ? "text-[#286091]" : "text-[#9c2622]"}`}>{item.price} AED</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => handleEditItem(item, selectedCategory)} className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                              Edit
                            </button>
                            <button onClick={() => handleDeleteItem(item.id)} className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {currentCategory?.items.length === 0 && <div className="p-8 text-center text-gray-500">No items in this category yet.</div>}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
