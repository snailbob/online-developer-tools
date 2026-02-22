export type ToolCategory =
  | "formatters"
  | "converters"
  | "js-ts"
  | "encoders"
  | "css-tools"
  | "text-tools"
  | "security"
  | "generators"
  | "network";

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
  security: {
    label: "Security & Crypto",
    description: "Hashing, HMAC, bcrypt and encryption",
    color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
  },
  generators: {
    label: "Generators",
    description: "Generate passwords, passphrases, PINs and codes",
    color: "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300",
  },
  network: {
    label: "Network & Web",
    description: "URL, user-agent and web utilities",
    color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
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
  // ── Additional Text Tools ────────────────────────────────────────────────
  {
    slug: "word-counter",
    title: "Word Counter",
    description: "Instantly count words, characters, lines, and sentences as you type.",
    category: "text-tools",
    icon: "BarChart2",
    keywords: ["word", "character", "count", "lines", "sentences"],
  },
  {
    slug: "line-sorter",
    title: "Line Sorter",
    description: "Sort lines alphanumerically, reverse, shuffle, or add line numbers.",
    category: "text-tools",
    icon: "ArrowUpDown",
    keywords: ["sort", "lines", "reverse", "shuffle", "text"],
  },
  {
    slug: "whitespace-remover",
    title: "Whitespace Remover",
    description: "Remove leading and trailing whitespace from each line instantly.",
    category: "text-tools",
    icon: "Eraser",
    keywords: ["whitespace", "trim", "spaces", "indent", "clean"],
  },
  {
    slug: "slug-generator",
    title: "Slug Generator",
    description: "Convert text to SEO-friendly URL slugs as you type.",
    category: "text-tools",
    icon: "Link2",
    keywords: ["slug", "url", "seo", "kebab", "permalink"],
  },
  {
    slug: "text-hex",
    title: "Text ↔ HEX",
    description: "Bidirectional conversion between plain text and hexadecimal.",
    category: "text-tools",
    icon: "Hexagon",
    keywords: ["hex", "text", "convert", "hexadecimal", "encode"],
  },
  // ── Network & Web ────────────────────────────────────────────────────────
  {
    slug: "url-parser",
    title: "URL Parser",
    description: "Split a URL into protocol, host, path, query params and fragment.",
    category: "network",
    icon: "Globe",
    keywords: ["url", "parse", "query", "params", "uri"],
  },
  {
    slug: "user-agent",
    title: "My User Agent",
    description: "Inspect your browser user-agent string with OS, browser and device info.",
    category: "network",
    icon: "Monitor",
    keywords: ["user-agent", "browser", "os", "device", "navigator"],
  },
  // ── Additional JSON Tools ────────────────────────────────────────────────
  {
    slug: "json-minifier",
    title: "JSON Minifier",
    description: "Collapse JSON to the smallest possible representation.",
    category: "formatters",
    icon: "Minimize2",
    keywords: ["json", "minify", "compress", "minifier"],
  },
  {
    slug: "json-escape",
    title: "JSON Escape / Unescape",
    description: "Escape or unescape special characters inside JSON string values.",
    category: "formatters",
    icon: "Quote",
    keywords: ["json", "escape", "unescape", "string"],
  },
  {
    slug: "json-validator",
    title: "JSON Validator",
    description: "Validate JSON syntax with line-number error reports.",
    category: "formatters",
    icon: "CheckSquare",
    keywords: ["json", "validate", "lint", "syntax"],
  },
  // ── Additional XML Tools ─────────────────────────────────────────────────
  {
    slug: "xml-minifier",
    title: "XML Minifier",
    description: "Strip whitespace and comments from XML to reduce file size.",
    category: "formatters",
    icon: "Minimize2",
    keywords: ["xml", "minify", "compress"],
  },
  {
    slug: "xml-escape",
    title: "XML Escape / Unescape",
    description: "Escape or unescape XML entities like &amp;, &lt;, &gt;.",
    category: "formatters",
    icon: "Shield",
    keywords: ["xml", "escape", "unescape", "entities"],
  },
  {
    slug: "xml-validator",
    title: "XML Validator",
    description: "Validate XML structure and detect parse errors with line reports.",
    category: "formatters",
    icon: "CheckSquare",
    keywords: ["xml", "validate", "lint", "syntax"],
  },
  {
    slug: "xml-json",
    title: "XML ↔ JSON",
    description: "Bidirectional conversion between XML and JSON formats.",
    category: "converters",
    icon: "ArrowLeftRight",
    keywords: ["xml", "json", "convert", "transform"],
  },
  // ── YAML Tools ───────────────────────────────────────────────────────────
  {
    slug: "yaml-validator",
    title: "YAML Validator",
    description: "Validate YAML syntax and get detailed line-by-line error reports.",
    category: "formatters",
    icon: "CheckSquare",
    keywords: ["yaml", "validate", "lint", "syntax"],
  },
  // ── SQL Tools ────────────────────────────────────────────────────────────
  {
    slug: "sql-minifier",
    title: "SQL Minifier",
    description: "Strip comments and collapse whitespace in SQL queries.",
    category: "formatters",
    icon: "Minimize2",
    keywords: ["sql", "minify", "compress", "database"],
  },
  {
    slug: "sql-escape",
    title: "SQL Escape",
    description: "Escape special characters in SQL strings to prevent injection.",
    category: "formatters",
    icon: "ShieldAlert",
    keywords: ["sql", "escape", "injection", "security"],
  },
  // ── HTML Tools ───────────────────────────────────────────────────────────
  {
    slug: "html-minifier",
    title: "HTML Minifier",
    description: "Collapse whitespace and strip comments from HTML.",
    category: "formatters",
    icon: "Minimize2",
    keywords: ["html", "minify", "compress"],
  },
  {
    slug: "html-escape",
    title: "HTML Escape / Unescape",
    description: "Escape or unescape HTML entities like &amp;, &lt;, &gt;.",
    category: "formatters",
    icon: "Code",
    keywords: ["html", "escape", "unescape", "entities", "encode"],
  },
  {
    slug: "html-stripper",
    title: "HTML Stripper",
    description: "Remove all HTML tags and return plain text content.",
    category: "formatters",
    icon: "RemoveFormatting",
    keywords: ["html", "strip", "tags", "plain text"],
  },
  {
    slug: "html-encoder",
    title: "HTML Encoder / Decoder",
    description: "Encode or decode all HTML character entities in text.",
    category: "encoders",
    icon: "FileCode2",
    keywords: ["html", "entity", "encode", "decode"],
  },
  {
    slug: "html-validator",
    title: "HTML Validator",
    description: "Check HTML structure for common errors using the browser's DOMParser.",
    category: "formatters",
    icon: "CheckSquare",
    keywords: ["html", "validate", "lint", "syntax"],
  },
  // ── Markdown Tools ───────────────────────────────────────────────────────
  {
    slug: "html-markdown",
    title: "HTML → Markdown",
    description: "Convert HTML documents or fragments to clean Markdown.",
    category: "converters",
    icon: "FileDown",
    keywords: ["html", "markdown", "convert"],
  },
  // ── JS Tools ─────────────────────────────────────────────────────────────
  {
    slug: "js-beautifier",
    title: "JavaScript Beautifier",
    description: "Format and beautify JavaScript or TypeScript code.",
    category: "js-ts",
    icon: "Code2",
    keywords: ["javascript", "js", "beautify", "format", "prettier"],
  },
  {
    slug: "js-escape",
    title: "JavaScript Escape / Unescape",
    description: "Escape or unescape special characters in JavaScript strings.",
    category: "js-ts",
    icon: "Quote",
    keywords: ["javascript", "js", "escape", "unescape", "string"],
  },
  // ── CSS Tools ────────────────────────────────────────────────────────────
  {
    slug: "css-minifier",
    title: "CSS Minifier",
    description: "Strip comments and whitespace from CSS to reduce file size.",
    category: "css-tools",
    icon: "Minimize2",
    keywords: ["css", "minify", "compress"],
  },
  // ── Base Encodings ───────────────────────────────────────────────────────
  {
    slug: "base32",
    title: "Base32 Encode / Decode",
    description: "Encode text to Base32 or decode Base32 back to text. Includes HEX conversion.",
    category: "encoders",
    icon: "Binary",
    keywords: ["base32", "encode", "decode", "hex"],
  },
  {
    slug: "base58",
    title: "Base58 Encode / Decode",
    description: "Encode text to Base58 or decode Base58 back to text. Includes HEX conversion.",
    category: "encoders",
    icon: "Binary",
    keywords: ["base58", "encode", "decode", "bitcoin", "hex"],
  },
  {
    slug: "base64-image",
    title: "Base64 ↔ Image",
    description: "Convert an image file to Base64 or render a Base64 string as an image.",
    category: "encoders",
    icon: "Image",
    keywords: ["base64", "image", "convert", "encode", "decode"],
  },
  // ── Security & Crypto ────────────────────────────────────────────────────
  {
    slug: "hmac-generator",
    title: "HMAC Generator",
    description: "Generate HMAC with a secret key using MD5, SHA-1, SHA-256, SHA-512 and more.",
    category: "security",
    icon: "KeyRound",
    keywords: ["hmac", "hash", "sha", "md5", "secret", "signature"],
  },
  {
    slug: "bcrypt",
    title: "Bcrypt Generator / Checker",
    description: "Hash text with bcrypt and verify passwords against existing hashes.",
    category: "security",
    icon: "LockKeyhole",
    keywords: ["bcrypt", "hash", "password", "verify", "security"],
  },
  // ── Generators ───────────────────────────────────────────────────────────
  {
    slug: "password-generator",
    title: "Password Generator",
    description: "Securely generate strong random passwords with configurable rules.",
    category: "generators",
    icon: "KeySquare",
    keywords: ["password", "generate", "random", "secure", "strong"],
  },
  {
    slug: "passphrase-generator",
    title: "Passphrase Generator",
    description: "Generate strong random passphrases from a built-in word list.",
    category: "generators",
    icon: "BookKey",
    keywords: ["passphrase", "words", "generate", "random", "diceware"],
  },
  {
    slug: "pin-generator",
    title: "PIN Generator",
    description: "Securely generate random numeric PINs of configurable length.",
    category: "generators",
    icon: "Hash",
    keywords: ["pin", "number", "generate", "random", "numeric"],
  },
  // ── QR Code Tools ────────────────────────────────────────────────────────
  {
    slug: "qr-generator",
    title: "QR Code Generator",
    description: "Generate a QR code from any text. Download as PNG.",
    category: "generators",
    icon: "QrCode",
    keywords: ["qr", "qrcode", "generate", "scan", "barcode"],
  },
  {
    slug: "qr-reader",
    title: "QR Code Reader",
    description: "Extract text from a QR code image. Processed entirely in your browser.",
    category: "generators",
    icon: "ScanLine",
    keywords: ["qr", "qrcode", "read", "scan", "decode"],
  },
  // ── PHP Tools ────────────────────────────────────────────────────────────
  {
    slug: "php-json",
    title: "PHP Array ↔ JSON",
    description: "Convert PHP array syntax to JSON and back.",
    category: "converters",
    icon: "Braces",
    keywords: ["php", "array", "json", "convert"],
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return TOOLS.filter((t) => t.category === category);
}
