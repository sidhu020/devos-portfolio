import type { TerminalCommand } from "@/types/terminal";

export const whoamiCommand: TerminalCommand = {
  name: "whoami",
  description: "Display developer identity card",
  usage: "whoami",
  execute: () => ({
    type: "lines",
    kind: "output",
    lines: [
      "",
      "  ╭──────────────────────────────────╮",
      "  │       DEVELOPER IDENTITY         │",
      "  ├──────────────────────────────────┤",
      "  │                                  │",
      "  │  Name     Siddharth              │",
      "  │  Role     Full Stack Developer   │",
      "  │  Degree   MCA (in progress)      │",
      "  │  Focus    Web · UI · Performance │",
      "  │  OS       DevOS v0.3             │",
      "  │                                  │",
      "  │  ● Status: Available for hire    │",
      "  ╰──────────────────────────────────╯",
      "",
    ],
  }),
};
