"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

function textToHex(text: string): string {
  return Array.from(new TextEncoder().encode(text))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(" ");
}

function hexToText(hex: string): string {
  const clean = hex.replace(/\s+/g, "");
  if (clean.length % 2 !== 0) throw new Error("Odd number of hex digits");
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    const byte = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
    if (isNaN(byte)) throw new Error(`Invalid hex byte at position ${i * 2}`);
    bytes[i] = byte;
  }
  return new TextDecoder().decode(bytes);
}

export default function TextHex() {
  const [t2hInput, setT2hInput] = useState("");
  const [h2tInput, setH2tInput] = useState("");
  const [h2tOutput, setH2tOutput] = useState("");
  const [h2tError, setH2tError] = useState("");

  const t2hOutput = textToHex(t2hInput);

  const handleH2t = () => {
    try {
      setH2tOutput(hexToText(h2tInput));
      setH2tError("");
    } catch (e: unknown) {
      setH2tError(e instanceof Error ? e.message : "Invalid hex");
      setH2tOutput("");
    }
  };

  return (
    <Tabs defaultValue="text-to-hex">
      <TabsList>
        <TabsTrigger value="text-to-hex">Text → HEX</TabsTrigger>
        <TabsTrigger value="hex-to-text">HEX → Text</TabsTrigger>
      </TabsList>

      <TabsContent value="text-to-hex" className="space-y-4 mt-4">
        <div className="space-y-1">
          <Label>Input text</Label>
          <Textarea
            placeholder="Type text…"
            value={t2hInput}
            onChange={(e) => setT2hInput(e.target.value)}
            className="font-mono text-sm min-h-[160px]"
          />
        </div>
        <div className="space-y-1">
          <Label>Hex output</Label>
          <Textarea
            readOnly
            value={t2hOutput}
            className="font-mono text-sm min-h-[120px] bg-muted"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={!t2hOutput}
          onClick={() => { navigator.clipboard.writeText(t2hOutput); toast.success("Copied!"); }}
        >
          Copy HEX
        </Button>
      </TabsContent>

      <TabsContent value="hex-to-text" className="space-y-4 mt-4">
        <div className="space-y-1">
          <Label>Hex input (space-separated or continuous)</Label>
          <Textarea
            placeholder="48 65 6c 6c 6f…"
            value={h2tInput}
            onChange={(e) => setH2tInput(e.target.value)}
            className="font-mono text-sm min-h-[120px]"
          />
        </div>
        <Button onClick={handleH2t}>Convert</Button>
        {h2tError && <p className="text-sm text-destructive">{h2tError}</p>}
        {h2tOutput && (
          <div className="space-y-1">
            <Label>Text output</Label>
            <Textarea readOnly value={h2tOutput} className="font-mono text-sm min-h-[120px] bg-muted" />
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
