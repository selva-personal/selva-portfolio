import * as THREE from "three";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";

export const ROAD_POINTS: [number, number, number][] = [
  [0, 0.05, 12],
  [6, 0.05, -8],
  [-8, 0.05, -28],
  [14, 0.05, -52],
  [-10, 0.05, -76],
  [16, 0.05, -100],
  [-6, 0.05, -124],
  [10, 0.05, -148],
  [0, 0.05, -176],
  [-4, 0.05, -198],
];

export function createRoadCurve() {
  const vectors = ROAD_POINTS.map((p) => new THREE.Vector3(...p));
  return new THREE.CatmullRomCurve3(vectors, false, "catmullrom", 0.35);
}

export type CheckpointKind =
  | "welcome"
  | "about"
  | "experience"
  | "skills"
  | "project"
  | "awards"
  | "education"
  | "contact";

export type WorldCheckpoint = {
  id: string;
  kind: CheckpointKind;
  title: string;
  subtitle: string;
  t: number;
  sectionId?: string;
  projectId?: string;
  skillCategoryId?: string;
};

const projectStart = 0.38;
const projectEnd = 0.82;
const projectCount = projects.length;

export const worldCheckpoints: WorldCheckpoint[] = [
  {
    id: "welcome",
    kind: "welcome",
    title: "Welcome",
    subtitle: "Start of the journey",
    t: 0.02,
    sectionId: "home",
  },
  {
    id: "about",
    kind: "about",
    title: "About",
    subtitle: "Professional profile",
    t: 0.1,
    sectionId: "about",
  },
  {
    id: "experience",
    kind: "experience",
    title: "Experience",
    subtitle: "Mindbridges Technologies",
    t: 0.18,
    sectionId: "experience",
  },
  ...skillCategories.slice(0, 3).map((category, index) => ({
    id: `skills-${category.id}`,
    kind: "skills" as const,
    title: category.title,
    subtitle: "Technology station",
    t: 0.24 + index * 0.04,
    sectionId: "skills",
    skillCategoryId: category.id,
  })),
  ...projects.map((project, index) => ({
    id: `project-${project.id}`,
    kind: "project" as const,
    title: project.title,
    subtitle: project.period,
    t: projectStart + ((index + 0.5) / projectCount) * (projectEnd - projectStart),
    sectionId: "projects",
    projectId: project.id,
  })),
  {
    id: "awards",
    kind: "awards",
    title: "Awards",
    subtitle: "Recognition",
    t: 0.86,
    sectionId: "awards",
  },
  {
    id: "education",
    kind: "education",
    title: "Education",
    subtitle: "BCA, Kalasalingam University",
    t: 0.9,
    sectionId: "education",
  },
  {
    id: "contact",
    kind: "contact",
    title: "Contact",
    subtitle: "Final destination",
    t: 0.97,
    sectionId: "contact",
  },
];

export function createRoadRibbonGeometry(
  curve: THREE.CatmullRomCurve3,
  segments: number,
  width: number,
  yOffset: number,
  centerOffset = 0,
) {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const normals: number[] = [];

  const halfWidth = width / 2;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t);
    tangent.y = 0;
    if (tangent.lengthSq() < 0.0001) {
      tangent.set(0, 0, -1);
    } else {
      tangent.normalize();
    }

    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

    const center = point.clone().addScaledVector(normal, centerOffset);
    const left = center.clone().addScaledVector(normal, -halfWidth);
    const right = center.clone().addScaledVector(normal, halfWidth);

    positions.push(left.x, yOffset, left.z);
    positions.push(right.x, yOffset, right.z);

    normals.push(0, 1, 0);
    normals.push(0, 1, 0);

    uvs.push(0, t * 50);
    uvs.push(1, t * 50);

    if (i < segments) {
      const a = i * 2;
      const b = i * 2 + 1;
      const c = (i + 1) * 2;
      const d = (i + 1) * 2 + 1;
      indices.push(a, b, c);
      indices.push(b, d, c);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setAttribute(
    "normal",
    new THREE.Float32BufferAttribute(normals, 3),
  );
  geometry.setAttribute(
    "uv",
    new THREE.Float32BufferAttribute(uvs, 2),
  );
  geometry.setIndex(indices);
  return geometry;
}

export function createDashedLineGeometry(
  curve: THREE.CatmullRomCurve3,
  totalDashes: number,
  width: number,
  yOffset: number,
  dashRatio = 0.5,
) {
  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];

  const halfWidth = width / 2;
  let vertIndex = 0;

  for (let i = 0; i < totalDashes; i++) {
    const tStart = i / totalDashes;
    const tEnd = (i + dashRatio) / totalDashes;
    const steps = 3;

    for (let s = 0; s <= steps; s++) {
      const t = tStart + (s / steps) * (tEnd - tStart);
      const point = curve.getPointAt(t);
      const tangent = curve.getTangentAt(t);
      tangent.y = 0;
      if (tangent.lengthSq() < 0.0001) {
        tangent.set(0, 0, -1);
      } else {
        tangent.normalize();
      }
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

      const left = point.clone().addScaledVector(normal, -halfWidth);
      const right = point.clone().addScaledVector(normal, halfWidth);

      positions.push(left.x, yOffset, left.z);
      positions.push(right.x, yOffset, right.z);
      normals.push(0, 1, 0);
      normals.push(0, 1, 0);

      if (s < steps) {
        const a = vertIndex + s * 2;
        const b = vertIndex + s * 2 + 1;
        const c = vertIndex + (s + 1) * 2;
        const d = vertIndex + (s + 1) * 2 + 1;
        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }
    vertIndex += (steps + 1) * 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setAttribute(
    "normal",
    new THREE.Float32BufferAttribute(normals, 3),
  );
  geometry.setIndex(indices);
  return geometry;
}
