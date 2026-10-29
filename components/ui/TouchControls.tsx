"use client";

import { useWorld } from "@/components/world/WorldContext";
import { useRef } from "react";

export function TouchControls() {
  const { setInput, exploreMode } = useWorld();
  const origin = useRef({ x: 0, y: 0 });

  if (!exploreMode) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex items-end justify-between px-6 md:hidden">
      <div
        className="pointer-events-auto relative h-32 w-32 rounded-full border border-white/15 bg-white/5"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          origin.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerMove={(event) => {
          if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
          const dx = (event.clientX - origin.current.x) / 48;
          const dy = (origin.current.y - event.clientY) / 48;
          setInput({
            turn: Math.max(-1, Math.min(1, dx)),
            forward: Math.max(-1, Math.min(1, dy)),
          });
        }}
        onPointerUp={() => setInput({ forward: 0, turn: 0 })}
        onPointerCancel={() => setInput({ forward: 0, turn: 0 })}
      >
        <span className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.2em] text-slate-400">
          Steer
        </span>
      </div>
      <div className="pointer-events-auto flex flex-col gap-2">
        <button
          type="button"
          className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-xs uppercase tracking-[0.2em] text-white"
          onPointerDown={() => setInput({ forward: 1, turn: 0 })}
          onPointerUp={() => setInput({ forward: 0, turn: 0 })}
        >
          Accelerate
        </button>
        <button
          type="button"
          className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-xs uppercase tracking-[0.2em] text-white"
          onPointerDown={() => setInput({ forward: -1, turn: 0 })}
          onPointerUp={() => setInput({ forward: 0, turn: 0 })}
        >
          Reverse
        </button>
      </div>
    </div>
  );
}
