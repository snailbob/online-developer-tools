"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });
  const [testStr, setTestStr] = useState("The quick brown fox jumps over the lazy dog.");

  const flagStr = Object.entries(flags).filter(([, v]) => v).map(([k]) => k).join("");

  const { matches, error, highlighted } = useMemo(() => {
    if (!pattern) return { matches: [], error: "", highlighted: testStr };
    try {
      const re = new RegExp(pattern, flagStr);
      const allMatches: RegExpExecArray[] = [];
      if (flags.g) {
        let m: RegExpExecArray | null;
        const safeRe = new RegExp(pattern, flagStr);
        while ((m = safeRe.exec(testStr)) !== null) {
          allMatches.push(m);
          if (m.index === safeRe.lastIndex) safeRe.lastIndex++;
        }
      } else {
        const m = re.exec(testStr);
        if (m) allMatches.push(m);
      }

      // Build highlighted HTML
      let result = "";
      let lastIndex = 0;
      const safeRe2 = new RegExp(pattern, flags.g ? flagStr : flagStr + "g");
      testStr.replace(safeRe2, (match, ...args) => {
        const offset = args[args.length - 2] as number;
        result += escapeHtml(testStr.slice(lastIndex, offset));
        result += `<mark class="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">${escapeHtml(match)}</mark>`;
        lastIndex = offset + match.length;
        return match;
      });
      result += escapeHtml(testStr.slice(lastIndex));

      return { matches: allMatches, error: "", highlighted: result };
    } catch (e) {
      return { matches: [], error: (e as Error).message, highlighted: testStr };
    }
  }, [pattern, flagStr, testStr, flags.g]);

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label>Regular Expression</Label>
        <div className="flex gap-2 items-center">
          <span className="text-muted-foreground font-mono">/</span>
          <Input
            className="font-mono"
            placeholder="[a-z]+"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
          />
          <span className="text-muted-foreground font-mono">/{flagStr}</span>
        </div>
        {error && <p className="text-sm text-destructive font-mono">{error}</p>}
      </div>

      <div className="flex gap-4 flex-wrap">
        {(Object.keys(flags) as (keyof typeof flags)[]).map((f) => (
          <div key={f} className="flex items-center gap-2">
            <Switch id={`flag-${f}`} checked={flags[f]} onCheckedChange={(v) => setFlags((prev) => ({ ...prev, [f]: v }))} />
            <Label htmlFor={`flag-${f}`} className="font-mono cursor-pointer">
              {f} — {f === "g" ? "global" : f === "i" ? "case insensitive" : f === "m" ? "multiline" : "dot all"}
            </Label>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label>Test String</Label>
        <Textarea
          className="resize-none h-32"
          value={testStr}
          onChange={(e) => setTestStr(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label>Matches</Label>
          <Badge variant="secondary">{matches.length}</Badge>
        </div>
        <div
          className="min-h-[80px] rounded-md border bg-muted/30 p-3 font-mono text-sm leading-relaxed break-all"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </div>

      {matches.length > 0 && (
        <div className="space-y-2">
          <Label>Match Details</Label>
          <div className="space-y-2 max-h-48 overflow-auto">
            {matches.map((m, i) => (
              <div key={i} className="rounded border bg-muted/30 p-2 text-sm font-mono">
                <span className="text-muted-foreground">#{i + 1}</span>{" "}
                <span className="font-semibold">"{m[0]}"</span>{" "}
                <span className="text-muted-foreground">at index {m.index}</span>
                {m.length > 1 && (
                  <span className="text-muted-foreground ml-2">groups: [{m.slice(1).map((g) => `"${g ?? "undefined"}"`).join(", ")}]</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
