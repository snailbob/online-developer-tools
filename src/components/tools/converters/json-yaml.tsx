"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import { Label } from "@/components/ui/label";
import { AlertCircle, ArrowLeftRight } from "lucide-react";
import yaml from "js-yaml";

export default function JsonYaml() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [error, setError] = useState("");

  const toYaml = () => {
    if (!left.trim()) return;
    try {
      const obj = JSON.parse(left);
      setRight(yaml.dump(obj, { lineWidth: -1 }));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const toJson = () => {
    if (!right.trim()) return;
    try {
      const obj = yaml.load(right);
      setLeft(JSON.stringify(obj, null, 2));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="flex items-start gap-2 rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <span className="font-mono">{error}</span>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>JSON</Label>
            <CopyButton text={left} />
          </div>
          <Textarea
            className="h-80 resize-none"
            placeholder='{"name": "Alice", "age": 30}'
            value={left}
            onChange={(e) => { setLeft(e.target.value); setError(""); }}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>YAML</Label>
            <CopyButton text={right} />
          </div>
          <Textarea
            className="h-80 resize-none"
            placeholder="name: Alice&#10;age: 30"
            value={right}
            onChange={(e) => { setRight(e.target.value); setError(""); }}
          />
        </div>
      </div>
      <div className="flex gap-3 flex-wrap">
        <Button onClick={toYaml}>JSON → YAML</Button>
        <Button variant="outline" onClick={toJson}>
          <ArrowLeftRight className="h-4 w-4 mr-1.5" />
          YAML → JSON
        </Button>
        <Button variant="ghost" onClick={() => { setLeft(""); setRight(""); setError(""); }}>Clear</Button>
      </div>
    </div>
  );
}
