"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";

const SNIPPETS = [
  "const fetchUser = async (id) => { const res = await fetch(`/users/${id}`); return res.json(); };",
  ".devos-glass { background: rgba(15, 23, 42, 0.72); border: 1px solid rgba(255, 255, 255, 0.08); backdrop-filter: blur(14px); }",
  "SELECT id, name, email FROM students WHERE graduation_year = 2026 ORDER BY GPA DESC LIMIT 10;",
  "const [active, setActive] = React.useState(false); React.useEffect(() => { console.log('mounted'); }, []);"
];

export function TypingTest() {
  const [snippetIdx, setSnippetIdx] = React.useState(0);
  const snippet = SNIPPETS[snippetIdx];

  const [input, setInput] = React.useState("");
  const [startTime, setStartTime] = React.useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = React.useState(30);
  const [isFinished, setIsFinished] = React.useState(false);
  const [wpm, setWpm] = React.useState(0);
  const [accuracy, setAccuracy] = React.useState(100);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  // Focus input automatically
  React.useEffect(() => {
    inputRef.current?.focus();
  }, [snippetIdx, isFinished]);

  // Game timer loop
  React.useEffect(() => {
    if (startTime === null || isFinished) return;

    const timer = window.setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const remaining = Math.max(0, 30 - Math.floor(elapsed));
      setTimeRemaining(remaining);

      // Recalculate metrics
      const typedTotal = input.length;
      if (typedTotal > 0) {
        let correct = 0;
        for (let i = 0; i < typedTotal; i++) {
          if (input[i] === snippet[i]) correct++;
        }
        const calculatedWpm = Math.round((correct / 5) / (elapsed / 60));
        setWpm(calculatedWpm);
        setAccuracy(Math.round((correct / typedTotal) * 100));
      }

      if (remaining === 0 || input.length >= snippet.length) {
        setIsFinished(true);
        window.clearInterval(timer);
      }
    }, 100);

    return () => window.clearInterval(timer);
  }, [startTime, isFinished, input, snippet]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFinished) return;
    const value = e.target.value;

    if (startTime === null) {
      setStartTime(Date.now());
    }

    setInput(value);

    // End immediately if snippet fully typed
    if (value.length >= snippet.length) {
      setIsFinished(true);
    }
  };

  const reset = () => {
    setInput("");
    setStartTime(null);
    setTimeRemaining(30);
    setIsFinished(false);
    setWpm(0);
    setAccuracy(100);
    setSnippetIdx((prev) => (prev + 1) % SNIPPETS.length);
  };

  return (
    <div className="flex flex-col gap-4 text-devos-text">
      <div className="flex items-center justify-between border-b border-devos-border pb-3">
        <div className="font-mono text-xs text-devos-muted uppercase tracking-wider">
          Timer: <span className="text-devos-cyan font-bold">{timeRemaining}s</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-devos-muted">
          <span>WPM: <strong className="text-devos-accent">{wpm}</strong></span>
          <span>Acc: <strong className="text-emerald-400">{accuracy}%</strong></span>
        </div>
      </div>

      {/* Typewriter Character Rendering */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className="devos-focus-ring cursor-text select-none rounded-2xl border border-devos-border bg-black/40 p-4 font-mono text-sm leading-relaxed tracking-wide min-h-[100px] relative transition hover:bg-black/60"
      >
        {snippet.split("").map((char, idx) => {
          let colorClass = "text-devos-muted/50"; // Untyped
          if (idx < input.length) {
            colorClass = input[idx] === char ? "text-emerald-400 font-semibold" : "text-red-400 bg-red-400/20 rounded px-[1px]";
          }
          return (
            <span key={idx} className={colorClass}>
              {char}
            </span>
          );
        })}
        {input.length === snippet.length && (
          <div className="absolute inset-0 flex items-center justify-center bg-devos-surface/90 rounded-2xl backdrop-blur-sm animate-fade-in">
            <span className="text-xs font-mono font-bold tracking-widest text-devos-accent uppercase">
              Snippet Completed!
            </span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleChange}
        disabled={isFinished}
        className="sr-only"
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />

      <div className="flex justify-between items-center gap-3 mt-2">
        <span className="text-[10px] font-mono text-devos-muted">
          *click box above and type key character prompts
        </span>
        <Button variant="secondary" size="sm" onClick={reset}>
          {isFinished ? "Next Snippet" : "Restart Test"}
        </Button>
      </div>
    </div>
  );
}
