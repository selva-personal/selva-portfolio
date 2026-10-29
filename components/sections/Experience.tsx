"use client";

import { experience } from "@/data/experience";
import { useState } from "react";

export function Experience() {
  const [open, setOpen] = useState(true);

  return (
    <section id="experience" className="mx-auto mt-28 w-[min(1120px,calc(100%-1.5rem))]">
      <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">Experience</p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-white sm:text-4xl">
        Career timeline
      </h2>
      <div className="relative mt-10 border-l border-violet-500/40 pl-8">
        <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_16px_#22d3ee]" />
        <button
          type="button"
          className="w-full rounded-3xl border border-white/10 bg-[#0b1020]/80 p-6 text-left backdrop-blur-md"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
        >
          <p className="text-sm text-violet-200">{experience.role}</p>
          <h3 className="mt-1 text-2xl text-white">{experience.company}</h3>
          <p className="mt-2 text-sm text-slate-400">
            {experience.period} | {experience.location}
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-cyan-300">
            {open ? "Hide responsibilities" : "Show responsibilities"}
          </p>
        </button>
        {open ? (
          <ul className="mt-4 space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm leading-6 text-slate-300">
            {experience.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
