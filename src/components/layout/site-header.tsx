"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 max-w-7xl flex h-14 items-center gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <Wrench className="h-5 w-5 text-primary" />
          <span>DevTools</span>
        </Link>

        <div className="flex-1" />

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
  );
}
