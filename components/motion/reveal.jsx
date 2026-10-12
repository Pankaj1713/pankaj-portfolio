"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  createRevealVariants,
  createStaggerContainerVariants,
  staggerItemVariants,
  viewportOnce,
} from "@/lib/motion";

export function Reveal({
  as = "div",
  direction = "up",
  distance = 24,
  delay = 0,
  duration = 0.7,
  className,
  children,
  ...rest
}) {
  const MotionTag = motion[as];
  const variants = useMemo(
    () => createRevealVariants({ direction, distance, delay, duration }),
    [direction, distance, delay, duration],
  );

  return (
    <MotionTag
      data-reveal
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerContainer({
  as = "div",
  staggerChildren = 0.1,
  delayChildren = 0,
  className,
  children,
  ...rest
}) {
  const MotionTag = motion[as];
  const variants = useMemo(
    () => createStaggerContainerVariants({ staggerChildren, delayChildren }),
    [staggerChildren, delayChildren],
  );

  return (
    <MotionTag
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  as = "div",
  variants = staggerItemVariants,
  className,
  children,
  ...rest
}) {
  const MotionTag = motion[as];

  return (
    <MotionTag data-reveal variants={variants} className={className} {...rest}>
      {children}
    </MotionTag>
  );
}
