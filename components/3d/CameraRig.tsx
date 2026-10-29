"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { useWorld } from "@/components/world/WorldContext";

export function CameraRig({
  carRef,
}: {
  carRef: MutableRefObject<THREE.Group | null>;
}) {
  const { exploreMode, reducedMotion } = useWorld();
  const current = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  const currentLook = useMemo(() => new THREE.Vector3(), []);
  const initialized = useRef(false);

  useFrame((state, delta) => {
    const car = carRef.current;
    if (!car) return;
    const dt = Math.min(delta, 0.05);
    const heading = car.rotation.y;
    const distance = exploreMode ? 7.6 : 8.8;
    const height = exploreMode ? 3.4 : 4.0;

    const target = current.set(
      car.position.x - Math.sin(heading) * distance,
      car.position.y + height,
      car.position.z - Math.cos(heading) * distance,
    );
    look.set(car.position.x, car.position.y + 0.8, car.position.z);

    if (!initialized.current) {
      state.camera.position.copy(target);
      currentLook.copy(look);
      initialized.current = true;
    } else {
      const followSpeed = exploreMode ? 5.5 : 3.8;
      const t = reducedMotion ? 1 : 1 - Math.exp(-followSpeed * dt);
      state.camera.position.lerp(target, t);
      currentLook.lerp(look, t * 1.35);
    }
    state.camera.lookAt(currentLook);
  });

  return null;
}
