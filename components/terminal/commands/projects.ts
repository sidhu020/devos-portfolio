import type { TerminalCommand } from "@/types/terminal";
import { projects } from "@/data/projects";

export const projectsCommand: TerminalCommand = {
  name: "projects",
  description: "List featured projects",
  usage: "projects",
  execute: () => ({
    type: "lines",
    kind: "output",
    lines: [
      "📁 FEATURED PROJECTS:",
      "--------------------------------------------------",
      ...projects.flatMap((p) => [
        `  ● ${p.name}`,
        `    Description: ${p.short}`,
        `    Stack:       ${p.stack.join(", ")}`,
        `    Source:      ${p.github ?? "N/A"}`,
        "",
      ]),
      "Tip: Click on projects in the 'Projects' section below to open interactive diagnostic windows.",
    ],
  }),
};

