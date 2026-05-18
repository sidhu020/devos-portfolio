import type { TerminalCommand } from "@/types/terminal";

export const skillsCommand: TerminalCommand = {
  name: "skills",
  description: "List key skills (Phase 2 will be interactive)",
  usage: "skills",
  execute: () => ({
    type: "lines",
    kind: "output",
    lines: [
      "Skills:",
      "- TypeScript / React / Next.js",
      "- Node.js / APIs",
      "- UI engineering / design systems",
      "- Performance + accessibility",
    ],
  }),
};

