"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";

export function BinaryDecoder() {
  const [target, setTarget] = React.useState(0);
  const [binaryStr, setBinaryStr] = React.useState("00000000");
  const [guess, setGuess] = React.useState("");
  const [score, setScore] = React.useState(0);
  const [streak, setStreak] = React.useState(0);
  const [highScore, setHighScore] = React.useState(0);
  const [timeRemaining, setTimeRemaining] = React.useState(15);
  const [feedback, setFeedback] = React.useState<{ text: string; status: "success" | "error" | null }>({ text: "Translate the 8-bit binary number!", status: null });

  // Generate new binary target
  const generateNewTarget = React.useCallback(() => {
    const num = Math.floor(Math.random() * 128) + 1; // 1 to 128
    const bin = num.toString(2).padStart(8, "0");
    setTarget(num);
    setBinaryStr(bin);
    setGuess("");
    setTimeRemaining(15);
  }, []);

  // Initialize
  React.useEffect(() => {
    generateNewTarget();
  }, [generateNewTarget]);

  // Question Timer
  React.useEffect(() => {
    if (timeRemaining <= 0) {
      setStreak(0);
      setFeedback({ text: `Timeout! Correct answer was ${target}`, status: "error" });
      generateNewTarget();
      return;
    }

    const timer = window.setInterval(() => {
      setTimeRemaining((v) => v - 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [timeRemaining, target, generateNewTarget]);

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanGuess = parseInt(guess.trim(), 10);

    if (isNaN(cleanGuess)) {
      setFeedback({ text: "Please enter a valid decimal number!", status: "error" });
      return;
    }

    if (cleanGuess === target) {
      const addedPoints = 10 + streak * 2;
      const newScore = score + addedPoints;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      if (newScore > highScore) setHighScore(newScore);

      setFeedback({ text: `Correct! +${addedPoints} Points!`, status: "success" });
      generateNewTarget();
    } else {
      setStreak(0);
      setFeedback({ text: `Incorrect! ${binaryStr} is actually ${target}`, status: "error" });
      generateNewTarget();
    }
  };

  return (
    <div className="flex flex-col gap-4 text-devos-text">
      <div className="flex items-center justify-between border-b border-devos-border pb-3">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-devos-muted uppercase tracking-wider">Score</span>
          <span className="font-mono text-lg font-bold text-devos-accent">{score}</span>
        </div>
        <div className="flex gap-4 font-mono text-xs text-devos-muted text-right">
          <div>
            <span>Streak: <strong className="text-devos-cyan font-bold">{streak}x</strong></span>
          </div>
          <div>
            <span>High: <strong className="text-emerald-400 font-bold">{highScore}</strong></span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center rounded-2xl border border-devos-border bg-black/40 p-6 text-center">
        {/* Progress timer bar */}
        <div className="w-full bg-white/5 rounded-full h-1 mb-4 overflow-hidden">
          <div 
            className="bg-devos-cyan h-full transition-all duration-1000"
            style={{ width: `${(timeRemaining / 15) * 100}%` }}
          />
        </div>

        <div className="font-mono text-3xl font-extrabold tracking-widest text-devos-cyan animate-pulse">
          {binaryStr.slice(0, 4)} {binaryStr.slice(4)}
        </div>
        <div className={`mt-3 font-mono text-xs ${feedback.status === "success" ? "text-emerald-400" : feedback.status === "error" ? "text-red-400" : "text-devos-muted"}`}>
          {feedback.text}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Decimal value..."
          className="devos-focus-ring flex-1 rounded-xl border border-devos-border bg-black/20 px-3 py-2 font-mono text-sm text-devos-text outline-none placeholder:text-devos-muted/50"
          autoFocus
          autoComplete="off"
        />
        <Button type="submit">Submit</Button>
      </form>

      <div className="flex justify-between items-center text-[10px] font-mono text-devos-muted">
        <span>Bit Weights: 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1</span>
        <Button variant="ghost" size="sm" onClick={generateNewTarget} className="h-6 px-2 text-[10px]">
          Skip Byte
        </Button>
      </div>
    </div>
  );
}
