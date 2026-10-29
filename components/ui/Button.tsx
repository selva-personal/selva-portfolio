"use client";

import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium tracking-wide transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 disabled:opacity-50",
        variant === "primary" &&
          "bg-linear-to-r from-violet-600 to-cyan-500 text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:brightness-110",
        variant === "secondary" &&
          "border border-white/15 bg-white/5 text-slate-100 backdrop-blur-md hover:bg-white/10",
        variant === "ghost" && "text-slate-200 hover:bg-white/5",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
