"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function UrlEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [fullUrl, setFullUrl] = useState(false);

  const encode = () => {
    try {
      setOutput(fullUrl ? encodeURI(input) : encodeURIComponent(input));
    } catch {
      setOutput("Error encoding");
    }
  };

  const decode = () => {
    try {
      setOutput(fullUrl ? decodeURI(input) : decodeURIComponent(input));
    } catch {
      setOutput("Error: Invalid encoded string");
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Input</Label>
          <Textarea
            className="h-48 resize-none"
            placeholder="https://example.com/search?q=hello world&lang=en"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Output</Label>
            <CopyButton text={output} />
          </div>
          <Textarea className="h-48 resize-none" readOnly value={output} />
        </div>
      </div>
      <div className="flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <Switch id="full-url" checked={fullUrl} onCheckedChange={setFullUrl} />
          <Label htmlFor="full-url">Full URL mode (preserve ://?=&)</Label>
        </div>
        <Button onClick={encode}>Encode</Button>
        <Button variant="outline" onClick={decode}>Decode</Button>
        <Button variant="ghost" onClick={() => { setInput(""); setOutput(""); }}>Clear</Button>
      </div>
    </div>
  );
}
