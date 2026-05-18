import type { TerminalCommand } from "@/types/terminal";

export function helpCommand(
  getCommands: () => Array<{ name: string; description: string; hidden?: boolean }>,
): TerminalCommand {
  return {
    name: "help",
    description: "List available commands",
    usage: "help [--hidden]",
    execute: (args, ctx) => {
      ctx.trackCommand("help");

      const showHidden = args.includes("--hidden");
      const cmds = getCommands();

      if (showHidden) {
        ctx.unlockAchievement("system-hacker");
        const hidden = cmds.filter((c) => c.hidden);
        if (hidden.length === 0) {
          return {
            type: "lines",
            kind: "system",
            lines: ["No hidden commands found. Or are there?"],
          };
        }
        return {
          type: "lines",
          kind: "system",
          lines: [
            "🔓 Secret commands unlocked:",
            "",
            ...hidden.map((c) => `  ${c.name.padEnd(16)} ${c.description}`),
            "",
            "You found the hidden layer. Achievement unlocked.",
          ],
        };
      }

      const visible = cmds.filter((c) => !c.hidden);
      return {
        type: "lines",
        kind: "system",
        lines: [
          "Available commands:",
          "",
          ...visible.map((c) => `  ${c.name.padEnd(16)} ${c.description}`),
          "",
          "Tip: try `neofetch`, `whoami`, or `help --hidden`",
          "     Use Tab for autocomplete, ↑/↓ for history",
        ],
      };
    },
  };
}
