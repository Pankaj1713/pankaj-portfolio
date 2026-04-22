"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { portfolioData } from "@/lib/portfolio-data";
import { Cpu, GraduationCap, Code2 } from "lucide-react";

// --- 1. THE 3D SHADER BACKGROUND ---
const SkillsShaderBackground = () => {
  const materialRef = useRef(null);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor1: { value: new THREE.Color("#020617") },
          uColor2: { value: new THREE.Color("#06b6d4") },
          uColor3: { value: new THREE.Color("#8b5cf6") }, // Slightly deeper purple for contrast
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
            // Distinct flow pattern for the skills section
            vec2 pos = vec2(vUv.x * 2.0, vUv.y * 3.0);
            float noise = snoise(pos + uTime * 0.1);
            
            vec3 mixedColor = mix(uColor1, uColor2, smoothstep(0.2, 0.8, noise));
            vec3 finalColor = mix(mixedColor, uColor3, smoothstep(0.6, 1.0, noise));
            
            float vignette = smoothstep(1.3, 0.1, distance(vUv, vec2(0.5)));
            
            gl_FragColor = vec4(finalColor, vignette * 0.45);
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

// --- 2. INTERACTIVE SPOTLIGHT CARD COMPONENT ---
function SpotlightCard({ children, className = "" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/30 backdrop-blur-xl group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(34, 211, 238, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 border border-cyan-400/0 mix-blend-overlay"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              rgba(34, 211, 238, 0.3),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

// --- 3. MAIN SKILLS COMPONENT ---
export function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen bg-[#020617] overflow-hidden"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <SkillsShaderBackground />
        </Canvas>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-sm font-medium tracking-wide mb-6 backdrop-blur-md">
            <Cpu size={16} />
            Expertise
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Skills
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
            Tools, languages, and architectures I've mastered over my career.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-24">
          {portfolioData.skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: groupIndex * 0.1, duration: 0.6 }}
            >
              <SpotlightCard className="p-8">
                {/* Category Title */}
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                    <Code2 size={20} />
                  </span>
                  {skillGroup.category}
                </h3>

                {/* Skills List */}
                <div className="space-y-8">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <div key={skillIndex} className="relative">
                      {/* Skill Header */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-slate-200 font-medium tracking-wide">
                          {skill.name}
                        </span>
                        <span className="text-cyan-400 font-mono text-sm">
                          {skill.proficiency}%
                        </span>
                      </div>

                      {/* Premium Neon Progress Bar */}
                      <div className="relative w-full h-[3px] bg-slate-800 rounded-full overflow-visible">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.2 + skillIndex * 0.1,
                            duration: 1,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex justify-end items-center"
                        >
                          {/* Glowing tip */}
                          <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_2px_rgba(34,211,238,0.8)] absolute -right-1" />
                        </motion.div>

                        {/* Underglow Effect for the bar */}
                        <motion.div
                          initial={{ width: 0, opacity: 0 }}
                          whileInView={{
                            width: `${skill.proficiency}%`,
                            opacity: 0.5,
                          }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.2 + skillIndex * 0.1,
                            duration: 1,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="absolute top-0 left-0 h-full bg-cyan-400 blur-sm rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-10 justify-center">
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-white/10" />
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-cyan-400">
                <GraduationCap size={24} />
              </span>
              Academic Background
            </h3>
            <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {portfolioData.education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-bold text-white leading-tight">
                        {edu.degree}
                      </h4>
                      <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-cyan-400 ml-4 whitespace-nowrap">
                        {edu.year}
                      </span>
                    </div>
                    <p className="text-cyan-400 font-medium mb-2">
                      {edu.field}
                    </p>
                    <p className="text-slate-400 text-sm font-light leading-relaxed">
                      {edu.school}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
