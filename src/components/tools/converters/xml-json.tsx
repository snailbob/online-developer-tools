"use client";

import { useState } from "react";
import { XMLParser, XMLBuilder } from "fast-xml-parser";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function XmlJson() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convert = (mode: "xml-to-json" | "json-to-xml") => {
    try {
      if (mode === "xml-to-json") {
        const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
        const parsed = parser.parse(input);
        setOutput(JSON.stringify(parsed, null, 2));
      } else {
        const json = JSON.parse(input);
        const builder = new XMLBuilder({ ignoreAttributes: false, attributeNamePrefix: "@_", format: true });
        setOutput(builder.build(json));
      }
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Conversion failed");
      setOutput("");
    }
  };

  return (
    <Tabs defaultValue="xml-to-json">
      <TabsList>
        <TabsTrigger value="xml-to-json">XML → JSON</TabsTrigger>
        <TabsTrigger value="json-to-xml">JSON → XML</TabsTrigger>
      </TabsList>
      {(["xml-to-json", "json-to-xml"] as const).map((mode) => (
        <TabsContent key={mode} value={mode} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Input {mode === "xml-to-json" ? "XML" : "JSON"}</Label>
              <Textarea
                value={input}
                onChange={(e) => { setInput(e.target.value); setOutput(""); setError(""); }}
                placeholder={mode === "xml-to-json" ? "<root><item>value</item></root>" : '{"root":{"item":"value"}}'}
                className="font-mono text-sm min-h-[320px]"
              />
            </div>
            <div className="space-y-1">
              <Label>Output {mode === "xml-to-json" ? "JSON" : "XML"}</Label>
              <Textarea readOnly value={output} className="font-mono text-sm min-h-[320px] bg-muted" />
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex gap-2">
            <Button onClick={() => convert(mode)}>Convert</Button>
            <Button variant="outline" disabled={!output} onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied!"); }}>
              Copy
            </Button>
            <Button variant="outline" onClick={() => { setInput(""); setOutput(""); setError(""); }}>Clear</Button>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
