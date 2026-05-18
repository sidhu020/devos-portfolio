"use client";

import * as React from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  onMouseMove,
  ...props
}: ButtonProps) {
  const ref = React.useRef<HTMLButtonElement | null>(null);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = ref.current;
      if (btn) {
        const rect = btn.getBoundingClientRect();
        btn.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        btn.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      }
      onMouseMove?.(e);
    },
    [onMouseMove],
  );

  return (
    <button
      ref={ref}
      type={type}
      onMouseMove={handleMouseMove}
      className={cn(
        "devos-focus-ring devos-btn-glow inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200",
        "touch-manipulation select-none",
        "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50",
        "hover:-translate-y-[1px] hover:shadow-lg hover:shadow-black/20",
        size === "sm" ? "h-9 px-3 text-sm" : "h-11 px-5 text-sm",
        variant === "primary" && "bg-devos-accent text-black hover:brightness-110",
        variant === "secondary" &&
          "border border-devos-border bg-devos-surface/40 text-devos-text hover:bg-devos-surface/55",
        variant === "ghost" && "text-devos-text hover:bg-white/5",
        className,
      )}
      {...props}
    />
  );
}
