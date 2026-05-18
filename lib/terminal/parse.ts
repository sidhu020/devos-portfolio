export function tokenizeCommand(input: string) {
  const out: string[] = [];
  let current = "";
  let quote: '"' | "'" | null = null;

  const push = () => {
    if (current.length > 0) out.push(current);
    current = "";
  };

  for (let i = 0; i < input.length; i++) {
    const ch = input[i] ?? "";

    if (quote) {
      if (ch === quote) {
        quote = null;
        continue;
      }
      if (ch === "\\" && i + 1 < input.length) {
        const next = input[i + 1] ?? "";
        // allow escaping quotes and backslash inside quotes
        if (next === quote || next === "\\") {
          current += next;
          i++;
          continue;
        }
      }
      current += ch;
      continue;
    }

    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }

    if (/\s/.test(ch)) {
      push();
      continue;
    }

    current += ch;
  }

  push();

  const [name, ...args] = out;
  return { name: name ?? "", args };
}

