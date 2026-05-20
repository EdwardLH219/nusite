---
name: "speckit-tasks-to-linear"
description: "Convert the current feature's tasks.md into a parent + child issue tree in Linear, using the StarBeta spec-driven ticket template and preserving task dependencies."
argument-hint: "Optional: <linear-project-or-workstream-name> (defaults to the feature directory name) and/or --team=<name> (defaults to StarBeta)"
compatibility: "Requires spec-kit project structure with .specify/ directory, the Linear MCP authenticated, and the NovaStar Linear setup (team + grouped labels per AGENTS.md §6.2)."
metadata:
  author: "starbeta"
  source: "specs/agents-md-alignment-proposal (deleted) — replaced by this skill per NovaStar §7.2 / W8"
user-invocable: true
disable-model-invocation: false
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty). Parse it as:

- A bare positional value → the Linear **project name** (workstream) to attach the parent issue to. If absent, default to the feature directory name (e.g. `001-checkout-flow`) and require human confirmation before creating.
- `--team=<name>` → Linear team. Default: `StarBeta`.
- `--dry-run` → print the planned issue tree without calling Linear.
- `--stage=<S0-S8>` → which `Stage:` label to apply. Default: `Stage:S3` (Development), per NovaStar §6.2.

## Pre-Execution Checks

**Extension hooks (before tasks-to-linear conversion).** Mirror the pattern from `speckit-taskstoissues`:

- Read `.specify/extensions.yml` if present; look for entries under `hooks.before_taskstolinear`.
- If the YAML cannot be parsed, skip silently.
- For each enabled hook (`enabled: true` or absent), do not interpret `condition` expressions — defer to the HookExecutor. When constructing slash commands, replace `.` with `-`.
- Render the hook prompt (optional vs mandatory) exactly as `speckit-taskstoissues` does.
- If no hooks or no `extensions.yml`, skip silently.

## Outline

### 1. Locate the feature artefacts

Run `.specify/scripts/bash/check-prerequisites.sh --json --require-tasks --include-tasks` from the repo root and parse `FEATURE_DIR` and `AVAILABLE_DOCS`. All paths must be absolute. Extract:

- `tasks.md` — required.
- `spec.md` — required for the parent issue body.
- `plan.md` — required for the parent issue body.

If `tasks.md` is missing, abort with: *"No tasks.md found — run `/speckit-tasks` first."*

### 2. Confirm the Linear destination

- Verify the Linear MCP is authenticated by calling `mcp__claude_ai_Linear__list_teams` and finding the `--team` value (default `StarBeta`).
- Verify the target **project** exists by calling `mcp__claude_ai_Linear__list_projects` with `team` set and `query` set to the project name from `$ARGUMENTS` (or the feature directory name). If no project matches, **stop and ask the user** whether to create one — do not auto-create projects, since each workstream-level project corresponds to a NovaStar Workstreams row (AGENTS.md §6.1 / NovaStar §6.1).
- Verify the required grouped labels exist via `mcp__claude_ai_Linear__list_issue_labels` (team-scoped): `Source:Speckit`, `Stage:<S0-S8>` (from `--stage`). If a label is missing, list it and ask whether to fall back without it. Do not silently create labels — the label scheme is portfolio-wide (NovaStar §6.2).

### 3. Idempotency check — read existing Linear refs from `tasks.md`

Speckit's `tasks.md` lists tasks like:

```
- [ ] T001 [P] [US1] Create User model in src/models/user.py
```

This skill records the Linear identifier inline by appending an HTML comment after the task line on first sync, e.g.:

```
- [ ] T001 [P] [US1] Create User model in src/models/user.py <!-- linear:STA-142 -->
```

Before creating any issue, scan `tasks.md` for these markers. For every task that already has a `<!-- linear:XXX-### -->` marker, treat it as an **update** (pass `id` to `save_issue`), not a create. For tasks without a marker, create.

Also scan for a top-of-file parent marker, e.g. on the first heading line:

```
# Tasks: Checkout Flow  <!-- linear-parent:STA-141 -->
```

If present → update the existing parent. If absent → create the parent and write the marker back on success.

### 4. Build the parent issue

**Title:** the feature name from `tasks.md`'s top heading (e.g. `Spec: Checkout flow`).

**Body** (Markdown; the Linear MCP requires literal newlines, not escaped `\n`):

```markdown
## Context

- Spec: [specs/<feature>/spec.md](../../specs/<feature>/spec.md)
- Plan: [specs/<feature>/plan.md](../../specs/<feature>/plan.md)
- Tasks: [specs/<feature>/tasks.md](../../specs/<feature>/tasks.md)
- Repo: <remote URL from `git config --get remote.origin.url`>

This parent issue holds durable project context for the feature, per AGENTS.md §6.4. Child issues only carry the per-task delta; agents reading a child should follow the links above for full context.

## What we're building

<one-paragraph summary lifted from spec.md's "Overview" or first paragraph>

## Acceptance criteria for the feature

<carry across the acceptance criteria block from spec.md if present; otherwise list the user-story-level checkpoints from tasks.md>

## Branch prefix

`feature/` unless tasks.md indicates a fix or chore.
```

**Fields:**
- `team`: the resolved team ID
- `project`: the resolved project ID
- `labels`: `["Source:Speckit", "Stage:<S0-S8>"]`
- `state`: `"Spec Ready"` (NovaStar §6.3)
- `priority`: leave unset (let the human pick)

After successful create, **write back** the `<!-- linear-parent:<identifier> -->` marker on the first heading line of `tasks.md`.

### 5. Build each child issue

For every task line in `tasks.md` (any line matching `^- \[ \] T\d+`), build one child issue:

**Title:** the task text with the `T###` prefix and any `[P]`/`[US#]` tags stripped — leave them in the body for reference.

**Body** (apply the AGENTS.md §6.4 ticket template exactly):

```markdown
## Context

- Parent: <linear-parent identifier> — see that issue for project context
- Spec: [specs/<feature>/spec.md](../../specs/<feature>/spec.md)
- Plan: [specs/<feature>/plan.md](../../specs/<feature>/plan.md)
- Task line: [tasks.md#T###](../../specs/<feature>/tasks.md)
- Speckit task ID: T### · Flags: [P] [US#] (if present)

## What we're building

<the full task description from the tasks.md line>

## Files to update

<infer from the task line; speckit task lines include exact file paths after "in src/..." — extract and list them. If none can be inferred, leave the line "see plan.md / spec.md" and continue.>

## Implementation notes

<empty unless the task line itself contains "depends on Txxx, Tyyy" — in which case state the dependency. Substantive implementation notes belong in plan.md, not duplicated here.>

## Acceptance criteria

- [ ] Implementation satisfies the task description above
- [ ] `tasks.md` task line is checked off
- [ ] Build/test command passes (see AGENTS.md)

## Branch prefix

`feature/` (default) — switch to `fix/` or `chore/` only if the parent task list says so.
```

**Fields:**
- `team`, `project`: same as the parent
- `parentId`: the parent issue's identifier (so it renders as a sub-issue in Linear)
- `labels`: `["Source:Speckit", "Stage:<S0-S8>"]`. Append `"Blocker"` only if the task line is flagged as blocking dependents AND it has no `[P]` parallel marker.
- `state`: `"Spec Ready"`
- `priority`: unset

### 6. Wire up dependencies

After all child issues exist (so every task has an identifier), make a second pass to set blockers:

- Parse the **"Within Each User Story"** / **"Dependencies & Execution Order"** sections of `tasks.md` for `depends on T###` notes.
- For each child issue C that depends on tasks `T_a`, `T_b`, …, call `save_issue` with `id: C` and `blockedBy: [identifiers for T_a, T_b, ...]`.
- Tasks in a phase marked **"Foundational (Blocking Prerequisites)"** block every task in subsequent phases. Apply that wholesale rather than line-by-line.
- `blockedBy` is append-only in the MCP — safe to re-run.

### 7. Write the markers back into `tasks.md`

After every successful create, edit `tasks.md` to append `<!-- linear:<identifier> -->` at the end of the corresponding task line. Commit nothing — leave staging to the user.

### 8. Print a summary

Render one block per phase, like:

```
Parent · STA-141 · Tasks: Checkout flow

Phase 1 · Setup
  STA-142  T001  Create project structure                       Spec Ready
  STA-143  T002  Initialize Next.js project                     Spec Ready  blocks: STA-144
  STA-144  T003  Configure linting and formatting               Spec Ready

Phase 3 · User Story 1 (P1) · MVP
  STA-145  T010  Contract test for /checkout in tests/...       Spec Ready
  ...
```

End with a one-line note: *"Linear is now the source of truth for status. Agents will read `tasks.md` for the per-task detail and the spec/plan for context."*

### Dry-run mode

If `$ARGUMENTS` contains `--dry-run`, **skip every Linear MCP write call** but still emit the summary block from step 8 with placeholder identifiers like `STA-???`. Useful when first onboarding a feature.

## Post-Execution Checks

**Extension hooks (after tasks-to-linear conversion).** Same pattern as the pre-hooks, but reading `hooks.after_taskstolinear` from `.specify/extensions.yml`. Render optional vs mandatory blocks exactly as `speckit-taskstoissues` does. Skip silently if absent.

---

## Notes for the agent running this skill

- **Never create issues outside the resolved team/project.** If `list_teams` or `list_projects` does not return the expected name, stop and surface the mismatch — do not guess.
- **Never auto-create labels or projects.** Those are portfolio-level decisions per AGENTS.md / NovaStar §6.2.
- **Never silently re-create an issue that already has a `<!-- linear:... -->` marker.** Treat it as an update or skip.
- **Body markdown:** the Linear MCP `save_issue.description` requires real newlines and special characters — do not escape them.
- **One-shot, not interactive:** this is intended to be run once per feature after `/speckit-tasks`. Re-runs should be idempotent (update rather than duplicate).
