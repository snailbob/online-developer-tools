import Link from "next/link";
import { TOOLS, CATEGORIES, type ToolCategory } from "@/lib/tools-registry";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";

function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const LucideIcon = (Icons as unknown as Record<string, React.ComponentType<LucideProps>>)[name];
  if (!LucideIcon) return <Icons.Wrench {...props} />;
  return <LucideIcon {...props} />;
}

const categoryOrder: ToolCategory[] = [
  "formatters",
  "converters",
  "js-ts",
  "encoders",
  "css-tools",
  "text-tools",
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold tracking-tight">Online Developer Tools</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Fast, free, and privacy-friendly. All processing happens in your browser — nothing is sent to a server.
        </p>
        <p className="text-sm text-muted-foreground">
          {TOOLS.length} tools across {categoryOrder.length} categories
        </p>
      </section>

      {/* Category sections */}
      {categoryOrder.map((cat) => {
        const catMeta = CATEGORIES[cat];
        const tools = TOOLS.filter((t) => t.category === cat);
        return (
          <section key={cat} className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold">{catMeta.label}</h2>
              <span className="text-sm text-muted-foreground">{catMeta.description}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tools.map((tool) => (
                <Link key={tool.slug} href={`/tools/${tool.slug}`}>
                  <Card className="h-full hover:shadow-md hover:border-primary/50 transition-all cursor-pointer group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 p-2 rounded-md bg-muted group-hover:bg-primary/10 transition-colors">
                          <DynamicIcon name={tool.icon} className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div className="space-y-1 min-w-0">
                          <CardTitle className="text-base">{tool.title}</CardTitle>
                          <CardDescription className="text-xs line-clamp-2">
                            {tool.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
