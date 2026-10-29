"use client";

import dynamic from "next/dynamic";

export const WorldExperienceLazy = dynamic(
  () => import("@/components/3d/WorldExperience").then((mod) => mod.WorldExperience),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[min(78vh,760px)] items-center justify-center rounded-[2rem] border border-white/10 bg-[#05060d] text-sm text-slate-400">
        Loading 3D world…
      </div>
    ),
  },
);
