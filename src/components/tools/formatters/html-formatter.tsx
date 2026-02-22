"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import { Label } from "@/components/ui/label";

function formatHtml(html: string, indentSize: number = 2): string {
  const indent = " ".repeat(indentSize);
  const voidTags = new Set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"]);
  let formatted = "";
  let level = 0;
  const tokens = html.match(/<[^>]+>|[^<]+/g) || [];
  for (const token of tokens) {
    const trimmed = token.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("</")) {
      level = Math.max(0, level - 1);
      formatted += indent.repeat(level) + trimmed + "\n";
    } else if (trimmed.startsWith("<") && !trimmed.startsWith("<!--")) {
      const tagName = (trimmed.match(/<([a-zA-Z0-9-]+)/) || [])[1]?.toLowerCase();
      formatted += indent.repeat(level) + trimmed + "\n";
      if (tagName && !voidTags.has(tagName) && !trimmed.endsWith("/>")) {
        level++;
      }
    } else {
      formatted += indent.repeat(level) + trimmed + "\n";
    }
  }
  return formatted.trimEnd();
}

export default function HtmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Input HTML</Label>
          <Textarea
            className="h-80 resize-none"
            placeholder="<div><p>Hello</p></div>"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Output</Label>
            <CopyButton text={output} />
          </div>
          <Textarea
            className="h-80 resize-none"
            readOnly
            value={output}
            placeholder="Formatted HTML will appear here..."
          />
        </div>
      </div>
      <div className="flex gap-3 flex-wrap">
        <Button onClick={() => setOutput(formatHtml(input))}>Format</Button>
        <Button variant="outline" onClick={() => setOutput(input.replace(/\s+/g, " ").trim())}>Minify</Button>
        <Button variant="ghost" onClick={() => { setInput(""); setOutput(""); }}>Clear</Button>
      </div>
    </div>
  );
}
