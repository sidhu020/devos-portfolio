"use client";

import * as React from "react";

import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function TerminalInput({
  inputRef,
  value,
  onChange,
  onKeyDown,
  className,
  prompt = "devos@local:~$",
  disabled = false,
  ghostText,
}: {
  inputRef?: React.RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (next: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  prompt?: string;
  disabled?: boolean;
  ghostText?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative flex items-center gap-2 rounded-2xl border border-devos-border bg-black/25 px-3 py-2 font-mono text-sm transition-all",
        "focus-within:border-devos-cyan/40 focus-within:ring-1 focus-within:ring-devos-cyan/20",
        disabled && "opacity-50 pointer-events-none",
        className,
      )}
    >
      <span className="text-devos-cyan">{prompt}</span>
      <div className="relative flex-1">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={disabled}
          className="w-full bg-transparent text-devos-text outline-none placeholder:text-devos-muted"
          placeholder="Type a command…"
          aria-label="Terminal input"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
        />
        {/* Ghost text for autocomplete preview */}
        {ghostText && (
          <span
            className="pointer-events-none absolute left-0 top-0 h-full flex items-center text-devos-muted/30"
            aria-hidden
          >
            <span className="invisible">{value}</span>
            <span>{ghostText}</span>
          </span>
        )}
      </div>
      <span
        aria-hidden
        className={cn(
          "h-4 w-2 rounded-[1px] bg-devos-cyan/70",
          reducedMotion ? "opacity-60" : "animate-pulse",
        )}
      />
    </div>
  );
}
