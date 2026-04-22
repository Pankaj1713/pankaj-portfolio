"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// --- 1. THE 3D SHADER COMPONENT ---
const HolographicBackground = () => {
  const meshRef = useRef(null);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor1: { value: new THREE.Color("#06b6d4") }, // Cyan-400
          uColor2: { value: new THREE.Color("#3b82f6") }, // Blue-500
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying vec2 vUv;

          vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
          float snoise(vec2 v) {
            const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
            vec2 i  = floor(v + dot(v, C.yy) );
            vec2 x0 = v -   i + dot(i, C.xx);
            vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod289(i);
            vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
            m = m*m ; m = m*m ;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5; vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox; m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
            vec3 g; g.x  = a0.x  * x0.x  + h.x  * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
          }

          void main() {
            float noise = snoise(vec2(vUv.x * 3.0 - uTime * 0.1, vUv.y * 2.0 + uTime * 0.2));
            vec3 finalColor = mix(uColor1, uColor2, noise + 0.5);
            float alpha = smoothstep(0.0, 1.0, vUv.y);
            gl_FragColor = vec4(finalColor, alpha * 0.35); 
          }
        `,
        transparent: true,
      }),
    [],
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[20, 10]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

// --- 2. THE MAIN NAVIGATION COMPONENT ---
export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Scroll detection effect
  useEffect(() => {
    let isMounted = true;
    const handleScroll = () => {
      if (isMounted) setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      isMounted = false;
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // THE FIX: Scroll Lock Effect for Mobile Menu
  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling when menu is open
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling when menu is closed
      document.body.style.overflow = "";
    }

    // Cleanup function to ensure scrolling is re-enabled if component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    setTimeout(() => setIsOpen(false), 300);

    if (href === "#" || href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navContainer = {
    hidden: { opacity: 0, y: -30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out ${
        isScrolled || isOpen
          ? "bg-slate-950/40 backdrop-blur-2xl shadow-2xl shadow-cyan-900/20"
          : "bg-transparent"
      }`}
    >
      <div
        className={`absolute inset-0 -z-10 overflow-hidden transition-opacity duration-700 ${
          isScrolled || isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <HolographicBackground />
        </Canvas>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={navContainer}
          initial="hidden"
          animate="visible"
          className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled ? "py-4" : "py-6"
          }`}
        >
          {/* Logo */}
          <motion.a
            variants={navItemVariants}
            href="#"
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-extrabold text-white tracking-tighter flex items-center relative group"
            onClick={(e) => handleSmoothScroll(e, "#")}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 relative z-10">
              PT
            </span>
            <span className="text-cyan-400 group-hover:animate-pulse">.</span>
          </motion.a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                variants={navItemVariants}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative px-4 py-2 text-gray-300 hover:text-white transition-colors font-medium rounded-full"
              >
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </motion.a>
            ))}
          </div>

          {/* Desktop CTA */}
          <motion.a
            variants={navItemVariants}
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0px 30px -5px rgba(34,211,238,0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full border border-cyan-400/30 transition-all duration-300 cursor-pointer overflow-hidden relative group"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1s_forwards] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative z-10">Get in Touch</span>
          </motion.a>

          {/* Mobile Menu Toggle */}
          <motion.div variants={navItemVariants} className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-cyan-400 transition-colors p-2 relative z-50"
              aria-label="Toggle Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.path
                      key="close"
                      initial={{ pathLength: 0, rotate: -90 }}
                      animate={{ pathLength: 1, rotate: 0 }}
                      exit={{ pathLength: 0, rotate: 90 }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <motion.path
                      key="menu"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ pathLength: 0, opacity: 0 }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </AnimatePresence>
              </svg>
            </button>
          </motion.div>
        </motion.div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: "circle(0% at 90% 10%)" }}
              animate={{ opacity: 1, clipPath: "circle(150% at 90% 10%)" }}
              exit={{ opacity: 0, clipPath: "circle(0% at 90% 10%)" }}
              transition={{ type: "spring", stiffness: 40, damping: 15 }}
              className="md:hidden absolute top-full left-0 w-full bg-slate-950/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/50"
            >
              <div className="flex flex-col gap-2 p-6">
                {navItems.map((item, index) => (
                  <motion.a
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 80,
                      delay: 0.1 + index * 0.1,
                    }}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="text-gray-200 hover:text-cyan-400 hover:bg-white/5 font-medium text-lg px-4 py-3 rounded-xl transition-colors cursor-pointer"
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
