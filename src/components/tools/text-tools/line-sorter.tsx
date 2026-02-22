"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function LineSorter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [caseInsensitive, setCaseInsensitive] = useState(true);
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [addNumbers, setAddNumbers] = useState(false);

  function getLines() {
    return input.split("\n");
  }

  function process(lines: string[]): string[] {
    let result = [...lines];
    if (removeDuplicates) {
      const seen = new Set<string>();
      result = result.filter((l) => {
        const key = caseInsensitive ? l.toLowerCase() : l;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }
    if (addNumbers) {
      result = result.map((l, i) => `${i + 1}. ${l}`);
    }
    return result;
  }

  const sort = () => {
    const lines = getLines();
    lines.sort((a, b) =>
      caseInsensitive ? a.toLowerCase().localeCompare(b.toLowerCase()) : a.localeCompare(b)
    );
    setOutput(process(lines).join("\n"));
  };

  const sortReverse = () => {
    const lines = getLines();
    lines.sort((a, b) =>
      caseInsensitive ? b.toLowerCase().localeCompare(a.toLowerCase()) : b.localeCompare(a)
    );
    setOutput(process(lines).join("\n"));
  };

  const shuffle = () => {
    const lines = getLines();
    for (let i = lines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lines[i], lines[j]] = [lines[j], lines[i]];
    }
    setOutput(process(lines).join("\n"));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Input</Label>
          <Textarea
            placeholder="Paste lines here…"
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
            placeholder="Result appears here…"
            className="min-h-[320px] font-mono text-sm bg-muted"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch id="ci" checked={caseInsensitive} onCheckedChange={setCaseInsensitive} />
          <Label htmlFor="ci">Case-insensitive</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="dup" checked={removeDuplicates} onCheckedChange={setRemoveDuplicates} />
          <Label htmlFor="dup">Remove duplicates</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="nums" checked={addNumbers} onCheckedChange={setAddNumbers} />
          <Label htmlFor="nums">Add line numbers</Label>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={sort}>Sort A → Z</Button>
        <Button variant="outline" onClick={sortReverse}>Sort Z → A</Button>
        <Button variant="outline" onClick={shuffle}>Shuffle</Button>
        <Button variant="outline" onClick={() => { setInput(""); setOutput(""); }}>Clear</Button>
      </div>
    </div>
  );
}
