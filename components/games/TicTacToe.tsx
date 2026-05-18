"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";

export function TicTacToe() {
  const [board, setBoard] = React.useState<Array<string | null>>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = React.useState(true);

  const calculateWinner = (squares: Array<string | null>) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && !board.includes(null);

  const handleClick = (i: number) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="flex flex-col items-center p-2 text-devos-text">
      <div className="mb-6 font-mono text-sm tracking-widest text-devos-accent uppercase">
        {winner ? `Winner: ${winner}` : isDraw ? "Draw" : `Next Player: ${xIsNext ? "X" : "O"}`}
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {board.map((cell, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleClick(i)}
            className="devos-focus-ring flex size-20 items-center justify-center rounded-xl border border-devos-border bg-black/40 text-4xl font-light transition hover:bg-white/10"
          >
            <span className={cell === "X" ? "text-devos-accent" : cell === "O" ? "text-devos-purple" : "opacity-0"}>
              {cell ?? "."}
            </span>
          </button>
        ))}
      </div>
      <Button variant="secondary" onClick={reset} className="mt-8">
        Reset Grid
      </Button>
    </div>
  );
}
