"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const CRON_EXAMPLES = [
  { expr: "* * * * *", desc: "Every minute" },
  { expr: "0 * * * *", desc: "Every hour" },
  { expr: "0 0 * * *", desc: "Every day at midnight" },
  { expr: "0 9 * * 1-5", desc: "Weekdays at 9 AM" },
  { expr: "0 0 1 * *", desc: "First day of every month" },
  { expr: "*/5 * * * *", desc: "Every 5 minutes" },
];

function parseCron(expr: string): { description: string; next: string[]; error?: string } {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return { description: "", next: [], error: "Cron expression must have exactly 5 fields (minute hour day month weekday)." };

  const FIELDS = ["minute", "hour", "day of month", "month", "day of week"];
  const RANGES = [[0, 59], [0, 23], [1, 31], [1, 12], [0, 6]];
  const MONTH_NAMES = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const descs: string[] = [];
  for (let i = 0; i < 5; i++) {
    const p = parts[i];
    const [min, max] = RANGES[i];
    if (p === "*") descs.push(`every ${FIELDS[i]}`);
    else if (p.startsWith("*/")) {
      const step = parseInt(p.slice(2));
      descs.push(`every ${step} ${FIELDS[i]}${step > 1 ? "s" : ""}`);
    } else if (p.includes("-")) {
      const [a, b] = p.split("-").map(Number);
      if (i === 4) descs.push(`${DAY_NAMES[a]} through ${DAY_NAMES[b]}`);
      else if (i === 3) descs.push(`${MONTH_NAMES[a]} through ${MONTH_NAMES[b]}`);
      else descs.push(`${FIELDS[i]} ${a} through ${b}`);
    } else if (p.includes(",")) {
      const vals = p.split(",");
      if (i === 4) descs.push(`on ${vals.map((v) => DAY_NAMES[parseInt(v)]).join(", ")}`);
      else descs.push(`at ${FIELDS[i]}s ${vals.join(", ")}`);
    } else {
      const num = parseInt(p);
      if (isNaN(num) || num < min || num > max) return { description: "", next: [], error: `Invalid value "${p}" for ${FIELDS[i]} (valid: ${min}-${max}).` };
      if (i === 0) descs.push(`at minute ${num}`);
      else if (i === 1) descs.push(`at ${num}:00`);
      else if (i === 2) descs.push(`on day ${num}`);
      else if (i === 3) descs.push(`in ${MONTH_NAMES[num]}`);
      else if (i === 4) descs.push(`on ${DAY_NAMES[num]}`);
    }
  }

  // Compute next 5 run times (approximate)
  const next: string[] = [];
  const now = new Date();
  now.setSeconds(0, 0);
  let dt = new Date(now.getTime() + 60000);
  let safety = 0;
  while (next.length < 5 && safety++ < 100000) {
    const m = dt.getMinutes(), h = dt.getHours(), day = dt.getDate(), mo = dt.getMonth() + 1, dow = dt.getDay();
    if (matchField(parts[0], m, 0, 59) && matchField(parts[1], h, 0, 23) && matchField(parts[2], day, 1, 31) && matchField(parts[3], mo, 1, 12) && matchField(parts[4], dow, 0, 6)) {
      next.push(dt.toLocaleString());
    }
    dt = new Date(dt.getTime() + 60000);
  }

  return { description: descs.join(", "), next };
}

function matchField(field: string, value: number, min: number, max: number): boolean {
  if (field === "*") return true;
  if (field.startsWith("*/")) return (value - min) % parseInt(field.slice(2)) === 0;
  if (field.includes("-")) { const [a, b] = field.split("-").map(Number); return value >= a && value <= b; }
  if (field.includes(",")) return field.split(",").map(Number).includes(value);
  return parseInt(field) === value;
}

export default function CronParser() {
  const [expr, setExpr] = useState("0 9 * * 1-5");
  const result = useMemo(() => parseCron(expr), [expr]);

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label>Cron Expression</Label>
        <Input
          className="font-mono text-base max-w-sm"
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          placeholder="* * * * *"
        />
        <p className="text-xs text-muted-foreground">Format: minute hour day-of-month month day-of-week</p>
      </div>

      {result.error ? (
        <p className="text-sm text-destructive font-mono">{result.error}</p>
      ) : (
        <>
          <div className="rounded-md border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground mb-1">Runs</p>
            <p className="font-semibold capitalize">{result.description}</p>
          </div>
          {result.next.length > 0 && (
            <div className="space-y-2">
              <Label>Next 5 Run Times</Label>
              <div className="divide-y rounded-md border">
                {result.next.map((t, i) => (
                  <div key={i} className="px-4 py-2 flex items-center gap-3 text-sm">
                    <Badge variant="secondary" className="font-mono">#{i + 1}</Badge>
                    <span className="font-mono">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="space-y-2">
        <Label>Examples</Label>
        <div className="flex flex-wrap gap-2">
          {CRON_EXAMPLES.map((ex) => (
            <button
              key={ex.expr}
              onClick={() => setExpr(ex.expr)}
              className="rounded-md border bg-muted/50 hover:bg-muted px-3 py-1.5 text-xs font-mono transition-colors text-left"
            >
              <span className="font-semibold">{ex.expr}</span>
              <span className="text-muted-foreground ml-2">– {ex.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
