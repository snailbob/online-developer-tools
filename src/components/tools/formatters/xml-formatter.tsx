"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import { Label } from "@/components/ui/label";
import { XMLParser, XMLBuilder } from "fast-xml-parser";
import { AlertCircle } from "lucide-react";

function formatXml(xml: string): string {
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
  const builder = new XMLBuilder({ ignoreAttributes: false, attributeNamePrefix: "@_", format: true, indentBy: "  " });
  const obj = parser.parse(xml);
  return builder.build(obj);
}

export default function XmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleFormat = () => {
    if (!input.trim()) { setOutput(""); setError(""); return; }
    try {
      setOutput(formatXml(input));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Input XML</Label>
          <Textarea
            className="h-80 resize-none"
            placeholder="<root><item id='1'>Hello</item></root>"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Output</Label>
            <CopyButton text={output} />
          </div>
          {error ? (
            <div className="h-80 flex items-start gap-2 rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive overflow-auto">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span className="font-mono break-all">{error}</span>
            </div>
          ) : (
            <Textarea
              className="h-80 resize-none"
              readOnly
              value={output}
              placeholder="Formatted XML will appear here..."
            />
          )}
        </div>
      </div>
      <div className="flex gap-3">
        <Button onClick={handleFormat}>Format</Button>
        <Button variant="ghost" onClick={() => { setInput(""); setOutput(""); setError(""); }}>Clear</Button>
      </div>
    </div>
  );
}
