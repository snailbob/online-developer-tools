"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

function jsEscape(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t")
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, "0")}`);
}

function jsUnescape(str: string): string {
  return str
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\\t/g, "\t")
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
}

export default function JsEscape() {
  const [input, setInput] = useState("");

  return (
    <Tabs defaultValue="escape">
      <TabsList>
        <TabsTrigger value="escape">Escape</TabsTrigger>
        <TabsTrigger value="unescape">Unescape</TabsTrigger>
      </TabsList>
      {(["escape", "unescape"] as const).map((mode) => {
        const transform = mode === "escape" ? jsEscape : jsUnescape;
        return (
          <TabsContent key={mode} value={mode} className="space-y-4 mt-4">
            <div className="space-y-1">
              <Label>Input</Label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === "escape" ? "She said \"hello\"\nNew line here" : "She said \\\"hello\\\"\\nNew line here"}
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
