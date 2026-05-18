# 🌌 DevOS // Siddharth — Developer Portfolio

```text
  ██████╗ ███████╗██╗   ██╗ ██████╗ ███████╗
  ██╔══██╗██╔════╝██║   ██║██╔═══██╗██╔════╝
  ██║  ██║█████╗  ██║   ██║██║   ██║███████╗
  ██████╔╝██╔══╝  ╚██╗ ██╔╝██║   ██║╚════██║
  ██╔══██╗███████╗ ╚████╔╝ ╚██████╔╝███████║
  ╚═╝  ╚═╝╚══════╝  ╚═══╝   ╚═════╝ ╚══════╝
```

[![Next.js](https://img.shields.io/badge/Next.js-16.2-blueviolet?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-ff69b4?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

Welcome to **DevOS**, a futuristic developer portfolio engineered as a digital operating system sandbox. Designed specifically to challenge linear resumes, DevOS integrates an immersive **interactive terminal console**, a **performance-tuned SVG Skill Network**, a **global command palette**, and **desktop-style project windows** into a cohesive recruiter playground.

---

## 🌟 Core System Architecture

1. **Interactive CLI Terminal Simulator**:
   - A fully simulated client-side command interpreter with session history retention.
   - Dynamic tab autocompletion and Up/Down history recall.
   - Built-in Easter eggs and commands (`whoami`, `neofetch`, `matrix`, `achievements`, `sudo hire-me`).
   
2. **Unified Dynamic Data Core**:
   - Dynamic, data-driven CLI execution. The terminal commands dynamically import and parse the portfolio's central data schemas (`data/projects.ts`), ensuring 100% data parity between the graphical desktop elements and terminal queries.

3. **Performance-Optimized Skill Map**:
   - High-fidelity, responsive SVG dynamic network visualization with hover tracking, avoiding heavy WebGL overhead to maintain sub-16ms layout calculations.

4. **Persistent Achievement Engine**:
   - Gamified exploration utilizing an in-memory & `localStorage`-backed achievements system to reward curious recruiters (e.g., unlocking the "Palette Pro" or "Hired" badges).

5. **Glassmorphic OS Desktop Aesthetics**:
   - Premium modern styling featuring smooth HSL color gradients, standard CSS custom styling tokens, spring animations powered by Framer Motion, and global accessibility-compliant ARIA layouts.

---

## 🛠️ Tech Stack & Dependencies

*   **Runtime/Framework:** Next.js 16.2.6 (App Router) & React 19.2.4
*   **Language:** TypeScript 5.x (Strict Typing)
*   **Styling:** Tailwind CSS v4.0 (Utilizing CSS variable tokens)
*   **Animations:** Framer Motion 12.x & GSAP (GreenSock) for high-performance timeline curves
*   **Scrolling:** Lenis Smooth Scroll
*   **Icons:** Lucide React & React Icons (Fa6 pack)

---

## 📁 Repository Structure

```text
devos-portfolio/
│
├── app/                      # Next.js App Router (Layouts, Global CSS, Robots)
├── components/               # UI Component Library
│   ├── layout/               # Global Shell, Command Palette, Custom Cursor
│   ├── projects/             # Desktop project window modals
│   ├── terminal/             # Simulator core and command registry
│   └── ui/                   # Shared primitive components (Buttons, Headings)
│
├── data/                     # Static Portfolio content schemas
│   └── projects.ts           # Centralised project metadata definitions
│
├── hooks/                    # Reusable custom React hooks
├── lib/                      # Utility methods, motion variables, achievements core
├── public/                   # Static media assets, profile assets, resume.pdf
├── sections/                 # Main landing sections (GUI viewports)
└── types/                    # System-wide TypeScript type declarations
```

---

## 💻 Interactive Terminal Command Reference

Type these commands directly into the interactive dashboard terminal to see them run in real time:

| Command | Action | Highlights |
| :--- | :--- | :--- |
| `help` | List Available Commands | Auto-generates from the registry metadata. |
| `neofetch` | System Telemetry Card | Renders visual ascii-art logo and memory footprint telemetry. |
| `whoami` | Developer Identity Card | Prints core developer information, MCA degree status, and focus areas. |
| `about` | System Summary | Quick operational focus profile. |
| `skills` | Key Skill Telemetry | Outlines languages, frameworks, UI, and backend stack components. |
| `projects` | List Case Studies | **Dynamically parses and prints** live projects from `data/projects.ts`! |
| `contact` | Access Socials | Outputs aligned links for LinkedIn, Email, and GitHub. |
| `hire` / `sudo hire-me` | Recruitment Protocol | Launches animated clearance cards and unlocks the hidden "Hired" achievement. |
| `achievements` | Explorer Progress | Reads local storage to check unlocked achievements. |
| `matrix` | Binary Screen Saver | Animates terminal screen with a cascading green rain falling sequence. |
| `clear` | Wipe Terminal Output | Resets the terminal lines buffer array. |

---

## 🚀 Case Studies & Projects Embedded

The system is configured with your real software engineering projects:

### 1️⃣ DevOS Terminal Portfolio
*   **Concept:** Interactive digital terminal and OS resume sandbox.
*   **Stack:** Next.js 16, TypeScript, Framer Motion, Lenis Scroll, Tailwind v4
*   **Key Insight:** Tab autocompletions, global command palettes, local achievements, and full terminal CLI system synchronised directly with structural content.

### 2️⃣ Service Center Management System (SCMS)
*   **Concept:** Enterprise web workflow automating local home appliance maintenance routing.
*   **Stack:** Core PHP, MySQL, Bootstrap, JavaScript, jQuery, AJAX
*   **Key Insight:** Automated complaint registry to technician dispatch module, dynamic status changes with AJAX calls, and tailored admin/dealer performance metrics.

### 3️⃣ Financial Audit OpenEnv
*   **Concept:** Dockerized auditing simulation evaluation harness for financial auditing AI agents.
*   **Stack:** Docker, Python, Shell Scripting, API Security
*   **Key Insight:** Safe container-isolated auditing tasks, multi-difficulty fraud evaluation workflows (single fraud, spreadsheet formulas, dependencies), and custom programmatic hooks.

### 4️⃣ NodeNet Offline Lab Network File Manager
*   **Concept:** A single-page browser-based offline coordinator simulating decentralized macOS style desktop storages.
*   **Stack:** PHP 8+, MySQL, Vanilla JavaScript, PDO, XAMPP
*   **Key Insight:** Built-in code editors, recursive drag-and-drop folder uploads, instant folder-to-ZIP exports, and a live peer-to-peer user node discovery directory.

---

## 🔧 Installation & Local Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18.x or higher) and [npm](https://www.npmjs.com/) installed on your machine.

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/sidhu020/devos-portfolio.git
   cd devos-portfolio
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Launch the Development Server:**
   ```bash
   npm run dev
   ```

4. **Verify the App:**
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## ⚙️ Customization Guide

### Adding or Modifying Projects
Open [data/projects.ts](file:///c:/Users/siddh/Downloads/resume%20project/devos-portfolio/data/projects.ts) and add a new object to the `projects` array following this TypeScript signature:
```typescript
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
```
The terminal CLI and the GUI windows will **automatically update** to render your changes!

### Adding a Custom Terminal Command
1. Create a new command script in [components/terminal/commands/](file:///c:/Users/siddh/Downloads/resume%20project/devos-portfolio/components/terminal/commands/):
   ```typescript
   import type { TerminalCommand } from "@/types/terminal";

   export const echoCommand: TerminalCommand = {
     name: "echo",
     description: "Print text to terminal",
     usage: "echo <text>",
     execute: (args) => ({
       type: "lines",
       kind: "output",
       lines: [args.join(" ") || "No arguments provided."],
     }),
   };
   ```
2. Import and register the command inside [components/terminal/commands/registry.ts](file:///c:/Users/siddh/Downloads/resume%20project/devos-portfolio/components/terminal/commands/registry.ts). It will instantly support autocompletion and display under the `help` prompt!

---

## 🚢 Deployment (Vercel)

This repository is optimized for one-click deployment on **Vercel**:

1. Push your repository code to your GitHub account (`https://github.com/sidhu020`).
2. Log in to [Vercel Dashboard](https://vercel.com/) and click **"Add New Project"**.
3. Select your `devos-portfolio` repository.
4. Keep the default settings (Next.js preset) and click **"Deploy"**.

---

## 🤝 Social Channels

Connect with Siddharth:
*   **GitHub Profile:** [@sidhu020](https://github.com/sidhu020)
*   **LinkedIn Network:** [Siddharth Borisagar](https://www.linkedin.com/in/siddharthborisagar/)
*   **Recruitment Channel:** [siddharthborisagar1234@gmail.com](mailto:siddharthborisagar1234@gmail.com)

---
*Built with 💻 and ☕ by Siddharth Borisagar.*