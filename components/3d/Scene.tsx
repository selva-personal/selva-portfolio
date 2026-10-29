
"use client";

import { useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { CameraRig } from "@/components/3d/CameraRig";
import { Checkpoints } from "@/components/3d/Checkpoints";
import { Landscape } from "@/components/3d/Landscape";
import { NightSky } from "@/components/3d/NightSky";
import { SportsCar } from "@/components/3d/SportsCar";
import { useWorld } from "@/components/world/WorldContext";

export const Scene = React.memo(function Scene({
  reducedMotion = false,
}: {
  reducedMotion?: boolean;
}) {
  const carRef = useRef<THREE.Group | null>(null);
  const { setSceneReady } = useWorld();
  const { gl } = useThree();

  useEffect(() => {
    gl.setClearColor("#040612");
    const raf = requestAnimationFrame(() => {
      setSceneReady(true);
    });
    return () => cancelAnimationFrame(raf);
  }, [gl, setSceneReady]);

  return (
    <>
      <NightSky reducedMotion={reducedMotion} />

      {/* Balanced ambient starlight illumination */}
      <hemisphereLight args={["#60a5fa", "#030712", 0.6]} />

      {/* Main directional moonlight with shadows */}
      <directionalLight
        position={[24, 38, 16]}
        intensity={1.4}
        color="#c4b5fd"
        castShadow={!reducedMotion}
        shadow-bias={-0.0004}
        shadow-camera-near={0.5}
        shadow-camera-far={260}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Route corridor pathway lights (blue & purple theme) */}
      <pointLight position={[0, 9, 6]} intensity={5.5} color="#818cf8" distance={55} />
      <pointLight position={[6, 9, -55]} intensity={5.5} color="#2563eb" distance={65} />
      <pointLight position={[-6, 9, -115]} intensity={5.5} color="#6366f1" distance={65} />
      <pointLight position={[4, 9, -175]} intensity={5.5} color="#8b5cf6" distance={60} />

      <Landscape />
      <SportsCar carRef={carRef} />
      <Checkpoints carRef={carRef} />
      <CameraRig carRef={carRef} />
    </>
  );
});
