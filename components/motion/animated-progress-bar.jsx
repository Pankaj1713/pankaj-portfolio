"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

export function AnimatedProgressBar({ label, value, delay = 0 }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={containerRef}>
      <div className="mb-3 flex items-center justify-between">
        <span className="font-medium tracking-wide text-slate-200">{label}</span>
        <span className="font-mono text-sm text-cyan-400">{value}%</span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        className="relative h-[3px] w-full rounded-full bg-slate-800"
      >
        <motion.div
          initial={{ width: "0%" }}
          animate={isInView ? { width: `${value}%` } : undefined}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 1.1, delay, ease: easeOutExpo }
          }
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_12px_rgba(34,211,238,0.55)]"
        >
          <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_2px_rgba(34,211,238,0.8)]" />
        </motion.div>
      </div>
    </div>
  );
}
