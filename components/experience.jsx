"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Briefcase } from "lucide-react";
import { portfolioData } from "@/lib/portfolio-data";
import { markerPopVariants } from "@/lib/motion";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";

function TimelineTrack({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const headPosition = useTransform(progress, (value) => `${value * 100}%`);

  return (
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-5 top-0 w-[2px] md:left-1/3"
    >
      <div className="absolute inset-0 rounded-full bg-slate-800/60" />
      <motion.div
        style={{ scaleY: progress }}
        className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_22px_rgba(34,211,238,0.6)]"
      />
      <motion.span
        style={{ top: headPosition }}
        className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_18px_6px_rgba(34,211,238,0.55)]"
      />
    </div>
  );
}

function ExperienceEntry({ experience }) {
  return (
    <StaggerContainer
      as="article"
      staggerChildren={0.12}
      className="group relative flex flex-col md:flex-row"
    >
      <motion.span
        data-reveal
        variants={markerPopVariants}
        aria-hidden="true"
        className="absolute left-[16px] top-2 z-10 h-[10px] w-[10px] rounded-full border-2 border-cyan-400 bg-slate-950 transition-[background-color,box-shadow] duration-300 group-hover:bg-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,1)] md:left-[calc(33.333%-4px)]"
      />

      <StaggerItem
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
        }}
        className="flex h-fit flex-col items-start pl-12 pt-1 text-left md:sticky md:top-32 md:w-1/3 md:items-end md:pl-0 md:pr-12 md:text-right"
      >
        <p className="mb-2 font-mono text-sm font-semibold uppercase tracking-widest text-cyan-400">
          {experience.duration}
        </p>
        <h3 className="mb-1 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-300">{experience.company}</h3>
        <span className="inline-block rounded-full border border-slate-600 bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-300 shadow-lg backdrop-blur-md">
          {experience.type}
        </span>
      </StaggerItem>

      <StaggerItem className="mt-6 pl-12 md:mt-0 md:w-2/3 md:pl-16">
        <TiltCard
          tiltDegrees={3}
          elevation={3}
          className="rounded-3xl border border-white/10 bg-slate-950/50 shadow-2xl shadow-black/50 backdrop-blur-xl transition-colors duration-500 hover:border-cyan-400/30"
          contentClassName="relative z-10 p-6 md:p-8"
        >
          <h4 className="mb-4 text-xl font-bold text-white transition-colors duration-300 group-hover/tilt:text-cyan-300 md:text-2xl">{experience.position}</h4>
          <p className="mb-6 font-light leading-relaxed text-slate-300">{experience.description}</p>
          <StaggerContainer as="ul" staggerChildren={0.1} delayChildren={0.2} className="space-y-4">
            {experience.highlights.map((highlight) => (
              <StaggerItem as="li" key={highlight} className="flex items-start text-slate-300 transition-[translate,color] duration-300 hover:translate-x-1 hover:text-white">
                <span className="mr-4 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                <span className="text-sm font-light leading-relaxed md:text-base">{highlight}</span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </TiltCard>
      </StaggerItem>
    </StaggerContainer>
  );
}

export function Experience() {
  const timelineRef = useRef(null);

  return (
    <AnimatedSection id="experience">
      <SectionHeader
        icon={Briefcase}
        eyebrow="Career Journey"
        title="Where I've"
        highlight="Built"
      />
      <div ref={timelineRef} className="relative mx-auto max-w-5xl">
        <TimelineTrack containerRef={timelineRef} />
        <div className="flex flex-col gap-16 md:gap-24">
          {portfolioData.experience.map((experience) => (
            <ExperienceEntry key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
