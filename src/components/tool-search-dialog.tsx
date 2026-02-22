"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Search, X, ArrowRight } from "lucide-react";
import { TOOLS, CATEGORIES, type Tool } from "@/lib/tools-registry";

interface ToolSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function highlight(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-primary/20 text-primary rounded-sm px-0.5">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function filterTools(query: string): Tool[] {
  const q = query.toLowerCase().trim();
  if (!q) return TOOLS;
  return TOOLS.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      CATEGORIES[t.category].label.toLowerCase().includes(q) ||
      t.keywords.some((k) => k.toLowerCase().includes(q))
  );
}

export function ToolSearchDialog({ open, onOpenChange }: ToolSearchDialogProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = filterTools(query);

  // Reset when opening
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  // Keep active item in view
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function navigate(tool: Tool) {
    router.push(`/tools/${tool.slug}`);
    onOpenChange(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[activeIndex]) navigate(results[activeIndex]);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed left-1/2 top-[15%] z-50 w-full max-w-lg -translate-x-1/2 rounded-xl border bg-background shadow-2xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-left-1/2"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            inputRef.current?.focus();
          }}
        >
          <Dialog.Title className="sr-only">Search tools</Dialog.Title>

          {/* Search input */}
          <div className="flex items-center gap-3 border-b px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search tools…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ESC
            </kbd>
          </div>

          {/* Results list */}
          <div
            ref={listRef}
            className="max-h-[400px] overflow-y-auto overscroll-contain p-2"
          >
            {results.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted-foreground">
                No tools found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              <>
                {query === "" && (
                  <p className="px-3 pb-1 pt-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    All tools ({TOOLS.length})
                  </p>
                )}
                {query !== "" && results.length > 0 && (
                  <p className="px-3 pb-1 pt-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {results.length} result{results.length !== 1 ? "s" : ""}
                  </p>
                )}
                {results.map((tool, i) => {
                  const cat = CATEGORIES[tool.category];
                  const isActive = i === activeIndex;
                  return (
                    <button
                      key={tool.slug}
                      data-index={i}
                      onClick={() => navigate(tool)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent/50"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium truncate">
                            {highlight(tool.title, query)}
                          </span>
                          <span
                            className={`shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${cat.color}`}
                          >
                            {cat.label}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground truncate">
                          {highlight(tool.description, query)}
                        </p>
                      </div>
                      <ArrowRight
                        className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-opacity ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </button>
                  );
                })}
              </>
            )}
          </div>

          {/* Footer hint */}
          <div className="flex items-center gap-4 border-t px-4 py-2 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <kbd className="inline-flex h-4 items-center rounded border bg-muted px-1 font-mono text-[10px]">↑</kbd>
              <kbd className="inline-flex h-4 items-center rounded border bg-muted px-1 font-mono text-[10px]">↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="inline-flex h-4 items-center rounded border bg-muted px-1 font-mono text-[10px]">↵</kbd>
              open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="inline-flex h-4 items-center rounded border bg-muted px-1 font-mono text-[10px]">ESC</kbd>
              close
            </span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
