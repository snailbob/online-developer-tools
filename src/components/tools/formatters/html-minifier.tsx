"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

function minifyHtml(
  html: string,
  opts: { removeComments: boolean; collapseWhitespace: boolean }
): string {
  let result = html;

  if (opts.removeComments) {
    // Remove HTML comments (but not conditional comments <!--[if ...)
    result = result.replace(/<!--(?!\[if\s)[\s\S]*?-->/g, "");
  }

  if (opts.collapseWhitespace) {
    // Collapse whitespace between tags
    result = result.replace(/>\s+</g, "><");
    // Collapse runs of whitespace inside text nodes / attributes (but preserve single space)
    result = result.replace(/\s{2,}/g, " ");
    // Trim leading/trailing whitespace around tag boundaries
    result = result.replace(/^\s+|\s+$/g, "");
  }

  return result;
}

export default function HtmlMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [removeComments, setRemoveComments] = useState(true);
  const [collapseWhitespace, setCollapseWhitespace] = useState(true);

  const run = () => {
    const result = minifyHtml(input, { removeComments, collapseWhitespace });
    setOutput(result);
    toast.success("Minified!");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Switch id="rc" checked={removeComments} onCheckedChange={setRemoveComments} />
          <Label htmlFor="rc">Remove comments</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="cw" checked={collapseWhitespace} onCheckedChange={setCollapseWhitespace} />
          <Label htmlFor="cw">Collapse whitespace</Label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Input HTML</Label>
          <Textarea
            placeholder="<!DOCTYPE html>…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="font-mono text-sm min-h-[320px]"
          />
        </div>
        <div className="space-y-1">
          <Label>Minified output</Label>
          <Textarea readOnly value={output} className="font-mono text-sm min-h-[320px] bg-muted break-all" />
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={run}>Minify</Button>
        <Button variant="outline" disabled={!output} onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied!"); }}>
          Copy
        </Button>
        <Button variant="outline" onClick={() => { setInput(""); setOutput(""); }}>Clear</Button>
      </div>
    </div>
  );
}
