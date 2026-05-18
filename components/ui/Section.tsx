"use client";

import * as React from "react";

import { cn } from "@/lib/cn";

export type SectionProps = React.HTMLAttributes<HTMLElement> & {
  innerClassName?: string;
};

export function Section({
  className,
  innerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("relative px-5 sm:px-6 py-12 sm:py-16", className)}
      {...props}
    >
      <div className={cn("mx-auto w-full max-w-6xl", innerClassName)}>
        {children}
      </div>
    </section>
  );
}

