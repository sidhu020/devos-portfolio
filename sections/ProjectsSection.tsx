"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/cn";
import { fadeInUp, easeOutCubic } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { ProjectWindow } from "@/components/projects/ProjectWindow";
import { Eyebrow, H2 } from "@/components/ui/Heading";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function ProjectIcon({ p, onOpen, index }: { p: Project; onOpen: () => void; index: number }) {
  const cardRef = React.useRef<HTMLButtonElement | null>(null);
  const reducedMotion = useReducedMotion();

  const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
    if (reducedMotion) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-2px)`;
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, [reducedMotion]);

  const handleMouseLeave = React.useCallback(() => {
    if (reducedMotion) return;
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "";
  }, [reducedMotion]);

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.45, delay: index * 0.08, ease: easeOutCubic }}
    >
      <button
        ref={cardRef}
        type="button"
        onClick={onOpen}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "devos-focus-ring devos-btn-glow group w-full rounded-3xl border border-devos-border bg-white/3 p-5 text-left",
          "devos-tilt",
          "hover:bg-white/5 active:scale-[0.98]",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-devos-text">{p.name}</div>
            <div className="mt-1 text-xs text-devos-muted">{p.short}</div>
          </div>
          <div className="rounded-2xl border border-devos-border bg-black/20 px-2 py-1 text-xs font-mono text-devos-muted">
            app
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {p.stack.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-full border border-devos-border bg-white/3 px-3 py-1 text-[11px] text-devos-muted transition group-hover:border-devos-accent/20 group-hover:text-devos-text"
            >
              {s}
            </span>
          ))}
        </div>
      </button>
    </motion.div>
  );
}

export function ProjectsSection({ className }: { className?: string }) {
  const [openId, setOpenId] = React.useState<string | null>(null);
  const active = projects.find((p) => p.id === openId) ?? null;

  return (
    <Section id="projects" className={cn(className)}>
      <motion.div {...fadeInUp} className="devos-glass rounded-3xl p-6 sm:p-8">
        <div className="flex items-end justify-between gap-3">
          <div>
            <Eyebrow>Projects</Eyebrow>
            <H2>Desktop-style apps (windows).</H2>
          </div>
          <div className="hidden text-xs font-mono text-devos-muted sm:block">
            click to open
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectIcon key={p.id} p={p} onOpen={() => setOpenId(p.id)} index={i} />
          ))}
        </div>
      </motion.div>


      <ProjectWindow
        open={Boolean(active)}
        title={active?.name ?? ""}
        subtitle={active?.short}
        onClose={() => setOpenId(null)}
      >
        {active ? (
          <div className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-devos-muted">
                  The Problem
                </div>
                <p className="mt-2 text-sm leading-relaxed text-devos-text">
                  {active.problem}
                </p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-devos-muted">
                  The Impact
                </div>
                <p className="mt-2 text-sm leading-relaxed text-devos-cyan">
                  {active.impact}
                </p>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-devos-muted">
                Stack
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {active.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-devos-border bg-white/3 px-3 py-1 text-xs text-devos-text"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-devos-muted">
                Key Engineering Highlights
              </div>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-devos-muted">
                {active.highlights.map((h) => (
                  <li key={h} className="leading-relaxed">{h}</li>
                ))}
              </ul>
            </div>

            {/* Live Actions Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-devos-border">
              {active.link && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => window.open(active.link, "_blank", "noopener,noreferrer")}
                >
                  Live Demo
                  <ArrowUpRight className="size-4" />
                </Button>
              )}
              {active.github && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => window.open(active.github, "_blank", "noopener,noreferrer")}
                >
                  <FaGithub className="size-4 text-devos-muted" />
                  GitHub Repository
                </Button>
              )}
            </div>
          </div>
        ) : null}
      </ProjectWindow>
    </Section>
  );
}
