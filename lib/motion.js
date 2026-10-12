export const easeOutExpo = [0.16, 1, 0.3, 1];

export const viewportOnce = { once: true, amount: 0.2 };

export const springSmooth = { type: "spring", stiffness: 180, damping: 22, mass: 0.6 };

export function createRevealVariants({
  direction = "up",
  distance = 24,
  delay = 0,
  duration = 0.7,
} = {}) {
  const offsets = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  return {
    hidden: { opacity: 0, ...offsets[direction] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: easeOutExpo },
    },
  };
}

export function createStaggerContainerVariants({
  staggerChildren = 0.1,
  delayChildren = 0,
} = {}) {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  };
}

export const staggerItemVariants = createRevealVariants({ direction: "up", distance: 24 });

export const markerPopVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 20 },
  },
};
