import type { TerminalCommand } from "@/types/terminal";

export const hireCommand: TerminalCommand = {
  name: "hire",
  description: "Recruit Siddharth (displays contact details, resume link, and links)",
  usage: "hire me",
  execute: (args, ctx) => {
    ctx.unlockAchievement("hired");

    return {
      type: "simulated",
      lines: [
        { text: "Initializing recruitment protocol...", kind: "system" as const, delayMs: 400 },
        { text: "Loading contact channels...", kind: "system" as const, delayMs: 300 },
        { text: "", kind: "output" as const, delayMs: 100 },
        { text: "╔══════════════════════════════════════════════════════╗", kind: "success" as const, delayMs: 50 },
        { text: "║             🤝 RECRUITMENT PORTAL INITIATED          ║", kind: "success" as const, delayMs: 100 },
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
