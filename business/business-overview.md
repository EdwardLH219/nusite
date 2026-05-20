# NuSite Website — Business Overview

> Cowork-generated, business-owned. Versioned in `business/`. Read at G3 by execs; consumed as context by Speckit.

## What this site is

The **marketing / product website** for the NuSite product. Its job is to promote and sell NuSite — explain what it is, demonstrate value through before-and-after work, and convert qualified visitors into a **free preview request** (the top of the sales funnel).

This is **not** the NuSite product itself (the website-generator); it's the site that markets it.

The site embodies the offer in one sentence: *"Send us your URL. See the replacement in 24 hours. Pay only if it feels right."* Every section on the page points at that same conversion.

## Audience

**Primary ICP — independent professional service businesses** whose website is silently costing them referrals:

- **Architecture / design studios** — small independent practices (illustrated by Aesthetic Design Group, Portland)
- **Law firms** — full-service small/mid practices (illustrated by Mason & Associates, Chicago)
- **Medical / clinical practices** — community-scale, family or specialty care (illustrated by Cityside Medical Care)
- Adjacent professional verticals with the same shape (financial advisors, consulting practices, boutique agencies)

**Persona shape:** owner-operator or senior partner; phone is the primary channel; current site was built years ago and is now an embarrassment; doesn't want to manage an agency, a Slack channel, or a Figma file.

**Secondary audiences for the site:** referral partners checking us out, press, and prospective customers arriving from outbound campaigns. Not investors — there is no fundraising narrative on this site.

## Goals

In priority order:

1. **Convert qualified visitors to a free preview request** (primary CTA across all 8 sections).
2. **Establish credibility on the first scroll** — before-and-after proof, named cases with locations, plain-English process.
3. **Pre-qualify visitors** so the studio's time goes to fits, not tyre-kickers — the modal asks for name, business name, email, and current website URL.
4. **Support secondary contact paths** — phone and `studio@nusite.ai` for visitors who don't want to fill in a form.

## Success metrics

| Metric | What it measures | Why it matters |
|---|---|---|
| Free preview requests / week | Top of funnel volume | The site's primary job |
| Preview-request → paid-build conversion rate | Quality of the funnel | Whether visitors arriving here are the right fit |
| Time-on-page on `#work` (proof section) | Proof is doing its job | Before-and-after is the credibility hinge |
| CTA-click → modal-submit conversion rate | Form friction | If high CTA clicks but low submissions, the form is the leak |
| Direct phone calls / week (`(212) 555-0173`) | Off-form intent | Some visitors will skip the form — they should still find us |
| Core Web Vitals (LCP / INP / CLS) | First-impression credibility | A slow site contradicts the entire pitch |

**Open — TODO for Edward:** target volumes per month for previews-requested and paid builds. Needed before G3.

## Distribution

Channels feeding the site (in scope for the site to support, not necessarily owned by the site itself):

- **Outbound** — landing on `/` with a campaign-specific UTM. The page must work cold.
- **Referrals** — existing customer or peer sends the link directly. Must hold up on a phone, on a kitchen table, in under one second.
- **Organic search** — the site must be indexable and rank for "modern small business website", "law firm website redesign", "medical practice website" and adjacent terms.
- **Press / partner mentions** — the home page must convey what NuSite is without a deeper read.

**Open — TODO for Edward:** target mix across these channels and any specific partnership/distribution relationships to call out. None currently committed.

## Relationship to the product

This site is *about* NuSite. The NuSite product itself — the website-generator, customer dashboards, build pipeline — lives in a separate repository and has its own business artefacts. This site:

- **References** product capability (24-hour turnaround, free preview, ownership transfer at handover)
- **Demonstrates** it through real before-and-after cases
- **Does not duplicate** product documentation, internal architecture, or post-purchase customer-facing surfaces

When the product changes (e.g. price moves off $299, turnaround target changes), the site's content is updated to match — but the source-of-truth for the product itself stays in the product's own repo.

## Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| **Preview form submits go nowhere.** The current modal calls `submitPreviewRequest` which is a `console.log` stub — leads are being lost in development. | High (until fixed) | Wire the form to a real destination (email, CRM, or a NuSite-internal inbox) before any paid traffic. Tracked as an open question in the PRD. |
| **No analytics instrumented.** We can't measure any of the success metrics above today. | High (until fixed) | Pick an analytics tool and instrument the funnel events. Tracked as an open question in the PRD. |
| **Single-channel dependence.** If we lean too heavily on one acquisition channel and it dries up, lead flow stops. | Medium | Diversify intentionally as volume grows. The home page must work cold for outbound, referrals, and organic — verified by tracking preview-request rate per channel once analytics is wired. |
| **Content drift from product reality.** If price, turnaround, or process change in the product but not on the site, trust breaks. | Medium | Treat business artefacts (this folder) as the single source of truth and have Cowork update the site copy from these files at each gate. |
| **Domain inconsistency.** Site metadata declares `nusite.com` but the contact email is `studio@nusite.ai`. Visitors notice. | Low | Decide one canonical domain and align metadata + email. Tracked in the PRD. |

---

*Last updated: 2026-05-18 · Owner: Product Lead / Ops·GTM · Review at every gate.*
