"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

// Very basic PHP array parser → JSON and JSON → PHP
function phpToJson(php: string): string {
  // Normalize array( -> [  and ) -> ]
  let s = php.trim();
  // Replace array( with [, but be careful with nested
  s = s.replace(/\barray\s*\(/gi, "[").replace(/=>/g, ":").replace(/\)/g, "]");
  // PHP strings use ' or ", JS uses " — convert single-quoted strings
  s = s.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, (_, content) => `"${content.replace(/"/g, '\\"')}"`);
  // Remove trailing commas before ] (JS doesn't allow)
  s = s.replace(/,\s*(])/g, "$1");
  return JSON.stringify(JSON.parse(s), null, 2);
}

function jsonToPhp(json: string): string {
  const obj = JSON.parse(json);
  function serialize(v: unknown, indent: number): string {
    const pad = "  ".repeat(indent);
    const inner = "  ".repeat(indent + 1);
    if (v === null) return "null";
    if (typeof v === "boolean") return v ? "true" : "false";
    if (typeof v === "number") return String(v);
    if (typeof v === "string") return `'${v.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
    if (Array.isArray(v)) {
      if (v.length === 0) return "[]";
      const items = v.map((item) => `${inner}${serialize(item, indent + 1)}`).join(",\n");
      return `[\n${items},\n${pad}]`;
    }
    if (typeof v === "object") {
      const entries = Object.entries(v as Record<string, unknown>)
        .map(([k, val]) => `${inner}'${k}' => ${serialize(val, indent + 1)}`)
        .join(",\n");
      return `[\n${entries},\n${pad}]`;
    }
    return String(v);
  }
  return serialize(obj, 0);
}

export default function PhpJson() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convert = (mode: "php-to-json" | "json-to-php") => {
    try {
      const result = mode === "php-to-json" ? phpToJson(input) : jsonToPhp(input);
      setOutput(result);
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Conversion failed");
      setOutput("");
    }
  };

  return (
    <Tabs defaultValue="php-to-json">
      <TabsList>
        <TabsTrigger value="php-to-json">PHP Array → JSON</TabsTrigger>
        <TabsTrigger value="json-to-php">JSON → PHP Array</TabsTrigger>
      </TabsList>
      {(["php-to-json", "json-to-php"] as const).map((mode) => (
        <TabsContent key={mode} value={mode} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Input {mode === "php-to-json" ? "PHP array" : "JSON"}</Label>
              <Textarea
                value={input}
                onChange={(e) => { setInput(e.target.value); setOutput(""); setError(""); }}
                placeholder={mode === "php-to-json" ? "['name' => 'Alice', 'age' => 30]" : '{"name":"Alice","age":30}'}
                className="font-mono text-sm min-h-[280px]"
              />
            </div>
            <div className="space-y-1">
              <Label>Output {mode === "php-to-json" ? "JSON" : "PHP array"}</Label>
              <Textarea readOnly value={output} className="font-mono text-sm min-h-[280px] bg-muted" />
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
