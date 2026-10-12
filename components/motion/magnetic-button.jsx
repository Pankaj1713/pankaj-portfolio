"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePointerMotion } from "@/hooks/use-pointer-motion";

const magneticSpring = { stiffness: 260, damping: 20, mass: 0.5 };

export function MagneticButton({
  as = "a",
  strength = 0.2,
  className = "",
  children,
  ...rest
}) {
  const buttonRef = useRef(null);
  const boundsRef = useRef(null);
  const isPointerMotionEnabled = usePointerMotion();
  const offsetXTarget = useMotionValue(0);
  const offsetYTarget = useMotionValue(0);
  const offsetX = useSpring(offsetXTarget, magneticSpring);
  const offsetY = useSpring(offsetYTarget, magneticSpring);
  const MotionTag = motion[as];

  const handlePointerEnter = () => {
    boundsRef.current = buttonRef.current?.getBoundingClientRect() ?? null;
  };

  const handlePointerMove = (event) => {
    const bounds = boundsRef.current;
    if (!bounds) return;
    offsetXTarget.set((event.clientX - (bounds.left + bounds.width / 2)) * strength);
    offsetYTarget.set((event.clientY - (bounds.top + bounds.height / 2)) * strength);
  };

  const handlePointerLeave = () => {
    boundsRef.current = null;
    offsetXTarget.set(0);
    offsetYTarget.set(0);
  };

  return (
    <MotionTag
      ref={buttonRef}
      style={isPointerMotionEnabled ? { x: offsetX, y: offsetY } : undefined}
      whileTap={{ scale: 0.97 }}
      onPointerEnter={isPointerMotionEnabled ? handlePointerEnter : undefined}
      onPointerMove={isPointerMotionEnabled ? handlePointerMove : undefined}
      onPointerLeave={isPointerMotionEnabled ? handlePointerLeave : undefined}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
