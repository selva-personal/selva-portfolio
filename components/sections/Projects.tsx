
"use client";

import { ProjectDialog } from "@/components/ui/ProjectDialog";
import {
  projectCategories,
  projects,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { ArrowUpRight, Search, FolderKanban } from "lucide-react";
import { useMemo, useState } from "react";

function AbstractMark({ project }: { project: Project }) {
  const isHealthcare = project.categories[0] === "Healthcare";

  return (
    <div
      className="relative mb-5 flex h-32 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50"
      aria-hidden="true"
    >
      <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-blue-100/70 blur-2xl" />
      <div
        className={`absolute -bottom-12 -left-8 h-32 w-32 rounded-full blur-2xl ${
          isHealthcare ? "bg-cyan-100/80" : "bg-indigo-100/70"
        }`}
      />
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white bg-white/90 text-blue-600 shadow-lg shadow-slate-200/70">
        <FolderKanban size={29} strokeWidth={1.6} />
      </div>
      <span className="absolute bottom-3 right-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        Project showcase
      </span>
    </div>
  );
}

export function Projects() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProjectCategory | "All">("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        category === "All" || project.categories.includes(category);

      const haystack =
        `${project.title} ${project.description} ${project.technologies.join(" ")}`.toLowerCase();

      return matchesCategory && haystack.includes(query.trim().toLowerCase());
    });
  }, [category, query]);

  return (
    <section
      id="projects"
      className="mx-auto mt-16 w-[min(1120px,calc(100%-2rem))] scroll-mt-28 py-12 sm:mt-20 sm:py-16"
    >
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
        <span className="h-px w-7 bg-blue-600" />
        Selected Work
      </p>

      <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
        Projects built to solve real problems.
      </h2>

      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
        Explore enterprise applications, web platforms, and product development
        work. Search by project name, technology, or description to find
        relevant experience.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
        <label className="block text-sm font-semibold text-slate-700">
          Search projects
          <span className="relative mt-2 block">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects or technologies..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-normal text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </span>
        </label>

        <div
          className="mt-4 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter project categories"
        >
          {(["All", ...projectCategories] as const).map((item) => {
            const isActive = category === item;

            return (
              <button
                key={item}
                type="button"
                aria-pressed={isActive}
                onClick={() => setCategory(item as ProjectCategory | "All")}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  isActive
                    ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <p className="text-sm text-slate-500" aria-live="polite">
          Showing{" "}
          <span className="font-semibold text-slate-800">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "project" : "projects"}
        </p>

        {(query || category !== "All") && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="text-xs font-semibold text-blue-700 hover:text-blue-900"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="project-track mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <article
            key={project.id}
            className="group flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] sm:p-5"
          >
            <AbstractMark project={project} />

            <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
              {project.period}
            </p>

            <h3 className="mt-2 text-lg font-bold leading-snug text-slate-900 transition group-hover:text-blue-700">
              {project.title}
            </h3>

            <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-500">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-500">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            <button
              type="button"
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg text-sm font-semibold text-blue-700 transition hover:gap-3 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
              onClick={() => setSelected(project)}
            >
              View project details
              <ArrowUpRight size={16} />
            </button>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
          <Search size={25} className="mx-auto text-slate-400" />
          <p className="mt-3 font-semibold text-slate-800">
            No matching projects
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Try a different keyword or clear your filters.
          </p>
        </div>
      )}

      <ProjectDialog
        project={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
