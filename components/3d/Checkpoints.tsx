"use client";

import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { useWorld } from "@/components/world/WorldContext";
import {
  createRoadCurve,
  worldCheckpoints,
  type WorldCheckpoint,
} from "@/lib/world-path";

const KIND_COLOR: Record<WorldCheckpoint["kind"], string> = {
  welcome: "#67e8f9",
  about: "#a78bfa",
  experience: "#818cf8",
  skills: "#38bdf8",
  project: "#c4b5fd",
  awards: "#93c5fd",
  education: "#7dd3fc",
  contact: "#e879f9",
};

const APPROACH_DISTANCE = 11;
const LABEL_HEIGHT = 2.7;

type CheckpointItem = {
  checkpoint: WorldCheckpoint;
  position: THREE.Vector3;
  labelPos: [number, number, number];
  color: string;
  index: number;
};

export function Checkpoints({
  carRef,
}: {
  carRef: MutableRefObject<THREE.Group | null>;
}) {
  const { setActiveCheckpoint, reducedMotion } = useWorld();
  const { camera } = useThree();

  const activeIdRef = useRef<string | null>(null);
  const rings = useRef<(THREE.Mesh | null)[]>([]);
  const labels = useRef<(THREE.Group | null)[]>([]);
  const labelProgress = useRef<number[]>([]);

  const curve = useMemo(() => createRoadCurve(), []);

  const items = useMemo<CheckpointItem[]>(
    () =>
      worldCheckpoints.map((checkpoint, index) => {
        const position = curve.getPointAt(checkpoint.t);
        const tangent = curve.getTangentAt(checkpoint.t);
        tangent.y = 0;

        if (tangent.lengthSq() < 0.0001) {
          tangent.set(0, 0, -1);
        } else {
          tangent.normalize();
        }

        const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

        const isProject = checkpoint.kind === "project";

        // Spread project labels farther apart on alternating sides.
        const sideOffset = isProject ? (index % 2 === 0 ? -2.2 : 2.2) : 0;

        const heightOffset = isProject
          ? index % 2 === 0
            ? 2.5
            : 2.9
          : LABEL_HEIGHT;

        const labelPos = position.clone().addScaledVector(normal, sideOffset);

        return {
          checkpoint,
          position,
          labelPos: [labelPos.x, heightOffset, labelPos.z],
          color: KIND_COLOR[checkpoint.kind],
          index,
        };
      }),
    [curve],
  );

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;
    const car = carRef.current;

    let nearest: WorldCheckpoint | null = null;
    let nearestDistance = APPROACH_DISTANCE;

    if (car) {
      for (const item of items) {
        const distance = car.position.distanceTo(item.position);

        if (distance < nearestDistance) {
          nearest = item.checkpoint;
          nearestDistance = distance;
        }
      }
    }

    const nextActiveId = nearest?.id ?? null;

    if (nextActiveId !== activeIdRef.current) {
      activeIdRef.current = nextActiveId;
      setActiveCheckpoint(nearest);
    }

    items.forEach((item, index) => {
      const ring = rings.current[index];
      const label = labels.current[index];

      if (ring) {
        ring.rotation.z = elapsed * (reducedMotion ? 0.1 : 0.6);

        const pulse = reducedMotion
          ? 1
          : 1 + Math.sin(elapsed * 2 + index) * 0.08;

        ring.scale.setScalar(pulse);
      }

      if (!label) return;

      const isActive = item.checkpoint.id === nextActiveId;

      const targetProgress = isActive ? 1 : 0;
      const currentProgress = labelProgress.current[index] ?? 0;

      const nextProgress = reducedMotion
        ? targetProgress
        : THREE.MathUtils.damp(currentProgress, targetProgress, 7, delta);

      labelProgress.current[index] = nextProgress;

      // Keep the label facing the camera so it remains readable.
      label.quaternion.copy(camera.quaternion);

      // Smooth scale-up and spin as the car approaches.
      const scale = THREE.MathUtils.lerp(0.88, 1.12, nextProgress);

      label.scale.setScalar(scale);

      label.rotation.z =
        camera.rotation.z +
        (reducedMotion ? 0 : (1 - nextProgress) * Math.PI * 2);

      label.position.y =
        item.labelPos[1] +
        (reducedMotion ? 0 : Math.sin(nextProgress * Math.PI) * 0.18);

      // Highlight the approaching checkpoint.
      label.visible = true;
    });
  });

  return (
    <group>
      {items.map((item) => (
        <group key={item.checkpoint.id}>
          {/* Ground checkpoint ring */}
          <mesh
            ref={(node) => {
              rings.current[item.index] = node;
            }}
            position={[item.position.x, 0.055, item.position.z]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <ringGeometry args={[1.15, 1.45, 32]} />
            <meshBasicMaterial
              color={item.color}
              transparent
              opacity={0.8}
              depthWrite={false}
            />
          </mesh>

          {/* Glowing crystal beacon */}
          <mesh position={[item.position.x, 1.35, item.position.z]}>
            <octahedronGeometry args={[0.26, 0]} />
            <meshStandardMaterial
              color={item.color}
              emissive={item.color}
              emissiveIntensity={1.6}
              roughness={0.2}
            />
          </mesh>

          {/* Checkpoint illumination */}
          <pointLight
            position={[item.position.x, 1.4, item.position.z]}
            color={item.color}
            intensity={2.8}
            distance={10}
            decay={2}
          />

          {/* Camera-facing checkpoint label */}
          <group
            ref={(node) => {
              labels.current[item.index] = node;
            }}
            position={item.labelPos}
          >
            <Text
              fontSize={0.34}
              color="#e0faff"
              anchorX="center"
              anchorY="middle"
              textAlign="center"
              outlineWidth={0.025}
              outlineColor="#050816"
              renderOrder={10}
              material-toneMapped={false}
            >
              {item.checkpoint.title}
            </Text>
          </group>
        </group>
      ))}
    </group>
  );
}
