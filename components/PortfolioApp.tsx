
"use client";

import { Navbar } from "@/components/ui/Navbar";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { About } from "@/components/sections/About";
import { Awards } from "@/components/sections/Awards";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Resume } from "@/components/sections/Resume";
import { ScrollEffects } from "@/components/sections/ScrollEffects";
import { Skills } from "@/components/sections/Skills";
import { WorldProvider, useWorld } from "@/components/world/WorldContext";
import { prefersReducedMotion, supportsWebGL } from "@/lib/webgl";
import { useEffect, useState } from "react";

function Shell() {
  const {
    setExploreMode,
    exploreMode,
    setWebgl,
    setReducedMotion,
    sceneReady,
    reducedMotion,
  } = useWorld();

  const [progress, setProgress] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const webgl = supportsWebGL();

    setWebgl(webgl);
    setReducedMotion(prefersReducedMotion());

    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const onChange = () => setReducedMotion(media.matches);

    media.addEventListener("change", onChange);

    return () => media.removeEventListener("change", onChange);
  }, [setReducedMotion, setWebgl]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((value) =>
        Math.min(value + 7, sceneReady ? 100 : 88)
      );
    }, 120);

    return () => window.clearInterval(timer);
  }, [sceneReady]);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = window.setTimeout(
        () => setLoading(false),
        250
      );

      return () => window.clearTimeout(timeout);
    }
  }, [progress]);

  useEffect(() => {
    if (!supportsWebGL()) {
      setProgress(100);
    }

    const timeout = window.setTimeout(
      () => setProgress(100),
      6000
    );

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <>
      <LoadingScreen
        progress={progress}
        visible={loading}
      />

      <Navbar
        onEnterWorld={() => setExploreMode(true)}
        exploreMode={exploreMode}
      />

      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Awards />
        <Education />
        <Resume />
        <Contact />
      </main>

      <footer className="border-t border-slate-200 bg-white px-4 py-8">
        <div className="mx-auto flex w-[min(1120px,100%)] flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-xs leading-6 text-slate-500 sm:text-left">
            © {new Date().getFullYear()} Selvakumar · Senior Full Stack Developer · Chennai, India
          </p>

          <button
            type="button"
            className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() => setReducedMotion(!reducedMotion)}
          >
            {reducedMotion
              ? "Enable motion"
              : "Use reduced motion"}
          </button>
        </div>
      </footer>

      <ScrollEffects />
    </>
  );
}

export function PortfolioApp() {
  return (
    <WorldProvider>
      <Shell />
    </WorldProvider>
  );
}
