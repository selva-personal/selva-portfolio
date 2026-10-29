import { education } from "@/data/education";

export function Education() {
  return (
    <section id="education" className="mx-auto mt-28 w-[min(1120px,calc(100%-1.5rem))]">
      <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">Education</p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-white">
        {education.degree}
      </h2>
      <p className="mt-3 text-slate-300">{education.institution}</p>
      <p className="text-slate-400">{education.location}</p>
      <p className="mt-2 text-cyan-200">{education.period}</p>
    </section>
  );
}
