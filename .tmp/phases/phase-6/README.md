# Phase 6 — The AI backend layer

**Last verified: 2026-09-06** (baseline) · [`verified/`](verified/)

**Weeks 34–43** · 2027-04-26 → 2027-07-04 · 150 hours

## Theme

The fastest-growing backend niche - and the phase where 'I built a wrapper' and 'I built an eval pipeline' are two different salary bands.

## Exit criterion

> You can ship an LLM feature with streaming, a cost budget, a golden-dataset eval running in CI, and an honest published write-up of what your retrieval gets wrong.

You may move on when this is true without looking anything up. Not when the weeks are used up.

## Weeks

| Week | Starts | Focus | Ships |
|---|---|---|---|
| 34 | 2027-04-26 | LLM APIs, SSE relay, provider fallback, token/cost metering | P6.1 |
| 35 | 2027-05-03 | Context engineering, prompts-as-code, injection defense | P6.2 |
| 36 | 2027-05-10 | Golden datasets, LLM-as-judge and its biases | — |
| 37 | 2027-05-17 | Pairwise/Elo, regression tests in CI | P6.3 |
| 38 | 2027-05-24 | Chunking, embeddings, indexing | — |
| 39 | 2027-05-31 | Hybrid retrieval, RRF, reranking, contextual retrieval | P6.4 |
| 40 | 2027-06-07 | MCP spec, tools as security boundaries | — |
| 41 | 2027-06-14 | MCP auth, stateless design, threat modelling | P6.5 |
| 42 | 2027-06-21 | Agents: ReAct, tool schemas, guardrails, human checkpoints | P6.6 |
| 43 | 2027-06-28 | Prompt caching, batching, routing + BUFFER | P6.7 |

## Projects

### P6.1 — `streamgate`

> A provider-agnostic LLM gateway that streams, fails over, meters every token, and refuses to bankrupt you.

- **Deploy target:** Cloudflare Workers + D1
- **Difficulty:** Medium
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P6.1`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P6.2 — `promptlab`

> Prompts as versioned, tested files - with an injection suite that fails the build.

- **Deploy target:** Cloudflare Workers + GitHub Actions
- **Difficulty:** Medium
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P6.2`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P6.3 — `evalbench`

> A golden dataset, an LLM judge, and a CI job that tells you whether your last prompt change made things worse.

- **Deploy target:** GitHub Actions + Pages
- **Difficulty:** Medium
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P6.3`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P6.4 — `driftwatch` · driftwatch layer 7

> Ask 'what actually breaks if I go from React Router 7 to 8?' and get a cited answer built from the real release notes.

- **Deploy target:** Neon pgvector + Cloudflare Workers
- **Difficulty:** High
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P6.4`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P6.5 — `driftwatch-mcp`

> An MCP server on the current spec that lets Claude Code ask your service what's rotting in a repo.

- **Deploy target:** Cloudflare Workers
- **Difficulty:** High
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P6.5`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P6.6 — `upgrade-agent`

> An agent that reads your changelog RAG, decides an upgrade is safe, opens a real PR, and waits for a human to say yes.

- **Deploy target:** GitHub App + Cloudflare Workers
- **Difficulty:** High
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P6.6`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P6.7 — `driftwatch` · driftwatch layer 7b

> Measured cost reduction on driftwatch's LLM spend, with the before-and-after numbers.

- **Deploy target:** Cloudflare Workers
- **Difficulty:** Low
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P6.7`
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
Verify phase 6
```

That writes a dated audit into [`verified/`](verified/) and diffs it against the last one.
The topics it checks are in [`topics.md`](topics.md). **Do not start the projects above
until the current verification is less than 60 days old** — the whole point of this repo is
that the plan was accurate on 2026-09-06 and will not stay that way.

## Verification history

Files in [`verified/`](verified/), newest last. `git log -p phases/phase-6/verified/` shows
what moved between them.
