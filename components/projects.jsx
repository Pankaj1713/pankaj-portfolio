"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import { portfolioData } from "@/lib/portfolio-data";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";

const hasExternalLink = (project) => Boolean(project.link) && project.link !== "#";

function FeaturedProjectCard({ project, position }) {
  return (
    <StaggerItem className="h-full">
      <TiltCard
        tiltDegrees={6}
        elevation={6}
        className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl transition-[border-color,box-shadow] duration-500 focus-within:border-cyan-400/40 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-950/40"
        contentClassName="relative z-10 flex h-full flex-col p-5 md:p-8"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-6 top-4 select-none text-7xl font-black leading-none text-white/[0.04] md:text-8xl"
        >
          {String(position).padStart(2, "0")}
        </span>

        <div className="mb-5 flex items-center justify-between gap-4">
          <span className="text-[10px] font-medium uppercase tracking-wider text-cyan-400 md:text-xs">
            {project.highlights}
          </span>
          {hasExternalLink(project) && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              className="group/link flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors duration-300 after:absolute after:inset-0 after:content-[''] hover:border-cyan-400/40 hover:text-cyan-400 focus-visible:border-cyan-400"
            >
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              />
            </a>
          )}
        </div>

        <h3 className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover/tilt:text-cyan-300 md:text-2xl">{project.title}</h3>
        <p className="mb-6 text-sm text-slate-400 md:text-base">{project.description}</p>

        <ul className="mt-auto flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <li
              key={technology}
              className="rounded-md border border-white/5 bg-slate-800/80 px-2 py-1 text-[10px] text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300 md:text-xs"
            >
              {technology}
            </li>
          ))}
        </ul>
      </TiltCard>
    </StaggerItem>
  );
}

function OtherProjectCard({ project }) {
  return (
    <StaggerItem className="h-full">
      <TiltCard
        tiltDegrees={0}
        elevation={3}
        className="h-full rounded-xl border border-white/5 bg-slate-900/50 transition-colors duration-300 focus-within:border-cyan-400/40 hover:border-cyan-500/30"
        contentClassName="relative z-10 flex h-full flex-col p-4"
      >
        <div className="mb-2 flex items-start justify-between gap-3">
          <h4 className="text-base text-white md:text-lg">{project.title}</h4>
          {hasExternalLink(project) && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              className="group/link text-slate-400 transition-colors after:absolute after:inset-0 after:content-[''] hover:text-cyan-400"
            >
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              />
            </a>
          )}
        </div>
        <p className="mb-4 text-xs text-slate-400 md:text-sm">{project.description}</p>
        <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-1">
          {project.technologies.slice(0, 3).map((technology) => (
            <li key={technology} className="text-[10px] text-cyan-400 transition-colors duration-200 hover:text-cyan-200">
              {technology}
            </li>
          ))}
        </ul>
      </TiltCard>
    </StaggerItem>
  );
}

export function Projects() {
  const featuredProjects = portfolioData.projects.filter((project) => project.featured);
  const otherProjects = portfolioData.projects.filter((project) => !project.featured);

  return (
    <AnimatedSection id="projects">
      <SectionHeader
        icon={Sparkles}
        eyebrow="Portfolio"
        title="Featured"
        highlight="Projects"
        description="Showcase of my best work across startups and enterprise apps."
      />

      <StaggerContainer
        staggerChildren={0.12}
        className="mb-16 grid grid-cols-1 gap-5 md:mb-24 md:gap-10 lg:grid-cols-2"
      >
        {featuredProjects.map((project, index) => (
          <FeaturedProjectCard key={project.id} project={project} position={index + 1} />
        ))}
      </StaggerContainer>

      {otherProjects.length > 0 && (
        <div>
          <h3 className="mb-6 text-center text-lg text-white md:text-left md:text-2xl">
            Other Projects
          </h3>
          <StaggerContainer
            staggerChildren={0.08}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {otherProjects.map((project) => (
              <OtherProjectCard key={project.id} project={project} />
            ))}
          </StaggerContainer>
        </div>
      )}
    </AnimatedSection>
  );
}
