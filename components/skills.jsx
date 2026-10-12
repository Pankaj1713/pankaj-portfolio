"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useState } from "react";
import { portfolioData } from "@/lib/portfolio-data";
import { Cpu, GraduationCap, Code2 } from "lucide-react";

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
      className="relative min-h-screen overflow-hidden"
    >

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
