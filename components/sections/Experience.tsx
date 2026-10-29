
"use client";

import { experience } from "@/data/experience";
import { ChevronDown, ChevronUp, BriefcaseBusiness, MapPin } from "lucide-react";
import { useState } from "react";

export function Experience() {
  const [open, setOpen] = useState(true);

  return (
    <section
      id="experience"
      className="mx-auto mt-16 w-[min(1120px,calc(100%-2rem))] scroll-mt-28 py-12 sm:mt-20 sm:py-16"
    >
      <div>
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
          <span className="h-px w-7 bg-blue-600" />
          Experience
        </p>

        <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
          My career journey
        </h2>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
          A look at my professional experience, responsibilities, and work
          building web applications.
        </p>
      </div>

      <div className="relative mt-10 pl-7 sm:pl-10">
        <div className="absolute bottom-0 left-[5px] top-5 w-px bg-slate-200 sm:left-[7px]" />

        <div className="absolute left-0 top-6 z-10 flex h-3 w-3 items-center justify-center rounded-full bg-blue-600 ring-4 ring-blue-50 sm:h-4 sm:w-4" />

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_32px_rgba(15,23,42,0.04)] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(15,23,42,0.07)]">
          <button
            type="button"
            className="w-full p-5 text-left transition hover:bg-slate-50/70 sm:p-7"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="experience-responsibilities"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700">
                  <BriefcaseBusiness size={22} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-blue-700">
                    {experience.role}
                  </p>

                  <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                    {experience.company}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {experience.period}
                  </p>

                  <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-slate-500">
                    <MapPin size={15} />
                    {experience.location}
                  </p>
                </div>
              </div>

              <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">
                {open ? "Hide details" : "View details"}
                {open ? (
                  <ChevronUp size={15} />
                ) : (
                  <ChevronDown size={15} />
                )}
              </span>
            </div>
          </button>

          {open && (
            <div
              id="experience-responsibilities"
              className="border-t border-slate-200 bg-slate-50/70 p-5 sm:p-7"
            >
              <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Key responsibilities
              </h4>

              <ul className="space-y-4">
                {experience.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-7 text-slate-600"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
