"use client";

import { useSyncExternalStore } from "react";

const POINTER_MOTION_QUERY =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange) {
  const mediaQuery = window.matchMedia(POINTER_MOTION_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(POINTER_MOTION_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function usePointerMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
