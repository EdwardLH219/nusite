# NuSite — Developer Handoff

A single-page marketing site for NuSite, a premium website redesign service targeting service businesses with outdated websites. Built with Next.js 16, React 19, Tailwind CSS 4, and Motion for React.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, metadata, fonts, global providers
│   ├── page.tsx             # Homepage — assembles all sections in order
│   ├── globals.css          # Design tokens, typography scale, component styles
│   ├── icon.svg             # Favicon
│   ├── robots.ts            # robots.txt generation
│   └── sitemap.ts           # sitemap.xml generation
├── components/
│   ├── ui/
│   │   └── button.tsx       # Base button (CVA variants, Base UI primitive)
│   ├── header.tsx           # Sticky header with scroll-aware blur
│   ├── footer.tsx           # Site footer
│   ├── hero.tsx             # Hero section with before/after wireframe mockup
│   ├── before-after-showcase.tsx  # Tabbed before/after case studies
│   ├── comparison.tsx       # Three-column "your options" comparison
│   ├── trust-section.tsx    # Reassurance promises grid
│   ├── preview-modal.tsx    # Lead capture modal (context, form, validation)
│   ├── preview-trigger.tsx  # Button that opens the preview modal
│   ├── heading.tsx          # Heading primitive (display/h1–h4, semantic tag)
│   ├── text.tsx             # Text primitive (sm/base/lg, muted/caption)
│   ├── eyebrow.tsx          # Uppercase section label
│   ├── section.tsx          # Section wrapper (background, padding, container)
│   ├── container.tsx        # Max-width + horizontal padding wrapper
│   ├── reveal.tsx           # Scroll-triggered animation wrappers
│   ├── browser-frame.tsx    # Browser chrome mockup frame
│   └── divider.tsx          # Horizontal rule with optional container
├── lib/
│   ├── content.ts           # All homepage copy and image paths
│   ├── motion.ts            # Animation variants, easing, transitions
│   ├── fonts.ts             # Google Font configuration (Geist)
│   └── utils.ts             # cn() helper (clsx + tailwind-merge)
public/
└── images/
    ├── IMAGES.md            # Required image assets guide with dimensions
    ├── og-image.png         # Open Graph image (1200×630)
    ├── hero/
    │   ├── before.png       # Hero before screenshot (placeholder pending)
    │   └── after.png        # Hero after screenshot (placeholder pending)
    └── showcase/
        ├── medical-practice/
        │   ├── before.png   # Case study screenshots
        │   └── after.png
        ├── law-firm/
        │   ├── before.png
        │   └── after.png
        └── consulting-firm/
            ├── before.png
            └── after.png
```

---

## Page structure

The homepage (`src/app/page.tsx`) is a linear conversion funnel. Sections render top to bottom in this order:

| # | Section | Component | Background | Purpose |
|---|---------|-----------|------------|---------|
| 1 | Hero | `<Hero />` | white | Hook — headline, subhead, CTAs, browser mockup, trust strip |
| 2 | Problem | inline in `page.tsx` | surface | Agitate — name the trust cost of an outdated site |
| 3 | Outcomes | inline in `page.tsx` | white | Promise — paint the better state |
| 4 | Before & After | `<BeforeAfterShowcase />` | surface | Prove — tabbed visual transformations |
| 5 | How It Works | inline in `page.tsx` | white | Clarify — three numbered steps |
| 6 | Comparison | `<Comparison />` | surface | Differentiate — vs doing nothing, vs agencies |
| 7 | Trust | `<TrustSection />` | white | De-risk — four reassurance promises |
| 8 | Final CTA | inline in `page.tsx` | dark | Close — single clear call to action |

Sections 2, 3, 5, and 8 are composed directly in `page.tsx` using shared primitives (`Section`, `Heading`, `Text`, `Reveal`). Sections 4, 6, and 7 are self-contained client components because they manage interactive state.

Background alternates white → surface → white → surface to create visual rhythm without explicit dividers.

---

## Component map

### Primitives (stateless, server-compatible)

| Component | File | What it does |
|-----------|------|--------------|
| `Heading` | `heading.tsx` | Renders display/h1–h4 with the correct font size class and semantic tag. `level` controls visual size, `as` overrides the HTML element. |
| `Text` | `text.tsx` | Renders body text at sm/base/lg with optional `muted` or `caption` color. |
| `Eyebrow` | `eyebrow.tsx` | Uppercase label for section openers. |
| `Section` | `section.tsx` | Wraps content in consistent padding and background. Accepts `background` (white/surface/muted/dark) and `padding` (default/lg/xl/none). |
| `Container` | `container.tsx` | Centers content with `max-w-6xl` (default), `max-w-3xl` (narrow), or `max-w-7xl` (wide) and horizontal padding. |
| `BrowserFrame` | `browser-frame.tsx` | Decorative browser chrome (three dots + toolbar) around any child content. |
| `Divider` | `divider.tsx` | Horizontal rule, optionally wrapped in a `Container`. |
| `Button` | `ui/button.tsx` | CVA-based button with variants: default (black), secondary (bordered), ghost, accent, link, link-accent. Sizes: sm, default, lg, xl. Built on Base UI's `Button` primitive. |

### Interactive (client components)

| Component | File | What it does |
|-----------|------|--------------|
| `Hero` | `hero.tsx` | Hero section. Contains staggered entrance animation, inline before/after wireframe mockups, and the trust strip. |
| `BeforeAfterShowcase` | `before-after-showcase.tsx` | Accessible tabbed interface showing before/after screenshots per business category. Keyboard navigable with `aria-selected`, `role="tabpanel"`. Falls back to wireframe placeholders when images aren't present. |
| `Comparison` | `comparison.tsx` | Three-card grid comparing "do nothing", "hire agency", and NuSite. The NuSite card has a shadow, benefit list, and a text-link CTA. |
| `TrustSection` | `trust-section.tsx` | Four reassurance items in a 2×2 grid with a closing paragraph. |
| `PreviewModal` | `preview-modal.tsx` | Full lead capture flow: context provider, modal overlay, form with client-side validation, success confirmation. Controls body scroll lock. |
| `PreviewTrigger` | `preview-trigger.tsx` | Button that calls `usePreviewModal().open()`. Drop it anywhere. |
| `Reveal` / `RevealGroup` / `RevealItem` | `reveal.tsx` | Scroll-triggered animation wrappers using `whileInView`. `RevealGroup` staggers its `RevealItem` children. |

---

## Where copy lives

**All homepage copy is in `src/lib/content.ts`.**

This file exports typed arrays and objects for every section:

| Export | Type | Used by |
|--------|------|---------|
| `images` | `{ og, hero: { before, after } }` | `layout.tsx`, `hero.tsx` |
| `problemPoints` | `ProblemPoint[]` | `page.tsx` (Problem section) |
| `outcomes` | `Outcome[]` | `page.tsx` (Outcomes section) |
| `showcaseItems` | `ShowcaseItem[]` | `before-after-showcase.tsx` |
| `steps` | `Step[]` | `page.tsx` (How It Works) |
| `alternatives` | `Alternative[]` | `comparison.tsx` |
| `nuSiteBenefits` | `string[]` | `comparison.tsx` |
| `reassurances` | `Reassurance[]` | `trust-section.tsx` |

To update copy, edit the arrays in `content.ts`. Components render from this data — no inline strings to hunt for.

**Exceptions** (copy that lives directly in components):

- Hero headline, subhead, and microcopy → `hero.tsx`
- Section intro headings and descriptions → `page.tsx`
- Final CTA block → `page.tsx`
- Header/footer text → `header.tsx`, `footer.tsx`
- Modal form labels and messages → `preview-modal.tsx`

These are structural copy tightly coupled to their layout, so extracting them would add indirection without a real benefit.

---

## Where images live

All static images go in `public/images/`. See `public/images/IMAGES.md` for the full asset list with recommended dimensions and formats.

| Asset | Path | Dimensions |
|-------|------|------------|
| OG image | `/images/og-image.png` | 1200 × 630 |
| Hero before | `/images/hero/before.png` | 1600 × 1000+ |
| Hero after | `/images/hero/after.png` | 1600 × 1000+ |
| Showcase before/after | `/images/showcase/{category}/before.png` | 800 × 600+ |
| Favicon | `src/app/icon.svg` | SVG |

The showcase component falls back to wireframe placeholders when image files are missing, so the site works without screenshots.

To add a new showcase category: add an entry to `showcaseItems` in `content.ts`, create a matching directory in `public/images/showcase/`, and drop in `before.png` and `after.png`.

---

## Where styles are controlled

### Design tokens and typography

`src/app/globals.css` is the single source of truth for:

- **Color tokens** — CSS custom properties under `:root` (background, foreground, primary, accent, border, etc.)
- **Typography scale** — Classes `.text-display` through `.text-caption` with fluid `clamp()` sizes, line-heights, tracking, and weights
- **Shadows** — `--shadow-xs` through `--shadow-xl` and `--shadow-mockup`
- **Radii** — `--radius-sm` through `--radius-2xl`
- **Component styles** — `.browser-frame`, `.divider`, `.image-elevated`, link styles

### Tailwind v4 configuration

Tailwind is configured CSS-first using `@theme inline` at the top of `globals.css`. There is no `tailwind.config.ts`. Token values (colors, fonts, radii, shadows) are registered in the `@theme inline` block so they're available as Tailwind utilities like `bg-surface`, `text-caption`, `shadow-mockup`.

### Motion

`src/lib/motion.ts` defines all animation presets:

- **Easing curves** — `ease.out`, `ease.inOut`, `ease.subtle`
- **Transitions** — `transition.fast` (150ms) through `transition.slower` (700ms)
- **Variants** — `fadeIn`, `fadeInUp`, `scaleIn`, `slideInLeft`, `slideInRight`
- **Stagger containers** — `staggerContainer` (80ms gap), `staggerContainerSlow` (120ms)
- **Viewport config** — `viewport` object with `once: true` and `-80px` margin

All scroll-triggered animations use the `Reveal` component family, which applies these variants via `whileInView`.

### Fonts

`src/lib/fonts.ts` loads Geist Sans and Geist Mono from Google Fonts via `next/font`. The CSS variables `--font-geist-sans` and `--font-geist-mono` are set on `<html>` and consumed by the `--font-sans` / `--font-mono` theme tokens.

---

## How the lead form works

The lead capture flow is entirely in `src/components/preview-modal.tsx`.

### Architecture

1. `PreviewModalProvider` wraps the app in `layout.tsx`. It provides `{ open }` via React Context.
2. Any `PreviewTrigger` button calls `open()` to show the modal.
3. The modal manages its own state: `form` data, `errors`, and `status` (idle → submitting → success/error).

### Form fields

| Field | Required | Validation |
|-------|----------|------------|
| Name | Yes | Non-empty |
| Email | Yes | Non-empty + email regex |
| Business name | Yes | Non-empty |
| Website URL | Yes | Non-empty + domain pattern |
| Note | No | None |

### Submission

`submitPreviewRequest()` is a stub that simulates a 1.2s network delay and logs to console. Replace this function with your actual API call (fetch to an endpoint, a server action, or a third-party form service).

### UX details

- Body scroll is locked while the modal is open.
- First input is auto-focused on open.
- Escape key closes the modal.
- Validation errors clear per-field as the user types.
- Success state shows a personalized confirmation with the submitted email address.
- Form resets 300ms after close (after the exit animation completes).

---

## Where to edit metadata

### Page metadata

`src/app/layout.tsx` exports a `metadata` object that controls:

- `<title>` and title template
- `<meta name="description">`
- `<meta name="keywords">`
- Open Graph tags (title, description, image, locale)
- Twitter card tags
- Robots directives

### SEO files

| File | Generates |
|------|-----------|
| `src/app/robots.ts` | `/robots.txt` |
| `src/app/sitemap.ts` | `/sitemap.xml` |
| `src/app/icon.svg` | Favicon |

These are file-based metadata using Next.js conventions. Edit the domain in `sitemap.ts` and `robots.ts` before launch (currently `https://nusite.com`). The `metadataBase` in `layout.tsx` should match.

---

## How to extend the site

### Adding a new page

Create `src/app/your-page/page.tsx`. It automatically gets the header, footer, and modal provider from the root layout. Export a `metadata` object for page-specific SEO (uses the title template `"%s — NuSite"`).

### Adding a new homepage section

1. Create the component in `src/components/`.
2. If it has structured content, add the data to `src/lib/content.ts`.
3. Add it to `src/app/page.tsx` in the desired position, wrapped in `<Section>`.
4. Use `Reveal` or `RevealGroup` + `RevealItem` for scroll animation.

### Adding a new showcase category

1. Add an entry to the `showcaseItems` array in `src/lib/content.ts`.
2. Create `public/images/showcase/{category-id}/` with `before.png` and `after.png`.
3. The tabbed interface picks it up automatically.

### Adding a new button variant or size

Edit the CVA config in `src/components/ui/button.tsx`. Add a new key under `variants.variant` or `variants.size`.

### Changing the color palette

Edit the CSS custom properties under `:root` in `src/app/globals.css`. The accent color (`--accent: #8c7a62`) is a warm bronze used sparingly for interactive emphasis. All other colors derive from the same block.

### Connecting the form to a backend

Replace the `submitPreviewRequest()` function in `src/components/preview-modal.tsx`. It receives a `PreviewFormData` object and should return `{ success: boolean }`. The rest of the UI (loading state, error handling, success confirmation) is already wired up.

---

## Key dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.2.1 | Framework (App Router) |
| `react` / `react-dom` | 19.2.4 | UI library |
| `tailwindcss` | 4.x | Utility CSS |
| `motion` | 12.x | Animation (Motion for React) |
| `@base-ui/react` | 1.x | Unstyled primitives (button) |
| `class-variance-authority` | 0.7.x | Component variant management |
| `clsx` + `tailwind-merge` | — | Class name composition |

### Commands

```bash
npm run dev      # Development server on localhost:3000
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
```
