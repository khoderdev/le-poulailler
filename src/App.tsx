import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";

const ShopMenu = lazy(() => import("./pages/ShopMenu"));
const RestaurantMenu = lazy(() => import("./pages/RestaurantMenu"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
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
      <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-slate-50" />}>
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
                <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-slate-50" />}>
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                </Suspense>
              }
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </Router>
  );
}

export default App;
