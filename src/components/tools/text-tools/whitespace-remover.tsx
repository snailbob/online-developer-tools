"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function WhitespaceRemover() {
  const [input, setInput] = useState("");
  const [trimEnd, setTrimEnd] = useState(true);
  const [trimStart, setTrimStart] = useState(true);
  const [removeBlankLines, setRemoveBlankLines] = useState(false);
  const [collapseSpaces, setCollapseSpaces] = useState(false);

  const process = () => {
    let lines = input.split("\n");
    lines = lines.map((line) => {
      let l = line;
      if (trimStart) l = l.replace(/^[\t ]+/, "");
      if (trimEnd) l = l.replace(/[\t ]+$/, "");
      if (collapseSpaces) l = l.replace(/[ \t]{2,}/g, " ");
      return l;
    });
    if (removeBlankLines) lines = lines.filter((l) => l.trim().length > 0);
    return lines.join("\n");
  };

  const output = process();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Switch id="ts" checked={trimStart} onCheckedChange={setTrimStart} />
          <Label htmlFor="ts">Trim leading whitespace</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="te" checked={trimEnd} onCheckedChange={setTrimEnd} />
          <Label htmlFor="te">Trim trailing whitespace</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="rbl" checked={removeBlankLines} onCheckedChange={setRemoveBlankLines} />
          <Label htmlFor="rbl">Remove blank lines</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="cs" checked={collapseSpaces} onCheckedChange={setCollapseSpaces} />
          <Label htmlFor="cs">Collapse multiple spaces</Label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Input</Label>
          <Textarea
            placeholder="Paste text here…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[320px] font-mono text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label>Output</Label>
          <Textarea
            readOnly
            value={output}
            className="min-h-[320px] font-mono text-sm bg-muted"
          />
        </div>
      </div>
      <Button variant="outline" onClick={() => setInput("")}>Clear</Button>
    </div>
  );
}
