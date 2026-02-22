"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Wrench, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { ToolSearchDialog } from "@/components/tool-search-dialog";

export function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ctrl+K / Cmd+K shortcut
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      setSearchOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 max-w-7xl flex h-14 items-center gap-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <Wrench className="h-5 w-5 text-primary" />
            <span>DevTools</span>
          </Link>

          <div className="flex-1" />

          {/* Search trigger */}
          <Button
            variant="outline"
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 h-9 px-3 text-sm text-muted-foreground w-48 justify-between"
            aria-label="Search tools"
          >
            <span className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5" />
              Search tools…
            </span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌃</span>K
            </kbd>
          </Button>

          {/* Mobile search icon */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setSearchOpen(true)}
            aria-label="Search tools"
          >
            <Search className="h-4 w-4" />
          </Button>

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </header>

      <ToolSearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
