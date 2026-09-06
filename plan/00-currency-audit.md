# Part A — Currency Audit

> The audit that this whole plan is built on. Every version below was read from an official
> release page, package registry or standards body on 2026-09-06 — not recalled from memory.

**Source syllabus:** *Software Engineering Roadmap 2026*, `~/Downloads/index.html`, compiled 2026-08-25
**Last verified: 2026-09-06** (every row below re-checked against primary sources on this date)
**Learner:** Bhavin — 1 yr fullstack JS, 15 hrs/week, JS/TS, ₹0 infra budget, target = India PBC + remote/global visibility

**Verdict key:** `LEARN` · `CAVEAT` (learn, but with a correction) · `SKIP → X` (dead or superseded)

**Headline:** the syllabus is good and unusually well-sourced, but it is ~40 versions stale, contains **6 things it describes as shipped that have not shipped**, **1 recommendation that is actively wrong** (DoRA), **1 arithmetic error that breaks its own cost model** (OpenAI caching), and it **misses the single biggest infra change of 2026** (Ingress-NGINX retirement). Its `$0` deploy advice is also unusable — half the free tiers it implies are dead.

---

## A1. Foundations & language

| Topic | Current status | Latest version (date) | Verdict |
|---|---|---|---|
| TypeScript | Thriving. Go-port compiler is mainline | **7.0.2** (GA **2026-07-08**) | LEARN. Doc's "Aug 3 2026" date is wrong; MS says "10x", not 8–12x. [src](https://devblogs.microsoft.com/typescript/) |
| Node.js | Thriving | 24.20 Active LTS; **26.8.1** Current, LTS Oct 2026 | LEARN. Node 22 already in maintenance. **From Node 27 the odd/even rule dies — one major/year, every major becomes LTS.** [src](https://nodejs.org/en/blog/announcements/evolving-the-nodejs-release-schedule) |
| Git, Linux/CLI, HTTP, DNS/TLS | Stable, no version risk | — | LEARN as written |
| HTTP/3 + QUIC | Real, ~30% of sites | — | LEARN |
| SSE + WebSockets | SSE is the LLM streaming transport | — | LEARN — highest ROI item in Foundations for you |
| PostgreSQL as first DB | Thriving | **18.6** (2026-08-13); **19 Beta 3** same day, GA due Sep/Oct 2026 | CAVEAT — learn 18, expect 19 within weeks of you starting. [src](https://www.postgresql.org/) |
| DSA (2 months, 1/day) | Unchanged; still gates live rounds | — | LEARN. Confirmed relevant for India PBC loops |
| "SQL 58.6% / PG 55.6%" | Numbers are from **SO 2025**, not 2026 | — | CAVEAT — don't cite as 2026 data |
| Context files (CLAUDE.md/AGENTS.md) | Real, growing | — | LEARN |

## A2. Frontend

| Topic | Current status | Latest version (date) | Verdict |
|---|---|---|---|
| React | Thriving | **19.2.8** (2026-07-21) | LEARN |
| React Compiler | GA, stable | **1.0.0** (2025-10-07) | LEARN — kills most manual `useMemo`/`useCallback` |
| Next.js | Thriving | **16.3.4** (2026-08-31) | LEARN. `middleware.ts` deprecated → `proxy.ts` |
| Vite | Thriving, Rolldown default | **8.2.2** | LEARN |
| Tailwind CSS | Thriving | **4.3.3** | LEARN |
| TanStack Query + Zustand | Thriving | 5.102.8 / 5.0.15 | LEARN |
| Vitest | Thriving | **5.0.0** (2026-09-03) | LEARN — v5 landed 3 days ago |
| Playwright | Thriving | 1.63.0 | LEARN |
| **Storybook** | Doc says 9 — wrong | **10.6.0** | CAVEAT — v9 is legacy-tagged |
| **React Router** | Doc says 7 — wrong | **8.3.1** (v8.0 2026-06-17) | CAVEAT — framework mode lives in v8 now |
| **Angular** | Doc says 21 — stale | **22.1.5** (v22.0 2026-06-03) | CAVEAT (only if you touch enterprise) |
| **Astro** | Doc says 5 — **two majors stale** | **7.3.1** (v7.0 2026-06-22) | CAVEAT |
| **Vue 3.6 / Vapor Mode** | **Has not shipped.** `latest` = 3.5.42; 3.6 is RC | 3.5.42 | SKIP the Vapor hype — learn 3.5 Composition API if at all |
| **SolidJS 2.0** | **Has not shipped.** Still `next`/RC | 1.9.15 | SKIP |
| **Nuxt on Nitro 3** | **Has not shipped.** Nuxt 4.5.2 still ships nitropack ^2.13.4 | — | SKIP the claim |
| **htmx 4 "The Fetchening"** | Published 2026-08-28 but only on `next`; `latest` is 2.x | 2.0.10 | CAVEAT — teach htmx 2 |
| webpack | Maintenance-only | 5.110.3 | SKIP → Vite (or Rspack 2.2 for migrations) |
| Cypress | Shipped v16 on 2026-09-01, but mindshare declining | 16.0.0 | SKIP → Playwright |
| Yarn Berry | Declining, still released | 4.18.0 | SKIP → **pnpm 12.3.4** |
| Redux Toolkit | Still actively released — doc's "legacy" overstates it | 2.12.0 | CAVEAT — don't start new work on it |
| Bun | Thriving | **1.4.2** (2026-09-05) | CAVEAT — doc says 1.3. **Bun 1.4 rewrote Bun from Zig to Rust**, which the doc omits |
| **CSS anchor positioning** | Doc lists it as Baseline 2026 — **it is not**. `position-anchor` is Chromium-only | — | CAVEAT — progressive enhancement only |
| **`text-wrap: pretty`** | Not Baseline (no Firefox). `balance` **is** Baseline | — | CAVEAT — split them |
| **Temporal API** | Firefox 139 + Chromium 144 ✔ but **no Safari → not Baseline**; and it's **ES2027**, not 2026 | — | CAVEAT — still needs a polyfill |
| **`using` / `Symbol.dispose`** | Doc files it under ES2026 — it's **ES2027** | — | CAVEAT |
| Rest of CSS Baseline list (container queries, `:has()`, nesting, `@scope`, subgrid, `color-mix()`, `light-dark()`, `@starting-style`, Popover, `<details name>`, same-doc View Transitions) | All confirmed Baseline | — | LEARN |
| European Accessibility Act | **Already enforcing since 2025-06-28** — not a future deadline. First lawsuits in France Nov 2025 | — | LEARN — next hard date 2027-06-28 |

## A3. Backend

| Topic | Current status | Latest version (date) | Verdict |
|---|---|---|---|
| Express | Slow cadence — no release in 9 months | 5.2.1 (2025-12-01) | CAVEAT — fine to learn, don't call it "actively developed" |
| Fastify / Hono | Thriving | 5.12.3 / 4.13.7 (both 2026-09-04) | LEARN — **Hono is your edge-portable pick** |
| **NestJS** | Doc says 11 — wrong | **12.0.1** (v12.0 2026-08-27) | CAVEAT |
| Deno | Thriving | 2.9 (2026-06-25) | Optional |
| **Go** | Doc says 1.25/1.26 — stale | **1.27.0** (2026-08-19) | LEARN (Year 2 second language) |
| **Spring Boot** | Doc says 4.0 — stale | **4.1.1** (2026-08-20) | SKIP for you (JS/TS track) |
| **Django** | Doc says 6.0 — stale | **6.1.1** (2026-09-02) | SKIP for you |
| **Elixir** | Doc says 1.19 — stale | **1.20** (2026-06-03) | SKIP |
| .NET 8 | **EOL 2026-11-10** — ~2 months out | — | SKIP |
| **Prisma** | Doc gives no version. 8.0 is in RC | **7.10.0** stable (2026-08-25) | CAVEAT — any Prisma 6 tutorial is 2 majors behind |
| **Drizzle** | **1.0 is still stuck in RC.** `npm i drizzle-orm` gets **0.45.2** (Mar 2026) | 0.45.2 | CAVEAT — this is a real trap; the docs show 1.0 syntax |
| **OpenAPI** | Doc says 3.1 — **3.2.0 shipped 2025-09-23** | **3.2.0**; Arazzo 1.1.0 | CAVEAT — build contracts on 3.2 |
| RFC 9457 Problem Details | Standards Track, obsoletes 7807 | — | LEARN |
| OAuth 2.1 | Still a draft — **draft-16 (2026-09-03)**; IESG submission targeted Dec 2026 | — | LEARN. PKCE mandatory, implicit + password grants removed ✔ |
| **WebAuthn Level 3** | Promoted **CR → full W3C Recommendation on 2026-08-25** | REC | LEARN — passkeys are now a settled standard |
| Passkey stats (5B, 68% enterprise) | **Verified exactly** against FIDO Alliance | — | Safe to cite |
| tRPC / gRPC / Buf / ConnectRPC | Thriving | tRPC 11.18.0 | LEARN gRPC + Buf; tRPC only for TS monorepos |
| Temporal | Thriving | server 1.31.2 | LEARN (later phase) |
| "REST >80% / GraphQL ~28%" | **Unverified** — latest Postman primary is the *2025* report | — | Don't cite |
| "42% of orgs consolidated microservices back" | **Unverified** — traces only to SEO content farms | — | Don't cite. The *advice* (modular monolith first) is still right |

## A4. Databases, cache, search, messaging

| Topic | Current status | Latest version (date) | Verdict |
|---|---|---|---|
| PostgreSQL 18 features (async I/O ~3x, `uuidv7()`, B-tree skip scan, OAuth, temporal constraints) | **All five verified correct** | 18.6 | LEARN |
| PostgreSQL 19 | **Beta 3 as of 2026-08-13**, GA imminent | — | Doc omits it. JIT now **off** by default; `REPACK CONCURRENTLY`; SQL/PGQ graphs |
| pgvector | Thriving | 0.8.6 | LEARN — your default vector store |
| **Valkey** | Thriving. Doc gives no version | **9.1.2 / 9.0.6** (2026-09-01) | LEARN → use Valkey, not Redis |
| **Redis "returned to AGPL"** | **Half true.** Redis 8+ is **tri-licensed RSALv2/SSPLv1/AGPLv3** — AGPL was *added* as an option | 8.10.1 | CAVEAT |
| Elasticsearch "back to AGPL" | Same shape — AGPL sits *alongside* ELv2 + SSPL | 9.5.3 | CAVEAT → OpenSearch 3.8 if you want true OSS |
| Qdrant | Thriving | **1.19.1** (2026-09-04) | LEARN |
| **Milvus** | Shipped **3.0.0** (2026-07-29) — doc doesn't mention the major | 3.0.0 | Optional |
| **Kafka** | Doc says 4.x generically; KRaft-only ✔ | **4.3.1** (2026-06-25) | LEARN. 3.9.x is the last ZooKeeper branch |
| RabbitMQ | Thriving, quorum queues default | 4.3.5 | LEARN (before Kafka) |
| **NATS licence dispute** | **Settled May 2025** — stayed in CNCF, Apache-2 | 2.14.6 | No risk |
| Debezium | Thriving | **3.6** (2026-09-01) | LEARN (outbox + CDC) |
| **CockroachDB** | **Self-hosted Core was retired.** Enterprise free only under $10M revenue | v26.2 | SKIP — do not present as OSS alongside Postgres |
| **DuckDB** | 1.5.x current; **v2.0-alpha announced 2026-09-02** | 1.5.5 | LEARN |
| ClickHouse | Thriving, **no IPO** ($15B valuation Jan 2026) | v26.x | Optional |
| **Turso** | Rust rewrite ✔ but **pre-1.0 (v0.7.2)**; now also speaks Postgres wire (experimental) | 0.7.2 | CAVEAT — not production-ready |
| Litestream | Revived, thriving | 0.5.17 (2026-08-31) | LEARN — great $0 SQLite backup story |
| **Neon** | **Acquired by Databricks** (~$1B, May 2025); powers Databricks Lakebase | — | Still usable standalone; know the ownership |
| Supabase | $500M @ **$10.5B** (Jun 2026) | — | LEARN |
| MongoDB | SSPLv1 ✔. "Document DB default" is arguable — 24% in SO 2025, 6th overall | 8.3 | CAVEAT |

## A5. DevOps, cloud, observability

| Topic | Current status | Latest version (date) | Verdict |
|---|---|---|---|
| **Ingress-NGINX** | **RETIRED March 2026.** The default ingress controller a learner would install no longer exists | — | **SKIP → Gateway API.** Biggest curriculum change of 2026; the doc misses it entirely. [src](https://opensource.googleblog.com/2026/02/the-end-of-an-era-transitioning-away-from-ingress-nginx.html) |
| **Kubernetes** | Doc says 1.34–1.36 supported — wrong. **1.34 is already EOL** | **1.37.0** (2026-08-26); supported = 1.35/1.36/1.37 | LEARN 1.36/1.37 |
| Gateway API | GA, TCPRoute/UDPRoute now Standard | **v1.6.1** (v1.6.0 2026-08-03) | LEARN. Note: Ingress the *API object* is not formally deprecated — its reference controller died |
| **Helm** | Doc says Helm 3 security ends Nov 2026 — **wrong, extended to 2027-02-10** | **4.2.4** | LEARN Helm 4 |
| DRA for GPUs / in-place pod resize | GA (1.34 / 1.35) | — | LEARN |
| **Docker Engine / Compose** | Thriving | **29.8.0 / v5.5.1** (2026-09-03) | LEARN. Compose is on **v5**, not v2 |
| **Podman** | **6.0.x** — a major jump from the 5.x every tutorial shows | 6.0 | Optional |
| **Argo CD** | Doc says ~3.3 — stale | **3.5.2** (2026-08-27) | LEARN |
| **Flux** | Doc says ~2.8 — stale | **2.9.5** (2026-08-31) | Optional |
| **Terraform** | Doc says ~1.15 — stale. **Still BUSL; IBM did not relicense** | **1.16.1** (2026-09-02) | CAVEAT |
| **OpenTofu** | Doc says ~1.11 — stale | **1.12.2** (2026-06-12) | LEARN → OpenTofu for greenfield ✔ (MPL, state encryption, provider `for_each`) |
| **Crossplane** | **v2 changed the composition model** — v1 tutorials actively mislead | v2.4 | Optional |
| **GitHub Actions pricing** | Doc misses it entirely. Hosted rates cut ~39% (2026-01-01); self-hosted runners picked up a **$0.002/min** charge (2026-03-01). **Free on public repos** | — | Matters for your $0 budget: keep repos public |
| **OpenTelemetry** | **Graduated CNCF 2026-05-21**. Traces/metrics/logs stable | Collector v1.60.0 | LEARN |
| **OTel Profiles** | Doc implies a 4th stable signal — **it's public alpha** (2026-03-26), explicitly not for production | — | SKIP |
| **OTel GenAI semantic conventions** | **Still not stable**, moved to its own repo | — | CAVEAT |
| Prometheus | Thriving | **3.14.0** (2026-08-17) | LEARN |
| Grafana / Loki | Thriving | **13.1.x** / 3.7.7 | LEARN |
| Backstage | CNCF-graduated, weekly releases. "DIY is dead" is directionally right | 1.54.6 | Optional |
| **Cloud share** | Doc: AWS 28–31 / Azure 23–25 / GCP 11–15 at +63%. **Synergy Q2 2026: AWS 28 / Azure 20 / GCP 15 at +82%** | — | Correct the numbers |
| **AWS SAA-C04** | **Unverified** — AWS's own docs still document **SAA-C03** | SAA-C03 | Don't print C04 |
| CKA | Curriculum **v1.35** (CKS still v1.34) | — | LEARN (optional cert) |
| FOCUS | Doc gives no version | **v1.4** | Optional |
| Jenkins / Chef / Puppet | Legacy | — | SKIP |
| kubeadm-from-scratch | Learning exercise, not a job skill | — | SKIP (doc agrees) |
| "Docker 92% adoption", "64% GitOps", "OTel 76% / Prom 77%", "Workers <5ms vs Lambda 1.2–2.8s", "Scalr 72–76% OpenTofu" | **All unverified** — vendor marketing or secondary blogs | — | Don't cite |

## A6. AI engineering layer

| Topic | Current status | Latest version (date) | Verdict |
|---|---|---|---|
| **MCP spec** | Doc's **2026-07-28** revision is correct and current — but the doc badly understates what changed | 2026-07-28 | LEARN |
| **MCP: what actually got removed** | No `initialize`, no `Mcp-Session-Id`, no `ping`, no `logging/setLevel`, no SSE resumability. `server/discover` now mandatory. **Roots, Sampling and Logging are DEPRECATED** (12-mo window). OAuth Dynamic Client Registration deprecated → Client ID Metadata Documents | — | **SKIP Roots/Sampling/Logging** — any tutorial teaching them is teaching a dying feature |
| **MCP SDK skew** | Python `mcp` **2.1.1** tracks the new spec. **TypeScript `@modelcontextprotocol/sdk` 1.30.0 predates it** | — | CAVEAT — expect gaps building MCP servers in TS |
| LangGraph | Thriving | 1.2.11 (2026-08-11) | LEARN |
| **LangChain v1** | **Shipped and already at 1.4.0** — doc's silence implies otherwise | 1.4.0 (2026-09-03) | Optional |
| Claude Agent SDK / OpenAI Agents SDK / Google ADK | All active | 0.3.263 / 0.22.0 / 2.8.0 | LEARN one |
| **Vercel AI SDK / Mastra** | Doc omits both. **AI SDK v7 is the TS default** | `ai` 7.0.93 / `@mastra/core` 1.64.0 | **LEARN — this is your stack, not Python's** |
| A2A | Spec v1.0 under Linux Foundation, 150+ orgs | 1.1.0 SDK | Optional — real but thinner than MCP |
| Langfuse | Thriving, OSS | **4.15.1** | LEARN — best OSS default |
| **Ragas** | **Stagnant** — last release 2026-01-13, ~8 months | 0.4.3 | **SKIP → DeepEval 4.2.1 / Langfuse** |
| DeepEval | Very healthy | **4.2.1** (2026-09-03) | LEARN |
| Promptfoo / Garak | Healthy | 0.122.2 / 0.16.0 | LEARN (red-teaming) |
| LiteLLM | Very healthy | **1.100.0** (2026-09-06) | LEARN |
| vLLM | Very healthy | 0.28.0 | Optional at $0 budget |
| **"DoRA is the 2026 default"** | **FALSE.** Primary PEFT guidance: **LoRA r=16–32 is still the correct start.** DoRA = +1–3% accuracy for +5–10% VRAM, near-zero gain on LM objectives | — | **SKIP → plain LoRA r=16–32.** Most actively misleading claim in the doc |
| **Embeddings — voyage-3-large** | **Legacy.** voyage-4 series shipped (32k ctx) | voyage-4-large | CAVEAT |
| **Embeddings — "Qwen3 best open"** | **No longer MTEB #1** — KaLM-Embedding-Gemma3-12B leads (72.32 vs 70.58) | — | CAVEAT — Qwen3-Embedding is still the best *practical* open pick, so the recommendation survives |
| Gemini Embedding 2 | Shipped, multimodal — doc omits | — | Option |
| **OpenAI prompt caching "~50%"** | **WRONG — it's 90%** (10x cached-input discount across the rate card) | — | **The doc's entire cost-engineering ladder is miscalculated** |
| Anthropic prompt caching | ~90% ✔ (Fable 5.1 hits 97.5%) | — | Correct |
| Batch APIs ~50% off | ✔ both providers | — | Correct |
| **Model lineup — GPT-5.6 as frontier** | **Stale. GPT-6 (Astra) exists**; GPT-5.6 is now the mid price-performance tier | — | CAVEAT |
| Claude lineup | **Fable 5.1 / Mythos 5.1** now current; Opus 5, Sonnet 5, Haiku 4.5 | — | CAVEAT |
| Gemini | **3.8 Flash** is newest stable; **3.1 Pro is still preview** | — | CAVEAT |
| Open weights | Kimi **K3** ✔ (2.8T, 1M ctx), GLM 5.2/5.3, DeepSeek V4-Flash **$0.14/$0.28 exactly right** ✔. But **Qwen is 3.5 now**, and **Llama 4 has stalled** (Meta pivoted closed) | — | CAVEAT — Qwen 3.5 is the safest open default |
| **"OpenAI standardized on Responses API"** | **Half wrong.** Chat Completions is NOT deprecated. What sunset was the **Assistants API** (2026-08-26). New fine-tuning jobs end hard on **2027-01-06** | — | CAVEAT |
| Anthropic fine-tuning not GA | ✔ correct | — | — |
| RAG pipeline (BM25+vector → RRF k=60 → rerank) | Structurally sound; long context has **not** displaced RAG | — | LEARN |
| **Missing from doc: contextual retrieval + late interaction (ColBERT/ColPali)** | Now routine advanced practice | — | ADD |
| "reranking +17% Success@1", "vLLM 16–20x Ollama", "SGLang +29% H100", "QLoRA 70B in 48GB / $1.50 / $8", "routing cuts 75–85%", "semantic cache ~70%" | **All unverified.** vLLM-vs-Ollama is directionally right at high concurrency but scenario-dependent | — | Don't cite |

## A7. Data / classical ML

| Topic | Current status | Latest version (date) | Verdict |
|---|---|---|---|
| pandas 3.0 + Copy-on-Write | **Genuinely shipped** (3.0.0 on 2026-01-21) | 3.0.5 | LEARN — CoW is a real semantic break |
| Polars / DuckDB | Thriving | 1.44.1 / 1.5.5 | LEARN |
| PyTorch | Thriving | 2.14.0 (2026-09-02) | Optional. "85% of papers" is unverified (sources range 55–85%) |
| TensorFlow | **Repositioned, not dead** — 2.21 graduated LiteRT; TF's future is on-device inference | 2.21.0 | SKIP (doc agrees) |
| scikit-learn | Thriving | 1.9.0 | Optional |
| MLflow | Thriving; v3 GenAI tracing ✔ | 3.16.0 | Optional |
| **BentoML** | Quiet ~4 months | 1.4.39 (2026-05-07) | CAVEAT — softest spot in the MLOps list |
| **Iceberg "won the table-format war"** | **Overstated.** Spec **v3 is current; v4 does not exist** as a spec. Delta Lake 4.1.0 is healthy | 1.11.0 | CAVEAT — convergence is happening at the **catalog** layer (Polaris, Unity Catalog), not by Delta dying |
| **Fivetran + dbt merger** | **Verified — completed 2026-06-01** | — | Correct |
| **Great Expectations** | **Doc misses this: GX the company wound down; Fivetran became steward (2026-05-13)**. So one vendor now owns dbt tests *and* GX | 1.22.0 | CAVEAT — no longer a neutral OSS standard |
| **Airflow** | Doc credits 3.0 and stops. 3.1/3.2/3.3 have all shipped | **3.3.1** (2026-08-12) | Teach 3.3 |
| Dagster / Prefect / Flink | Thriving | 1.13.21 / 3.8.5 / **2.3.0** | Optional. Flink is on **2.x** now |
| "AI Engineer = #1 fastest-growing US job (LinkedIn 2026)" | **Verified** | — | Safe to cite |
| "275K postings +53% YoY", all 2026 salary bands, "6.8% event-driven adoption" | **Unverified.** The 6.8% figure appears to trace to a **2021** vendor survey | — | Don't cite |

## A8. Mobile — the worst section in the document

| Topic | Current status | Latest version (date) | Verdict |
|---|---|---|---|
| **iOS 27 / Xcode 27 / Swift 6.4** | **NONE OF THESE HAVE SHIPPED.** All were unreleased betas on the doc's own date and still are today | iOS **26.6.1**, Xcode **26.6**, Swift **6.3.3** | **SKIP** — the entire Apple section is written in past tense about future software |
| **Kotlin** | Doc says 2.2–2.3 — a full major behind | **2.4.10** (2026-07-14) | — |
| **Android 17 / API 37** | Shipped. Doc never names an API level | API 37 | — |
| **Google Play targetSdk 36 deadline** | **Was 2026-08-31 — already past.** Doc omits it | — | Critical omission |
| **Android developer verification** | **Live since Sept 2026** in BR/ID/SG/TH; global 2027. Affects sideloading | — | Critical omission |
| **Apple EU DMA overhaul** | Announced 2026-08-18, **effective 2026-10-01**. Core Technology Fee → **5% Core Technology Commission** | — | Critical omission |
| React Native | Doc says 0.82 — five releases stale | **0.87.1** (2026-08-26) | New Arch-only ✔, Hermes V1 default ✔ |
| Expo SDK | Thriving | **56** (2026-05-21) | "Official workflow" overstates it |
| Flutter | Thriving. **3.47 decoupled Material/Cupertino from the SDK** — doc misses this | 3.47 | — |
| Compose Multiplatform | **iOS is stable** ✔ (since 1.8.0, May 2025) | 1.12.0 | — |
| "Flutter 46% / RN 35% / KMP 23%", "RN avg $145K" | **Unverified** — no SO/JetBrains primary source found | — | Don't cite |

## A9. Security & compliance

| Topic | Current status | Latest version (date) | Verdict |
|---|---|---|---|
| **OWASP Top 10:2025** | **All 10 categories and the order verified item-by-item**, including SSRF merged into A01 and both new entries | Released Nov 2025, finalized Jan 2026 | LEARN as written. A09's exact title is "Security **Logging** and Alerting Failures". Not retitled to 2026 |
| **OWASP LLM Top 10** | **Doc is an edition behind.** The **2026 edition** published 2026-08-03 — 3 weeks before the doc | 2026 | **Relearn the 2026 order:** Excessive Agency 6→**3**; Unbounded Consumption 10→6; Misinformation 9→7; Improper Output Handling 5→**10**; System Prompt Leakage **renamed "Hidden Context Exposure" (LLM08)** |
| **OWASP Agentic** | Exists, but mislabelled by the doc. It's "**Top 10 for Agentic Applications**" v2.01, published **2025-12-09** — items are ASI01–ASI10 | v2.01 | LEARN |
| **New: OWASP Agent Control Standard (ACS)** | Announced **2026-09-01**. Not in the doc at all | — | ADD |
| OWASP MCP Top 10 | **v0.1, Incubator, Phase 3 beta.** Final ~Oct 2026 | v0.1 | LEARN as provisional. 40+ MCP CVEs logged (e.g. CVE-2025-6514 mcp-remote RCE) |
| OWASP API Top 10 | **2023 is still current** — no 2025/26 edition | 2023 | LEARN |
| **EU Cyber Resilience Act** | **Doc is exactly right.** Reporting duties **2026-09-11** (5 days from now); main obligations **2027-12-11** | — | LEARN |
| **EU AI Act high-risk timing** | **Doc's worst factual error.** The **Digital Omnibus on AI entered into force 2026-07-27** — a month before the doc. Annex III high-risk moved 2026-08-02 → **2027-12-02**; Annex I → **2028-08-02** | — | Correct it. GPAI-since-Aug-2025 ✔; Art. 50 transparency unamended |
| **SLSA** | Doc says v1.0. **v1.1 is already Retired; v1.2 (Nov 2025) is current** and adds the Source Track | v1.2 | CAVEAT |
| Sigstore cosign + Rekor v2 | Healthy; Rekor v2 GA 2025-10-10 | 3.1.1 | LEARN |
| Syft / Trivy / Semgrep / Gitleaks / OSV-Scanner / ZAP / DefectDojo | All healthy | 1.46 / 0.74 / 1.176.1 / 8.30.1 / 2.4 / weekly / 2.59 | LEARN |
| SPDX / CycloneDX | Stable | **3.0.1** / **1.7.1** | LEARN |
| **Vault** | Doc doesn't mention it: **Vault 2.0 landed Apr 2026 under IBM** | 2.0.4, BUSL | CAVEAT |
| OpenBao | Healthy LF fork, **MPL-2.0** | 2.5.4 | LEARN — the licence contrast *is* the teaching point |
| SPIFFE/SPIRE, OPA, Kyverno | Healthy | 1.15.3 / **1.20.1** / 1.18.1 | LEARN. Rego gained `and`/`or` keywords in OPA 1.20 |
| **NIST COSAIS** | SP 800-53 Control Overlays for Securing AI — current artefact to pair with AI RMF 1.0. Doc omits | — | ADD |
| GDPR Digital Omnibus | **Still in negotiation** — separate track from the AI omnibus | — | Don't conflate |
| "80–109:1 machine identities", "88% agent incidents", "~46% shared API keys" | **All three verified.** But 80:1 (CyberArk 2025) and 109:1 (Palo Alto, May 2026) are **two different reports a year apart**; the 88%/45.6% figures are **Gravitee's** *State of AI Agent Security 2026* (n=919) | — | Cite by name |

## A10. The $0 reality — deploy targets

This is where the syllabus is least useful to you. It names Fly.io, Railway and Render as if their 2023 free tiers still exist. They don't.

**Dead free tiers (any 2024–25 tutorial telling you to use these is wrong):**

| What died | What actually happens now |
|---|---|
| **Fly.io free allowance** (3× 256MB VMs) | Gone. Trial = **2 VM-hours or 7 days**, then a card. Adding a card *ends* the trial |
| **Railway free tier** | $1/mo credits, 0.5 GB RAM, 1 replica. Not enough for a portfolio |
| **Render free Postgres** | **Deleted 30 days after creation** (+14-day grace) |
| **Render free Redis** | In-memory only — data lost on every restart |
| **Netlify 100 GB / 300 build-min** | Replaced Sep 2025 by **300 credits/mo** ≈ 15 GB bandwidth *or* 20 deploys, hard-capped |
| **Highlight.io** | Acquired by LaunchDarkly, sunset, domain redirects |
| **Cerebras free tier** | $5 credits, expire in 30 days, card required |
| **Oracle 4 OCPU / 24 GB Ampere** | Now documented as **2 OCPU / 12 GB** |
| **Cloudflare Containers on free** | Never arrived — needs Workers Paid ($5/mo) |
| **Anonymous `docker pull` in CI** | 100 pulls / 6 hrs per IP. Always `docker login` |
| **Koyeb $5.50/mo credit** | Now one 0.1-vCPU instance + a **$29 card auth hold** |

**The $0 stack that actually works in Sept 2026:**

| Need | Target | Free limits (verified 2026-09-06) |
|---|---|---|
| Containerized Node API, long-running workers | **Oracle Cloud Always Free Ampere A1** + Docker/Coolify | 1,500 OCPU-hrs + 9,000 GB-hrs/mo = **2 OCPU / 12 GB**, 200 GB block storage, 10 TB egress. Card + verification hold. Idle-reclaimed if CPU+net+mem all <20% p95 over 7 days |
| Serverless API / edge | **Cloudflare Workers** | 100k req/day, 10 ms CPU/invocation. KV 1 GB. D1 5 GB + 5M rows read/day. R2 10 GB. Durable Objects (SQLite). Queues 10k ops/day. **No card** |
| Showcase web service | **Render free** | 750 instance-hrs/mo, 512 MB, spins down after 15 min idle (~1 min cold start) |
| Postgres | **Neon** | 0.5 GB/project, 100 CU-hrs/project/mo, **100 projects** — the only one that scales to 40 repos. Scale-to-zero after 5 min |
| Postgres + auth + storage (flagships) | **Supabase** | 500 MB DB, 5 GB egress, 50k MAU, **2 active projects**. ⚠️ **Projects pause after 1 week idle** |
| Cache | **Upstash Redis** free (256 MB, 500k cmd/mo) or Valkey in Docker on the Oracle box | |
| Vector search | **Qdrant Cloud** free cluster (0.5 vCPU / 1 GB / 4 GB disk) · **Upstash Vector** (10k queries/day) · or just **pgvector on Neon** | |
| Static / frontend | **Cloudflare Pages** (unlimited static bandwidth, 500 builds/mo) · GitHub Pages for docs | Vercel Hobby only if you need Next SSR — and it is **non-commercial personal use only** |
| Queue / background jobs | **Cloudflare Queues** (10k ops/day) or BullMQ on Upstash | Long-running workers → systemd on the Oracle box |
| Observability | **Axiom** (500 GB ingest/mo, 30-day retention — best free tier here) + **Grafana Cloud** (10k series, 50 GB logs/traces) + **Sentry Developer** (5k errors, 1 seat) | |
| CI + registry | **GitHub Actions unlimited on public repos** + **GHCR** | Keep every portfolio repo public — it's free *and* it's the portfolio |
| LLM APIs | **Gemini API free tier** (Gemini 3.x Flash / 2.5 Flash) · **Groq** (30 RPM, 1k RPD) · **Cloudflare Workers AI** (10k Neurons/day) · **GitHub Models** (150 req/day) | ⚠️ **Gemini free-tier prompts ARE used to improve Google products.** Never send private data |

⚠️ **Unverified and material to you:** whether Oracle Always Free signup currently succeeds on Indian cards, and MongoDB Atlas M0 availability in the Mumbai region. Both need a 20-minute check before the plan depends on them.

## A11. Statistics in the syllabus that could not be sourced

Do not repeat these in interviews or READMEs — several trace to SEO content farms or vendor marketing:

REST >80% / GraphQL ~28% · "42% consolidated microservices back" · Docker 92% container adoption · 64% enterprise GitOps · OTel 76% / Prometheus 77% · Cloudflare Workers <5ms vs Lambda 1.2–2.8s p95 · Scalr 72–76% OpenTofu · Bun 210K vs Node 85K req/s (absent from Bun's own 1.4 post) · Python free-threading "3.1x" (CPython docs cite a 5–10% single-thread *penalty*) · reranking +17% Success@1 / +15% nDCG@10 · SGLang +29% on H100 · QLoRA 70B in 48 GB / $1.50 / $8 · model routing 75–85% · semantic caching ~70% · MCP SDK download totals · 275K AI postings +53% YoY · all 2026 salary bands · 6.8% event-driven adoption (traces to a **2021** survey) · Flutter 46 / RN 35 / KMP 23 · RN $145K · TypeScript "8–12x faster builds" · PyTorch "85% of papers"

## A12. Summary — what changes before we plan

**Do not learn (dead or never shipped):**
Ingress-NGINX · webpack · Cypress · Jenkins/Chef/Puppet · Yarn Berry · kubeadm-from-scratch · Ragas · MCP Roots/Sampling/Logging · DoRA-as-default · voyage-3-large · OTel Profiles-as-stable · TensorFlow · Vue Vapor Mode · SolidJS 2.0 · Nitro 3 · htmx 4 · CockroachDB-as-OSS · iOS 27 / Xcode 27 / Swift 6.4 · Redis (→ Valkey) · Fly.io/Railway/Render-Postgres free tiers

**Learn the replacement instead:**
Gateway API · Vite/Rspack · Playwright · GitHub Actions · pnpm · managed EKS/GKE at workload level · DeepEval + Langfuse · plain LoRA r=16–32 · voyage-4 · OpenTofu 1.12 · Valkey 9.1 · Vercel AI SDK v7 (not Python-first agent stacks) · Oracle A1 + Cloudflare + Neon

**Corrections that change what you'd build:**
OpenAI prompt caching is **90%**, not 50% — recompute any cost model · OpenAPI **3.2**, not 3.1 · Kafka **4.3.1** · K8s **1.37**, 1.34 is EOL · Helm 3 EOL is **Feb 2027** · SLSA **v1.2** · OWASP LLM Top 10 **2026 edition** with a reordered list · EU AI Act high-risk deadlines **pushed to Dec 2027 / Aug 2028** · Postgres **19 lands within weeks** · Drizzle's npm `latest` is still **0.45**, not 1.0

---
*Compiled 2026-09-06 from ~380 primary-source lookups across 9 parallel verification passes. Every version above was read from an official release page, package registry, or standards body — not from model memory. Where a figure could not be traced to a primary source it is marked unverified rather than repeated.*
