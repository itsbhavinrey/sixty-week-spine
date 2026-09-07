# <ID> — `<repo>`

<!--
  The document you read on the Monday you pick this project up. It answers "what am I
  building and why" without opening another file.

  Lives at phases/phase-<N>/projects/<ID>.md. Target 500–700 words.

  THE ONE RULE, HARDER HERE. AGENTS.md says: "Never state a version number, release date,
  EOL date, spec revision, pricing figure or free-tier limit from memory." Briefs go
  further — they are **version-free by design**. No version number, release date, EOL
  date, price or free-tier limit ever appears in a brief, not even one that is written in
  plan/01-roadmap.md. Where a brief needs to gesture at one, it links to
  ../verified/ and ../topics.md instead. That makes briefs the one class of file in this
  repo that cannot go stale, and leaves currency wholly owned by verify-phase.

  Names come from data/plan.json — that is what scripts/status.py reads. Where
  plan/01-roadmap.md disagrees, use plan.json and note the alternative in one parenthetical.

  Suffix the H1 with " · driftwatch layer <n>" when plan.json gives the project a layer.
-->

> <pitch, verbatim from data/plan.json — the ASCII-hyphen version, not plan/01's em-dash one>

**Phase <N>** · ships week <W> · <deploy> · difficulty <Low|Medium|High>
**Spec:** [`plan/01-roadmap.md`](../../../plan/01-roadmap.md) → search `<ID>`

## Why this one

<What problem it solves for a real person — not "to learn X". Why it sits at *this* week
rather than earlier or later: what it assumes you already built, and what later project
leans on it. For a spine project, what this layer adds to `driftwatch` and why that
ordering. Three or four sentences.>

## What you'll be able to do after

<Three or four concrete capabilities, each in the form "you will have written X yourself
and can explain Y". Expands **Proves:** from the spec rather than restating it.>

- <capability>
- <capability>
- <capability>

## Build plan

<Milestones sized against the phase's hour budget: the first hour, then 3–4 checkpoints,
then done. "Roughly" is a share of the project's hours, not a clock time.>

| # | Milestone | Roughly | Done when |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |

**Definition of done** — <the observable end state, tied to the ship checklist already in
[`../README.md`](../README.md). Not "it works": the thing someone else can watch happen.>

## Where you'll get stuck

<2–4 named failure modes. Each: the symptom you will actually see, why it happens, and what
to reach for. Say where the repo's 2-hour rule should fire. Derive these from the shape of
the problem — never invent specifics about a machine, an account or a dashboard you have
not seen. If plan/03-reality-check.md flags this project as a known overrun, say so here
and carry its mitigation.>

- **<symptom>** — <why> → <what to reach for>
- **<symptom>** — <why> → <what to reach for>

## The interview angle

<Questions this lets you answer in an India PBC loop. The system-design rep buried in it.
One line for the resume or repo description. The follow-up a good interviewer asks next —
and where the honest answer is "I cut that, here's why".>

## Scope discipline

**Out of scope** — <carried over from the spec, with one line on why each cut protects the
hour budget.>

**Stretch** — <carried over from the spec. Only after the ship checklist is green; a
stretch goal that eats the ship is a failure, not an upgrade.>

<!--
  Currency: this brief names no versions on purpose. Before starting, check
  [`../verified/`](../verified/) — newest file last — and re-run verify-phase if the newest
  is over 60 days old. The topics it checks are in [`../topics.md`](../topics.md).
-->
