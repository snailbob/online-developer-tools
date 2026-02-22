import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES, ToolCategory } from "@/lib/tools-registry";

interface ToolLayoutProps {
  title: string;
  description: string;
  category: ToolCategory;
  children: ReactNode;
}

export function ToolLayout({ title, description, category, children }: ToolLayoutProps) {
  const cat = CATEGORIES[category];
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <Badge className={cat.color} variant="secondary">
            {cat.label}
          </Badge>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}
