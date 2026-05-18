"use client";

import { motion } from "framer-motion";
import { Cpu, MemoryStick, Network } from "lucide-react";

import { cn } from "@/lib/cn";
import { fadeInUp } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { Eyebrow, H2 } from "@/components/ui/Heading";

function StatCard({
  icon,
  title,
  value,
  hint,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-devos-border bg-white/3 p-4">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-[0.18em] text-devos-muted">
          {title}
        </div>
        <div className="text-devos-muted">{icon}</div>
      </div>
      <div className="mt-2 text-2xl font-semibold text-devos-text">{value}</div>
      <div className="mt-1 text-xs text-devos-muted">{hint}</div>
    </div>
  );
}

function Sparkline({
  seed = 1,
  className,
}: {
  seed?: number;
  className?: string;
}) {
  // Lightweight deterministic-ish SVG sparkline.
  const points = Array.from({ length: 18 }).map((_, i) => {
    const t = i / 17;
    const v =
      0.45 +
      0.22 * Math.sin((t * 7 + seed) * 2.2) +
      0.12 * Math.sin((t * 11 + seed) * 1.3);
    const x = 6 + t * 188;
    const y = 44 - v * 34;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });

  return (
    <svg
      viewBox="0 0 200 50"
      className={cn("h-10 w-full text-devos-accent", className)}
      aria-hidden
    >
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points.join(" ")}
        opacity="0.9"
      />
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points.join(" ")}
        opacity="0.08"
      />
    </svg>
  );
}

export function AboutSection({ className }: { className?: string }) {
  return (
    <Section id="about" className={cn(className)}>
      <motion.div {...fadeInUp} className="grid gap-6 md:grid-cols-2">
        <div className="devos-glass rounded-3xl p-6 sm:p-8">
          <Eyebrow>System Profile</Eyebrow>
          <H2 className="mt-4">
            Engineering dashboard vibes — without the bloat.
          </H2>
          <p className="mt-3 text-sm leading-relaxed text-devos-muted sm:text-base">
            This portfolio is built as a minimal command center. Phase 2 introduces the
            terminal and core sections with lightweight, performance-first UI patterns.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-devos-border bg-white/3 px-4 py-3 text-sm text-devos-muted">
              <div className="text-xs uppercase tracking-[0.18em]">Mode</div>
              <div className="mt-1 text-devos-text">Phase 2</div>
            </div>
            <div className="rounded-2xl border border-devos-border bg-white/3 px-4 py-3 text-sm text-devos-muted">
              <div className="text-xs uppercase tracking-[0.18em]">Stack</div>
              <div className="mt-1 text-devos-text">Next.js / TS</div>
            </div>
            <div className="rounded-2xl border border-devos-border bg-white/3 px-4 py-3 text-sm text-devos-muted">
              <div className="text-xs uppercase tracking-[0.18em]">Design</div>
              <div className="mt-1 text-devos-text">DevOS tokens</div>
            </div>
          </div>
        </div>

        <div className="devos-glass rounded-3xl p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-devos-text">Live telemetry</h3>
            <span className="text-xs font-mono text-devos-muted">simulated</span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <StatCard
              icon={<Cpu className="size-4" />}
              title="CPU"
              value="37%"
              hint="load avg stable"
            />
            <StatCard
              icon={<MemoryStick className="size-4" />}
              title="RAM"
              value="5.2GB"
              hint="in use"
            />
            <StatCard
              icon={<Network className="size-4" />}
              title="NET"
              value="42ms"
              hint="latency"
            />
          </div>

          <div className="mt-6 grid gap-3">
            <div className="rounded-2xl border border-devos-border bg-white/3 p-4">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-[0.18em] text-devos-muted">
                  CPU trend
                </div>
                <div className="text-xs font-mono text-devos-muted">5m</div>
              </div>
              <Sparkline seed={2} className="mt-2" />
            </div>
            <div className="rounded-2xl border border-devos-border bg-white/3 p-4">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-[0.18em] text-devos-muted">
                  Network activity
                </div>
                <div className="text-xs font-mono text-devos-muted">5m</div>
              </div>
              <Sparkline seed={7} className="mt-2 text-devos-purple" />
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

