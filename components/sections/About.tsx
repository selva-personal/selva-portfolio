
"use client";

import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section
      id="about"
      className="mx-auto mt-20 w-[min(1120px,calc(100%-2rem))] scroll-mt-28 py-12 sm:mt-24 sm:py-16"
    >
      <div className="max-w-3xl">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
          <span className="h-px w-7 bg-blue-600" />
          About Me
        </p>

        <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
          Building digital products with{" "}
          <span className="text-blue-600">purpose and precision.</span>
        </h2>

        <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
          {profile.longSummary}
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profile.aboutFocus.map((item, index) => (
          <article
            key={item}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_14px_32px_rgba(15,23,42,0.07)]"
          >
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-sm font-bold text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
              {String(index + 1).padStart(2, "0")}
            </div>

            <h3 className="text-base font-semibold leading-7 text-slate-800">
              {item}
            </h3>

            <div className="mt-4 h-1 w-8 rounded-full bg-blue-600 transition-all duration-300 group-hover:w-14" />
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
          Professional Highlights
        </h3>

        <ul className="grid gap-3 sm:grid-cols-2">
          {profile.highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl bg-white p-4 text-sm leading-6 text-slate-600 ring-1 ring-slate-200/80"
            >
              <CheckCircle2
                size={18}
                className="mt-1 shrink-0 text-blue-600"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#experience"
        className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:gap-3 hover:text-blue-800"
      >
        Explore my career
        <ArrowUpRight size={16} />
      </a>
    </section>
  );
}
