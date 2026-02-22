"use client";

import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/copy-button";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((v) => Math.min(255, Math.max(0, v)).toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number) {
  const r1 = r / 255, g1 = g / 255, b1 = b / 255;
  const max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r1) h = ((g1 - b1) / d + (g1 < b1 ? 6 : 0)) / 6;
  else if (max === g1) h = ((b1 - r1) / d + 2) / 6;
  else h = ((r1 - g1) / d + 4) / 6;
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number) {
  const s1 = s / 100, l1 = l / 100;
  const c = (1 - Math.abs(2 * l1 - 1)) * s1;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l1 - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
}

export default function ColorConverter() {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState(hexToRgb("#3b82f6"));
  const [hsl, setHsl] = useState(rgbToHsl(59, 130, 246));

  const fromHex = useCallback((val: string) => {
    setHex(val);
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      const r = hexToRgb(val);
      setRgb(r);
      setHsl(rgbToHsl(r.r, r.g, r.b));
    }
  }, []);

  const fromRgb = useCallback((r: number, g: number, b: number) => {
    setRgb({ r, g, b });
    const h = rgbToHex(r, g, b);
    setHex(h);
    setHsl(rgbToHsl(r, g, b));
  }, []);

  const fromHsl = useCallback((h: number, s: number, l: number) => {
    setHsl({ h, s, l });
    const r = hslToRgb(h, s, l);
    setRgb(r);
    setHex(rgbToHex(r.r, r.g, r.b));
  }, []);

  const hexStr = hex;
  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  return (
    <div className="space-y-6">
      {/* Color preview */}
      <div className="flex items-center gap-4">
        <div className="h-20 w-40 rounded-xl border shadow-inner" style={{ background: hex }} />
        <div className="space-y-1 text-sm font-mono">
          <div className="flex items-center gap-2"><span className="text-muted-foreground w-8">HEX</span><span className="font-semibold">{hex.toUpperCase()}</span></div>
          <div className="flex items-center gap-2"><span className="text-muted-foreground w-8">RGB</span><span className="font-semibold">{rgbStr}</span></div>
          <div className="flex items-center gap-2"><span className="text-muted-foreground w-8">HSL</span><span className="font-semibold">{hslStr}</span></div>
        </div>
      </div>

      {/* HEX */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>HEX</Label>
          <CopyButton text={hexStr} />
        </div>
        <div className="flex items-center gap-3">
          <input type="color" value={hex} onChange={(e) => fromHex(e.target.value)} className="h-10 w-14 rounded border cursor-pointer" />
          <Input className="font-mono w-36" value={hex} onChange={(e) => fromHex(e.target.value)} placeholder="#3b82f6" />
        </div>
      </div>

      {/* RGB */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>RGB</Label>
          <CopyButton text={rgbStr} />
        </div>
        <div className="flex gap-2">
          {(["r", "g", "b"] as const).map((ch) => (
            <div key={ch} className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground uppercase font-mono w-3">{ch}</span>
              <Input
                type="number"
                min={0}
                max={255}
                className="w-20 font-mono"
                value={rgb[ch]}
                onChange={(e) => {
                  const v = parseInt(e.target.value) || 0;
                  fromRgb(ch === "r" ? v : rgb.r, ch === "g" ? v : rgb.g, ch === "b" ? v : rgb.b);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* HSL */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>HSL</Label>
          <CopyButton text={hslStr} />
        </div>
        <div className="flex gap-2">
          {[{ key: "h", max: 360, label: "H" }, { key: "s", max: 100, label: "S%" }, { key: "l", max: 100, label: "L%" }].map(({ key, max, label }) => (
            <div key={key} className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground font-mono w-5">{label}</span>
              <Input
                type="number"
                min={0}
                max={max}
                className="w-20 font-mono"
                value={hsl[key as keyof typeof hsl]}
                onChange={(e) => {
                  const v = parseInt(e.target.value) || 0;
                  fromHsl(key === "h" ? v : hsl.h, key === "s" ? v : hsl.s, key === "l" ? v : hsl.l);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
