"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")  // remove comments
    .replace(/\s*([{}:;,>~+])\s*/g, "$1")  // remove spaces around delimiters
    .replace(/;\}/g, "}")               // remove trailing semicolons
    .replace(/\s+/g, " ")              // collapse remaining whitespace
    .trim();
}

export default function CssMinifier() {
  const [input, setInput] = useState("");
  const [removeComments, setRemoveComments] = useState(true);

  const output = minifyCSS(input);

  const savings = input.length > 0
    ? Math.round((1 - output.length / input.length) * 100)
    : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Switch id="rc" checked={removeComments} onCheckedChange={setRemoveComments} />
        <Label htmlFor="rc">Remove CSS comments</Label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Input CSS</Label>
          <Textarea
            placeholder="body { margin: 0; padding: 0; }"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="font-mono text-sm min-h-[320px]"
          />
        </div>
        <div className="space-y-1">
          <Label>Minified CSS {input.length > 0 && <span className="text-muted-foreground">({savings}% saved)</span>}</Label>
          <Textarea readOnly value={output} className="font-mono text-sm min-h-[320px] bg-muted break-all" />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          disabled={!output}
          onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied!"); }}
        >
          Copy
        </Button>
        <Button variant="outline" onClick={() => setInput("")}>Clear</Button>
      </div>
    </div>
  );
}
