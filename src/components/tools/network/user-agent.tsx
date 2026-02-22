"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface UAInfo {
  rawUA: string;
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  deviceType: string;
  language: string;
  platform: string;
  cookiesEnabled: boolean;
  onLine: boolean;
  cores: number;
  memory: string;
  touchPoints: number;
}

function parseUA(ua: string): Partial<UAInfo> {
  let browser = "Unknown", browserVersion = "", os = "Unknown", osVersion = "", deviceType = "Desktop";

  // OS detection
  if (/Windows NT ([\d.]+)/.test(ua)) {
    os = "Windows";
    const v: Record<string, string> = { "10.0": "10/11", "6.3": "8.1", "6.2": "8", "6.1": "7" };
    osVersion = v[RegExp.$1] || RegExp.$1;
  } else if (/Mac OS X ([\d_]+)/.test(ua)) {
    os = "macOS";
    osVersion = RegExp.$1.replace(/_/g, ".");
  } else if (/Android ([\d.]+)/.test(ua)) {
    os = "Android"; osVersion = RegExp.$1; deviceType = "Mobile";
  } else if (/iPhone OS ([\d_]+)/.test(ua)) {
    os = "iOS"; osVersion = RegExp.$1.replace(/_/g, "."); deviceType = "Mobile";
  } else if (/Linux/.test(ua)) {
    os = "Linux";
  }

  if (/iPad/.test(ua)) deviceType = "Tablet";

  // Browser detection (order matters)
  if (/Edg\/([\d.]+)/.test(ua)) {
    browser = "Microsoft Edge"; browserVersion = RegExp.$1;
  } else if (/OPR\/([\d.]+)/.test(ua)) {
    browser = "Opera"; browserVersion = RegExp.$1;
  } else if (/Chrome\/([\d.]+)/.test(ua)) {
    browser = "Chrome"; browserVersion = RegExp.$1;
  } else if (/Firefox\/([\d.]+)/.test(ua)) {
    browser = "Firefox"; browserVersion = RegExp.$1;
  } else if (/Safari\/([\d.]+)/.test(ua) && /Version\/([\d.]+)/.test(ua)) {
    browser = "Safari"; browserVersion = RegExp.$1;
  }

  return { browser, browserVersion, os, osVersion, deviceType };
}

export default function UserAgent() {
  const [info, setInfo] = useState<UAInfo | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent;
    const parsed = parseUA(ua);
    const nav = navigator as Navigator & { deviceMemory?: number };
    setInfo({
      rawUA: ua,
      browser: parsed.browser ?? "Unknown",
      browserVersion: parsed.browserVersion ?? "",
      os: parsed.os ?? "Unknown",
      osVersion: parsed.osVersion ?? "",
      deviceType: parsed.deviceType ?? "Desktop",
      language: navigator.language,
      platform: navigator.platform,
      cookiesEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      cores: navigator.hardwareConcurrency ?? 0,
      memory: nav.deviceMemory ? `~${nav.deviceMemory} GB` : "N/A",
      touchPoints: navigator.maxTouchPoints,
    });
  }, []);

  if (!info) return null;

  const rows: [string, string][] = [
    ["Browser", info.browser + (info.browserVersion ? ` ${info.browserVersion}` : "")],
    ["Operating System", info.os + (info.osVersion ? ` ${info.osVersion}` : "")],
    ["Device Type", info.deviceType],
    ["Platform", info.platform],
    ["Language", info.language],
    ["CPU Cores", String(info.cores)],
    ["Device Memory", info.memory],
    ["Max Touch Points", String(info.touchPoints)],
    ["Cookies Enabled", info.cookiesEnabled ? "Yes" : "No"],
    ["Online Status", info.onLine ? "Online" : "Offline"],
  ];

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="space-y-1">
        <Label>Raw User-Agent string</Label>
        <div className="flex gap-2">
          <code className="flex-1 rounded-md border bg-muted px-3 py-2 text-xs font-mono break-all">
            {info.rawUA}
          </code>
          <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(info.rawUA); toast.success("Copied!"); }}>
            Copy
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <tbody>
              {rows.map(([k, v]) => (
                <tr key={k} className="border-b last:border-0">
                  <td className="px-4 py-2 font-medium text-muted-foreground w-40 shrink-0">{k}</td>
                  <td className="px-4 py-2 font-mono">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
