"use client";

import { useState } from "react";
import { js_beautify } from "js-beautify";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function JsBeautifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indentSize, setIndentSize] = useState(2);
  const [useTabs, setUseTabs] = useState(false);

  const format = () => {
    try {
      const result = js_beautify(input, {
        indent_size: indentSize,
        indent_with_tabs: useTabs,
        space_before_conditional: true,
        jslint_happy: false,
        e4x: true,
        eol: "\n",
      });
      setOutput(result);
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to format");
      setOutput("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Switch id="tabs" checked={useTabs} onCheckedChange={setUseTabs} />
          <Label htmlFor="tabs">Use tabs</Label>
        </div>
        {!useTabs && (
          <div className="flex items-center gap-3">
            <Label>Indent size: <strong>{indentSize}</strong></Label>
            <Slider min={1} max={8} step={1} value={[indentSize]} onValueChange={([v]) => setIndentSize(v)} className="w-32" />
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Input JavaScript</Label>
          <Textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setOutput(""); setError(""); }}
            placeholder="function hello(){return'world';}"
            className="font-mono text-sm min-h-[320px]"
          />
        </div>
        <div className="space-y-1">
          <Label>Formatted output</Label>
          <Textarea readOnly value={output} className="font-mono text-sm min-h-[320px] bg-muted" />
        </div>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="flex gap-2">
        <Button onClick={format}>Format</Button>
        <Button variant="outline" disabled={!output} onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied!"); }}>
          Copy
        </Button>
        <Button variant="outline" onClick={() => { setInput(""); setOutput(""); setError(""); }}>Clear</Button>
      </div>
    </div>
  );
}
