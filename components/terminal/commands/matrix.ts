import type { TerminalCommand } from "@/types/terminal";

export const matrixCommand: TerminalCommand = {
  name: "matrix",
  description: "Enter the matrix",
  hidden: true,
  execute: (_args, ctx) => {
    ctx.unlockAchievement("matrix");

    // Toggle matrix mode on document body
    const isActive = document.body.hasAttribute("data-matrix");

    if (isActive) {
      document.body.removeAttribute("data-matrix");
      return {
        type: "lines",
        kind: "success" as const,
        lines: [
          "Exiting the Matrix...",
          "Welcome back to reality.",
          "",
          "Theme restored to Deep Space.",
        ],
      };
    }

    document.body.setAttribute("data-matrix", "true");
    return {
      type: "simulated",
      lines: [
        { text: "Wake up, developer...", kind: "accent" as const, delayMs: 600 },
        { text: "The Matrix has you...", kind: "accent" as const, delayMs: 800 },
        { text: "Follow the green cursor.", kind: "success" as const, delayMs: 600 },
        { text: "", kind: "output" as const, delayMs: 300 },
        { text: "🟢 Matrix mode activated. Run 'matrix' again to exit.", kind: "success" as const, delayMs: 0 },
      ],
    };
  },
};
