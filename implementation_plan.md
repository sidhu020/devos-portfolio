# DevOS — Interactive MCA Developer Portfolio

Build a world-class futuristic interactive developer portfolio that feels like a digital operating system / command center, where users **explore** instead of scroll.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion + GSAP + `@gsap/react` |
| 3D / Visuals | React Three Fiber v9 + Drei |
| Smooth Scroll | Lenis (`lenis/react`) |
| Utilities | `clsx`, `react-icons` |
| Deployment | Vercel |

---

## User Review Required

> [!IMPORTANT]
> **Personal Data**: The plan uses placeholder data (name "Harsh", MCA student, etc.) from the prompt. Please confirm:
> 1. Your full name & preferred display name
> 2. University / college name
> 3. Real project list (or stick with the 6 placeholders?)
> 4. GitHub username (for API integration)
> 5. LinkedIn URL, email, and other contact info
> 6. Resume file (PDF) to include for download

> [!WARNING]
> **Tailwind Version**: The prompt says "Tailwind CSS" — Next.js `create-next-app` currently scaffolds **Tailwind v4**. I'll use v4 unless you want v3. Confirm?

> [!IMPORTANT]
> **Scope Management**: This is a 4-week project with 20+ components. I'll build it in phases so you can review and iterate. Phase 1 alone will produce a functional, visually impressive site.

---

## Open Questions

1. **Font preference**: Inter or Satoshi for body? (I'll default to **Inter** + **JetBrains Mono** for terminal)
2. **Sound design**: Include optional sound effects in Phase 3, or skip entirely?
3. **GitHub API**: Do you want real-time API calls (rate-limited) or a static/cached approach?
4. **Domain**: Have you purchased a domain, or should I just configure for Vercel's default subdomain?
5. **Games complexity**: Full playable games or lightweight proof-of-concept versions?

---

## Design System

### Color Palette (Tailwind CSS Custom Theme)

```
Background:   #050816  → bg-devos-bg
Surface:      #0f172a  → bg-devos-surface
Accent Blue:  #38bdf8  → text-devos-accent
Neon Cyan:    #22d3ee  → text-devos-cyan
Purple:       #8b5cf6  → text-devos-purple
Primary Text: #e2e8f0  → text-devos-text
Muted Text:   #94a3b8  → text-devos-muted
Borders:      rgba(255,255,255,0.08) → border-devos-border
```

### Typography
- **UI Font**: Inter (Google Fonts, variable)
- **Terminal Font**: JetBrains Mono (Google Fonts, variable)
- Clean, modern hierarchy: Display → Heading → Body → Code

### Design Language
- 40% minimal + 30% futuristic + 20% engineering + 10% gaming
- Glassmorphism used sparingly (panels, modals)
- Subtle glow effects on interactive elements
- Soft gradients and blurred surfaces
- Clean 8px spacing system

---

## Project Architecture

```
src/
├── app/
│   ├── layout.tsx              ← Root layout (fonts, providers, metadata)
│   ├── template.tsx            ← Page transitions (Framer Motion)
│   ├── page.tsx                ← Main single-page app
│   ├── globals.css             ← Tailwind + custom CSS
│   └── manifest.ts            ← PWA manifest
│
├── components/
│   ├── ui/                     ← Reusable primitives
│   │   ├── Button.tsx
│   │   ├── GlassPanel.tsx
│   │   ├── GlowText.tsx
│   │   ├── Badge.tsx
│   │   ├── Tooltip.tsx
│   │   └── CommandPalette.tsx
│   │
│   ├── terminal/               ← Terminal system
│   │   ├── Terminal.tsx
│   │   ├── TerminalInput.tsx
│   │   ├── TerminalOutput.tsx
│   │   ├── TerminalPrompt.tsx
│   │   └── commands/
│   │       ├── registry.ts
│   │       ├── help.ts
│   │       ├── about.ts
│   │       ├── skills.ts
│   │       ├── projects.ts
│   │       ├── contact.ts
│   │       ├── neofetch.ts
│   │       ├── fun.ts          ← sudo hire-me, whoami, ping, etc.
│   │       └── types.ts
│   │
│   ├── three/                  ← 3D components (all 'use client', dynamic import)
│   │   ├── NetworkSphere.tsx
│   │   ├── GridBackground.tsx
│   │   ├── SkillsGraph3D.tsx
│   │   └── ParticleField.tsx
│   │
│   ├── games/                  ← Mini-games
│   │   ├── TicTacToe.tsx
│   │   ├── TypingTest.tsx
│   │   ├── BinaryDecoder.tsx
│   │   ├── MemoryMatch.tsx
│   │   └── TerminalEscape.tsx
│   │
│   ├── projects/               ← Project showcase
│   │   ├── ProjectWindow.tsx
│   │   ├── ProjectCard.tsx
│   │   └── ProjectGrid.tsx
│   │
│   ├── dashboard/              ← System profile widgets
│   │   ├── CpuGraph.tsx
│   │   ├── RamBar.tsx
│   │   ├── NetworkActivity.tsx
│   │   └── ProcessList.tsx
│   │
│   ├── animations/             ← Animation wrappers
│   │   ├── FadeIn.tsx
│   │   ├── SlideReveal.tsx
│   │   ├── TypeWriter.tsx
│   │   ├── ScanlineOverlay.tsx
│   │   └── MagneticButton.tsx
│   │
│   └── layout/                 ← Layout components
│       ├── Navbar.tsx
│       ├── MobileDock.tsx
│       ├── BootScreen.tsx
│       ├── CustomCursor.tsx
│       ├── LenisProvider.tsx
│       └── Footer.tsx
│
├── sections/                   ← Page sections (each a full-viewport block)
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx        ← "System Profile"
│   ├── SkillsSection.tsx       ← Interactive system map
│   ├── ProjectsSection.tsx     ← Desktop-style windows
│   ├── TimelineSection.tsx     ← "System Logs"
│   ├── GithubSection.tsx       ← Live GitHub data
│   ├── GamesSection.tsx        ← Mini-game launcher
│   └── ContactSection.tsx      ← Terminal connection
│
├── hooks/
│   ├── useTerminal.ts          ← Terminal state management
│   ├── useCommandPalette.ts    ← Ctrl+K palette logic
│   ├── useMediaQuery.ts        ← Responsive breakpoints
│   ├── useReducedMotion.ts     ← Accessibility
│   ├── useMousePosition.ts     ← Cursor / parallax
│   ├── useGitHub.ts            ← GitHub API fetching
│   ├── useSound.ts             ← Optional sound effects
│   └── useBootSequence.ts      ← Boot screen state
│
├── lib/
│   ├── github.ts               ← GitHub API client
│   ├── commands.ts             ← Command processing engine
│   └── constants.ts            ← App-wide constants
│
├── data/
│   ├── projects.ts             ← Project data
│   ├── skills.ts               ← Skills data with relationships
│   ├── timeline.ts             ← Timeline events
│   ├── commands.ts             ← Terminal command definitions
│   └── personal.ts             ← Personal info (name, bio, links)
│
├── types/
│   ├── terminal.ts
│   ├── project.ts
│   ├── skill.ts
│   └── github.ts
│
├── utils/
│   ├── cn.ts                   ← clsx + twMerge utility
│   └── animations.ts           ← Shared animation variants
│
└── styles/
    └── fonts.ts                ← Font configuration
```

---

## Proposed Changes — Phase 1 (Foundation + Hero + Boot)

> **Goal**: Get a stunning, functional site skeleton with the WOW-factor hero section.

---

### 1. Project Scaffolding

#### [NEW] Next.js project initialization

```bash
npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --use-npm --import-alias "@/*"
```

#### [NEW] Additional dependencies

```bash
npm install framer-motion gsap @gsap/react @react-three/fiber @react-three/drei three clsx lenis react-icons
npm install -D @types/three
```

---

### 2. Design System & Global Styles

#### [MODIFY] tailwind.config.ts / globals.css
- Extend Tailwind theme with DevOS color palette
- Add custom font imports (Inter, JetBrains Mono via Google Fonts)
- Define glassmorphism utility classes
- Set up glow/pulse animation keyframes
- Configure `content` paths

#### [NEW] src/utils/cn.ts
- `cn()` utility combining `clsx` + Tailwind class merging

#### [NEW] src/styles/fonts.ts
- Next.js font optimization with `next/font/google`

---

### 3. Root Layout & Providers

#### [MODIFY] src/app/layout.tsx
- Configure HTML metadata (title, description, OG tags, Twitter cards)
- Load fonts
- Wrap children with `LenisProvider`
- Include `CustomCursor` and `Navbar`
- Set `<body>` background to `#050816`

#### [NEW] src/app/template.tsx
- Framer Motion `AnimatePresence` page transition wrapper

#### [NEW] src/components/layout/LenisProvider.tsx
- `'use client'` Lenis smooth scroll provider using `lenis/react`

#### [NEW] src/components/layout/CustomCursor.tsx
- Subtle glowing dot cursor that follows mouse (desktop only)
- Scales on hover over interactive elements
- Hidden on mobile via `useMediaQuery`

---

### 4. Boot Screen

#### [NEW] src/components/layout/BootScreen.tsx
- 2-3 second cinematic boot animation
- Typewriter sequence: "Initializing DevOS…" → "Loading system modules…" → "Access granted."
- Scanline overlay effect
- Glowing grid background (CSS, not Three.js)
- "Skip Intro" button
- `prefers-reduced-motion` support (instant skip)
- Stores completion in `sessionStorage` so it only plays once per session

#### [NEW] src/hooks/useBootSequence.ts
- State machine: `booting` → `ready`
- Skip logic + session persistence

---

### 5. Navigation

#### [NEW] src/components/layout/Navbar.tsx
- Floating glassmorphism top bar
- Logo "DevOS" with subtle glow
- Section links (hidden on mobile)
- "Ctrl+K" hint badge
- Terminal toggle button

#### [NEW] src/components/layout/MobileDock.tsx
- Fixed bottom dock for mobile
- Icons: Home, Projects, Terminal, Games, Contact
- Futuristic floating pill design
- Active state indicators

#### [NEW] src/components/ui/CommandPalette.tsx
- Ctrl+K modal overlay
- Search/filter through: projects, games, skills, github, about, contact, resume
- Keyboard navigation (arrow keys + enter)
- Framer Motion enter/exit animations
- Linear/Vercel-inspired minimal design

#### [NEW] src/hooks/useCommandPalette.ts
- Global keyboard listener for Ctrl+K
- Search filtering logic
- Navigation actions

---

### 6. Hero Section (THE WOW FACTOR)

#### [NEW] src/sections/HeroSection.tsx
- Split layout: Text (left) + 3D Visual (right)
- Animated name reveal with staggered letters
- Role badges: "MCA Student", "Full Stack Developer", "Systems Engineer"
- Premium tagline with gradient text
- CTA buttons: "Explore System" (primary) + "Open Terminal" (secondary)
- Subtle parallax on mouse move
- Responsive: stacks vertically on mobile

#### [NEW] src/components/three/NetworkSphere.tsx
- `'use client'` + dynamically imported with `ssr: false`
- Interactive 3D network sphere using R3F + Drei
- ~80 nodes connected by glowing lines
- Mouse movement subtly rotates/affects the sphere
- Soft ambient lighting + bloom effect
- Fallback gradient animation on mobile / reduced-motion
- Wrapped in `<Suspense>` with skeleton loader

#### [NEW] src/components/animations/MagneticButton.tsx
- Button that subtly follows cursor on hover
- Glow pulse effect
- Uses Framer Motion `useMotionValue` + `useSpring`

#### [NEW] src/components/three/GridBackground.tsx
- Animated perspective grid behind the hero
- Subtle movement + fade at edges
- Pure CSS fallback on mobile

---

### 7. Animation Utilities

#### [NEW] src/components/animations/FadeIn.tsx
- Reusable Framer Motion fade-in wrapper
- Configurable direction, delay, duration
- Intersection Observer trigger

#### [NEW] src/components/animations/TypeWriter.tsx
- Character-by-character typing animation
- Blinking cursor
- Configurable speed + delay

#### [NEW] src/components/animations/ScanlineOverlay.tsx
- CSS scanline effect overlay (used in boot screen)

#### [NEW] src/utils/animations.ts
- Shared Framer Motion variants (fadeIn, slideUp, staggerChildren, etc.)

---

## Proposed Changes — Phase 2 (Core Sections)

> **Goal**: Build the terminal, about, skills, projects, and timeline sections.

---

### 8. Interactive Terminal System (SIGNATURE FEATURE)

#### [NEW] src/components/terminal/Terminal.tsx
- Full terminal UI with JetBrains Mono
- Glassmorphism panel with title bar (dots: red/yellow/green)
- Scrollable output area
- Input line with blinking cursor
- Command history (up/down arrows)
- Auto-suggestions dropdown
- Can be opened as overlay (from navbar/CTA) or inline in contact section

#### [NEW] src/components/terminal/TerminalInput.tsx
- Input field styled as terminal prompt
- `harsh@devos:~$` prompt prefix
- Handles keyboard events (Enter, Up, Down, Tab)

#### [NEW] src/components/terminal/TerminalOutput.tsx
- Renders command outputs with typing animation
- Supports formatted output (tables, colored text, ASCII art)

#### [NEW] src/components/terminal/commands/*.ts
- **Command registry pattern**: Each command is a module exporting `{ name, description, execute(args) → OutputLine[] }`
- `help` — list all commands
- `about` — display system profile
- `skills` — skill tree output
- `projects` — project list
- `contact` — contact info
- `resume` — trigger resume download
- `clear` — clear terminal
- `neofetch` — ASCII art system info
- `sudo hire-me` — easter egg "Access Granted"
- `whoami` — identity card
- `ping future` — fun response
- `cat motivation.txt` — motivational text
- `system-status` — fake system metrics

#### [NEW] src/hooks/useTerminal.ts
- Terminal state: history, current input, suggestions
- Command parser + executor
- History navigation

---

### 9. About Section → "System Profile"

#### [NEW] src/sections/AboutSection.tsx
- OS-style system information panel
- Left: Profile data (Name, Role, Focus areas, Status)
- Right: Animated dashboard widgets
- Scroll-triggered reveal animations

#### [NEW] src/components/dashboard/CpuGraph.tsx
- Animated line graph (CSS/SVG, no heavy lib)
- Simulated fluctuating CPU usage

#### [NEW] src/components/dashboard/RamBar.tsx
- Segmented progress bar with labels
- Animated fill on scroll

#### [NEW] src/components/dashboard/NetworkActivity.tsx
- Simulated network packets / throughput graph

#### [NEW] src/components/dashboard/ProcessList.tsx
- Scrolling list of "processes" (skills/tech displayed as running processes)

---

### 10. Skills Section → Interactive System Map

#### [NEW] src/sections/SkillsSection.tsx
- Interactive network/topology visualization
- Skill nodes organized by category (Programming, Web, Systems, Tools)
- Connecting lines between related skills
- Canvas-based or SVG-based (NOT Three.js for performance)

**Implementation approach**: Use a **2D canvas/SVG network graph** with Framer Motion for hover interactions. This gives the topology-map feel without Three.js overhead.

- Hovering a node: glow, expand, show tooltip with details
- Connected nodes highlight their links
- Smooth transitions between focused/unfocused states
- Mobile: simplified grid layout with animated cards

---

### 11. Projects Section → Desktop Applications

#### [NEW] src/sections/ProjectsSection.tsx
- Grid of project "application icons" on a desktop-like surface
- Click to "open" a project window

#### [NEW] src/components/projects/ProjectCard.tsx
- Application icon card with name + mini description
- Hover: lift + glow effect

#### [NEW] src/components/projects/ProjectWindow.tsx
- Desktop-style window overlay
- Title bar with close/minimize/maximize dots
- Glassmorphism panel
- Tabs: Overview, Stack, Features, Architecture
- Screenshot carousel
- GitHub + Live Demo links
- Framer Motion open/close animations (scale-in, fade-collapse)
- Draggable feel (optional, via Framer Motion `drag`)

---

### 12. Timeline Section → "System Logs"

#### [NEW] src/sections/TimelineSection.tsx
- Terminal-style log entries
- Vertical timeline with connecting line
- Each entry styled as `[YEAR] — log message`
- Scroll-triggered staggered reveal
- Subtle typing animation on each entry

---

## Proposed Changes — Phase 3 (Advanced Features)

> **Goal**: Games, GitHub integration, 3D polish, easter eggs.

---

### 13. Mini-Games

#### [NEW] src/sections/GamesSection.tsx
- Game launcher grid with 5 game cards
- Each game opens in a window overlay (reusing ProjectWindow pattern)

#### [NEW] src/components/games/TicTacToe.tsx
- VS computer (simple minimax AI)
- Futuristic grid UI with glow effects

#### [NEW] src/components/games/TypingTest.tsx
- Random code/text snippets
- WPM counter + accuracy
- Timer countdown

#### [NEW] src/components/games/BinaryDecoder.tsx
- Show binary → user types decimal/text
- Progressive difficulty

#### [NEW] src/components/games/MemoryMatch.tsx
- Card-flip matching game with tech icons
- Move counter + timer

#### [NEW] src/components/games/TerminalEscape.tsx
- Text-based puzzle solved via terminal commands
- Narrative-driven

---

### 14. GitHub Section

#### [NEW] src/sections/GithubSection.tsx
- Live GitHub data display
- Contribution heatmap (custom SVG)
- Latest repos cards
- Top languages chart
- Commit streak counter
- Loading skeletons

#### [NEW] src/lib/github.ts
- GitHub REST API client
- Cached responses (Next.js `fetch` with `revalidate`)
- Rate limit handling

#### [NEW] src/hooks/useGitHub.ts
- React hook for GitHub data fetching
- Loading/error states

---

### 15. Easter Eggs

- `sudo hire-me` terminal command → "Permission Granted. Welcome aboard."
- Konami code (↑↑↓↓←→←→BA) → retro mode toggle (green-on-black CRT effect)
- Hidden `devmode` command → shows build info + tech stack
- Achievement system: track discoveries in localStorage

---

## Proposed Changes — Phase 4 (Polish & Deploy)

> **Goal**: Mobile optimization, accessibility, SEO, performance, deployment.

---

### 16. Contact Section → Terminal Connection

#### [NEW] src/sections/ContactSection.tsx
- `connect --user harsh` terminal animation
- Reveals contact form + social cards
- Glassmorphism form with glow focus states
- GitHub, LinkedIn, Email, Resume download cards

---

### 17. Mobile Optimization

- All sections: responsive layouts (Tailwind breakpoints)
- 3D scenes: replaced with animated 2D fallbacks on mobile
- Particles: reduced count on mobile
- MobileDock: always visible floating bottom nav
- Touch-friendly: larger tap targets, swipe gestures where appropriate
- Reduced-motion: respect `prefers-reduced-motion`

---

### 18. Accessibility

- Full keyboard navigation (tab order, focus rings)
- ARIA labels on all interactive elements
- Screen reader text for decorative elements
- Focus trap in modals (CommandPalette, ProjectWindow, Terminal overlay)
- Color contrast meeting WCAG AA
- `prefers-reduced-motion` → disable all animations
- Skip-to-content link

---

### 19. SEO & Metadata

#### [MODIFY] src/app/layout.tsx
- Open Graph tags (title, description, image)
- Twitter Card metadata
- Structured data (JSON-LD Person schema)
- Canonical URL

#### [NEW] src/app/sitemap.ts
- Auto-generated sitemap

#### [NEW] src/app/robots.ts
- Robots.txt configuration

#### [NEW] public/og-image.png
- Generated OG image for social sharing

---

### 20. Performance Optimization

- **Dynamic imports**: All Three.js components loaded with `next/dynamic({ ssr: false })`
- **Code splitting**: Games lazy-loaded only when opened
- **Image optimization**: `next/image` for all images
- **Bundle analysis**: Keep JS under 200KB initial load
- **GPU animations**: Only `transform` and `opacity` animated
- **Intersection Observer**: Sections animate only when visible
- **Font optimization**: `next/font/google` with `display: swap`

---

### 21. Deployment

#### [NEW] vercel.json
- Build configuration
- Headers (security, caching)
- Redirects if needed

#### Deployment checklist:
- [ ] Environment variables set (GitHub token if using API)
- [ ] OG image generated and uploaded
- [ ] Lighthouse audit passes 90+
- [ ] Mobile testing on real devices
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)

---

## Verification Plan

### Automated Tests
```bash
npm run build          # Ensure production build succeeds
npm run lint           # No lint errors
npx lighthouse ...     # Lighthouse CI audit
```

### Browser Testing
- Visual regression check of all sections via browser tool
- Mobile viewport testing (375px, 768px, 1024px, 1440px)
- Keyboard navigation walkthrough
- Terminal command testing (all commands)
- Command palette search + navigation

### Manual Verification
- Performance: Lighthouse score ≥90
- Accessibility: axe DevTools audit
- Cross-browser: Chrome, Firefox, Safari, Edge
- Mobile: iOS Safari, Android Chrome

---

## Execution Roadmap

### Phase 1 — Foundation (This session)
1. Scaffold Next.js project + install all deps
2. Configure Tailwind theme + design tokens
3. Build root layout, fonts, providers
4. Build BootScreen component
5. Build Navbar + MobileDock
6. Build Hero Section with 3D NetworkSphere
7. Build CommandPalette (Ctrl+K)
8. Build CustomCursor

### Phase 2 — Core Content
1. Terminal system (full implementation)
2. About / System Profile section
3. Skills / System Map section
4. Projects / Desktop Windows section
5. Timeline / System Logs section

### Phase 3 — Advanced Features
1. Mini-games (5 games)
2. GitHub API integration
3. Easter eggs + achievements
4. Sound design (optional)
5. Advanced animations + polish

### Phase 4 — Ship It
1. Contact section
2. Mobile optimization pass
3. Accessibility audit + fixes
4. SEO metadata + OG images
5. Performance optimization
6. Vercel deployment

---

## Recommended Custom Hooks Summary

| Hook | Purpose |
|---|---|
| `useTerminal` | Terminal state, history, command execution |
| `useCommandPalette` | Ctrl+K palette open/close, search, navigation |
| `useMediaQuery` | Responsive breakpoint detection |
| `useReducedMotion` | Accessibility: detect reduced-motion preference |
| `useMousePosition` | Parallax effects, custom cursor |
| `useGitHub` | GitHub API data fetching + caching |
| `useSound` | Optional sound effect playback |
| `useBootSequence` | Boot animation state machine |
| `useIntersection` | Scroll-triggered section animations |

---

## Key Libraries & Versions

```json
{
  "next": "latest",
  "react": "^19",
  "typescript": "^5",
  "tailwindcss": "^4",
  "framer-motion": "^12",
  "@react-three/fiber": "^9",
  "@react-three/drei": "latest",
  "three": "latest",
  "gsap": "latest",
  "@gsap/react": "latest",
  "lenis": "latest",
  "clsx": "latest",
  "react-icons": "latest"
}
```
