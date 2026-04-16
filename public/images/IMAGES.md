# NuSite — Image Asset Guide

All image paths are referenced from `src/lib/content.ts` and `src/app/layout.tsx`.
Drop files into the corresponding directories and they will appear on the site automatically.

## Required Assets

### Open Graph / Social Sharing

| File | Path | Dimensions | Format | Notes |
|------|------|-----------|--------|-------|
| OG image | `/images/og-image.png` | 1200 × 630 | PNG | Shown when the site is shared on social media. Should include NuSite wordmark, a short tagline, and optionally a before/after visual. Keep text large — it renders small in feeds. |

### Favicon / App Icons

| File | Path | Dimensions | Format | Notes |
|------|------|-----------|--------|-------|
| Favicon | `src/app/icon.svg` | 32 × 32 | SVG | Already exists. Black square with white "N". |
| Apple touch icon | `src/app/apple-icon.png` | 180 × 180 | PNG | Optional. Create if you want a custom iOS home screen icon. Next.js picks it up automatically from the app directory. |

### Hero Section (split before/after visual)

The hero currently uses abstract CSS wireframes. To replace them with real screenshots:

| File | Path | Dimensions | Format | Notes |
|------|------|-----------|--------|-------|
| Hero before | `/images/hero/before.png` | 1200 × 900 (4:3) | PNG/WebP | Screenshot of an outdated website. Crop to show the full above-the-fold area. |
| Hero after | `/images/hero/after.png` | 1200 × 900 (4:3) | PNG/WebP | Screenshot of the same business after redesign. Same crop framing as the before image. |

> The hero component would need a small code update to swap wireframes for images. The before/after showcase component already handles this pattern — use it as reference.

### Before / After Showcase

Each tab in the showcase section needs a matched pair. Images referenced in `src/lib/content.ts` → `showcaseItems`.

| Business | Before path | After path | Dimensions | Format |
|----------|------------|-----------|-----------|--------|
| Medical Practice | `/images/showcase/medical-practice/before.png` | `/images/showcase/medical-practice/after.png` | 800 × 600 (4:3) | PNG/WebP |
| Law Firm | `/images/showcase/law-firm/before.png` | `/images/showcase/law-firm/after.png` | 800 × 600 (4:3) | PNG/WebP |
| Consulting Firm | `/images/showcase/consulting-firm/before.png` | `/images/showcase/consulting-firm/after.png` | 800 × 600 (4:3) | PNG/WebP |

These display inside a browser-frame mockup component. The component renders abstract wireframe fallbacks when images are missing, so images can be added incrementally.

## Image Guidelines

- **Format**: PNG for screenshots with text. WebP for anything that benefits from smaller file size.
- **Resolution**: Provide at 2× the display size for Retina screens (the dimensions above are already at 2×).
- **Compression**: Run through a tool like Squoosh, TinyPNG, or ImageOptim before committing.
- **Consistency**: All before/after pairs should use the same viewport width and crop framing.
- **Tone**: Screenshots should look realistic — real businesses, real websites. Avoid stock-looking mockups.

## Adding a New Showcase Category

1. Create the directory: `public/images/showcase/{category-id}/`
2. Add `before.png` and `after.png`
3. Add an entry to the `showcaseItems` array in `src/lib/content.ts`
4. The component handles the rest (tabs, transitions, captions)
