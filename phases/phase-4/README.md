# Phase 4 — Ship it like you'll be paged

**Last verified: 2026-09-06** (baseline) · [`verified/`](verified/)

**Weeks 21–26** · 2027-01-25 → 2027-03-07 · 90 hours

## Theme

The phase that converts 'works on my machine' into a hiring signal. Docker, a supply-chain-aware pipeline, and the three signals.

## Exit criterion

> You can containerize a Node service into a <150 MB multi-stage image, wire a pipeline that tests, scans, signs and deploys, and answer 'what happened at 3am?' from traces and logs rather than guesswork.

You may move on when this is true without looking anything up. Not when the weeks are used up.

## Weeks

| Week | Starts | Focus | Ships |
|---|---|---|---|
| 21 | 2027-01-25 | Docker multi-stage, layer caching, distroless, rootless | P4.1 |
| 22 | 2027-02-01 | GH Actions: matrix, reusable workflows, attestations, SBOM, cosign | P4.2 |
| 23 | 2027-02-08 | OpenTelemetry: SDK, Collector, semantic conventions | — |
| 24 | 2027-02-15 | Traces/metrics/logs, W3C traceparent, sampling | P4.3 |
| 25 | 2027-02-22 | SLI/SLO/error budgets, burn-rate alerts, RED dashboards | P4.4 |
| 26 | 2027-03-01 | BUFFER - write ADRs / second blog post | — |

## Projects

### P4.1 — `slimjim`

> One Node service, five Dockerfiles, and the numbers that show which choices actually matter.

- **Deploy target:** GHCR (images are the artifact)
- **Difficulty:** Low
- **Brief:** [`projects/P4.1.md`](projects/P4.1.md)
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P4.1`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P4.2 — `pipeline`

> A reusable GitHub Actions workflow that tests, scans, generates an SBOM, signs the artifact, and deploys - that other repos can call in three lines.

- **Deploy target:** GitHub Actions reusable workflow
- **Difficulty:** Medium
- **Brief:** [`projects/P4.2.md`](projects/P4.2.md)
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P4.2`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P4.3 — `driftwatch` · driftwatch layer 5

> One trace that follows a scan from the API edge, through Postgres, out to the npm registry, and back.

- **Deploy target:** Grafana Cloud + Axiom + Sentry
- **Difficulty:** Medium
- **Brief:** [`projects/P4.3.md`](projects/P4.3.md)
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P4.3`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P4.4 — `slo-kit`

> SLOs as code for driftwatch, burn-rate alerts that fire, a public dashboard, and a postmortem for an outage you caused on purpose.

- **Deploy target:** Grafana Cloud (public dashboard)
- **Difficulty:** Medium
- **Brief:** [`projects/P4.4.md`](projects/P4.4.md)
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P4.4`
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
Verify phase 4
```

That writes a dated audit into [`verified/`](verified/) and diffs it against the last one.
The topics it checks are in [`topics.md`](topics.md). **Do not start the projects above
until the current verification is less than 60 days old** — the whole point of this repo is
that the plan was accurate on 2026-09-06 and will not stay that way.

## Verification history

Files in [`verified/`](verified/), newest last. `git log -p phases/phase-4/verified/` shows
what moved between them.
