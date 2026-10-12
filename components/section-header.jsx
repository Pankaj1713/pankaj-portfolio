"use client";

import { StaggerContainer, StaggerItem } from "@/components/motion/reveal";

export function SectionHeader({ icon: Icon, eyebrow, title, highlight, description }) {
  return (
    <StaggerContainer
      staggerChildren={0.1}
      className="mb-14 flex flex-col items-center text-center md:mb-20"
    >
      <StaggerItem className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium tracking-wide text-cyan-400 backdrop-blur-md transition-[scale,background-color,box-shadow] duration-300 hover:scale-105 hover:bg-cyan-400/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]">
        <Icon size={16} />
        {eyebrow}
      </StaggerItem>
      <StaggerItem as="h2" className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
        {title}{" "}
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          {highlight}
        </span>
      </StaggerItem>
      {description && (
        <StaggerItem as="p" className="max-w-2xl text-base font-light text-gray-400 md:text-lg">
          {description}
        </StaggerItem>
      )}
    </StaggerContainer>
  );
}
