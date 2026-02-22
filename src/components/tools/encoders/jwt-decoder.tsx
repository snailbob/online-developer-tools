"use client";

import { useState, useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { jwtDecode } from "jwt-decode";

export default function JwtDecoder() {
  const [token, setToken] = useState("");

  const decoded = useMemo(() => {
    if (!token.trim()) return null;
    try {
      const parts = token.split(".");
      if (parts.length !== 3) throw new Error("JWT must have 3 parts");
      const header = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
      const payload = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);
      const exp = (payload as Record<string, unknown>).exp as number | undefined;
      const isExpired = exp !== undefined && exp < now;
      const expiresIn = exp !== undefined ? (exp - now) : null;
      return { header, payload, isExpired, expiresIn, error: null };
    } catch (e) {
      return { header: null, payload: null, isExpired: false, expiresIn: null, error: (e as Error).message };
    }
  }, [token]);

  const format = (obj: unknown) => JSON.stringify(obj, null, 2);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>JWT Token</Label>
        <Textarea
          className="h-28 resize-none font-mono text-xs"
          placeholder="Paste your JWT token here..."
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <Button variant="ghost" size="sm" onClick={() => setToken("")}>Clear</Button>
      </div>

      {decoded?.error && (
        <p className="text-sm text-destructive font-mono">{decoded.error}</p>
      )}

      {decoded && !decoded.error && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {decoded.isExpired ? (
              <Badge variant="destructive">Expired</Badge>
            ) : decoded.expiresIn !== null ? (
              <Badge className="bg-green-100 text-green-700">
                Expires in {Math.floor(decoded.expiresIn / 3600)}h {Math.floor((decoded.expiresIn % 3600) / 60)}m
              </Badge>
            ) : (
              <Badge variant="secondary">No expiry</Badge>
            )}
            <Badge variant="outline">{(decoded.header as Record<string, string>)?.alg}</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Header</Label>
                <CopyButton text={format(decoded.header)} />
              </div>
              <Textarea className="h-36 resize-none font-mono text-xs" readOnly value={format(decoded.header)} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Payload</Label>
                <CopyButton text={format(decoded.payload)} />
              </div>
              <Textarea className="h-36 resize-none font-mono text-xs" readOnly value={format(decoded.payload)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
