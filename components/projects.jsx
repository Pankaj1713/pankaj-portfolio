"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";
import { portfolioData } from "@/lib/portfolio-data";
import {
  ExternalLink,
  Cpu,
  GraduationCap,
  Code2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

/* =========================
   MOBILE DETECTION
========================= */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return isMobile;
};

/* =========================
   3D BACKGROUND (DESKTOP ONLY)
========================= */
function ParticleNetwork() {
  const points = useRef();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(900); // reduced for performance
    for (let i = 0; i < 900; i++) {
      positions[i] = (Math.random() - 0.5) * 8;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.03;
      points.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.03) * 0.15;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#22d3ee"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* =========================
   MAIN COMPONENT
========================= */
export function Projects() {
  const featuredProjects = portfolioData.projects.filter((p) => p.featured);
  const otherProjects = portfolioData.projects.filter((p) => !p.featured);

  const isMobile = useIsMobile();

  return (
    <section
      id="projects"
      className="relative w-full bg-[#020617] overflow-hidden"
    >
      {/* 🔥 Disable 3D on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
            <ParticleNetwork />
          </Canvas>
        </div>
      )}

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-12 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs md:text-sm mb-4">
            <Sparkles size={14} />
            Portfolio
          </div>

          <h2 className="text-3xl md:text-6xl font-extrabold text-white mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <p className="text-slate-400 text-sm md:text-lg max-w-xl">
            Showcase of my best work across startups and enterprise apps.
          </p>
        </motion.div>

        {/* FEATURED PROJECTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10 mb-16 md:mb-24">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-5 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl hover:border-cyan-500/30 transition-all">
                {/* TOP */}
                <div className="flex justify-between items-center mb-5">
                  <span className="text-[10px] md:text-xs text-cyan-400 uppercase">
                    {project.highlights}
                  </span>

                  {project.link && (
                    <a href={project.link}>
                      <ArrowUpRight size={18} />
                    </a>
                  )}
                </div>

                {/* TITLE */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  {project.title}
                </h3>

                {/* DESC */}
                <p className="text-sm md:text-base text-slate-400 mb-6">
                  {project.description}
                </p>

                {/* TECH */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] md:text-xs text-slate-300 bg-slate-800 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* OTHER PROJECTS */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-lg md:text-2xl text-white mb-6 text-center md:text-left">
              Other Projects
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-xl bg-slate-900/50 border border-white/5"
                >
                  <h4 className="text-base md:text-lg text-white mb-2">
                    {project.title}
                  </h4>

                  <p className="text-xs md:text-sm text-slate-400 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-[10px] text-cyan-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
