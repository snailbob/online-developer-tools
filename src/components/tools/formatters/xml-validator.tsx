"use client";

import { useState } from "react";
import { XMLParser, XMLValidator } from "fast-xml-parser";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function XmlValidator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const validate = () => {
    try {
      const parser = new XMLParser({ ignoreAttributes: false });
      const validationResult = XMLValidator.validate(input, { allowBooleanAttributes: true });
      if (validationResult && validationResult !== true) {
        setResult({ ok: false, message: `Line ${validationResult.err.line}: ${validationResult.err.msg}` });
        return;
      }
      parser.parse(input);
      setResult({ ok: true, message: "Valid XML ✓" });
    } catch (e: unknown) {
      setResult({ ok: false, message: e instanceof Error ? e.message : "Invalid XML" });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label>XML to validate</Label>
        <Textarea
          placeholder="<root><item>value</item></root>"
          value={input}
          onChange={(e) => { setInput(e.target.value); setResult(null); }}
          className="font-mono text-sm min-h-[320px]"
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={validate}>Validate</Button>
        <Button variant="outline" onClick={() => { setInput(""); setResult(null); }}>Clear</Button>
      </div>
      {result && (
        <div className={`rounded-md border p-3 text-sm font-mono ${result.ok ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300" : "border-destructive bg-destructive/10 text-destructive"}`}>
          {result.message}
        </div>
      )}
    </div>
  );
}
