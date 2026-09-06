# Parts B & C — The Roadmap and Capstone

**Last verified: 2026-09-06** · Start date **Mon 2026-09-07** · 15 hrs/week · 60 weeks → **ends Sun 2027-10-31**
**Confirmed scope:** mobile cut · AI Track A only (no classical ML, no data engineering) · **serverless only, no VPS** · 14-month job-switch spine + undated appendix

---

## How this plan is shaped

**One spine, many spurs.** A single project — **`driftwatch`** — grows across 8 layers from Week 2 to Week 60. It's a dependency-currency service: point it at a repo and it tells you what's stale, what's deprecated, and what actually breaks if you upgrade. It is the exact problem Part A solved by hand, which means you already know it's real and you already know what good output looks like. Around it sit ~20 standalone projects, each 8–14 hours, each its own public repo.

**Why a spine at all:** interviewers can smell 15 disconnected tutorial repos. One system that visibly grew from a CLI to a multi-tenant service with RAG, evals, an MCP server and a load-test graph is a different conversation. It's also the repo that can get attention on HN/GitHub, which is your remote-visibility play.

**Where I reordered the syllabus** (rule 5):

| Change | One-line reason |
|---|---|
| **Evals before RAG** (doc has RAG 7th, evals 6th but treats evals as optional-feeling) | Without a golden dataset you cannot tell whether your reranker helped — building RAG first means rebuilding it |
| **SQL + wire protocols before any framework** | The doc says "SQL before ORMs"; I extended it: TLS/SSE literacy gates both the auth phase and the entire AI streaming layer |
| **Auth before deployment** | You should never deploy something publicly that you don't yet know how to secure |
| **Observability before load testing** | A load test without traces tells you *that* it broke, not *where* |
| **Kubernetes after everything** (doc puts it mid-DevOps) | 70–80% of K8s roles are senior; it earns you nothing at the mid-level bar and costs 2 weeks. It's here only for interview vocabulary |
| **DSA runs parallel from W3, not as a block** | Two months of one-a-day works; two months of nothing-else burns people out |

**The standing 2-hour rule** (rule 6). When stuck >2 hours on one thing:
1. Write the failure down in `NOTES.md` as a falsifiable sentence: "I expect X, I observe Y."
2. Reduce to the smallest reproduction that still fails. This solves it about half the time.
3. Read the actual source of the thing that's failing — not a blog about it.
4. Only now ask an AI, and paste your falsifiable sentence, not "why doesn't this work."
5. Still stuck at 4 hours: ship the broken thing behind a flag, open a GitHub issue on your own repo describing it, move on. Come back next week. **Never** let one bug eat a whole week's 15 hours — that's the single most common way this plan dies.

**The $0 constraint, stated honestly.** Serverless-only means four projects cannot have a live URL: Kafka, Kubernetes, the Raft toy, and the self-hosted OTel Collector. Those ship as `docker compose up` + `make demo` + an asciinema recording, which is a completely legitimate proof and is called out in each spec. Everything else gets a real URL.

**Weekly hour split.** 15 hrs = **~9 building / ~3 learning / ~3 drills** (DSA W3–W20 and W50–W58; system design reps W44–W58). Where a phase deviates, the table says so.

---

# PHASE 0 — The shipping ritual
**Weeks 1–2 · Sep 7 – Sep 20, 2026 · 30 hrs**

**Theme:** Build the machine that builds the projects. You will repeat this ritual ~20 times; every hour spent here is repaid five times.

**Exit criterion:** You can go from `mkdir` to a live URL with tests, CI, a signed image and a working README in **under 40 minutes without looking anything up**.

| Week | Dates | Topic(s) | Hours | Project to ship | Deploy target | Proof it worked |
|---|---|---|---|---|---|---|
| 1 | Sep 7 | Repo template, TS strict, Vitest 5, Biome, GH Actions, README discipline | 15 | **P0.1 `ship-kit`** | Cloudflare Pages (docs) + GitHub template repo | Someone else clones it and deploys in <10 min |
| 2 | Sep 14 | Node CLI craft, npm registry API, semver, `npx` distribution | 15 | **P0.2 `driftwatch` L1 (CLI)** | npm + asciinema | `npx driftwatch ./package.json` works from a clean machine |

### P0.1 — `ship-kit`
> A TypeScript project template that goes from clone to live URL in ten minutes, with tests, CI and supply-chain checks already wired.

**Build:** TS 7 strict + `satisfies`; Vitest 5 with coverage gate; Biome; a GH Actions workflow (test → Semgrep + Gitleaks → build → deploy to Cloudflare); `docs/adr/0001-record-architecture-decisions.md`; a README template with the six sections every later repo uses.

**Out of scope:** any application logic, Docker (comes in Phase 4), monorepo tooling.

**Proves:** you set up your own tooling rather than inheriting a bootcamp's.

**Stretch:** publish it as a `create-ship-kit` npx scaffolder.

**README must show:** the 10-minute quickstart, a diagram of what CI does, and *why* each tool was chosen over its alternative in one line each.

### P0.2 — `driftwatch` Layer 1: the CLI
> Point it at a package.json and it tells you how far behind you are — latest version, release date, and how long since the project last shipped anything.

**Build:** read `package.json`; query the npm registry for each dep; report current vs latest, release date, days-since-last-publish (the staleness signal Part A used to catch Ragas and BentoML); flag anything with no release in >6 months; `--json` output; coloured table output.

**Out of scope:** no server, no database, no LLM, no GitHub integration, no other ecosystems (PyPI/crates come much later or never).

**Proves:** you can write and distribute a real CLI tool — the syllabus's own month-2 foundations deliverable.

**Stretch:** a `--budget` flag that fails CI if any dep is more than N majors behind.

**README must show:** an asciinema cast at the top, the staleness heuristic explained and defended, and a table of what it deliberately does *not* do.

**Difficulty:** ⚪ Low. If this takes more than 12 hours, your TS is weaker than "1 year fullstack" implies — that's useful information, not a failure.

---

# PHASE 1 — SQL and the wire
**Weeks 3–8 · Sep 21 – Nov 1, 2026 · 90 hrs**

**Theme:** The two things AI is worst at faking for you: a schema that survives contact with real data, and knowing what actually happens between a browser and your server.

**Exit criterion:** You can design a normalized schema, write a window-function query, read an `EXPLAIN (ANALYZE, BUFFERS)` plan and name the index that fixes it, and describe a TLS 1.3 handshake and an SSE stream — all from memory.

| Week | Dates | Topic(s) | Hours | Project to ship | Deploy target | Proof it worked |
|---|---|---|---|---|---|---|
| 3 | Sep 21 | Joins, CTEs, window functions, aggregation | 15 (9/3/3 DSA starts) | **P1.1 `pgtour`** (start) | Neon free | — |
| 4 | Sep 28 | Indexing, EXPLAIN, transactions, isolation levels | 15 | **P1.1** ships | Neon + CF Pages | Before/after EXPLAIN with real timings |
| 5 | Oct 5 | Schema design, normalization, migrations | 15 | **P1.2 `driftwatch` L2 (Postgres)** | Neon | Migrations run clean from empty DB |
| 6 | Oct 12 | HTTP deeply, caching headers, cookies vs tokens | 15 | **P1.3 `wire`** (start) | — | — |
| 7 | Oct 19 | DNS, TCP/UDP, TLS 1.3, HTTP/2 vs HTTP/3 | 15 | **P1.3** ships | Cloudflare Workers | Live URL that inspects any domain |
| 8 | Oct 26 | SSE, WebSockets, Durable Objects | 15 | **P1.4 `sse-vs-ws`** | Workers + Durable Objects | Three live demos + latency table |

### P1.1 — `pgtour`
> Twelve analytical questions against a real public dataset, answered in SQL, with every query's plan and the index that made it fast.

**Build:** load a genuinely messy open dataset (India open-data portal, or the npm registry dump from P0.2) into Neon; answer 12 questions requiring joins, CTEs and window functions; capture `EXPLAIN (ANALYZE, BUFFERS)` before and after indexing; a static page rendering query → plan → timing.

**Out of scope:** no ORM, no application, no charts library beyond something trivial, no data-cleaning pipeline.

**Proves:** you write SQL, not ORM calls — the thing every India PBC interview tests within ten minutes.

**Stretch:** add one query that's genuinely faster as a lateral join than a subquery, and show why.

**README must show:** the schema diagram, the 12 questions, and a table of `query | before ms | after ms | index added | why`.

**Deploy:** Neon free (0.5 GB, 100 CU-hrs/mo, scale-to-zero after 5 min) + Cloudflare Pages.

**Difficulty:** 🟡 Medium. Window functions are the wall. Budget an extra 3 hours for them and do not skip them — they show up in interviews constantly.

### P1.2 — `driftwatch` Layer 2: Postgres
> The CLI grows a memory: scans, packages, versions and findings persisted in a schema that can answer "what changed since last week?"

**Build:** a normalized schema (`orgs`, `repos`, `scans`, `packages`, `package_versions`, `findings`); a migration tool (`node-pg-migrate` or raw SQL + a runner — your choice, defend it in an ADR); the CLI writes scans to Neon; one query that diffs two scans.

**Out of scope:** no API yet, no auth, no UI, no ORM.

**Proves:** you can design a schema before you write application code.

**Stretch:** temporal validity on `package_versions` using PG18's `WITHOUT OVERLAPS` constraints.

**README must show:** an ERD, the normalization decisions and what you deliberately denormalized, and the diff query with its plan.

### P1.3 — `wire`
> Paste a URL, get the full story: DNS chain, TLS handshake, certificate chain, negotiated HTTP version, every header, and what your caching setup is actually doing.

**Build:** DNS resolution chain with record types; TLS version + cipher suite + full cert chain with expiry; HTTP version negotiated (flag if not h2/h3); complete request/response headers; a caching analysis that reads `Cache-Control`/`ETag`/`Vary` and says in English what a CDN will do with this response.

**Out of scope:** no security scoring, no historical tracking, no accounts, no scanning of arbitrary ports.

**Proves:** you understand the network layer instead of treating it as magic — which is what lets you debug a production issue nobody else can.

**Stretch:** show the HTTP/3 vs HTTP/2 handshake round-trip difference with real timings.

**README must show:** a sequence diagram of a TLS 1.3 handshake you drew yourself, and three real sites where the tool found a genuinely wrong caching header.

**Deploy:** Cloudflare Workers free (100k req/day, 10 ms CPU/invocation — plenty).

### P1.4 — `sse-vs-ws`
> The same live counter built three ways — polling, SSE, WebSocket — with the bytes and latency to show when each one is the right answer.

**Build:** identical UI, three transports (polling, SSE via Workers, WebSocket via Durable Objects); a measurement panel showing bytes transferred, messages/sec and p50/p99 latency; a reconnection demo where you kill the connection and show each one's recovery behaviour.

**Out of scope:** no chat app, no auth, no persistence beyond the DO, no scaling test (that's Phase 5).

**Proves:** you know why every LLM API streams over SSE and not WebSockets — a question that comes up in AI-backend interviews.

**Stretch:** add HTTP/2 server push's corpse as a fourth panel explaining why it died.

**README must show:** the decision table (`transport | direction | reconnect | proxy-friendly | use when`), and the measured numbers.

**Deploy:** Workers + Durable Objects (SQLite-backed DOs are on the free plan).

---

# PHASE 2 — TypeScript that catches bugs, APIs a stranger can use
**Weeks 9–15 · Nov 2 – Dec 20, 2026 · 105 hrs**

**Theme:** Types that do work, and REST that someone can integrate against without messaging you.

**Exit criterion:** You can type an API boundary end-to-end with zero `any`, and design a paginated, idempotent, versioned, rate-limited endpoint with an OpenAPI 3.2 contract without reference.

| Week | Dates | Topic(s) | Hours | Project to ship | Deploy target | Proof it worked |
|---|---|---|---|---|---|---|
| 9 | Nov 2 | TS strict, generics, discriminated unions | 15 | **P2.1 `typed-api-contract`** (start) | — | — |
| 10 | Nov 9 | Conditional/mapped types, `satisfies`, zod at boundaries | 15 | **P2.1** ships | Workers + Pages | Zero `any`; type-error demos in README |
| 11 | Nov 16 | REST design: cursor pagination, idempotency keys, RFC 9457 | 15 | **P2.2 `driftwatch` L3 (API)** (start) | — | — |
| 12 | Nov 23 | Rate limiting, versioning, **OpenAPI 3.2** | 15 | **P2.2** ships | Workers + Neon | Public OpenAPI 3.2 spec + Scalar docs page |
| 13 | Nov 30 | Raw SQL vs Drizzle; the emitted-SQL question | 15 | **P2.3 `orm-xray`** | Neon + Pages | Side-by-side SQL + plans |
| 14 | Dec 7 | Vitest 5, integration testing, Neon branch-per-CI-run | 15 | **P2.4 `test-harness`** | GH Actions | Green CI with real-Postgres integration tests |
| 15 | Dec 14 | **Buffer / catch-up / write the first blog post** | 15 | — | — | Slack in the schedule — use it |

### P2.1 — `typed-api-contract`
> A client and server that cannot disagree, and eight bugs the type system refuses to compile.

**Build:** a shared schema module (zod or valibot) generating both TS types and runtime validators; a typed fetch client; `satisfies` used properly; a `bugs/` folder with 8 commented-out lines that each produce a specific compile error, documented.

**Out of scope:** no tRPC (that's a monorepo-only tool), no codegen pipeline, no real domain — keep it toy.

**Proves:** you use TypeScript as a correctness tool rather than as decoration.

**Stretch:** add a branded-type example (`UserId` vs `OrgId` that can't be swapped).

**README must show:** the 8 bugs with their exact compiler errors, and one honest "type I wanted but couldn't express" note.

**⚠️ Note:** Drizzle's npm `latest` is still **0.45.2**, not 1.0 — its docs show 1.0 syntax. Pin explicitly and say so in the README; this is exactly the kind of trap an interviewer likes hearing you caught.

### P2.2 — `driftwatch` Layer 3: the public API
> A REST API you could hand to a stranger: cursor pagination, idempotent writes, machine-readable errors, and an OpenAPI 3.2 contract.

**Build:** `POST /scans` with an `Idempotency-Key` header (Stripe pattern, stored replay); `GET /scans/:id/findings` with cursor pagination; **RFC 9457** Problem Details for every error; 429 + `Retry-After`; URL-path versioning with a documented deprecation policy; a hand-written **OpenAPI 3.2** spec served at `/openapi.json` and rendered with Scalar.

**Out of scope:** no auth yet (Phase 3), no GraphQL, no webhooks, no SDK generation.

**Proves:** you design APIs against a contract rather than emitting whatever the ORM returns.

**Stretch:** generate a typed client from your own OpenAPI spec and use it in the CLI.

**README must show:** an architecture diagram, the pagination decision (cursor vs offset) defended in three lines, and a `curl` transcript demonstrating idempotent replay.

### P2.3 — `orm-xray`
> Eight queries, written twice — raw SQL and Drizzle — with the SQL each one actually emits and what the planner does with it.

**Build:** 8 queries of rising complexity against the driftwatch schema; capture Drizzle's emitted SQL; `EXPLAIN` both; find at least one case where the ORM emits something meaningfully worse (an N+1, or a missing index hint) and fix it.

**Out of scope:** no Prisma comparison (scope creep), no benchmarking harness, no verdict on which is "better."

**Proves:** you know what your ORM does, which is the difference between using one and hiding behind one.

**Stretch:** add the same 8 in Prisma 7.10 and make it a three-way table.

**README must show:** the side-by-side table and the one query where the ORM lost, with the plan.

### P2.4 — `test-harness`
> The driftwatch test suite: unit tests that run in 2 seconds and integration tests that run against a real Postgres in CI.

**Build:** Vitest 5 unit tests; integration tests against a **Neon branch created per CI run and destroyed after** (free tier allows 10 branches); a coverage gate that fails the build; one deliberately flaky test, diagnosed and fixed with the diagnosis written up.

**Out of scope:** no E2E/Playwright yet, no mutation testing, no load testing (Phase 5).

**Proves:** you test against the real database, not a mock that lies. The syllabus's own data — 74.3% of orgs rolled back AI code after failures unit tests missed — is the argument.

**Stretch:** add Playwright smoke tests against the deployed Worker.

**README must show:** the test pyramid as it actually is in this repo (with counts), the CI timing, and the flaky-test post-mortem.

---

# PHASE 3 — Auth and the security baseline
**Weeks 16–20 · Dec 21, 2026 – Jan 24, 2027 · 75 hrs**

**Theme:** The one area where a wrong AI-generated snippet costs you the job rather than a review comment.

**Exit criterion:** You can implement password + session auth, a complete OAuth 2.1 + PKCE flow, and a passkey ceremony from scratch — and given any bug, name its OWASP Top 10:2025 category.

| Week | Dates | Topic(s) | Hours | Project to ship | Deploy target | Proof it worked |
|---|---|---|---|---|---|---|
| 16 | Dec 21 | argon2id, sessions vs JWT, httpOnly cookies | 15 (reduced — holidays; catch up in W20) | **P3.1 `authlab`** | Workers + Neon | Three auth modes live + attack demo |
| 17 | Dec 28 | OAuth 2.1 + PKCE, exact redirect matching | 15 | **P3.2 `oauth-from-scratch`** (start) | — | — |
| 18 | Jan 4 | OIDC, refresh rotation, RS256/EdDSA | 15 | **P3.2** ships | Workers + Neon | Live auth server + client, full flow recorded |
| 19 | Jan 11 | **WebAuthn Level 3** (W3C REC as of 2026-08-25), passkeys | 15 | **P3.3 `passkey-drill`** | Workers + Neon | Register + auth with a real passkey, on video |
| 20 | Jan 18 | OWASP Top 10:2025, API Top 10 (2023), RBAC | 15 | **P3.4 `driftwatch` L4 (auth + threat model)** | Workers + Neon | Threat model doc mapped to OWASP categories |

### P3.1 — `authlab`
> Three ways to keep a user logged in, one of them deliberately broken, and a page that shows you exactly how it breaks.

**Build:** (a) httpOnly cookie sessions with argon2id; (b) JWT access (10 min) + rotating refresh, RS256; (c) a deliberately broken mode (localStorage JWT, HS256, no expiry validation) with a live XSS demo page that steals it.

**Out of scope:** no OAuth (next project), no MFA, no user management UI, no password reset flow.

**Proves:** you know when a plain session cookie is simply correct — the syllabus's own point that "the JWT-everywhere era is over."

**Stretch:** add session fixation and CSRF demos with and without SameSite.

**README must show:** the decision table (`sessions vs JWT: when each is right`), the attack demo GIF, and the argon2id parameters you chose with the reasoning.

**Difficulty:** 🟡 Medium. Doing the broken version *properly broken* is harder than doing the right ones.

### P3.2 — `oauth-from-scratch`
> A working OAuth 2.1 authorization server and client, built from the spec rather than from a library.

**Build:** authorization code flow with **mandatory PKCE**; exact redirect-URI matching; refresh-token rotation with reuse detection; consent screen; a separate client app that completes the flow; `.well-known` discovery metadata.

**Out of scope:** no implicit or password grants (**removed in 2.1** — say so in the README), no device flow, no full OIDC UserInfo, no dynamic client registration (**deprecated in the 2026 MCP spec** — note it).

**Proves:** you understand the flow rather than configuring a library that hides it. Directly transferable to the MCP auth work in Phase 6.

**Stretch:** add token exchange (RFC 8693) for a service-to-service hop.

**README must show:** a full sequence diagram, an explanation of what PKCE actually prevents and why it's now mandatory even for confidential clients, and a recorded end-to-end flow.

**⚠️ Currency note:** OAuth 2.1 is still an Internet-Draft — **draft-16, 2026-09-03**, IESG submission targeted Dec 2026. Cite the draft number in your README; it signals you read the spec, not a blog.

**Difficulty:** 🔴 **High — this is a known wall.** Budget 12 hours, expect 16. The redirect/state/PKCE dance has many failure modes that all look like "it just redirects back." Apply the 2-hour rule aggressively here.

### P3.3 — `passkey-drill`
> Passkey registration and authentication, ceremony by ceremony, with the fallback flow nobody builds.

**Build:** the full WebAuthn L3 registration ceremony (challenge, attestation, credential storage) and authentication ceremony (assertion, signature verification, counter check); a fallback for users without a passkey; a device-management screen.

**Out of scope:** no attestation-certificate validation against a vendor list, no enterprise attestation, no cross-device linking UI.

**Proves:** you can ship the auth method that ~5 billion deployed credentials and 93% login success rates are pushing everyone toward.

**Stretch:** conditional UI (autofill) passkey sign-in.

**README must show:** both ceremonies as sequence diagrams, a video of registering and using a real passkey, and one paragraph on what you'd do about account recovery.

**⚠️ Currency note:** WebAuthn **Level 3 became a full W3C Recommendation on 2026-08-25** — it graduated from Candidate Recommendation the same day the syllabus was compiled. Cite the REC.

### P3.4 — `driftwatch` Layer 4: auth + a threat model
> Multi-tenant driftwatch with passkeys, API keys and roles — plus a written threat model that names its own weaknesses.

**Build:** passkey login (reuse P3.3) + API keys for CI use; orgs with `owner`/`member`/`viewer` roles enforced at the query layer, not the route layer; a `THREAT_MODEL.md` mapping every surface to an **OWASP Top 10:2025** category; fix at least two issues the exercise surfaces.

**Out of scope:** no SSO/SAML, no audit-log UI, no pen-test, no compliance work.

**Proves:** you think about authorization at the data layer — where the actual bugs are (A01 Broken Access Control is #1 for a reason).

**Stretch:** add per-agent API keys with task-scoped expiring credentials, anticipating Phase 6's MCP work.

**README must show:** the permission matrix, the threat model summary table, and the two bugs you found in your own code.

**⚠️ Use the OWASP Top 10:2025 list** (verified correct in Part A) — note that A09's exact title is "Security *Logging* and Alerting Failures."

---

# PHASE 4 — Ship it like you'll be paged
**Weeks 21–26 · Jan 25 – Mar 7, 2027 · 90 hrs**

**Theme:** The phase that converts "works on my machine" into a hiring signal. Docker, a supply-chain-aware pipeline, and the three signals.

**Exit criterion:** You can containerize a Node service into a <150 MB multi-stage image, wire a pipeline that tests → scans → signs → deploys, and answer "what happened at 3 a.m.?" from traces and logs rather than guesswork.

| Week | Dates | Topic(s) | Hours | Project to ship | Deploy target | Proof it worked |
|---|---|---|---|---|---|---|
| 21 | Jan 25 | Docker multi-stage, layer caching, distroless, rootless | 15 | **P4.1 `slimjim`** | GHCR | Published images + size/cold-start table |
| 22 | Feb 1 | GH Actions: matrix, reusable workflows, **artifact attestations**, Trivy/Semgrep/Gitleaks, SBOM, cosign | 15 | **P4.2 `pipeline`** | GH Actions (reusable workflow) | Another repo consumes it; signature verifies |
| 23 | Feb 8 | OpenTelemetry: SDK, Collector, semantic conventions | 15 | **P4.3 `driftwatch` L5 (OTel)** (start) | — | — |
| 24 | Feb 15 | Traces/metrics/logs, W3C traceparent, sampling | 15 | **P4.3** ships | Grafana Cloud + Axiom + Sentry | One trace spanning Worker → Neon → npm registry |
| 25 | Feb 22 | SLI/SLO/error budgets, burn-rate alerts, RED dashboards | 15 | **P4.4 `slo-kit`** | Grafana Cloud (public dashboard) | Public dashboard + a real postmortem |
| 26 | Mar 1 | **Buffer / write ADRs / second blog post** | 15 | — | — | Slack week |

### P4.1 — `slimjim`
> One Node service, five Dockerfiles, and the numbers that show which choices actually matter.

**Build:** naive → multi-stage → multi-stage + `node:alpine` → distroless → distroless + rootless; measure image size, cold build, warm build (layer cache hit), and container start time for each; one deliberate cache-invalidation mistake shown and fixed.

**Out of scope:** no Kubernetes, no multi-arch beyond arm64/amd64, no runtime tuning, no comparison with Bun/Deno images.

**Proves:** you understand container layers instead of copy-pasting a Dockerfile.

**Stretch:** add a `docker buildx` multi-arch build published to GHCR with attestations.

**README must show:** the five-row benchmark table, the layer-cache diagram, and the one mistake with before/after build times.

**Deploy:** GHCR (free and unlimited for public images). No live URL needed — the images *are* the artifact.

**⚠️ Docker Hub note:** authenticated pulls are capped at 200/6 hrs, anonymous at 100/6 hrs **per IP** — shared CI IPs blow through this. Always `docker login` in CI. Prefer GHCR.

### P4.2 — `pipeline`
> A reusable GitHub Actions workflow that tests, scans, generates an SBOM, signs the artifact, and deploys — that other repos can call in three lines.

**Build:** a `workflow_call` reusable workflow: Vitest → **Semgrep** (SAST) + **Trivy** (SCA/containers) + **Gitleaks** (secrets) → **Syft** SBOM in **CycloneDX 1.7** → **cosign** keyless signing to **Rekor v2** → GitHub artifact attestation → deploy. Consumed by at least two of your own repos.

**Out of scope:** no self-hosted runners (**they now cost $0.002/min** since 2026-03-01), no GitLab CI, no DefectDojo aggregation, no policy gates.

**Proves:** supply-chain literacy — **#3 on OWASP Top 10:2025** and the signature risk of this era. It's also directly relevant: the **EU CRA's vulnerability-reporting duties started 2026-09-11**, five days after this plan begins.

**Stretch:** add SLSA **v1.2** provenance (note: v1.1 is already *Retired* — the syllabus's "v1.0" is two versions behind) and a verification step that fails on an unsigned artifact.

**README must show:** the pipeline as a diagram, a `cosign verify` transcript that a reader can run themselves, and the SBOM diff between two releases.

**💰 Keep every repo public** — GitHub Actions is unlimited-free on public repos and metered on private. This constraint is also your portfolio strategy.

### P4.3 — `driftwatch` Layer 5: OpenTelemetry
> One trace that follows a scan from the API edge, through Postgres, out to the npm registry, and back.

**Build:** OTel SDK in the Worker; spans across Worker → Neon → external HTTP; W3C `traceparent` propagation; semantic conventions applied properly; traces + metrics to **Grafana Cloud**, logs to **Axiom**, errors to **Sentry**; a sampling strategy you can defend.

**Out of scope:** **do not build on OTel Profiles** — it's public alpha (2026-03-26) and explicitly not for production, despite what the syllabus implies. No custom Collector deployment (no VPS); no vendor agent.

**Proves:** the syllabus's own point that observability is a core backend skill, not an ops afterthought — and 78% of teams now prompt AI to include observability hooks, so knowing what good looks like is the reviewable skill.

**Stretch:** run an OTel Collector locally in Docker Compose with an OTTL processor that redacts PII, and record it as an asciinema demo (this is one of the serverless-only casualties — a local demo is the honest proof).

**README must show:** an annotated screenshot of a single trace end to end, the sampling decision, and the three-signal diagram.

**Deploy:** Grafana Cloud free (10k series, 50 GB logs, 50 GB traces, 14-day retention, 3 users) + Axiom free (**500 GB ingest/mo, 30-day retention** — the best free tier in this space) + Sentry Developer (5k errors/mo, 1 seat).

### P4.4 — `slo-kit`
> SLOs as code for driftwatch, burn-rate alerts that fire, a public dashboard, and a postmortem for an outage you caused on purpose.

**Build:** define 3 SLIs and SLOs (scan success rate, API p99 latency, freshness of registry data); multi-window multi-burn-rate alerts (Sloth or Pyrra syntax, committed as code); a public Grafana dashboard; then **deliberately break production** (bad deploy, or exhaust the Neon CU budget) and write a blameless postmortem.

**Out of scope:** no on-call rotation tooling, no incident-management SaaS, no DORA metrics dashboard.

**Proves:** you think in error budgets. Very few candidates at the mid-level bar have a real postmortem to point at — this is a genuine differentiator.

**Stretch:** wire a GitHub Action that comments the error-budget burn on every PR.

**README must show:** the SLO definitions with the reasoning behind each threshold, the public dashboard link, and the full postmortem (timeline, contributing factors, what you changed).

---

# PHASE 5 — Production backend
**Weeks 27–33 · Mar 8 – Apr 25, 2027 · 105 hrs**

**Theme:** Caching, work off the request path, realtime at scale, and knowing your own numbers.

**Exit criterion:** You can pick a cache strategy and defend it against two alternatives, run background work idempotently, and produce a load-test graph showing where your service falls over and *why*.

| Week | Dates | Topic(s) | Hours | Project to ship | Deploy target | Proof it worked |
|---|---|---|---|---|---|---|
| 27 | Mar 8 | Caching ladder, cache-aside, stampede, invalidation, eviction | 15 | **P5.1 `cache-ladder`** | Workers + Upstash | Hit-rate + latency table, stampede demo |
| 28 | Mar 15 | Queues, background jobs, retries + jittered backoff | 15 | **P5.2 `driftwatch` L6 (queues)** (start) | — | — |
| 29 | Mar 22 | Idempotent consumers, DLQs, at-least-once reality | 15 | **P5.2** ships | Workers + CF Queues | Duplicate-delivery demo; DLQ populated on purpose |
| 30 | Mar 29 | Realtime at scale: Durable Objects, backplane patterns | 15 | **P5.3 `roomd`** | Workers + DO | Live multiplayer demo |
| 31 | Apr 5 | k6 load testing, pooling, replicas | 15 | **P5.4 `breakpoint`** (start) | — | — |
| 32 | Apr 12 | N+1 hunting, index tuning under load | 15 | **P5.4** ships | k6 + GH Actions | Before/after breaking-point graph |
| 33 | Apr 19 | **Buffer / publish the benchmark write-up** | 15 | — | — | Slack week — this one is also your best blog post |

### P5.1 — `cache-ladder`
> The same endpoint at four cache layers, with the hit rates and latencies that tell you which one was worth it.

**Build:** one expensive endpoint served with (a) no cache, (b) in-Worker memory, (c) Upstash Redis (cache-aside), (d) Cloudflare Cache API at the edge; measure p50/p99 and hit rate for each; demonstrate a cache stampede with 100 concurrent misses, then fix it with single-flight/lock.

**Out of scope:** no write-through/write-behind, no distributed invalidation protocol, no CDN config beyond the Cache API.

**Proves:** you know the caching ladder (CDN → gateway → app → DB buffer) as a set of trade-offs rather than a diagram you've seen.

**Stretch:** add a deliberate cache-invalidation bug and the test that catches it.

**README must show:** the four-row results table, the stampede graph before and after, and one line on when *not* to cache.

**💰 Upstash Redis free:** 256 MB, **500k commands/month**, 10 GB bandwidth, 1 DB. A stampede demo can burn commands fast — cap your test runs.

**⚠️ Terminology:** use **Valkey** naming where you discuss the open-source cache. Valkey 9.1.2 is the OSS default now; Redis 8+ is tri-licensed (RSALv2/SSPLv1/AGPLv3), which is not the same as "returned to open source."

### P5.2 — `driftwatch` Layer 6: queues
> Scanning moves off the request path — with a duplicate delivery you can prove you survive.

**Build:** `POST /scans` returns 202 immediately and enqueues; a Cloudflare Queues consumer does the registry work; **idempotent consumer** keyed on scan ID; exponential backoff with **full jitter**; a DLQ with a replay endpoint; an **SSE stream** for live scan progress (reusing P1.4's knowledge).

**Out of scope:** no Kafka yet (Phase 7), no saga/orchestration, no priority queues, no cron scheduling beyond one daily scan.

**Proves:** you internalized that exactly-once delivery is impossible at the network layer, and that the production standard is at-least-once + idempotency.

**Stretch:** add a transactional outbox so the DB write and the enqueue can't diverge (this sets up P7.1).

**README must show:** the queue topology diagram, a recorded duplicate-delivery test proving idempotency, and the DLQ replay transcript.

**💰 Cloudflare Queues free:** 10k operations/day. One scan of a 60-dep repo is well under that; a load test is not. Budget accordingly.

### P5.3 — `roomd`
> Live presence for many people in one room, on Durable Objects, with an honest answer about what happens when the connection drops.

**Build:** a shared cursor/presence or live-poll app; one Durable Object per room holding authoritative state; WebSocket connections with heartbeat; reconnect-with-resume; backpressure handling when a client is slow; a documented answer to "what if 500 people join one room?"

**Out of scope:** no CRDT/OT (too big), no auth, no persistence beyond the DO's SQLite, no mobile client.

**Proves:** you understand stateful realtime coordination — and specifically why sticky sessions vs a pub/sub backplane is the classic scaling question.

**Stretch:** add a second region and show the latency difference.

**README must show:** the DO-per-room architecture diagram, a GIF of two browsers in sync, and the reconnection state machine.

### P5.4 — `breakpoint`
> Load-test driftwatch until it breaks, find out why, fix it, and show the graph.

**Build:** a k6 suite (smoke, load, stress, spike); find the actual breaking point; diagnose with the traces you built in P4.3; fix the top bottleneck (connection pooling, a missing index, or an N+1 you find); re-run; graph before vs after; a smoke load test in CI on every deploy.

**Out of scope:** no distributed load generation, no chaos engineering, no cost-per-request modelling (that's P6.7).

**Proves:** you know your own numbers. "It handles about 40 req/s before Neon's connection limit bites, here's the graph" is a categorically better interview answer than "it's fast."

**Stretch:** add a `k6` test that specifically proves the idempotency guarantee from P5.2 under concurrency.

**README must show:** the breaking-point graph, the trace screenshot that identified the bottleneck, and the one-line fix with its measured effect.

**⚠️ Watch your free tier:** Neon free is 100 CU-hrs/project/month and Workers free is 100k req/day. A stress test can eat a month's budget in an afternoon. Run heavy tests against a local Docker Postgres and use the deployed stack only for the final validated run — and say that in the README, because that *is* the professional answer.

---

# PHASE 6 — The AI backend layer
**Weeks 34–43 · Apr 26 – Jul 4, 2027 · 150 hrs**

**Theme:** The fastest-growing backend niche — and the phase where "I built a wrapper" and "I built an eval pipeline" are two different salary bands.

**Exit criterion:** You can ship an LLM feature with streaming, a cost budget, a golden-dataset eval running in CI, and an honest published write-up of what your retrieval gets wrong.

| Week | Dates | Topic(s) | Hours | Project to ship | Deploy target | Proof it worked |
|---|---|---|---|---|---|---|
| 34 | Apr 26 | LLM APIs, SSE relay, provider fallback, token/cost metering | 15 | **P6.1 `streamgate`** | Workers + D1 | Live streaming endpoint + cost ledger |
| 35 | May 3 | Context engineering, prompts-as-code, injection defense | 15 | **P6.2 `promptlab`** | Workers + GH Actions | Injection suite fails CI on a bad prompt |
| 36 | May 10 | Golden datasets, LLM-as-judge and its biases | 15 | **P6.3 `evalbench`** (start) | — | — |
| 37 | May 17 | Pairwise/Elo, regression tests in CI | 15 | **P6.3** ships | GH Actions + Pages | Published eval results; judge-bias check |
| 38 | May 24 | Chunking, embeddings, indexing | 15 | **P6.4 `driftwatch` L7 (RAG)** (start) | — | — |
| 39 | May 31 | Hybrid retrieval, RRF, reranking, contextual retrieval | 15 | **P6.4** ships | Neon pgvector + Workers | Eval scores before/after reranking |
| 40 | Jun 7 | MCP spec **2026-07-28**, tools as security boundaries | 15 | **P6.5 `driftwatch-mcp`** (start) | — | — |
| 41 | Jun 14 | MCP auth, stateless design, threat modelling | 15 | **P6.5** ships | Workers | Claude Code connects and queries it live |
| 42 | Jun 21 | Agents: ReAct, tool schemas, guardrails, human checkpoints | 15 | **P6.6 `upgrade-agent`** | GitHub App + Workers | A real merged PR the agent opened |
| 43 | Jun 28 | Prompt caching, batching, routing; **buffer** | 15 | **P6.7 `costcut`** | Workers | Published before/after cost-per-scan |

### P6.1 — `streamgate`
> A provider-agnostic LLM gateway that streams, fails over, meters every token, and refuses to bankrupt you.

**Build:** SSE token relay (reusing P1.4); a provider-agnostic client over **Gemini free tier → Groq → Cloudflare Workers AI**; automatic fallback on 429/5xx; per-request token + cost accounting in D1; a hard budget kill-switch; request/response logging to Axiom with prompts redacted.

**Out of scope:** no semantic caching yet (P6.7), no fine-tuning, no self-hosted inference (needs a GPU you don't have), no chat UI beyond a minimal test page.

**Proves:** you treat LLM calls as an untrusted, metered, failure-prone external dependency — which is the entire difference between a demo and a service.

**Stretch:** add LiteLLM-compatible request format so it's a drop-in for other tools.

**README must show:** the fallback state machine, a cost-per-1k-requests table across the three providers, and the kill-switch demo.

**💰 Free LLM APIs (verified 2026-09-06):** Gemini API free tier (Gemini 3.x Flash / Flash-Lite / 2.5 Flash) · Groq (30 RPM, 1k requests/day, 200k tokens/day) · Cloudflare Workers AI (10k Neurons/day) · GitHub Models (150 req/day low-tier, 50 high-tier).

**⚠️ Privacy:** **Gemini free-tier content IS used to improve Google products.** Put that warning in your README and never route real user data through the free tier — noticing this is itself a hiring signal.

### P6.2 — `promptlab`
> Prompts as versioned, tested files — with an injection suite that fails the build.

**Build:** prompts as files with frontmatter (model, temperature, version); a golden set of expected behaviours; the **four-layer context stack** (system / persistent / retrieved / working) made explicit; a **Promptfoo** red-team suite covering direct injection, indirect injection via retrieved content, and system-prompt extraction; CI fails on regression.

**Out of scope:** no prompt-optimization automation, no DSPy, no multi-turn conversation management.

**Proves:** you treat prompts as code under review — the syllabus's point that spec-writing is the artifact humans own while agents implement.

**Stretch:** add Garak for a second opinion and compare what each tool catches.

**README must show:** the four-layer context diagram, three injections that succeeded before your defenses and fail after, and the CI failure screenshot.

**⚠️ Use the OWASP LLM Top 10 *2026* edition** (published 2026-08-03), not the 2025 one the syllabus lists. Excessive Agency moved 6th → **3rd**, Improper Output Handling 5th → **10th**, and System Prompt Leakage was **renamed "Hidden Context Exposure" (LLM08)**.

### P6.3 — `evalbench`
> A golden dataset, an LLM judge, and a CI job that tells you whether your last prompt change made things worse.

**Build:** 60–100 hand-curated examples for the driftwatch "what breaks if I upgrade?" task; an LLM-as-judge rubric; **a documented judge-bias check** (position bias, length bias, self-preference — run the same pairs in reversed order and report the delta); pairwise comparison with Elo; a GitHub Action running the whole thing on every prompt change; results published as a static page.

**Out of scope:** no human-annotation platform, no RLHF, no fine-tuning, no eval of models you're not using.

**Proves:** the highest-leverage differentiator in the whole syllabus — 89% of agent teams have observability but only 52.4% run offline evals. Having published eval results puts you in the smaller half.

**Stretch:** add a second judge model and report inter-judge agreement.

**README must show:** the dataset construction method, the judge rubric verbatim, the bias-check numbers, and a chart of scores across your last 10 prompt versions.

**⚠️ Use DeepEval 4.2.1 or Langfuse 4.15, not Ragas** — Ragas' last release was 2026-01-13 and it is effectively stagnant, despite the syllabus listing it as a peer.

**💡 Why this is before RAG:** you cannot tell whether your reranker helped without this. Build the ruler before the thing you measure.

### P6.4 — `driftwatch` Layer 7: changelog RAG
> Ask "what actually breaks if I go from React Router 7 to 8?" and get a cited answer built from the real release notes.

**Build:** ingest changelogs/release notes for tracked packages; ~500-token recursive chunking with metadata enrichment; embed into **pgvector on Neon**; **hybrid retrieval** — BM25 top-20 (Postgres full-text) + vector top-20 → **RRF merge at k=60** → **rerank to top 5–10**; answers with inline citations to the exact changelog line; **scored by evalbench before and after reranking**.

**Out of scope:** no multi-modal, no agentic retrieval loops, no fine-tuned embeddings, no crawling the whole npm ecosystem (pick 30 packages).

**Proves:** RAG as a backend competency — ingestion, indexing, hybrid retrieval, evaluation — not a LangChain quickstart.

**Stretch:** add **contextual retrieval** (prepend a generated context sentence to each chunk before embedding) and report the eval delta. The syllabus omits this technique entirely; it's now routine practice.

**README must show:** the pipeline diagram, the eval table (`config | Success@1 | nDCG@10 | cost/query`), and a **"where retrieval fails"** section with three real failure cases. That last section is the part that reads as senior.

**⚠️ Embeddings:** the syllabus's `voyage-3-large` is legacy — voyage-4 shipped. At $0, use a free embedding option and say why. Qwen3-Embedding remains the best *practical* open pick even though it's no longer MTEB #1.

**💰 Storage:** Neon free is 0.5 GB per project. 30 packages of changelogs with embeddings fits; 3,000 does not. Scope it and say so.

**Difficulty:** 🔴 **High.** This is the biggest single project in the plan. It's split across two weeks for a reason. If W38 slips, cut the reranker to the stretch goal rather than cutting the eval.

### P6.5 — `driftwatch-mcp`
> An MCP server on the current spec that lets Claude Code ask your service what's rotting in a repo.

**Build:** an MCP server on the **2026-07-28 revision** — stateless request/response, `server/discover`, `resultType` on every result; 4–6 minimal, well-described tools (`scan_repo`, `get_findings`, `explain_upgrade`, `check_package`); auth via **Client ID Metadata Documents** (Dynamic Client Registration is deprecated); a written threat model treating **each tool as a security boundary**; deny-by-default egress.

**Out of scope:** **do not implement Roots, Sampling or Logging — all three are deprecated** in this revision with a 12-month window. No stdio transport, no multi-agent orchestration.

**Proves:** the single most current skill in the syllabus, built to the spec that's actually live rather than the one in every tutorial.

**Stretch:** add a `Promptfoo` red-team suite against the MCP surface, mapped to the **OWASP MCP Top 10 (v0.1, incubator)**.

**README must show:** the tool schemas with the *why* behind each description, a GIF of Claude Code using it, and the threat model mapped to the OWASP Agentic Top 10 (ASI01–ASI10, published 2025-12-09).

**⚠️ TS SDK skew:** `@modelcontextprotocol/sdk` 1.30.0 **predates the 2026-07-28 spec**; the Python SDK (2.1.1) tracks it. Expect gaps. Documenting the gaps you hit is itself a strong README section — and a legitimate open-source contribution opportunity.

### P6.6 — `upgrade-agent`
> An agent that reads your changelog RAG, decides an upgrade is safe, opens a real PR, and waits for a human to say yes.

**Build:** a GitHub App; a ReAct loop with a **hard tool allowlist** (read repo, query driftwatch, run tests, open PR — nothing else); a **mandatory human checkpoint** before any write; the PR body cites the changelog evidence from P6.4; a kill switch; an immutable audit log of every tool call.

**Out of scope:** no multi-agent, no auto-merge ever, no A2A, no long-running orchestration (Temporal is Phase 8+).

**Proves:** agent design with the guardrails the 2026 security literature demands — sandboxing, per-agent identity, human confirmation on sensitive actions, audit trails.

**Stretch:** run it against a real open-source repo and get the PR merged. That single merged PR is worth more than most portfolio projects.

**README must show:** the agent loop diagram, the tool allowlist with the reasoning, a link to a real PR it opened, and the audit-log format.

### P6.7 — `costcut`
> Measured cost reduction on driftwatch's LLM spend, with the before-and-after numbers.

**Build:** apply the ladder in order — (1) prompt caching with stable content first, (2) batch API for non-interactive scans, (3) model routing (cheap model for classification, expensive for synthesis), (4) semantic caching; measure cost-per-scan at each step; publish the table.

**Out of scope:** no self-hosting (needs 50M+ tokens/day to make sense), no quantization, no fine-tuning.

**Proves:** cost/latency engineering — a skill that gets cited in promotion cases, not just interviews.

**Stretch:** add a cost-per-scan metric to your Grafana dashboard with an SLO on it.

**README must show:** the ladder table (`step | cost/scan | latency p99 | quality score from evalbench`). The quality column is the point — a cost cut that tanks eval scores isn't a cut.

**⚠️ Correct the syllabus's math:** **OpenAI's cached-input discount is ~90%, not 50%.** Anthropic is ~90% too (97.5% on some models). The syllabus's cost ladder is built on a wrong number — say so in your README with the citation. Catching a factual error in your own source material is a strong signal.

---

# PHASE 7 — Distributed systems and interview reps
**Weeks 44–52 · Jul 5 – Sep 5, 2027 · 135 hrs**

**Theme:** The vocabulary of the system design round, learned by building the smallest honest version of each idea.

**Exit criterion:** You can whiteboard a rate limiter, a feed and a chat system with numbers attached, and explain in one sentence why exactly-once delivery is a lie.

| Week | Dates | Topic(s) | Hours | Project to ship | Deploy target | Proof it worked |
|---|---|---|---|---|---|---|
| 44 | Jul 5 | Kafka 4.3 (KRaft), topics, partitions, consumer groups | 15 (9/3/3 sysdesign) | **P7.1 `outbox`** (start) | — | — |
| 45 | Jul 12 | Transactional outbox, CDC (Debezium 3.6), DLQs | 15 | **P7.1** ships | Docker Compose + `make demo` | asciinema of duplicate-delivery survival |
| 46 | Jul 19 | gRPC, protobuf, Buf, ConnectRPC, streaming | 15 | **P7.2 `grpc-pair`** | Render free + CF Pages | Live two-service demo + load test |
| 47 | Jul 26 | Raft, CAP/PACELC, quorums, consistency models | 15 | **P7.3 `raftlet`** | Compose + Pages visualizer | Partition test showing no split-brain |
| 48 | Aug 2 | K8s workload level: Deployments, Services, Gateway API | 15 | **P7.4 `k8s-workload`** (start) | — | — |
| 49 | Aug 9 | HPA, RBAC, **Helm 4** charts, kind | 15 | **P7.4** ships | kind + `make demo` + GIF | Chart installs clean on a fresh kind cluster |
| 50 | Aug 16 | System design reps 1–4 | 15 (6/3/6 drills) | **P7.5** (start) | — | — |
| 51 | Aug 23 | System design reps 5–8 | 15 | **P7.5** | — | — |
| 52 | Aug 30 | System design reps 9–12 + DSA final push | 15 | **P7.5** ships | GitHub Pages | 12 published write-ups |

### P7.1 — `outbox`
> A database write and a Kafka event that cannot diverge, plus a duplicate delivery you survive on purpose.

**Build:** driftwatch writes to Postgres and an outbox table in one transaction; **Debezium 3.6** CDC streams the outbox to **Kafka 4.3.1** (KRaft-only, no ZooKeeper); an idempotent consumer; force a duplicate delivery and show the consumer handling it; a DLQ for poison messages.

**Out of scope:** no Kafka Streams, no schema registry, no exactly-once semantics claims, no multi-broker tuning.

**Proves:** the outbox + CDC pattern, which is the standard answer to "how do you avoid dual-write inconsistency" in system design rounds.

**Stretch:** add a Kafka Streams-lite aggregation, or run the same topology on RabbitMQ 4 quorum queues and compare.

**README must show:** the dual-write problem diagram (broken vs fixed), the `make demo` one-liner, and an asciinema cast of the duplicate-delivery test.

**⚠️ No live URL — and that's fine.** There is no free managed Kafka. `docker compose up && make demo` + asciinema is the honest, legitimate proof, and the README should say why explicitly. You already deployed the Cloudflare Queues variant live in P5.2 — link them and contrast the two in a paragraph. That contrast *is* the senior insight.

**⚠️ Version:** the syllabus says "Kafka 4.x"; current is **4.3.1 (2026-06-25)**. Pin it.

### P7.2 — `grpc-pair`
> Two services, one `.proto` contract, a streaming method, generated stubs in the repo, and a load test.

*(This is the syllabus's own worked example, kept verbatim because it's a good one.)*

**Build:** two services with a shared `.proto`; **at least one server-streaming method**; generated stubs committed and visible in the repo; **Buf** for lint + breaking-change detection in CI; a **ConnectRPC** browser client so the demo works in a tab; a k6/ghz load test with p50/p99 numbers.

**Out of scope:** no service mesh, no mTLS (nice-to-have, not core), no gRPC-Web polyfills beyond Connect, no more than two services.

**Proves:** internal service-to-service communication done properly — gRPC dominates that layer, and Buf + Connect is what fixed its DX.

**Stretch:** add bidirectional streaming and mTLS with SPIFFE-style identities.

**README must show:** the `.proto` inline, the generated-stub diff, a Buf breaking-change CI failure screenshot, and the load-test numbers vs an equivalent REST endpoint.

**Deploy:** Render free web services (750 hrs/mo, 512 MB, **spins down after 15 min idle** — note the cold start in your README rather than hiding it) + Cloudflare Pages for the Connect client.

### P7.3 — `raftlet`
> Three nodes, one leader, and a network partition that doesn't produce two of them.

**Build:** leader election + log replication in TypeScript (not production Raft — the teaching version); a partition-injection harness; a browser visualizer showing terms, votes and log state; a test proving no split-brain under partition.

**Out of scope:** no snapshotting, no membership changes, no persistence guarantees, no performance work. This is a learning artifact and should say so.

**Proves:** you understand the consensus algorithm underneath KRaft, etcd, quorum queues and CockroachDB — which turns "Kafka uses Raft now" from a fact you memorized into one you understand.

**Stretch:** add log compaction, or a deliberate bug that produces split-brain, with the test that catches it.

**README must show:** the state-machine diagram, a GIF of the visualizer during a partition, and an honest "what real Raft does that this doesn't" list.

**Difficulty:** 🔴 **High and optional.** If Phase 7 is running late, this is the project to cut. Its interview value is real but lower than P7.2 or P7.5.

### P7.4 — `k8s-workload`
> driftwatch packaged for Kubernetes at the workload level — the layer you'd actually be asked about.

**Build:** Deployment, Service, **Gateway API HTTPRoute** (not Ingress), ConfigMap/Secret, HPA, RBAC, resource requests/limits, liveness/readiness probes; a **Helm 4** chart; running on **kind**.

**Out of scope:** **no kubeadm-from-scratch** (a learning exercise, not a job skill — the syllabus agrees), no operators, no service mesh, no managed cluster (no free tier), no cluster networking internals.

**Proves:** K8s at the level mid-level roles actually test. 70–80% of K8s jobs are senior; this is vocabulary and credibility, not a specialization.

**Stretch:** add a Kyverno policy that rejects a container running as root, and show the rejection.

**README must show:** the manifest walkthrough, a GIF of `helm install` on a fresh kind cluster, and an HPA scaling event.

**⚠️ Critical currency correction:** **Ingress-NGINX was retired in March 2026.** Do not use it — the default controller every tutorial installs no longer exists. Use **Gateway API v1.6**. Also: **Kubernetes 1.34 is EOL**; supported is 1.35/1.36/1.37. **Helm 3's security support ends 2027-02-10** (the syllabus says Nov 2026 — wrong); learn Helm 4.2.

**⚠️ No live URL:** no free managed K8s exists. kind + `make demo` + a GIF is the proof.

### P7.5 — `sysdesign-reps`
> Twelve system design write-ups with real numbers, real diagrams, and a "what I'd cut" section on each.

**Build:** 12 designs, ~90 min each: URL shortener · rate limiter · news feed · chat · notification fan-out · dedupe service · idempotency layer · leaderboard · file upload · search · multi-tenancy · a cost model. Each gets: requirements + scale assumptions, a diagram, the data model, the bottleneck, the trade-off you chose, and **"what I'd cut if I had half the time."**

**Out of scope:** no implementation, no LeetCode, no copying Grokking's answers — write them yourself and cite where you disagree with the standard answer.

**Proves:** the thing India PBC loops actually test at mid-level. The written form doubles as the design-doc/RFC skill the syllabus calls the currency of staff-level influence.

**Stretch:** record a 10-minute whiteboard walkthrough of your two best ones and put them on the repo. Almost nobody does this.

**README must show:** an index, and for each design the numbers you assumed and why. **Numbers are the whole game** — "10M DAU, 100:1 read:write, 2 KB per record" beats any diagram.

**💡 Where the plan's parallel drills land:** DSA has been running one-a-day since W3. W50–52 shift the split to 6 hrs drills / 6 hrs writing / 3 hrs learning. By W52 you should have ~250 problems and 12 designs behind you.

---

# PHASE 8 / PART C — Capstone and launch
**Weeks 53–60 · Sep 6 – Oct 31, 2027 · 120 hrs**

**The capstone is driftwatch v1.0.** Not a new project — the spine, unified and turned into something with real users. Starting something new at month 13 would be a worse use of your last 120 hours than making the thing you've built for a year actually good.

It composes **eight** earlier topics (the brief asked for four): Postgres schema design (P1.2) · REST + OpenAPI (P2.2) · passkeys + RBAC (P3.4) · OTel + SLOs (P4.3/P4.4) · queues + idempotency (P5.2) · RAG + evals (P6.3/P6.4) · MCP (P6.5) · outbox + events (P7.1).

| Week | Dates | Focus | Hours | Deliverable |
|---|---|---|---|---|
| 53 | Sep 6 | Multi-tenancy hardening, the public Drift Index | 15 | Capstone build |
| 54 | Sep 13 | Public dataset + landing page | 15 | Capstone build |
| 55 | Sep 20 | Architecture doc + ADR backfill | 15 | `ARCHITECTURE.md` |
| 56 | Sep 27 | Portfolio pass: all 22 READMEs to standard | 15 | Every repo legible in 60s |
| 57 | Oct 4 | Resume (X-Y-Z), LinkedIn, GitHub profile | 15 | **Start applying** |
| 58 | Oct 11 | Launch: HN / r/programming / dev.to writeup | 15 | Public launch |
| 59 | Oct 18 | Interview prep: mock designs, mock DSA | 15 | 4 mock rounds |
| 60 | Oct 25 | Buffer + first-applications wave | 15 | 20+ applications out |

### CAPSTONE — `driftwatch` v1.0
> Know what rotted in your dependency tree while you weren't looking — with the changelog evidence for every claim.

**What you'll build (the v1.0 additions on top of eight layers):**
- **Multi-tenant hardening:** org isolation enforced at the query layer, per-org rate limits and quotas, a real onboarding flow.
- **The public Drift Index:** scan the top ~500 npm packages weekly and publish an open dataset + leaderboard of ecosystem staleness — which popular packages haven't shipped in 12 months, which have deprecated peers. **This is the launch artifact.** A public dataset gets shared; a SaaS landing page doesn't.
- **GitHub App:** install on a repo, get a weekly PR or issue with the drift report and RAG-cited upgrade notes.
- **`ARCHITECTURE.md`** with a real C4-ish diagram, the eight ADRs backfilled, and a **"what I'd do differently"** section.
- **A published SLO dashboard and a cost page** showing what running it actually costs (~$0, and the engineering that made that true).

**Explicitly out of scope:** other ecosystems (PyPI, crates, Go modules) — pick npm and be excellent at it · a billing system · a mobile app · SSO/SAML · anything requiring a paid tier.

**Skills it proves — the line a reader should infer:** *"This person can design a schema, ship a contract-first API, secure it, instrument it, move work off the request path, build retrieval with published evals, expose it to agents over the current MCP spec, and tell me what it costs and where it breaks."* That is a mid-level backend + AI hire, described in one sentence.

**Stretch:** get 100 GitHub stars, or one company using it. Either turns "portfolio project" into "product I shipped" in every interview.

**README must show:**
1. A 30-second pitch and a live URL, above the fold.
2. A GIF of the tool finding something genuinely surprising in a real repo.
3. An architecture diagram.
4. **"Why this design"** — three decisions and their alternatives.
5. **Numbers:** requests/sec, p99, cost per scan, eval scores.
6. **"Where it fails"** — an honest limitations section.
7. Links to the eight layer-repos with what each one taught you.

Sections 4, 5 and 6 are what separate this from every bootcamp portfolio. Most candidates ship section 1–3 and stop.

---

