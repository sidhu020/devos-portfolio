"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { CommandContext, TerminalLine, TerminalLineKind } from "@/types/terminal";
import { createCommandRegistry } from "@/components/terminal/commands/registry";
import { tokenizeCommand } from "@/lib/terminal/parse";
import { unlockAchievement, trackCommandUsage } from "@/lib/achievements";

const HISTORY_KEY = "devos.terminal.history";

function uid() {
  return Math.random().toString(16).slice(2);
}

function line(kind: TerminalLineKind, text: string): TerminalLine {
  return { id: uid(), kind, text, timestamp: Date.now() };
}

export function useTerminal() {
  const registry = useMemo(() => createCommandRegistry(), []);
  const prompt = "devos@local:~$";

  const [lines, setLines] = useState<TerminalLine[]>(() => [
    line("system", "DevOS Terminal v3.0 (Phase 3)"),
    line("system", "Type `help` to list commands. Tab for autocomplete."),
  ]);

  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const historyIdx = useRef<number | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const simulationRef = useRef(false);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) setHistory(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  // Persist history
  const persistHistory = useCallback((h: string[]) => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
    } catch { /* ignore */ }
  }, []);

  const clear = useCallback(() => setLines([]), []);

  // Autocomplete suggestions
  const suggestions = useMemo(() => {
    const trimmed = input.trim().toLowerCase();
    if (!trimmed || trimmed.includes(" ") || isSimulating) return [];
    const allNames = registry.names();
    return allNames.filter((n) => n.startsWith(trimmed) && n !== trimmed).slice(0, 6);
  }, [input, registry, isSimulating]);

  const completeTab = useCallback(() => {
    if (suggestions.length > 0) {
      setInput(suggestions[0]);
    }
  }, [suggestions]);

  const ctx: CommandContext = useMemo(
    () => ({
      now: () => Date.now(),
      clear,
      unlockAchievement: (id: string) => {
        const result = unlockAchievement(id);
        if (result) {
          // Show achievement notification in terminal
          queueMicrotask(() => {
            setLines((prev) => [
              ...prev,
              line("accent", `🏆 Achievement Unlocked: ${result.icon} ${result.title}`),
            ]);
          });
          return { title: result.title, icon: result.icon };
        }
        return null;
      },
      trackCommand: (name: string) => {
        const count = trackCommandUsage(name);
        if (count === 1) {
          unlockAchievement("first-command");
        }
        if (count >= 5) {
          const result = unlockAchievement("terminal-explorer");
          if (result) {
            queueMicrotask(() => {
              setLines((prev) => [
                ...prev,
                line("accent", `🏆 Achievement Unlocked: ${result.icon} ${result.title}`),
              ]);
            });
          }
        }
      },
    }),
    [clear],
  );

  const run = useCallback(
    async (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;
      if (isSimulating) return;

      setLines((prev) => [...prev, line("input", `${prompt} ${trimmed}`)]);

      const newHistory = [trimmed, ...history.filter((h) => h !== trimmed)].slice(0, 50);
      setHistory(newHistory);
      persistHistory(newHistory);
      historyIdx.current = null;

      const { name, args } = tokenizeCommand(trimmed);
      const cmd = registry.get(name);

      if (!cmd) {
        setLines((prev) => [
          ...prev,
          line("error", `Command not found: ${name}`),
          line("system", "Type `help` for available commands."),
        ]);
        return;
      }

      ctx.trackCommand(name);
      const result = await cmd.execute(args, ctx);

      if (result.type === "clear") {
        clear();
        return;
      }

      if (result.type === "simulated") {
        setIsSimulating(true);
        simulationRef.current = true;

        for (const item of result.lines) {
          if (!simulationRef.current) break;
          if (item.delayMs && item.delayMs > 0) {
            await new Promise((r) => setTimeout(r, item.delayMs));
          }
          if (!simulationRef.current) break;
          setLines((prev) => [...prev, line(item.kind ?? "system", item.text)]);
        }

        setIsSimulating(false);
        simulationRef.current = false;
        return;
      }

      const kind = result.kind ?? "output";
      setLines((prev) => [...prev, ...result.lines.map((t) => line(kind, t))]);
    },
    [clear, ctx, history, isSimulating, persistHistory, prompt, registry],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        completeTab();
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        const raw = input;
        setInput("");
        void run(raw);
        return;
      }

      if (e.key === "ArrowUp") {
        if (history.length === 0) return;
        e.preventDefault();
        const next =
          historyIdx.current === null ? 0 : Math.min(historyIdx.current + 1, history.length - 1);
        historyIdx.current = next;
        setInput(history[next] ?? "");
        return;
      }

      if (e.key === "ArrowDown") {
        if (history.length === 0) return;
        e.preventDefault();
        if (historyIdx.current === null) return;
        const next = historyIdx.current - 1;
        if (next < 0) {
          historyIdx.current = null;
          setInput("");
          return;
        }
        historyIdx.current = next;
        setInput(history[next] ?? "");
      }
    },
    [completeTab, history, input, run],
  );

  return {
    lines,
    input,
    setInput,
    onKeyDown,
    run,
    clear,
    commands: registry.list(),
    prompt,
    suggestions,
    isSimulating,
  } as const;
}
