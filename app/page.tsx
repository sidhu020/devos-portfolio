"use client";

import dynamic from "next/dynamic";

import { HeroSection } from "@/sections/HeroSection";
import { Section } from "@/components/ui/Section";
import { AboutSection } from "@/sections/AboutSection";
import { SkillsSection } from "@/sections/SkillsSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { CertificatesSection } from "@/sections/CertificatesSection";
import { GithubSection } from "@/sections/GithubSection";
import { GamesSection } from "@/sections/GamesSection";
import { TimelineSection } from "@/sections/TimelineSection";
import { ContactSection } from "@/sections/ContactSection";

import { ErrorBoundary } from "@/components/ErrorBoundary";

/* Lazy-load the Terminal — it's heavy (command registry, hooks, localStorage).
   SSR is disabled because it relies on browser APIs (localStorage, DOM). */
const Terminal = dynamic(
  () => import("@/components/terminal/Terminal").then((m) => m.Terminal),
  {
    ssr: false,
    loading: () => (
      <div className="devos-glass flex min-h-[360px] items-center justify-center rounded-3xl">
        <span className="animate-pulse text-sm text-devos-muted">Loading terminal…</span>
      </div>
    ),
  },
);

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden pb-24 md:pb-0">
      <HeroSection />
      <AboutSection />

      <Section id="terminal">
        <ErrorBoundary label="Terminal">
          <Terminal />
        </ErrorBoundary>
      </Section>

      <ProjectsSection />
      <CertificatesSection />
      <GithubSection />
      <GamesSection />
      <TimelineSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
