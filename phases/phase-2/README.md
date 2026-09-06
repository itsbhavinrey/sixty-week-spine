# Phase 2 — TypeScript and API design

**Last verified: 2026-09-06** (baseline) · [`verified/`](verified/)

**Weeks 9–15** · 2026-11-02 → 2026-12-20 · 105 hours

## Theme

Types that do work, and REST that someone can integrate against without messaging you.

## Exit criterion

> You can type an API boundary end-to-end with zero `any`, and design a paginated, idempotent, versioned, rate-limited endpoint with an OpenAPI contract without reference.

You may move on when this is true without looking anything up. Not when the weeks are used up.

## Weeks

| Week | Starts | Focus | Ships |
|---|---|---|---|
| 9 | 2026-11-02 | TS strict, generics, discriminated unions | — |
| 10 | 2026-11-09 | Conditional/mapped types, satisfies, zod at boundaries | P2.1 |
| 11 | 2026-11-16 | REST design: cursor pagination, idempotency keys, RFC 9457 | — |
| 12 | 2026-11-23 | Rate limiting, versioning, OpenAPI | P2.2 |
| 13 | 2026-11-30 | Raw SQL vs Drizzle; the emitted-SQL question | P2.3 |
| 14 | 2026-12-07 | Vitest, integration testing, Neon branch-per-CI-run | P2.4 |
| 15 | 2026-12-14 | BUFFER - catch-up / write the first blog post | — |

## Projects

### P2.1 — `typed-api-contract`

> A client and server that cannot disagree, and eight bugs the type system refuses to compile.

- **Deploy target:** Cloudflare Workers + Pages
- **Difficulty:** Low
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P2.1`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P2.2 — `driftwatch` · driftwatch layer 3

> A REST API you could hand to a stranger: cursor pagination, idempotent writes, machine-readable errors, and an OpenAPI contract.

- **Deploy target:** Cloudflare Workers + Neon
- **Difficulty:** Medium
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P2.2`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P2.3 — `orm-xray`

> Eight queries, written twice - raw SQL and Drizzle - with the SQL each one actually emits and what the planner does with it.

- **Deploy target:** Neon + Cloudflare Pages
- **Difficulty:** Low
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P2.3`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P2.4 — `driftwatch` · driftwatch layer 3b

> The driftwatch test suite: unit tests that run in 2 seconds and integration tests that run against a real Postgres in CI.

- **Deploy target:** GitHub Actions + Neon branches
- **Difficulty:** Medium
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P2.4`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`

## Before you start this phase

Run the re-verification. In any coding agent with this folder open:

```
Verify phase 2
```

That writes a dated audit into [`verified/`](verified/) and diffs it against the last one.
The topics it checks are in [`topics.md`](topics.md). **Do not start the projects above
until the current verification is less than 60 days old** — the whole point of this repo is
that the plan was accurate on 2026-09-06 and will not stay that way.

## Verification history

Files in [`verified/`](verified/), newest last. `git log -p phases/phase-2/verified/` shows
what moved between them.
