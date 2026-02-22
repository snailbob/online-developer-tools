"use client";

import { useState, useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import * as diffLib from "diff";

export default function DiffChecker() {
  const [left, setLeft] = useState("Hello World\nThis is line two\nOriginal line three");
  const [right, setRight] = useState("Hello World\nThis is line two, modified\nOriginal line three\nNew line four");

  const diffs = useMemo(() => diffLib.diffLines(left, right), [left, right]);

  const added = diffs.filter((d) => d.added).reduce((s, d) => s + (d.count || 0), 0);
  const removed = diffs.filter((d) => d.removed).reduce((s, d) => s + (d.count || 0), 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Original</Label>
          <Textarea className="h-48 resize-none" value={left} onChange={(e) => setLeft(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Modified</Label>
          <Textarea className="h-48 resize-none" value={right} onChange={(e) => setRight(e.target.value)} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">+{added} added</Badge>
        <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">-{removed} removed</Badge>
      </div>

      <div className="rounded-md border overflow-auto">
        <div className="font-mono text-sm">
          {diffs.map((part, i) => (
            <div
              key={i}
              className={
                part.added
                  ? "bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-200"
                  : part.removed
                  ? "bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-200 line-through"
                  : "bg-background text-foreground"
              }
            >
              {part.value.split("\n").filter((_, li, arr) => li < arr.length - 1 || part.value.endsWith("\n") || li === 0).map((line, li) => (
                <div key={li} className="flex items-start px-3 py-0.5 min-h-[1.5rem]">
                  <span className="w-5 shrink-0 text-muted-foreground select-none">
                    {part.added ? "+" : part.removed ? "−" : " "}
                  </span>
                  <span className="whitespace-pre-wrap break-all">{line}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
