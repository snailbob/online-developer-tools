"use client";

import { useState, useRef } from "react";
import jsQR from "jsqr";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function QrReader() {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setResult("");
    setError("");

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        setResult(code.data);
      } else {
        setError("No QR code found in the image.");
      }
      URL.revokeObjectURL(url);
    };
    img.onerror = () => setError("Could not load image.");
    img.src = url;
  };

  return (
    <div className="space-y-4 max-w-md">
      <div className="space-y-1">
        <Label>Upload QR code image</Label>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
        <Button variant="outline" onClick={() => fileRef.current?.click()}>
          Choose image…
        </Button>
      </div>

      {preview && (
        <div className="border rounded-md p-2 bg-white">
          <img src={preview} alt="uploaded" className="max-w-full max-h-64 object-contain mx-auto" />
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {result && (
        <div className="space-y-1">
          <Label>Decoded text</Label>
          <div className="flex gap-2">
            <Input readOnly value={result} className="font-mono" />
            <Button variant="outline" onClick={() => { navigator.clipboard.writeText(result); toast.success("Copied!"); }}>
              Copy
            </Button>
          </div>
          {result.startsWith("http") && (
            <a href={result} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline break-all">
              {result}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
