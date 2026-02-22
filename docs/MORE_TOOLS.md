## Plan: Expand Tools from Community Reference List

The project's initial 24 tools are all done. This plan adds ~62 new tools drawn from the reference list. All tools process data client-side (no server calls), matching the app's existing architecture. New tools follow the exact same pattern: register in tools-registry.ts, create a component under tools, wire in tool-renderer.tsx.

The `ToolCategory` type and `CATEGORIES` map will be extended with new categories. Existing categories absorb closely related tools; distinct new domains get their own category.

---

### New Categories to Add to tools-registry.ts

| New Category Key | Label | Color |
|---|---|---|
| `security` | Security & Crypto | indigo |
| `generators` | Generators | teal |
| `network` | Network & Web | cyan |

---

### Phase 1 — Zero New Dependencies (pure JS / existing libs)

These use native browser APIs, `crypto-js` (already installed), `js-yaml`, `fast-xml-parser`, `marked`, `papaparse`, `diff` — all already in package.json.

**Text Tools** → text-tools
- `word-counter` — Word Counter: live word, character, line, sentence counts
- `line-sorter` — Line Sorter: alpha/reverse sort, shuffle, add line numbers
- `whitespace-remover` — Whitespace Remover: trim leading/trailing whitespace per line
- `slug-generator` — Slug Generator: convert text to SEO-friendly URL slug
- `text-hex` — Text ↔ HEX: bidirectional text-to-hex and hex-to-text conversion

**URL Tools** (new tools into `encoders/` or new `network` category)
- `url-parser` — URL Parser: split URL into protocol, host, path, query params using `new URL()`

**JSON Tools** → formatters
- `json-minifier` — JSON Minifier: collapse JSON to smallest possible size
- `json-escape` — JSON Escape / Unescape: escape or unescape JSON string values
- `json-validator` — JSON Validator: syntax-only validation with line-number errors

**XML Tools** → formatters
- `xml-minifier` — XML Minifier: strip whitespace from XML (`fast-xml-parser` already installed)
- `xml-escape` — XML Escape / Unescape: escape `<>'"&` in XML strings
- `xml-validator` — XML Validator: detect parse errors using `fast-xml-parser`
- `xml-json` — XML ↔ JSON: bidirectional using `fast-xml-parser`

**YAML Tools** → formatters
- `yaml-validator` — YAML Validator: validate YAML syntax using `js-yaml`

**SQL Tools** → formatters
- `sql-escape` — SQL Escape: escape special characters to prevent SQL injection
- `sql-minifier` — SQL Minifier: strip comments and excess whitespace from SQL

**HTML Tools** → new `src/components/tools/html-tools/`
- `html-escape` — HTML Escape / Unescape: encode/decode `&`, `<`, `>`, `"`, `'` via native DOM
- `html-stripper` — HTML Stripper: remove all HTML tags, return plain text

**Markdown Tools** → converters
- `html-markdown` — HTML → Markdown: reverse of existing `markdown-html`

**Generators** → new `src/components/tools/generators/`
- `password-generator` — Password Generator: configurable length/charset, uses `crypto.getRandomValues()`
- `passphrase-generator` — Passphrase Generator: word-based secure passphrases from a built-in wordlist
- `pin-generator` — PIN Generator: numeric PIN of configurable length

**Network / Web** → new `src/components/tools/network/`
- `user-agent` — My User Agent: display and parse `navigator.userAgent`, OS, browser, device type

**Hash Tools** (expand existing `hash-generator` into individual tools or expand the existing tool)
- Add SHA-224, SHA-384, SHA-3, RIPEMD-160 to the existing `hash-generator` component (all supported by `crypto-js`)
- `hmac-generator` — HMAC Generator: generate HMAC with selectable algorithm (MD5/SHA-1/SHA-224/SHA-256/SHA-384/SHA-512/SHA-3/RIPEMD-160) and secret key

---

### Phase 2 — Minimal New Dependencies

Install 1–3 small, browser-friendly packages for these tool groups.

**JS Beautifier / Minifier** — install `prettier` (browser-friendly standalone) or `js-beautify`
- `js-beautifier` — JavaScript Beautifier: format JS/TS code
- `js-minifier` — JavaScript Minifier: minify JS using `terser` (has a browser build)
- `js-escape` — JavaScript Escape / Unescape: escape string literals for safe JS embedding

**HTML Minifier** — install `html-minifier-terser` (works in browser via its UMD build)
- `html-minifier` — HTML Minifier: collapse whitespace, strip comments
- `html-encoder` — HTML Encoder / Decoder: full HTML entity encode/decode (install `he`)
- `html-validator` — HTML Validator: simple structural validation using native `DOMParser`

**CSS Minifier / Validator** — install `clean-css` (browser bundle available) or use regex-based minification
- `css-minifier` — CSS Minifier: strip comments and whitespace
- `css-validator` — CSS Validator: use native `CSSStyleSheet.replace()` API or lightweight parser

**Base Encoding** — install `hi-base32` and `bs58`
- `base32` — Base32 Encode / Decode + Base32 ↔ HEX
- `base58` — Base58 Encode / Decode + Base58 ↔ HEX
- `base64-hex` — Base64 ↔ HEX converter (extends existing base64 tool or standalone)

**Bcrypt** — install `bcryptjs` (pure JS, no native bindings, browser-safe)
- `bcrypt-generator` — Bcrypt Generator: hash text with configurable salt rounds
- `bcrypt-checker` — Bcrypt Checker: verify plaintext against a known bcrypt hash

**QR Code** — install `qrcode` (browser build) + `jsqr` (for reading)
- `qr-generator` — QR Code Generator: generate QR from text, downloadable as PNG
- `qr-reader` — QR Code Reader: upload/paste image, extract text using `jsqr` (no upload — file read via `FileReader` API)

**HTML → Markdown** — install `turndown`
- (already listed in Phase 1 as `html-markdown`, depends on `turndown`)

**PHP Array → JSON** — no library needed, implement a custom PHP array string parser
- `php-json` — PHP Array ↔ JSON: parse PHP `array(...)` / `[...]` syntax into JSON and back

**Base64 ↔ Image**
- `base64-image` — Base64 ↔ Image: paste base64 to preview image, or drag-drop image to get base64 string — uses `FileReader` API, no library needed

---

### New package.json Dependencies Summary

```
bcryptjs, @types/bcryptjs
js-beautify, @types/js-beautify
terser (browser-compatible)
html-minifier-terser
he, @types/he
hi-base32
bs58
qrcode, @types/qrcode
jsqr
turndown, @types/turndown
```

For `clean-css` — evaluate whether the existing CSS formatter already minifies; if yes, the CSS minifier can reuse that logic without a new package.

---

### Registry & Renderer Changes

1. **tools-registry.ts** — extend `ToolCategory` union with `"security" | "generators" | "network"`, add 3 entries to `CATEGORIES`, add ~62 new `Tool` entries to `TOOLS`
2. **tool-renderer.tsx** — add one `dynamic()` import per new slug (all with `{ ssr: false }`)
3. New directories: `src/components/tools/html-tools/`, `src/components/tools/generators/`, `src/components/tools/network/`

---

### Verification

- Run `npm run build` — no TS type errors for new category keys or missing imports
- Run `npm run dev` — navigate to each new `/tools/[slug]` route and test core functionality
- Confirm QR round-trip: generate a QR → feed back to reader → original text returned
- Confirm bcrypt: hash a string → verify with checker → returns true; wrong password → false
- Confirm "My IP" is **excluded** (it needs an external API call, breaking the browser-only constraint; "My User Agent" is kept as it reads `navigator.userAgent` locally)

---

**Decisions**
- Chose to keep "My IP" out — requires fetching an external service, violating the browser-only constraint
- Chose `bcryptjs` over native Web Crypto for bcrypt — Web Crypto doesn't include bcrypt
- Chose to expand the existing `hash-generator` component (add SHA-224/384/SHA-3/RIPEMD-160) rather than creating 8 separate hash tool pages — less registry clutter
- Chose `jsqr` over `zxing-js` for QR reading — smaller, browser-only without WASM complexity
- PHP Array ↔ JSON implemented without a library — PHP array syntax is parseable with a regex/recursive descent approach