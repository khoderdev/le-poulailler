import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../components/Logo";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-linear-to-br from-cyan-100/40 to-amber-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[500px] h-[500px] bg-linear-to-tl from-orange-100/30 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-lg flex flex-col items-center text-center">
          {/* Logo */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-8">
            <Logo size="lg" />
          </motion.div>

          {/* 404 Number */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="mb-4">
            <span className="font-script text-[120px] md:text-[160px] leading-none text-[#9c2622]/15 select-none">404</span>
          </motion.div>

          {/* Message */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }} className="-mt-6 mb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Page Not Found</h1>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-sm mx-auto">Oops! The page you're looking for doesn't exist or has been moved.</p>
          </motion.div>

          {/* Return Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            onClick={() => navigate("/menu")}
            className="flex items-center gap-2 px-8 py-3.5 bg-[#9c2622] text-white font-semibold rounded-2xl
                       shadow-lg shadow-[#9c2622]/25 hover:bg-[#7a1e1b] hover:shadow-xl hover:-translate-y-0.5
                       active:translate-y-0 active:shadow-lg transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Menu
          </motion.button>
        </div>
      </main>

      {/* Footer */}
      <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.5 }} className="py-6 text-center">
        <p className="text-gray-400 text-xs">© {new Date().getFullYear()} Le Poulailler Dubai. All rights reserved.</p>
      </motion.footer>
    </div>
  );
};

export default NotFound;
