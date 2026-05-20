# AGENTS.md — NuSite Website

Agent instructions for this repository. Read by Claude Code, Cursor and other coding agents on entering the repo.

## What this repo is

The **marketing / product website** for the NuSite product — the site that promotes and sells NuSite. Existing site; this workstream is the **trial project** for the StarBeta spec-driven dev workflow.

This repo is **not** the NuSite product itself (the website-generator). The product lives elsewhere; this repo is the site that markets it.

Part of the StarBeta NPD operating model:
- Business context lives in `business/`.
- Technical specs derived from it live in `specs/`.
- This file encodes how to work tickets.

## Source-of-truth map

- `business/` — Business Overview, GTM narrative, PRD for the site (Cowork-generated, business-owned). Approved at G3 (look for the `g3-approved` git tag).
- `specs/` — Technical specs derived from `business/`. Each spec cites the BO / GTM / PRD sections it implements.
- **Linear** (StarBeta team → NuSite Website project) — task control plane. The parent context issue (look for "Project Context — NuSite Website") carries durable project context.
- **Notion** (NovaStar Workstreams DB) — live portfolio view.

## The senior-engineer workflow

When you pick up a Linear ticket assigned to you, follow this sequence:

1. **Fetch the issue** from Linear (via the Linear MCP).
2. **If it has a parent issue**, read the parent for project context.
3. **If the description references a spec file**, read that spec.
4. **Update the ticket status** to `In Progress`.
5. **Determine the branch prefix** based on the ticket type:
   - `feature/` — new functionality
   - `fix/` — bug fix
   - `chore/` — maintenance / refactor / docs
6. **Check out a new git branch** named `<prefix>/<short-slug>`.
7. **Implement the changes** as specified.
8. **Run the build / test commands** (see below) to verify nothing is broken.
9. **Open a pull request** with a clear description, and move the ticket to `In Review`.

## Ticket structure (the spec-driven template)

Every dev ticket should carry enough context that you can work it without coming back for clarification:

- **Context** — link to parent issue + link to spec file
- **What we're building** — plain-language description
- **Files to update** — explicit list
- **Implementation notes** — code examples or constraints
- **Acceptance criteria** — checkable conditions, build / test must pass
- **Branch prefix** — `feature/` | `fix/` | `chore/`

If a ticket is missing this structure, treat it as not ready — push back to `Backlog` and ask for the spec, rather than guessing.

## Build / test commands

> **[Edward to fill in — replace this section with the actual commands for the NuSite Website repo, e.g.:]**
>
> ```bash
> # install
> pnpm install
>
> # build
> pnpm build
>
> # test
> pnpm test
>
> # lint
> pnpm lint
>
> # local dev server
> pnpm dev
> ```

## What goes where

- New business decisions / scope changes → propose updates to the relevant file in `business/`.
- New technical specs → create a markdown file in `specs/` citing the business sections it implements.
- New tasks for an agent → create a Linear issue with `Source: Speckit` (or `Claude Code` / `Manual`) and the appropriate `Stage` label.

## What this repo does NOT do

- Schema or workflow changes in Notion or Linear — those live in the NovaStar architecture spec, not here.
- Direct edits to Linear ticket bodies during a dev cycle — update the spec or the parent context issue instead, and let the ticket reference it.
- Anything that belongs to the NuSite *product* — that lives in a different repo / workstream.

## Cadence

- Daily async stand-up by 10:00 (driven by N8N from Linear → Slack #starbeta-standup once Phase 3 is live).
- A pull request is "in review" the moment it's opened; expect human review before merge.
- Build / test must pass before opening a PR.

---

*StarBeta NPD operating model · spec-driven development · agent control plane*
