"use client";

import { useState, useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/copy-button";

function tokenize(input: string): string[] {
  return input
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .split(/[\s_\-./\\]+/)
    .map((w) => w.toLowerCase())
    .filter(Boolean);
}

const CONVERSIONS: { label: string; id: string; convert: (words: string[]) => string }[] = [
  { id: "camel", label: "camelCase", convert: (w) => w.map((t, i) => i === 0 ? t : t[0].toUpperCase() + t.slice(1)).join("") },
  { id: "pascal", label: "PascalCase", convert: (w) => w.map((t) => t[0].toUpperCase() + t.slice(1)).join("") },
  { id: "snake", label: "snake_case", convert: (w) => w.join("_") },
  { id: "screaming", label: "SCREAMING_SNAKE", convert: (w) => w.join("_").toUpperCase() },
  { id: "kebab", label: "kebab-case", convert: (w) => w.join("-") },
  { id: "title", label: "Title Case", convert: (w) => w.map((t) => t[0].toUpperCase() + t.slice(1)).join(" ") },
  { id: "upper", label: "UPPER CASE", convert: (w) => w.join(" ").toUpperCase() },
  { id: "lower", label: "lower case", convert: (w) => w.join(" ") },
  { id: "dot", label: "dot.case", convert: (w) => w.join(".") },
  { id: "path", label: "path/case", convert: (w) => w.join("/") },
];

export default function CaseConverter() {
  const [input, setInput] = useState("hello world example");

  const words = useMemo(() => tokenize(input), [input]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Input Text</Label>
        <Textarea
          className="h-24 resize-none"
          placeholder="Enter text in any case..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CONVERSIONS.map((conv) => {
          const result = words.length ? conv.convert(words) : "";
          return (
            <div key={conv.id} className="rounded-lg border bg-card p-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">{conv.label}</span>
                <CopyButton text={result} label="" className="h-6 w-6 p-0" />
              </div>
              <p className="font-mono text-sm break-all">{result || <span className="text-muted-foreground italic">—</span>}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
