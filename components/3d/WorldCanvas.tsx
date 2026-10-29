
"use client";

import { Canvas } from "@react-three/fiber";
import React, { Suspense, useMemo } from "react";
import * as THREE from "three";
import { Scene } from "@/components/3d/Scene";
import { useWorld } from "@/components/world/WorldContext";

type WorldCanvasProps = {
  reducedMotion?: boolean;
};

export const WorldCanvas = React.memo(function WorldCanvas({
  reducedMotion: propReducedMotion,
}: WorldCanvasProps) {
  const world = useWorld();
  const reducedMotion = propReducedMotion ?? world.reducedMotion;

const glSettings = useMemo(
  () => ({
    antialias: false,
    alpha: false,
    powerPreference: "default" as const,
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 1.15,
  }),
  [],
);

  const cameraSettings = useMemo(
    () => ({
      position: [0, 5, 18] as [number, number, number],
      fov: 52,
      near: 0.1,
      far: 270,
    }),
    [],
  );

  const dpr = useMemo(
    () => (reducedMotion ? ([1, 1] as [number, number]) : ([1, 1.5] as [number, number])),
    [reducedMotion],
  );

  return (
    <Canvas
  shadows={!reducedMotion}
  dpr={dpr}
  camera={cameraSettings}
  gl={glSettings}
  performance={{ min: 0.5, max: 1, debounce: 200 }}
  style={{ width: "100%", height: "100%" }}
>
  <Suspense fallback={null}>
    <Scene reducedMotion={reducedMotion} />
  </Suspense>
</Canvas>
  );
});
