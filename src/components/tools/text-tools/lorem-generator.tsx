"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure dolor reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa officia deserunt mollit anim id est laborum".split(" ");

function randomWord() { return WORDS[Math.floor(Math.random() * WORDS.length)]; }
function capitalize(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }

function generateWords(n: number): string {
  return Array.from({ length: n }, () => randomWord()).join(" ");
}

function generateSentences(n: number): string {
  return Array.from({ length: n }, () => {
    const len = 8 + Math.floor(Math.random() * 10);
    return capitalize(generateWords(len)) + ".";
  }).join(" ");
}

function generateParagraphs(n: number): string {
  return Array.from({ length: n }, () => generateSentences(3 + Math.floor(Math.random() * 4))).join("\n\n");
}

export default function LoremGenerator() {
  const [unit, setUnit] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState("3");
  const [output, setOutput] = useState("");

  const generate = () => {
    const n = Math.max(1, parseInt(count) || 1);
    if (unit === "paragraphs") setOutput(generateParagraphs(n));
    else if (unit === "sentences") setOutput(generateSentences(n));
    else setOutput(generateWords(n));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-3 flex-wrap">
        <div className="space-y-2">
          <Label>Count</Label>
          <Input type="number" min={1} max={100} className="w-24" value={count} onChange={(e) => setCount(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Unit</Label>
          <Select value={unit} onValueChange={(v) => setUnit(v as typeof unit)}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="paragraphs">Paragraphs</SelectItem>
              <SelectItem value="sentences">Sentences</SelectItem>
              <SelectItem value="words">Words</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={generate}>Generate</Button>
      </div>

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Output</Label>
            <CopyButton text={output} />
          </div>
          <Textarea className="h-80 resize-none" readOnly value={output} />
        </div>
      )}
    </div>
  );
}
