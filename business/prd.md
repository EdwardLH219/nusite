# NuSite Website — Product Requirements (PRD)

> Cowork-generated, with **Tech Lead architecture input**. Versioned in `business/`. Cleared at G3 (look for the `g3-approved` git tag).

## Scope

**In scope**

- Single-page marketing site at `/` with 8 sequenced sections (hero, problem, outcomes, proof, process, pricing, reassurance, close)
- Free preview request modal (lead capture) reachable from every CTA on the page
- Before-and-after proof carousel with three verticals (Studio, Law, Medical) and case-specific imagery
- Comparison section anchoring the $299 price against alternatives
- Footer with secondary contact paths (`studio@nusite.ai`, phone, location)
- SEO essentials (sitemap, robots, OpenGraph + Twitter card metadata, structured data where relevant)
- Web vitals and accessibility targets met on every section

**Out of scope**

- The NuSite product itself (the website-generator) — lives in a separate repo
- Customer dashboards / authenticated app surfaces — owned by the product, not this marketing site
- Multi-page content (blog, case-study detail pages, separate `/about`, separate `/pricing`) — proof and pricing live inline on the home page
- A headless or hosted CMS — content lives in `src/lib/content.ts` and is edited by code commit
- Outbound campaign-specific landing page variants
- Investor / fundraising narrative

## Site structure

```
/                Home (single-page, 8 sections):
                   01 · Hero
                   02 · Problem
                   03 · Outcomes
                   04 · Proof (before/after, 3 verticals)
                   05 · Process
                   06 · Pricing (comparison)
                   07 · Reassurance
                   08 · Close (final CTA)
/sitemap.xml     Generated
/robots.txt      Generated
```

No other top-level routes. All section navigation is anchor links within `/`.

## Page-level requirements

### Home (`/`)

**01 · Hero**
- H1: *"The same business. A different first impression."*
- Sub: *"You run the business. We build the website that finally looks like it. Send us the URL — we'll show you the replacement, free."*
- Primary CTA: *"Get my free preview"* → opens `<PreviewModal>`
- Secondary CTA: *"See before & after"* → anchor to `#work`
- Promise strip: *"No commitment. See your preview first. Pay only if it feels right."*
- Hero stats strip (4 stats): 24 hours · $0 · 100% · One

**02 · Problem**
- Three pain points (referrals checking online, first impressions in under a second, invisible lost enquiries)
- No CTA — empathy-building only

**03 · Outcomes**
- H2: *"Look as good online as you do in person."*
- Four consequences (not features) of the new site going live
- No CTA — narrative continuation

**04 · Proof**
- Three vertical tabs in this exact order: **Studio · Law · Medical** (decision logged 2026-05-18 by `2e5c940`)
- Each tab: business name, location, key metric (`+2.1×`, `+52%`, `+38%`), URL, turnaround time, "what moved", quote, before/after image pair

**05 · Process**
- H2: *"Simple process. Serious result."*
- Three steps: URL in (Hour 0, 20-min call) → quiet build (Hours 1–20) → approve or walk (Hour 24)
- Final CTA: *"Get my free preview"* → opens `<PreviewModal>`

**06 · Pricing**
- Three-column comparison: Do nothing ($0 today, expensive over a year) · Hire a web agency ($8–25k + retainer) · NuSite ($299 flat, one-time, *Recommended*)
- Featured column visually distinguished
- CTA inside the recommended column → opens `<PreviewModal>`

**07 · Reassurance**
- Four objection-killers: approve before pay · own everything at the end · same-day calls · quiet by design (no upsell, no newsletter)

**08 · Close**
- H2: *"Send us your URL. See the replacement in 24 hours."*
- Primary CTA: *"Get my free preview"* → opens `<PreviewModal>`
- Secondary CTA: *"Or call us — (212) 555-0173"* → `tel:` link
- Mini: *"New York · United States · Mon–Fri, 09:00–18:00 ET · Replies within one business day."*

### Preview Modal (`<PreviewModal>`)

- Trigger: any primary CTA on `/`
- Fields (all required unless noted): Name, Business name, Email, Current website URL, Note (optional)
- Validation: client-side, with field-level error messages
- Submit destination: **TBD — currently a `console.log` stub** (`submitPreviewRequest` in `src/components/preview-modal.tsx`). Tracked in Open questions.
- Success state: *"We've received your details. We'll review {businessName}'s website and build a free preview of your new one. You'll hear from us at {email} within two business days."*
- Anti-spam: TBD (see Open questions)
- Accessibility: focus trap, `Esc` to close, first input auto-focused, `aria-modal`, `aria-labelledby`

## Functional requirements

- **FR-1 Lead capture.** Modal collects name, business name, email, current URL, optional note. Submission must reach a real destination (CRM, internal inbox, or webhook) — current stub is a regression risk. Validation is client-side; server-side validation required when destination is wired.
- **FR-2 Analytics.** Tool choice TBD. Required events when picked: `page_view`, `cta_click` (with section), `modal_open`, `modal_submit_success`, `modal_submit_error`, `phone_click`, `mailto_click`, `proof_tab_change`.
- **FR-3 SEO.** Indexable site, OpenGraph + Twitter card metadata (already in `src/app/layout.tsx`), generated `sitemap.xml` and `robots.txt`, descriptive title + description, structured data for organisation + service where appropriate.
- **FR-4 Accessibility.** WCAG 2.1 AA target. All interactive elements keyboard-reachable, focus states visible, modal traps focus, images have alt text, colour-contrast verified across the per-section hue palette.
- **FR-5 Content management.** Content lives in `src/lib/content.ts` (hero stats, problem points, outcomes, proof cases, process steps, comparison options, reassurances). Updates are code commits — no CMS.
- **FR-6 Secondary contact channels.** Phone (`tel:+12125550173`) and email (`mailto:studio@nusite.ai`) must remain present and clickable from both Close and Footer.

## Non-functional requirements

- **Performance.** LCP < 2.0s, INP < 200ms, CLS < 0.1 on 4G mobile. Hero image (`/images/hero/hero.png`) marked `priority`. Image weight budget: < 250KB for above-the-fold.
- **Reliability.** 99.9% uptime target (matches the host's SLA).
- **Security.** No secrets in the repo. Form submission endpoint (once wired) must use HTTPS, validate input server-side, rate-limit submissions. Standard security headers (CSP, X-Frame-Options, etc.) configured at the hosting layer.
- **Compliance.** GDPR-aware for any captured form data. Privacy notice + retention policy required before scaling outbound campaigns (TODO).
- **Browser support.** Latest two stable versions of Chrome, Safari, Firefox, Edge. Mobile Safari (iOS 16+) and Chrome Android (last two majors).

## Architecture (Tech Lead input)

**Stack (current, as built):**
- **Framework:** Next.js 16.2.1 (App Router)
- **Runtime:** React 19.2.4
- **Styling:** Tailwind CSS v4 + custom CSS (`globals.css`) for the per-section hue palette
- **Components:** shadcn primitives + `@base-ui/react` + custom (`src/components/`)
- **Animation:** `motion` (Framer Motion successor)
- **Icons:** `lucide-react`
- **Language:** TypeScript (strict)
- **Linting:** ESLint with `eslint-config-next`
- **Tests:** none currently configured — build + lint must pass

**Hosting / deployment — TBD.** Vercel is the default for Next.js App Router and the path of least resistance; alternatives (Cloudflare Pages, Netlify) are viable but no decision is logged. Tracked in Open questions.

**Form submission destination — TBD.** `src/components/preview-modal.tsx → submitPreviewRequest()` currently `console.log`s. Options: a NuSite-internal email inbox via Resend/Plunk/Loops, a CRM (HubSpot, Pipedrive), or a NuSite product API endpoint. Tracked in Open questions.

**Analytics — TBD.** No analytics integration in the codebase. Options: Plausible (privacy-friendly, GDPR-light), PostHog (richer funnel analysis), GA4 (free, heavy). Tracked in Open questions.

**Component sketch:**

```
src/
├── app/
│   ├── layout.tsx        # Header, Footer, PreviewModalProvider, metadata
│   ├── page.tsx          # Composes the 8 sections in order
│   ├── globals.css       # Hue palette, per-section tokens
│   ├── sitemap.ts        # Generated /sitemap.xml
│   └── robots.ts         # Generated /robots.txt
├── components/
│   ├── header.tsx
│   ├── footer.tsx
│   ├── section.tsx       # Section wrapper (number, name, hue)
│   ├── hero.tsx
│   ├── before-after-showcase.tsx  # Proof section (tabs + image pair)
│   ├── comparison.tsx
│   ├── trust-section.tsx          # Reassurance
│   ├── close.tsx
│   ├── preview-modal.tsx          # Lead capture (currently stubbed)
│   └── ui/                        # shadcn primitives
└── lib/
    ├── content.ts                 # All site copy
    ├── motion.ts
    ├── fonts.ts                   # Geist sans + mono
    └── utils.ts                   # cn() helper
```

## Constraints

- **Stack is fixed at Next.js + Tailwind + Motion.** Changes to the stack itself are out of scope for routine site work; they would be a separate, gated workstream.
- **Single-page architecture is deliberate.** Adding new top-level routes requires an explicit decision logged below — it works against the "everything in one cold-tolerant page" GTM choice.
- **Content lives in `src/lib/content.ts`.** No headless CMS. Editorial updates are commits.
- **No external scripts on the critical path** without a measured performance impact. Analytics, when added, must not regress the LCP target.
- **The proof case order (Studio · Law · Medical) is set by product decision.** Re-ordering requires an explicit decision logged below.

## Acceptance criteria (site-level)

- [ ] All 8 sections render on `/` in the order above with correct copy from `src/lib/content.ts`
- [ ] Preview modal opens from every CTA, validates client-side, submits to a real destination, and shows the success state
- [ ] Analytics events fire on staging *and* production for every event in FR-2
- [ ] Lighthouse / web-vitals targets met (LCP < 2.0s, INP < 200ms, CLS < 0.1) on 4G mobile for `/`
- [ ] Accessibility audit clean (WCAG 2.1 AA) — manual + automated (e.g. axe)
- [ ] OpenGraph + Twitter card metadata renders correctly when the URL is shared
- [ ] `sitemap.xml` and `robots.txt` are generated and reachable
- [ ] No console errors or warnings in production
- [ ] Phone (`tel:`) and email (`mailto:`) fallbacks work on iOS and Android
- [ ] Build (`npm run build`) and lint (`npm run lint`) pass cleanly

## Open questions

- [ ] **Where does the preview form actually submit to?** `submitPreviewRequest` is a stub. Pick a destination (email-via-transactional-API, CRM, or internal inbox) and wire it. Blocks any paid traffic.
- [ ] **Which analytics tool?** Plausible vs PostHog vs GA4. Decide before instrumenting FR-2.
- [ ] **Which host?** Vercel is the default-of-least-resistance for Next.js 16 App Router; confirm or pick an alternative.
- [ ] **Canonical domain.** Site metadata declares `nusite.com`; contact email is `studio@nusite.ai`. One should win. Update `metadataBase` and footer email together.
- [ ] **Anti-spam on the preview form.** None today. Decide: hCaptcha, Cloudflare Turnstile, honeypot, or trust the friction of the 4 required fields.
- [ ] **Privacy notice / GDPR.** Required before scaling outbound. Where does it live (a `/privacy` route is the obvious place even on a single-page site).
- [ ] **Phone number `(212) 555-0173`** in `src/components/close.tsx` — confirm this is the real number or replace before launch.

## Decision log

| Date | Decision | Rationale | Owner |
|------|----------|-----------|-------|
| 2026-05-18 | Proof case order: **Studio · Law · Medical** | Tests highest-credibility vertical first | Product Lead |
| 2026-05-18 | Studio location: **New York, NY** | Reflects studio move; confirms US-business positioning | Product Lead |
| 2026-05-18 | Price anchor: **$299 flat, one-time** | Differentiates sharply from agency pricing | Product Lead |
| 2026-05-18 | Turnaround claim: **24 hours from paid brief** | Differentiator vs agency lead times | Product Lead |
| 2026-05-18 | **No headless CMS** | Content velocity does not justify a CMS; commits are fine | Tech Lead |
| 2026-05-18 | **Single-page architecture** | One cold-tolerant page beats N landing variants for this funnel size | Product Lead + Tech Lead |

---

*Last updated: 2026-05-18 · Product Lead (R/A) + Tech Lead (C) · Review at every gate.*
