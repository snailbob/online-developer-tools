"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

function uuidv4(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export default function UuidGenerator() {
  const [count, setCount] = useState("10");
  const [uuids, setUuids] = useState<string[]>([]);

  const generate = useCallback(() => {
    const n = Math.min(Math.max(1, parseInt(count) || 1), 1000);
    setUuids(Array.from({ length: n }, () => uuidv4()));
  }, [count]);

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    toast.success(`Copied ${uuids.length} UUIDs`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Label className="shrink-0">Count</Label>
          <Input
            type="number"
            className="w-24"
            min={1}
            max={1000}
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </div>
        <Button onClick={generate}>Generate</Button>
        {uuids.length > 0 && (
          <Button variant="outline" onClick={copyAll}>
            Copy All ({uuids.length})
          </Button>
        )}
      </div>

      {uuids.length > 0 && (
        <div className="rounded-md border divide-y max-h-[500px] overflow-auto">
          {uuids.map((id, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-2 hover:bg-muted/50 group">
              <span className="font-mono text-sm select-all">{id}</span>
              <CopyButton text={id} label="" className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
