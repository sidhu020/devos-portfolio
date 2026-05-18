"use client";

import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

type BootState = "booting" | "ready";

const SESSION_KEY = "devos.boot.done";

export function useBootSequence() {
  const reducedMotion = useReducedMotion();
  const [state, setState] = useState<BootState>("booting");

  // Hydration-safe session check
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        setState("ready");
      }
    } catch {
      // ignore
    }
  }, []);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }
    setState("ready");
  }, []);

  useEffect(() => {
    if (state !== "booting") return;
    if (!reducedMotion) return;

    // Avoid synchronous setState inside effect (lint + perf).
    const t = window.setTimeout(() => finish(), 0);
    return () => window.clearTimeout(t);
  }, [finish, reducedMotion, state]);

  return { state, finish, reducedMotion } as const;
}
