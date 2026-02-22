"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import { Label } from "@/components/ui/label";
import { format } from "sql-formatter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SqlDialect = "sql" | "mysql" | "postgresql" | "tsql" | "sqlite";

export default function SqlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [dialect, setDialect] = useState<SqlDialect>("sql");

  const handleFormat = () => {
    if (!input.trim()) { setOutput(""); setError(""); return; }
    try {
      setOutput(format(input, { language: dialect, tabWidth: 2, keywordCase: "upper" }));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Input SQL</Label>
          <Textarea
            className="h-80 resize-none"
            placeholder="select * from users where id=1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Output</Label>
            <CopyButton text={output} />
          </div>
          <Textarea
            className="h-80 resize-none"
            readOnly
            value={error || output}
            placeholder="Formatted SQL will appear here..."
          />
        </div>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Label className="shrink-0">Dialect</Label>
          <Select value={dialect} onValueChange={(v) => setDialect(v as SqlDialect)}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sql">Standard SQL</SelectItem>
              <SelectItem value="mysql">MySQL</SelectItem>
              <SelectItem value="postgresql">PostgreSQL</SelectItem>
              <SelectItem value="tsql">T-SQL</SelectItem>
              <SelectItem value="sqlite">SQLite</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleFormat}>Format</Button>
        <Button variant="ghost" onClick={() => { setInput(""); setOutput(""); setError(""); }}>Clear</Button>
      </div>
    </div>
  );
}
