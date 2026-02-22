"use client";

import { useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState("2");

  const format = useCallback(() => {
    if (!input.trim()) { setOutput(""); setError(""); return; }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, Number(indent)));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }, [input, indent]);

  const minify = useCallback(() => {
    if (!input.trim()) { setOutput(""); setError(""); return; }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }, [input]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Input JSON</Label>
          <Textarea
            className="h-80 resize-none"
            placeholder='{"hello": "world"}'
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
            <div className="h-80 flex items-start gap-2 rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span className="font-mono break-all">{error}</span>
            </div>
          ) : (
            <Textarea
              className="h-80 resize-none"
              readOnly
              value={output}
              placeholder="Formatted JSON will appear here..."
            />
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Label className="shrink-0">Indent</Label>
          <Select value={indent} onValueChange={setIndent}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 spaces</SelectItem>
              <SelectItem value="4">4 spaces</SelectItem>
              <SelectItem value="1">1 tab (\\t)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={format}>Format / Prettify</Button>
        <Button variant="outline" onClick={minify}>Minify</Button>
        <Button variant="ghost" onClick={() => { setInput(""); setOutput(""); setError(""); }}>Clear</Button>
      </div>
    </div>
  );
}
