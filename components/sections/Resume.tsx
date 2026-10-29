import { profile } from "@/data/profile";

export function Resume() {
  return (
    <section id="resume" className="mx-auto mt-28 w-[min(1120px,calc(100%-1.5rem))] rounded-[2rem] border border-white/10 bg-white/5 p-8">
      <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">Resume</p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-white">
        Download the source of truth
      </h2>
      <p className="mt-4 max-w-2xl text-sm text-slate-400">
        Place the resume PDF at <code className="text-cyan-200">public/resume/Selvakumar-S-Resume.pdf</code>.
        The button below opens that file. A placeholder is not substituted.
      </p>
      <a
        href={profile.resumePath}
        className="mt-6 inline-flex rounded-full bg-violet-600 px-5 py-3 text-sm text-white hover:bg-violet-500"
      >
        Download Resume
      </a>
    </section>
  );
}
