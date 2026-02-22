"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

const XML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
};
const XML_UNESCAPES: Record<string, string> = Object.fromEntries(
  Object.entries(XML_ESCAPES).map(([k, v]) => [v, k])
);

function escape(str: string): string {
  return str.replace(/[&<>"']/g, (c) => XML_ESCAPES[c]);
}
function unescape(str: string): string {
  return str.replace(/&amp;|&lt;|&gt;|&quot;|&apos;/g, (e) => XML_UNESCAPES[e]);
}

export default function XmlEscape() {
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
                placeholder={mode === "escape" ? '<div class="foo">Hello & World</div>' : '&lt;div&gt;Hello &amp; World&lt;/div&gt;'}
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
