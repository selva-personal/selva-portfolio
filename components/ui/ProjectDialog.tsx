"use client";

import type { Project } from "@/data/projects";
import { X } from "lucide-react";
import { useEffect } from "react";

export function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-70 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-dialog-title"
    >
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close project details"
        onClick={onClose}
      />
      <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0b1020] p-6 text-slate-200 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-white/10"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">
          {project.period}
        </p>
        <h2 id="project-dialog-title" className="mt-2 pr-10 font-[family-name:var(--font-display)] text-2xl text-white">
          {project.title}
        </h2>
        <p className="mt-3 text-sm text-slate-300">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-violet-400/30 px-3 py-1 text-xs text-violet-200"
            >
              {category}
            </span>
          ))}
        </div>
        <h3 className="mt-6 text-sm font-medium text-white">Technologies</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="rounded-full bg-white/5 px-3 py-1 text-xs">
              {tech}
            </span>
          ))}
        </div>
        <h3 className="mt-6 text-sm font-medium text-white">Responsibilities</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
          {project.responsibilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-slate-500">
          These projects were delivered in professional environments and are not
          all publicly accessible. No live demo URLs are claimed here.
        </p>
      </div>
    </div>
  );
}
