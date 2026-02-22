"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function JsonValidator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const validate = () => {
    try {
      JSON.parse(input);
      setResult({ ok: true, message: "Valid JSON ✓" });
    } catch (e: unknown) {
      setResult({ ok: false, message: e instanceof Error ? e.message : "Invalid JSON" });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label>JSON to validate</Label>
        <Textarea
          placeholder='{"key": "value"}'
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
