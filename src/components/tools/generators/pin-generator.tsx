"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

function generatePin(length: number): string {
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((n) => n % 10).join("");
}

export default function PinGenerator() {
  const [length, setLength] = useState(6);
  const [pin, setPin] = useState("");
  const [count, setCount] = useState(1);
  const [bulk, setBulk] = useState<string[]>([]);

  const gen = () => {
    if (count > 1) {
      const pins = Array.from({ length: count }, () => generatePin(length));
      setBulk(pins);
      setPin("");
    } else {
      setPin(generatePin(length));
      setBulk([]);
    }
  };

  return (
    <div className="space-y-5 max-w-md">
      <div className="space-y-2">
        <Label>PIN length: <strong>{length}</strong></Label>
        <Slider min={2} max={20} step={1} value={[length]} onValueChange={([v]) => setLength(v)} />
      </div>
      <div className="flex items-center gap-3">
        <Label className="shrink-0">Generate</Label>
        <Input
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-20"
        />
        <Label>PIN(s)</Label>
      </div>
      <Button onClick={gen}>Generate</Button>
      {pin && count === 1 && (
        <div className="flex gap-2">
          <Input readOnly value={pin} className="font-mono text-xl tracking-widest" />
          <Button variant="outline" onClick={() => { navigator.clipboard.writeText(pin); toast.success("Copied!"); }}>
            Copy
          </Button>
        </div>
      )}
      {bulk.length > 0 && (
        <div className="space-y-1">
          <div className="flex justify-between">
            <Label>Generated PINs</Label>
            <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(bulk.join("\n")); toast.success("All copied!"); }}>
              Copy all
            </Button>
          </div>
          <div className="border rounded-md p-2 font-mono text-sm space-y-1 max-h-48 overflow-y-auto bg-muted tracking-widest">
            {bulk.map((p, i) => <div key={i}>{p}</div>)}
          </div>
        </div>
      )}
    </div>
  );
}
