"use client";

import { WorldExperienceLazy } from "@/components/3d/WorldExperienceLoader";
import { Button } from "@/components/ui/Button";
import { useWorld } from "@/components/world/WorldContext";
import { profile } from "@/data/profile";
import { Code, ExternalLink } from "lucide-react";

export function Hero() {
  const { setExploreMode, webgl } = useWorld();

  return (
    <section id="home" className="relative mx-auto w-[min(1120px,calc(100%-1.5rem))] pt-28">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div>
          <p className="reveal text-xs uppercase tracking-[0.32em] text-cyan-300">
            Welcome to my world
          </p>
          <h1 className="reveal mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight text-white sm:text-6xl">
            Hi, I&apos;m {profile.name}
          </h1>
          <p className="reveal mt-4 text-lg text-violet-200">{profile.role}</p>
          <p className="reveal mt-3 text-xl text-slate-200">{profile.headline}</p>
          <p className="reveal mt-4 max-w-xl text-sm leading-6 text-slate-400">
            {profile.summary}
          </p>
          <div className="reveal mt-7 flex flex-wrap gap-3">
            <Button
              onClick={() => {
                if (webgl) setExploreMode(true);
              }}
            >
              Enter My World
            </Button>
            <Button variant="secondary" onClick={() => window.open(profile.resumePath, "_blank")}>
              View Resume
            </Button>
            <a href="#projects">
              <Button variant="secondary">Explore Projects</Button>
            </a>
          </div>
          <div className="reveal mt-6 flex gap-4">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"
            >
              <ExternalLink size={16} /> LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"
            >
              <Code size={16} /> GitHub
            </a>
          </div>
        </div>
        <WorldExperienceLazy />
      </div>
    </section>
  );
}
