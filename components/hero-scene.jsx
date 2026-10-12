"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const DESKTOP_MIN_WIDTH = 768;
const STAR_PALETTE = ["#06b6d4", "#3b82f6", "#ffffff"];

function createSeededRandom(seed) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let mixed = Math.imul(state ^ (state >>> 15), 1 | state);
    mixed = (mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed)) ^ mixed;
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
}

function createStarAttributes(count, seed) {
  const random = createSeededRandom(seed);
  const palette = STAR_PALETTE.map((hex) => new THREE.Color(hex));
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = (random() - 0.5) * 28;
    positions[index * 3 + 1] = (random() - 0.5) * 18;
    positions[index * 3 + 2] = -12 + random() * 14;

    const roll = random();
    const color = roll > 0.9 ? palette[2] : roll > 0.6 ? palette[1] : palette[0];
    colors[index * 3] = color.r;
    colors[index * 3 + 1] = color.g;
    colors[index * 3 + 2] = color.b;
  }

  return { positions, colors };
}

function StarLayer({ count, seed, size, opacity, parallax, spin, pointerRef }) {
  const groupRef = useRef(null);
  const { positions, colors } = useMemo(() => createStarAttributes(count, seed), [count, seed]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    group.rotation.z += delta * spin;
    const targetX = pointerRef.current.x * parallax;
    const targetY = pointerRef.current.y * parallax;
    group.position.x = THREE.MathUtils.damp(group.position.x, targetX, 3, delta);
    group.position.y = THREE.MathUtils.damp(group.position.y, targetY, 3, delta);
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={size}
          vertexColors
          transparent
          opacity={opacity}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function PointerTracker({ pointerRef, isEnabled }) {
  useEffect(() => {
    if (!isEnabled) return undefined;
    const handlePointerMove = (event) => {
      pointerRef.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerRef.current.y = (0.5 - event.clientY / window.innerHeight) * 2;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [isEnabled, pointerRef]);

  return null;
}

function Starfield({ pointerRef, isCompact }) {
  const scale = isCompact ? 0.5 : 1;

  return (
    <>
      <StarLayer
        count={Math.round(900 * scale)}
        seed={7}
        size={0.045}
        opacity={0.55}
        parallax={0.25}
        spin={0.004}
        pointerRef={pointerRef}
      />
      <StarLayer
        count={Math.round(260 * scale)}
        seed={21}
        size={0.075}
        opacity={0.8}
        parallax={0.7}
        spin={0.008}
        pointerRef={pointerRef}
      />
    </>
  );
}

function SceneContents({ pointerRef, isPointerMotionEnabled }) {
  const size = useThree((state) => state.size);
  const isCompact = size.width < DESKTOP_MIN_WIDTH;

  return (
    <>
      <PointerTracker pointerRef={pointerRef} isEnabled={isPointerMotionEnabled} />
      <Starfield pointerRef={pointerRef} isCompact={isCompact} />
    </>
  );
}

export default function HeroScene({ frameloop, isPointerMotionEnabled }) {
  const pointerRef = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      className="!absolute inset-0"
    >
      <SceneContents pointerRef={pointerRef} isPointerMotionEnabled={isPointerMotionEnabled} />
    </Canvas>
  );
}
