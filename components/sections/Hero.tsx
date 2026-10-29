
"use client";

import { WorldExperienceLazy } from "@/components/3d/WorldExperienceLoader";
import { useWorld } from "@/components/world/WorldContext";
import { profile } from "@/data/profile";
import { ArrowDown, ArrowUpRight, Code, Download } from "lucide-react";

export function Hero() {
  const { setExploreMode, webgl } = useWorld();

  return (
    <section
      id="home"
      className="relative mx-auto w-[min(1120px,calc(100%-2rem))] scroll-mt-24 pb-16 pt-32 sm:pb-24 sm:pt-36"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8">
        <div className="relative z-10">
          <p className="reveal inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            Full Stack Developer · Chennai, India
          </p>

          <h1 className="reveal mt-6 font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Hi, I&apos;m{" "}
            <span className="text-blue-600">{profile.name}</span>
          </h1>

          <p className="reveal mt-5 text-lg font-semibold leading-relaxed text-slate-700 sm:text-xl">
            {profile.role}
          </p>

          <p className="reveal mt-3 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            {profile.headline}
          </p>

          <p className="reveal mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            {profile.summary}
          </p>

          <div className="reveal mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                if (webgl) {
                  setExploreMode(true);
                }
              }}
              disabled={!webgl}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.18)] transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_12px_26px_rgba(37,99,235,0.22)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Explore My 3D World
              <ArrowUpRight size={17} />
            </button>

            <a
              href={profile.resumePath}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
              <Download size={16} />
              View Resume
            </a>

            <a
              href="#projects"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            >
              Explore Projects
              <ArrowDown size={16} />
            </a>
          </div>

          <div className="reveal mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-slate-200 pt-5">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700"
            >
              <ArrowUpRight size={16} />
              LinkedIn
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700"
            >
              <Code size={16} />
              GitHub
            </a>
          </div>
        </div>

        <div className="relative min-w-0">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-8 rounded-full bg-blue-100/60 blur-3xl"
          />
          <div className="relative min-h-[320px] overflow-hidden rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-blue-50/70 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:min-h-[400px] lg:min-h-[480px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0)_0%,rgba(255,255,255,0.35)_72%)]" />
            <WorldExperienceLazy />
          </div>
          <p className="mt-3 text-center text-xs font-medium tracking-wide text-slate-400">
            Interactive 3D experience
          </p>
        </div>
      </div>
    </section>
  );
}
