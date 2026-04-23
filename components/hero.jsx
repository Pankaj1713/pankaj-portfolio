"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/lib/portfolio-data";
import { ArrowRight, Download } from "lucide-react";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// --- 1. THE 3D SHADER BACKGROUND ---
const HeroShaderBackground = () => {
  const pointsRef = useRef(null);

  // Generate 1500 stars only once for performance
  const [positions, colors] = useMemo(() => {
    const starCount = 1500;
    const pos = new Float32Array(starCount * 3);
    const col = new Float32Array(starCount * 3);

    const color1 = new THREE.Color("#06b6d4"); // Cyan
    const color2 = new THREE.Color("#3b82f6"); // Blue
    const color3 = new THREE.Color("#ffffff"); // Bright White for contrast

    for (let i = 0; i < starCount; i++) {
      // Distribute stars randomly in a massive 3D sphere around the camera
      const radius = 10 + Math.random() * 10; // Stars stay somewhat far away
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta); // x
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
      pos[i * 3 + 2] = radius * Math.cos(phi); // z

      // Randomly assign colors to the stars based on probability
      const randomColor = Math.random();
      let chosenColor = color1;

      if (randomColor > 0.6) chosenColor = color2;
      if (randomColor > 0.9) chosenColor = color3; // Only 10% of stars are white

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Slowly rotate the entire galaxy
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      {/* We use additive blending so the stars glow brightly
        against your dark #020617 background
      */}
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// --- 2. ENHANCED ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const smoothFadeInUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const wordReveal = {
  hidden: { opacity: 0, y: 20, rotateX: -40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// --- 3. MAIN HERO COMPONENT ---
export function Hero() {
  const titleWords = portfolioData.title.split(" ");

  return (
    <section className="min-h-screen flex items-center justify-center overflow-hidden relative bg-[#020617]">
      {/* THE FIX: 3D Canvas Background integrated behind everything */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <HeroShaderBackground />
        </Canvas>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Welcome Tag */}
            <motion.div variants={smoothFadeInUp} className="mb-6">
              <span className="inline-block py-1 px-3 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-sm font-medium tracking-wide mb-4 shadow-[0_0_15px_rgba(34,211,238,0.1)] backdrop-blur-sm">
                Welcome to my universe
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-2 tracking-tight">
                {portfolioData.name}
              </h1>
            </motion.div>

            {/* Title with cinematic word-by-word animation */}
            <motion.div className="mb-6 perspective-1000">
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {titleWords.map((word, i) => (
                  <motion.span
                    key={i}
                    variants={wordReveal}
                    className="text-2xl md:text-4xl font-semibold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent inline-block origin-bottom"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={smoothFadeInUp}
              className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-lg font-light"
            >
              {portfolioData.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={smoothFadeInUp}
              className="flex gap-4 flex-wrap items-center mt-8"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02, backgroundColor: "#22d3ee" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-300 group"
              >
                View My Work
                <motion.div className="group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={18} />
                </motion.div>
              </motion.a>

              <motion.a
                href="/Pankaj_Thakur_Resume.pdf"
                download="Pankaj_Thakur_Resume.pdf"
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(34, 211, 238, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 border-2 border-cyan-500/80 text-cyan-400 font-semibold rounded-xl flex items-center gap-2 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300 group backdrop-blur-sm"
              >
                Download CV
                <motion.div className="group-hover:-translate-y-1 transition-transform">
                  <Download size={18} />
                </motion.div>
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(34, 211, 238, 0.05)",
                }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 border-2 border-cyan-500/30 text-cyan-400 font-semibold rounded-xl hover:border-cyan-400 transition-all duration-300 backdrop-blur-sm"
              >
                Let{"'"}s Talk
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right side - Floating Image Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="hidden md:flex items-center justify-center relative w-full h-full min-h-[500px]"
          >
            {/* Main Floating Image Container */}
            <motion.div
              animate={{ y: [-12, 12, -12] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10 w-80 h-[420px]"
            >
              {/* The Image Wrapper */}
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl shadow-cyan-900/40 relative group">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                  alt="Pankaj Thakur"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle gradient overlay to ensure text/shadows pop */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
              </div>

              {/* Floating Experience Badge */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-8 -left-12 z-20"
              >
                <div className="backdrop-blur-xl bg-slate-950/70 border border-white/10 p-6 rounded-3xl shadow-2xl shadow-black/60 flex flex-col items-center justify-center">
                  <p className="text-5xl font-extrabold bg-gradient-to-br from-cyan-300 to-blue-500 bg-clip-text text-transparent mb-1 drop-shadow-sm">
                    3+
                  </p>
                  <p className="text-gray-300 text-xs font-semibold tracking-[0.2em] uppercase">
                    Years Exp.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* The Sleek Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        // THE FIX: Added "hidden md:flex" here
        className="hidden md:flex absolute bottom-10 left-1/2 transform -translate-x-1/2 flex-col items-center gap-3 z-20"
      >
        <div className="w-[26px] h-[42px] rounded-[14px] border-2 border-[#0d4f6d] flex justify-center pt-[6px] backdrop-blur-sm bg-slate-950/20">
          <motion.div
            animate={{ y: [0, 12], opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-1 h-1.5 bg-[#0ea5e9] rounded-full shadow-[0_0_8px_#0ea5e9]"
          />
        </div>
        <span className="text-[9px] text-[#0d4f6d] font-bold uppercase tracking-[0.3em]">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}

// "use client";

// import { motion, useMotionValue, useSpring } from "framer-motion";
// import { portfolioData } from "@/lib/portfolio-data";
// import { ArrowRight, Download } from "lucide-react";
// import { useRef, useMemo, useState, useEffect } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// // --- 1. PREMIUM GLASSMORPHIC CURSOR ---
// const PremiumCursor = () => {
//   const cursorX = useMotionValue(-100);
//   const cursorY = useMotionValue(-100);

//   const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
//   const cursorXSpring = useSpring(cursorX, springConfig);
//   const cursorYSpring = useSpring(cursorY, springConfig);

//   const [isHovering, setIsHovering] = useState(false);

//   useEffect(() => {
//     const moveCursor = (e) => {
//       cursorX.set(e.clientX - 16);
//       cursorY.set(e.clientY - 16);
//     };

//     const handleMouseOver = (e) => {
//       const target = e.target;
//       if (target.closest("a") || target.closest("button")) {
//         setIsHovering(true);
//       } else {
//         setIsHovering(false);
//       }
//     };

//     window.addEventListener("mousemove", moveCursor);
//     window.addEventListener("mouseover", handleMouseOver);

//     return () => {
//       window.removeEventListener("mousemove", moveCursor);
//       window.removeEventListener("mouseover", handleMouseOver);
//     };
//   }, [cursorX, cursorY]);

//   return (
//     // Only the glassmorphic circle is rendered now (removed the center dot)
//     <motion.div
//       className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block rounded-full border border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.2)] mix-blend-screen"
//       style={{ x: cursorXSpring, y: cursorYSpring, width: 32, height: 32 }}
//       animate={{
//         scale: isHovering ? 1.8 : 1,
//         backgroundColor: isHovering
//           ? "rgba(34, 211, 238, 0.15)"
//           : "rgba(34, 211, 238, 0.02)",
//         backdropFilter: isHovering ? "blur(4px)" : "blur(2px)",
//       }}
//       transition={{
//         scale: { type: "spring", stiffness: 300, damping: 20 },
//         backgroundColor: { duration: 0.2 },
//       }}
//     />
//   );
// };

// // --- 2. THE 3D STARFIELD BACKGROUND ---
// const HeroShaderBackground = () => {
//   const pointsRef = useRef(null);

//   const [positions, colors] = useMemo(() => {
//     const starCount = 1500;
//     const pos = new Float32Array(starCount * 3);
//     const col = new Float32Array(starCount * 3);

//     const color1 = new THREE.Color("#06b6d4");
//     const color2 = new THREE.Color("#3b82f6");
//     const color3 = new THREE.Color("#ffffff");

//     for (let i = 0; i < starCount; i++) {
//       const radius = 10 + Math.random() * 10;
//       const theta = Math.random() * 2 * Math.PI;
//       const phi = Math.acos(Math.random() * 2 - 1);

//       pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
//       pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
//       pos[i * 3 + 2] = radius * Math.cos(phi);

//       const randomColor = Math.random();
//       let chosenColor = color1;

//       if (randomColor > 0.6) chosenColor = color2;
//       if (randomColor > 0.9) chosenColor = color3;

//       col[i * 3] = chosenColor.r;
//       col[i * 3 + 1] = chosenColor.g;
//       col[i * 3 + 2] = chosenColor.b;
//     }
//     return [pos, col];
//   }, []);

//   useFrame((state, delta) => {
//     if (pointsRef.current) {
//       pointsRef.current.rotation.y += delta * 0.05;
//       pointsRef.current.rotation.x += delta * 0.02;
//     }
//   });

//   return (
//     <points ref={pointsRef}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={positions.length / 3}
//           array={positions}
//           itemSize={3}
//         />
//         <bufferAttribute
//           attach="attributes-color"
//           count={colors.length / 3}
//           array={colors}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial
//         size={0.05}
//         vertexColors
//         transparent
//         opacity={0.8}
//         sizeAttenuation={true}
//         blending={THREE.AdditiveBlending}
//         depthWrite={false}
//       />
//     </points>
//   );
// };

// // --- 3. ENHANCED ANIMATION VARIANTS ---
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.15, delayChildren: 0.2 },
//   },
// };

// const smoothFadeInUp = {
//   hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
//   visible: {
//     opacity: 1,
//     y: 0,
//     filter: "blur(0px)",
//     transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
//   },
// };

// const wordReveal = {
//   hidden: { opacity: 0, y: 20, rotateX: -40, filter: "blur(4px)" },
//   visible: {
//     opacity: 1,
//     y: 0,
//     rotateX: 0,
//     filter: "blur(0px)",
//     transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
//   },
// };

// // --- 4. MAIN HERO COMPONENT ---
// export function Hero() {
//   const titleWords = portfolioData.title.split(" ");

//   return (
//     <section className="min-h-screen flex items-center justify-center overflow-hidden relative bg-[#020617] md:cursor-none">
//       <PremiumCursor />

//       <div className="absolute inset-0 z-0 pointer-events-none">
//         <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
//           <HeroShaderBackground />
//         </Canvas>
//       </div>

//       <div className="container mx-auto px-4 relative z-10">
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <motion.div variants={smoothFadeInUp} className="mb-6">
//               <span className="inline-block py-1 px-3 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-sm font-medium tracking-wide mb-4 shadow-[0_0_15px_rgba(34,211,238,0.1)] backdrop-blur-sm">
//                 Welcome to my universe
//               </span>
//               <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-2 tracking-tight">
//                 {portfolioData.name}
//               </h1>
//             </motion.div>

//             <motion.div className="mb-6 perspective-1000">
//               <div className="flex flex-wrap gap-x-3 gap-y-1">
//                 {titleWords.map((word, i) => (
//                   <motion.span
//                     key={i}
//                     variants={wordReveal}
//                     className="text-2xl md:text-4xl font-semibold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent inline-block origin-bottom"
//                   >
//                     {word}
//                   </motion.span>
//                 ))}
//               </div>
//             </motion.div>

//             <motion.p
//               variants={smoothFadeInUp}
//               className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-lg font-light"
//             >
//               {portfolioData.bio}
//             </motion.p>

//             {/* Added md:cursor-none to all buttons to force-hide the browser hand! */}
//             <motion.div
//               variants={smoothFadeInUp}
//               className="flex gap-4 flex-wrap items-center mt-8"
//             >
//               <motion.a
//                 href="#projects"
//                 whileHover={{ scale: 1.02, backgroundColor: "#22d3ee" }}
//                 whileTap={{ scale: 0.98 }}
//                 className="md:cursor-none px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-300 group"
//               >
//                 View My Work
//                 <motion.div className="group-hover:translate-x-1 transition-transform">
//                   <ArrowRight size={18} />
//                 </motion.div>
//               </motion.a>

//               <motion.a
//                 href="/Pankaj_Thakur_Resume.pdf"
//                 download="Pankaj_Thakur_Resume.pdf"
//                 whileHover={{
//                   scale: 1.02,
//                   backgroundColor: "rgba(34, 211, 238, 0.1)",
//                 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="md:cursor-none px-8 py-3.5 border-2 border-cyan-500/80 text-cyan-400 font-semibold rounded-xl flex items-center gap-2 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300 group backdrop-blur-sm"
//               >
//                 Download CV
//                 <motion.div className="group-hover:-translate-y-1 transition-transform">
//                   <Download size={18} />
//                 </motion.div>
//               </motion.a>

//               <motion.a
//                 href="#contact"
//                 whileHover={{
//                   scale: 1.02,
//                   backgroundColor: "rgba(34, 211, 238, 0.05)",
//                 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="md:cursor-none px-8 py-3.5 border-2 border-cyan-500/30 text-cyan-400 font-semibold rounded-xl hover:border-cyan-400 transition-all duration-300 backdrop-blur-sm"
//               >
//                 Let{"'"}s Talk
//               </motion.a>
//             </motion.div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
//             animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
//             transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
//             className="hidden md:flex items-center justify-center relative w-full h-full min-h-[500px]"
//           >
//             <motion.div
//               animate={{ y: [-12, 12, -12] }}
//               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//               className="relative z-10 w-80 h-[420px]"
//             >
//               <div className="w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl shadow-cyan-900/40 relative group">
//                 <img
//                   src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
//                   alt="Pankaj Thakur"
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
//               </div>

//               <motion.div
//                 animate={{ y: [-8, 8, -8] }}
//                 transition={{
//                   duration: 5,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                   delay: 1,
//                 }}
//                 className="absolute -bottom-8 -left-12 z-20"
//               >
//                 <div className="backdrop-blur-xl bg-slate-950/70 border border-white/10 p-6 rounded-3xl shadow-2xl shadow-black/60 flex flex-col items-center justify-center">
//                   <p className="text-5xl font-extrabold bg-gradient-to-br from-cyan-300 to-blue-500 bg-clip-text text-transparent mb-1 drop-shadow-sm">
//                     3+
//                   </p>
//                   <p className="text-gray-300 text-xs font-semibold tracking-[0.2em] uppercase">
//                     Years Exp.
//                   </p>
//                 </div>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.5, duration: 1 }}
//         className="hidden md:flex absolute bottom-10 left-1/2 transform -translate-x-1/2 flex-col items-center gap-3 z-20"
//       >
//         <div className="w-[26px] h-[42px] rounded-[14px] border-2 border-[#0d4f6d] flex justify-center pt-[6px] backdrop-blur-sm bg-slate-950/20">
//           <motion.div
//             animate={{ y: [0, 12], opacity: [1, 0] }}
//             transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
//             className="w-1 h-1.5 bg-[#0ea5e9] rounded-full shadow-[0_0_8px_#0ea5e9]"
//           />
//         </div>
//         <span className="text-[9px] text-[#0d4f6d] font-bold uppercase tracking-[0.3em]">
//           Scroll
//         </span>
//       </motion.div>
//     </section>
//   );
// }
