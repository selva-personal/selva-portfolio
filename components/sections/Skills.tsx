
"use client";

import { skillCategories } from "@/data/skills";
import { Code2, Layers3 } from "lucide-react";

export function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto mt-16 w-[min(1120px,calc(100%-2rem))] scroll-mt-28 py-12 sm:mt-20 sm:py-16"
    >
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
        <span className="h-px w-7 bg-blue-600" />
        Technical Skills
      </p>

      <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
        The technologies behind my work.
      </h2>

      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
        Technologies and tools grouped by how I use them to build, integrate,
        and maintain production applications. No unverified proficiency scores.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {skillCategories.map((category, index) => (
          <article
            key={category.id}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_14px_32px_rgba(15,23,42,0.07)] sm:p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                {index % 2 === 0 ? (
                  <Code2 size={21} />
                ) : (
                  <Layers3 size={21} />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-slate-900 sm:text-xl">
                  {category.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {category.items.length}{" "}
                  {category.items.length === 1 ? "technology" : "technologies"}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
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
