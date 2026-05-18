import type { TerminalCommand } from "@/types/terminal";

export const systemCommand: TerminalCommand = {
  name: "system",
  description: "System utilities (try: system simulate, system status)",
  usage: "system <simulate|status>",
  execute: (args) => {
    const sub = args[0]?.toLowerCase();

    if (sub === "simulate" || sub === "simulate about") {
      return {
        type: "simulated",
        lines: [
          { text: "> Initializing kernel modules...", kind: "system" as const, delayMs: 300 },
          { text: "  [████████████████████████████] 100%", kind: "success" as const, delayMs: 400 },
          { text: "> Loading display server...", kind: "system" as const, delayMs: 250 },
          { text: "  [████████████████████████████] 100%", kind: "success" as const, delayMs: 350 },
          { text: "> Starting network daemon...", kind: "system" as const, delayMs: 200 },
          { text: "  [████████████████████████████] 100%", kind: "success" as const, delayMs: 300 },
          { text: "> Mounting filesystems...", kind: "system" as const, delayMs: 200 },
          { text: "  [████████████████████████████] 100%", kind: "success" as const, delayMs: 250 },
          { text: "> Loading user profile...", kind: "system" as const, delayMs: 300 },
          { text: "  [████████████████████████████] 100%", kind: "success" as const, delayMs: 400 },
          { text: "", kind: "output" as const, delayMs: 200 },
          { text: "✓ System boot complete. All services online.", kind: "success" as const, delayMs: 300 },
          { text: "  Ready in 1.85s", kind: "accent" as const, delayMs: 0 },
        ],
      };
    }

    if (sub === "status") {
      return {
        type: "lines",
        kind: "output" as const,
        lines: [
          "┌─ System Status ───────────────────┐",
          "│  CPU Usage      ██░░░░░░░░  22%   │",
          "│  Memory         ████░░░░░░  41%   │",
          "│  Disk           ██████░░░░  58%   │",
          "│  Network        ▲ 12 Mbps          │",
          "│  Processes      47 active           │",
          "│  Status         ● Operational       │",
          "└────────────────────────────────────┘",
        ],
      };
    }

    return {
      type: "lines",
      kind: "system" as const,
      lines: [
        "Usage: system <subcommand>",
        "",
        "Subcommands:",
        "  simulate   — Run simulated boot sequence",
        "  status     — Show system resource usage",
      ],
    };
  },
};
