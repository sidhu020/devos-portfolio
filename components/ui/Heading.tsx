"use client";

import * as React from "react";

import { cn } from "@/lib/cn";

export function Eyebrow({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "text-xs font-medium uppercase tracking-[0.28em] text-devos-cyan",
        className,
      )}
      {...props}
    />
  );
}

export function H2({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("mt-3 text-2xl font-semibold text-devos-text sm:text-3xl", className)}
      {...props}
    />
  );
}

