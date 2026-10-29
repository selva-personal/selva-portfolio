"use client";

import { skillCategories } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="mx-auto mt-28 w-[min(1120px,calc(100%-1.5rem))]">
      <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">Skills</p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-white sm:text-4xl">
        My technology universe
      </h2>
      <p className="mt-4 max-w-2xl text-sm text-slate-400">
        Grouped by how I use them in production. No proficiency scores are claimed.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {skillCategories.map((category) => (
          <article
            key={category.id}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
          >
            <h3 className="font-[family-name:var(--font-display)] text-xl text-white">
              {category.title}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-cyan-400/20 bg-[#0b1020] px-3 py-1 text-xs text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
