
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

        if (visible?.target.id) {
          setActive(`#${visible.target.id}`);
        }
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
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900"
      >
        Skip to content
      </a>

      <div className="mx-auto mt-3 flex w-[min(1120px,calc(100%-1.5rem))] items-center justify-between rounded-full border border-slate-200/90 bg-white/90 px-4 py-2 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl">
        <a
          href="#home"
          className="shrink-0 font-[family-name:var(--font-display)] text-sm font-bold tracking-tight text-slate-900 sm:text-base"
        >
          {profile.name}
          <span className="ml-1 text-blue-600">.</span>
        </a>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary navigation"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "location" : undefined}
              className={cn(
                "rounded-full px-3 py-2 text-xs font-medium tracking-wide text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950",
                active === link.href &&
                  "bg-blue-50 text-blue-700",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={profile.resumePath}
            className="hidden rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 sm:inline-flex"
          >
            Download Resume
          </a>

          <button
            type="button"
            onClick={onEnterWorld}
            aria-pressed={exploreMode}
            className="hidden rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md md:inline-flex"
          >
            {exploreMode ? "3D Mode On" : "Explore 3D"}
          </button>

          <button
            type="button"
            className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="mx-auto mt-2 w-[min(1120px,calc(100%-1.5rem))] rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur-xl lg:hidden"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "location" : undefined}
              className={cn(
                "block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950",
                active === link.href && "bg-blue-50 text-blue-700",
              )}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <a
            href={profile.resumePath}
            className="mt-2 block rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
            onClick={() => setOpen(false)}
          >
            Download Resume
          </a>

          <button
            type="button"
            onClick={() => {
              onEnterWorld();
              setOpen(false);
            }}
            className="mt-2 w-full rounded-xl bg-blue-600 px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {exploreMode ? "3D Mode On" : "Explore 3D"}
          </button>
        </nav>
      )}
    </header>
  );
}
