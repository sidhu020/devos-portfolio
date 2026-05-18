export type TerminalLineKind =
  | "system"
  | "input"
  | "output"
  | "error"
  | "success"
  | "warning"
  | "accent"
  | "ascii";

export type TerminalLine = {
  id: string;
  kind: TerminalLineKind;
  text: string;
  timestamp: number;
};

export type CommandContext = {
  now: () => number;
  clear: () => void;
  /** Unlock an achievement by ID. Returns achievement info if newly unlocked. */
  unlockAchievement: (id: string) => { title: string; icon: string } | null;
  /** Track command usage for achievement counting */
  trackCommand: (name: string) => void;
};

export type SimulatedLine = {
  text: string;
  kind?: Exclude<TerminalLineKind, "input">;
  delayMs?: number;
};

export type CommandResult =
  | { type: "lines"; lines: string[]; kind?: Exclude<TerminalLineKind, "input"> }
  | { type: "clear" }
  | { type: "simulated"; lines: SimulatedLine[] };

export type TerminalCommand = {
  name: string;
  description: string;
  usage?: string;
  hidden?: boolean;
  execute: (args: string[], ctx: CommandContext) => CommandResult | Promise<CommandResult>;
};
