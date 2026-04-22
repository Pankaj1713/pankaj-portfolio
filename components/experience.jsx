"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { portfolioData } from "@/lib/portfolio-data";
import { Briefcase } from "lucide-react";

// --- 1. THE WEBGL SHADER COMPONENT ---
const ScrollReactiveBackground = ({ scrollProgress }) => {
  const materialRef = useRef();

  // Custom GLSL Shader Material
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uScroll: { value: 0 }, // We will feed the scroll progress here!
          uColor1: { value: new THREE.Color("#020617") }, // Slate 950 (Dark base)
          uColor2: { value: new THREE.Color("#06b6d4") }, // Cyan 400
          uColor3: { value: new THREE.Color("#a855f7") }, // Purple 500
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
          uniform float uScroll;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;
          varying vec2 vUv;

          // Classic 2D Perlin Noise
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
            // The magic: Noise moves over time, but ALSO distorts based on scroll!
            float dynamicScroll = uScroll * 3.0; 
            vec2 pos = vec2(vUv.x * 3.0, vUv.y * 2.0 - dynamicScroll);
            float noise = snoise(pos + uTime * 0.15);
            
            // Mix colors based on noise and scroll depth
            vec3 mixedColor = mix(uColor1, uColor2, smoothstep(0.0, 0.8, noise));
            vec3 finalColor = mix(mixedColor, uColor3, smoothstep(0.5, 1.0, noise + (uScroll * 0.5)));
            
            // Soft vignette edges so it fades beautifully into the background
            float vignette = smoothstep(1.0, 0.2, distance(vUv, vec2(0.5)));
            
            gl_FragColor = vec4(finalColor, vignette * 0.4); // 0.4 keeps it subtle so text is readable
          }
        `,
        transparent: true,
        depthWrite: false,
      }),
    [],
  );

  useFrame((state) => {
    if (materialRef.current) {
      // 1. Update time for ambient movement
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // 2. Sync Framer Motion scroll value to WebGL!
      materialRef.current.uniforms.uScroll.value = scrollProgress.get();
    }
  });

  return (
    <mesh>
      {/* A massive plane that covers the entire background */}
      <planeGeometry args={[25, 25]} />
      <primitive object={material} ref={materialRef} attach="material" />
    </mesh>
  );
};

// --- 2. MAIN EXPERIENCE COMPONENT ---
export function Experience() {
  const containerRef = useRef(null);

  // Track scroll progress to drive both the glowing line AND the 3D Shader
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      className="relative bg-[#020617] overflow-hidden min-h-screen"
    >
      {/* --- THE 3D CANVAS BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ScrollReactiveBackground scrollProgress={scrollYProgress} />
        </Canvas>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-sm font-medium tracking-wide mb-6 backdrop-blur-md">
            <Briefcase size={16} />
            Career Journey
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg">
            Where I've{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Built
            </span>
          </h2>
        </motion.div>

        {/* Dynamic Timeline Container */}
        <div ref={containerRef} className="max-w-5xl mx-auto relative">
          {/* THE TRACK: Faint background line */}
          <div className="absolute left-[20px] md:left-1/3 top-0 bottom-0 w-[2px] bg-slate-800/50 backdrop-blur-sm" />

          {/* THE PROGRESS: Glowing line that fills on scroll */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[20px] md:left-1/3 top-0 w-[2px] bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_25px_rgba(34,211,238,0.7)] origin-top"
          />

          {/* Experience Items */}
          <div className="flex flex-col gap-16 md:gap-24">
            {portfolioData.experience.map((exp, index) => (
              <div
                key={exp.id}
                className="relative flex flex-col md:flex-row group"
              >
                {/* Glowing Node on the timeline */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute left-[16px] md:left-[calc(33.333%-5px)] top-2 w-[10px] h-[10px] rounded-full bg-slate-950 border-2 border-cyan-400 z-10 group-hover:bg-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,1)] transition-all duration-300"
                />

                {/* Left Side: Sticky Date & Company (Desktop only) */}
                <div className="md:w-1/3 pl-12 md:pl-0 md:pr-12 flex flex-col items-start md:items-end text-left md:text-right pt-1 sticky top-32 h-fit">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <p className="text-cyan-400 font-mono text-sm font-semibold tracking-widest uppercase mb-2 drop-shadow-md">
                      {exp.duration}
                    </p>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {exp.company}
                    </h3>
                    <span className="inline-block text-xs font-medium text-slate-300 bg-slate-800/80 backdrop-blur-md border border-slate-600 px-3 py-1 rounded-full shadow-lg">
                      {exp.type}
                    </span>
                  </motion.div>
                </div>

                {/* Right Side: Experience Details Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="md:w-2/3 pl-12 md:pl-16 mt-6 md:mt-0"
                >
                  {/* Premium Glassmorphism Card */}
                  <div className="relative p-8 rounded-3xl bg-slate-950/40 backdrop-blur-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-500 overflow-hidden shadow-2xl shadow-black/50 group/card">
                    {/* Subtle hover gradient inside the card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <h4 className="text-xl md:text-2xl font-bold text-white mb-4">
                        {exp.position}
                      </h4>
                      <p className="text-slate-300 leading-relaxed mb-6 font-light">
                        {exp.description}
                      </p>

                      <ul className="space-y-4">
                        {exp.highlights.map((highlight, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="flex items-start text-slate-300"
                          >
                            <span className="flex-shrink-0 mt-1.5 mr-4 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                            <span className="leading-relaxed text-sm md:text-base font-light">
                              {highlight}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
