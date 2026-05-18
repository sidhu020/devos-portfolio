import type { TerminalCommand } from "@/types/terminal";
import { getAllAchievements } from "@/lib/achievements";

export const achievementsCommand: TerminalCommand = {
  name: "achievements",
  description: "View unlocked achievements",
  usage: "achievements",
  hidden: true,
  execute: () => {
    const all = getAllAchievements();
    const unlocked = all.filter((a) => a.unlocked);
    const locked = all.filter((a) => !a.unlocked);

    const lines: string[] = [
      "╭─ Achievements ─────────────────────────╮",
      `│  Unlocked: ${unlocked.length}/${all.length}                           │`,
      "├─────────────────────────────────────────┤",
    ];

    for (const a of unlocked) {
      lines.push(`│  ${a.icon}  ${a.title.padEnd(24)} ✓ unlocked  │`);
    }

    if (locked.length > 0) {
      lines.push("├─────────────────────────────────────────┤");
      for (const a of locked) {
        lines.push(`│  🔒  ${a.title.padEnd(24)} locked      │`);
      }
    }

    lines.push("╰─────────────────────────────────────────╯");

    return {
      type: "lines",
      kind: "output" as const,
      lines,
    };
  },
};
