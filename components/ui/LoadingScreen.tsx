"use client";

import { profile } from "@/data/profile";
import { AnimatePresence, motion } from "framer-motion";

export function LoadingScreen({
  progress,
  visible,
}: {
  progress: number;
  visible: boolean;
}) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-80 flex flex-col items-center justify-center bg-[#05060d]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">
            Initializing world
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-white sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-2 text-slate-400">{profile.role}</p>
          <div className="mt-10 h-1.5 w-64 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-linear-to-r from-violet-500 to-cyan-400 transition-[width] duration-200"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-slate-500">{Math.round(progress)}%</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
