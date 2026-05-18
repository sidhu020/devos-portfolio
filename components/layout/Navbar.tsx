"use client";

import { motion } from "framer-motion";
import { ChevronRight, Search } from "lucide-react";

import { cn } from "@/lib/cn";
import { fadeIn } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { useActiveSection } from "@/hooks/useActiveSection";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "Profile" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#timeline", label: "Logs" },
  { href: "#contact", label: "Contact" },
] as const;

export function Navbar({ className }: { className?: string }) {
  const active = useActiveSection(links.map((l) => l.href.slice(1)));

  const openPalette = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true }),
    );
  };

  return (
    <motion.header
      {...fadeIn}
      className={cn(
        "fixed inset-x-0 top-0 z-40",
        "px-4 pt-4 sm:px-6",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border border-devos-border bg-devos-surface/40 px-3 py-3 backdrop-blur">
        <a
          href="#home"
          className={cn(
            "devos-focus-ring group inline-flex items-center gap-2 rounded-xl px-3 py-2",
          )}
        >
          <span className="text-sm font-semibold tracking-wide text-devos-text">
            DevOS
          </span>
          <span className="hidden text-xs text-devos-muted sm:inline">
            command center
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href.slice(1) ? "page" : undefined}
              className={cn(
                "devos-focus-ring rounded-xl px-3 py-2 text-sm transition",
                "hover:bg-white/5",
                active === l.href.slice(1)
                  ? "text-devos-text"
                  : "text-devos-muted hover:text-devos-text",
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            className="devos-focus-ring hidden items-center gap-2 rounded-xl border border-devos-border bg-white/3 px-3 py-2 text-xs text-devos-muted transition hover:bg-white/6 hover:text-devos-text sm:flex"
          >
            <Search className="size-3" />
            <span className="font-mono">Ctrl</span>
            <span className="font-mono">K</span>
            <span className="hidden md:inline">search</span>
          </button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" });
              setTimeout(() => {
                document.querySelector<HTMLInputElement>('[aria-label="Terminal input"]')?.focus();
              }, 600);
            }}
          >
            Terminal
            <ChevronRight className="size-4 text-devos-muted" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
