"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { WorldCheckpoint } from "@/lib/world-path";

type InputState = {
  forward: number;
  turn: number;
};

type WorldContextValue = {
  exploreMode: boolean;
  setExploreMode: (value: boolean) => void;
  activeCheckpoint: WorldCheckpoint | null;
  setActiveCheckpoint: (checkpoint: WorldCheckpoint | null) => void;
  resetToken: number;
  resetWorld: () => void;
  webgl: boolean;
  setWebgl: (value: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
  sceneReady: boolean;
  setSceneReady: (value: boolean) => void;
  input: InputState;
  setInput: (input: InputState) => void;
};

const WorldContext = createContext<WorldContextValue | null>(null);

export function WorldProvider({ children }: { children: ReactNode }) {
  const [exploreMode, setExploreMode] = useState(false);
  const [activeCheckpoint, setActiveCheckpoint] =
    useState<WorldCheckpoint | null>(null);
  const [resetToken, setResetToken] = useState(0);
  const [webgl, setWebgl] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [input, setInput] = useState<InputState>({ forward: 0, turn: 0 });

  const resetWorld = useCallback(() => {
    setResetToken((value) => value + 1);
    setActiveCheckpoint(null);
  }, []);

  const value = useMemo(
    () => ({
      exploreMode,
      setExploreMode,
      activeCheckpoint,
      setActiveCheckpoint,
      resetToken,
      resetWorld,
      webgl,
      setWebgl,
      reducedMotion,
      setReducedMotion,
      sceneReady,
      setSceneReady,
      input,
      setInput,
    }),
    [
      exploreMode,
      activeCheckpoint,
      resetToken,
      resetWorld,
      webgl,
      reducedMotion,
      sceneReady,
      input,
    ],
  );

  return (
    <WorldContext.Provider value={value}>{children}</WorldContext.Provider>
  );
}

export function useWorld() {
  const context = useContext(WorldContext);
  if (!context) {
    throw new Error("useWorld must be used within WorldProvider");
  }
  return context;
}
