import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import ShopMenu from "./pages/ShopMenu";
import RestaurantMenu from "./pages/RestaurantMenu";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAppDispatch } from "./store/hooks";
import { fetchMenuData } from "./store/menuSlice";
import { useRealtimeMenu } from "./hooks/useRealtimeMenu";

function App() {
  const dispatch = useAppDispatch();

  // Enable realtime updates from Supabase
  useRealtimeMenu();

  useEffect(() => {
    dispatch(fetchMenuData());
  }, [dispatch]);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Navigate to="/menu" replace />} />
          <Route path="/menu" element={<Home />} />
          <Route path="/shop-menu" element={<ShopMenu />} />
          <Route path="/restaurant-menu" element={<RestaurantMenu />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
