"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { portfolioData } from "@/lib/portfolio-data";
import { easeOutExpo } from "@/lib/motion";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { TiltCard } from "@/components/motion/tilt-card";

const contentVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const blurFadeUpVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

const nameWordVariants = {
  hidden: { opacity: 0, y: "60%", filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

const portraitVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.8, rotateY: -14, filter: "blur(20px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, delay: 0.3, ease: easeOutExpo },
  },
};

const buttonBaseClassName =
  "cta-sheen group inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-semibold transition-shadow duration-300";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const nameWords = portfolioData.name.split(" ");

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="container relative z-10 mx-auto px-4 pb-20 pt-28 md:pb-12">
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-12 md:grid-cols-2"
        >
          <div>
            <motion.span
              data-reveal
              variants={blurFadeUpVariants}
              className="mb-5 inline-block rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm font-medium tracking-wide text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)] backdrop-blur-sm transition-[scale,box-shadow] duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]"
            >
              Welcome to my universe
            </motion.span>

            <h1 className="mb-3 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-7xl">
              {nameWords.map((word) => (
                <span key={word} className="mr-[0.25em] inline-block overflow-hidden py-1 align-bottom">
                  <motion.span data-reveal variants={nameWordVariants} className="inline-block transition-colors duration-300 hover:text-cyan-200">
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              data-reveal
              variants={blurFadeUpVariants}
              className="gradient-text-flow mb-6 text-2xl font-semibold md:text-4xl"
            >
              {portfolioData.title}
            </motion.p>

            <motion.p
              data-reveal
              variants={blurFadeUpVariants}
              className="mb-10 max-w-lg text-lg font-light leading-relaxed text-gray-400 md:text-xl"
            >
              {portfolioData.bio}
            </motion.p>

            <motion.div
              data-reveal
              variants={blurFadeUpVariants}
              className="flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                href="#projects"
                className={`${buttonBaseClassName} cta-gradient text-white shadow-lg shadow-cyan-500/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]`}
              >
                View My Work
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </MagneticButton>

              <MagneticButton
                href="/Pankaj_Thakur_Resume.pdf"
                download="Pankaj_Thakur_Resume.pdf"
                className={`${buttonBaseClassName} border-2 border-cyan-500/80 text-cyan-400 backdrop-blur-sm hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]`}
              >
                Download CV
                <Download
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </MagneticButton>

              <MagneticButton
                href="#contact"
                className={`${buttonBaseClassName} border-2 border-cyan-500/30 text-cyan-400 backdrop-blur-sm hover:border-cyan-400 hover:bg-cyan-400/5`}
              >
                Let{"'"}s Talk
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            data-reveal
            variants={portraitVariants}
            style={{ transformPerspective: 1200 }}
            className="relative hidden min-h-[500px] w-full items-center justify-center md:flex"
          >
            <motion.div
              animate={prefersReducedMotion ? undefined : { y: [-10, 10] }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
              className="relative z-10"
            >
              <TiltCard
                tiltDegrees={9}
                elevation={0}
                spotlight={false}
                className="h-[420px] w-80"
                contentClassName="relative h-full"
              >
                <div
                  aria-hidden="true"
                  className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-cyan-500/30 via-blue-600/20 to-purple-600/20 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 translate-x-5 translate-y-5 rounded-[2.5rem] border border-cyan-400/20"
                />
                <div className="group relative h-full w-full overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl shadow-cyan-900/40">
                  <Image
                    src="/profile.png"
                    alt="Pankaj Thakur"
                    width={1820}
                    height={2125}
                    priority
                    sizes="320px"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                </div>

                <motion.div
                  animate={prefersReducedMotion ? undefined : { y: [-6, 6] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: 0.8,
                  }}
                  className="absolute -bottom-8 -left-12 z-20"
                >
                  <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/60 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]">
                    <p className="mb-1 bg-gradient-to-br from-cyan-300 to-blue-500 bg-clip-text text-5xl font-extrabold text-transparent">
                      4+
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-300">
                      Years Exp.
                    </p>
                  </div>
                </motion.div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#experience"
        aria-label="Scroll to experience"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="flex h-[42px] w-[26px] justify-center rounded-[14px] border-2 border-[#0d4f6d] bg-slate-950/20 pt-[6px] backdrop-blur-sm">
          <motion.span
            animate={prefersReducedMotion ? undefined : { y: [0, 12], opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="h-1.5 w-1 rounded-full bg-[#0ea5e9] shadow-[0_0_8px_#0ea5e9]"
          />
        </span>
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#2b7fa0]">Scroll</span>
      </motion.a>
    </section>
  );
}
