"use client";

import { motion } from "framer-motion";
import { GraduationCap, Terminal } from "lucide-react";

import { cn } from "@/lib/cn";
import { fadeInUp, easeOutCubic, staggerChildren } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { Eyebrow, H2 } from "@/components/ui/Heading";

const LOGS = [
  { year: "2022", text: "Boot sequence started: MCA journey initiated." },
  { year: "2023", text: "Subsystem online: Full-stack development." },
  { year: "2024", text: "Optimization pass: UI systems + performance focus." },
  { year: "2025", text: "Deployment pipeline stabilized. Portfolio architecture upgraded." },
  { year: "2026", text: "DevOS Phase 3: terminal + command palette + experience layer." },
] as const;

export function TimelineSection({ className }: { className?: string }) {
  return (
    <Section id="timeline" className={cn(className)}>
      <motion.div {...fadeInUp} className="devos-glass rounded-3xl p-6 sm:p-8">
        <div className="mb-8">
          <Eyebrow>System Logs & Telemetry</Eyebrow>
          <H2 className="flex items-center gap-3">
            <Terminal className="size-8 text-devos-accent" />
            Timeline & Education
          </H2>
          <p className="mt-3 text-sm text-devos-muted max-w-xl">
            A developer-focused diagnostic logger showing career milestones and cryptographically aligned education paths.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Terminal: System logs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOutCubic }}
            className="overflow-hidden rounded-3xl border border-devos-border bg-black/20"
          >
            <div className="flex items-center justify-between border-b border-devos-border bg-devos-surface/40 px-4 py-3 font-mono text-xs text-devos-muted sm:px-5">
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-red-400/80" />
                <span className="size-2 rounded-full bg-yellow-400/80" />
                <span className="size-2 rounded-full bg-green-400/80" />
              </span>
              <span>devos@local:~$ tail -f /var/log/system.log</span>
            </div>
            <div className="px-4 py-5 sm:px-5">
              <div className="space-y-4 font-mono text-xs leading-relaxed">
                {LOGS.map((l, i) => (
                  <motion.div
                    key={l.year}
                    initial={{ opacity: 0, x: -8, filter: "blur(2px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: easeOutCubic }}
                    className="text-devos-muted"
                  >
                    <span className="text-devos-cyan font-bold">[{l.year}]</span>{" "}
                    <span className="text-devos-text font-medium">{l.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Terminal: Education Logs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOutCubic }}
            className="overflow-hidden rounded-3xl border border-devos-border bg-black/20"
          >
            <div className="flex items-center justify-between border-b border-devos-border bg-devos-surface/40 px-4 py-3 font-mono text-xs text-devos-muted sm:px-5">
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-red-400/80" />
                <span className="size-2 rounded-full bg-yellow-400/80" />
                <span className="size-2 rounded-full bg-green-400/80" />
              </span>
              <span>devos@local:~$ cat /etc/education.conf</span>
            </div>
            <div className="px-4 py-5 sm:px-5 font-mono text-xs leading-relaxed text-devos-muted space-y-6">
              {/* MCA Block */}
              <motion.div
                initial={{ opacity: 0, x: 8, filter: "blur(2px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: easeOutCubic }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-devos-cyan font-bold flex items-center gap-1.5">
                    <GraduationCap className="size-4 text-devos-accent" />
                    [2025 - 2027] Saurashtra University
                  </span>
                  <span className="rounded bg-devos-accent/10 px-1.5 py-0.5 text-[9px] font-semibold text-devos-accent">
                    IN_PROGRESS
                  </span>
                </div>
                <div className="pl-6 border-l border-devos-border/55 ml-2 mt-1 space-y-1.5">
                  <div><span className="text-devos-text font-bold">Institution:</span> Saurashtra University, Rajkot (Dept. of Computer Science)</div>
                  <div><span className="text-devos-text">Program:</span> Master of Computer Applications (MCA)</div>
                  <div><span className="text-devos-text">Focus:</span> Computer Science & System Abstractions</div>
                  <div><span className="text-devos-text">Telemetry Grade:</span> <strong className="text-emerald-400">A</strong></div>
                </div>
              </motion.div>

              {/* BCA Block */}
              <motion.div
                initial={{ opacity: 0, x: 8, filter: "blur(2px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.08, ease: easeOutCubic }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-devos-cyan font-bold flex items-center gap-1.5">
                    <GraduationCap className="size-4 text-devos-purple" />
                    [2022 - 2025] T.N.Rao Institute
                  </span>
                  <span className="rounded bg-emerald-400/10 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-400">
                    COMPLETED
                  </span>
                </div>
                <div className="pl-6 border-l border-devos-border/55 ml-2 mt-1 space-y-1.5">
                  <div><span className="text-devos-text font-bold">Institution:</span> T.N.RAO INSTITUTE OF MANAGEMENT RESEARCH & TECHNOLOGY & B.ED.COLLEGE-RAJKOT</div>
                  <div><span className="text-devos-text">Program:</span> Bachelor's of Computer Applications (BCA)</div>
                  <div><span className="text-devos-text">Focus:</span> Computer & Information Sciences</div>
                  <div><span className="text-devos-text">Telemetry Grade:</span> <strong className="text-emerald-400">First class with Distinction</strong></div>
                  <div><span className="text-devos-text">Primary Stack:</span> PHP, HTML5, CSS3, JavaScript, DBMS, Software Engineering, Networks</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
