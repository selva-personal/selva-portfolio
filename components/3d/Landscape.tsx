"use client";

import { useMemo } from "react";
import * as THREE from "three";
import {
  createRoadCurve,
  createRoadRibbonGeometry,
  createDashedLineGeometry,
} from "@/lib/world-path";

function Building({
  position,
  scale,
  color,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={scale} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
        roughness={0.4}
        metalness={0.4}
      />
    </mesh>
  );
}

export function Landscape() {
  const curve = useMemo(() => createRoadCurve(), []);

  // 1. Road bed base (slightly wider foundation)
  const roadBed = useMemo(
    () => createRoadRibbonGeometry(curve, 260, 4.6, 0.02, 0),
    [curve],
  );

  // 2. Main dark asphalt road surface
  const asphalt = useMemo(
    () => createRoadRibbonGeometry(curve, 260, 3.8, 0.042, 0),
    [curve],
  );

  // 3. Neon boundary curbs
  const curbLeft = useMemo(
    () => createRoadRibbonGeometry(curve, 260, 0.14, 0.052, -1.9),
    [curve],
  );
  const curbRight = useMemo(
    () => createRoadRibbonGeometry(curve, 260, 0.14, 0.052, 1.9),
    [curve],
  );

  // 4. Crisp contrasting white lane markings
  const leftLine = useMemo(
    () => createRoadRibbonGeometry(curve, 240, 0.07, 0.048, -1.6),
    [curve],
  );
  const rightLine = useMemo(
    () => createRoadRibbonGeometry(curve, 240, 0.07, 0.048, 1.6),
    [curve],
  );
  const centerDashes = useMemo(
    () => createDashedLineGeometry(curve, 64, 0.11, 0.048, 0.5),
    [curve],
  );

  // 5. Roadside light bollards along the route
  const bollards = useMemo(() => {
    const items: Array<{
      leftPos: [number, number, number];
      rightPos: [number, number, number];
    }> = [];
    const count = 38;
    for (let i = 0; i <= count; i++) {
      const t = 0.02 + (i / count) * 0.96;
      const point = curve.getPointAt(t);
      const tangent = curve.getTangentAt(t);
      tangent.y = 0;
      if (tangent.lengthSq() < 0.0001) tangent.set(0, 0, -1);
      else tangent.normalize();
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

      const left = point.clone().addScaledVector(normal, -2.15);
      const right = point.clone().addScaledVector(normal, 2.15);
      items.push({
        leftPos: [left.x, 0.28, left.z],
        rightPos: [right.x, 0.28, right.z],
      });
    }
    return items;
  }, [curve]);

  // 6. Cyber city buildings
  const buildings = useMemo(() => {
    const items: Array<{
      position: [number, number, number];
      scale: [number, number, number];
      color: string;
    }> = [];
    const colors = ["#1e1b4b", "#172554", "#312e81", "#0f172a", "#1e293b"];
    for (let i = 0; i < 32; i += 1) {
      const side = i % 2 === 0 ? 1 : -1;
      const z = -6 - i * 6.5;
      const x = side * (19 + (i % 5) * 2.5);
      const height = 4.5 + (i % 7) * 1.8;
      items.push({
        position: [x, height / 2, z],
        scale: [2.8 + (i % 3), height, 2.6 + (i % 2)],
        color: colors[i % colors.length],
      });
    }
    return items;
  }, []);

  return (
    <group>
      {/* Surrounding terrain ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, -95]}>
        <planeGeometry args={[320, 340]} />
        <meshStandardMaterial
          color="#050711"
          roughness={0.96}
          metalness={0.04}
        />
      </mesh>

      {/* Road foundation bed */}
      <mesh geometry={roadBed} receiveShadow>
        <meshStandardMaterial
          color="#090d18"
          roughness={0.95}
          metalness={0.08}
        />
      </mesh>

      {/* Dark asphalt surface */}
      <mesh geometry={asphalt} receiveShadow>
        <meshStandardMaterial
          color="#131623"
          roughness={0.84}
          metalness={0.12}
        />
      </mesh>

      {/* Left neon road boundary (purple glow) */}
      <mesh geometry={curbLeft}>
        <meshStandardMaterial
          color="#818cf8"
          emissive="#6366f1"
          emissiveIntensity={0.8}
          roughness={0.25}
        />
      </mesh>

      {/* Right neon road boundary (cyan glow) */}
      <mesh geometry={curbRight}>
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#06b6d4"
          emissiveIntensity={0.8}
          roughness={0.25}
        />
      </mesh>

      {/* White road edge markings */}
      <mesh geometry={leftLine}>
        <meshStandardMaterial
          color="#f8fafc"
          emissive="#e2e8f0"
          emissiveIntensity={0.85}
          roughness={0.2}
        />
      </mesh>
      <mesh geometry={rightLine}>
        <meshStandardMaterial
          color="#f8fafc"
          emissive="#e2e8f0"
          emissiveIntensity={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* Contrasting dashed center lane markings */}
      <mesh geometry={centerDashes}>
        <meshStandardMaterial
          color="#ffffff"
          emissive="#e2e8f0"
          emissiveIntensity={0.95}
          roughness={0.2}
        />
      </mesh>

      {/* Roadside cyber bollards */}
      {bollards.map((b, idx) => (
        <group key={idx}>
          {/* Left bollard */}
          <mesh position={b.leftPos}>
            <cylinderGeometry args={[0.04, 0.05, 0.55, 8]} />
            <meshStandardMaterial color="#0b0f19" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[b.leftPos[0], b.leftPos[1] + 0.3, b.leftPos[2]]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#a78bfa" emissive="#8b5cf6" emissiveIntensity={1.4} />
          </mesh>

          {/* Right bollard */}
          <mesh position={b.rightPos}>
            <cylinderGeometry args={[0.04, 0.05, 0.55, 8]} />
            <meshStandardMaterial color="#0b0f19" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[b.rightPos[0], b.rightPos[1] + 0.3, b.rightPos[2]]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#67e8f9" emissive="#06b6d4" emissiveIntensity={1.4} />
          </mesh>
        </group>
      ))}

      {/* Background buildings */}
      {buildings.map((building, index) => (
        <Building key={index} {...building} />
      ))}

      {/* Distant cyber terrain cones / mountains */}
      {[
        [-52, 10, -40],
        [56, 14, -70],
        [-60, 16, -120],
        [64, 12, -150],
        [-45, 18, -190],
        [50, 16, -210],
      ].map((pos, index) => (
        <mesh key={index} position={pos as [number, number, number]}>
          <coneGeometry args={[14 + index, 24 + index * 2, 6]} />
          <meshStandardMaterial color="#090e1e" roughness={0.98} />
        </mesh>
      ))}
    </group>
  );
}
