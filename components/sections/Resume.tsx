
import { profile } from "@/data/profile";
import { Download, FileText, ArrowUpRight, ShieldCheck } from "lucide-react";

export function Resume() {
  return (
    <section
      id="resume"
      className="mx-auto mt-16 w-[min(1120px,calc(100%-2rem))] scroll-mt-28 py-12 sm:mt-20 sm:py-16"
    >
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_36px_rgba(15,23,42,0.05)] sm:p-10 lg:p-12">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-cyan-50 blur-3xl" />

        <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              <span className="h-px w-7 bg-blue-600" />
              Resume
            </p>

            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Let&apos;s build something meaningful.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Explore my professional experience, technical skills, projects,
              and career achievements in my resume.
            </p>

            <p className="mt-4 inline-flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck size={15} className="text-blue-600" />
              Professional experience and technical background
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-blue-700 shadow-sm">
              <FileText size={38} strokeWidth={1.4} />
            </div>

            <a
              href={profile.resumePath}
              download
              className="accent-button mt-2 w-full sm:w-auto"
            >
              <Download size={17} />
              Download Resume
              <ArrowUpRight size={15} />
            </a>

            <p className="text-center text-xs text-slate-400">
              PDF document
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
