"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/lib/portfolio-data";
import { ArrowRight, Download } from "lucide-react";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// --- 1. THE 3D SHADER BACKGROUND ---
const HeroShaderBackground = () => {
  const materialRef = useRef(null);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor1: { value: new THREE.Color("#020617") }, // Deep slate background
          uColor2: { value: new THREE.Color("#06b6d4") }, // Cyan glow
          uColor3: { value: new THREE.Color("#3b82f6") }, // Blue glow
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
          uniform vec3 uColor3;
          varying vec2 vUv;

          // Smooth Perlin 2D Noise
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
            // Create a slow, flowing liquid effect
            vec2 pos = vec2(vUv.x * 2.5, vUv.y * 2.0);
            float noise = snoise(pos + uTime * 0.15);
            
            // Blend colors organically
            vec3 mixedColor = mix(uColor1, uColor2, smoothstep(0.1, 0.9, noise));
            vec3 finalColor = mix(mixedColor, uColor3, smoothstep(0.4, 1.0, noise));
            
            // Soft vignette so it fades into darkness at the edges
            float vignette = smoothstep(1.2, 0.1, distance(vUv, vec2(0.5)));
            
            gl_FragColor = vec4(finalColor, vignette * 0.6); // 0.6 keeps the shader subtle behind the text
          }
        `,
        transparent: true,
        depthWrite: false,
      }),
    [],
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[25, 25]} />
      <primitive object={material} ref={materialRef} attach="material" />
    </mesh>
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
