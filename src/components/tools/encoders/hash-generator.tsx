"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import { Label } from "@/components/ui/label";
import CryptoJS from "crypto-js";

const ALGORITHMS = [
  { id: "md5", label: "MD5", fn: (s: string) => CryptoJS.MD5(s).toString() },
  { id: "sha1", label: "SHA-1", fn: (s: string) => CryptoJS.SHA1(s).toString() },
  { id: "sha256", label: "SHA-256", fn: (s: string) => CryptoJS.SHA256(s).toString() },
  { id: "sha512", label: "SHA-512", fn: (s: string) => CryptoJS.SHA512(s).toString() },
  { id: "sha3", label: "SHA-3 (256)", fn: (s: string) => CryptoJS.SHA3(s, { outputLength: 256 }).toString() },
];

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});

  const generate = () => {
    const result: Record<string, string> = {};
    for (const algo of ALGORITHMS) {
      result[algo.id] = algo.fn(input);
    }
    setHashes(result);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Input Text</Label>
        <Textarea
          className="h-32 resize-none"
          placeholder="Enter text to hash..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="flex gap-3">
        <Button onClick={generate}>Generate Hashes</Button>
        <Button variant="ghost" onClick={() => { setInput(""); setHashes({}); }}>Clear</Button>
      </div>

      {Object.keys(hashes).length > 0 && (
        <div className="space-y-3">
          {ALGORITHMS.map((algo) => (
            <div key={algo.id} className="space-y-1">
              <Label>{algo.label}</Label>
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  className="flex-1 rounded-md border bg-muted/30 px-3 py-2 text-sm font-mono select-all"
                  value={hashes[algo.id] || ""}
                />
                <CopyButton text={hashes[algo.id] || ""} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
