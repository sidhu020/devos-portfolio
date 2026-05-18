import type { TerminalCommand } from "@/types/terminal";

export const contactCommand: TerminalCommand = {
  name: "contact",
  description: "Show contact info",
  usage: "contact",
  execute: () => ({
    type: "lines",
    kind: "output",
    lines: [
      "📞 CONTACT CHANNELS:",
      "-------------------------",
      "  Email:    siddharthborisagar1234@gmail.com",
      "  GitHub:   github.com/sidhu020",
      "  LinkedIn: linkedin.com/in/siddharthborisagar",
      "  Resume:   devos-portfolio.vercel.app/resume.pdf",
    ],
  }),
};

