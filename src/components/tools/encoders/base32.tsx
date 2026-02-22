"use client";

import { useState } from "react";
import * as base32Lib from "hi-base32";

// hi-base32 exports { encode, decode } — decode also has .asBytes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const base32 = base32Lib as any;
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

function textToHex(text: string): string {
  return Array.from(new TextEncoder().encode(text))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBase32(hex: string): string {
  const bytes = Array.from({ length: hex.length / 2 }, (_, i) =>
    parseInt(hex.slice(i * 2, i * 2 + 2), 16)
  );
  return base32.encode(bytes);
}

function base32ToHex(b32: string): string {
  const bytes = base32.decode.asBytes(b32);
  return bytes.map((b: number) => b.toString(16).padStart(2, "0")).join("");
}

export default function Base32Tool() {
  const [input, setInput] = useState("");

  return (
    <Tabs defaultValue="encode">
      <TabsList>
        <TabsTrigger value="encode">Text → Base32</TabsTrigger>
        <TabsTrigger value="decode">Base32 → Text</TabsTrigger>
        <TabsTrigger value="hex-to-b32">HEX → Base32</TabsTrigger>
        <TabsTrigger value="b32-to-hex">Base32 → HEX</TabsTrigger>
      </TabsList>

      {[
        {
          id: "encode",
          placeholder: "Hello World",
          convert: (s: string) => { try { return base32.encode(new TextEncoder().encode(s)); } catch { return ""; } },
          label: "Base32",
        },
        {
          id: "decode",
          placeholder: "JBSWY3DPEB3W64TMMQ======",
          convert: (s: string) => { try { return new TextDecoder().decode(Uint8Array.from(base32.decode.asBytes(s))); } catch { return "Invalid Base32"; } },
          label: "Decoded text",
        },
        {
          id: "hex-to-b32",
          placeholder: "48656c6c6f",
          convert: (s: string) => { try { return hexToBase32(s.replace(/\s/g, "")); } catch { return "Invalid HEX"; } },
          label: "Base32",
        },
        {
          id: "b32-to-hex",
          placeholder: "JBSWY3DP",
          convert: (s: string) => { try { return base32ToHex(s.toUpperCase()); } catch { return "Invalid Base32"; } },
          label: "HEX",
        },
      ].map(({ id, placeholder, convert, label }) => (
        <TabsContent key={id} value={id} className="space-y-4 mt-4">
          <div className="space-y-1">
            <Label>Input</Label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              className="font-mono text-sm min-h-[140px]"
            />
          </div>
          <div className="space-y-1">
            <Label>{label}</Label>
            <Textarea readOnly value={convert(input)} className="font-mono text-sm min-h-[100px] bg-muted" />
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(convert(input)); toast.success("Copied!"); }}>
              Copy
            </Button>
            <Button size="sm" variant="outline" onClick={() => setInput("")}>Clear</Button>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
