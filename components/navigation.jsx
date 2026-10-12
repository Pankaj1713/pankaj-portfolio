"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

const navItems = [
  { name: "Home", id: "home" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "Skills", id: "skills" },
  { name: "Contact", id: "contact" },
];

const SCROLLED_THRESHOLD = 40;

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: easeOutExpo, staggerChildren: 0.05, delayChildren: 0.05 },
  },
  exit: { opacity: 0, y: -12, scale: 0.98, transition: { duration: 0.2 } },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: easeOutExpo } },
};

function useActiveSection() {
  const [activeId, setActiveId] = useState(navItems[0].id);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) setActiveId(visibleEntry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeId;
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const activeId = useActiveSection();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > SCROLLED_THRESHOLD);
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (!isOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    document.body.style.overflow = "";
    setIsOpen(false);
  };

  const isElevated = isScrolled || isOpen;

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeOutExpo }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ${
        isElevated
          ? "border-white/10 bg-slate-950/70 shadow-lg shadow-cyan-950/20 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="container mx-auto flex h-[72px] items-center justify-between px-4"
      >
        <a
          href="#home"
          onClick={handleLinkClick}
          aria-label="Pankaj Thakur, back to top"
          className="group flex items-center text-2xl font-extrabold tracking-tighter text-white transition-transform duration-300 hover:scale-105"
        >
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            PT
          </span>
          <span className="text-cyan-400">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-white" : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-indicator"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full border border-white/15 bg-white/10"
                    >
                      <span className="absolute -bottom-px left-1/2 h-px w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                    </motion.span>
                  )}
                  <span className="relative z-10">{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <motion.a
          href="#contact"
          whileTap={{ scale: 0.96 }}
          className="cta-sheen cta-gradient hidden rounded-full border border-cyan-400/30 px-6 py-2.5 text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_28px_-4px_rgba(34,211,238,0.6)] md:block"
        >
          Get in Touch
        </motion.a>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="relative rounded-lg p-2 text-white transition-colors hover:text-cyan-400 md:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isOpen ? "close" : "open"}
              initial={{ opacity: 0, rotate: -60 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 60 }}
              transition={{ duration: 0.15 }}
              className="block"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-x-0 top-full origin-top border-b border-white/10 bg-slate-950/95 shadow-2xl shadow-black/50 backdrop-blur-xl md:hidden"
          >
            <ul className="container mx-auto flex flex-col gap-1 p-4">
              {navItems.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <motion.li key={item.id} variants={mobileItemVariants}>
                    <a
                      href={`#${item.id}`}
                      onClick={handleLinkClick}
                      aria-current={isActive ? "location" : undefined}
                      className={`block rounded-xl px-4 py-3 text-lg font-medium transition-colors ${
                        isActive
                          ? "bg-cyan-400/10 text-cyan-400"
                          : "text-gray-200 hover:bg-white/5 hover:text-cyan-400"
                      }`}
                    >
                      {item.name}
                    </a>
                  </motion.li>
                );
              })}
              <motion.li variants={mobileItemVariants} className="pt-2">
                <a
                  href="#contact"
                  onClick={handleLinkClick}
                  className="cta-sheen cta-gradient block rounded-xl px-4 py-3 text-center text-lg font-semibold text-white"
                >
                  Get in Touch
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
