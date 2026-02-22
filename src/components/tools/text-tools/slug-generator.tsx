"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function SlugGenerator() {
  const [input, setInput] = useState("");
  const slug = toSlug(input);

  const copy = () => {
    if (!slug) return;
    navigator.clipboard.writeText(slug);
    toast.success("Slug copied!");
  };

  return (
    <div className="space-y-6 max-w-xl">
      <div className="space-y-1">
        <Label htmlFor="slug-input">Input text</Label>
        <Input
          id="slug-input"
          placeholder="My Awesome Blog Post Title!"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <Label>Generated slug</Label>
        <div className="flex gap-2">
          <Input
            readOnly
            value={slug}
            className="font-mono bg-muted"
            placeholder="result-appears-here"
          />
          <Button onClick={copy} disabled={!slug}>
            Copy
          </Button>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={() => setInput("")}>
        Clear
      </Button>
    </div>
  );
}
