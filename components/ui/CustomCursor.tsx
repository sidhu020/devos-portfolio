"use client";

import * as React from "react";

import { cn } from "@/lib/cn";

export function CustomCursor() {
  const dotRef = React.useRef<HTMLDivElement | null>(null);
  const ringRef = React.useRef<HTMLDivElement | null>(null);
  const pos = React.useRef({ x: 0, y: 0 });
  const smoothPos = React.useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [isTouch, setIsTouch] = React.useState(true);

  React.useEffect(() => {
    // Detect touch device
    const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (hasCoarsePointer) return;
    setIsTouch(false);

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.closest("a, button, [role='button'], input, textarea, select, [tabindex]") !== null;
      setIsHovering(isClickable);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    let raf: number;
    const animate = () => {
      const lerp = 0.15;
      smoothPos.current.x += (pos.current.x - smoothPos.current.x) * lerp;
      smoothPos.current.y += (pos.current.y - smoothPos.current.y) * lerp;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${smoothPos.current.x}px, ${smoothPos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${smoothPos.current.x}px, ${smoothPos.current.y}px) scale(${isHovering ? 1.8 : 1})`;
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, [visible, isHovering]);

  if (isTouch) return null;

  return (
    <>
      {/* Glow ring */}
      <div
        ref={ringRef}
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[9999] -ml-5 -mt-5 size-10 rounded-full",
          "border border-devos-cyan/20 bg-devos-cyan/5 transition-[opacity,transform] duration-300",
          visible ? "opacity-100" : "opacity-0",
        )}
        aria-hidden
      />
      {/* Dot */}
      <div
        ref={dotRef}
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[9999] -ml-1 -mt-1 size-2 rounded-full",
          "bg-devos-cyan shadow-[0_0_8px_2px_rgba(34,211,238,0.4)] transition-opacity duration-200",
          visible ? "opacity-100" : "opacity-0",
        )}
        aria-hidden
      />
    </>
  );
}
