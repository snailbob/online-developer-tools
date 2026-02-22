"use client";

import { useState } from "react";
import QRCode from "qrcode";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function QrGenerator() {
  const [text, setText] = useState("");
  const [dataUrl, setDataUrl] = useState("");
  const [size, setSize] = useState(300);
  const [ecLevel, setEcLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const url = await QRCode.toDataURL(text, {
        errorCorrectionLevel: ecLevel,
        width: size,
        margin: 2,
      });
      setDataUrl(url);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Failed to generate QR code");
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "qrcode.png";
    a.click();
  };

  return (
    <div className="space-y-4 max-w-md">
      <div className="space-y-1">
        <Label>Text or URL</Label>
        <Input
          placeholder="https://example.com"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generate()}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Size: {size}px</Label>
          <Slider min={100} max={600} step={50} value={[size]} onValueChange={([v]) => setSize(v)} />
        </div>
        <div className="space-y-1">
          <Label>Error correction</Label>
          <Select value={ecLevel} onValueChange={(v) => setEcLevel(v as "L" | "M" | "Q" | "H")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="L">L — Low (7%)</SelectItem>
              <SelectItem value="M">M — Medium (15%)</SelectItem>
              <SelectItem value="Q">Q — Quartile (25%)</SelectItem>
              <SelectItem value="H">H — High (30%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={generate} disabled={!text || loading}>
          {loading ? "Generating…" : "Generate QR Code"}
        </Button>
        {dataUrl && (
          <Button variant="outline" onClick={download}>Download PNG</Button>
        )}
      </div>
      {dataUrl && (
        <div className="border rounded-md p-4 bg-white flex items-center justify-center">
          <img src={dataUrl} alt="QR code" style={{ width: size, maxWidth: "100%", height: "auto" }} />
        </div>
      )}
    </div>
  );
}
