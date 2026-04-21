"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/lib/portfolio-data";

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical <span className="text-cyan-400">Skills</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tools, languages, and technologies I{'\''}ve mastered over my career
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {portfolioData.skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: groupIndex * 0.1, duration: 0.6 }}
            >
              {/* Category Title */}
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                {skillGroup.category}
              </h3>

              {/* Skills */}
              <div className="space-y-6">
                {skillGroup.items.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -20 }
                    }
                    transition={{
                      delay: 0.2 + groupIndex * 0.1 + skillIndex * 0.05,
                    }}
                  >
                    {/* Skill name and proficiency */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-semibold">
                        {skill.name}
                      </span>
                      <span className="text-cyan-400 text-sm font-semibold">
                        {skill.proficiency}%
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={
                          isInView ? { width: `${skill.proficiency}%` } : { width: 0 }
                        }
                        transition={{
                          delay: 0.3 + groupIndex * 0.1 + skillIndex * 0.05,
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-400/50"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
            Education
          </h3>
          {portfolioData.education.map((edu, index) => (
            <motion.div
              key={index}
              whileHover={{ x: 10 }}
              className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-cyan-400/50 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xl font-bold text-white">{edu.degree}</h4>
                  <p className="text-cyan-400 font-semibold">{edu.field}</p>
                  <p className="text-gray-400 text-sm mt-1">{edu.school}</p>
                </div>
                <span className="text-gray-400 text-sm">{edu.year}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
