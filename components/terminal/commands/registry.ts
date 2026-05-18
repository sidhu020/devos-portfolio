import type { TerminalCommand } from "@/types/terminal";

import { aboutCommand } from "./about";
import { achievementsCommand } from "./achievements";
import { clearCommand } from "./clear";
import { contactCommand } from "./contact";
import { helpCommand } from "./help";
import { matrixCommand } from "./matrix";
import { neofetchCommand } from "./neofetch";
import { projectsCommand } from "./projects";
import { resumeCommand } from "./resume";
import { hireCommand } from "./hire";
import { skillsCommand } from "./skills";
import { sudoHireMeCommand } from "./sudo-hire-me";
import { systemCommand } from "./system";
import { whoamiCommand } from "./whoami";

export function createCommandRegistry() {
  const registry = new Map<string, TerminalCommand>();

  const add = (cmd: TerminalCommand) => registry.set(cmd.name, cmd);

  add(aboutCommand);
  add(achievementsCommand);
  add(clearCommand);
  add(contactCommand);
  add(hireCommand);
  add(matrixCommand);
  add(neofetchCommand);
  add(projectsCommand);
  add(resumeCommand);
  add(skillsCommand);
  add(sudoHireMeCommand);
  add(systemCommand);
  add(whoamiCommand);

  add(
    helpCommand(() =>
      [...registry.values()]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((c) => ({ name: c.name, description: c.description, hidden: c.hidden })),
    ),
  );

  return {
    get: (name: string) => registry.get(name),
    list: () => [...registry.values()].sort((a, b) => a.name.localeCompare(b.name)),
    names: () =>
      [...registry.values()]
        .filter((c) => !c.hidden)
        .map((c) => c.name)
        .sort(),
  } as const;
}
