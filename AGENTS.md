# AGENTS.md — context for any coding agent working in this repo

Read this before doing anything else here.

## What this repo is

A 60-week, 900-hour engineering learning plan for **Bhavin** (`pandya.b@media.net`), running
**2026-09-07 → 2027-10-31**, plus the machinery to keep it from going stale.

The plan itself is in [`plan/`](plan/). It was built on a currency audit
([`plan/00-currency-audit.md`](plan/00-currency-audit.md)) of a source syllabus that turned out
to be ~40 versions stale, describe six things as shipped that had never shipped, and quote ~22
statistics that trace to no primary source. **That is the failure mode this repo exists to
prevent from happening to the plan itself.**

## The one rule that matters

**Never state a version number, release date, EOL date, spec revision, pricing figure or
free-tier limit from memory.** Your training data is stale by construction. Every such fact
must come from a primary source read during this session:

- an official release page or changelog
- a package registry API (`registry.npmjs.org`, `pypi.org/pypi/<pkg>/json`, `crates.io`)
- a GitHub Releases page
- a standards body (`w3.org`, `datatracker.ietf.org`, `owasp.org`, `modelcontextprotocol.io`)
- the vendor's own pricing page — never a comparison article

If you cannot reach a primary source, write **`unverified`**. Do not guess, do not infer from a
blog post, and do not repeat a number because it sounds right. A wrong version in a verification
file is worse than a missing one, because it will be trusted for months.

## Who Bhavin is, and the constraints that shape every answer

| | |
|---|---|
| Level | ~1 year fullstack JavaScript, comfortable with git and Docker basics |
| Stack | **JavaScript / TypeScript.** Suggest Python only where there is genuinely no TS path |
| Time | **15 hrs/week.** A project that does not fit in 4–12 hours is wrongly scoped |
| Budget | **₹0.** Free tiers only, **serverless — no VPS.** Never propose anything that needs a card |
| Goal | Job switch to an India product company (backend / backend+AI), plus remote/global visibility |
| Interviews | System design reps and DSA matter — India PBC loops test both |

When these conflict with "the best way to do it", say so explicitly and then respect the
constraint. Bhavin chose serverless-only knowingly; four projects ship as `docker compose` +
asciinema instead of a live URL, and that is the intended design, not a gap to fix.

## Layout

```
plan/            the roadmap. 00 is the audit, 01 is the phases + capstone, 02–04 support it
phases/N/        one folder per phase: brief, topics to verify, and dated verification results
  README.md      theme, exit criterion, weeks, projects, ship checklists
  topics.md      the input to the verify-phase skill
  verified/      YYYY-MM-DD.md audits. Newest last. git log -p here shows ecosystem drift
progress/        weeks.md (60 ticks) and projects.md (22 repos + live URLs)
templates/       PROJECT_README.md, ADR.md, VERIFICATION.md
scripts/         status.py — where am I, is my verification stale
data/plan.json   machine-readable phases, weeks, projects, dates
.agents/skills/  week-check, verify-phase, ship-project (.claude/skills symlinks here)
```

## Skills in this repo

- **`verify-phase`** — the core loop. Re-checks one phase's topics against primary sources,
  writes a dated file into `phases/phase-N/verified/`, and diffs it against the previous one.
- **`week-check`** — where am I, what is due, is anything stale.
- **`ship-project`** — scaffold a project repo and check it against its spec before it ships.

## Conventions

- **Dates are ISO** (`2026-09-06`) everywhere, including filenames.
- **Verification files are append-only.** Never edit a past audit to correct it — write a new
  dated one. The wrongness of an old audit is information.
- **Commit after every verification**, with the phase number in the message so
  `git log --grep` works: `verify: phase 6 — MCP spec moved, embeddings line changed`.
- **Never mark a week or project done on Bhavin's behalf.** Suggest it; let him tick it.
- Prose in this repo is terse and concrete. No motivational filler.

## What to do when asked something this repo does not cover

Answer normally. Not every question in a session here is about the roadmap. But if the answer
involves a version, a price or a limit, the one rule above still applies.
