"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import { Label } from "@/components/ui/label";

function formatCss(css: string): string {
  return css
    .replace(/\s*\{\s*/g, " {\n  ")
    .replace(/\s*;\s*/g, ";\n  ")
    .replace(/\s*\}\s*/g, "\n}\n")
    .replace(/\n\s*\n/g, "\n")
    .trim();
}

function minifyCss(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{};:,>~+])\s*/g, "$1")
    .trim();
}

export default function CssFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Input CSS</Label>
          <Textarea
            className="h-80 resize-none"
            placeholder="body{margin:0;padding:0;}"
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
            placeholder="Formatted CSS will appear here..."
          />
        </div>
      </div>
      <div className="flex gap-3 flex-wrap">
        <Button onClick={() => setOutput(formatCss(input))}>Format</Button>
        <Button variant="outline" onClick={() => setOutput(minifyCss(input))}>Minify</Button>
        <Button variant="ghost" onClick={() => { setInput(""); setOutput(""); }}>Clear</Button>
      </div>
    </div>
  );
}
