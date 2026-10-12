"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { AmbientBackdrop } from "@/components/ambient-backdrop";
import { usePointerMotion } from "@/hooks/use-pointer-motion";

const StarfieldScene = dynamic(() => import("@/components/hero-scene"), { ssr: false });

let cachedWebGLSupport = null;

function detectWebGLSupport() {
  if (cachedWebGLSupport === null) {
    try {
      const probeCanvas = document.createElement("canvas");
      cachedWebGLSupport = Boolean(
        probeCanvas.getContext("webgl2") || probeCanvas.getContext("webgl"),
      );
    } catch {
      cachedWebGLSupport = false;
    }
  }
  return cachedWebGLSupport;
}

const subscribeToNothing = () => () => {};
const getServerWebGLSupport = () => false;

export function PageBackground() {
  const hasWebGL = useSyncExternalStore(
    subscribeToNothing,
    detectWebGLSupport,
    getServerWebGLSupport,
  );
  const prefersReducedMotion = useReducedMotion();
  const isPointerMotionEnabled = usePointerMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-[#020617]">
      <AmbientBackdrop />
      {hasWebGL && (
        <StarfieldScene
          frameloop={prefersReducedMotion ? "demand" : "always"}
          isPointerMotionEnabled={isPointerMotionEnabled}
        />
      )}
    </div>
  );
}
