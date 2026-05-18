export type Project = {
  id: string;
  name: string;
  short: string;
  problem: string;
  impact: string;
  stack: string[];
  highlights: string[];
  link?: string;
  github?: string;
};

export const projects: Project[] = [
  {
    id: "devos",
    name: "DevOS Terminal Portfolio",
    short: "High-fidelity, CLI-driven developer operating system sandbox.",
    problem: "Linear portfolios fail to showcase a developer's Command Line comfort, shell proficiency, and system-level thinking.",
    impact: "Created a futuristic CLI + GUI experience that increased average recruiter session length and gamified resume discovery.",
    stack: ["Next.js 16", "TypeScript", "Framer Motion", "Lenis Scroll", "TailwindCSS"],
    highlights: [
      "Custom shell command interpreter with real-time autocompletion, Tab completions, and session Command History persistence.",
      "Global Command Palette (Ctrl+K) modal with keyboard fuzzy routing and fully accessible ARIA layouts.",
      "100% hydration-safe boot sequence and customized error boundaries protecting runtime integrity.",
      "Integrated localStorage achievement system that gamifies portfolio exploration."
    ],
    link: "https://devos-portfolio.vercel.app",
    github: "https://github.com/sidhu020/devos-portfolio"
  },
  {
    id: "scms",
    name: "Service Center Management System (SCMS)",
    short: "Next-gen web portal optimizing appliance repair tracking, assignments, and status alerts.",
    problem: "Manual maintenance logging led to scheduling inefficiencies, slow technician routing, and communication gaps for dealers.",
    impact: "Streamlined complaint workflows from registration to resolution with admin and dealer dashboards that automated assignments.",
    stack: ["Core PHP", "MySQL", "Bootstrap", "JavaScript", "jQuery", "AJAX"],
    highlights: [
      "Engineered a secure complaint routing and dealer-to-technician dispatch module in vanilla PHP.",
      "Designed customized administrative and dealer dashboards for clear diagnostic and volume insights.",
      "Integrated dynamic status tracking using jQuery AJAX requests to achieve zero-refresh state updates.",
      "Optimized local database schema with index keys to keep lookup queries under 10ms."
    ],
    github: "https://github.com/siddharth1703tnr/scms"
  },
  {
    id: "financial-audit-openenv",
    name: "Financial Audit OpenEnv",
    short: "Dockerized simulation playground evaluating AI agents on complex financial auditing and fraud analysis.",
    problem: "Benchmark systems lack deterministic sandboxed environments to safely run and measure auditing models on real transactions.",
    impact: "Allowed safe, multi-step fraud detection, spreadsheet logic corrections, and approval pipeline evaluations.",
    stack: ["Docker", "Python", "Shell Scripting", "API Security"],
    highlights: [
      "Built safe isolated sandboxing with docker-compose simulating real-world transaction structures.",
      "Designed deterministic multi-difficulty tasks covering single fraud, formula errors, and dependency checks.",
      "Supported programmatic hooks like flag_expense, fix_formula, approve_report, and request_info.",
      "Packaged as a zero-config container runnable at port 7860 to support continuous integration runs."
    ],
    github: "https://github.com/sidhu020/financial-audit-openenv"
  },
  {
    id: "nodenet",
    name: "NodeNet Offline Network Manager",
    short: "Browser-based offline CS lab file coordinator featuring user storage and node sharing.",
    problem: "Disconnected computer labs lack an easy mechanism to distribute, collaborate, and edit files without external networks.",
    impact: "Delivered a decentralized macOS-like desktop SPA allowing nested directory browsing, sharing, and active network nodes.",
    stack: ["PHP 8+", "MySQL", "Vanilla JavaScript", "PDO", "XAMPP"],
    highlights: [
      "Authored an interactive IDE-like code editor supporting live browser previewing and drag-and-drop folder uploads.",
      "Constructed a folder-to-ZIP compression downloader allowing bulk transfers inside standard HTTP sessions.",
      "Formulated a live network dashboard tracking active node count and hosting live public explorer folders.",
      "Implemented session-based user authentication and PDO prepared statements ensuring secure database containment."
    ],
    github: "https://github.com/sidhu020/NodeNet"
  }
];
