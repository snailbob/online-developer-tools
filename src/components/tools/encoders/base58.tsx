"use client";

import { useState } from "react";
import bs58 from "bs58";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

function textToBytes(text: string): Uint8Array {
  return new TextEncoder().encode(text);
}

function hexToBytes(hex: string): Uint8Array {
  const clean = hex.replace(/\s/g, "");
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function Base58Tool() {
  const [input, setInput] = useState("");

  const ops = [
    {
      id: "encode",
      placeholder: "Hello World",
      convert: (s: string) => { try { return bs58.encode(textToBytes(s)); } catch { return ""; } },
      label: "Base58",
    },
    {
      id: "decode",
      placeholder: "JxF12TrwUP45BMd",
      convert: (s: string) => { try { return new TextDecoder().decode(bs58.decode(s)); } catch { return "Invalid Base58"; } },
      label: "Decoded text",
    },
    {
      id: "hex-to-b58",
      placeholder: "48656c6c6f",
      convert: (s: string) => { try { return bs58.encode(hexToBytes(s)); } catch { return "Invalid HEX"; } },
      label: "Base58",
    },
    {
      id: "b58-to-hex",
      placeholder: "JxF12TrwUP45BMd",
      convert: (s: string) => { try { return bytesToHex(bs58.decode(s)); } catch { return "Invalid Base58"; } },
      label: "HEX",
    },
  ];

  return (
    <Tabs defaultValue="encode">
      <TabsList>
        <TabsTrigger value="encode">Text → Base58</TabsTrigger>
        <TabsTrigger value="decode">Base58 → Text</TabsTrigger>
        <TabsTrigger value="hex-to-b58">HEX → Base58</TabsTrigger>
        <TabsTrigger value="b58-to-hex">Base58 → HEX</TabsTrigger>
      </TabsList>
      {ops.map(({ id, placeholder, convert, label }) => (
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
            <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(convert(input)); toast.success("Copied!"); }}>Copy</Button>
            <Button size="sm" variant="outline" onClick={() => setInput("")}>Clear</Button>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
