"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/cn";
import { fadeInUp } from "@/lib/motion";
import { useTerminal } from "@/hooks/useTerminal";
import { TerminalInput } from "@/components/terminal/TerminalInput";
import { TerminalOutput } from "@/components/terminal/TerminalOutput";

export function Terminal({ className }: { className?: string }) {
  const { lines, input, setInput, onKeyDown, prompt, suggestions, isSimulating } = useTerminal();
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <motion.section
      {...fadeInUp}
      id="terminal"
      className={cn("devos-glass rounded-3xl", className)}
      aria-label="Terminal"
      onMouseDown={() => {
        queueMicrotask(() => inputRef.current?.focus());
      }}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-devos-border px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-red-400/80" />
          <span className="size-2 rounded-full bg-yellow-400/80" />
          <span className="size-2 rounded-full bg-green-400/80" />
          <span className="ml-2 text-sm font-medium text-devos-text">Terminal</span>
          {isSimulating && (
            <span className="ml-2 inline-flex items-center gap-1 text-xs text-devos-cyan">
              <span className="inline-block size-1.5 animate-pulse rounded-full bg-devos-cyan" />
              running
            </span>
          )}
        </div>
        <span className="text-xs font-mono text-devos-muted">devos@local:~</span>
      </div>

      {/* Terminal body */}
      <div className="flex max-h-[60vh] min-h-[360px] flex-col gap-3 px-4 py-4 sm:px-5">
        <TerminalOutput lines={lines} />

        {/* Autocomplete suggestions */}
        {suggestions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-1">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                className="rounded-lg border border-devos-border bg-white/3 px-2 py-1 font-mono text-xs text-devos-muted transition hover:bg-white/8 hover:text-devos-text"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setInput(s);
                  queueMicrotask(() => inputRef.current?.focus());
                }}
              >
                {s}
                <span className="ml-1.5 text-devos-cyan/50">↹</span>
              </button>
            ))}
          </div>
        )}

        <TerminalInput
          inputRef={inputRef}
          value={input}
          onChange={setInput}
          onKeyDown={onKeyDown}
          prompt={prompt}
          disabled={isSimulating}
          ghostText={suggestions.length === 1 ? suggestions[0].slice(input.trim().length) : undefined}
        />
      </div>
    </motion.section>
  );
}
