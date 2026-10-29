"use client";

import { getGsap } from "@/lib/gsap-client";
import { useEffect } from "react";
import { useWorld } from "@/components/world/WorldContext";

export function ScrollEffects() {
  const { reducedMotion } = useWorld();

  useEffect(() => {
    if (reducedMotion) return;
    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          },
        );
      });
      gsap.utils.toArray<HTMLElement>("section").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0.72 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top 80%", end: "top 30%", scrub: true },
          },
        );
      });
    });
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [reducedMotion]);

  return null;
}
