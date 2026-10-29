import { awards } from "@/data/awards";

export function Awards() {
  return (
    <section id="awards" className="mx-auto mt-28 w-[min(1120px,calc(100%-1.5rem))]">
      <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">
        Awards and achievements
      </p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-white sm:text-4xl">
        Recognition
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {awards.map((award) => (
          <article
            key={award.id}
            className="rounded-3xl border border-violet-400/20 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_60%)] p-6"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Award</p>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl text-white">
              {award.title}
            </h3>
            <p className="mt-3 text-sm text-slate-400">{award.organization}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
