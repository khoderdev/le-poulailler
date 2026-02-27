// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
// import Logo from "../components/Logo";

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex flex-col">
//       <motion.header
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="py-6 px-4"
//       >
//         <div className="flex justify-center gap-6">
//           <motion.a
//             href="https://www.facebook.com/LePoulaillerdubai"
//             target="_blank"
//             rel="noopener noreferrer"
//             whileHover={{ scale: 1.2, color: "#1877f2" }}
//             className="text-gray-600 text-2xl transition-colors"
//           >
//             <FaFacebook />
//           </motion.a>
//           <motion.a
//             href="https://www.instagram.com/lepoulaillerdubai"
//             target="_blank"
//             rel="noopener noreferrer"
//             whileHover={{ scale: 1.2, color: "#e4405f" }}
//             className="text-gray-600 text-2xl transition-colors"
//           >
//             <FaInstagram />
//           </motion.a>
//           <motion.a
//             href="https://whatsapp.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             whileHover={{ scale: 1.2, color: "#25d366" }}
//             className="text-gray-600 text-2xl transition-colors"
//           >
//             <FaWhatsapp />
//           </motion.a>
//         </div>
//       </motion.header>

//       <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
//         <div className="mb-12">
//           <Logo size="xl" />
//         </div>

//         <motion.div
//           className="flex flex-col sm:flex-row gap-4 md:gap-6"
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.7, duration: 0.6 }}
//         >
//           <Link to="/shop-menu">
//             <motion.button
//               whileHover={{
//                 scale: 1.05,
//                 boxShadow: "0 10px 40px rgba(0, 188, 212, 0.3)",
//               }}
//               whileTap={{ scale: 0.95 }}
//               className="px-8 py-4 md:px-12 md:py-5 bg-linear-to-r from-cyan-500 to-cyan-600 text-white font-semibold text-lg md:text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               Shop Menu
//             </motion.button>
//           </Link>
//           <Link to="/restaurant-menu">
//             <motion.button
//               whileHover={{
//                 scale: 1.05,
//                 boxShadow: "0 10px 40px rgba(245, 158, 11, 0.3)",
//               }}
//               whileTap={{ scale: 0.95 }}
//               className="px-8 py-4 md:px-12 md:py-5 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold text-lg md:text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               Restaurant Menu
//             </motion.button>
//           </Link>
//         </motion.div>
//       </main>

//       <motion.footer
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1, duration: 0.6 }}
//         className="py-6 text-center text-gray-500 text-sm"
//       >
//         <p>© 2024 Le Poulailler. All rights reserved.</p>
//       </motion.footer>
//     </div>
//   );
// };

// export default Home;
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Logo from "../components/Logo";

const socialLinks = [
  {
    href: "https://www.facebook.com/LePoulaillerdubai",
    icon: FaFacebook,
    hoverColor: "hover:text-[#1877f2]",
  },
  {
    href: "https://www.instagram.com/lepoulaillerdubai",
    icon: FaInstagram,
    hoverColor: "hover:text-[#e4405f]",
  },
  {
    href: "https://whatsapp.com",
    icon: FaWhatsapp,
    hoverColor: "hover:text-[#25d366]",
  },
];

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-white to-orange-50 overflow-hidden">
      {/* Decorative Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-200/30 blur-3xl rounded-full" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-6 px-6"
      >
        <div className="flex justify-center gap-8">
          {socialLinks.map(({ href, icon: Icon, hoverColor }, index) => (
            <motion.a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className={`text-gray-500 text-2xl transition-colors duration-300 ${hoverColor}`}
            >
              <Icon />
            </motion.a>
          ))}
        </div>
      </motion.header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-2xl w-full">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <Logo size="xl" />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            <Link to="/shop-menu" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="relative w-full px-10 py-4 md:px-14 md:py-5
                           bg-gradient-to-r from-cyan-500 to-cyan-600
                           text-white font-semibold text-lg md:text-xl
                           rounded-2xl shadow-xl
                           hover:shadow-2xl transition-all duration-300"
              >
                <span className="relative z-10">Shop Menu</span>
                <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 rounded-2xl transition-opacity duration-300" />
              </motion.button>
            </Link>

            <Link to="/restaurant-menu" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="relative w-full px-10 py-4 md:px-14 md:py-5
                           bg-gradient-to-r from-amber-500 to-orange-500
                           text-white font-semibold text-lg md:text-xl
                           rounded-2xl shadow-xl
                           hover:shadow-2xl transition-all duration-300"
              >
                <span className="relative z-10">Restaurant Menu</span>
                <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 rounded-2xl transition-opacity duration-300" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="py-8 text-center text-gray-500 text-sm border-t border-gray-100 bg-white/40 backdrop-blur-md"
      >
        © {new Date().getFullYear()} Le Poulailler. All rights reserved.
      </motion.footer>
    </div>
  );
};

export default Home;
