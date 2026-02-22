"use client";

import { useState, useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const lines = text === "" ? 0 : text.split("\n").length;
    const sentences = text.trim() === "" ? 0 : (text.match(/[^.!?]*[.!?]+/g) || []).length;
    const paragraphs = text.trim() === "" ? 0 : text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
    const readTimeMinutes = Math.ceil(words / 200);
    return { words, chars, charsNoSpaces, lines, sentences, paragraphs, readTimeMinutes };
  }, [text]);

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Paste or type your text here…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[280px] font-mono text-sm"
      />
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={() => setText("")}>
          Clear
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {[
          { label: "Words", value: stats.words },
          { label: "Characters", value: stats.chars },
          { label: "Chars (no spaces)", value: stats.charsNoSpaces },
          { label: "Lines", value: stats.lines },
          { label: "Sentences", value: stats.sentences },
          { label: "Paragraphs", value: stats.paragraphs },
          { label: "Read time", value: `~${stats.readTimeMinutes} min` },
        ].map(({ label, value }) => (
          <Card key={label}>
            <CardHeader className="pb-1 pt-3 px-4">
              <CardTitle className="text-xs font-medium text-muted-foreground">{label}</CardTitle>
            </CardHeader>
            <CardContent className="pb-3 px-4">
              <span className="text-2xl font-bold">{value}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
