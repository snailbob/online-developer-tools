"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { CopyButton } from "@/components/copy-button";
import { Switch } from "@/components/ui/switch";

export default function BoxShadowGenerator() {
  const [x, setX] = useState(4);
  const [y, setY] = useState(8);
  const [blur, setBlur] = useState(16);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#00000033");
  const [inset, setInset] = useState(false);

  const shadow = `${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px ${color}`;
  const css = `box-shadow: ${shadow};`;

  const SliderRow = ({ label, value, onChange, min, max }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number }) => (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label>{label}</Label>
        <span className="text-sm text-muted-foreground font-mono">{value}px</span>
      </div>
      <Slider min={min} max={max} value={[value]} onValueChange={([v]) => onChange(v)} />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-5">
          <SliderRow label="Offset X" value={x} onChange={setX} min={-50} max={50} />
          <SliderRow label="Offset Y" value={y} onChange={setY} min={-50} max={50} />
          <SliderRow label="Blur Radius" value={blur} onChange={setBlur} min={0} max={100} />
          <SliderRow label="Spread Radius" value={spread} onChange={setSpread} min={-50} max={50} />

          <div className="space-y-2">
            <Label>Shadow Color</Label>
            <div className="flex items-center gap-3">
              <input type="color" value={color.slice(0, 7)} onChange={(e) => setColor(e.target.value + color.slice(7))} className="h-9 w-14 rounded border cursor-pointer" />
              <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="flex-1 rounded-md border bg-background px-3 py-2 text-sm font-mono" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Switch id="inset" checked={inset} onCheckedChange={setInset} />
            <Label htmlFor="inset">Inset shadow</Label>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-2">
          <Label>Preview</Label>
          <div className="flex items-center justify-center rounded-lg border bg-muted/20 h-48">
            <div
              className="h-24 w-40 rounded-lg bg-background"
              style={{ boxShadow: shadow }}
            />
          </div>
        </div>
      </div>

      {/* CSS Output */}
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
