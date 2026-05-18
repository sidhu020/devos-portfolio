import type { TerminalCommand } from "@/types/terminal";

export const clearCommand: TerminalCommand = {
  name: "clear",
  description: "Clear terminal output",
  usage: "clear",
  execute: () => ({ type: "clear" }),
};

