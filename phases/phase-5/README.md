# Phase 5 — Production backend

**Last verified: 2026-09-06** (baseline) · [`verified/`](verified/)

**Weeks 27–33** · 2027-03-08 → 2027-04-25 · 105 hours

## Theme

Caching, work off the request path, realtime at scale, and knowing your own numbers.

## Exit criterion

> You can pick a cache strategy and defend it against two alternatives, run background work idempotently, and produce a load-test graph showing where your service falls over and why.

You may move on when this is true without looking anything up. Not when the weeks are used up.

## Weeks

| Week | Starts | Focus | Ships |
|---|---|---|---|
| 27 | 2027-03-08 | Caching ladder, cache-aside, stampede, invalidation, eviction | P5.1 |
| 28 | 2027-03-15 | Queues, background jobs, retries with jittered backoff | — |
| 29 | 2027-03-22 | Idempotent consumers, DLQs, at-least-once reality | P5.2 |
| 30 | 2027-03-29 | Realtime at scale: Durable Objects, backplane patterns | P5.3 |
| 31 | 2027-04-05 | k6 load testing, pooling, replicas | — |
| 32 | 2027-04-12 | N+1 hunting, index tuning under load | P5.4 |
| 33 | 2027-04-19 | BUFFER - publish the benchmark write-up | — |

## Projects

### P5.1 — `cache-ladder`

> The same endpoint at four cache layers, with the hit rates and latencies that tell you which one was worth it.

- **Deploy target:** Cloudflare Workers + Upstash
- **Difficulty:** Medium
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P5.1`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P5.2 — `driftwatch` · driftwatch layer 6

> Scanning moves off the request path - with a duplicate delivery you can prove you survive.

- **Deploy target:** Cloudflare Workers + Queues
- **Difficulty:** Medium
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P5.2`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P5.3 — `roomd`

> Live presence for many people in one room, on Durable Objects, with an honest answer about what happens when the connection drops.

- **Deploy target:** Cloudflare Workers + Durable Objects
- **Difficulty:** Medium
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P5.3`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P5.4 — `breakpoint`

> Load-test driftwatch until it breaks, find out why, fix it, and show the graph.

- **Deploy target:** k6 + GitHub Actions
- **Difficulty:** Medium
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P5.4`
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
Verify phase 5
```

That writes a dated audit into [`verified/`](verified/) and diffs it against the last one.
The topics it checks are in [`topics.md`](topics.md). **Do not start the projects above
until the current verification is less than 60 days old** — the whole point of this repo is
that the plan was accurate on 2026-09-06 and will not stay that way.

## Verification history

Files in [`verified/`](verified/), newest last. `git log -p phases/phase-5/verified/` shows
what moved between them.
