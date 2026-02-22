"use client";

import dynamic from "next/dynamic";

// Formatter tools
const JsonFormatter = dynamic(() => import("@/components/tools/formatters/json-formatter"), { ssr: false });
const HtmlFormatter = dynamic(() => import("@/components/tools/formatters/html-formatter"), { ssr: false });
const CssFormatter = dynamic(() => import("@/components/tools/formatters/css-formatter"), { ssr: false });
const SqlFormatter = dynamic(() => import("@/components/tools/formatters/sql-formatter"), { ssr: false });
const XmlFormatter = dynamic(() => import("@/components/tools/formatters/xml-formatter"), { ssr: false });

// Converter tools
const JsonYaml = dynamic(() => import("@/components/tools/converters/json-yaml"), { ssr: false });
const JsonCsv = dynamic(() => import("@/components/tools/converters/json-csv"), { ssr: false });
const MarkdownHtml = dynamic(() => import("@/components/tools/converters/markdown-html"), { ssr: false });

// JS/TS utils
const RegexTester = dynamic(() => import("@/components/tools/js-ts/regex-tester"), { ssr: false });
const UuidGenerator = dynamic(() => import("@/components/tools/js-ts/uuid-generator"), { ssr: false });
const CronParser = dynamic(() => import("@/components/tools/js-ts/cron-parser"), { ssr: false });
const JsonSchemaValidator = dynamic(() => import("@/components/tools/js-ts/json-schema-validator"), { ssr: false });

// Encoders
const Base64Tool = dynamic(() => import("@/components/tools/encoders/base64-tool"), { ssr: false });
const UrlEncoder = dynamic(() => import("@/components/tools/encoders/url-encoder"), { ssr: false });
const JwtDecoder = dynamic(() => import("@/components/tools/encoders/jwt-decoder"), { ssr: false });
const HashGenerator = dynamic(() => import("@/components/tools/encoders/hash-generator"), { ssr: false });

// CSS tools
const ColorConverter = dynamic(() => import("@/components/tools/css-tools/color-converter"), { ssr: false });
const FlexboxGenerator = dynamic(() => import("@/components/tools/css-tools/flexbox-generator"), { ssr: false });
const GradientBuilder = dynamic(() => import("@/components/tools/css-tools/gradient-builder"), { ssr: false });
const BoxShadowGenerator = dynamic(() => import("@/components/tools/css-tools/box-shadow-generator"), { ssr: false });

// Text tools
const DiffChecker = dynamic(() => import("@/components/tools/text-tools/diff-checker"), { ssr: false });
const MarkdownPreview = dynamic(() => import("@/components/tools/text-tools/markdown-preview"), { ssr: false });
const LoremGenerator = dynamic(() => import("@/components/tools/text-tools/lorem-generator"), { ssr: false });
const CaseConverter = dynamic(() => import("@/components/tools/text-tools/case-converter"), { ssr: false });

const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
  "json-formatter": JsonFormatter,
  "html-formatter": HtmlFormatter,
  "css-formatter": CssFormatter,
  "sql-formatter": SqlFormatter,
  "xml-formatter": XmlFormatter,
  "json-yaml": JsonYaml,
  "json-csv": JsonCsv,
  "markdown-html": MarkdownHtml,
  "regex-tester": RegexTester,
  "uuid-generator": UuidGenerator,
  "cron-parser": CronParser,
  "json-schema-validator": JsonSchemaValidator,
  "base64": Base64Tool,
  "url-encoder": UrlEncoder,
  "jwt-decoder": JwtDecoder,
  "hash-generator": HashGenerator,
  "color-converter": ColorConverter,
  "flexbox-generator": FlexboxGenerator,
  "gradient-builder": GradientBuilder,
  "box-shadow-generator": BoxShadowGenerator,
  "diff-checker": DiffChecker,
  "markdown-preview": MarkdownPreview,
  "lorem-generator": LoremGenerator,
  "case-converter": CaseConverter,
};

export function ToolRenderer({ slug }: { slug: string }) {
  const ToolComponent = TOOL_COMPONENTS[slug];
  if (!ToolComponent) return null;
  return <ToolComponent />;
}
