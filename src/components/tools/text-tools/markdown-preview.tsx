"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/copy-button";
import { marked } from "marked";
import DOMPurify from "dompurify";

const DEFAULT = `# My Document

## Introduction

Write your **Markdown** here and see a *live preview* on the right.

### Features
- Lists
- **Bold** and *italic*
- \`inline code\`
- [Links](https://example.com)

\`\`\`typescript
const greet = (name: string) => \`Hello, \${name}!\`;
\`\`\`

> "Simplicity is the ultimate sophistication."

---

| Name  | Age |
|-------|-----|
| Alice | 30  |
| Bob   | 25  |
`;

export default function MarkdownPreview() {
  const [md, setMd] = useState(DEFAULT);
  const [html, setHtml] = useState("");

  useEffect(() => {
    const result = marked.parse(md);
    setHtml(DOMPurify.sanitize(typeof result === "string" ? result : ""));
  }, [md]);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Markdown</Label>
          <Textarea className="h-[600px] resize-none font-mono text-sm" value={md} onChange={(e) => setMd(e.target.value)} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Preview</Label>
            <CopyButton text={html} label="Copy HTML" />
          </div>
          <div
            className="h-[600px] overflow-auto rounded-md border bg-background p-5 prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
}
