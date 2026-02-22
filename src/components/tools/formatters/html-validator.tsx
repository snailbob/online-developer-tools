"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function HtmlValidator() {
  const [input, setInput] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [valid, setValid] = useState<boolean | null>(null);

  const validate = () => {
    if (typeof window === "undefined") return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, "text/html");
    const parserErrors = doc.querySelectorAll("parsererror");
    const found: string[] = [];
    parserErrors.forEach((e) => found.push(e.textContent ?? "Parse error"));

    // Additional basic checks
    const unclosed = (input.match(/<[a-z][^/]*?>/gi) || []).length;
    const closed = (input.match(/<\/[a-z]+>/gi) || []).length;
    if (unclosed !== closed) {
      found.push(`Warning: ${unclosed} opening tag(s) vs ${closed} closing tag(s) — possible unclosed elements`);
    }

    setErrors(found);
    setValid(found.length === 0);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label>HTML to validate</Label>
        <Textarea
          placeholder="<!DOCTYPE html><html><head>…</head><body>…</body></html>"
          value={input}
          onChange={(e) => { setInput(e.target.value); setValid(null); setErrors([]); }}
          className="font-mono text-sm min-h-[320px]"
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={validate}>Validate</Button>
        <Button variant="outline" onClick={() => { setInput(""); setValid(null); setErrors([]); }}>Clear</Button>
      </div>
      {valid !== null && (
        <div className={`rounded-md border p-3 text-sm ${valid ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300" : "border-destructive bg-destructive/10 text-destructive"}`}>
          {valid ? "No structural errors detected ✓" : errors.map((e, i) => <p key={i}>{e}</p>)}
        </div>
      )}
    </div>
  );
}
