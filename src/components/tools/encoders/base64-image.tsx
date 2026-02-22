"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function Base64Image() {
  // Image → Base64
  const [imgBase64, setImgBase64] = useState("");
  const [imgMime, setImgMime] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Base64 → Image
  const [b64Input, setB64Input] = useState("");

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const [header, data] = result.split(",");
      const mime = header.match(/data:([^;]+)/)?.[1] ?? "image/png";
      setImgMime(mime);
      setImgBase64(data);
    };
    reader.readAsDataURL(file);
  };

  const fullDataUrl = b64Input.startsWith("data:") ? b64Input : `data:image/png;base64,${b64Input}`;

  return (
    <Tabs defaultValue="to-base64">
      <TabsList>
        <TabsTrigger value="to-base64">Image → Base64</TabsTrigger>
        <TabsTrigger value="to-image">Base64 → Image</TabsTrigger>
      </TabsList>

      <TabsContent value="to-base64" className="space-y-4 mt-4">
        <div className="space-y-1">
          <Label>Select an image file</Label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
          />
          <Button variant="outline" onClick={() => fileRef.current?.click()}>
            Browse image…
          </Button>
        </div>
        {imgBase64 && (
          <>
            <div className="border rounded-md p-2 max-w-xs">
              <img src={`data:${imgMime};base64,${imgBase64}`} alt="preview" className="max-w-full rounded" />
            </div>
            <div className="space-y-1">
              <Label>Base64 string</Label>
              <Textarea readOnly value={imgBase64} className="font-mono text-xs min-h-[120px] bg-muted break-all" />
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(imgBase64); toast.success("Copied base64!"); }}>
                Copy base64
              </Button>
              <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(`data:${imgMime};base64,${imgBase64}`); toast.success("Copied data URL!"); }}>
                Copy data URL
              </Button>
            </div>
          </>
        )}
      </TabsContent>

      <TabsContent value="to-image" className="space-y-4 mt-4">
        <div className="space-y-1">
          <Label>Paste Base64 string or data URL</Label>
          <Textarea
            placeholder="data:image/png;base64,iVBOR… or just the base64 string"
            value={b64Input}
            onChange={(e) => setB64Input(e.target.value)}
            className="font-mono text-xs min-h-[120px]"
          />
        </div>
        {b64Input && (
          <div className="border rounded-md p-2 max-w-sm">
            <img
              src={fullDataUrl}
              alt="decoded"
              className="max-w-full rounded"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; toast.error("Invalid image data"); }}
            />
          </div>
        )}
        <Button variant="outline" size="sm" onClick={() => setB64Input("")}>Clear</Button>
      </TabsContent>
    </Tabs>
  );
}
