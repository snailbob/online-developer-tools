"use client";

import dynamic from "next/dynamic";

// Formatter tools
const JsonFormatter = dynamic(() => import("@/components/tools/formatters/json-formatter"), { ssr: false });
const HtmlFormatter = dynamic(() => import("@/components/tools/formatters/html-formatter"), { ssr: false });
const CssFormatter = dynamic(() => import("@/components/tools/formatters/css-formatter"), { ssr: false });
const SqlFormatter = dynamic(() => import("@/components/tools/formatters/sql-formatter"), { ssr: false });
const XmlFormatter = dynamic(() => import("@/components/tools/formatters/xml-formatter"), { ssr: false });
const JsonMinifier = dynamic(() => import("@/components/tools/formatters/json-minifier"), { ssr: false });
const JsonEscape = dynamic(() => import("@/components/tools/formatters/json-escape"), { ssr: false });
const JsonValidator = dynamic(() => import("@/components/tools/formatters/json-validator"), { ssr: false });
const XmlMinifier = dynamic(() => import("@/components/tools/formatters/xml-minifier"), { ssr: false });
const XmlEscape = dynamic(() => import("@/components/tools/formatters/xml-escape"), { ssr: false });
const XmlValidator = dynamic(() => import("@/components/tools/formatters/xml-validator"), { ssr: false });
const YamlValidator = dynamic(() => import("@/components/tools/formatters/yaml-validator"), { ssr: false });
const SqlMinifier = dynamic(() => import("@/components/tools/formatters/sql-minifier"), { ssr: false });
const SqlEscape = dynamic(() => import("@/components/tools/formatters/sql-escape"), { ssr: false });
const HtmlMinifier = dynamic(() => import("@/components/tools/formatters/html-minifier"), { ssr: false });
const HtmlEscape = dynamic(() => import("@/components/tools/formatters/html-escape"), { ssr: false });
const HtmlStripper = dynamic(() => import("@/components/tools/formatters/html-stripper"), { ssr: false });
const HtmlValidator = dynamic(() => import("@/components/tools/formatters/html-validator"), { ssr: false });

// Converter tools
const JsonYaml = dynamic(() => import("@/components/tools/converters/json-yaml"), { ssr: false });
const JsonCsv = dynamic(() => import("@/components/tools/converters/json-csv"), { ssr: false });
const MarkdownHtml = dynamic(() => import("@/components/tools/converters/markdown-html"), { ssr: false });
const XmlJson = dynamic(() => import("@/components/tools/converters/xml-json"), { ssr: false });
const HtmlMarkdown = dynamic(() => import("@/components/tools/converters/html-markdown"), { ssr: false });
const PhpJson = dynamic(() => import("@/components/tools/converters/php-json"), { ssr: false });

// JS/TS utils
const RegexTester = dynamic(() => import("@/components/tools/js-ts/regex-tester"), { ssr: false });
const UuidGenerator = dynamic(() => import("@/components/tools/js-ts/uuid-generator"), { ssr: false });
const CronParser = dynamic(() => import("@/components/tools/js-ts/cron-parser"), { ssr: false });
const JsonSchemaValidator = dynamic(() => import("@/components/tools/js-ts/json-schema-validator"), { ssr: false });
const JsBeautifier = dynamic(() => import("@/components/tools/js-ts/js-beautifier"), { ssr: false });
const JsEscape = dynamic(() => import("@/components/tools/js-ts/js-escape"), { ssr: false });

// Encoders
const Base64Tool = dynamic(() => import("@/components/tools/encoders/base64-tool"), { ssr: false });
const UrlEncoder = dynamic(() => import("@/components/tools/encoders/url-encoder"), { ssr: false });
const JwtDecoder = dynamic(() => import("@/components/tools/encoders/jwt-decoder"), { ssr: false });
const HashGenerator = dynamic(() => import("@/components/tools/encoders/hash-generator"), { ssr: false });
const HtmlEncoder = dynamic(() => import("@/components/tools/encoders/html-encoder"), { ssr: false });
const Base32 = dynamic(() => import("@/components/tools/encoders/base32"), { ssr: false });
const Base58 = dynamic(() => import("@/components/tools/encoders/base58"), { ssr: false });
const Base64Image = dynamic(() => import("@/components/tools/encoders/base64-image"), { ssr: false });

// CSS tools
const ColorConverter = dynamic(() => import("@/components/tools/css-tools/color-converter"), { ssr: false });
const FlexboxGenerator = dynamic(() => import("@/components/tools/css-tools/flexbox-generator"), { ssr: false });
const GradientBuilder = dynamic(() => import("@/components/tools/css-tools/gradient-builder"), { ssr: false });
const BoxShadowGenerator = dynamic(() => import("@/components/tools/css-tools/box-shadow-generator"), { ssr: false });
const CssMinifier = dynamic(() => import("@/components/tools/css-tools/css-minifier"), { ssr: false });

// Text tools
const DiffChecker = dynamic(() => import("@/components/tools/text-tools/diff-checker"), { ssr: false });
const MarkdownPreview = dynamic(() => import("@/components/tools/text-tools/markdown-preview"), { ssr: false });
const LoremGenerator = dynamic(() => import("@/components/tools/text-tools/lorem-generator"), { ssr: false });
const CaseConverter = dynamic(() => import("@/components/tools/text-tools/case-converter"), { ssr: false });
const WordCounter = dynamic(() => import("@/components/tools/text-tools/word-counter"), { ssr: false });
const LineSorter = dynamic(() => import("@/components/tools/text-tools/line-sorter"), { ssr: false });
const WhitespaceRemover = dynamic(() => import("@/components/tools/text-tools/whitespace-remover"), { ssr: false });
const SlugGenerator = dynamic(() => import("@/components/tools/text-tools/slug-generator"), { ssr: false });
const TextHex = dynamic(() => import("@/components/tools/text-tools/text-hex"), { ssr: false });

// Security & Crypto
const HmacGenerator = dynamic(() => import("@/components/tools/security/hmac-generator"), { ssr: false });
const Bcrypt = dynamic(() => import("@/components/tools/security/bcrypt"), { ssr: false });

// Generators
const PasswordGenerator = dynamic(() => import("@/components/tools/generators/password-generator"), { ssr: false });
const PassphraseGenerator = dynamic(() => import("@/components/tools/generators/passphrase-generator"), { ssr: false });
const PinGenerator = dynamic(() => import("@/components/tools/generators/pin-generator"), { ssr: false });
const QrGenerator = dynamic(() => import("@/components/tools/generators/qr-generator"), { ssr: false });
const QrReader = dynamic(() => import("@/components/tools/generators/qr-reader"), { ssr: false });

// Network & Web
const UrlParser = dynamic(() => import("@/components/tools/network/url-parser"), { ssr: false });
const UserAgent = dynamic(() => import("@/components/tools/network/user-agent"), { ssr: false });

const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
  // Formatters
  "json-formatter": JsonFormatter,
  "html-formatter": HtmlFormatter,
  "css-formatter": CssFormatter,
  "sql-formatter": SqlFormatter,
  "xml-formatter": XmlFormatter,
  "json-minifier": JsonMinifier,
  "json-escape": JsonEscape,
  "json-validator": JsonValidator,
  "xml-minifier": XmlMinifier,
  "xml-escape": XmlEscape,
  "xml-validator": XmlValidator,
  "yaml-validator": YamlValidator,
  "sql-minifier": SqlMinifier,
  "sql-escape": SqlEscape,
  "html-minifier": HtmlMinifier,
  "html-escape": HtmlEscape,
  "html-stripper": HtmlStripper,
  "html-validator": HtmlValidator,
  // Converters
  "json-yaml": JsonYaml,
  "json-csv": JsonCsv,
  "markdown-html": MarkdownHtml,
  "xml-json": XmlJson,
  "html-markdown": HtmlMarkdown,
  "php-json": PhpJson,
  // JS/TS
  "regex-tester": RegexTester,
  "uuid-generator": UuidGenerator,
  "cron-parser": CronParser,
  "json-schema-validator": JsonSchemaValidator,
  "js-beautifier": JsBeautifier,
  "js-escape": JsEscape,
  // Encoders
  "base64": Base64Tool,
  "url-encoder": UrlEncoder,
  "jwt-decoder": JwtDecoder,
  "hash-generator": HashGenerator,
  "html-encoder": HtmlEncoder,
  "base32": Base32,
  "base58": Base58,
  "base64-image": Base64Image,
  // CSS tools
  "color-converter": ColorConverter,
  "flexbox-generator": FlexboxGenerator,
  "gradient-builder": GradientBuilder,
  "box-shadow-generator": BoxShadowGenerator,
  "css-minifier": CssMinifier,
  // Text tools
  "diff-checker": DiffChecker,
  "markdown-preview": MarkdownPreview,
  "lorem-generator": LoremGenerator,
  "case-converter": CaseConverter,
  "word-counter": WordCounter,
  "line-sorter": LineSorter,
  "whitespace-remover": WhitespaceRemover,
  "slug-generator": SlugGenerator,
  "text-hex": TextHex,
  // Security & Crypto
  "hmac-generator": HmacGenerator,
  "bcrypt": Bcrypt,
  // Generators
  "password-generator": PasswordGenerator,
  "passphrase-generator": PassphraseGenerator,
  "pin-generator": PinGenerator,
  "qr-generator": QrGenerator,
  "qr-reader": QrReader,
  // Network & Web
  "url-parser": UrlParser,
  "user-agent": UserAgent,
};

export function ToolRenderer({ slug }: { slug: string }) {
  const ToolComponent = TOOL_COMPONENTS[slug];
  if (!ToolComponent) return null;
  return <ToolComponent />;
}
