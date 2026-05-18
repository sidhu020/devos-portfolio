"use client";

import * as React from "react";

import { cn } from "@/lib/cn";
import type { TerminalLine } from "@/types/terminal";

export function TerminalOutput({
  lines,
  className,
}: {
  lines: TerminalLine[];
  className?: string;
}) {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const shouldStickToBottom = React.useRef(true);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const threshold = 64;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    shouldStickToBottom.current = distanceFromBottom < threshold;

    if (shouldStickToBottom.current) {
      el.scrollTop = el.scrollHeight;
    }
  }, [lines.length]);

  return (
    <div
      ref={scrollRef}
      onScroll={() => {
        const el = scrollRef.current;
        if (!el) return;
        const threshold = 64;
        const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
        shouldStickToBottom.current = distanceFromBottom < threshold;
      }}
      className={cn(
        "flex-1 overflow-auto pr-1 font-mono text-sm leading-relaxed overscroll-contain",
        className,
      )}
    >
      {lines.map((l) => (
        <div
          key={l.id}
          className={cn(
            "whitespace-pre-wrap",
            l.kind === "system" && "text-devos-muted",
            l.kind === "input" && "text-devos-text",
            l.kind === "output" && "text-devos-text",
            l.kind === "error" && "text-red-400",
            l.kind === "success" && "text-emerald-400",
            l.kind === "warning" && "text-amber-400",
            l.kind === "accent" && "text-devos-cyan",
            l.kind === "ascii" && "text-devos-accent font-bold",
          )}
        >
          {l.text}
        </div>
      ))}
    </div>
  );
}
