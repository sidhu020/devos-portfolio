import type { TerminalCommand } from "@/types/terminal";

export const aboutCommand: TerminalCommand = {
  name: "about",
  description: "Show system profile summary",
  usage: "about",
  execute: () => ({
    type: "lines",
    kind: "output",
    lines: [
      "DevOS // System Profile",
      "Role: Full Stack Developer (MCA)",
      "Focus: Web, UI systems, performance",
      "Status: Building Phase 2 terminal + sections",
    ],
  }),
};

