import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiPlus, FiTrash2 } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { checkSession, logout } from "../store/adminSlice";
import { fetchMenuData, fetchMenus, addMenu, deleteMenu, updateMenuItem, addMenuItem, deleteMenuItem, addMenuCategory, updateMenuCategory, deleteMenuCategory } from "../store/menuSlice";
import type { MenuItem } from "../types";
import ImageUpload from "../components/ImageUpload";
import { uploadMenuItemImage, deleteMenuItemImage } from "../lib/imageUpload";

interface EditingItem extends MenuItem {
  category_id: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.admin);
  const { shopMenu, restaurantMenu, menus, isLoading } = useAppSelector(state => state.menu);

  const [activeTab, setActiveTab] = useState<string>("shop");
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingMenu, setIsAddingMenu] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newMenuName, setNewMenuName] = useState("");
  const [newMenuColor, setNewMenuColor] = useState("#286091");
  const menuModalRef = useRef<HTMLDivElement>(null);

  // Keyboard Escape support for modals + scroll lock
  useEffect(() => {
    if (!isAddingMenu) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsAddingMenu(false);
        setNewMenuName("");
        setNewMenuColor("#286091");
        setSaveStatus("idle");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isAddingMenu]);

  // New item form state
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    description: "",
    coming_soon: false
  });
  const [newItemImage, setNewItemImage] = useState<File | null>(null);
  const [editItemImage, setEditItemImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | undefined>(undefined);

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
    dispatch(fetchMenus());
  }, [dispatch]);

  const currentMenu = useMemo(() => {
    // For legacy shop/restaurant menus
    if (activeTab === "shop") return shopMenu;
    if (activeTab === "restaurant") return restaurantMenu;
    
    // For dynamic custom menus
    const customMenu = menus.find(m => m.id === activeTab);
    return customMenu?.categories || [];
  }, [activeTab, shopMenu, restaurantMenu, menus]);

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
    setOriginalImageUrl(item.imageUrl);
    setIsAddingNew(false);
  }, []);

  const handleSaveEdit = useCallback(async () => {
    if (!editingItem) return;

    setSaveStatus("saving");
    try {
      let imageUrl = editingItem.imageUrl;

      // Upload new image if selected
      if (editItemImage) {
        const uploadResult = await uploadMenuItemImage(editItemImage, editingItem.id);
        imageUrl = uploadResult.url;

        // Delete old image if it exists
        if (originalImageUrl) {
          try {
            await deleteMenuItemImage(originalImageUrl);
          } catch (error) {
            console.warn("Failed to delete old image:", error);
          }
        }
      } else if (!editingItem.imageUrl && originalImageUrl) {
        // Image was removed - delete from storage
        try {
          await deleteMenuItemImage(originalImageUrl);
        } catch (error) {
          console.warn("Failed to delete removed image:", error);
        }
      }

      await dispatch(
        updateMenuItem({
          itemId: editingItem.id,
          updates: {
            name: editingItem.name,
            price: editingItem.price,
            description: editingItem.description || null,
            image_url: imageUrl || null,
            coming_soon: editingItem.comingSoon || false
          }
        })
      ).unwrap();
      setSaveStatus("saved");
      setEditItemImage(null);
      // Refresh menus if editing item in a custom menu
      if (activeTab !== "shop" && activeTab !== "restaurant") {
        dispatch(fetchMenus());
      }
      setTimeout(() => {
        setEditingItem(null);
        setSaveStatus("idle");
      }, 1000);
    } catch (error) {
      console.error("Failed to save item:", error);
      setSaveStatus("error");
    }
  }, [dispatch, editingItem, editItemImage, originalImageUrl]);

  const handleAddItem = useCallback(async () => {
    if (!selectedCategory || !newItem.name) return;

    setSaveStatus("saving");
    try {
      const tempId = `item-${Date.now()}`;
      let imageUrl: string | undefined;

      // Upload image if selected
      if (newItemImage) {
        const uploadResult = await uploadMenuItemImage(newItemImage, tempId);
        imageUrl = uploadResult.url;
      }

      await dispatch(
        addMenuItem({
          category_id: selectedCategory,
          name: newItem.name,
          price: newItem.price ? parseFloat(newItem.price) || newItem.price : 0,
          description: newItem.description || undefined,
          image_url: imageUrl,
          coming_soon: newItem.coming_soon
        })
      ).unwrap();
      setSaveStatus("saved");
      setNewItem({ name: "", price: "", description: "", coming_soon: false });
      setNewItemImage(null);
      // Refresh menus if adding item to a custom menu
      if (activeTab !== "shop" && activeTab !== "restaurant") {
        dispatch(fetchMenus());
      }
      setTimeout(() => {
        setIsAddingNew(false);
        setSaveStatus("idle");
      }, 1000);
    } catch (error) {
      console.error("Failed to add item:", error);
      setSaveStatus("error");
    }
  }, [dispatch, selectedCategory, newItem, newItemImage]);

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

  const handleAddCategory = useCallback(async () => {
    if (!newCategoryName.trim()) return;

    setSaveStatus("saving");
    try {
      const result = await dispatch(
        addMenuCategory({
          menu_type: activeTab === "shop" || activeTab === "restaurant" ? activeTab : undefined,
          menu_id: activeTab, // Works for both legacy and dynamic menus
          name: newCategoryName.trim()
        })
      ).unwrap();
      setSaveStatus("saved");
      setNewCategoryName("");
      setSelectedCategory(result.id);
      // Refresh menus to show the new category
      dispatch(fetchMenus());
      setTimeout(() => {
        setIsAddingCategory(false);
        setSaveStatus("idle");
      }, 1000);
    } catch {
      setSaveStatus("error");
    }
  }, [dispatch, activeTab, newCategoryName]);

  const handleEditCategory = useCallback((categoryId: string, categoryName: string) => {
    setEditingCategoryId(categoryId);
    setEditingCategoryName(categoryName);
  }, []);

  const handleSaveCategoryEdit = useCallback(async () => {
    if (!editingCategoryId || !editingCategoryName.trim()) return;

    try {
      await dispatch(
        updateMenuCategory({
          categoryId: editingCategoryId,
          name: editingCategoryName.trim(),
          menuType: (activeTab === "shop" || activeTab === "restaurant" ? activeTab : "shop") as "shop" | "restaurant"
        })
      ).unwrap();
      setEditingCategoryId(null);
      setEditingCategoryName("");
      // Refresh menus to show the updated category
      dispatch(fetchMenus());
    } catch (error) {
      console.error("Failed to update category:", error);
      alert("Failed to update category. Please try again.");
    }
  }, [dispatch, editingCategoryId, editingCategoryName, activeTab]);

  const handleCancelCategoryEdit = useCallback(() => {
    setEditingCategoryId(null);
    setEditingCategoryName("");
  }, []);

  const handleAddMenu = useCallback(async () => {
    if (!newMenuName.trim()) return;

    setSaveStatus("saving");
    try {
      await dispatch(
        addMenu({
          name: newMenuName.trim(),
          color: newMenuColor
        })
      ).unwrap();
      setSaveStatus("saved");
      setNewMenuName("");
      setNewMenuColor("#286091");
      // Refresh menus to show the new one
      dispatch(fetchMenus());
      setTimeout(() => {
        setIsAddingMenu(false);
        setSaveStatus("idle");
      }, 1000);
    } catch {
      setSaveStatus("error");
    }
  }, [dispatch, newMenuName, newMenuColor]);

  const handleDeleteMenu = useCallback(async (menuId: string, menuName: string) => {
    // Prevent deletion of default menus
    if (menuId === "shop" || menuId === "restaurant") {
      alert("Cannot delete default Shop or Restaurant menus.");
      return;
    }

    if (!confirm(`Are you sure you want to delete "${menuName}"? This will permanently delete all categories and items in this menu.`)) {
      return;
    }

    try {
      await dispatch(deleteMenu(menuId)).unwrap();
      // Refresh menus after deletion
      dispatch(fetchMenus());
      // Switch to shop menu if the deleted menu was active
      if (activeTab !== "shop" && activeTab !== "restaurant") {
        setActiveTab("shop");
      }
    } catch (error) {
      console.error("Failed to delete menu:", error);
      alert("Failed to delete menu. Please try again.");
    }
  }, [dispatch, activeTab]);

  const handleDeleteCategory = useCallback(
    async (categoryId: string, categoryName: string) => {
      if (!confirm(`Are you sure you want to delete "${categoryName}"? This will also delete all items in this category.`)) return;

      try {
        await dispatch(
          deleteMenuCategory({
            categoryId,
            menuType: (activeTab === "shop" || activeTab === "restaurant" ? activeTab : "shop") as "shop" | "restaurant"
          })
        ).unwrap();
        // Refresh menus to show the deletion
        dispatch(fetchMenus());
        // Select first category after deletion
        if (selectedCategory === categoryId && currentMenu.length > 1) {
          const remainingCategories = currentMenu.filter(cat => cat.id !== categoryId);
          if (remainingCategories.length > 0) {
            setSelectedCategory(remainingCategories[0].id);
          } else {
            setSelectedCategory("");
          }
        }
      } catch (error) {
        console.error("Failed to delete category:", error);
        alert("Failed to delete category. Please try again.");
      }
    },
    [dispatch, activeTab, selectedCategory, currentMenu]
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
        <div className="flex gap-2 mb-4 sm:mb-6 shrink-0 flex-wrap">
          {/* Shop Menu - Default */}
          <button
            onClick={() => {
              setActiveTab("shop");
              setSelectedCategory("");
            }}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${activeTab === "shop" ? "bg-[#286091] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
          >
            Shop Menu
          </button>

          {/* Restaurant Menu - Default */}
          <button
            onClick={() => {
              setActiveTab("restaurant");
              setSelectedCategory("");
            }}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${activeTab === "restaurant" ? "bg-[#9c2622] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
          >
            Restaurant Menu
          </button>

          {/* Dynamic Custom Menus */}
          {menus?.filter((m) => m.id !== "shop" && m.id !== "restaurant").map((menu) => (
            <div key={menu.id} className="relative group">
              <button
                onClick={() => {
                  setActiveTab(menu.id as any);
                  setSelectedCategory("");
                }}
                style={{ backgroundColor: activeTab === menu.id ? menu.color : undefined }}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === menu.id ? "text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {menu.name}
              </button>
              {/* Delete button - only shows on hover */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteMenu(menu.id, menu.name);
                }}
                className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg"
                title="Delete Menu"
              >
                <FiTrash2 className="w-3 h-3" />
              </button>
            </div>
          ))}

          {/* Add New Menu Button */}
          <button onClick={() => setIsAddingMenu(true)} className="px-4 py-3 rounded-lg font-semibold transition-colors bg-white text-gray-600 hover:bg-gray-50 border-2 border-dashed border-gray-300 hover:border-gray-400 flex items-center gap-2" title="Add New Menu">
            <FiPlus className="w-5 h-5" />
            <span className="hidden sm:inline">New Menu</span>
          </button>
        </div>

        {/* Add Menu Modal */}
        <AnimatePresence>
          {isAddingMenu && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setIsAddingMenu(false)} role="dialog" aria-modal="true" aria-label="Create new menu">
              <motion.div ref={menuModalRef} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: "spring", stiffness: 400, damping: 30 }} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()} className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Create New Menu</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Menu Name</label>
                    <input type="text" placeholder="e.g., Lent Menu" value={newMenuName} onChange={e => setNewMenuName(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAddMenu()} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" autoFocus />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Menu Color</label>
                    <div className="flex gap-2 items-center">
                      <input type="color" value={newMenuColor} onChange={e => setNewMenuColor(e.target.value)} className="w-12 h-10 rounded cursor-pointer" />
                      <input type="text" value={newMenuColor} onChange={e => setNewMenuColor(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm" placeholder="#286091" />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button onClick={handleAddMenu} disabled={saveStatus === "saving" || !newMenuName.trim()} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium">
                      {saveStatus === "saving" ? "Creating..." : saveStatus === "saved" ? "Created!" : "Create Menu"}
                    </button>
                    <button
                      onClick={() => {
                        setIsAddingMenu(false);
                        setNewMenuName("");
                        setNewMenuColor("#286091");
                        setSaveStatus("idle");
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 flex-1 min-h-0 lg:grid-rows-[1fr]">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1 min-h-0 flex flex-col">
              <div className="bg-white rounded-xl shadow-sm p-4 flex-1 min-h-0 max-h-[40vh] lg:max-h-none overflow-y-auto flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-800">Categories</h2>
                  <button onClick={() => setIsAddingCategory(!isAddingCategory)} className={`px-3 py-1.5 text-sm rounded-lg text-white font-medium transition-colors ${activeTab === "shop" ? "bg-[#286091] hover:bg-[#1e4a6f]" : "bg-[#9c2622] hover:bg-[#7a1e1b]"}`}>
                    + Add
                  </button>
                </div>

                {/* Add Category Form */}
                <AnimatePresence>
                  {isAddingCategory && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-4 p-3 bg-green-50 rounded-lg">
                      <input type="text" placeholder="Category name" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAddCategory()} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm mb-2" autoFocus />
                      <div className="flex gap-2">
                        <button onClick={handleAddCategory} disabled={saveStatus === "saving" || !newCategoryName.trim()} className="flex-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm">
                          {saveStatus === "saving" ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={() => {
                            setIsAddingCategory(false);
                            setNewCategoryName("");
                            setSaveStatus("idle");
                          }}
                          className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-2 flex-1 overflow-y-auto p-1">
                  {currentMenu.map(category => (
                    <div key={category.id} className="relative group">
                      {editingCategoryId === category.id ? (
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <input
                            type="text"
                            value={editingCategoryName}
                            onChange={e => setEditingCategoryName(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === "Enter") handleSaveCategoryEdit();
                              if (e.key === "Escape") handleCancelCategoryEdit();
                            }}
                            className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 outline-none mb-2"
                            autoFocus
                          />
                          <div className="flex gap-1">
                            <button onClick={handleSaveCategoryEdit} className="flex-1 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                              Save
                            </button>
                            <button onClick={handleCancelCategoryEdit} className="flex-1 px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300">
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <button onClick={() => setSelectedCategory(category.id)} className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${selectedCategory === category.id ? (activeTab === "shop" ? "bg-[#286091] text-white" : "bg-[#9c2622] text-white") : "hover:bg-gray-100 text-gray-700"}`}>
                            <span className="font-medium">{category.name}</span>
                            <span className="text-sm opacity-75 ml-2">({category.items.length})</span>
                          </button>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                handleEditCategory(category.id, category.name);
                              }}
                              className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded"
                              title="Edit category"
                            >
                              ✎
                            </button>
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                handleDeleteCategory(category.id, category.name);
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
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Item Image (Optional)</label>
                            <ImageUpload onImageChange={setNewItemImage} disabled={saveStatus === "saving"} />
                          </div>
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
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-600 mb-2">Item Image</label>
                              <ImageUpload
                                currentImageUrl={editingItem.imageUrl}
                                onImageChange={setEditItemImage}
                                onImageRemove={() => {
                                  setEditingItem({ ...editingItem, imageUrl: undefined });
                                  setEditItemImage(null);
                                }}
                                disabled={saveStatus === "saving"}
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
                        <div className="flex items-start gap-4">
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
                            <p className={`font-semibold mt-1 ${activeTab === "shop" ? "text-[#286091]" : "text-[#9c2622]"}`}>{item.price} AED</p>
                          </div>
                          <div className="flex gap-2 shrink-0">
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
