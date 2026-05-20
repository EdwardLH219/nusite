# NovaStar Workflow — Architecture Specification & Build Plan

**For:** Edward, StarBeta Program Manager
**System name:** NovaStar (the N8N-orchestrated program-management workflow)
**Version:** 1.0 — draft for review
**Date:** 14 May 2026
**Status:** Specification. No live systems changed yet. Review, then build per the phased plan in §11.

---

## 1. Executive summary

NovaStar is an automation layer that ties together the tools StarBeta already uses — **Linear** (developer work), **Notion** (dashboards and single source of truth), **Slack** (daily team comms), and **Claude Code** (the coding agent) — into one coordinated, mostly-automated program-management system, orchestrated by **N8N** hosted on **Railway**.

It does five jobs:

1. **Keeps a live executive dashboard** in Notion covering every workstream across the full NPD lifecycle — from concept through production and into the business components (JVs, distribution, websites).
2. **Keeps a live program-management dashboard** in Notion showing, per project, what is being worked on and by whom.
3. **Runs the developer agent-control-plane**: spec-driven development through Linear, where Claude Code picks up tickets, implements, and updates status — synced to Notion daily.
4. **Captures meeting notes** and routes them to the right project or turns them into Linear tasks.
5. **Pushes a daily 09:00 task summary to Slack** (and a copy-paste-ready WhatsApp block), so you can keep a handle on every moving part.

The whole thing is built **cloud-first on Railway** so the team has access from day one — no local-to-cloud migration step.

It is designed to **follow the StarBeta NPD operating model** (nine stages, seven gates) while remaining **flexible** — a project that doesn't follow the exact flow is handled by a logged exception, exactly as the Team Guide's "When to bend the process" rule prescribes.

### What you review and approve here

This document is the specification. Once you approve it (or mark up changes), we execute the phased build in §11. Open decisions that need your input before/while building are collected in §13.

---

## 2. Design principles (modern AI program management)

These are the principles the whole system is built on. They are drawn directly from the StarBeta NPD Team Guide and the Claude Code + Linear coding-agent workflow, plus current best practice for AI-assisted program management.

| Principle | What it means in NovaStar |
|---|---|
| **Agent control plane** | Linear is the control plane for all delivery work. Humans and AI agents (Claude Code, Cursor) pick up tickets, update status, and open PRs the same way. No work lives only in markdown files or someone's head. |
| **Spec-driven development** | No agent touches code without a clear spec. Every dev ticket links a spec file and carries explicit acceptance criteria (per the transcript). |
| **Single source of truth, by domain** | Linear owns *task state*. Each product repo owns *code and the business artefacts* — Business Overview, GTM, PRD. Notion owns *portfolio state, decisions, meeting notes and business components*, and projects a read-only summary of the repo's business artefacts (the Gate Artefacts DB). N8N keeps them in sync — it never invents a third truth. |
| **Evidence over opinion at gates** | Every gate has a named owner and a named artefact. NovaStar records each gate decision as one audit line in the Notion Portfolio Log. |
| **AI drafts, humans decide** | N8N's AI steps (meeting-note extraction, summaries, draft tickets) produce *draft inputs*, never accepted truth. Anything crossing a gate is reviewed and signed off by the accountable human. This matches StarBeta's existing AI review controls. |
| **Async, written, linked** | Daily standup and portfolio updates are generated as written, linked artefacts — not meetings. A meeting only happens when a blocker surfaces. |
| **Automate the boring, not the judgement** | NovaStar compresses high-volume / low-judgement work (status sync, digests, note transcription). It never makes a gate call. |
| **Flexible, not rigid** | The stage model is the default path, not a cage. A project can skip or reorder stages via a logged exception in the Portfolio Log. |

---

## 3. The NPD operating model NovaStar is built around

NovaStar treats the **NPD Team Guide v1.0** as the canonical model: **nine stages (S0–S8), seven gates (G1–G7)**. The Project Update Document V1.0.2 uses a slightly different decomposition (Idea Intake / Discovery split, Gates labelled 0–6); that is recorded as a known variant and the system stores the stage as a simple field, so either decomposition — or a project-specific exception — is supported.

### Canonical stages and gates

| Stage | Purpose | Exit artefact | Gate | Gate owner |
|---|---|---|---|---|
| S0 Concept | Problem + hypothesis + rough solution shape | Concept note (1 page) | G1 Worth exploring? | Product Lead |
| S1 Feasibility / POC | Prove the hard part works | Working POC + risk log | G2 Technically viable? | Tech Lead |
| S2 Business Case + PRD + GTM | Business case, PRD, GTM, success metrics, distribution partners | Internal pack | G3 Business Decision (Go/No-Go) | Exec Sponsor |
| S3 Development | Build to PRD against a clear architecture | Feature-complete build in staging | G4 Code / architecture accepted? | Tech Lead |
| S4 Testing / QA | Internal QA, UAT, quality + UX validation | Test report + sign-off | G5 Ready for production? | Tech Lead + Product Lead |
| S5 Production | Controlled launch, monitoring, support readiness | Live in market with ops cover | G6 Launch stable? | Tech Lead + Ops |
| S6 Post-launch Optimisation | Observe real usage, tighten UX + quality | Iteration roadmap + metrics baseline | G7 Operationally ready to scale? | Exec Sponsor |
| S7 Ops Requirements + Scale Decision | Turn launch evidence into a scale operating model | Scale-or-shelve decision | — | — |
| S8 Ongoing Enhancements & Maintenance | Perpetual: continuous enhancement + operational stewardship | Running product; weekly health review | — (no exit) | — |

### How this maps onto the tools

- **Stage** is a property on the Notion *Workstreams* database and is reflected on the Linear *Project*. It is the spine of both dashboards.
- **Gate** decisions are rows in the Notion *Portfolio Log* (the audit trail). NovaStar can flag an upcoming gate but never makes the call.
- **Stage 8** is treated as a permanent state — once a product is live, its workstream stays in S8 and surfaces in the weekly portfolio review forever.
- **RACI** drives default ownership fields: the Workstream row carries Exec Sponsor, Product Lead, Tech Lead, Ops/GTM and Delivery, pre-filled from the RACI table and overridable per project.
- **Cadence** drives the N8N schedule triggers: daily async standup (digest by 09:00), weekly portfolio review (pack generated ahead of the 30-min review), gate reviews (evidence circulated 24h ahead — NovaStar sends the reminder).

---

## 4. System architecture

### 4.1 The components

| Layer | Tool | Role |
|---|---|---|
| **Orchestration** | N8N on Railway | Runs every scheduled and event-driven workflow. The "conductor". |
| **Delivery control plane** | Linear | Source of truth for all tasks and their state. Where agents and humans pick up work. |
| **Dashboards + record** | Notion | Source of truth for portfolio state, gate decisions, meeting notes, business components. Two role-scoped dashboards. |
| **Team comms** | Slack | Daily 09:00 digest, portfolio channel, gate reminders. |
| **Coding agent** | Claude Code | Spec-driven development against Linear tickets via the Linear MCP. |
| **AI inference** | Anthropic API (Claude) | Called inside N8N for meeting-note extraction, summaries, draft tickets. |
| **Data store** | Postgres on Railway | N8N's own database (executions, credentials, workflow state). |
| **Messaging (best-effort)** | WhatsApp Business Cloud API or Twilio | Daily summary to WhatsApp groups, or copy-paste fallback. |

### 4.2 Data flow at a glance

```
                          ┌─────────────────────────────┐
                          │   N8N on Railway (NovaStar)  │
                          │   + Postgres                │
                          └──────────────┬──────────────┘
        schedule + webhooks               │  native nodes / MCP / API
   ┌──────────────┬───────────────┬───────┴────────┬───────────────┐
   │              │               │                │               │
┌──▼───┐     ┌────▼────┐     ┌─────▼─────┐    ┌─────▼─────┐   ┌──────▼──────┐
│Linear│◄───►│ Notion  │     │  Slack    │    │ Anthropic │   │  WhatsApp   │
│      │     │ 2 dash- │     │ #standup  │    │  (Claude) │   │  (best-     │
│tasks │     │ boards  │     │ #portfolio│    │  AI steps │   │   effort)   │
└──▲───┘     └─────────┘     └───────────┘    └───────────┘   └─────────────┘
   │
   │ Linear MCP
┌──┴──────────┐
│ Claude Code │  spec-driven development: spec → tickets → implement → PR → status
└─────────────┘
```

**The core loop:** Claude Code (and human devs) work tickets in Linear → N8N syncs Linear → Notion daily at 08:30 → N8N posts the Slack digest at 09:00 → meeting notes and ad-hoc tasks flow *back* into Linear and Notion through N8N → gate decisions get logged in Notion → the weekly pack is generated from Notion.

### 4.3 Why this split

- **Linear owns task state** because it is purpose-built as an agent control plane and Claude Code integrates with it natively (Linear MCP). Trying to make Notion the task source of truth would fight both tools.
- **Notion owns the portfolio and the record** because it is where executives and the program manager actually look, and where decisions, notes and business components naturally live.
- **N8N owns nothing** — it is glue. This keeps each tool authoritative in its domain and makes the system debuggable.

---

## 5. Notion workspace design

### 5.1 Teamspace structure (access control)

Notion **Teamspaces** give you native access control with no custom code. Three teamspaces, all set to **Closed** — non-members can see that a teamspace exists but cannot open its content; membership gates access. (Private teamspaces require Notion Business and aren't needed here — Closed is sufficient.)

| Teamspace | Members | Contains |
|---|---|---|
| **StarBeta Core** (closed) | Program Manager (you), Product Lead | The *source* databases. Everything else is linked views into these. |
| **StarBeta Executive** | Exec Sponsor, Product Lead, Tech Lead, Program Manager | The **Executive Portfolio Dashboard** (read-only linked views). |
| **StarBeta Delivery** | Whole team | The **Program Management Dashboard**, meeting notes, per-project task views. |

Source databases live once in **StarBeta Core**; every dashboard is built from **linked database views** into other teamspaces. Access is controlled purely by teamspace membership — add or remove a person from a teamspace and their visibility changes. Executives see the portfolio view and never the raw task churn; the team sees the delivery view and never edits the source schema.

### 5.2 The eight core databases (all in StarBeta Core)

**1. Workstreams** — one row per project/initiative. The spine of the executive dashboard.

| Property | Type | Notes |
|---|---|---|
| Name | Title | e.g. Pick't, Hurri · NuSite, Donna |
| Current Stage | Select | S0–S8 |
| Health | Select | Green / Amber / Red |
| Next Gate | Select | G1–G7 or "—" |
| Next Gate Date | Date | drives the 24h pre-read reminder |
| Exec Sponsor / Product Lead / Tech Lead / Ops·GTM / Delivery | Person/relation | pre-filled from RACI |
| Linear Project | URL | link to the Linear project |
| Business Components | Relation → Business Components DB | JVs, distribution, websites |
| Open Tasks / In Progress / Blocked | Rollup | from Tasks DB |
| One-line status | Text | the portfolio-brief sentence |
| Stage exceptions | Text | logged deviations from the standard flow |

**2. Portfolio Log** — the audit trail. One row per gate decision or logged exception.

| Property | Type |
|---|---|
| Date | Date |
| Workstream | Relation → Workstreams |
| Gate | Select (G1–G7 / Exception) |
| Decision | Select (Proceed / Rework / Stop / Exception logged) |
| Owner | Person |
| One-line note | Text |

**3. Tasks** — a mirror of Linear issues, written by N8N. Read-mostly in Notion.

| Property | Type |
|---|---|
| Title | Title |
| Linear ID / URL | Text / URL |
| Workstream | Relation → Workstreams |
| Assignee | Person/relation → People |
| Status | Select (mirrors Linear states, §6.3) |
| Stage | Select (S0–S8) |
| Priority | Select |
| Source | Select (Speckit / Claude Code / Cursor / Meeting / Manual) |
| Last Updated | Date |
| Is Blocker | Checkbox |

**4. People** — team directory.

| Property | Type |
|---|---|
| Name | Title |
| Role | Select (Exec / Product / Tech Lead / Eng / Ops·GTM / Delivery) |
| Linear User | Text |
| Slack Handle | Text |
| WhatsApp Group | Select |
| Active Tasks | Rollup from Tasks |

**5. Meeting Notes** — captured notes, raw + AI-extracted.

| Property | Type |
|---|---|
| Title | Title |
| Date | Date |
| Type | Select (Project / Business) |
| Workstream | Relation → Workstreams |
| Attendees | Relation → People |
| Raw Notes | Text / file |
| AI Summary | Text (drafted by N8N, human-confirmed) |
| Action Items | Relation → Tasks |
| Decisions | Relation → Portfolio Log |
| Review status | Select (AI draft / Human reviewed) |

**6. Business Components** — the non-software side of the lifecycle.

| Property | Type |
|---|---|
| Name | Title |
| Type | Select (JV / Distribution partner / Website / Domain / Email infra / Legal·Compliance / Commercial flow) |
| Workstream | Relation → Workstreams |
| Status | Select (Not started / In progress / Live / Blocked) |
| Owner | Person |
| Notes / Links | Text |

**7. Ideas Intake** — S0 funnel, so new concepts enter the model cleanly.

| Property | Type |
|---|---|
| Idea | Title |
| Submitted by / Date | Person / Date |
| Problem + hypothesis | Text |
| G1 decision | Select (Pending / Explore / Park / Kill) |
| Promoted to Workstream | Relation → Workstreams |

**8. Gate Artefacts** — the business pack as gate evidence. A Notion *projection* of each product repo's `business/` folder, written by N8N (workflow W9). The full document is **not** copied into Notion — it lives in the repo (the single source of truth, §7.2). This database is the executive-facing summary.

| Property | Type |
|---|---|
| Title | Title |
| Type | Select (Business Overview / GTM / PRD) |
| Workstream | Relation → Workstreams |
| Gate | Select (G3 / other) |
| Highlights | Text (exec TL;DR — AI-drafted by N8N, human-reviewed) |
| Version | Text (commit SHA or git tag, e.g. `g3-approved`) |
| Repo file | URL (link to the file in `business/`) |
| Sign-off owner | Person |
| Review status | Select (AI draft / Human reviewed) |
| Last updated | Date |

### 5.3 The two dashboards

**Executive Portfolio Dashboard** (StarBeta Executive teamspace)

- **Portfolio board** — Workstreams grouped by Current Stage (S0→S8), each card showing health, next gate, next gate date, one-line status.
- **Gate calendar** — a calendar view of Next Gate Date across all workstreams, so G3/G7 executive calls are never a surprise.
- **Stage 8 health strip** — all live products, health RAG, last weekly review date.
- **Business components view** — JVs, distribution, websites grouped by type and workstream.
- **Gate artefacts & highlights** — a view of the Gate Artefacts DB grouped by Workstream, showing the exec Highlights, Version and Sign-off for each Business Overview, GTM and PRD, with click-through to the source file in the repo.
- **Portfolio Log** — the running decision audit trail.
- All views are **linked, read-only** for executives.

**Program Management Dashboard** (StarBeta Delivery teamspace)

- **"Who's working on what"** — Tasks grouped by Assignee, showing In Progress + Blocked first. This is your daily snapshot.
- **Per-workstream board** — Tasks grouped by Workstream then Status.
- **Daily standup view** — Tasks updated in the last 24h, grouped by person (yesterday/today/blockers). This is the same data N8N posts to Slack.
- **Blockers view** — every task with Is Blocker = true, across all workstreams.
- **Meeting Notes** — recent notes with their action items and review status.

---

## 6. Linear setup

### 6.1 Structure

- **One Linear team: `StarBeta`.** A small team with tight communication does not need multiple Linear teams; multiple teams fragment the control plane.
- **One Linear Project per workstream:** Pick't, Hurri · NuSite, Donna, NPD Operating Model, StarBeta Incubator — and one per new project as it's onboarded.
- **One Linear Initiative: `StarBeta Portfolio`** grouping all projects, so the portfolio rolls up natively in Linear too.
- **Cycles:** 1-week cycles, aligned to the weekly portfolio review, so velocity and carry-over are visible.

### 6.2 Labels & fields (works on all plans, including Free)

Linear does not expose Jira-style arbitrary custom fields — and it doesn't need to. **Grouped labels** do the same job and work on every plan. NovaStar uses native Linear primitives only:

- **Issue labels (grouped):** `Stage:S0 … Stage:S8`, `Source:Speckit / Claude Code / Cursor / Meeting / Manual`, and a `Blocker` label. Native **priority** is used as-is.
- **Spec link:** lives in the issue description's Context section (see the ticket template in §6.4) — no separate field needed.
- **Workstream-level NPD Stage, Health, Next Gate and Next Gate Date** are owned by the Notion **Workstreams** DB (the portfolio source of truth). Linear's native **project status** and the **initiative** give the in-Linear rollup; the precise S0–S8 stage lives in Notion.

N8N (workflow W1) reads the issue labels and maps them into the Notion Tasks selects.

### 6.3 Workflow states

Issue states, grouped into Linear's categories, designed so a spec-driven agent workflow is legible:

| State | Category | Meaning |
|---|---|---|
| Backlog | Backlog | Captured, not yet specced |
| Spec Ready | Unstarted | Has a linked spec + acceptance criteria — ready for an agent or dev to pick up |
| Todo | Unstarted | Committed to the current cycle |
| In Progress | Started | Being worked (by a human or Claude Code) |
| In Review | Started | PR open, awaiting human review |
| Done | Completed | Merged |
| Cancelled | Cancelled | Dropped |

These states map 1:1 into the Notion Tasks `Status` select.

### 6.4 The spec-driven ticket template

Following the Claude Code + Linear transcript, every dev ticket carries enough context that an agent (or a developer) can work it without asking for clarification:

```
## Context
Link to parent issue (project context) + link to spec file in the repo.

## What we're building
Plain-language description of the change.

## Files to update
Explicit list of files / modules.

## Implementation notes
Code examples or constraints where relevant.

## Acceptance criteria
- [ ] Clear, checkable conditions for "done"
- [ ] Build/test command passes

## Branch prefix
feature/ | fix/ | chore/
```

The **parent issue** for each project holds the rich, durable context (what the project is, the architecture, the PRD link), exactly as the transcript recommends — so a child ticket only needs the delta.

---

## 7. Claude Code + spec-driven development integration

This is the developer half of the agent control plane. It mostly lives *inside Claude Code*, with N8N watching the results.

### 7.1 The senior-engineer workflow (encoded once, per repo)

Each StarBeta product repo gets an `AGENTS.md` — the universal agent-instructions file, read by Claude Code, Cursor and other agents — that encodes the workflow from the transcript:

1. Fetch the assigned issue from Linear (via Linear MCP).
2. If it has a parent issue, read the parent for project context.
3. If the description references a spec file, read that spec.
4. Update the ticket status to **In Progress**.
5. Determine the branch prefix and check out a new git branch.
6. Implement the changes.
7. Run the build / test commands to verify.
8. Open a PR and move the ticket to **In Review**.

### 7.2 Spec-driven / Speckit flow

Spec-driven development does **not** start from a blank page. It starts from the approved Stage 2 business pack — and that pack lives in the repository, so the coding agent has it as first-class context.

**The business artefacts are Cowork-generated and live in the repo.** Stage 2 produces three business-owned artefacts: the **Business Overview**, the **GTM narrative**, and the **PRD**. They are created using Claude Cowork and committed as `.md` files into a dedicated **`business/`** folder in the product repository. The PRD is not purely a business document — per the RACI, the Tech Lead is consulted on it, so it carries **architecture and technical-constraint input** alongside the product requirements. Keeping these as versioned markdown next to the code means Claude Code and Speckit get the full "why and what" with no external dependency, and the repo is self-contained.

**Repo layout — `business/` is the why/what, `specs/` is the how:**

```
repo-root/
├── business/
│   ├── business-overview.md
│   ├── gtm.md
│   └── prd.md            # includes Tech Lead architecture input
├── specs/
│   └── *.md              # technical specs derived from business/
└── ...                   # application code
```

**The repo is canonical; Notion is a generated projection.** The `business/` folder is the single source of truth for the per-product BO / GTM / PRD. Notion does **not** hold a hand-maintained second copy — instead, N8N watches the `business/` folder and updates the **Gate Artefacts** database in Notion with AI-drafted exec highlights, version and a link (see §5 and the N8N workflows). Executives read the projection on the Portfolio Dashboard; the document itself is never edited in two places. Portfolio-level business material **not** tied to a single product — cross-cutting JV or distribution work — has no repo and stays Notion-native.

**Sequencing rule — the repo must exist by Stage 2.** Because the business artefacts are created in S2 but provide context for development in S3, the product repository is stood up early — during S1 (POC) or at the start of S2 — so `business/` has a home from the outset. If a project is still pre-repo when the artefacts are drafted, they stage in Cowork / Notion and are committed to `business/` the moment the repo is created.

**G3 is a git tag, not a frozen copy.** When the S2 pack clears the **G3 Business Decision Gate**, the repo is tagged `g3-approved`. The git history *is* the freeze — there is no `-frozen.md` duplicate to drift. Any later change to a business artefact is a normal commit, visible in the diff and reflected in the Notion projection.

**Technical specs are derived from `business/`.** Specs in `specs/*.md` are structured — overview, features, files affected, code examples, acceptance criteria — and each spec **cites the Business Overview, GTM and PRD sections it implements**. The spec is the bridge from approved business intent to agent-executable work, not a fresh invention.

**Speckit consumes `business/` as context.** For projects using Speckit, the approved **PRD (with its architecture input), Business Overview and GTM are loaded as context** into the Speckit process directly from the repo. Speckit's task list is generated against that context, so the breakdown traces directly back to what the business signed off at G3 — no scope drift between G3 and S3.

**Planning session → Linear.** A planning session with Claude Code (or the Speckit output via workflow W8) breaks the spec into a **parent issue + child tickets** in Linear via MCP — the "feature → task breakdown → tickets" step from the transcript. The parent issue links the `business/` folder and the spec, so every child ticket inherits the chain of context.

**Other sources still land on the same board.** Tasks from Cursor, a meeting, or manual injection enter the same board with `Source` set accordingly — so the board is complete regardless of origin.

**The full context chain:**

```
S2 · Claude Cowork ──► business/  (business-overview.md, gtm.md, prd.md)
                          │            │
        [G3] git tag ─────┘            │  PRD includes Tech Lead architecture input
                                       ▼
                          specs/*.md  ──►  Speckit task list  ──►  Linear parent + child tickets
                              │                                            │
   N8N watches business/ ──► Notion Gate Artefacts (exec highlights)        ▼
                                                                 Claude Code implements (S3)
```

### 7.3 MCP setup in Claude Code

- Install the **Linear MCP server** in Claude Code (one-line install + `/mcp` to authenticate to the StarBeta Linear workspace). This gives Claude Code read/create/update on tickets.
- Optionally add the **Notion MCP** so Claude Code can read portfolio context or meeting notes from Notion. (The PRD itself lives in the repo's `business/` folder, so Claude Code reads it straight from the filesystem — see §7.2.)
- Claude Code is engaged (a) interactively for larger features where you stay in the loop, and (b) hands-off for well-specced small tickets where it implements and opens a PR for review. Automated checks run on every PR.

### 7.4 Where N8N fits vs Claude Code

| Job | Owner |
|---|---|
| Writing specs, breaking them into tickets, implementing, opening PRs | **Claude Code** (interactive or hands-off) |
| Syncing ticket state into Notion, digests, reminders, meeting-note routing, gate logging | **N8N** |
| Bulk-creating tickets from a finalised Speckit task list | **Either** — N8N workflow W8, or Claude Code in a planning session |

N8N never writes code. Claude Code never builds dashboards. Clean seam.

---

## 8. N8N workflows

Nine workflows for the initial system (W1–W9), plus one Phase-2 workflow (W10). Each is built and tested independently.

### W1 — Linear → Notion daily sync
- **Trigger:** Schedule, 08:30 daily (before the 09:00 digest) + Linear webhook for near-real-time updates on high-priority changes.
- **Does:** Pulls all Linear issues updated since the last run; upserts each into the Notion Tasks DB; recomputes per-Workstream rollups; updates the Workstream `Current Stage` / `Health` from the Linear project.
- **Why 08:30:** so Notion is fully current before any digest or human looks at it.

### W2 — Daily standup digest → Slack
- **Trigger:** Schedule, 09:00 daily.
- **Does:** Reads Notion Tasks (updated last 24h + all In Progress/Blocked); groups by person; formats a per-person "yesterday / today / blockers" block plus a one-paragraph portfolio snapshot; posts to `#starbeta-standup`. Optionally DMs each person their own block.
- **Cadence fit:** this *is* the "daily async stand-up by 10:00" — no meeting unless a blocker surfaces.

### W3 — Meeting notes intake → route + extract
- **Trigger:** New row in the Notion Meeting Notes DB (you paste or upload the raw notes).
- **Does:** Sends raw notes to Claude (Anthropic node) with a structured prompt → extracts summary, decisions, and action items (each with owner + workstream). Writes the AI Summary back to the Meeting Notes row (marked **AI draft**); creates Linear issues for action items with `Source = Meeting`; if a decision is gate-related, drafts a Portfolio Log row.
- **Control:** nothing is treated as final until you flip Review status to **Human reviewed** — AI drafts, humans decide.

### W4 — Task injection into Linear
- **Trigger:** N8N form, a Notion "Task Inbox" database, or a Slack slash command (`/task`).
- **Does:** Takes a quick task description + assignee + workstream; creates a properly-templated Linear issue with `Source = Manual`; confirms back to you. This is how non-Speckit / non-agent tasks enter the board.

### W5 — Gate & stage transition watcher
- **Trigger:** Linear project change (webhook) or Notion Workstream property change.
- **Does:** When a workstream's `Current Stage` changes or a gate decision is recorded, writes/confirms the Portfolio Log audit line, posts a one-line note to `#starbeta-portfolio`, and updates the Executive Dashboard rollups. Also: 24h before any `Next Gate Date`, posts a gate pre-read reminder to the gate owner (gate hygiene rule).

### W6 — Weekly portfolio review pack
- **Trigger:** Schedule, weekly, ~2h before the portfolio review.
- **Does:** Compiles status per workstream, upcoming gates, Stage 8 health across live products, blockers, and the week's Portfolio Log entries into a Notion page + a Slack summary in `#starbeta-portfolio`.

### W7 — WhatsApp task summary
- **Trigger:** Schedule, 09:05 daily (just after W2).
- **Does — two modes:**
  - **Automated** (if WhatsApp Business Cloud API or Twilio is connected): sends each WhatsApp group its relevant per-person task summary.
  - **Fallback** (no API): generates copy-paste-ready, per-group formatted blocks into a Notion "WhatsApp Outbox" page and/or a private Slack channel, so you paste them into the right groups in seconds.
- Mode is set in §13 (currently parked → fallback mode). The fallback always works, so the system is never blocked on WhatsApp.

### W8 — Speckit → Linear bootstrapping
- **Trigger:** Manual / webhook from Claude Code when a spec or Speckit task list is finalised.
- **Does:** Bulk-creates the parent issue + child tickets in Linear from a structured spec file, applying the ticket template and `Source = Speckit`.

### W9 — Business artefact repo-watch → Notion
- **Trigger:** GitHub webhook on push to any `business/**` path, plus a daily reconcile schedule as a safety net.
- **Does:** When a Business Overview, GTM or PRD file changes in a product repo's `business/` folder, N8N reads the file, sends it to Claude (Anthropic node) to draft the exec **Highlights**, and upserts the matching row in the Notion **Gate Artefacts** DB — file link, version (commit SHA / git tag), last-updated, review status set to **AI draft**. On a `g3-approved` tag it stamps the artefact's Gate and Version accordingly.
- **Control:** the Highlights are an AI draft until the Product Lead flips Review status to **Human reviewed** — AI drafts, humans decide.

### W10 — Outlook personal inbox triage (Phase 2)
- **Trigger:** New email in a designated Outlook folder/label.
- **Does:** Claude classifies the email; if it's an action, drafts a Linear ticket or a Meeting Notes entry for your review. Deferred to Phase 2 per your note.

---

## 9. MCP integration map

| MCP / integration | Runs in | Used for | Notes |
|---|---|---|---|
| **Linear MCP** | Claude Code | Agent reads/creates/updates tickets | Official remote MCP; one-line install, `/mcp` to auth |
| **Notion MCP** | Claude Code (optional) | Agent reads portfolio context / meeting notes from Notion | Optional convenience |
| **Linear node / API** | N8N | W1, W4, W5, W8 ticket sync and creation | Use the native N8N Linear node; fall back to the HTTP/API node for anything it can't do |
| **Notion node** | N8N | W1, W3, W5, W6, W9 database read/write | Native N8N Notion node |
| **Slack node** | N8N | W2, W5, W6 posting; W4 slash command | Native N8N Slack node + a Slack app |
| **Anthropic (Claude) node** | N8N | W3 meeting-note extraction, W6 summaries, W9 highlights | N8N's built-in Anthropic / LangChain node |
| **WhatsApp / Twilio node** | N8N | W7 automated mode | Only if you connect an API; otherwise fallback mode |
| **GitHub node / webhook** | N8N | W9 — watches each repo's `business/` folder, reads changed files | Native N8N GitHub node + a push webhook scoped to `business/**` |
| **N8N as MCP server** | N8N | (future) expose NovaStar workflows as tools to Claude Code | Possible later — e.g. let Claude Code trigger W4 directly |

**Principle:** use native N8N nodes wherever they exist (more reliable, easier to debug); use MCP where it is genuinely the best interface (Claude Code ↔ Linear). Don't MCP-ify things that have a perfectly good native node.

---

## 10. Hosting, credentials & security

### 10.1 Railway setup

- One Railway **project: `novastar`**, with two services: **n8n** and **Postgres**.
- N8N configured with: `DB_TYPE=postgresdb` pointed at the Railway Postgres, a strong `N8N_ENCRYPTION_KEY`, `WEBHOOK_URL` set to the Railway public domain, basic auth or N8N user management enabled.
- Persistent volume for N8N binary data; Railway Postgres has managed backups — enable them.
- The **Railway-assigned domain** is used initially for the N8N editor and webhook URLs. A custom domain can be added later (§13, decision 2) — webhook URLs would then need re-pointing.

### 10.2 Credentials needed

| Credential | For | Where stored |
|---|---|---|
| Linear API key + webhook signing secret | W1, W4, W5, W8 | N8N credentials store |
| Notion internal integration token | W1, W3, W5, W6, W9 | N8N credentials store |
| Slack bot token + signing secret | W2, W4, W5, W6 | N8N credentials store |
| Anthropic API key | W3, W6, W9 | N8N credentials store |
| WhatsApp Cloud API / Twilio token | W7 (automated mode only) | N8N credentials store |
| GitHub personal access token + webhook secret | W9 (business artefact repo-watch) | N8N credentials store |
| `N8N_ENCRYPTION_KEY` | N8N itself | Railway env var |
| Postgres connection string | N8N | Railway service binding |

All secrets live in Railway env vars or the N8N encrypted credential store — never in workflow JSON or the repo.

### 10.3 Security notes

- The Notion integration is scoped to only the StarBeta Core teamspace databases.
- The Slack app is scoped to only the channels it posts to.
- The Linear and GitHub webhooks are verified with their signing secrets in N8N.
- Access to the N8N editor itself is restricted to you (and whoever maintains workflows) via N8N user management.
- Executive data isolation is handled by Notion teamspaces, not by N8N — N8N writes to source DBs, teamspaces control who sees what.

---

## 11. Phased build plan

Each phase is independently verifiable. Nothing in a later phase starts until the previous phase is confirmed working. Estimated calendar is indicative for a part-time build alongside live work.

### Phase 0 — Infrastructure (≈ 2 days)
- Create the Railway `novastar` project: N8N + Postgres services, encryption key, Railway-assigned domain, backups.
- Create the Slack app and channels (`#starbeta-standup`, `#starbeta-portfolio`).
- Create the Notion internal integration; create the Anthropic API key.
- **Done when:** N8N editor loads on the Railway domain and a hello-world workflow runs.

### Phase 1 — Notion workspace (≈ 3 days)
- Create the three teamspaces and set membership.
- Build the eight core databases in StarBeta Core with the schemas in §5.2.
- Build the two dashboards as linked views (§5.3).
- **Done when:** both dashboards render with the schema in place (empty data is fine).

### Phase 2 — Linear setup (≈ 2 days)
- Create the `StarBeta` team, the `StarBeta Portfolio` initiative, grouped labels (§6.2), workflow states, 1-week cycles.
- Confirm MCP access is enabled on the Linear workspace (Settings → API / integrations).
- Add the spec-driven ticket template and a parent-issue template.
- Install the Linear MCP in Claude Code and authenticate; add `AGENTS.md` to one repo.
- **Done when:** a test ticket can be created, picked up by Claude Code, and moved through states.

### Phase 3 — N8N core sync (≈ 3–4 days)
- Build and test **W1** (Linear → Notion sync), **W5** (gate/stage watcher) and **W9** (business artefact repo-watch → Notion Gate Artefacts).
- **Done when:** a change in Linear appears in the Notion Tasks DB within the sync window, a stage change logs to the Portfolio Log, and a commit to a repo's `business/` folder updates the Gate Artefacts DB.

### Phase 4 — Comms (≈ 3 days)
- Build and test **W2** (Slack digest), **W6** (weekly pack), **W7** (WhatsApp summary, in fallback mode per §13).
- **Done when:** a real 09:00 digest posts to Slack with correct per-person grouping.

### Phase 5 — Intake (≈ 3 days)
- Build and test **W3** (meeting notes), **W4** (task injection) and **W8** (Speckit → Linear bootstrapping).
- **Done when:** a pasted meeting note produces a reviewed summary + draft Linear tickets, and `/task` creates a ticket.

### Phase 6 — Onboard projects, one at a time (ongoing)
- Onboard in this order, based on the Portfolio Brief and the timing as of 14 May 2026:
  1. **Pick't** — first. It is at/just past G3 (Business Decision Gate, 11–15 May) and enters Development on 18 May, so it exercises the Linear + Claude Code spec-driven workflow immediately.
  2. **Hurri · NuSite** — in Pilot Readiness / Final Development (4–29 May); heavy operational-requirements checklist makes it a strong test of the Business Components DB.
  3. **Donna** — prototype in testing.
  4. **NPD Operating Model** — meta-workstream; tracks this very rollout.
  5. **StarBeta Incubator** — foundations workstream.
- For each: create the Linear project, set stage/owners, migrate existing tasks, populate the Workstream row, link business components.

### Phase 7 — Personal inbox (Phase 2, later)
- Build **W10** (Outlook triage) once the core system is proven.

---

## 12. How the day actually runs once NovaStar is live

- **08:30** — N8N syncs Linear → Notion. Both dashboards are current.
- **09:00** — Slack `#starbeta-standup` gets the per-person digest. The team reads it; a meeting only happens if a blocker needs one.
- **09:05** — WhatsApp summaries land in your Outbox to paste (fallback mode), or go out automatically if the API is later connected.
- **During the day** — Claude Code and devs work Linear tickets; you inject ad-hoc tasks via `/task`; meeting notes get pasted into Notion and come back as reviewed summaries + draft tickets; business artefact commits update the Gate Artefacts DB.
- **On stage/gate changes** — the Portfolio Log updates, `#starbeta-portfolio` gets a one-liner, the Executive Dashboard reflects it.
- **24h before a gate** — the gate owner gets a pre-read reminder.
- **Weekly** — the portfolio review pack is generated automatically; the 30-minute review works off it.
- **You** — open the Program Management Dashboard for the "who's working on what" snapshot any time; executives open the Portfolio Dashboard for the single-view state of the business.

---

## 13. Decisions log

Captured from the review on 14 May 2026. Early-phase decisions are resolved; items marked *open* are deferrable and don't block the build.

1. **WhatsApp mode — parked.** W7 ships in copy-paste fallback mode (zero cost, always works). A WhatsApp Business Cloud API / Twilio account can be added later to switch W7 to automated mode without a redesign.
2. **N8N domain — Railway-assigned for now.** Phase 0 uses the auto-assigned Railway URL for the N8N editor and webhooks. A custom domain can be added later; webhook URLs would then need re-pointing (a quick change).
3. **Repo layout — confirmed.** StarBeta product repos sit together in one GitHub org. Each repo gets the `business/` + `specs/` structure and an `AGENTS.md`, and must exist by Stage 2. N8N gets a GitHub token + `business/**` webhook access for W9.
4. **Linear plan — Free plan is sufficient to start.** Initiatives are part of Linear's Core feature set and available on Free. NovaStar's design uses **grouped labels**, not custom fields (§6.2), so there is no plan-gated dependency. The Free-plan limits to watch are **250 active issues** and **2 teams** — NovaStar uses one team, so the issue cap is the real trigger: if open issues across all workstreams approach 250, move to Basic ($10/user/month) for unlimited issues. *Action before Phase 2: confirm MCP access is enabled on the Free workspace, since Claude Code uses the Linear MCP.*
5. **Notion plan — confirmed.** StarBeta is on Notion Plus, which supports the three teamspaces and granular permissions in §5.1.
6. **NovaStar maintainer — confirmed.** Edward (Program Manager) maintains NovaStar and holds N8N editor access. *Open:* name a backup maintainer once the system is live, so there is no single point of failure.
7. **Speckit scope — build W8 now.** W8 (Speckit → Linear bootstrapping) is part of the core build in Phase 5, not deferred.
8. **Meeting-note input — paste into Notion.** W3 is triggered by a new row in the Notion Meeting Notes DB. The N8N-form and email-address options are dropped.

---

## 14. What I need from you to start

1. **Approve or mark up this spec.** Especially §5 (Notion schema), §6 (Linear setup) and §11 (phasing).
2. **Confirm the §13 action** — that MCP access is enabled on the Linear Free workspace before Phase 2.
3. **Confirm access:** that you can create a Railway account, install the Linear MCP in Claude Code, and create a Notion integration + Slack app — or tell me where you'd like help.

Once approved, the natural first build artefacts are: the Notion database schema as an importable definition, the N8N workflow JSON for W1, the Linear ticket templates, and the `AGENTS.md` for the first repo. I can produce those as ready-to-import files the moment you give the go-ahead.

---

*NovaStar Workflow — Architecture Specification & Build Plan · v1.0 draft · aligned to StarBeta NPD Team Guide v1.0 and Project Update Document V1.0.2*
