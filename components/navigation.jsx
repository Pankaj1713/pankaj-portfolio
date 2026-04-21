"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

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

  // --- Premium Nav Animations ---
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

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-lg shadow-black/20"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* The container triggers the staggered reveal on load */}
        <motion.div
          variants={navContainer}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between"
        >
          {/* Logo */}
          <motion.a
            variants={navItem}
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-extrabold text-white tracking-tighter flex items-center"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              PT
            </span>
            <span className="text-cyan-400">.</span>
          </motion.a>

          {/* Nav items with Animated Underline */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                variants={navItem}
                href={item.href}
                className="relative text-gray-300 hover:text-white transition-colors font-medium text-sm py-2 group"
              >
                {item.name}
                {/* The sliding underline effect */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 ease-out group-hover:w-full rounded-full" />
              </motion.a>
            ))}
          </div>

          {/* Glowing CTA Button */}
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

          {/* Mobile menu toggle */}
          <motion.div variants={navItem} className="md:hidden">
            <button className="text-gray-300 hover:text-cyan-400 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
