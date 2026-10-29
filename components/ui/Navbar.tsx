"use client";

import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#awards", label: "Awards" },
  { href: "#contact", label: "Contact" },
];

export function Navbar({
  onEnterWorld,
  exploreMode,
}: {
  onEnterWorld: () => void;
  exploreMode: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter((node): node is Element => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>
      <div className="mx-auto mt-3 flex w-[min(1120px,calc(100%-1.5rem))] items-center justify-between rounded-full border border-white/10 bg-[#07091a]/80 px-4 py-2 backdrop-blur-xl">
        <a href="#home" className="font-[family-name:var(--font-display)] text-sm text-white">
          {profile.name}
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-slate-300 transition hover:text-white",
                active === link.href && "bg-white/10 text-white",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={profile.resumePath}
            className="hidden rounded-full border border-cyan-400/30 px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-cyan-200 hover:bg-cyan-400/10 sm:inline-flex"
          >
            Download Resume
          </a>
          <button
            type="button"
            onClick={onEnterWorld}
            className="hidden rounded-full bg-violet-600 px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-white hover:bg-violet-500 md:inline-flex"
          >
            {exploreMode ? "3D Mode On" : "3D Mode"}
          </button>
          <button
            type="button"
            className="rounded-full p-2 text-white lg:hidden"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open ? (
        <nav
          className="mx-auto mt-2 w-[min(1120px,calc(100%-1.5rem))] rounded-3xl border border-white/10 bg-[#07091a]/95 p-4 lg:hidden"
          aria-label="Mobile"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block rounded-xl px-3 py-2 text-sm text-slate-200 hover:bg-white/5"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={profile.resumePath}
            className="mt-2 block rounded-xl px-3 py-2 text-sm text-cyan-200"
            onClick={() => setOpen(false)}
          >
            Download Resume
          </a>
        </nav>
      ) : null}
    </header>
  );
}
