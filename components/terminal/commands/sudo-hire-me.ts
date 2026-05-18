import type { TerminalCommand } from "@/types/terminal";

export const sudoHireMeCommand: TerminalCommand = {
  name: "sudo",
  description: "Try `sudo hire-me`",
  usage: "sudo hire-me",
  execute: (args, ctx) => {
    if (args.join(" ") !== "hire-me") {
      return {
        type: "lines",
        kind: "error",
        lines: ["sudo: permission denied (try: sudo hire-me)"],
      };
    }

    ctx.unlockAchievement("hired");

    return {
      type: "simulated",
      lines: [
        { text: "Verifying credentials...", kind: "system" as const, delayMs: 500 },
        { text: "Checking clearance level...", kind: "system" as const, delayMs: 400 },
        { text: "", kind: "output" as const, delayMs: 200 },
        { text: "╔══════════════════════════════════════════════════════╗", kind: "success" as const, delayMs: 50 },
        { text: "║             🤝 RECRUITMENT PROTOCOL ACTIVATED        ║", kind: "success" as const, delayMs: 100 },
        { text: "║                                                      ║", kind: "success" as const, delayMs: 50 },
        { text: "║   Candidate: Siddharth                               ║", kind: "success" as const, delayMs: 100 },
        { text: "║   Role:      MCA Student & Full Stack Developer      ║", kind: "success" as const, delayMs: 100 },
        { text: "║   Focus:     Systems & Networking Enthusiast         ║", kind: "success" as const, delayMs: 100 },
        { text: "║                                                      ║", kind: "success" as const, delayMs: 50 },
        { text: "║   CONTACT CHANNELS:                                  ║", kind: "success" as const, delayMs: 50 },
        { text: "║   - Email:    siddharthborisagar1234@gmail.com       ║", kind: "success" as const, delayMs: 100 },
        { text: "║   - LinkedIn: linkedin.com/in/siddharthborisagar     ║", kind: "success" as const, delayMs: 100 },
        { text: "║   - GitHub:   github.com/sidhu020                    ║", kind: "success" as const, delayMs: 100 },
        { text: "║   - Resume:   devos-portfolio.vercel.app/resume.pdf  ║", kind: "success" as const, delayMs: 100 },
        { text: "║                                                      ║", kind: "success" as const, delayMs: 50 },
        { text: "║   Status: Ready for Interviews                       ║", kind: "success" as const, delayMs: 100 },
        { text: "╚══════════════════════════════════════════════════════╝", kind: "success" as const, delayMs: 0 },
      ],
    };
  },
};
