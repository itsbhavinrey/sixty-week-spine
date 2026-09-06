# The Sixty-Week Spine

A dated, version-audited engineering roadmap from one year of fullstack JavaScript to a
backend + AI engineer with 22 shipped public repos.

**2026-09-07 → 2027-10-31** · 900 hours at 15 hrs/week · ₹0 infrastructure, serverless only

> This plan was built on a currency audit of a source syllabus that turned out to be ~40 versions
> stale, describe six things as shipped that had never shipped, and quote ~22 statistics that
> trace to no primary source. **This repo exists so the same thing doesn't happen to the plan.**

---

## Quick start

```bash
# 1. get it onto your machine
unzip sixty-week-spine.zip && cd sixty-week-spine
git log --oneline          # history is already here

# 2. see where you are
python3 scripts/status.py

# 3. put it on GitHub — public
gh repo create sixty-week-spine --public --source=. --push
# or, without the gh CLI:
#   create an empty repo on github.com, then
git remote add origin git@github.com:<you>/sixty-week-spine.git
git push -u origin main
```

**Make it public.** A version-controlled learning plan with fourteen months of dated,
primary-sourced verification audits committed against it is itself an unusual portfolio signal —
it demonstrates the currency habit, which is rarer than being current. It also makes GitHub
Actions free, which the plan depends on.

---

## Using it with a coding agent

Open this folder in Cursor, Codex, Zed, or Claude. [`AGENTS.md`](AGENTS.md) is the always-on
file: TypeScript only, 15 hrs/week, ₹0 budget, serverless, India PBC target — and the one rule:

> Never state a version number, release date, spec revision or free-tier limit from memory.
> Read it from a primary source or write `unverified`.

Without that line, a future session will cheerfully hallucinate versions into your verification
files and you will trust them for months.

Skills live in [`.agents/skills/`](.agents/skills/) (`verify-phase`, `week-check`,
`ship-project`). Cursor, Codex, and Zed load `AGENTS.md` and those skills natively. Claude Code
needs [`CLAUDE.md`](CLAUDE.md), which imports `AGENTS.md` and points at the same skill files.

If the skills do not appear in the catalog, see [Fallback](#fallback) below.

### The two loops

**Every week — takes two minutes**

```
Week check
```

The agent runs `scripts/status.py`, tells you the week and phase, what ships, whether you're
behind, and whether the current phase's verification has gone stale. It will not tick anything
for you.

**At the start of every phase — takes about 30 minutes, nine times over 14 months**

```
Verify phase 3
```

This is the loop the repo is built around. The agent:

1. reads `phases/phase-3/topics.md` and the newest file in `phases/phase-3/verified/`
2. fans out parallel research across the topic clusters, each instructed to read only
   primary sources and to write `unverified` rather than guess
3. writes `phases/phase-3/verified/<today>.md`
4. **diffs it against the previous audit** and reports what moved
5. sorts everything into **REDO** / **ADJUST** / **NOTE ONLY** — the rule is in
   [`plan/02-staying-current.md`](plan/02-staying-current.md)
6. stages the change for you to commit

Then commit it:

```bash
git add phases/phase-3/verified/
git commit -m "verify: phase 3 — OAuth 2.1 reached draft-18, WebAuthn L3 unchanged"
```

**When starting or finishing a project**

```
Start P3.2
Is P3.2 ready to ship?
```

The agent pulls the full spec from [`plan/01-roadmap.md`](plan/01-roadmap.md), scaffolds from
[`templates/PROJECT_README.md`](templates/PROJECT_README.md), and — the useful part — reads the
out-of-scope list back to you before you write any code. Gold-plating is how a 10-hour project
becomes a 30-hour one.

### Fallback

If the skills don't load, nothing breaks. Open
[`plan/02-staying-current.md`](plan/02-staying-current.md), copy the re-verification prompt,
paste `phases/phase-N/topics.md` into the bracket, and send it. Same result, one extra step.

---

## Why this lives in git

Because `git diff` on the audits is the interesting artifact.

```bash
# what moved in the AI stack between two verifications
git diff phases/phase-6/verified/2027-04-26.md phases/phase-6/verified/2027-06-14.md

# every verification, in order, with what changed
git log -p --follow phases/phase-6/verified/

# just the headlines
git log --grep="^verify:" --oneline
```

By month 14 you will have nine to eighteen dated, primary-sourced snapshots of a fast-moving
ecosystem, taken at fixed intervals by the same method. That is a genuinely uncommon dataset and
an obvious blog post — *"what actually changed in the JavaScript and AI backend stack over
fourteen months, measured rather than remembered."*

Two rules keep it honest:

- **Verification files are append-only.** Never edit a past audit to correct it — write a new
  dated one. An old audit being wrong is the record, not a mistake to clean up.
- **Commit the ticks in `progress/weeks.md` as you make them.** The timestamps are the honest
  account of your pace, and you will want them in month 7.

---

## Layout

```
plan/
  00-currency-audit.md      the audit everything is built on. Read this first
  01-roadmap.md             the nine phases, 35 project specs, and the capstone
  02-staying-current.md     sources, the re-verification prompt, the redo-vs-note rule
  03-reality-check.md       the honest hours, and the three topics most likely to make you quit
  04-appendix.md            everything in the source syllabus off the critical path

phases/phase-N/
  README.md                 theme, exit criterion, weeks, projects, ship checklists
  topics.md                 the input to `verify-phase` — add to it as the phase reveals things
  verified/                 dated audits, newest last. The point of the repo

progress/
  weeks.md                  60 ticks
  projects.md               22 repos, their deploy targets, and their live URLs

templates/                  PROJECT_README.md · ADR.md · VERIFICATION.md
scripts/status.py           where am I, is my verification stale (stdlib only)
data/plan.json              machine-readable phases, weeks, projects, dates
.agents/skills/             week-check, verify-phase, ship-project
.claude/commands/           Claude-only slash adapters (`/week`, `/verify`, `/ship`)
```

---

## The rules that make this work

1. **Exit criteria, not dates.** A phase is done when you can do its exit criterion without
   looking it up — not when the weeks run out. See each `phases/phase-N/README.md`.
2. **Every topic ends in a shipped artifact.** A public repo with a real README, and either a
   live URL or `make demo` + an asciinema cast. Four projects are intentionally demo-only,
   because no free managed Kafka or Kubernetes exists — that's design, not a gap.
3. **The 2-hour rule.** Stuck more than two hours: write the failure as "I expect X, I observe
   Y", reduce to the smallest repro, read the source, *then* ask an AI. At four hours, ship it
   broken behind a flag and move on. Never let one bug eat a week.
4. **Five weeks are buffers** (15, 26, 33, 43, 60). You will need all five.
5. **Start applying at week 57**, not week 60. The search averages 5–6 months.
6. **Re-verify before each phase.** Nine times, 30 minutes each, over fourteen months. That is
   4.5 hours total to stop the plan rotting the way its source did.

---

## Provenance

Built 2026-09-06 from ~380 primary-source lookups across nine parallel verification passes.
Source syllabus: *Software Engineering Roadmap 2026* (compiled 2026-08-25).

Every version, date and free-tier limit in `plan/` was read from an official release page,
package registry, standards body or vendor pricing page on that date. Figures that could not be
traced to a primary source are marked `unverified` rather than repeated —
[`plan/00-currency-audit.md § A11`](plan/00-currency-audit.md) lists the ~22 that failed.

**This will go stale.** That is the entire premise. Run the loop.
