"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const TECHS = ["React", "NextJS", "NodeJS", "Docker", "Python", "Golang"];

type Card = {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export function MemoryMatch() {
  const [cards, setCards] = React.useState<Card[]>([]);
  const [selected, setSelected] = React.useState<number[]>([]);
  const [moves, setMoves] = React.useState(0);
  const [completed, setCompleted] = React.useState(false);

  // Shuffle and set up board
  const setupBoard = React.useCallback(() => {
    const list = [...TECHS, ...TECHS]
      .map((symbol, idx) => ({
        id: idx,
        symbol,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(list);
    setSelected([]);
    setMoves(0);
    setCompleted(false);
  }, []);

  React.useEffect(() => {
    setupBoard();
  }, [setupBoard]);

  const handleCardClick = (id: number) => {
    if (selected.length === 2) return; // Prevent clicking more than two cards

    const clickedCard = cards.find((c) => c.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    // Flip selected card
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c))
    );

    const newSelected = [...selected, id];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setMoves((v) => v + 1);
      const [firstId, secondId] = newSelected;
      const firstCard = cards.find((c) => c.id === firstId)!;
      const secondCard = cards.find((c) => c.id === secondId)!;

      if (firstCard.symbol === secondCard.symbol) {
        // Matched!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isMatched: true }
                : c
            )
          );
          setSelected([]);

          // Check Win Condition
          setCards((prev) => {
            const allMatched = prev.every((c) => c.isMatched || c.id === firstId || c.id === secondId);
            if (allMatched) setCompleted(true);
            return prev;
          });
        }, 300);
      } else {
        // Mismatch — flip back
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setSelected([]);
        }, 800);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 text-devos-text">
      <div className="flex items-center justify-between border-b border-devos-border pb-3">
        <div className="font-mono text-xs text-devos-muted uppercase tracking-wider">
          Moves: <span className="text-devos-cyan font-bold">{moves}</span>
        </div>
        <div className="font-mono text-xs text-devos-muted">
          {completed ? (
            <span className="text-emerald-400 font-bold uppercase animate-bounce">System Solved!</span>
          ) : (
            <span>Find the matching pairs</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2.5 max-w-sm mx-auto w-full">
        {cards.map((card) => {
          const revealed = card.isFlipped || card.isMatched;
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="devos-focus-ring relative aspect-square w-full select-none outline-none"
            >
              <motion.div
                animate={{ rotateY: revealed ? 180 : 0 }}
                transition={{ duration: 0.4 }}
                style={{ transformStyle: "preserve-3d" }}
                className="size-full cursor-pointer rounded-xl"
              >
                {/* Card Back */}
                <div
                  style={{ backfaceVisibility: "hidden" }}
                  className="absolute inset-0 flex items-center justify-center rounded-xl border border-devos-border bg-black/40 text-devos-muted/40 hover:bg-white/5 transition"
                >
                  <span className="font-mono text-xs font-bold">OS</span>
                </div>

                {/* Card Front */}
                <div
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                  className={`absolute inset-0 flex items-center justify-center rounded-xl border font-mono text-xs font-bold ${
                    card.isMatched
                      ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-400"
                      : "border-devos-cyan/40 bg-devos-cyan/10 text-devos-cyan"
                  }`}
                >
                  {card.symbol}
                </div>
              </motion.div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <Button variant="secondary" size="sm" onClick={setupBoard}>
          Reset Cards
        </Button>
      </div>
    </div>
  );
}
