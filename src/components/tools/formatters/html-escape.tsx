"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};
const HTML_UNESCAPES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
};

function escape(str: string): string {
  return str.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

function unescape(str: string): string {
  return str.replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&apos;/g, (e) => HTML_UNESCAPES[e] ?? e);
}

export default function HtmlEscape() {
  const [input, setInput] = useState("");

  return (
    <Tabs defaultValue="escape">
      <TabsList>
        <TabsTrigger value="escape">Escape</TabsTrigger>
        <TabsTrigger value="unescape">Unescape</TabsTrigger>
      </TabsList>
      {(["escape", "unescape"] as const).map((mode) => {
        const transform = mode === "escape" ? escape : unescape;
        return (
          <TabsContent key={mode} value={mode} className="space-y-4 mt-4">
            <div className="space-y-1">
              <Label>Input</Label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === "escape" ? '<script>alert("xss")</script>' : "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"}
                className="font-mono text-sm min-h-[200px]"
              />
            </div>
            <div className="space-y-1">
              <Label>Output</Label>
              <Textarea readOnly value={transform(input)} className="font-mono text-sm min-h-[200px] bg-muted" />
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(transform(input)); toast.success("Copied!"); }}>
                Copy
              </Button>
              <Button size="sm" variant="outline" onClick={() => setInput("")}>Clear</Button>
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
