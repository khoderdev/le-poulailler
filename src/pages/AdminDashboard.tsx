import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { checkSession, logout } from "../store/adminSlice";
import { fetchMenuData, fetchMenus, addMenu, deleteMenu, updateMenuItem, addMenuItem, deleteMenuItem, addMenuCategory, updateMenuCategory, deleteMenuCategory } from "../store/menuSlice";
import type { MenuItem } from "../types";
import { uploadMenuItemImage, deleteMenuItemImage } from "../lib/imageUpload";

import AdminHeader from "../components/admin/AdminHeader";
import MenuTabs from "../components/admin/MenuTabs";
import CategorySidebar from "../components/admin/CategorySidebar";
import ItemsList from "../components/admin/ItemsList";
import AddMenuModal from "../components/admin/AddMenuModal";
import AddItemModal from "../components/admin/AddItemModal";
import EditItemModal from "../components/admin/EditItemModal";
import ConfirmDeleteModal from "../components/admin/ConfirmDeleteModal";
import type { EditingItem, DeleteTarget } from "../components/admin/types";
import type { NewItemData } from "../components/admin/AddItemModal";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.admin);
  const { shopMenu, restaurantMenu, menus, isLoading } = useAppSelector(state => state.menu);

  /* ------------------------------------------------------------------ */
  /*  Core UI state                                                      */
  /* ------------------------------------------------------------------ */
  const [activeTab, setActiveTab] = useState<string>("shop");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  /* ------------------------------------------------------------------ */
  /*  Modal visibility state                                             */
  /* ------------------------------------------------------------------ */
  const [isAddingMenu, setIsAddingMenu] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | undefined>(undefined);

  /* ------------------------------------------------------------------ */
  /*  Auth & data bootstrapping                                          */
  /* ------------------------------------------------------------------ */
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

  /* ------------------------------------------------------------------ */
  /*  Derived data                                                       */
  /* ------------------------------------------------------------------ */
  const currentMenu = useMemo(() => {
    if (activeTab === "shop") return shopMenu;
    if (activeTab === "restaurant") return restaurantMenu;
    const customMenu = menus.find(m => m.id === activeTab);
    return customMenu?.categories || [];
  }, [activeTab, shopMenu, restaurantMenu, menus]);

  useEffect(() => {
    if (currentMenu.length > 0 && !selectedCategory) {
      setSelectedCategory(currentMenu[0].id);
    }
  }, [currentMenu, selectedCategory]);

  const currentCategory = useMemo(() => currentMenu.find(cat => cat.id === selectedCategory), [currentMenu, selectedCategory]);

  const refreshIfCustomMenu = useCallback(() => {
    if (activeTab !== "shop" && activeTab !== "restaurant") {
      dispatch(fetchMenus());
    }
  }, [dispatch, activeTab]);

  /* ------------------------------------------------------------------ */
  /*  Header actions                                                     */
  /* ------------------------------------------------------------------ */
  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate("/admin");
  }, [dispatch, navigate]);

  /* ------------------------------------------------------------------ */
  /*  Tab actions                                                        */
  /* ------------------------------------------------------------------ */
  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    setSelectedCategory("");
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Menu CRUD                                                          */
  /* ------------------------------------------------------------------ */
  const handleAddMenu = useCallback(
    async (name: string, color: string) => {
      await dispatch(addMenu({ name, color })).unwrap();
      dispatch(fetchMenus());
    },
    [dispatch]
  );

  const handleRequestDeleteMenu = useCallback((menuId: string, menuName: string) => {
    if (menuId === "shop" || menuId === "restaurant") {
      alert("Cannot delete default Shop or Restaurant menus.");
      return;
    }
    setDeleteTarget({ type: "menu", id: menuId, name: menuName });
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Category CRUD                                                      */
  /* ------------------------------------------------------------------ */
  const handleAddCategory = useCallback(
    async (name: string) => {
      const result = await dispatch(
        addMenuCategory({
          menu_type: activeTab === "shop" || activeTab === "restaurant" ? activeTab : undefined,
          menu_id: activeTab,
          name
        })
      ).unwrap();
      setSelectedCategory(result.id);
      dispatch(fetchMenus());
    },
    [dispatch, activeTab]
  );

  const handleEditCategory = useCallback(
    async (categoryId: string, name: string) => {
      await dispatch(
        updateMenuCategory({
          categoryId,
          name,
          menuType: (activeTab === "shop" || activeTab === "restaurant" ? activeTab : "shop") as "shop" | "restaurant"
        })
      ).unwrap();
      dispatch(fetchMenus());
    },
    [dispatch, activeTab]
  );

  const handleRequestDeleteCategory = useCallback((categoryId: string, categoryName: string) => {
    setDeleteTarget({ type: "category", id: categoryId, name: categoryName });
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Item CRUD                                                          */
  /* ------------------------------------------------------------------ */
  const handleOpenAddItem = useCallback(() => {
    setIsAddingItem(true);
    setEditingItem(null);
  }, []);

  const handleOpenEditItem = useCallback(
    (item: MenuItem) => {
      setEditingItem({ ...item, category_id: selectedCategory });
      setOriginalImageUrl(item.imageUrl);
      setIsAddingItem(false);
    },
    [selectedCategory]
  );

  const handleAddItem = useCallback(
    async (itemData: NewItemData, image: File | null) => {
      const tempId = `item-${Date.now()}`;
      let imageUrl: string | undefined;

      if (image) {
        const uploadResult = await uploadMenuItemImage(image, tempId);
        imageUrl = uploadResult.url;
      }

      await dispatch(
        addMenuItem({
          category_id: selectedCategory,
          name: itemData.name,
          price: itemData.price ? parseFloat(itemData.price) || itemData.price : 0,
          description: itemData.description || undefined,
          image_url: imageUrl,
          coming_soon: itemData.coming_soon
        })
      ).unwrap();

      refreshIfCustomMenu();
    },
    [dispatch, selectedCategory, refreshIfCustomMenu]
  );

  const handleSaveEdit = useCallback(
    async (item: EditingItem, image: File | null) => {
      let imageUrl = item.imageUrl;

      if (image) {
        const uploadResult = await uploadMenuItemImage(image, item.id);
        imageUrl = uploadResult.url;
        if (originalImageUrl) {
          try {
            await deleteMenuItemImage(originalImageUrl);
          } catch (e) {
            console.warn("Failed to delete old image:", e);
          }
        }
      } else if (!item.imageUrl && originalImageUrl) {
        try {
          await deleteMenuItemImage(originalImageUrl);
        } catch (e) {
          console.warn("Failed to delete removed image:", e);
        }
      }

      await dispatch(
        updateMenuItem({
          itemId: item.id,
          updates: {
            name: item.name,
            price: item.price,
            description: item.description || null,
            image_url: imageUrl || null,
            coming_soon: item.comingSoon || false
          }
        })
      ).unwrap();

      refreshIfCustomMenu();
    },
    [dispatch, originalImageUrl, refreshIfCustomMenu]
  );

  const handleRequestDeleteItem = useCallback((itemId: string, itemName: string) => {
    setDeleteTarget({ type: "item", id: itemId, name: itemName });
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Confirm delete handler (shared for item / menu / category)         */
  /* ------------------------------------------------------------------ */
  const handleConfirmDelete = useCallback(async () => {
    if (!deleteTarget) return;

    try {
      switch (deleteTarget.type) {
        case "item":
          await dispatch(deleteMenuItem(deleteTarget.id)).unwrap();
          break;

        case "menu":
          await dispatch(deleteMenu(deleteTarget.id)).unwrap();
          dispatch(fetchMenus());
          if (activeTab === deleteTarget.id) {
            setActiveTab("shop");
            setSelectedCategory("");
          }
          break;

        case "category":
          await dispatch(
            deleteMenuCategory({
              categoryId: deleteTarget.id,
              menuType: (activeTab === "shop" || activeTab === "restaurant" ? activeTab : "shop") as "shop" | "restaurant"
            })
          ).unwrap();
          dispatch(fetchMenus());
          if (selectedCategory === deleteTarget.id) {
            const remaining = currentMenu.filter(cat => cat.id !== deleteTarget.id);
            setSelectedCategory(remaining.length > 0 ? remaining[0].id : "");
          }
          break;
      }
    } catch (error) {
      console.error(`Failed to delete ${deleteTarget.type}:`, error);
      alert(`Failed to delete ${deleteTarget.type}. Please try again.`);
    } finally {
      setDeleteTarget(null);
    }
  }, [dispatch, deleteTarget, activeTab, selectedCategory, currentMenu]);

  /* ------------------------------------------------------------------ */
  /*  Delete modal message builder                                       */
  /* ------------------------------------------------------------------ */
  const deleteMessage = useMemo(() => {
    if (!deleteTarget) return "";
    switch (deleteTarget.type) {
      case "item":
        return `Are you sure you want to delete "${deleteTarget.name}"?`;
      case "menu":
        return `Are you sure you want to delete "${deleteTarget.name}"? This will permanently delete all categories and items in this menu.`;
      case "category":
        return `Are you sure you want to delete "${deleteTarget.name}"? This will also delete all items in this category.`;
    }
  }, [deleteTarget]);

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */
  if (!isAuthenticated) return null;

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      <AdminHeader onBack={() => navigate("/")} onLogout={handleLogout} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-2 sm:py-6 overflow-hidden flex flex-col min-h-0">
        <MenuTabs activeTab={activeTab} menus={menus} onTabChange={handleTabChange} onDeleteMenu={handleRequestDeleteMenu} onAddMenu={() => setIsAddingMenu(true)} />

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-4 flex-1 min-h-0 lg:grid-rows-[1fr]">
            <CategorySidebar categories={currentMenu} selectedCategory={selectedCategory} activeTab={activeTab} onSelectCategory={setSelectedCategory} onAddCategory={handleAddCategory} onEditCategory={handleEditCategory} onDeleteCategory={handleRequestDeleteCategory} />

            <ItemsList category={currentCategory} activeTab={activeTab} onAddItem={handleOpenAddItem} onEditItem={handleOpenEditItem} onDeleteItem={handleRequestDeleteItem} />
          </div>
        )}
      </main>

      {/* ---- Modals ---- */}
      <AddMenuModal open={isAddingMenu} onClose={() => setIsAddingMenu(false)} onSubmit={handleAddMenu} />

      <AddItemModal open={isAddingItem} onClose={() => setIsAddingItem(false)} onSubmit={handleAddItem} />

      <EditItemModal open={editingItem !== null} item={editingItem} onClose={() => setEditingItem(null)} onSubmit={handleSaveEdit} />

      <ConfirmDeleteModal open={deleteTarget !== null} title={`Delete ${deleteTarget?.type ?? ""}`} message={deleteMessage} onConfirm={handleConfirmDelete} onCancel={() => setDeleteTarget(null)} />
    </div>
  );
};

export default AdminDashboard;
