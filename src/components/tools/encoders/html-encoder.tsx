"use client";

import { useState } from "react";
import he from "he";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function HtmlEncoder() {
  const [input, setInput] = useState("");

  return (
    <Tabs defaultValue="encode">
      <TabsList>
        <TabsTrigger value="encode">Encode</TabsTrigger>
        <TabsTrigger value="decode">Decode</TabsTrigger>
      </TabsList>
      {(["encode", "decode"] as const).map((mode) => {
        const transform = mode === "encode"
          ? (s: string) => he.encode(s, { useNamedReferences: true })
          : (s: string) => he.decode(s);
        return (
          <TabsContent key={mode} value={mode} className="space-y-4 mt-4">
            <div className="space-y-1">
              <Label>Input</Label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === "encode" ? 'Hello <World> & "everyone"' : "Hello &lt;World&gt; &amp; &quot;everyone&quot;"}
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
