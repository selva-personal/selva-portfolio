"use client";

import { ProjectDialog } from "@/components/ui/ProjectDialog";
import {
  projectCategories,
  projects,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { useMemo, useState } from "react";

function AbstractMark({ project }: { project: Project }) {
  const hue = project.categories[0] === "Healthcare" ? "from-cyan-500/40" : "from-violet-500/40";
  return (
    <div
      className={`mb-4 h-24 rounded-2xl bg-linear-to-br ${hue} to-slate-900/80`}
      aria-hidden
    />
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
      const haystack = `${project.title} ${project.description} ${project.technologies.join(" ")}`.toLowerCase();
      return matchesCategory && haystack.includes(query.toLowerCase());
    });
  }, [category, query]);

  return (
    <section id="projects" className="mx-auto mt-28 w-[min(1120px,calc(100%-1.5rem))]">
      <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">Projects</p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-white sm:text-4xl">
        My development journey
      </h2>
      <p className="mt-4 max-w-2xl text-sm text-slate-400">
        17 named enterprise project entries from my resume, shown as a searchable
        gallery for recruiters. Drive the 3D world to visit each as a checkpoint.
      </p>
      <div className="mt-6 flex flex-col gap-4">
        <label className="text-sm text-slate-300">
          Search projects
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, technology, or description"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Project categories">
          <button
            type="button"
            onClick={() => setCategory("All")}
            className={`rounded-full px-3 py-1.5 text-xs ${category === "All" ? "bg-violet-600 text-white" : "bg-white/5 text-slate-300"}`}
          >
            All
          </button>
          {projectCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full px-3 py-1.5 text-xs ${category === item ? "bg-violet-600 text-white" : "bg-white/5 text-slate-300"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="project-track mt-8 flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3">
        {filtered.map((project) => (
          <article
            key={project.id}
            className="min-w-[280px] rounded-3xl border border-white/10 bg-[#0b1020]/80 p-5"
          >
            <AbstractMark project={project} />
            <p className="text-xs text-cyan-300">{project.period}</p>
            <h3 className="mt-2 text-lg text-white">{project.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-slate-400">{project.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech) => (
                <span key={tech} className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-slate-300">
                  {tech}
                </span>
              ))}
            </div>
            <button
              type="button"
              className="mt-4 text-sm text-cyan-300 underline"
              onClick={() => setSelected(project)}
            >
              View details
            </button>
          </article>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="mt-6 text-sm text-slate-400">No projects match this search.</p>
      ) : null}
      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
