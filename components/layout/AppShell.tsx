"use client";

import * as React from "react";

import { BootScreen } from "@/components/layout/BootScreen";
import { Navbar } from "@/components/layout/Navbar";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { MobileDock } from "@/components/layout/MobileDock";

export function AppShell({ children }: { children: React.ReactNode }) {
  // Initialize Lenis smooth scroll
  React.useEffect(() => {
    let lenis: InstanceType<typeof import("lenis").default> | null = null;
    let raf: number;

    import("lenis").then((mod) => {
      const Lenis = mod.default;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function animate(time: number) {
        lenis?.raf(time);
        raf = requestAnimationFrame(animate);
      }
      raf = requestAnimationFrame(animate);
    });

    return () => {
      lenis?.destroy();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <BootScreen>
      <a
        href="#home"
        className="devos-focus-ring sr-only fixed left-4 top-4 z-[60] rounded-xl border border-devos-border bg-devos-surface/80 px-3 py-2 text-sm text-devos-text backdrop-blur focus:not-sr-only"
      >
        Skip to content
      </a>
      <CustomCursor />
      <CommandPalette />
      <Navbar />
      <MobileDock />
      <div className="pt-[72px] sm:pt-20">{children}</div>
    </BootScreen>
  );
}
