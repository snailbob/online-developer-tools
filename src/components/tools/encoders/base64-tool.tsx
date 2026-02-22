"use client";

import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Base64Tool() {
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");
  const [decodeError, setDecodeError] = useState("");
  const [fileResult, setFileResult] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const encode = () => {
    try {
      setEncoded(btoa(unescape(encodeURIComponent(text))));
    } catch {
      setEncoded("Error: Unable to encode");
    }
  };

  const decode = () => {
    try {
      setDecoded(decodeURIComponent(escape(atob(text))));
      setDecodeError("");
    } catch {
      setDecodeError("Invalid Base64 string");
      setDecoded("");
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setFileResult(result.split(",")[1] || result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Tabs defaultValue="encode">
      <TabsList>
        <TabsTrigger value="encode">Encode</TabsTrigger>
        <TabsTrigger value="decode">Decode</TabsTrigger>
        <TabsTrigger value="file">File → Base64</TabsTrigger>
      </TabsList>

      <TabsContent value="encode" className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label>Input Text</Label>
          <Textarea className="h-48 resize-none" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to encode..." />
        </div>
        <Button onClick={encode}>Encode to Base64</Button>
        {encoded && (
          <div className="space-y-2">
            <div className="flex items-center justify-between"><Label>Base64 Output</Label><CopyButton text={encoded} /></div>
            <Textarea className="h-32 resize-none" readOnly value={encoded} />
          </div>
        )}
      </TabsContent>

      <TabsContent value="decode" className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label>Base64 Input</Label>
          <Textarea className="h-48 resize-none" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter Base64 string to decode..." />
        </div>
        {decodeError && <p className="text-sm text-destructive">{decodeError}</p>}
        <Button onClick={decode}>Decode</Button>
        {decoded && (
          <div className="space-y-2">
            <div className="flex items-center justify-between"><Label>Decoded Output</Label><CopyButton text={decoded} /></div>
            <Textarea className="h-32 resize-none" readOnly value={decoded} />
          </div>
        )}
      </TabsContent>

      <TabsContent value="file" className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label>Select File</Label>
          <input ref={fileRef} type="file" onChange={handleFile} className="block text-sm" />
        </div>
        {fileResult && (
          <div className="space-y-2">
            <div className="flex items-center justify-between"><Label>Base64 Output</Label><CopyButton text={fileResult} /></div>
            <Textarea className="h-48 resize-none" readOnly value={fileResult} />
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
