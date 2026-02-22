"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import { Label } from "@/components/ui/label";
import { AlertCircle, Download } from "lucide-react";
import Papa from "papaparse";

export default function JsonCsv() {
  const [json, setJson] = useState("");
  const [csv, setCsv] = useState("");
  const [error, setError] = useState("");

  const toCsv = () => {
    if (!json.trim()) return;
    try {
      const parsed = JSON.parse(json);
      if (!Array.isArray(parsed)) throw new Error("Input must be a JSON array of objects.");
      setCsv(Papa.unparse(parsed));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const toJson = () => {
    if (!csv.trim()) return;
    try {
      const result = Papa.parse(csv, { header: true, skipEmptyLines: true });
      setJson(JSON.stringify(result.data, null, 2));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const downloadCsv = () => {
    if (!csv) return;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="flex items-start gap-2 rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <span className="font-mono">{error}</span>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>JSON (array of objects)</Label>
            <CopyButton text={json} />
          </div>
          <Textarea
            className="h-80 resize-none"
            placeholder='[{"name":"Alice","age":30},{"name":"Bob","age":25}]'
            value={json}
            onChange={(e) => { setJson(e.target.value); setError(""); }}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>CSV</Label>
            <CopyButton text={csv} />
          </div>
          <Textarea
            className="h-80 resize-none"
            placeholder="name,age&#10;Alice,30&#10;Bob,25"
            value={csv}
            onChange={(e) => { setCsv(e.target.value); setError(""); }}
          />
        </div>
      </div>
      <div className="flex gap-3 flex-wrap">
        <Button onClick={toCsv}>JSON → CSV</Button>
        <Button variant="outline" onClick={toJson}>CSV → JSON</Button>
        <Button variant="secondary" onClick={downloadCsv} disabled={!csv}>
          <Download className="h-4 w-4 mr-1.5" />
          Download CSV
        </Button>
        <Button variant="ghost" onClick={() => { setJson(""); setCsv(""); setError(""); }}>Clear</Button>
      </div>
    </div>
  );
}
