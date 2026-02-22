"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

function escapeSql(str: string): string {
  return str.replace(/'/g, "''").replace(/\\/g, "\\\\");
}

function unescapeSql(str: string): string {
  return str.replace(/''/g, "'").replace(/\\\\/g, "\\");
}

export default function SqlEscape() {
  const [input, setInput] = useState("");
  const escaped = escapeSql(input);
  const unescaped = unescapeSql(input);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Label>Input string</Label>
        <Textarea
          placeholder={"It's a dangerous string with \\ backslashes"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="font-mono text-sm min-h-[140px]"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Escaped (for SQL)</Label>
          <Textarea readOnly value={escaped} className="font-mono text-sm min-h-[120px] bg-muted" />
          <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(escaped); toast.success("Copied!"); }}>
            Copy escaped
          </Button>
        </div>
        <div className="space-y-1">
          <Label>Unescaped</Label>
          <Textarea readOnly value={unescaped} className="font-mono text-sm min-h-[120px] bg-muted" />
          <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(unescaped); toast.success("Copied!"); }}>
            Copy unescaped
          </Button>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={() => setInput("")}>Clear</Button>
    </div>
  );
}
