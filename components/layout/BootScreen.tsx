"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/cn";
import { useBootSequence } from "@/hooks/useBootSequence";
import { Button } from "@/components/ui/Button";

type BootScreenProps = {
  className?: string;
  children: React.ReactNode;
};

const LINES = [
  "Initializing DevOS…",
  "Loading system modules…",
  "Verifying access…",
  "Access granted.",
] as const;

function useTypeLines(enabled: boolean, onDone: () => void) {
  // Minimal typewriter, no extra deps.
  const [lineIdx, setLineIdx] = React.useState(0);
  const [charIdx, setCharIdx] = React.useState(0);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (!enabled) return;
    if (done) return;

    const current = LINES[lineIdx] ?? "";
    const isLineComplete = charIdx >= current.length;

    const delay = isLineComplete ? 420 : 22;
    const t = window.setTimeout(() => {
      if (isLineComplete) {
        if (lineIdx >= LINES.length - 1) {
          setDone(true);
          window.setTimeout(onDone, 650);
          return;
        }
        setLineIdx((v) => v + 1);
        setCharIdx(0);
        return;
      }
      setCharIdx((v) => v + 1);
    }, delay);

    return () => window.clearTimeout(t);
  }, [charIdx, done, enabled, lineIdx, onDone]);

  const visibleLines = React.useMemo(() => {
    return LINES.map((line, i) => {
      if (i < lineIdx) return line;
      if (i > lineIdx) return "";
      return line.slice(0, charIdx);
    });
  }, [charIdx, lineIdx]);

  return { visibleLines, done };
}

export function BootScreen({ className, children }: BootScreenProps) {
  const { state, finish, reducedMotion } = useBootSequence();

  const { visibleLines } = useTypeLines(state === "booting" && !reducedMotion, finish);

  return (
    <>
      {children}
      <AnimatePresence>
        {state === "booting" && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed inset-0 z-50 grid place-items-center overflow-hidden",
              "bg-devos-bg text-devos-text",
              className,
            )}
            role="dialog"
            aria-label="Boot screen"
          >
            <div className="pointer-events-none absolute inset-0 devos-grid opacity-80" />
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/25 to-black/60" />
              <div className="absolute inset-0 opacity-30 [background:repeating-linear-gradient(to_bottom,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_2px,transparent_6px)]" />
            </div>

            <div className="relative mx-auto w-full max-w-lg px-4 sm:px-6 [padding-bottom:calc(env(safe-area-inset-bottom,0px)+16px)]">
              <div className="devos-glass rounded-2xl p-5 sm:p-7">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-sm font-semibold tracking-wide">
                    DevOS Boot
                  </div>
                  <div className="text-xs text-devos-muted font-mono">
                    v0.1 phase-1
                  </div>
                </div>

                <div className="space-y-2 font-mono text-sm text-devos-muted">
                  {(reducedMotion ? LINES : visibleLines).map((l, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-devos-cyan">&gt;</span>
                      <span className="min-h-[1.25rem]">
                        {l}
                        {idx === (reducedMotion ? LINES.length - 1 : visibleLines.findLastIndex(Boolean)) && (
                          <span
                            className={cn(
                              "ml-0.5 inline-block h-4 w-2 translate-y-[2px] bg-devos-muted/70",
                              reducedMotion ? "opacity-60" : "animate-pulse",
                            )}
                          />
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-end gap-2">
                  <div className="pointer-events-auto">
                    <Button variant="ghost" size="sm" onClick={finish}>
                      Skip intro
                    </Button>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-center text-xs text-devos-muted">
                Tip: animations respect reduced-motion preferences.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

