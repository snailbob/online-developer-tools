"use client";

import { useState } from "react";
import { XMLParser, XMLBuilder } from "fast-xml-parser";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function XmlMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const minify = () => {
    try {
      const parser = new XMLParser({ ignoreAttributes: false });
      const builder = new XMLBuilder({ ignoreAttributes: false, suppressEmptyNode: true });
      const parsed = parser.parse(input);
      const minified = builder.build(parsed).replace(/>\s+</g, "><").trim();
      setOutput(minified);
      setError("");
      toast.success("Minified!");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid XML");
      setOutput("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label>Input XML</Label>
        <Textarea
          placeholder="Paste XML here…"
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
