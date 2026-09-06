# Phase 8 — Capstone and launch

**Last verified: 2026-09-06** (baseline) · [`verified/`](verified/)

**Weeks 53–60** · 2027-09-06 → 2027-10-31 · 120 hours

## Theme

The spine becomes a product with real users, and you start applying.

## Exit criterion

> driftwatch v1.0 is live with a public dataset, all 22 READMEs pass the 60-second test, and 20+ applications are out.

You may move on when this is true without looking anything up. Not when the weeks are used up.

## Weeks

| Week | Starts | Focus | Ships |
|---|---|---|---|
| 53 | 2027-09-06 | Multi-tenancy hardening, the public Drift Index | — |
| 54 | 2027-09-13 | Public dataset + landing page | — |
| 55 | 2027-09-20 | Architecture doc + ADR backfill | — |
| 56 | 2027-09-27 | Portfolio pass: all 22 READMEs to standard | — |
| 57 | 2027-10-04 | Resume (X-Y-Z), LinkedIn, GitHub profile - START APPLYING | — |
| 58 | 2027-10-11 | Launch: HN / r/programming / dev.to writeup | — |
| 59 | 2027-10-18 | Interview prep: mock designs, mock DSA | — |
| 60 | 2027-10-25 | BUFFER + first applications wave | C1 |

## Projects

### C1 — `driftwatch` · driftwatch layer v1.0

> Know what rotted in your dependency tree while you weren't looking - with the changelog evidence for every claim.

- **Deploy target:** Cloudflare Workers + Neon + GitHub App
- **Difficulty:** High
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `C1`
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
Verify phase 8
```

That writes a dated audit into [`verified/`](verified/) and diffs it against the last one.
The topics it checks are in [`topics.md`](topics.md). **Do not start the projects above
until the current verification is less than 60 days old** — the whole point of this repo is
that the plan was accurate on 2026-09-06 and will not stay that way.

## Verification history

Files in [`verified/`](verified/), newest last. `git log -p phases/phase-8/verified/` shows
what moved between them.
