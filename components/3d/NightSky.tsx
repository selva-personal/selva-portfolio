"use client";

import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export function NightSky({ reducedMotion }: { reducedMotion: boolean }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = reducedMotion ? 90 : 260;
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      array[i * 3] = (Math.random() - 0.5) * 220;
      array[i * 3 + 1] = Math.random() * 45 + 4;
      array[i * 3 + 2] = (Math.random() - 0.5) * 260 - 50;
    }
    return array;
  }, [reducedMotion]);

  useFrame((_, delta) => {
    if (reducedMotion || !points.current) return;
    points.current.rotation.y += delta * 0.008;
  });

  return (
    <>
      <color attach="background" args={["#040612"]} />
      <fog attach="fog" args={["#050818", 45, 230]} />
      <Stars
        radius={180}
        depth={60}
        count={reducedMotion ? 500 : 1600}
        factor={3.6}
        saturation={0.1}
        fade
        speed={reducedMotion ? 0 : 0.35}
      />
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          color="#93c5fd"
          transparent
          opacity={0.65}
          depthWrite={false}
        />
      </points>
    </>
  );
}
