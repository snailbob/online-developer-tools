"use client";

import { useState } from "react";
import bcrypt from "bcryptjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function BcryptTool() {
  // Generator state
  const [genInput, setGenInput] = useState("");
  const [rounds, setRounds] = useState(10);
  const [genOutput, setGenOutput] = useState("");
  const [genLoading, setGenLoading] = useState(false);

  // Checker state
  const [checkPlain, setCheckPlain] = useState("");
  const [checkHash, setCheckHash] = useState("");
  const [checkResult, setCheckResult] = useState<boolean | null>(null);
  const [checkLoading, setCheckLoading] = useState(false);

  const generate = async () => {
    if (!genInput) return;
    setGenLoading(true);
    try {
      const hash = await bcrypt.hash(genInput, rounds);
      setGenOutput(hash);
    } catch {
      toast.error("Failed to hash");
    } finally {
      setGenLoading(false);
    }
  };

  const check = async () => {
    if (!checkPlain || !checkHash) return;
    setCheckLoading(true);
    try {
      const result = await bcrypt.compare(checkPlain, checkHash);
      setCheckResult(result);
    } catch {
      setCheckResult(false);
    } finally {
      setCheckLoading(false);
    }
  };

  return (
    <Tabs defaultValue="generate">
      <TabsList>
        <TabsTrigger value="generate">Generate Hash</TabsTrigger>
        <TabsTrigger value="verify">Verify Password</TabsTrigger>
      </TabsList>

      <TabsContent value="generate" className="space-y-4 mt-4 max-w-lg">
        <div className="space-y-1">
          <Label htmlFor="gen-input">Password / text to hash</Label>
          <Input
            id="gen-input"
            type="password"
            placeholder="Enter password…"
            value={genInput}
            onChange={(e) => setGenInput(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Salt rounds: <strong>{rounds}</strong> (cost factor)</Label>
          <Slider min={4} max={14} step={1} value={[rounds]} onValueChange={([v]) => setRounds(v)} className="max-w-xs" />
          <p className="text-xs text-muted-foreground">Higher rounds = slower but more secure. 10–12 is recommended.</p>
        </div>
        <Button onClick={generate} disabled={!genInput || genLoading}>
          {genLoading ? "Hashing…" : "Generate Hash"}
        </Button>
        {genOutput && (
          <div className="space-y-1">
            <Label>Bcrypt hash</Label>
            <div className="flex gap-2">
              <Input readOnly value={genOutput} className="font-mono text-xs bg-muted" />
              <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(genOutput); toast.success("Copied!"); }}>
                Copy
              </Button>
            </div>
          </div>
        )}
      </TabsContent>

      <TabsContent value="verify" className="space-y-4 mt-4 max-w-lg">
        <div className="space-y-1">
          <Label htmlFor="check-plain">Plain text / password</Label>
          <Input
            id="check-plain"
            type="password"
            placeholder="Enter password to test…"
            value={checkPlain}
            onChange={(e) => { setCheckPlain(e.target.value); setCheckResult(null); }}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="check-hash">Bcrypt hash</Label>
          <Input
            id="check-hash"
            placeholder="$2a$10$…"
            value={checkHash}
            onChange={(e) => { setCheckHash(e.target.value); setCheckResult(null); }}
            className="font-mono text-xs"
          />
        </div>
        <Button onClick={check} disabled={!checkPlain || !checkHash || checkLoading}>
          {checkLoading ? "Checking…" : "Verify"}
        </Button>
        {checkResult !== null && (
          <div className={`rounded-md border p-3 text-sm font-semibold ${checkResult ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300" : "border-destructive bg-destructive/10 text-destructive"}`}>
            {checkResult ? "✓ Password matches the hash" : "✗ Password does not match"}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
