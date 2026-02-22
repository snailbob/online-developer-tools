"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Stop { color: string; position: number }

export default function GradientBuilder() {
  const [type, setType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState(90);
  const [stops, setStops] = useState<Stop[]>([
    { color: "#3b82f6", position: 0 },
    { color: "#8b5cf6", position: 100 },
  ]);

  const gradientValue = type === "linear"
    ? `linear-gradient(${angle}deg, ${stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`
    : `radial-gradient(circle, ${stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`;

  const css = `background: ${gradientValue};`;

  const updateStop = (i: number, key: keyof Stop, val: string | number) => {
    setStops((prev) => prev.map((s, idx) => idx === i ? { ...s, [key]: val } : s));
  };

  const addStop = () => setStops((prev) => [...prev, { color: "#ec4899", position: 50 }]);
  const removeStop = (i: number) => setStops((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-6">
      <div className="flex gap-4 flex-wrap items-end">
        <div className="space-y-2">
          <Label>Type</Label>
          <Select value={type} onValueChange={(v) => setType(v as "linear" | "radial")}>
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="linear">Linear</SelectItem>
              <SelectItem value="radial">Radial</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {type === "linear" && (
          <div className="space-y-2">
            <Label>Angle ({angle}°)</Label>
            <Input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-36" />
          </div>
        )}
      </div>

      {/* Color stops */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Color Stops</Label>
          <Button size="sm" variant="outline" onClick={addStop}>+ Add Stop</Button>
        </div>
        {stops.map((stop, i) => (
          <div key={i} className="flex items-center gap-3">
            <input type="color" value={stop.color} onChange={(e) => updateStop(i, "color", e.target.value)} className="h-9 w-12 rounded border cursor-pointer shrink-0" />
            <Input className="font-mono w-28" value={stop.color} onChange={(e) => updateStop(i, "color", e.target.value)} />
            <Input type="number" min={0} max={100} className="w-20" value={stop.position} onChange={(e) => updateStop(i, "position", Number(e.target.value))} />
            <span className="text-muted-foreground text-sm">%</span>
            {stops.length > 2 && (
              <Button size="sm" variant="ghost" onClick={() => removeStop(i)} className="text-destructive hover:text-destructive">×</Button>
            )}
          </div>
        ))}
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <Label>Preview</Label>
        <div className="h-28 rounded-xl border" style={{ background: gradientValue }} />
      </div>

      {/* CSS */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>CSS</Label>
          <CopyButton text={css} />
        </div>
        <pre className="rounded-md border bg-muted/30 p-3 text-sm font-mono">{css}</pre>
      </div>
    </div>
  );
}
