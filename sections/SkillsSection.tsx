"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/cn";
import { fadeInUp } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { Eyebrow, H2 } from "@/components/ui/Heading";

type Node = {
  id: string;
  label: string;
  x: number; // 0..1
  y: number; // 0..1
};

const NODES: Node[] = [
  {
    "id": "html",
    "label": "HTML",
    "x": 0.238,
    "y": 0.282
  },
  {
    "id": "css",
    "label": "CSS",
    "x": 0.199,
    "y": 0.376
  },
  {
    "id": "js",
    "label": "JS",
    "x": 0.091,
    "y": 0.363
  },
  {
    "id": "web",
    "label": "web",
    "x": 0.061,
    "y": 0.225
  },
  {
    "id": "ajax",
    "label": "ajax",
    "x": 0.092,
    "y": 0.136
  },
  {
    "id": "json",
    "label": "json",
    "x": 0.186,
    "y": 0.112
  },
  {
    "id": "php",
    "label": "php",
    "x": 0.59,
    "y": 0.238
  },
  {
    "id": "java",
    "label": "java",
    "x": 0.55,
    "y": 0.374
  },
  {
    "id": "c#",
    "label": "c#",
    "x": 0.51,
    "y": 0.399
  },
  {
    "id": "net",
    "label": ".net",
    "x": 0.428,
    "y": 0.34
  },
  {
    "id": "asp",
    "label": "asp",
    "x": 0.412,
    "y": 0.216
  },
  {
    "id": "j2ee",
    "label": "j2ee",
    "x": 0.441,
    "y": 0.136
  },
  {
    "id": "python",
    "label": "python",
    "x": 0.492,
    "y": 0.101
  },
  {
    "id": "kotlin",
    "label": "kotlin",
    "x": 0.574,
    "y": 0.165
  },
  {
    "id": "mysql",
    "label": "mysql",
    "x": 0.94,
    "y": 0.261
  },
  {
    "id": "rdbmsoracle",
    "label": "rdbms oracle",
    "x": 0.894,
    "y": 0.381
  },
  {
    "id": "mssql",
    "label": "mssql",
    "x": 0.779,
    "y": 0.342
  },
  {
    "id": "cms",
    "label": "cms",
    "x": 0.774,
    "y": 0.169
  },
  {
    "id": "wordpress",
    "label": "wordpress",
    "x": 0.873,
    "y": 0.105
  },
  {
    "id": "os",
    "label": "os",
    "x": 0.389,
    "y": 0.776
  },
  {
    "id": "linux",
    "label": "linux",
    "x": 0.319,
    "y": 0.896
  },
  {
    "id": "networking",
    "label": "networking",
    "x": 0.222,
    "y": 0.826
  },
  {
    "id": "internet",
    "label": "internet",
    "x": 0.222,
    "y": 0.675
  },
  {
    "id": "cybersecurity",
    "label": "cybersecurity",
    "x": 0.342,
    "y": 0.617
  },
  {
    "id": "c",
    "label": "c",
    "x": 0.79,
    "y": 0.763
  },
  {
    "id": "cpp",
    "label": "cpp",
    "x": 0.758,
    "y": 0.864
  },
  {
    "id": "stl",
    "label": "stl",
    "x": 0.714,
    "y": 0.898
  },
  {
    "id": "dsa",
    "label": "dsa",
    "x": 0.645,
    "y": 0.869
  },
  {
    "id": "sad",
    "label": "sad",
    "x": 0.61,
    "y": 0.754
  },
  {
    "id": "problemsolving",
    "label": "problem solving",
    "x": 0.647,
    "y": 0.629
  },
  {
    "id": "coa",
    "label": "coa",
    "x": 0.713,
    "y": 0.602
  },
  {
    "id": "aiml",
    "label": "ai ml",
    "x": 0.77,
    "y": 0.656
  }
];

const EDGES: Array<[string, string]> = [
  [
    "html",
    "css"
  ],
  [
    "html",
    "js"
  ],
  [
    "css",
    "js"
  ],
  [
    "css",
    "web"
  ],
  [
    "js",
    "web"
  ],
  [
    "js",
    "ajax"
  ],
  [
    "web",
    "ajax"
  ],
  [
    "ajax",
    "json"
  ],
  [
    "ajax",
    "html"
  ],
  [
    "json",
    "html"
  ],
  [
    "json",
    "css"
  ],
  [
    "php",
    "java"
  ],
  [
    "php",
    "c#"
  ],
  [
    "java",
    "c#"
  ],
  [
    "java",
    "net"
  ],
  [
    "c#",
    "net"
  ],
  [
    "c#",
    "asp"
  ],
  [
    "net",
    "asp"
  ],
  [
    "asp",
    "j2ee"
  ],
  [
    "j2ee",
    "python"
  ],
  [
    "python",
    "kotlin"
  ],
  [
    "kotlin",
    "php"
  ],
  [
    "mysql",
    "rdbmsoracle"
  ],
  [
    "mysql",
    "mssql"
  ],
  [
    "rdbmsoracle",
    "mssql"
  ],
  [
    "mssql",
    "cms"
  ],
  [
    "mssql",
    "wordpress"
  ],
  [
    "cms",
    "wordpress"
  ],
  [
    "wordpress",
    "mysql"
  ],
  [
    "os",
    "linux"
  ],
  [
    "os",
    "networking"
  ],
  [
    "linux",
    "networking"
  ],
  [
    "linux",
    "internet"
  ],
  [
    "networking",
    "internet"
  ],
  [
    "networking",
    "cybersecurity"
  ],
  [
    "internet",
    "cybersecurity"
  ],
  [
    "internet",
    "os"
  ],
  [
    "cybersecurity",
    "os"
  ],
  [
    "c",
    "cpp"
  ],
  [
    "cpp",
    "stl"
  ],
  [
    "cpp",
    "dsa"
  ],
  [
    "stl",
    "dsa"
  ],
  [
    "dsa",
    "sad"
  ],
  [
    "sad",
    "problemsolving"
  ],
  [
    "problemsolving",
    "coa"
  ],
  [
    "problemsolving",
    "aiml"
  ],
  [
    "coa",
    "aiml"
  ],
  [
    "coa",
    "c"
  ],
  [
    "aiml",
    "c"
  ],
  [
    "aiml",
    "cpp"
  ],
  [
    "js",
    "php"
  ],
  [
    "php",
    "mysql"
  ],
  [
    "java",
    "rdbmsoracle"
  ],
  [
    "c",
    "os"
  ],
  [
    "python",
    "aiml"
  ],
  [
    "web",
    "internet"
  ]
];

export function SkillsSection({ className }: { className?: string }) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [hoveredNodeId, setHoveredNodeId] = React.useState<string | null>(null);

  const isNeighbor = (nodeId: string, hoveredId: string) => {
    return EDGES.some(
      ([a, b]) =>
        (a === nodeId && b === hoveredId) || (b === nodeId && a === hoveredId)
    );
  };

  return (
    <Section id="skills" className={cn(className)}>
      <motion.div {...fadeInUp} className="devos-glass rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Skills Map</Eyebrow>
            <H2>A system network, not progress bars.</H2>
          </div>
          <div className="text-xs font-mono text-devos-muted">
            hover nodes (desktop)
          </div>
        </div>

        {/* Desktop network */}
        <div className="mt-6 hidden md:block">
          <div className="relative overflow-hidden rounded-3xl border border-devos-border bg-black/20">
            <svg
              viewBox="0 0 1000 520"
              className="h-[420px] w-full"
              aria-label="Skills network map"
            >
              <defs>
                <radialGradient id="glow" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="rgba(34,211,238,0.38)" />
                  <stop offset="100%" stopColor="rgba(34,211,238,0)" />
                </radialGradient>
                <radialGradient id="glow-active" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="rgba(34,211,238,0.7)" />
                  <stop offset="100%" stopColor="rgba(34,211,238,0)" />
                </radialGradient>
              </defs>

              {EDGES.map(([a, b]) => {
                const na = NODES.find((n) => n.id === a)!;
                const nb = NODES.find((n) => n.id === b)!;

                const isHighlighted = hoveredNodeId === a || hoveredNodeId === b;
                const isDimmed = hoveredNodeId !== null && !isHighlighted;

                return (
                  <line
                    key={`${a}-${b}`}
                    x1={na.x * 1000}
                    y1={na.y * 520}
                    x2={nb.x * 1000}
                    y2={nb.y * 520}
                    stroke={
                      isHighlighted
                        ? "rgba(34,211,238,0.6)"
                        : isDimmed
                        ? "rgba(255,255,255,0.02)"
                        : "rgba(255,255,255,0.10)"
                    }
                    strokeWidth={isHighlighted ? "3" : "2"}
                    className="transition-all duration-300"
                  />
                );
              })}

              {NODES.map((n) => {
                const isHovered = hoveredNodeId === n.id;
                const isConnected = hoveredNodeId ? isNeighbor(n.id, hoveredNodeId) : false;
                const isDimmed = hoveredNodeId !== null && !isHovered && !isConnected;

                return (
                  <g
                    key={n.id}
                    className="cursor-pointer select-none"
                    onMouseEnter={() => setHoveredNodeId(n.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                  >
                    <circle
                      cx={n.x * 1000}
                      cy={n.y * 520}
                      r={isHovered ? 44 : 34}
                      fill={isHovered ? "url(#glow-active)" : "url(#glow)"}
                      className="transition-all duration-300"
                    />
                    <circle
                      cx={n.x * 1000}
                      cy={n.y * 520}
                      r={isHovered ? 12 : 10}
                      fill={
                        isHovered
                          ? "rgba(34,211,238,1)"
                          : isDimmed
                          ? "rgba(56,189,248,0.2)"
                          : "rgba(56,189,248,0.95)"
                      }
                      className="transition-all duration-300"
                    />
                    <circle
                      cx={n.x * 1000}
                      cy={n.y * 520}
                      r={isHovered ? 24 : 20}
                      fill={
                        isHovered
                          ? "rgba(34,211,238,0.25)"
                          : isDimmed
                          ? "rgba(56,189,248,0.02)"
                          : "rgba(56,189,248,0.10)"
                      }
                      stroke={
                        isHovered
                          ? "rgba(34,211,238,0.6)"
                          : isDimmed
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(255,255,255,0.14)"
                      }
                      className="transition-all duration-300"
                    />
                    <text
                      x={n.x * 1000}
                      y={n.y * 520 + 48}
                      textAnchor="middle"
                      fill={
                        isHovered
                          ? "rgba(255,255,255,1)"
                          : isDimmed
                          ? "rgba(226,232,240,0.2)"
                          : "rgba(226,232,240,0.9)"
                      }
                      fontWeight={isHovered ? "bold" : "normal"}
                      fontSize="14"
                      fontFamily="var(--font-jetbrains-mono)"
                      className="transition-all duration-300"
                    >
                      {n.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_10%,rgba(56,189,248,0.12)_0%,transparent_60%)]" />
          </div>
        </div>

        {/* Mobile fallback */}
        <div className="mt-6 grid gap-3 md:hidden">
          {NODES.map((n, i) => (
            <div
              key={n.id}
              className={cn(
                "rounded-2xl border border-devos-border bg-white/3 p-4",
                !isExpanded && i >= 3 && "hidden"
              )}
            >
              <div className="text-sm font-semibold text-devos-text">{n.label}</div>
              <div className="mt-1 text-xs text-devos-muted">
                Node online • linked to core system graph
              </div>
            </div>
          ))}
        </div>

        {/* Expand / Show More Button for Mobile only */}
        <div className="mt-6 flex justify-center md:hidden">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 rounded-xl border border-devos-border bg-white/3 px-5 py-2.5 text-xs font-semibold text-devos-text transition hover:bg-white/6 hover:border-devos-accent/30 active:scale-[0.98]"
          >
            {isExpanded ? "Show Less" : "Show All Skills"}
          </button>
        </div>
      </motion.div>
    </Section>
  );
}

