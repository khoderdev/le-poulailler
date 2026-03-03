import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login, checkSession } from "../store/adminSlice";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.admin);

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    dispatch(login(password));

    // Check if login was successful
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "lepoulailler2024";
    if (password !== adminPassword) {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Access</h1>
          <p className="text-gray-500">Le Poulailler Menu Management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9c2622] focus:border-transparent outline-none transition-all" placeholder="Enter admin password" autoFocus />
          </div>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm text-center">
              {error}
            </motion.p>
          )}

          <button type="submit" className="w-full bg-[#9c2622] text-white py-3 rounded-lg font-semibold hover:bg-[#7a1e1b] transition-colors">
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/menu" className="text-gray-500 hover:text-gray-700 text-sm">
            ← Back to Menu
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
