"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Terminal, Layout, Code, ExternalLink, X } from "lucide-react";

import { cn } from "@/lib/cn";
import { easeOutCubic } from "@/lib/motion";
import { projects } from "@/data/projects";
import { unlockAchievement } from "@/lib/achievements";

type PaletteItem = {
  id: string;
  label: string;
  description: string;
  category: "navigation" | "command" | "project" | "link";
  action: () => void;
};

const CATEGORY_ICONS: Record<PaletteItem["category"], React.ReactNode> = {
  navigation: <Layout className="size-4" />,
  command: <Terminal className="size-4" />,
  project: <Code className="size-4" />,
  link: <ExternalLink className="size-4" />,
};

const CATEGORY_LABELS: Record<PaletteItem["category"], string> = {
  navigation: "Navigation",
  command: "Commands",
  project: "Projects",
  link: "Links",
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function buildItems(): PaletteItem[] {
  const items: PaletteItem[] = [];

  // Navigation
  const sections = [
    { id: "home", label: "Home", desc: "Back to top" },
    { id: "about", label: "Profile", desc: "System profile & telemetry" },
    { id: "terminal", label: "Terminal", desc: "Interactive command line" },
    { id: "skills", label: "Skills", desc: "Skills network map" },
    { id: "projects", label: "Projects", desc: "Project showcase" },
    { id: "certificates", label: "Certificates", desc: "Cryptographic credentials & badges" },
    { id: "github", label: "GitHub", desc: "Version control telemetry" },
    { id: "games", label: "Games", desc: "Mini games & simulation lab" },
    { id: "timeline", label: "Timeline", desc: "System logs" },
    { id: "contact", label: "Contact", desc: "Get in touch" },
  ];
  for (const s of sections) {
    items.push({
      id: `nav-${s.id}`,
      label: s.label,
      description: s.desc,
      category: "navigation",
      action: () => scrollTo(s.id),
    });
  }

  // Terminal commands
  const commands = [
    { name: "help", desc: "List available commands" },
    { name: "neofetch", desc: "Display system profile card" },
    { name: "whoami", desc: "Developer identity card" },
    { name: "about", desc: "Show system profile summary" },
    { name: "skills", desc: "List key skills" },
    { name: "system status", desc: "Show system resource usage" },
    { name: "system simulate", desc: "Run simulated boot sequence" },
  ];
  for (const c of commands) {
    items.push({
      id: `cmd-${c.name}`,
      label: c.name,
      description: c.desc,
      category: "command",
      action: () => {
        scrollTo("terminal");
        // Focus terminal input and pre-fill command after scroll
        setTimeout(() => {
          const input = document.querySelector<HTMLInputElement>('[aria-label="Terminal input"]');
          if (input) {
            input.focus();
            // Use native setter to trigger React's onChange
            const nativeSetter = Object.getOwnPropertyDescriptor(
              HTMLInputElement.prototype,
              "value",
            )?.set;
            nativeSetter?.call(input, c.name);
            input.dispatchEvent(new Event("input", { bubbles: true }));
          }
        }, 500);
      },
    });
  }

  // Projects
  for (const p of projects) {
    items.push({
      id: `proj-${p.id}`,
      label: p.name,
      description: p.short,
      category: "project",
      action: () => scrollTo("projects"),
    });
  }

  // External links
  items.push({
    id: "link-github",
    label: "GitHub",
    description: "View source code",
    category: "link",
    action: () => window.open("https://github.com/sidhu020", "_blank"),
  });

  return items;
}

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeIdx, setActiveIdx] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const listRef = React.useRef<HTMLDivElement | null>(null);

  const items = React.useMemo(() => buildItems(), []);

  const filtered = React.useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.category.includes(q),
    );
  }, [items, query]);

  // Group by category
  const grouped = React.useMemo(() => {
    const groups: Array<{ category: PaletteItem["category"]; items: PaletteItem[] }> = [];
    const seen = new Set<string>();
    for (const item of filtered) {
      if (!seen.has(item.category)) {
        seen.add(item.category);
        groups.push({ category: item.category, items: [] });
      }
      groups.find((g) => g.category === item.category)!.items.push(item);
    }
    return groups;
  }, [filtered]);

  // Keyboard shortcut
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => {
          if (!v) unlockAchievement("palette-pro");
          return !v;
        });
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus input on open
  React.useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIdx(0);
      queueMicrotask(() => inputRef.current?.focus());
    }
  }, [open]);

  // Reset active on filter change
  React.useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  // Scroll active item into view
  React.useEffect(() => {
    const activeEl = listRef.current?.querySelector("[data-active='true']");
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  const selectItem = React.useCallback(
    (item: PaletteItem) => {
      setOpen(false);
      item.action();
    },
    [],
  );

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((v) => Math.min(v + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((v) => Math.max(v - 1, 0));
      }
      if (e.key === "Enter" && filtered[activeIdx]) {
        e.preventDefault();
        selectItem(filtered[activeIdx]);
      }
    },
    [activeIdx, filtered, selectItem],
  );

  let flatIdx = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 backdrop-blur-sm pt-[10vh] sm:pt-[15vh] px-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: easeOutCubic }}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-devos-border bg-devos-surface/95 shadow-2xl shadow-black/40 backdrop-blur-xl"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-devos-border px-4 py-3">
              <Search className="size-4 text-devos-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search commands, sections, projects…"
                className="flex-1 bg-transparent text-sm text-devos-text outline-none placeholder:text-devos-muted"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-devos-border px-1.5 py-0.5 text-[10px] font-mono text-devos-muted hover:text-devos-text transition"
              >
                ESC
              </button>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[50vh] overflow-auto p-2">
              {filtered.length === 0 ? (
                <div className="px-3 py-8 text-center text-sm text-devos-muted">
                  No results found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                grouped.map((group) => (
                  <div key={group.category} className="mb-2 last:mb-0">
                    <div className="px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-devos-muted">
                      {CATEGORY_LABELS[group.category]}
                    </div>
                    {group.items.map((item) => {
                      flatIdx++;
                      const isActive = flatIdx === activeIdx;
                      const idx = flatIdx;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          data-active={isActive}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition",
                            isActive
                              ? "bg-devos-accent/10 text-devos-text"
                              : "text-devos-muted hover:bg-white/5 hover:text-devos-text",
                          )}
                          onMouseEnter={() => setActiveIdx(idx)}
                          onClick={() => selectItem(item)}
                        >
                          <span
                            className={cn(
                              "flex-shrink-0",
                              isActive ? "text-devos-accent" : "text-devos-muted",
                            )}
                          >
                            {CATEGORY_ICONS[item.category]}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="truncate font-medium">{item.label}</div>
                            <div className="truncate text-xs text-devos-muted">
                              {item.description}
                            </div>
                          </div>
                          {isActive && (
                            <span className="text-xs text-devos-accent font-mono">↵</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-devos-border px-4 py-2 text-[10px] text-devos-muted">
              <div className="flex items-center gap-3">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>esc close</span>
              </div>
              <span className="font-mono">DevOS</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
