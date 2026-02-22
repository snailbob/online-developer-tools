"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

function generatePassword(length: number, opts: {
  upper: boolean; lower: boolean; digits: boolean; symbols: boolean; excludeAmbiguous: boolean;
}): string {
  let chars = "";
  if (opts.upper) chars += opts.excludeAmbiguous ? "ABCDEFGHJKLMNPQRSTUVWXYZ" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (opts.lower) chars += opts.excludeAmbiguous ? "abcdefghjkmnpqrstuvwxyz" : "abcdefghijklmnopqrstuvwxyz";
  if (opts.digits) chars += opts.excludeAmbiguous ? "23456789" : "0123456789";
  if (opts.symbols) chars += "!@#$%^&*()-_=+[]{}|;:,.<>?";
  if (!chars) return "";
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((n) => chars[n % chars.length]).join("");
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [digits, setDigits] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [password, setPassword] = useState("");
  const [count, setCount] = useState(1);
  const [bulk, setBulk] = useState<string[]>([]);

  const gen = () => {
    const p = generatePassword(length, { upper, lower, digits, symbols, excludeAmbiguous });
    setPassword(p);
    if (count > 1) {
      setBulk(Array.from({ length: count }, () => generatePassword(length, { upper, lower, digits, symbols, excludeAmbiguous })));
    } else {
      setBulk([]);
    }
  };

  return (
    <div className="space-y-5 max-w-lg">
      <div className="space-y-2">
        <Label>Length: <strong>{length}</strong></Label>
        <Slider min={4} max={128} step={1} value={[length]} onValueChange={([v]) => setLength(v)} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Uppercase (A-Z)", val: upper, set: setUpper },
          { label: "Lowercase (a-z)", val: lower, set: setLower },
          { label: "Digits (0-9)", val: digits, set: setDigits },
          { label: "Symbols (!@#…)", val: symbols, set: setSymbols },
          { label: "Exclude ambiguous chars", val: excludeAmbiguous, set: setExcludeAmbiguous },
        ].map(({ label, val, set }) => (
          <div key={label} className="flex items-center gap-2">
            <Switch checked={val} onCheckedChange={set} />
            <Label>{label}</Label>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Label className="shrink-0">Generate</Label>
        <Input
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-20"
        />
        <Label>password(s)</Label>
      </div>

      <Button onClick={gen}>Generate</Button>

      {password && count === 1 && (
        <div className="flex gap-2">
          <Input readOnly value={password} className="font-mono" />
          <Button variant="outline" onClick={() => { navigator.clipboard.writeText(password); toast.success("Copied!"); }}>
            Copy
          </Button>
        </div>
      )}

      {bulk.length > 0 && (
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <Label>Generated passwords</Label>
            <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(bulk.join("\n")); toast.success("All copied!"); }}>
              Copy all
            </Button>
          </div>
          <div className="border rounded-md p-2 font-mono text-sm space-y-1 max-h-64 overflow-y-auto bg-muted">
            {bulk.map((p, i) => <div key={i}>{p}</div>)}
          </div>
        </div>
      )}
    </div>
  );
}
