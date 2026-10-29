
import { awards } from "@/data/awards";
import { Award, Sparkles } from "lucide-react";

export function Awards() {
  return (
    <section
      id="awards"
      className="mx-auto mt-16 w-[min(1120px,calc(100%-2rem))] scroll-mt-28 py-12 sm:mt-20 sm:py-16"
    >
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
        <span className="h-px w-7 bg-blue-600" />
        Awards & Achievements
      </p>

      <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
        Recognition for my work.
      </h2>

      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
        A selection of achievements recognizing my contributions, collaboration,
        and professional growth.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {awards.map((award) => (
          <article
            key={award.id}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_14px_32px_rgba(15,23,42,0.07)]"
          >
            <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-blue-50 transition-colors group-hover:bg-blue-100/80" />

            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700">
              <Award size={24} strokeWidth={1.7} />
            </div>

            <p className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              <Sparkles size={13} />
              Achievement
            </p>

            <h3 className="mt-3 text-xl font-bold leading-snug text-slate-900">
              {award.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              {award.organization}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
