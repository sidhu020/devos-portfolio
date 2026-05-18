import type { TerminalCommand } from "@/types/terminal";

export const resumeCommand: TerminalCommand = {
  name: "resume",
  description: "Download or open the recruiter-aligned developer resume",
  usage: "resume",
  execute: () => {
    // Attempt to open in a new tab immediately
    try {
      window.open("/resume.pdf", "_blank", "noopener,noreferrer");
    } catch {
      // ignore popup blocking
    }

    return {
      type: "lines",
      kind: "success",
      lines: [
        "📄 Launching Resume download...",
        "------------------------------------",
        "If the document did not open automatically, click the direct link below:",
        "➡️ URL: devos-portfolio.vercel.app/resume.pdf",
      ],
    };
  },
};
