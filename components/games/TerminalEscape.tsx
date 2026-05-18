"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";

type Line = {
  text: string;
  type: "system" | "input" | "error" | "success";
};

export function TerminalEscape() {
  const [history, setHistory] = React.useState<Line[]>([
    { text: "=== CONTAINER ESCAPE v1.0.4 ===", type: "system" },
    { text: "Security override engaged. Escape containment to unlock achievement.", type: "system" },
    { text: "Type 'help' to check available commands.", type: "system" },
  ]);
  const [input, setInput] = React.useState("");
  const [solved, setSolved] = React.useState(false);
  const terminalEndRef = React.useRef<HTMLDivElement | null>(null);

  // Scroll to bottom
  React.useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmdStr = input.trim();
    if (!cmdStr) return;

    const newHistory = [...history, { text: `escape@local:~$ ${cmdStr}`, type: "input" as const }];
    const parts = cmdStr.split(" ");
    const cmd = parts[0].toLowerCase();
    const arg = parts[1];

    let output: Line[] = [];

    switch (cmd) {
      case "help":
        output = [
          { text: "Available commands:", type: "system" },
          { text: "  ls           - List files in current container", type: "system" },
          { text: "  cat <file>   - Display contents of a text file", type: "system" },
          { text: "  decrypt <n>  - Decrypt security key using a decimal value", type: "system" },
          { text: "  unlock 🔑    - Override master lock using credential", type: "system" },
          { text: "  clear        - Clear game screen", type: "system" },
        ];
        break;

      case "ls":
        output = [
          { text: "note.txt    key.enc    security_door.cfg", type: "system" },
        ];
        break;

      case "cat":
        if (arg === "note.txt") {
          output = [
            { text: "LOG ENTRY #84: Containment locked down.", type: "system" },
            { text: "Override code is the decimal equivalent of binary '10101010'.", type: "system" },
            { text: "Translate it and run: decrypt <decimal>", type: "system" },
          ];
        } else if (arg === "key.enc") {
          output = [
            { text: "Error: File encrypted. Access denied.", type: "error" },
          ];
        } else if (arg === "security_door.cfg") {
          output = [
            { text: "door_status = LOCKED", type: "system" },
            { text: "required_credential = MASTER_KEY", type: "system" },
          ];
        } else {
          output = [
            { text: `cat: ${arg || "file"}: No such file or directory`, type: "error" },
          ];
        }
        break;

      case "decrypt":
        if (arg === "170") {
          output = [
            { text: "Decryption Successful! Key decrypted in memory.", type: "success" },
            { text: "Master credential obtained: D3V0S_P455", type: "success" },
            { text: "To unlock door, run: unlock D3V0S_P455", type: "system" },
          ];
        } else {
          output = [
            { text: "Decryption Failed: Invalid decimal override value.", type: "error" },
            { text: "Hint: Try translating binary '10101010' (128 + 32 + 8 + 2).", type: "system" },
          ];
        }
        break;

      case "unlock":
        if (arg === "D3V0S_P455") {
          setSolved(true);
          output = [
            { text: "Access granted! Overriding safety clamp...", type: "success" },
            { text: "Security door: OPEN", type: "success" },
            { text: "=== SOLVED! CONGRATULATIONS! ===", type: "success" },
          ];
        } else {
          output = [
            { text: `Access denied. Incorrect security token: '${arg || ""}'`, type: "error" },
          ];
        }
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        output = [
          { text: `escape-cli: command not found: ${cmd}`, type: "error" },
        ];
    }

    setHistory([...newHistory, ...output]);
    setInput("");
  };

  const reset = () => {
    setHistory([
      { text: "=== CONTAINER ESCAPE v1.0.4 ===", type: "system" },
      { text: "Security override engaged. Escape containment to unlock achievement.", type: "system" },
      { text: "Type 'help' to check available commands.", type: "system" },
    ]);
    setInput("");
    setSolved(false);
  };

  return (
    <div className="flex flex-col gap-4 text-devos-text font-mono text-xs">
      <div className="flex items-center justify-between border-b border-devos-border pb-3">
        <span>CLI Containment Lab</span>
        {solved && (
          <span className="text-emerald-400 font-bold uppercase animate-pulse">Unlocked!</span>
        )}
      </div>

      <div className="h-[200px] overflow-y-auto rounded-2xl border border-devos-border bg-black/40 p-4 space-y-2 select-text scrollbar-thin">
        {history.map((line, idx) => (
          <div
            key={idx}
            className={
              line.type === "input"
                ? "text-devos-text"
                : line.type === "error"
                ? "text-red-400"
                : line.type === "success"
                ? "text-emerald-400 font-bold"
                : "text-devos-muted"
            }
          >
            {line.text}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      <form onSubmit={handleCommand} className="flex gap-2">
        <span className="text-devos-cyan self-center select-none">escape:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={solved ? "Door unlocked..." : "Type command here..."}
          disabled={solved}
          className="flex-1 bg-transparent border-b border-devos-border/50 py-1 outline-none text-devos-text focus:border-devos-cyan transition"
          autoFocus
          autoComplete="off"
          autoCapitalize="none"
        />
      </form>

      <div className="flex justify-between items-center text-[10px]">
        <span>Objective: find code and unlock containment door</span>
        <Button variant="secondary" size="sm" onClick={reset} className="font-mono h-7 text-[10px]">
          Reset CLI
        </Button>
      </div>
    </div>
  );
}
