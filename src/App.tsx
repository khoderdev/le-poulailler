import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import ShopMenu from './pages/ShopMenu';
import RestaurantMenu from './pages/RestaurantMenu';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/menu" element={<Home />} />
          <Route path="/shop-menu" element={<ShopMenu />} />
          <Route path="/restaurant-menu" element={<RestaurantMenu />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
