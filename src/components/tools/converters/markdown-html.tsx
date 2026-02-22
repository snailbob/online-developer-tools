"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/copy-button";
import { Label } from "@/components/ui/label";
import { marked } from "marked";
import DOMPurify from "dompurify";

const DEFAULT_MD = `# Hello World

This is a **Markdown** preview.

- Item one
- Item two
- Item three

> Blockquote example

\`\`\`js
console.log("Hello!");
\`\`\`
`;

export default function MarkdownHtml() {
  const [markdown, setMarkdown] = useState(DEFAULT_MD);
  const [html, setHtml] = useState("");

  useEffect(() => {
    const result = marked.parse(markdown);
    const clean = DOMPurify.sanitize(typeof result === "string" ? result : "");
    setHtml(clean);
  }, [markdown]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Markdown</Label>
          <Textarea
            className="h-[500px] resize-none"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>HTML Preview</Label>
            <CopyButton text={html} label="Copy HTML" />
          </div>
          <div
            className="h-[500px] overflow-auto rounded-md border bg-background p-4 text-sm prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
}
