# Phase 0 — The shipping ritual

**Last verified: 2026-09-06** (baseline) · [`verified/`](verified/)

**Weeks 1–2** · 2026-09-07 → 2026-09-20 · 30 hours

## Theme

Build the machine that builds the projects. You will repeat this ritual ~20 times; every hour spent here is repaid five times.

## Exit criterion

> You can go from `mkdir` to a live URL with tests, CI, a signed image and a working README in under 40 minutes without looking anything up.

You may move on when this is true without looking anything up. Not when the weeks are used up.

## Weeks

| Week | Starts | Focus | Ships |
|---|---|---|---|
| 1 | 2026-09-07 | Repo template, TS strict, Vitest, Biome, GH Actions, README discipline | P0.1 |
| 2 | 2026-09-14 | Node CLI craft, npm registry API, semver, npx distribution | P0.2 |

## Projects

### P0.1 — `ship-kit`

> A TypeScript project template that goes from clone to live URL in ten minutes, with tests, CI and supply-chain checks already wired.

- **Deploy target:** Cloudflare Pages + GitHub template repo
- **Difficulty:** Low
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P0.1`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P0.2 — `driftwatch` · driftwatch layer 1

> Point it at a package.json and it tells you how far behind you are - latest version, release date, and how long since the project last shipped anything.

- **Deploy target:** npm + asciinema
- **Difficulty:** Low
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P0.2`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`

## Before you start this phase

Run the re-verification. In Cowork or Claude Code, with this repo's folder connected:

```
Verify phase 0
```

That writes a dated audit into [`verified/`](verified/) and diffs it against the last one.
The topics it checks are in [`topics.md`](topics.md). **Do not start the projects above
until the current verification is less than 60 days old** — the whole point of this repo is
that the plan was accurate on 2026-09-06 and will not stay that way.

## Verification history

Files in [`verified/`](verified/), newest last. `git log -p phases/phase-0/verified/` shows
what moved between them.
