"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/copy-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const JUSTIFY_OPTIONS = ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"];
const ALIGN_OPTIONS = ["flex-start", "flex-end", "center", "stretch", "baseline"];
const DIRECTION_OPTIONS = ["row", "row-reverse", "column", "column-reverse"];
const WRAP_OPTIONS = ["nowrap", "wrap", "wrap-reverse"];

export default function FlexboxGenerator() {
  const [direction, setDirection] = useState("row");
  const [justify, setJustify] = useState("flex-start");
  const [align, setAlign] = useState("stretch");
  const [wrap, setWrap] = useState("nowrap");
  const [gap, setGap] = useState("8");
  const [inline, setInline] = useState(false);
  const [itemCount, setItemCount] = useState(4);

  const css = `.container {
  display: ${inline ? "inline-flex" : "flex"};
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
  flex-wrap: ${wrap};
  gap: ${gap}px;
}`;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>flex-direction</Label>
          <Select value={direction} onValueChange={setDirection}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{DIRECTION_OPTIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>justify-content</Label>
          <Select value={justify} onValueChange={setJustify}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{JUSTIFY_OPTIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>align-items</Label>
          <Select value={align} onValueChange={setAlign}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{ALIGN_OPTIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>flex-wrap</Label>
          <Select value={wrap} onValueChange={setWrap}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{WRAP_OPTIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>gap (px)</Label>
          <Input type="number" min={0} value={gap} onChange={(e) => setGap(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Items</Label>
          <Input type="number" min={1} max={12} value={itemCount} onChange={(e) => setItemCount(Number(e.target.value))} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Switch id="inline-flex" checked={inline} onCheckedChange={setInline} />
        <Label htmlFor="inline-flex">inline-flex</Label>
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <Label>Preview</Label>
        <div
          className="rounded-lg border bg-muted/20 min-h-[160px] p-4"
          style={{
            display: inline ? "inline-flex" : "flex",
            flexDirection: direction as React.CSSProperties["flexDirection"],
            justifyContent: justify,
            alignItems: align,
            flexWrap: wrap as React.CSSProperties["flexWrap"],
            gap: `${gap}px`,
            width: "100%",
          }}
        >
          {Array.from({ length: itemCount }, (_, i) => (
            <div key={i} className="flex items-center justify-center rounded bg-primary text-primary-foreground text-sm font-semibold" style={{ minWidth: 48, minHeight: 48, padding: "8px 12px" }}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* CSS Output */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Generated CSS</Label>
          <CopyButton text={css} />
        </div>
        <pre className="rounded-md border bg-muted/30 p-4 text-sm font-mono overflow-auto">{css}</pre>
      </div>
    </div>
  );
}
