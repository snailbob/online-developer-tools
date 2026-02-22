"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

function minifySQL(sql: string): string {
  return sql
    .replace(/--[^\n]*/g, "")           // single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, "")   // block comments
    .replace(/\s+/g, " ")               // collapse whitespace
    .trim();
}

export default function SqlMinifier() {
  const [input, setInput] = useState("");
  const output = minifySQL(input);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Input SQL</Label>
          <Textarea
            placeholder="SELECT * FROM users WHERE id = 1;"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="font-mono text-sm min-h-[320px]"
          />
        </div>
        <div className="space-y-1">
          <Label>Minified SQL</Label>
          <Textarea readOnly value={output} className="font-mono text-sm min-h-[320px] bg-muted break-all" />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          disabled={!output}
          onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied!"); }}
        >
          Copy
        </Button>
        <Button variant="outline" onClick={() => setInput("")}>Clear</Button>
      </div>
    </div>
  );
}
