import type { TerminalCommand } from "@/types/terminal";

export const neofetchCommand: TerminalCommand = {
  name: "neofetch",
  description: "Display system profile card",
  usage: "neofetch",
  execute: (_args, ctx) => {
    ctx.unlockAchievement("neofetch");
    return {
      type: "simulated",
      lines: [
        { text: "", kind: "output", delayMs: 100 },
        { text: "  ██████╗ ███████╗██╗   ██╗ ██████╗ ███████╗", kind: "accent", delayMs: 40 },
        { text: "  ██╔══██╗██╔════╝██║   ██║██╔═══██╗██╔════╝", kind: "accent", delayMs: 40 },
        { text: "  ██║  ██║█████╗  ██║   ██║██║   ██║███████╗", kind: "accent", delayMs: 40 },
        { text: "  ██████╔╝██╔══╝  ╚██╗ ██╔╝██║   ██║╚════██║", kind: "accent", delayMs: 40 },
        { text: "  ██╔══██╗███████╗ ╚████╔╝ ╚██████╔╝███████║", kind: "accent", delayMs: 40 },
        { text: "  ╚═╝  ╚═╝╚══════╝  ╚═══╝   ╚═════╝ ╚══════╝", kind: "accent", delayMs: 40 },
        { text: "", kind: "output", delayMs: 60 },
        { text: "  ─────────────────────────────────────", kind: "system", delayMs: 80 },
        { text: "  OS        DevOS v0.3.0 (Phase 3)", kind: "output", delayMs: 60 },
        { text: "  Host      Portfolio Terminal", kind: "output", delayMs: 60 },
        { text: "  Kernel    Next.js 16 + React 19", kind: "output", delayMs: 60 },
        { text: "  Shell     devos-terminal v3.0", kind: "output", delayMs: 60 },
        { text: "  CPU       TypeScript Core @ 5.x GHz", kind: "success", delayMs: 60 },
        { text: "  RAM       1024 MB / ∞ (creative mode)", kind: "success", delayMs: 60 },
        { text: "  Uptime    Since 2022", kind: "output", delayMs: 60 },
        { text: "  Packages  framer-motion, tailwind v4", kind: "output", delayMs: 60 },
        { text: "  Theme     Deep Space [dark]", kind: "accent", delayMs: 60 },
        { text: "  ─────────────────────────────────────", kind: "system", delayMs: 80 },
        { text: "  Status    ● All systems operational", kind: "success", delayMs: 120 },
        { text: "", kind: "output", delayMs: 0 },
      ],
    };
  },
};
