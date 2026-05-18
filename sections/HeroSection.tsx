"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/cn";
import { fadeInUp, easeOutCubic } from "@/lib/motion";
import { Button } from "@/components/ui/Button";

export function HeroSection({ className }: { className?: string }) {
  return (
    <section
      id="home"
      className={cn(
        "relative overflow-hidden",
        "px-5 sm:px-6",
        "pt-6 sm:pt-10",
        "pb-14 sm:pb-22",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 devos-grid opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(56,189,248,0.20)_0%,transparent_60%)]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-12">
        <div className="text-center md:text-left">
          <motion.p
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.05 }}
            className="text-xs font-medium uppercase tracking-[0.28em] text-devos-cyan"
          >
            Initializing DevOS…
          </motion.p>

          <motion.h1
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.12 }}
            className="mt-4 text-4xl font-semibold leading-[1.05] sm:mt-5 sm:text-6xl lg:text-7xl"
          >
            I am{" "}
            <span className="bg-gradient-to-r from-devos-cyan via-devos-accent to-devos-purple bg-clip-text text-transparent font-extrabold">
              Siddharth
            </span>
          </motion.h1>

          <motion.p
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.18 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-devos-text sm:text-lg md:mx-0 font-medium"
          >
            I build interactive developer systems, real-time packet telemetry, and full-stack applications.
          </motion.p>

          <motion.p
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.22 }}
            className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-devos-muted sm:text-sm md:mx-0"
          >
            A premium, futuristic developer portfolio styled as a minimal command center — explore, don&apos;t scroll.
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.26 }}
            className="mt-7 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center md:w-auto md:justify-start"
          >
            <Button
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore System
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" });
                setTimeout(() => {
                  document.querySelector<HTMLInputElement>('[aria-label="Terminal input"]')?.focus();
                }, 600);
              }}
            >
              Open Terminal
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.open("/resume.pdf", "_blank", "noopener,noreferrer")}
              className="border border-devos-border bg-white/3 hover:bg-white/6"
            >
              📄 Download Resume
            </Button>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.32 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-2 md:justify-start"
          >
            {["MCA Student", "Full Stack Developer", "Systems / Networking Enthusiast"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-devos-border bg-white/3 px-3 py-1 text-xs text-devos-muted"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.16 }}
          className="mx-auto w-full max-w-md md:mx-0 md:max-w-none"
        >
          <div className="devos-glass relative aspect-[4/3] overflow-hidden rounded-3xl p-5">
            <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_30%_20%,rgba(34,211,238,0.18)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_70%_65%,rgba(139,92,246,0.16)_0%,transparent_60%)]" />

            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-red-400/80" />
                  <span className="size-2 rounded-full bg-yellow-400/80" />
                  <span className="size-2 rounded-full bg-green-400/80" />
                </div>
                <span className="text-xs font-mono text-devos-muted">/hero</span>
              </div>

              <div className="mt-6 space-y-2 font-mono text-xs text-devos-muted">
                <div className="flex items-center gap-2">
                  <span className="text-devos-cyan">&gt;</span>
                  <span>system boot --mode=portfolio</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>All modules loaded</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-devos-cyan">&gt;</span>
                  <span>Ready. Press Ctrl+K to navigate.</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {["Terminal", "Projects", "Skills", "Profile", "Logs", "Contact"].map((label) => (
                  <div
                    key={label}
                    className="flex h-9 items-center justify-center rounded-xl border border-devos-border bg-white/3 text-[10px] text-devos-muted"
                  >
                    {label}
                  </div>
                ))}
              </div>

              <div className="mt-4 text-xs text-devos-muted">
                DevOS v0.3 — Phase 3 Experience Layer
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
