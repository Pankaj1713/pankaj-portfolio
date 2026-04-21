"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/lib/portfolio-data";
import { ArrowRight, Download } from "lucide-react";

// --- Enhanced Animation Variants ---
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
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }, // Custom smooth spring-like easing
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

export function Hero() {
  const titleWords = portfolioData.title.split(" ");

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Welcome Tag */}
            <motion.div variants={smoothFadeInUp} className="mb-6">
              <span className="inline-block py-1 px-3 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-sm font-medium tracking-wide mb-4">
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
              {/* Primary: View Work */}
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02, backgroundColor: "#22d3ee" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl flex items-center gap-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-300 group"
              >
                View My Work
                <motion.div className="group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={18} />
                </motion.div>
              </motion.a>

              {/* Secondary: Download Resume */}
              <motion.a
                href="/Pankaj_Thakur_Resume.pdf"
                download="Pankaj_Thakur_Resume.pdf"
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(34, 211, 238, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 border-2 border-cyan-500 text-cyan-400 font-semibold rounded-xl flex items-center gap-2 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300 group backdrop-blur-sm"
              >
                Download CV
                <motion.div className="group-hover:-translate-y-1 transition-transform">
                  <Download size={18} />
                </motion.div>
              </motion.a>

              {/* Tertiary: Minimal Contact Link */}
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

          {/* Right side - Modern Morphing Decoration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="hidden md:flex items-center justify-center relative"
          >
            <div className="relative w-96 h-96">
              {/* Outer morphing blob */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  borderRadius: [
                    "60% 40% 30% 70%/60% 30% 70% 40%",
                    "30% 60% 70% 40%/50% 60% 30% 60%",
                    "60% 40% 30% 70%/60% 30% 70% 40%",
                  ],
                }}
                transition={{
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                  borderRadius: {
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="absolute inset-0 border-[1px] border-cyan-400/30 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 backdrop-blur-3xl"
              />

              {/* Counter-rotating inner ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 rounded-full border border-dashed border-blue-400/40 opacity-70"
              />

              {/* Glowing core */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-20 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-600/30 blur-2xl"
              />

              {/* Center Content */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <div className="text-center backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-2xl shadow-2xl">
                  <p className="text-5xl font-extrabold bg-gradient-to-br from-cyan-300 to-blue-500 bg-clip-text text-transparent mb-1">
                    3+
                  </p>
                  <p className="text-gray-300 text-sm font-medium tracking-wide uppercase">
                    Years Exp.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <div className="w-[30px] h-[50px] rounded-full border-2 border-cyan-400/30 flex justify-center pt-2 backdrop-blur-sm">
            <motion.div
              animate={{
                y: [0, 16, 0],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-3 bg-cyan-400 rounded-full"
            />
          </div>
          <span className="text-[10px] text-cyan-400/60 uppercase tracking-[0.2em] mt-3 font-medium">
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}
