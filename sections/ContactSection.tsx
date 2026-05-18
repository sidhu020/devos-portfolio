"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

import { cn } from "@/lib/cn";
import { fadeInUp, easeOutCubic } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { Eyebrow, H2 } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

const LINKS = [
  {
    icon: <Mail className="size-5" />,
    label: "Email",
    value: "siddharthborisagar1234@gmail.com",
    href: "mailto:siddharthborisagar1234@gmail.com",
  },
  {
    icon: <FaGithub className="size-5" />,
    label: "GitHub",
    value: "github.com/sidhu020",
    href: "https://github.com/sidhu020",
  },
  {
    icon: <FaLinkedin className="size-5" />,
    label: "LinkedIn",
    value: "linkedin.com/in/siddharthborisagar",
    href: "https://www.linkedin.com/in/siddharthborisagar/",
  },
] as const;

export function ContactSection({ className }: { className?: string }) {
  return (
    <Section id="contact" className={cn("pb-24 sm:pb-28", className)}>
      <motion.div {...fadeInUp} className="devos-glass rounded-3xl p-6 sm:p-8">
        <Eyebrow>Connect</Eyebrow>
        <H2>Let&apos;s build something together.</H2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-devos-muted sm:text-base">
          Currently open to opportunities — internships, freelance, or full-time roles.
          Reach out through any channel below.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: easeOutCubic }}
              className={cn(
                "devos-focus-ring devos-tilt group flex items-center gap-3 sm:gap-4 rounded-2xl border border-devos-border bg-white/3 p-3.5 sm:p-4 transition",
                "hover:bg-white/6 hover:border-devos-accent/20",
              )}
              aria-label={`${link.label}: ${link.value}`}
            >
              <div className="flex size-10 items-center justify-center rounded-xl border border-devos-border bg-black/20 text-devos-muted transition group-hover:text-devos-accent group-hover:border-devos-accent/30">
                {link.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs uppercase tracking-[0.18em] text-devos-muted">
                  {link.label}
                </div>
                <div className="mt-0.5 break-all text-xs sm:text-sm text-devos-text">
                  {link.value}
                </div>
              </div>
              <ArrowUpRight className="size-4 text-devos-muted transition group-hover:text-devos-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          ))}
        </div>

        {/* Resume Download Callout */}
        <div className="mt-8 flex flex-col justify-between gap-4 rounded-2xl border border-devos-border bg-white/3 p-5 sm:flex-row sm:items-center">
          <div>
            <div className="text-sm font-semibold text-devos-text">Need a physical copy?</div>
            <div className="text-xs text-devos-muted">Download the aligned recruiter-ready resume PDF.</div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.open("/resume.pdf", "_blank", "noopener,noreferrer")}
            className="border border-devos-border bg-black/20 hover:bg-white/6 hover:border-devos-accent/20"
          >
            📄 Download Resume
          </Button>
        </div>

        {/* Status indicator */}
        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-devos-border bg-white/3 px-4 py-3">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
          </span>
          <span className="text-sm text-devos-muted">
            Status: <span className="text-emerald-400">Available</span> for new opportunities
          </span>
        </div>

        {/* Terminal hint */}
        <div className="mt-6 rounded-2xl border border-devos-border bg-black/20 px-4 py-3 font-mono text-xs text-devos-muted">
          <span className="text-devos-cyan">devos@local:~$</span>{" "}
          <span className="text-devos-text">contact</span>
          <span className="mx-2 text-devos-muted">—</span>
          try it in the terminal above ↑
        </div>
      </motion.div>
    </Section>
  );
}
