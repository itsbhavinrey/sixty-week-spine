# Phase 7 — Distributed systems and interview reps

**Last verified: 2026-09-06** (baseline) · [`verified/`](verified/)

**Weeks 44–52** · 2027-07-05 → 2027-09-05 · 135 hours

## Theme

The vocabulary of the system design round, learned by building the smallest honest version of each idea.

## Exit criterion

> You can whiteboard a rate limiter, a feed and a chat system with numbers attached, and explain in one sentence why exactly-once delivery is a lie.

You may move on when this is true without looking anything up. Not when the weeks are used up.

## Weeks

| Week | Starts | Focus | Ships |
|---|---|---|---|
| 44 | 2027-07-05 | Kafka (KRaft), topics, partitions, consumer groups. Sysdesign reps start | — |
| 45 | 2027-07-12 | Transactional outbox, CDC, DLQs | P7.1 |
| 46 | 2027-07-19 | gRPC, protobuf, Buf, ConnectRPC, streaming | P7.2 |
| 47 | 2027-07-26 | Raft, CAP/PACELC, quorums, consistency models | P7.3 |
| 48 | 2027-08-02 | K8s workload level: Deployments, Services, Gateway API | — |
| 49 | 2027-08-09 | HPA, RBAC, Helm charts, kind | P7.4 |
| 50 | 2027-08-16 | System design reps 1-4 | — |
| 51 | 2027-08-23 | System design reps 5-8 | — |
| 52 | 2027-08-30 | System design reps 9-12 + DSA final push | P7.5 |

## Projects

### P7.1 — `outbox`

> A database write and a Kafka event that cannot diverge, plus a duplicate delivery you survive on purpose.

- **Deploy target:** Docker Compose + make demo + asciinema
- **Difficulty:** High
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P7.1`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P7.2 — `grpc-pair`

> Two services, one .proto contract, a streaming method, generated stubs in the repo, and a load test.

- **Deploy target:** Render free + Cloudflare Pages
- **Difficulty:** Medium
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P7.2`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P7.3 — `raftlet`

> Three nodes, one leader, and a network partition that doesn't produce two of them.

- **Deploy target:** Docker Compose + Pages visualizer
- **Difficulty:** High · **optional — cut this first if you are running late**
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P7.3`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P7.4 — `k8s-workload`

> driftwatch packaged for Kubernetes at the workload level - the layer you'd actually be asked about.

- **Deploy target:** kind + make demo + GIF
- **Difficulty:** Medium
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P7.4`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P7.5 — `sysdesign-reps`

> Twelve system design write-ups with real numbers, real diagrams, and a 'what I'd cut' section on each.

- **Deploy target:** GitHub Pages
- **Difficulty:** Medium
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P7.5`
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
Verify phase 7
```

That writes a dated audit into [`verified/`](verified/) and diffs it against the last one.
The topics it checks are in [`topics.md`](topics.md). **Do not start the projects above
until the current verification is less than 60 days old** — the whole point of this repo is
that the plan was accurate on 2026-09-06 and will not stay that way.

## Verification history

Files in [`verified/`](verified/), newest last. `git log -p phases/phase-7/verified/` shows
what moved between them.
