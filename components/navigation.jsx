"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const handleScroll = () => {
      if (isMounted) {
        setIsScrolled(window.scrollY > 50);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      isMounted = false;
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const navContainer = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const navItem = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // --- Adjusted Mobile Menu Animations ---
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      // Increased duration from 0.4 to 0.7 for a smoother dropdown
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      height: 0,
      // Increased exit duration from 0.3 to 0.5 so it doesn't snap shut
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
        isScrolled || isOpen
          ? "bg-slate-950/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={navContainer}
          initial="hidden"
          animate="visible"
          className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled ? "py-4" : "py-6"
          }`}
        >
          <motion.a
            variants={navItem}
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-extrabold text-white tracking-tighter flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              PT
            </span>
            <span className="text-cyan-400">.</span>
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                variants={navItem}
                href={item.href}
                className="relative text-gray-300 hover:text-white transition-colors font-medium text-sm py-2 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 ease-out group-hover:w-full rounded-full" />
              </motion.a>
            ))}
          </div>

          <motion.a
            variants={navItem}
            href="#contact"
            whileHover={{
              y: -2,
              boxShadow: "0 10px 30px -10px rgba(34,211,238,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg transition-all duration-300"
          >
            Get in Touch
          </motion.a>

          <motion.div variants={navItem} className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-cyan-400 transition-colors p-2"
              aria-label="Toggle Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-4 pt-4 pb-8 border-t border-white/5">
                {navItems.map((item, index) => (
                  <motion.a
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    // Added a 0.2s base delay, and increased the stagger gap to 0.15s
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + index * 0.15,
                      ease: "easeOut",
                    }}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-gray-300 hover:text-cyan-400 font-medium text-lg px-2"
                  >
                    {item.name}
                  </motion.a>
                ))}

                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  // Adjusted the delay so it appears smoothly after the last link
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + navItems.length * 0.15,
                    ease: "easeOut",
                  }}
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 px-6 py-3 text-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/20"
                >
                  Get in Touch
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
