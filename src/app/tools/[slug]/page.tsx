import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getToolBySlug, TOOLS } from "@/lib/tools-registry";
import { ToolLayout } from "@/components/layout/tool-layout";
import { ToolRenderer } from "@/components/tool-renderer";

export async function generateStaticParams() {
  return TOOLS.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: tool.title,
    description: tool.description,
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  return (
    <ToolLayout title={tool.title} description={tool.description} category={tool.category}>
      <ToolRenderer slug={slug} />
    </ToolLayout>
  );
}
