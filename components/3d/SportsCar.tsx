"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { useWorld } from "@/components/world/WorldContext";
import { createRoadCurve } from "@/lib/world-path";

type SportsCarProps = {
  carRef: MutableRefObject<THREE.Group | null>;
};

export function SportsCar({ carRef }: SportsCarProps) {
  const inner = useRef<THREE.Group>(null);
  const wheels = useRef<THREE.Mesh[]>([]);
  const { exploreMode, input, resetToken, reducedMotion } = useWorld();
  const velocity = useRef(0);
  const heading = useRef(0);
  const autoT = useRef(0.02);
  const curve = useMemo(() => createRoadCurve(), []);
  const autoPoint = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    velocity.current = 0;
    heading.current = 0;
    autoT.current = 0.02;
    const start = curve.getPointAt(0.02);
    const tangent = curve.getTangentAt(0.02);
    if (carRef.current) {
      carRef.current.position.copy(start);
      carRef.current.position.y = 0.38;
      heading.current = Math.atan2(tangent.x, tangent.z);
      carRef.current.rotation.y = heading.current;
    }
  }, [curve, resetToken, carRef]);

  useFrame((_, delta) => {
    const group = carRef.current;
    if (!group) return;
    const dt = Math.min(delta, 0.033);

    if (!exploreMode) {
      autoT.current = (autoT.current + dt * (reducedMotion ? 0.01 : 0.018)) % 1;
      const point = curve.getPointAt(autoT.current);
      const tangent = curve.getTangentAt(autoT.current);
      autoPoint.set(point.x, 0.38, point.z);
      group.position.lerp(autoPoint, 0.14);
      heading.current = Math.atan2(tangent.x, tangent.z);
      let diff = (heading.current - group.rotation.y) % (Math.PI * 2);
      if (diff < -Math.PI) diff += Math.PI * 2;
      if (diff > Math.PI) diff -= Math.PI * 2;
      group.rotation.y += diff * 0.14;
      if (inner.current) {
        inner.current.rotation.z = THREE.MathUtils.lerp(
          inner.current.rotation.z,
          THREE.MathUtils.clamp(-diff * 1.8, -0.06, 0.06),
          0.1,
        );
      }
      wheels.current.forEach((wheel) => {
        wheel.rotation.x -= dt * 4;
      });
      return;
    }

    const accel = input.forward * 18;
    velocity.current += accel * dt;
    velocity.current *= Math.pow(0.92, dt * 60);
    velocity.current = THREE.MathUtils.clamp(velocity.current, -8, 16);
    heading.current += input.turn * dt * 1.8 * Math.sign(velocity.current || 1) * (Math.abs(velocity.current) > 0.4 ? 1 : 0.25);
    group.rotation.y = heading.current;
    group.position.x += Math.sin(heading.current) * velocity.current * dt;
    group.position.z += Math.cos(heading.current) * velocity.current * dt;
    group.position.y = 0.38;
    group.position.x = THREE.MathUtils.clamp(group.position.x, -40, 40);
    group.position.z = THREE.MathUtils.clamp(group.position.z, -210, 20);
    if (inner.current) {
      inner.current.rotation.z = THREE.MathUtils.lerp(
        inner.current.rotation.z,
        -input.turn * 0.08,
        0.12,
      );
    }
    wheels.current.forEach((wheel) => {
      wheel.rotation.x -= velocity.current * dt * 1.4;
    });
  });

  return (
    <group ref={carRef} position={[0, 0.38, 12]}>
      <group ref={inner}>
        <mesh position={[0, 0.18, 0]} castShadow>
          <boxGeometry args={[1.15, 0.28, 2.3]} />
          <meshStandardMaterial
            color="#1e1b4b"
            metalness={0.7}
            roughness={0.25}
            emissive="#312e81"
            emissiveIntensity={0.25}
          />
        </mesh>
        <mesh position={[0, 0.42, -0.12]} castShadow>
          <boxGeometry args={[0.9, 0.28, 1.15]} />
          <meshStandardMaterial
            color="#0ea5e9"
            metalness={0.4}
            roughness={0.15}
            transparent
            opacity={0.72}
          />
        </mesh>
        <mesh position={[0, 0.08, 1.12]}>
          <boxGeometry args={[0.7, 0.08, 0.08]} />
          <meshStandardMaterial color="#c4b5fd" emissive="#8b5cf6" emissiveIntensity={1.4} />
        </mesh>
        <mesh position={[0, 0.08, -1.16]}>
          <boxGeometry args={[0.62, 0.06, 0.06]} />
          <meshStandardMaterial color="#67e8f9" emissive="#22d3ee" emissiveIntensity={1.2} />
        </mesh>
        {[
          [-0.48, -0.12, 0.72],
          [0.48, -0.12, 0.72],
          [-0.48, -0.12, -0.72],
          [0.48, -0.12, -0.72],
        ].map((pos, index) => (
          <mesh
            key={index}
            ref={(node) => {
              if (node) wheels.current[index] = node;
            }}
            position={pos as [number, number, number]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.22, 0.22, 0.16, 16]} />
            <meshStandardMaterial color="#020617" metalness={0.6} roughness={0.4} />
          </mesh>
        ))}
        <spotLight
          position={[0, 0.3, 1.3]}
          angle={0.45}
          penumbra={0.5}
          intensity={8}
          color="#c4b5fd"
          distance={18}
        />
      </group>
    </group>
  );
}
