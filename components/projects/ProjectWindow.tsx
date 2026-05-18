"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { cn } from "@/lib/cn";
import { easeOutCubic } from "@/lib/motion";
import { Button } from "@/components/ui/Button";

export type ProjectWindowProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onClose: () => void;
};

export function ProjectWindow({
  open,
  title,
  subtitle,
  children,
  onClose,
}: ProjectWindowProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const previouslyFocused = React.useRef<HTMLElement | null>(null);
  const titleId = React.useId();
  const subtitleId = React.useId();

  React.useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        // Minimal focus trap.
        const root = containerRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(
          'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0]!;
        const last = focusables[focusables.length - 1]!;
        const active = document.activeElement as HTMLElement | null;
        if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);

    // Lock background scroll.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus the window container ASAP.
    queueMicrotask(() => containerRef.current?.focus());

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, open]);

  React.useEffect(() => {
    if (open) return;
    // Restore focus to opener when closing.
    previouslyFocused.current?.focus?.();
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: easeOutCubic }}
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={subtitle ? subtitleId : undefined}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.25, ease: easeOutCubic }}
            className={cn(
              "devos-glass w-full max-w-3xl overflow-hidden rounded-3xl",
              "border border-devos-border",
            )}
            ref={containerRef}
            tabIndex={-1}
          >
            <div className="flex items-center justify-between border-b border-devos-border px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <div
                  id={titleId}
                  className="truncate text-sm font-semibold text-devos-text"
                >
                  {title}
                </div>
                {subtitle ? (
                  <div
                    id={subtitleId}
                    className="truncate text-xs text-devos-muted"
                  >
                    {subtitle}
                  </div>
                ) : null}
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
                <X className="size-4" />
              </Button>
            </div>
            <div className="max-h-[70vh] overflow-auto px-4 py-4 sm:px-5 sm:py-5">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

