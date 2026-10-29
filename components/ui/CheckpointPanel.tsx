"use client";

import { useWorld } from "@/components/world/WorldContext";
import { awards } from "@/data/awards";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { AnimatePresence, motion } from "framer-motion";

export function CheckpointPanel() {
  const { activeCheckpoint, exploreMode } = useWorld();
  if (!exploreMode || !activeCheckpoint) return null;

  const project = projects.find((item) => item.id === activeCheckpoint.projectId);
  const skills = skillCategories.find(
    (item) => item.id === activeCheckpoint.skillCategoryId,
  );

  return (
    <AnimatePresence>
      <motion.aside
        key={activeCheckpoint.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        className="pointer-events-auto absolute bottom-6 left-1/2 z-20 w-[min(420px,calc(100%-1.5rem))] -translate-x-1/2 rounded-3xl border border-white/10 bg-[#07091ae6] p-5 text-slate-200 backdrop-blur-xl md:left-6 md:translate-x-0"
      >
        <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300">
          {activeCheckpoint.kind}
        </p>
        <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl text-white">
          {activeCheckpoint.title}
        </h2>
        <p className="mt-1 text-sm text-slate-400">{activeCheckpoint.subtitle}</p>
        {activeCheckpoint.kind === "about" ? (
          <p className="mt-3 text-sm text-slate-300">{profile.longSummary}</p>
        ) : null}
        {activeCheckpoint.kind === "experience" ? (
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {experience.responsibilities.slice(0, 3).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        {project ? (
          <>
            <p className="mt-3 text-sm text-slate-300">{project.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-full bg-white/5 px-2 py-0.5 text-[11px]">
                  {tech}
                </span>
              ))}
            </div>
          </>
        ) : null}
        {skills ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {skills.items.map((item) => (
              <span key={item} className="rounded-full bg-white/5 px-2 py-0.5 text-[11px]">
                {item}
              </span>
            ))}
          </div>
        ) : null}
        {activeCheckpoint.kind === "awards" ? (
          <ul className="mt-3 space-y-1 text-sm">
            {awards.map((award) => (
              <li key={award.id}>{award.title}</li>
            ))}
          </ul>
        ) : null}
        {activeCheckpoint.kind === "education" ? (
          <p className="mt-3 text-sm">
            {education.degree}, {education.institution}, {education.period}
          </p>
        ) : null}
        {activeCheckpoint.kind === "contact" ? (
          <div className="mt-3 space-y-1 text-sm">
            <a className="block text-cyan-300 underline" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="block underline" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="block underline" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        ) : null}
      </motion.aside>
    </AnimatePresence>
  );
}
