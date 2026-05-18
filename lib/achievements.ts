const STORAGE_KEY = "devos.achievements";
const COMMANDS_KEY = "devos.commands.used";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-command", title: "First Command", description: "Ran your first terminal command", icon: "🎯" },
  { id: "terminal-explorer", title: "Terminal Explorer", description: "Used 5 different commands", icon: "🔍" },
  { id: "system-hacker", title: "System Hacker", description: "Found a hidden command", icon: "💀" },
  { id: "hired", title: "Recruited", description: "Ran sudo hire-me", icon: "🤝" },
  { id: "matrix", title: "Red Pill", description: "Entered the matrix", icon: "💊" },
  { id: "palette-pro", title: "Power User", description: "Used the command palette", icon: "⚡" },
  { id: "neofetch", title: "Identity Check", description: "Ran neofetch", icon: "🖥️" },
];

export function getUnlockedIds(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

export function unlockAchievement(id: string): Achievement | null {
  const unlocked = getUnlockedIds();
  if (unlocked.has(id)) return null;
  unlocked.add(id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...unlocked]));
  } catch { /* ignore */ }
  return ACHIEVEMENTS.find((a) => a.id === id) ?? null;
}

export function trackCommandUsage(name: string): number {
  try {
    const raw = localStorage.getItem(COMMANDS_KEY);
    const used: string[] = raw ? JSON.parse(raw) : [];
    if (!used.includes(name)) {
      used.push(name);
      localStorage.setItem(COMMANDS_KEY, JSON.stringify(used));
    }
    return used.length;
  } catch {
    return 0;
  }
}

export function getAllAchievements(): Array<Achievement & { unlocked: boolean }> {
  const unlocked = getUnlockedIds();
  return ACHIEVEMENTS.map((a) => ({ ...a, unlocked: unlocked.has(a.id) }));
}
