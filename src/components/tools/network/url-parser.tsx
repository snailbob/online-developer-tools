"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface ParsedUrl {
  protocol: string;
  username: string;
  password: string;
  hostname: string;
  port: string;
  pathname: string;
  params: [string, string][];
  hash: string;
  origin: string;
  href: string;
}

function parseUrl(raw: string): ParsedUrl | null {
  try {
    const u = new URL(raw.includes("://") ? raw : `https://${raw}`);
    return {
      protocol: u.protocol,
      username: u.username,
      password: u.password,
      hostname: u.hostname,
      port: u.port,
      pathname: u.pathname,
      params: Array.from(u.searchParams.entries()),
      hash: u.hash,
      origin: u.origin,
      href: u.href,
    };
  } catch {
    return null;
  }
}

export default function UrlParser() {
  const [input, setInput] = useState("");
  const parsed = input ? parseUrl(input) : null;

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="space-y-1">
        <Label>URL</Label>
        <Input
          placeholder="https://user:pass@example.com:8080/path?key=value#section"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="font-mono text-sm"
        />
      </div>

      {input && !parsed && (
        <p className="text-sm text-destructive">Invalid URL</p>
      )}

      {parsed && (
        <div className="space-y-3">
          <Card>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["Protocol", parsed.protocol],
                    ["Hostname", parsed.hostname],
                    ["Port", parsed.port || "(default)"],
                    ["Path", parsed.pathname],
                    ["Hash", parsed.hash || "(none)"],
                    ["Username", parsed.username || "(none)"],
                    ["Password", parsed.password || "(none)"],
                    ["Origin", parsed.origin],
                  ].map(([k, v]) => (
                    <tr key={k} className="border-b last:border-0">
                      <td className="px-4 py-2 font-medium text-muted-foreground w-32 shrink-0">{k}</td>
                      <td className="px-4 py-2 font-mono break-all">{v}</td>
                      <td className="px-4 py-2">
                        <Button size="sm" variant="ghost" className="h-6 text-xs" onClick={() => { navigator.clipboard.writeText(v); toast.success("Copied!"); }}>
                          Copy
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {parsed.params.length > 0 && (
            <div className="space-y-1">
              <Label>Query parameters ({parsed.params.length})</Label>
              <Card>
                <CardContent className="p-0">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Key</th>
                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parsed.params.map(([k, v], i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="px-4 py-2 font-mono">{k}</td>
                          <td className="px-4 py-2 font-mono break-all">{decodeURIComponent(v)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
