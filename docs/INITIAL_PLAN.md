## Plan: Online Developer Tools Site

A Next.js 14 (App Router) site with shadcn/ui hosting 20+ self-contained developer tools across 6 categories. Each tool is a focused, single-page utility — no login, no backend, all processing client-side. The project structure is intentionally uniform so an AI agent can scaffold every new tool by following the same pattern.

---

**Steps**

**1. Project Bootstrap**
- Run `create-next-app` with TypeScript, Tailwind, App Router, `src/` directory, and `@` path alias in OnlineSimpleDevTools
- Install and init shadcn/ui (`npx shadcn@latest init`)
- Add a `components.json` shadcn config targeting `src/components/ui/`
- Configure `next.config.ts` for client-only libs (transpile Monaco if needed)

**2. Project Structure**
Define the canonical layout so every tool follows it without deviation:
```
src/
  app/
    page.tsx                  ← homepage / tool directory
    layout.tsx                ← root layout, ThemeProvider, dark mode
    tools/
      [slug]/
        page.tsx              ← tool page (metadata + ToolLayout wrapper)
  components/
    layout/
      SiteHeader.tsx
      ToolLayout.tsx          ← shared wrapper: title, description, copy button
    tools/
      formatters/
      converters/
      js-ts/
      encoders/
      css-tools/
      text-tools/
  lib/
    tools-registry.ts         ← single source of truth for all tool metadata
    utils.ts
```

**3. Tools Registry** (`src/lib/tools-registry.ts`)
A typed array of tool metadata — `slug`, `title`, `description`, `category`, `icon`. The homepage and nav are generated from this, so adding a new tool only requires one entry here + a new component.

**4. Shared Components**
- `SiteHeader` — logo, search bar to filter tools, dark/light mode toggle (shadcn `Button` + `DropdownMenu`)
- `ToolLayout` — consistent wrapper: tool title, description badge, input/output panels, copy-to-clipboard button
- `CopyButton` — reusable clipboard copy with feedback toast (`sonner`)

**5. Install Key Client Libraries**
| Purpose | Library |
|---|---|
| JSON/CSS/HTML/SQL formatting | `prettier` (browser build via CDN/dynamic import) |
| YAML convert | `js-yaml` |
| CSV convert | `papaparse` |
| Code editor input | `@uiw/react-codemirror` + language extensions |
| JWT decode | `jwt-decode` |
| Hash generation | `crypto-js` |
| Diff checker | `diff` |
| Markdown preview | `marked` + `dompurify` |
| Color utilities | `culori` |

**6. Implement Tools by Category**

*Formatters* (`src/components/tools/formatters/`)
- `JsonFormatter` — prettify / minify, auto-detect errors, highlight syntax
- `HtmlFormatter` — via prettier/html parser
- `CssFormatter` — via prettier/css parser
- `SqlFormatter` — via `sql-formatter` lib
- `XmlFormatter` — via `fast-xml-parser`

*Converters* (`src/components/tools/converters/`)
- `JsonYamlConverter` — bidirectional, live preview
- `JsonCsvConverter` — flat JSON ↔ CSV, download button
- `MarkdownHtmlConverter` — live split preview

*JS/TS Utils* (`src/components/tools/js-ts/`)
- `RegexTester` — pattern + flags + test string → match highlights
- `UuidGenerator` — v4, bulk generate, copy all
- `CronParser` — human-readable cron expression description
- `JsonSchemaValidator` — validate JSON against a schema (`ajv`)

*Encoders/Decoders* (`src/components/tools/encoders/`)
- `Base64Tool` — encode/decode text and file
- `UrlEncoder` — encode/decode URI components
- `JwtDecoder` — decode header + payload, expiry check
- `HashGenerator` — MD5, SHA-1, SHA-256, SHA-512 output from text input

*CSS Tools* (`src/components/tools/css-tools/`)
- `ColorConverter` — HEX ↔ RGB ↔ HSL, color picker preview
- `FlexboxGenerator` — visual toggles → live CSS + copy
- `GradientBuilder` — linear/radial, color stops, live preview + CSS output
- `BoxShadowGenerator` — sliders → live shadow preview + CSS output

*Text Tools* (`src/components/tools/text-tools/`)
- `DiffChecker` — side-by-side or unified diff, colored additions/removals
- `MarkdownPreview` — editor + rendered preview split pane
- `LoremGenerator` — paragraphs/sentences/words, copy
- `CaseConverter` — camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE

**7. Homepage Tool Directory**
- Grid of cards generated from `tools-registry.ts`, grouped by category
- Search/filter by name or category (client-side, no server needed)
- Each card: icon, title, short description, link to `/tools/[slug]`

**8. Polish**
- Dark mode via shadcn's `ThemeProvider` (system default)
- `next/font` with Geist or Inter
- `<head>` metadata per tool page for SEO (`generateMetadata`)
- 404 fallback for unknown slugs

---

**Verification**
- `npm run dev` → visit `localhost:3000`, confirm homepage grid renders
- Navigate to each tool, run a sample input through it
- `npm run build` → confirm no SSR/client-only import errors (Monaco, prettier browser builds are common gotchas — use `dynamic(() => import(...), { ssr: false })`)
- Lighthouse audit on one tool page (target 90+ performance since everything is client-side)

---

**Decisions**
- All processing is **client-side only** — no API routes needed, keeps it static-deployable to any CDN
- shadcn/ui chosen over raw Tailwind — gives accessible, consistent UI primitives the agent can compose without designing from scratch
- `tools-registry.ts` as a single registry — agent can be told "add an entry here and create the component" without touching nav, homepage, or routing code
- CodeMirror over Monaco — lighter bundle, easier SSR bypass, sufficient for these use cases