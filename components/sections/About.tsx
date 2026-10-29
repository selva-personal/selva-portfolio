"use client";

import { profile } from "@/data/profile";

export function About() {
  return (
    <section id="about" className="mx-auto mt-28 w-[min(1120px,calc(100%-1.5rem))]">
      <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">About me</p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-white sm:text-4xl">
        Senior engineering with enterprise depth
      </h2>
      <p className="mt-5 max-w-3xl text-slate-300">{profile.longSummary}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profile.aboutFocus.map((item) => (
          <article
            key={item}
            className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200 backdrop-blur-md"
          >
            {item}
          </article>
        ))}
      </div>
      <ul className="mt-8 grid gap-3 text-sm text-slate-400 md:grid-cols-2">
        {profile.highlights.map((item) => (
          <li key={item} className="rounded-2xl border border-white/5 px-4 py-3">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
