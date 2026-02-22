"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import CryptoJS from "crypto-js";

const ALGORITHMS = [
  { label: "MD5", value: "MD5" },
  { label: "SHA-1", value: "SHA1" },
  { label: "SHA-224", value: "SHA224" },
  { label: "SHA-256", value: "SHA256" },
  { label: "SHA-384", value: "SHA384" },
  { label: "SHA-512", value: "SHA512" },
  { label: "SHA-3 (256)", value: "SHA3" },
  { label: "RIPEMD-160", value: "RIPEMD160" },
];

function hmac(algo: string, message: string, key: string): string {
  const fn = (CryptoJS.HmacMD5 || CryptoJS.HmacSHA256);
  void fn;
  switch (algo) {
    case "MD5": return CryptoJS.HmacMD5(message, key).toString();
    case "SHA1": return CryptoJS.HmacSHA1(message, key).toString();
    case "SHA224": return CryptoJS.HmacSHA224(message, key).toString();
    case "SHA256": return CryptoJS.HmacSHA256(message, key).toString();
    case "SHA384": return CryptoJS.HmacSHA384(message, key).toString();
    case "SHA512": return CryptoJS.HmacSHA512(message, key).toString();
    case "SHA3": return CryptoJS.HmacSHA3(message, key).toString();
    case "RIPEMD160": return CryptoJS.HmacRIPEMD160(message, key).toString();
    default: return "";
  }
}

export default function HmacGenerator() {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [algo, setAlgo] = useState("SHA256");

  const output = message && key ? hmac(algo, message, key) : "";

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="space-y-1">
        <Label>Algorithm</Label>
        <Select value={algo} onValueChange={setAlgo}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ALGORITHMS.map((a) => (
              <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>Secret key</Label>
        <Textarea
          placeholder="Enter your secret key…"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="font-mono text-sm min-h-[80px]"
        />
      </div>
      <div className="space-y-1">
        <Label>Message</Label>
        <Textarea
          placeholder="Enter the message to sign…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="font-mono text-sm min-h-[120px]"
        />
      </div>
      {output && (
        <div className="space-y-1">
          <Label>HMAC ({ALGORITHMS.find((a) => a.value === algo)?.label})</Label>
          <div className="flex gap-2">
            <Textarea readOnly value={output} className="font-mono text-sm bg-muted" />
            <Button variant="outline" className="shrink-0" onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied!"); }}>
              Copy
            </Button>
          </div>
        </div>
      )}
      <Button variant="outline" size="sm" onClick={() => { setMessage(""); setKey(""); }}>Clear</Button>
    </div>
  );
}
