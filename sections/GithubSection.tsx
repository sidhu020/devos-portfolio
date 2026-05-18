"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa6";
import { Activity, GitBranch, GitCommit, GitPullRequest, Star } from "lucide-react";

import { cn } from "@/lib/cn";
import { fadeInUp, staggerChildren } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { Eyebrow, H2 } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

const REPOS = [
  { name: "devos-portfolio", desc: "Futuristic interactive developer portfolio", stars: 128, forks: 12, href: "https://github.com/sidhu020/devos-portfolio" },
  { name: "NodeNet", desc: "Offline CS lab network file manager simulating decentralized desktop-in-browser environment", stars: 74, forks: 18, href: "https://github.com/sidhu020/NodeNet" },
  { name: "financial-audit-openenv", desc: "Dockerized simulation environment for financial auditing and fraud detection", stars: 42, forks: 8, href: "https://github.com/sidhu020/financial-audit-openenv" },
  { name: "scms", desc: "Service Center Management System (SCMS) with automated dispatch & status tracking", stars: 56, forks: 14, href: "https://github.com/siddharth1703tnr/scms" },
];

function HeatmapCell({ intensity }: { intensity: number }) {
  const bgClasses = [
    "bg-devos-surface", // 0
    "bg-devos-accent/30", // 1
    "bg-devos-accent/60", // 2
    "bg-devos-accent/80", // 3
    "bg-devos-accent",    // 4
  ];
  return (
    <div className={cn("size-2.5 rounded-sm md:size-3", bgClasses[intensity] ?? bgClasses[0])} />
  );
}

export function GithubSection({ className }: { className?: string }) {
  // Generate deterministic heatmap data to prevent hydration mismatches
  const heatmapData = Array.from({ length: 52 * 7 }).map((_, i) => {
    // Pseudo-random deterministic value based on index
    const rand = Math.abs(Math.sin(i * 13.5) * Math.cos(i * 7.1));
    if (rand > 0.85) return 4;
    if (rand > 0.7) return 3;
    if (rand > 0.5) return 2;
    if (rand > 0.3) return 1;
    return 0;
  });

  return (
    <Section id="github" className={cn(className)}>
      <motion.div {...fadeInUp} className="mb-10 sm:mb-16">
        <Eyebrow>Version Control</Eyebrow>
        <H2 className="mt-4 flex items-center gap-3">
          <FaGithub className="size-8" />
          GitHub Telemetry
        </H2>
        <p className="mt-4 max-w-2xl text-devos-muted sm:text-lg leading-relaxed">
          Real-time extraction of version control activity, commits, and open-source contributions.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Heatmap & Stats */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="devos-glass flex flex-col gap-6 rounded-3xl p-4 sm:p-6 lg:col-span-2 w-full min-w-0 overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-devos-border pb-4">
            <h3 className="font-semibold text-devos-text flex items-center gap-2">
              <Activity className="size-4 text-devos-accent" />
              Contribution Matrix
            </h3>
            <span className="text-xs font-mono text-devos-muted">1,432 commits in last year</span>
          </div>
          
          <div className="overflow-x-auto pb-2 w-full max-w-full">
            <div className="grid grid-flow-col grid-rows-7 gap-1 w-max">
              {heatmapData.map((intensity, i) => (
                <HeatmapCell key={i} intensity={intensity} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-4 pt-2">
            <div className="rounded-xl border border-devos-border bg-white/3 p-3 sm:p-4">
              <GitCommit className="size-5 text-devos-muted mb-2" />
              <div className="text-xl font-bold text-devos-text">1.4k</div>
              <div className="text-xs text-devos-muted">Commits</div>
            </div>
            <div className="rounded-xl border border-devos-border bg-white/3 p-3 sm:p-4">
              <GitPullRequest className="size-5 text-devos-muted mb-2" />
              <div className="text-xl font-bold text-devos-text">128</div>
              <div className="text-xs text-devos-muted">PRs</div>
            </div>
            <div className="rounded-xl border border-devos-border bg-white/3 p-3 sm:p-4">
              <GitBranch className="size-5 text-devos-muted mb-2" />
              <div className="text-xl font-bold text-devos-text">42</div>
              <div className="text-xs text-devos-muted">Branches</div>
            </div>
            <div className="rounded-xl border border-devos-border bg-white/3 p-3 sm:p-4">
              <Star className="size-5 text-devos-muted mb-2" />
              <div className="text-xl font-bold text-devos-text">468</div>
              <div className="text-xs text-devos-muted">Stars</div>
            </div>
          </div>
        </motion.div>

        {/* Top Repos */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <div className="rounded-2xl border border-devos-border bg-white/3 p-4 border-b-0 rounded-b-none pb-2">
            <h3 className="font-semibold text-devos-text text-sm">Top Repositories</h3>
          </div>
          
          <div className="flex flex-col gap-3">
            {REPOS.map((repo, i) => (
              <motion.a
                key={i}
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="devos-focus-ring devos-tilt group relative block rounded-2xl border border-devos-border bg-devos-surface/40 p-3.5 sm:p-4 transition-all hover:bg-white/5"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="font-medium text-devos-accent group-hover:underline break-all">
                    {repo.name}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-devos-muted shrink-0">
                    <span className="flex items-center gap-1"><Star className="size-3" /> {repo.stars}</span>
                    <span className="flex items-center gap-1"><GitBranch className="size-3" /> {repo.forks}</span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-devos-muted">{repo.desc}</p>
              </motion.a>
            ))}
          </div>

          <Button
            variant="secondary"
            className="w-full mt-2"
            onClick={() => window.open("https://github.com/sidhu020", "_blank")}
          >
            <FaGithub className="mr-2 size-4" />
            View Full Profile
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
