"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Home, FolderGit2, TerminalSquare, Award, Mail } from "lucide-react";

import { cn } from "@/lib/cn";
import { useActiveSection } from "@/hooks/useActiveSection";

const dockItems = [
  { id: "home", label: "Home", icon: <Home className="size-5" />, href: "#home" },
  { id: "projects", label: "Projects", icon: <FolderGit2 className="size-5" />, href: "#projects" },
  { id: "terminal", label: "Terminal", icon: <TerminalSquare className="size-5" />, href: "#terminal" },
  { id: "certificates", label: "Certificates", icon: <Award className="size-5" />, href: "#certificates" },
  { id: "contact", label: "Contact", icon: <Mail className="size-5" />, href: "#contact" },
];

export function MobileDock() {
  const activeSection = useActiveSection(dockItems.map((item) => item.id));

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-4 inset-x-0 z-50 flex justify-center px-4 md:hidden"
    >
      <div className="devos-glass flex items-center gap-1 rounded-full p-2">
        {dockItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                "devos-focus-ring relative flex flex-col items-center justify-center rounded-full p-3 transition-colors",
                isActive ? "text-devos-accent" : "text-devos-muted hover:text-devos-text"
              )}
              aria-label={item.label}
            >
              {isActive && (
                <motion.div
                  layoutId="activeDockIndicator"
                  className="absolute inset-0 rounded-full bg-devos-accent/10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.icon}</span>
            </a>
          );
        })}
      </div>
    </motion.div>
  );
}
