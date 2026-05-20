# NuSite Website — GTM Narrative

> Cowork-generated, business-owned. Versioned in `business/`. The GTM narrative the marketing site embodies — the positioning, messaging and conversion motion the site exists to execute.

## Positioning

**NuSite is the $299, 24-hour website replacement service for independent professional businesses whose current site is quietly losing them referrals.**

Anchors:
- **Flat $299, one-time.** No retainer, no hourly billing, no surprise invoice.
- **24 hours from paid brief to live site.** No six-week agency cycle.
- **Free preview before you pay.** See the finished site on a staging link first; walk away owing nothing if it doesn't feel right.
- **Ownership at handover.** Code, copy, domain, photos — yours outright.
- **One studio, one number, same-day calls.** No ticket queues. No Slack channels. No Figma links.

## Target audience for the site

Same as the product ICP (see Business Overview):

- Architecture / design studios
- Law firms
- Medical / clinical practices
- Other independent professional service businesses with the same shape (the site illustrates with these three verticals but the positioning is deliberately portable)

**Buyer profile:** owner-operator or senior partner with decision authority. Site copy speaks directly to them ("You run the business — we build the website that finally looks like it"), not to a marketing manager.

**What this audience is NOT:** startups, SaaS companies, large enterprises, anyone shopping for a custom design system or a multi-month engagement.

## Messaging hierarchy

- **Headline:** *"The same business. A different first impression."*
- **Subhead:** *"You run the business. We build the website that finally looks like it. Send us the URL — we'll show you the replacement, free."*
- **Three proof points** (live in the hero strip as headline stats):
  1. **24 hours** — From paid brief to live site.
  2. **$0** — To see the preview. If it doesn't feel right, you walk.
  3. **100%** — You own the code, the copy, the domain. All of it.
  4. **One** — Phone call. We do the rest while you run the business.

(Strictly four stats in the hero, not three — the messaging hierarchy treats them as a single proof unit.)

## Page-level intents

The site is single-page (`/`) with 8 sequenced sections, each with one job:

- **01 · Hero — Welcome.** Primary intent: *primary CTA click → free-preview modal*. Secondary: scroll into proof.
- **02 · Problem.** Intent: name the silent pain (referrals checking you online, first impressions in under a second, lost enquiries are invisible). No CTA — this is empathy-building, not selling.
- **03 · Outcomes — What changes.** Intent: paint the after-state. Consequences, not features.
- **04 · Proof — Our work.** Intent: credibility via real before-and-after cases (Studio, Law, Medical, in that order — set explicitly by recent product decision). Visitor switches tabs to find their vertical.
- **05 · Process — How it works.** Intent: dissolve the "this sounds too good" objection by showing the three-step process (URL in → quiet build → approve or walk).
- **06 · Pricing — Comparison.** Intent: anchor $299 against doing nothing ($0 today, expensive over a year) and hiring an agency ($8–25k + retainer).
- **07 · Reassurance — No surprises.** Intent: kill remaining objections (approve before paying, full ownership, same-day calls, no upsell).
- **08 · Close — Get started.** Intent: final primary CTA + alternate channels (phone, mailto fallback in footer).

Every section that ends with a CTA points to the same `<PreviewModal>` — there is one conversion target on the site.

## Conversion motion

**Funnel:**

```
Cold visitor (any channel)
  → land on /
  → scroll through proof + process + pricing
  → click "Get my free preview" CTA
  → submit preview-request modal (name, business name, email, current URL, optional note)
  → success state: "We'll review your website and build a free preview… you'll hear from us within two business days"
  → NuSite studio reviews + builds preview offline
  → email back with staging link
  → owner approves (pays $299 once) or walks (owes nothing)
```

**CTAs by section:** Hero, Process, Pricing, Reassurance, and Close all feed the same modal. The "See before & after" secondary CTA in the hero is a soft-conversion path for visitors who need more proof first.

**Friction points to monitor:**
- The modal asks for four required fields (name, business name, email, current URL) plus one optional note. This is the deliberate friction — it pre-qualifies. Watch the CTA-click → submission rate.
- Phone fallback exists in the Close section (`(212) 555-0173`) and email fallback in the footer (`studio@nusite.ai`) for visitors who won't fill the form.

## Channels feeding into the site

Per the Business Overview: outbound, referrals, organic search, press / partner mentions.

**UTM convention — TODO for Edward.** Pick one (e.g. `utm_source / utm_medium / utm_campaign`) and adopt it consistently for outbound. The site itself doesn't need a per-channel landing page yet; one cold-tolerant home page is the design target.

**Outbound landing page variants — out of scope for now.** Revisit only if a channel surfaces a specific need.

## KPIs

| Tier | Metric | Baseline | Target |
|---|---|---|---|
| **Acquisition** | Visits / week | TODO once analytics is instrumented | TODO |
| **Acquisition** | Direct phone calls / week | TODO | TODO |
| **Activation** | Free preview requests / week (modal submissions) | TODO | TODO |
| **Activation** | CTA-click → modal-submit conversion rate | TODO | ≥ 30% (assumes pre-qualified intent — refine after first month of real data) |
| **Quality** | Preview-request → paid-build conversion rate | TODO | TODO once first cohort closes |
| **Quality** | Average time to reply (preview-request inbox → first email back) | TODO | < 2 business days, per the success-state copy |
| **Site health** | LCP / INP / CLS on `/` | TODO | LCP < 2.0s, INP < 200ms, CLS < 0.1 (4G mobile) |

All "TODO" rows are blocked on (a) analytics instrumentation and (b) the form submission destination being wired up — both tracked in the PRD as open questions.

---

*Last updated: 2026-05-18 · Owner: Ops / GTM · Review at every gate.*
