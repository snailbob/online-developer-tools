"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function HtmlStripper() {
  const [input, setInput] = useState("");

  const strip = (html: string): string => {
    if (typeof window === "undefined") return html;
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent ?? "";
  };

  const output = strip(input);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Input HTML</Label>
          <Textarea
            placeholder='<p>Hello <strong>World</strong></p>'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="font-mono text-sm min-h-[320px]"
          />
        </div>
        <div className="space-y-1">
          <Label>Plain text output</Label>
          <Textarea readOnly value={output} className="font-mono text-sm min-h-[320px] bg-muted" />
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
