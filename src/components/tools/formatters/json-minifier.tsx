"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function JsonMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
      toast.success("Minified!");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label>Input JSON</Label>
        <Textarea
          placeholder="Paste JSON here…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="font-mono text-sm min-h-[240px]"
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={minify}>Minify</Button>
        <Button variant="outline" onClick={() => { setInput(""); setOutput(""); setError(""); }}>Clear</Button>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {output && (
        <div className="space-y-1">
          <Label>Minified output</Label>
          <Textarea readOnly value={output} className="font-mono text-sm min-h-[120px] bg-muted break-all" />
          <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied!"); }}>
            Copy
          </Button>
        </div>
      )}
    </div>
  );
}
