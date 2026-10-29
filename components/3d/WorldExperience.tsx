
"use client";

import { WorldCanvas } from "@/components/3d/WorldCanvas";
import { WorldErrorBoundary } from "@/components/3d/WorldErrorBoundary";
import { CheckpointPanel } from "@/components/ui/CheckpointPanel";
import { TouchControls } from "@/components/ui/TouchControls";
import { useWorld } from "@/components/world/WorldContext";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";
import { RotateCcw, X } from "lucide-react";
import { useEffect } from "react";

function Fallback() {
  return (
    <div className="flex h-full items-center justify-center bg-[#05060d] px-6 text-center text-slate-300">
      <p>
        WebGL is unavailable on this device. Browse the portfolio sections below
        for the full resume experience.
      </p>
    </div>
  );
}

export function WorldExperience() {
  const {
    exploreMode,
    setExploreMode,
    resetWorld,
    webgl,
    setInput,
    reducedMotion,
  } = useWorld();

  useEffect(() => {
    if (!exploreMode) return;
    const keys = new Set<string>();
    const sync = () => {
      const forward =
        keys.has("KeyW") || keys.has("ArrowUp")
          ? 1
          : keys.has("KeyS") || keys.has("ArrowDown")
            ? -1
            : 0;
      const turn =
        keys.has("KeyA") || keys.has("ArrowLeft")
          ? 1
          : keys.has("KeyD") || keys.has("ArrowRight")
            ? -1
            : 0;
      setInput({ forward, turn });
    };
    const onDown = (event: KeyboardEvent) => {
      keys.add(event.code);
      if (
        ["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
          event.code,
        )
      ) {
        event.preventDefault();
      }
      sync();
    };
    const onUp = (event: KeyboardEvent) => {
      keys.delete(event.code);
      sync();
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      setInput({ forward: 0, turn: 0 });
    };
  }, [exploreMode, setInput]);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#05060d]",
        exploreMode
          ? "fixed inset-0 z-40 rounded-none"
          : "h-[min(78vh,760px)] w-full",
      )}
    >
      {webgl ? (
        <WorldErrorBoundary fallback={<Fallback />}>
          <WorldCanvas reducedMotion={reducedMotion} />
        </WorldErrorBoundary>
      ) : (
        <Fallback />
      )}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#05060d] via-transparent to-transparent" />
      <div className="pointer-events-none absolute left-5 top-5 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-xs text-slate-200 backdrop-blur-md">
        <p className="uppercase tracking-[0.2em] text-cyan-300">Navigation</p>
        <p className="mt-2">WASD or arrow keys to drive</p>
        <p>Touch joystick on mobile</p>
        {reducedMotion ? <p className="mt-1 text-slate-400">Reduced motion is on</p> : null}
      </div>
      {exploreMode ? (
        <div className="absolute right-5 top-5 z-20 flex gap-2">
          <button
            type="button"
            onClick={resetWorld}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-2 text-xs text-white"
          >
            <RotateCcw size={14} /> Restart
          </button>
          <button
            type="button"
            onClick={() => {
              setExploreMode(false);
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-2 text-xs text-white"
          >
            Skip to content
          </button>
          <button
            type="button"
            aria-label="Exit 3D mode"
            onClick={() => setExploreMode(false)}
            className="rounded-full border border-white/15 bg-black/50 p-2 text-white"
          >
            <X size={14} />
          </button>
        </div>
      ) : null}
      <CheckpointPanel />
      <TouchControls />
      {!exploreMode ? (
        <p className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-center text-xs text-slate-400">
          {profile.name} · interactive developer world
        </p>
      ) : null}
    </div>
  );
}
