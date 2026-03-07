import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchMenus } from "../store/menuSlice";
import MenuPageLayout from "../components/MenuPageLayout";

const DynamicMenu = () => {
  const { menuSlug } = useParams<{ menuSlug: string }>();
  const dispatch = useAppDispatch();
  const { menus, isLoading } = useAppSelector(state => state.menu);
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    if (menus.length === 0) {
      dispatch(fetchMenus());
    }
  }, [dispatch, menus.length]);

  // Find the menu by slug
  const menu = menus.find(m => m.slug === menuSlug);

  // Set initial active category when menu loads
  useEffect(() => {
    if (menu && menu.categories.length > 0 && !activeCategory) {
      setActiveCategory(menu.categories[0].id);
    }
  }, [menu, activeCategory]);

  // Get items for the active category
  const items = useMemo(() => {
    if (!menu || !activeCategory) return [];
    const category = menu.categories.find(cat => cat.id === activeCategory);
    return category?.items || [];
  }, [menu, activeCategory]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  // If menu not found, redirect to home
  if (!menu) {
    return <Navigate to="/menu" replace />;
  }

  // Render the menu using MenuPageLayout
  return (
    <MenuPageLayout
      categories={menu.categories}
      activeCategory={activeCategory}
      items={items}
      onCategoryChange={setActiveCategory}
      variant={menu.slug === "shop" ? "shop" : "restaurant"}
    />
  );
};

export default DynamicMenu;
