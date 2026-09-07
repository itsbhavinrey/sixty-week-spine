# Phase 1 — SQL and the wire

**Last verified: 2026-09-06** (baseline) · [`verified/`](verified/)

**Weeks 3–8** · 2026-09-21 → 2026-11-01 · 90 hours

## Theme

The two things AI is worst at faking for you: a schema that survives contact with real data, and knowing what actually happens between a browser and your server.

## Exit criterion

> You can design a normalized schema, write a window-function query, read an EXPLAIN (ANALYZE, BUFFERS) plan and name the index that fixes it, and describe a TLS 1.3 handshake and an SSE stream - all from memory.

You may move on when this is true without looking anything up. Not when the weeks are used up.

## Weeks

| Week | Starts | Focus | Ships |
|---|---|---|---|
| 3 | 2026-09-21 | Joins, CTEs, window functions, aggregation. DSA starts: 1/day | — |
| 4 | 2026-09-28 | Indexing, EXPLAIN, transactions, isolation levels | P1.1 |
| 5 | 2026-10-05 | Schema design, normalization, migrations | P1.2 |
| 6 | 2026-10-12 | HTTP deeply, caching headers, cookies vs tokens | — |
| 7 | 2026-10-19 | DNS, TCP/UDP, TLS 1.3, HTTP/2 vs HTTP/3 | P1.3 |
| 8 | 2026-10-26 | SSE, WebSockets, Durable Objects | P1.4 |

## Projects

### P1.1 — `pgtour`

> Twelve analytical questions against a real public dataset, answered in SQL, with every query's plan and the index that made it fast.

- **Deploy target:** Neon free + Cloudflare Pages
- **Difficulty:** Medium
- **Brief:** [`projects/P1.1.md`](projects/P1.1.md)
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P1.1`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P1.2 — `driftwatch` · driftwatch layer 2

> The CLI grows a memory: scans, packages, versions and findings persisted in a schema that can answer 'what changed since last week?'

- **Deploy target:** Neon free
- **Difficulty:** Medium
- **Brief:** [`projects/P1.2.md`](projects/P1.2.md)
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P1.2`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P1.3 — `wire`

> Paste a URL, get the full story: DNS chain, TLS handshake, certificate chain, negotiated HTTP version, every header, and what your caching setup is actually doing.

- **Deploy target:** Cloudflare Workers
- **Difficulty:** Medium
- **Brief:** [`projects/P1.3.md`](projects/P1.3.md)
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P1.3`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P1.4 — `sse-vs-ws`

> The same live counter built three ways - polling, SSE, WebSocket - with the bytes and latency to show when each one is the right answer.

- **Deploy target:** Cloudflare Workers + Durable Objects
- **Difficulty:** Medium
- **Brief:** [`projects/P1.4.md`](projects/P1.4.md)
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P1.4`
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
Verify phase 1
```

That writes a dated audit into [`verified/`](verified/) and diffs it against the last one.
The topics it checks are in [`topics.md`](topics.md). **Do not start the projects above
until the current verification is less than 60 days old** — the whole point of this repo is
that the plan was accurate on 2026-09-06 and will not stay that way.

## Verification history

Files in [`verified/`](verified/), newest last. `git log -p phases/phase-1/verified/` shows
what moved between them.
