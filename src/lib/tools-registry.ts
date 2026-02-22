export type ToolCategory =
  | "formatters"
  | "converters"
  | "js-ts"
  | "encoders"
  | "css-tools"
  | "text-tools";

export interface Tool {
  slug: string;
  title: string;
  description: string;
  category: ToolCategory;
  icon: string;
  keywords: string[];
}

export const CATEGORIES: Record<ToolCategory, { label: string; description: string; color: string }> = {
  formatters: {
    label: "Formatters",
    description: "Beautify and format code",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  },
  converters: {
    label: "Converters",
    description: "Convert between data formats",
    color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  },
  "js-ts": {
    label: "JS / TS Utils",
    description: "JavaScript & TypeScript utilities",
    color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  },
  encoders: {
    label: "Encoders",
    description: "Encode, decode & hash data",
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  },
  "css-tools": {
    label: "CSS Tools",
    description: "Visual CSS generators",
    color: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
  },
  "text-tools": {
    label: "Text Tools",
    description: "Text manipulation utilities",
    color: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  },
};

export const TOOLS: Tool[] = [
  // Formatters
  {
    slug: "json-formatter",
    title: "JSON Formatter",
    description: "Prettify, minify, and validate JSON. Syntax error detection included.",
    category: "formatters",
    icon: "Braces",
    keywords: ["json", "format", "beautify", "minify", "validate"],
  },
  {
    slug: "html-formatter",
    title: "HTML Formatter",
    description: "Beautify and minify HTML markup with configurable indentation.",
    category: "formatters",
    icon: "Code2",
    keywords: ["html", "format", "beautify", "markup"],
  },
  {
    slug: "css-formatter",
    title: "CSS Formatter",
    description: "Format and minify CSS stylesheets.",
    category: "formatters",
    icon: "Paintbrush",
    keywords: ["css", "format", "beautify", "stylesheet"],
  },
  {
    slug: "sql-formatter",
    title: "SQL Formatter",
    description: "Format SQL queries with keyword highlighting and proper indentation.",
    category: "formatters",
    icon: "Database",
    keywords: ["sql", "query", "format", "database"],
  },
  {
    slug: "xml-formatter",
    title: "XML Formatter",
    description: "Prettify and minify XML documents.",
    category: "formatters",
    icon: "FileCode",
    keywords: ["xml", "format", "beautify"],
  },
  // Converters
  {
    slug: "json-yaml",
    title: "JSON ↔ YAML",
    description: "Bidirectional conversion between JSON and YAML formats.",
    category: "converters",
    icon: "ArrowLeftRight",
    keywords: ["json", "yaml", "convert", "transform"],
  },
  {
    slug: "json-csv",
    title: "JSON ↔ CSV",
    description: "Convert flat JSON arrays to CSV and back. Supports download.",
    category: "converters",
    icon: "Table",
    keywords: ["json", "csv", "convert", "spreadsheet"],
  },
  {
    slug: "markdown-html",
    title: "Markdown → HTML",
    description: "Convert Markdown to HTML with live split preview.",
    category: "converters",
    icon: "FileText",
    keywords: ["markdown", "html", "convert", "preview"],
  },
  // JS/TS Utils
  {
    slug: "regex-tester",
    title: "Regex Tester",
    description: "Test regular expressions with real-time match highlighting and capture groups.",
    category: "js-ts",
    icon: "Regex",
    keywords: ["regex", "regexp", "pattern", "match", "test"],
  },
  {
    slug: "uuid-generator",
    title: "UUID Generator",
    description: "Generate v4 UUIDs in bulk. Copy one or all.",
    category: "js-ts",
    icon: "Fingerprint",
    keywords: ["uuid", "guid", "generate", "random", "id"],
  },
  {
    slug: "cron-parser",
    title: "Cron Parser",
    description: "Translate cron expressions into human-readable descriptions with next run times.",
    category: "js-ts",
    icon: "Clock",
    keywords: ["cron", "schedule", "expression", "parse"],
  },
  {
    slug: "json-schema-validator",
    title: "JSON Schema Validator",
    description: "Validate JSON data against a JSON Schema (Draft 7 / 2020-12).",
    category: "js-ts",
    icon: "ShieldCheck",
    keywords: ["json", "schema", "validate", "ajv"],
  },
  // Encoders
  {
    slug: "base64",
    title: "Base64 Encode / Decode",
    description: "Encode and decode text or files to/from Base64.",
    category: "encoders",
    icon: "Binary",
    keywords: ["base64", "encode", "decode"],
  },
  {
    slug: "url-encoder",
    title: "URL Encoder / Decoder",
    description: "Encode and decode URL components and full URLs.",
    category: "encoders",
    icon: "Link",
    keywords: ["url", "uri", "encode", "decode", "percent"],
  },
  {
    slug: "jwt-decoder",
    title: "JWT Decoder",
    description: "Decode JWT header and payload. Checks expiry and signature format.",
    category: "encoders",
    icon: "KeyRound",
    keywords: ["jwt", "token", "decode", "auth"],
  },
  {
    slug: "hash-generator",
    title: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text.",
    category: "encoders",
    icon: "Hash",
    keywords: ["hash", "md5", "sha", "sha256", "sha512", "checksum"],
  },
  // CSS Tools
  {
    slug: "color-converter",
    title: "Color Converter",
    description: "Convert colors between HEX, RGB, HSL, and HSV with a visual picker.",
    category: "css-tools",
    icon: "Palette",
    keywords: ["color", "hex", "rgb", "hsl", "convert", "picker"],
  },
  {
    slug: "flexbox-generator",
    title: "Flexbox Generator",
    description: "Visually build Flexbox layouts and copy the generated CSS.",
    category: "css-tools",
    icon: "LayoutTemplate",
    keywords: ["flexbox", "flex", "css", "layout", "generator"],
  },
  {
    slug: "gradient-builder",
    title: "Gradient Builder",
    description: "Build linear and radial CSS gradients with live preview.",
    category: "css-tools",
    icon: "Blend",
    keywords: ["gradient", "css", "linear", "radial", "background"],
  },
  {
    slug: "box-shadow-generator",
    title: "Box Shadow Generator",
    description: "Create CSS box shadows with sliders and live preview.",
    category: "css-tools",
    icon: "Square",
    keywords: ["box-shadow", "shadow", "css", "generator"],
  },
  // Text Tools
  {
    slug: "diff-checker",
    title: "Diff Checker",
    description: "Compare two text blocks side-by-side with colored additions and removals.",
    category: "text-tools",
    icon: "GitCompare",
    keywords: ["diff", "compare", "text", "difference"],
  },
  {
    slug: "markdown-preview",
    title: "Markdown Preview",
    description: "Write Markdown and see a live rendered preview side-by-side.",
    category: "text-tools",
    icon: "Eye",
    keywords: ["markdown", "preview", "render", "md"],
  },
  {
    slug: "lorem-generator",
    title: "Lorem Ipsum Generator",
    description: "Generate placeholder text by paragraph, sentence, or word count.",
    category: "text-tools",
    icon: "AlignLeft",
    keywords: ["lorem", "ipsum", "placeholder", "text", "dummy"],
  },
  {
    slug: "case-converter",
    title: "Case Converter",
    description: "Convert text between camelCase, PascalCase, snake_case, kebab-case, and more.",
    category: "text-tools",
    icon: "CaseSensitive",
    keywords: ["case", "camel", "pascal", "snake", "kebab", "convert"],
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return TOOLS.filter((t) => t.category === category);
}
