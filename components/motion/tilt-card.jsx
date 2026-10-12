"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePointerMotion } from "@/hooks/use-pointer-motion";
import { springSmooth } from "@/lib/motion";

export function TiltCard({
  tiltDegrees = 8,
  elevation = 4,
  spotlight = true,
  className = "",
  contentClassName = "relative z-10 h-full",
  children,
  ...rest
}) {
  const cardRef = useRef(null);
  const isPointerMotionEnabled = usePointerMotion();
  const rotateXTarget = useMotionValue(0);
  const rotateYTarget = useMotionValue(0);
  const rotateX = useSpring(rotateXTarget, springSmooth);
  const rotateY = useSpring(rotateYTarget, springSmooth);

  const handlePointerMove = (event) => {
    const card = cardRef.current;
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width;
    const relativeY = (event.clientY - bounds.top) / bounds.height;

    card.style.setProperty("--spot-x", `${relativeX * 100}%`);
    card.style.setProperty("--spot-y", `${relativeY * 100}%`);
    rotateYTarget.set((relativeX - 0.5) * 2 * tiltDegrees);
    rotateXTarget.set((0.5 - relativeY) * 2 * tiltDegrees);
  };

  const handlePointerLeave = () => {
    rotateXTarget.set(0);
    rotateYTarget.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={
        isPointerMotionEnabled && tiltDegrees > 0
          ? { rotateX, rotateY, transformPerspective: 1000 }
          : undefined
      }
      whileHover={isPointerMotionEnabled && elevation ? { y: -elevation } : undefined}
      transition={springSmooth}
      onPointerMove={isPointerMotionEnabled ? handlePointerMove : undefined}
      onPointerLeave={isPointerMotionEnabled ? handlePointerLeave : undefined}
      className={`group/tilt relative ${className}`}
      {...rest}
    >
      {spotlight && (
        <>
          <div
            aria-hidden="true"
            className="spotlight-glow pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          />
          <div
            aria-hidden="true"
            className="spotlight-border pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          />
        </>
      )}
      <div className={contentClassName}>{children}</div>
    </motion.div>
  );
}
