# 📖 DevOS: Comprehensive Developer Manual

Welcome to **DevOS**! This document is the ultimate guide to understanding, maintaining, and updating your futuristic interactive portfolio. It is written so that anyone (even a completely new developer) can jump in and customize the project.

---

## 🏗️ 1. Project Architecture (How it Works)

This portfolio behaves like a minimal operating system. It is built using:
- **Next.js 16 (App Router)**: Handles the routing, Server/Client components, and lazy loading.
- **Tailwind CSS v4**: Handles styling. The entire color scheme is controlled via CSS variables.
- **Framer Motion**: Powers all the smooth animations, layout transitions, and scroll reveals.
- **React Three Fiber**: Powers the 3D interactive hero network sphere.

### Core Folder Structure
```text
devos-portfolio/
├── app/               # Next.js App Router root (page.tsx, layout.tsx, globals.css)
├── components/        # Reusable UI components
│   ├── layout/        # Navbar, Command Palette, Mobile Dock
│   ├── terminal/      # Terminal core logic and command files
│   ├── three/         # 3D visuals like NetworkSphere
│   └── ui/            # Buttons, Sections, Headings
├── data/              # Static data like your project list
├── hooks/             # Custom React hooks (e.g., useTerminal, useReducedMotion)
├── lib/               # Utilities (animation variants, class merging, achievements)
├── public/            # Static assets (images, fonts, resume.pdf)
└── sections/          # The large full-screen sections (Hero, About, Projects, Certificates)
```

---

## ✏️ 2. How to Update Your Personal Information

Most of your personal data is hardcoded into specific files to maximize performance. Here is exactly where to change your information:

### Changing Your Name & Roles in the Hero
1. Open `sections/HeroSection.tsx`
2. Search for the text `Siddharth` and update it.
3. Update your role tags (e.g., `"MCA Student"`, `"Full Stack Developer"`) in the `ROLE_TAGS` array.

### Changing Contact Links (GitHub, LinkedIn, Email)
You need to update your links in **four** places to ensure consistency across the OS:
1. **The Footer Contact Cards**: Open `sections/ContactSection.tsx`. Find the `LINKS` array at the top of the file and update the `href` values.
2. **The Terminal `contact` Command**: Open `components/terminal/commands/contact.ts` and update the URL strings.
3. **The Terminal `hire` Command**: Open `components/terminal/commands/hire.ts` and update the URL strings inside the ASCII card.
4. **The Terminal `sudo hire-me` Command**: Open `components/terminal/commands/sudo-hire-me.ts` and update the URLs there as well.

### Updating the Resume PDF
To replace the resume that users download:
1. Drag and drop your new PDF file into the `public/` folder.
2. Ensure it is named exactly `resume.pdf` (so the path is `public/resume.pdf`).
3. That's it! The Hero button, Contact button, and Terminal `resume` command all point to `/resume.pdf` automatically.

---

## 🛠️ 3. How to Update Your Projects, Skills & Certificates

### Adding or Editing Projects
Your projects are driven by a single data file. 
1. Open `data/projects.ts`.
2. Edit the array of projects. You can change `name`, `problem`, `impact`, `stack`, `highlights`, `github`, and `demo` links.
3. The `ProjectsSection.tsx` file will automatically read this data and render the beautiful desktop-style window modals.

### Editing the Timeline (Logs)
1. Open `sections/TimelineSection.tsx`.
2. Locate the `TIMELINE_DATA` array near the top of the file.
3. Add new objects following the `{ year, title, desc }` format.

### Updating Skills Map
The skills section is displayed as a network graph rather than boring progress bars. 
1. Open `sections/SkillsSection.tsx`.
2. To add/remove skills, modify the `NODES` array. Each node represents a skill with a unique `id`, `label`, and coordinates (`x`, `y` from `0..1`).
3. To add/remove connecting pathways, edit the `EDGES` array containing coordinate pairings of unique IDs (e.g., `["html", "css"]`).

### Updating Certificates & Credentials
1. Open `sections/CertificatesSection.tsx`.
2. Locate the `CERTIFICATES` data array at the top.
3. Add, edit, or remove certificates containing `title`, `issuer`, `date`, `id` (credential key), `status` (e.g., `VERIFIED`, `ACTIVE`), `link` (verification page URL), and `category` (e.g., `Cloud`, `Networking`).

---

## 💻 4. Working with the Terminal

The interactive terminal is the signature feature of DevOS. It works using a "Command Registry" pattern.

### How to add a completely new Terminal Command:
1. Create a new file inside `components/terminal/commands/`, for example `joke.ts`.
2. Copy the structure of an existing command (like `about.ts`).
   ```typescript
   import type { TerminalCommand } from "@/types/terminal";
   
   export const jokeCommand: TerminalCommand = {
     name: "joke",
     description: "Tells a developer joke",
     usage: "joke",
     execute: () => {
       return {
         type: "lines",
         kind: "output",
         lines: ["Why do programmers prefer dark mode?", "Because light attracts bugs!"],
       };
     },
   };
   ```
3. Open `components/terminal/commands/registry.ts`.
4. Import your new `jokeCommand` at the top.
5. Add it to the registry map inside the function: `add(jokeCommand);`.
6. Your command is now live and will automatically appear in auto-complete and the `help` command!

---

## 🎨 5. Customizing the Design & Colors

DevOS uses CSS variables mapped to Tailwind v4. To change the futuristic color scheme:

1. Open `app/globals.css`.
2. At the top of the file inside the `:root` block, you will see variables like:
   ```css
   --devos-bg: #050816;
   --devos-surface: #0f172a;
   --devos-accent: #38bdf8;
   ```
3. Change these hex codes. The entire site (glows, text, borders, terminal text) will instantly adapt to your new palette!

---

## 🚀 6. Development & Deployment

### Running Locally
To test changes on your computer:
1. Open your terminal in the project folder.
2. Run `npm run dev`
3. Open `http://localhost:3000` in your browser.

### Local Network Host Preview (HMR Cross-Origin Allowed Origins)
If you run `next dev` and try to preview the site on other devices on your local network using your local IP (e.g., `http://10.67.250.233:3000`), Next.js Hot Module Replacement (HMR) will block connection by default.
1. Open `next.config.ts`.
2. Locate `allowedDevOrigins` inside the config object.
3. Add your current local host IP address to the array:
   ```typescript
   allowedDevOrigins: ["10.67.250.233"]
   ```
4. Restart your development server (`npm run dev`) to apply.

### Deploying to Vercel (Recommended)
This project is pre-optimized for Vercel:
1. Push your code to a GitHub repository.
2. Log into [Vercel](https://vercel.com) and click "Add New Project".
3. Select your GitHub repository.
4. Leave all settings as default (Vercel automatically detects Next.js).
5. Click **Deploy**.

Every time you push a code change to the `main` branch on GitHub, Vercel will automatically rebuild and update your live website.
