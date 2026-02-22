"use client";

import { useState } from "react";
import TurndownService from "turndown";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const td = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});

export default function HtmlMarkdown() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convert = () => {
    try {
      setOutput(td.turndown(input));
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Conversion failed");
      setOutput("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>HTML input</Label>
          <Textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setOutput(""); setError(""); }}
            placeholder="<h1>Hello</h1><p>This is <strong>HTML</strong>.</p>"
            className="font-mono text-sm min-h-[320px]"
          />
        </div>
        <div className="space-y-1">
          <Label>Markdown output</Label>
          <Textarea readOnly value={output} className="font-mono text-sm min-h-[320px] bg-muted" />
        </div>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="flex gap-2">
        <Button onClick={convert}>Convert</Button>
        <Button variant="outline" disabled={!output} onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied!"); }}>
          Copy Markdown
        </Button>
        <Button variant="outline" onClick={() => { setInput(""); setOutput(""); }}>Clear</Button>
      </div>
    </div>
  );
}
