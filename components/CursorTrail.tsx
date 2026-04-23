"use client";

import { useEffect, useRef } from "react";

export default function CursorTrail() {
  const dotsRef = useRef<Array<HTMLDivElement | null>>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const dots = useRef(Array.from({ length: 20 }, () => ({ x: 0, y: 0 })));

  useEffect(() => {
    // 1. Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 2. Animate the dots using native requestAnimationFrame
    const animate = () => {
      let x = mouse.current.x;
      let y = mouse.current.y;

      dots.current.forEach((dot, index) => {
        // Smoothly interpolate the current dot towards the previous position
        dot.x += (x - dot.x) * 0.3;
        dot.y += (y - dot.y) * 0.3;

        // Set the target for the next dot to be this dot's new position
        x = dot.x;
        y = dot.y;

        // Directly manipulate the DOM for zero-latency rendering
        if (dotsRef.current[index]) {
          const scale = 1 - index / dots.current.length;
          // Subtracting half the width/height (6px) to perfectly center the dot on the cursor
          dotsRef.current[index]!.style.transform =
            `translate3d(${dot.x - 6}px, ${dot.y - 6}px, 0) scale(${scale})`;
        }
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {dots.current.map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            dotsRef.current[i] = el;
          }}
          // The base styles for the dots. Using Tailwind to create a glowing glass effect.
          className="absolute left-0 top-0 h-3 w-3 rounded-full bg-cyan-400 opacity-80 mix-blend-screen shadow-[0_0_10px_#22d3ee] will-change-transform"
        />
      ))}
    </div>
  );
}
