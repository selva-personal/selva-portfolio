
import { education } from "@/data/education";
import { GraduationCap, MapPin, CalendarDays } from "lucide-react";

export function Education() {
  return (
    <section
      id="education"
      className="mx-auto mt-16 w-[min(1120px,calc(100%-2rem))] scroll-mt-28 py-12 sm:mt-20 sm:py-16"
    >
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
        <span className="h-px w-7 bg-blue-600" />
        Education
      </p>

      <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        Academic foundation.
      </h2>

      <article className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.04)]">
        <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400" />

        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:p-8">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-700">
            <GraduationCap size={29} strokeWidth={1.6} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
              {education.degree}
            </h3>

            <p className="mt-3 text-base font-semibold text-slate-700">
              {education.institution}
            </p>

            <div className="mt-5 flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:flex-wrap sm:gap-x-6">
              <p className="inline-flex items-center gap-2">
                <MapPin size={16} className="shrink-0 text-blue-600" />
                {education.location}
              </p>

              <p className="inline-flex items-center gap-2">
                <CalendarDays size={16} className="shrink-0 text-blue-600" />
                {education.period}
              </p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
