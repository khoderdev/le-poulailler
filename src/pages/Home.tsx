import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiOutlineShoppingBag, HiOutlineClipboardList } from "react-icons/hi";
import Logo from "../components/Logo";

const socialLinks = [
  {
    href: "https://www.facebook.com/LePoulaillerdubai",
    icon: FaFacebook,
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/lepoulaillerdubai",
    icon: FaInstagram,
    label: "Instagram",
  },
  {
    href: "https://wa.me/971521808752",
    icon: FaWhatsapp,
    label: "WhatsApp",
  },
];

const menuLinks = [
  {
    to: "/shop-menu",
    title: "Shop Menu",
    subtitle: "",
    icon: HiOutlineShoppingBag,
    gradient: "from-cyan-500 to-teal-500",
    shadowColor: "shadow-cyan-500/25",
  },
  {
    to: "/restaurant-menu",
    title: "Restaurant Menu",
    subtitle: "",
    icon: HiOutlineClipboardList,
    gradient: "from-amber-500 to-orange-500",
    shadowColor: "shadow-amber-500/25",
  },
];

const Home = () => {
  return (
    <div className="relative h-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-linear-to-br from-cyan-100/40 to-amber-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[500px] h-[500px] bg-linear-to-tl from-orange-100/30 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-5 px-6"
      >
        <nav className="flex justify-center">
          <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-full px-2 py-2 shadow-sm border border-gray-100">
            {socialLinks.map(({ href, icon: Icon, label }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-all duration-200"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-8 select-none!">
        <div className="w-full max-w-lg">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center mb-2! ml-4!"
          >
            <Logo size="xl" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-gray-500 text-sm md:text-base mb-10! tracking-wide"
          >
            ZERO HORMONES
          </motion.p>

          {/* Menu Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-4 select-none! p-8!"
          >
            {menuLinks.map(({ to, title, subtitle, icon: Icon, gradient, shadowColor }) => (
              <Link
                key={to}
                to={to}
                className={`group relative flex items-center gap-5 p-5 md:p-6 
                           bg-linear-to-r ${gradient}
                           rounded-2xl shadow-lg ${shadowColor}
                           hover:shadow-xl hover:-translate-y-0.5
                           active:translate-y-0 active:shadow-lg
                           transition-all duration-300`}
              >
                <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-white font-bold text-lg md:text-xl">{title}</h2>
                  <p className="text-white/80 text-sm">{subtitle}</p>
                </div>
                <div className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="py-6 text-center"
      >
        <p className="text-gray-400 text-xs">
          © {new Date().getFullYear()} Le Poulailler Dubai. All rights reserved.
        </p>
      </motion.footer>
    </div>
  );
};

export default Home;
