"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/lib/portfolio-data";

// --- UNIVERSAL SCROLL VARIANTS ---
const sectionContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Controls the stagger for an individual timeline item (Dot -> Line -> Card)
const timelineItemContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const smoothFadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const timelineLine = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 1, ease: "easeInOut" },
  },
};

export function Experience() {
  return (
    <section
      id="experience"
      className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Section Title - Triggers once when the section top hits the viewport */}
        <motion.div
          variants={sectionContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={smoothFadeUp}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Work <span className="text-cyan-400">Experience</span>
          </motion.h2>
          <motion.p
            variants={smoothFadeUp}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Building scalable products and leading teams across multiple
            organizations
          </motion.p>
        </motion.div>

        {/* Timeline Wrapper - Note: No animation trigger here! */}
        <div className="max-w-3xl mx-auto pl-4 md:pl-0">
          {portfolioData.experience.map((exp, index) => (
            /* THE FIX: 
               Each individual experience block gets its own scroll trigger.
               It will only animate when THIS specific block enters the screen. 
            */
            <motion.div
              key={exp.id}
              variants={timelineItemContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }} // Triggers when this block is 100px from the bottom
              className="relative mb-12"
            >
              {/* Timeline marker with scale animation */}
              <motion.div
                variants={{
                  hidden: { scale: 0, opacity: 0 },
                  visible: {
                    scale: 1,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  },
                }}
                className="absolute left-0 top-0 w-4 h-4 bg-cyan-400 rounded-full transform -translate-x-6 mt-2 shadow-[0_0_15px_rgba(34,211,238,0.5)] z-10"
              />

              {/* Timeline line that draws downwards */}
              {index !== portfolioData.experience.length - 1 && (
                <motion.div
                  variants={timelineLine}
                  className="absolute left-0 top-6 w-[2px] h-[calc(100%+1.5rem)] bg-gradient-to-b from-cyan-400/80 to-cyan-400/10 transform -translate-x-[7px] origin-top"
                />
              )}

              {/* Content card */}
              <motion.div
                variants={smoothFadeUp}
                whileHover={{ x: 8, backgroundColor: "rgba(15, 23, 42, 0.8)" }}
                className="ml-6 md:ml-8 bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-400/40 transition-colors duration-300 backdrop-blur-sm"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {exp.position}
                    </h3>
                    <p className="text-cyan-400 font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-400 bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-lg whitespace-nowrap self-start">
                    {exp.type}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-4 font-mono">
                  {exp.duration}
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {exp.description}
                </p>

                {/* Highlights staggering in one by one */}
                <ul className="space-y-3">
                  {exp.highlights.map((highlight, i) => (
                    <motion.li
                      key={i}
                      variants={smoothFadeUp}
                      className="text-gray-400 text-sm flex items-start group"
                    >
                      <span className="text-cyan-400 mr-3 mt-0.5 group-hover:translate-x-1 transition-transform">
                        ▹
                      </span>
                      <span className="leading-relaxed">{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
