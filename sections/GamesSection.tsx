"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Keyboard, Binary, Puzzle, TerminalSquare, X } from "lucide-react";

import { cn } from "@/lib/cn";
import { fadeInUp, staggerChildren } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { Eyebrow, H2 } from "@/components/ui/Heading";

import { TicTacToe } from "@/components/games/TicTacToe";
import { TypingTest } from "@/components/games/TypingTest";
import { BinaryDecoder } from "@/components/games/BinaryDecoder";
import { MemoryMatch } from "@/components/games/MemoryMatch";
import { TerminalEscape } from "@/components/games/TerminalEscape";

const GAMES = [
  { id: "tictactoe", name: "Tic Tac Toe", desc: "Classic VS Computer", icon: <Gamepad2 className="size-6" /> },
  { id: "typing", name: "Typing Speed", desc: "Code snippet WPM test", icon: <Keyboard className="size-6" /> },
  { id: "binary", name: "Binary Decoder", desc: "Translate hex/binary", icon: <Binary className="size-6" /> },
  { id: "memory", name: "Memory Match", desc: "Tech stack icons", icon: <Puzzle className="size-6" /> },
  { id: "escape", name: "Terminal Escape", desc: "CLI puzzle adventure", icon: <TerminalSquare className="size-6" /> },
];

export function GamesSection({ className }: { className?: string }) {
  const [activeGame, setActiveGame] = React.useState<string | null>(null);

  return (
    <Section id="games" className={cn(className)}>
      <motion.div {...fadeInUp} className="mb-10 sm:mb-16 text-center">
        <Eyebrow>Simulation Lab</Eyebrow>
        <H2 className="mt-4 flex items-center justify-center gap-3">
          <Gamepad2 className="size-8" />
          Mini Games
        </H2>
        <p className="mt-4 mx-auto max-w-2xl text-devos-muted sm:text-lg leading-relaxed">
          Executable logic puzzles and terminal simulators.
        </p>
      </motion.div>

      <motion.div
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
      >
        {GAMES.map((game) => (
          <button
            key={game.id}
            type="button"
            onClick={() => setActiveGame(game.id)}
            className="devos-focus-ring devos-tilt group flex flex-col items-center justify-center gap-4 rounded-3xl border border-devos-border bg-white/3 p-8 text-center transition hover:bg-white/5 active:scale-95"
          >
            <div className="rounded-2xl bg-devos-surface p-4 text-devos-accent group-hover:scale-110 transition-transform">
              {game.icon}
            </div>
            <div>
              <div className="font-semibold text-devos-text">{game.name}</div>
              <div className="text-xs text-devos-muted mt-1">{game.desc}</div>
            </div>
          </button>
        ))}
      </motion.div>

      <AnimatePresence>
        {activeGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="devos-glass relative w-full max-w-md overflow-hidden rounded-3xl border border-devos-border shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-devos-border bg-devos-surface/50 px-4 py-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-devos-text font-mono">
                  <Gamepad2 className="size-4 text-devos-accent animate-pulse" />
                  {GAMES.find((g) => g.id === activeGame)?.name}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveGame(null)}
                  className="rounded-full p-1 text-devos-muted hover:bg-white/10 hover:text-devos-text transition"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="p-6 bg-devos-surface/30">
                {activeGame === "tictactoe" && <TicTacToe />}
                {activeGame === "typing" && <TypingTest />}
                {activeGame === "binary" && <BinaryDecoder />}
                {activeGame === "memory" && <MemoryMatch />}
                {activeGame === "escape" && <TerminalEscape />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
