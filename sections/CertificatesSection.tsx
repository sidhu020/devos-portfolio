import * as React from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, ExternalLink, Calendar, Key } from "lucide-react";

import { cn } from "@/lib/cn";
import { fadeInUp, easeOutCubic, staggerChildren } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { Eyebrow, H2 } from "@/components/ui/Heading";

const CERTIFICATES = [
  {
    title: "Google AI Essentials Specialization",
    issuer: "Google",
    date: "Issued May 2026",
    id: "GUZ1EML034L2",
    status: "VERIFIED",
    link: "https://www.coursera.org/account/accomplishments/specialization/GUZ1EML034L2",
    category: "AI",
  },
  {
    title: "CS50’s Introduction to Programming with Scratch",
    issuer: "Harvard University",
    date: "Issued May 2026",
    id: "813e3986-029e-48a6-a207-84d5440bc600",
    status: "VERIFIED",
    link: "https://certificates.cs50.io/813e3986-029e-48a6-a207-84d5440bc600.pdf?size=letter",
    category: "Software",
  },
  {
    title: "HTML Essentials : JS Institute",
    issuer: "Cisco Networking Academy",
    date: "Issued Apr 2026",
    id: "0b7437be-4706-4aa0-a2f9-f19c0a466a61",
    status: "ACTIVE",
    link: "https://www.credly.com",
    category: "Web",
  },
  {
    title: "SQL (Basic) Certificate",
    issuer: "HackerRank",
    date: "Issued Feb 2026",
    id: "2ef8d59c0f14",
    status: "VERIFIED",
    link: "https://www.hackerrank.com/certificates/2ef8d59c0f14",
    category: "Database",
  },
  {
    title: "Awareness of Human Rights (Day Quiz)",
    issuer: "Saurashtra University, Rajkot",
    date: "Issued Dec 2025",
    id: "SAU-HR-2025",
    status: "COMPLETED",
    link: "https://saurashtrauniversity.edu",
    category: "General",
  },
  {
    title: "AI-FOR-ALL",
    issuer: "Ministry of Education, Gov. of India",
    date: "Issued Dec 2025",
    id: "MOE-AI-2025",
    status: "VERIFIED",
    link: "https://education.gov.in",
    category: "AI",
  },
  {
    title: "Introduction to Networking",
    issuer: "NVIDIA",
    date: "Issued Nov 2025",
    id: "IJ9KXH5BZ5AE",
    status: "ACTIVE",
    link: "https://www.coursera.org/account/accomplishments/verify/IJ9KXH5BZ5AE",
    category: "Networking",
  },
  {
    title: "Cisco Introduction to Network Automation",
    issuer: "Cisco",
    date: "Issued Nov 2025",
    id: "OKWA64QFENG5",
    status: "VERIFIED",
    link: "https://www.coursera.org/account/accomplishments/verify/OKWA64QFENG5",
    category: "Networking",
  },
  {
    title: "Technology Apprenticeship Job Simulation",
    issuer: "Accenture UK & Ireland",
    date: "Issued Jul 2025",
    id: "4GvoJuSF6W7HNoBAG",
    status: "GRADUATED",
    link: "https://www.theforage.com",
    category: "Software",
  },
  {
    title: "AWS - Solutions Architecture Job Simulation",
    issuer: "Amazon Web Services (AWS)",
    date: "Issued Jul 2025",
    id: "Py5ZLqunqAFuL8cD8",
    status: "VERIFIED",
    link: "https://www.theforage.com",
    category: "Cloud",
  },
  {
    title: "Cyber Job Simulation",
    issuer: "Deloitte",
    date: "Issued Jul 2025",
    id: "EDMJ2sqpm5h6rAhYf",
    status: "SECURE",
    link: "https://www.theforage.com",
    category: "Cybersecurity",
  },
  {
    title: "Cybersecurity Analyst Job Simulation",
    issuer: "Tata Consultancy Services",
    date: "Issued Jul 2025",
    id: "Gcib8D3TrBaGRsYc7",
    status: "ACTIVE",
    link: "https://www.theforage.com",
    category: "Cybersecurity",
  },
] as const;

export function CertificatesSection({ className }: { className?: string }) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Section id="certificates" className={cn(className)}>
      <motion.div {...fadeInUp} className="mb-10 sm:mb-16">
        <Eyebrow>Credentials & Badges</Eyebrow>
        <H2 className="mt-4 flex items-center gap-3">
          <Award className="size-8 text-devos-accent" />
          Certified Systems & Skills
        </H2>
        <p className="mt-4 max-w-2xl text-devos-muted sm:text-lg leading-relaxed">
          Cryptographically verified industry credentials, security certifications, and professional learning paths.
        </p>
      </motion.div>

      <motion.div
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {CERTIFICATES.map((cert, i) => (
          <motion.div
            key={cert.title}
            variants={fadeInUp}
            className={cn(
              "devos-focus-ring devos-tilt group relative flex flex-col justify-between rounded-3xl border border-devos-border bg-white/3 p-6 transition-all duration-300 hover:bg-white/6 hover:border-devos-accent/30",
              !isExpanded && i >= 3 && "hidden sm:flex"
            )}
          >
            <div>
              {/* Category Badge & Status Indicator */}
              <div className="flex items-center justify-between mb-4">
                <span className="rounded-lg bg-devos-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-devos-accent">
                  {cert.category}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.15em] font-semibold text-emerald-400">
                  <ShieldCheck className="size-3" />
                  {cert.status}
                </span>
              </div>

              {/* Title & Issuer */}
              <h3 className="text-base font-semibold leading-tight text-devos-text group-hover:text-devos-accent transition-colors min-h-[3rem]">
                {cert.title}
              </h3>
              <p className="mt-2 text-sm text-devos-muted">{cert.issuer}</p>
            </div>

            {/* Metadata Footer */}
            <div className="mt-6 border-t border-devos-border/50 pt-4 flex flex-col gap-2">
              <div className="flex flex-col gap-1.5 font-mono text-[10px] text-devos-muted">
                <span className="flex items-center gap-1">
                  <Calendar className="size-3.5" />
                  {cert.date}
                </span>
                <span className="flex items-center gap-1">
                  <Key className="size-3.5" />
                  ID: {cert.id}
                </span>
              </div>

              {/* Verification Link */}
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-devos-border bg-black/20 py-2 text-xs font-medium text-devos-muted transition hover:bg-devos-accent/10 hover:text-devos-text hover:border-devos-accent/30"
              >
                Verify Credential
                <ExternalLink className="size-3" />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Expand / Show More Button for Mobile only */}
      <div className="mt-8 flex justify-center sm:hidden">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 rounded-xl border border-devos-border bg-white/3 px-5 py-2.5 text-xs font-semibold text-devos-text transition hover:bg-white/6 hover:border-devos-accent/30 active:scale-[0.98]"
        >
          {isExpanded ? "Show Less" : "Show All Credentials"}
        </button>
      </div>
    </Section>
  );
}
