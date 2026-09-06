# Weeks

Tick a week when its focus is genuinely done, not when the dates pass. Commit the tick — the
timestamps are the honest record of your pace, and you will want them in month 7 when you are
wondering whether any of this is working.

**2026-09-07 → 2027-10-31** · 15 hrs/week · 900 hours total

Five weeks are marked BUFFER (15, 26, 33, 43, 60). They are not padding. You will need all five.

### Phase 0 — The shipping ritual · weeks 1–2

- [ ] **W01** `2026-09-07` — Repo template, TS strict, Vitest, Biome, GH Actions, README discipline → **ships P0.1**
- [ ] **W02** `2026-09-14` — Node CLI craft, npm registry API, semver, npx distribution → **ships P0.2**

### Phase 1 — SQL and the wire · weeks 3–8

- [ ] **W03** `2026-09-21` — Joins, CTEs, window functions, aggregation. DSA starts: 1/day
- [ ] **W04** `2026-09-28` — Indexing, EXPLAIN, transactions, isolation levels → **ships P1.1**
- [ ] **W05** `2026-10-05` — Schema design, normalization, migrations → **ships P1.2**
- [ ] **W06** `2026-10-12` — HTTP deeply, caching headers, cookies vs tokens
- [ ] **W07** `2026-10-19` — DNS, TCP/UDP, TLS 1.3, HTTP/2 vs HTTP/3 → **ships P1.3**
- [ ] **W08** `2026-10-26` — SSE, WebSockets, Durable Objects → **ships P1.4**

### Phase 2 — TypeScript and API design · weeks 9–15

- [ ] **W09** `2026-11-02` — TS strict, generics, discriminated unions
- [ ] **W10** `2026-11-09` — Conditional/mapped types, satisfies, zod at boundaries → **ships P2.1**
- [ ] **W11** `2026-11-16` — REST design: cursor pagination, idempotency keys, RFC 9457
- [ ] **W12** `2026-11-23` — Rate limiting, versioning, OpenAPI → **ships P2.2**
- [ ] **W13** `2026-11-30` — Raw SQL vs Drizzle; the emitted-SQL question → **ships P2.3**
- [ ] **W14** `2026-12-07` — Vitest, integration testing, Neon branch-per-CI-run → **ships P2.4**
- [ ] **W15** `2026-12-14` — BUFFER - catch-up / write the first blog post

### Phase 3 — Auth and the security baseline · weeks 16–20

- [ ] **W16** `2026-12-21` — argon2id, sessions vs JWT, httpOnly cookies (holiday week - reduced) → **ships P3.1**
- [ ] **W17** `2026-12-28` — OAuth 2.1 + PKCE, exact redirect matching
- [ ] **W18** `2027-01-04` — OIDC, refresh rotation, RS256/EdDSA → **ships P3.2**
- [ ] **W19** `2027-01-11` — WebAuthn, passkeys → **ships P3.3**
- [ ] **W20** `2027-01-18` — OWASP Top 10, API Top 10, RBAC → **ships P3.4**

### Phase 4 — Ship it like you'll be paged · weeks 21–26

- [ ] **W21** `2027-01-25` — Docker multi-stage, layer caching, distroless, rootless → **ships P4.1**
- [ ] **W22** `2027-02-01` — GH Actions: matrix, reusable workflows, attestations, SBOM, cosign → **ships P4.2**
- [ ] **W23** `2027-02-08` — OpenTelemetry: SDK, Collector, semantic conventions
- [ ] **W24** `2027-02-15` — Traces/metrics/logs, W3C traceparent, sampling → **ships P4.3**
- [ ] **W25** `2027-02-22` — SLI/SLO/error budgets, burn-rate alerts, RED dashboards → **ships P4.4**
- [ ] **W26** `2027-03-01` — BUFFER - write ADRs / second blog post

### Phase 5 — Production backend · weeks 27–33

- [ ] **W27** `2027-03-08` — Caching ladder, cache-aside, stampede, invalidation, eviction → **ships P5.1**
- [ ] **W28** `2027-03-15` — Queues, background jobs, retries with jittered backoff
- [ ] **W29** `2027-03-22` — Idempotent consumers, DLQs, at-least-once reality → **ships P5.2**
- [ ] **W30** `2027-03-29` — Realtime at scale: Durable Objects, backplane patterns → **ships P5.3**
- [ ] **W31** `2027-04-05` — k6 load testing, pooling, replicas
- [ ] **W32** `2027-04-12` — N+1 hunting, index tuning under load → **ships P5.4**
- [ ] **W33** `2027-04-19` — BUFFER - publish the benchmark write-up

### Phase 6 — The AI backend layer · weeks 34–43

- [ ] **W34** `2027-04-26` — LLM APIs, SSE relay, provider fallback, token/cost metering → **ships P6.1**
- [ ] **W35** `2027-05-03` — Context engineering, prompts-as-code, injection defense → **ships P6.2**
- [ ] **W36** `2027-05-10` — Golden datasets, LLM-as-judge and its biases
- [ ] **W37** `2027-05-17` — Pairwise/Elo, regression tests in CI → **ships P6.3**
- [ ] **W38** `2027-05-24` — Chunking, embeddings, indexing
- [ ] **W39** `2027-05-31` — Hybrid retrieval, RRF, reranking, contextual retrieval → **ships P6.4**
- [ ] **W40** `2027-06-07` — MCP spec, tools as security boundaries
- [ ] **W41** `2027-06-14` — MCP auth, stateless design, threat modelling → **ships P6.5**
- [ ] **W42** `2027-06-21` — Agents: ReAct, tool schemas, guardrails, human checkpoints → **ships P6.6**
- [ ] **W43** `2027-06-28` — Prompt caching, batching, routing + BUFFER → **ships P6.7**

### Phase 7 — Distributed systems and interview reps · weeks 44–52

- [ ] **W44** `2027-07-05` — Kafka (KRaft), topics, partitions, consumer groups. Sysdesign reps start
- [ ] **W45** `2027-07-12` — Transactional outbox, CDC, DLQs → **ships P7.1**
- [ ] **W46** `2027-07-19` — gRPC, protobuf, Buf, ConnectRPC, streaming → **ships P7.2**
- [ ] **W47** `2027-07-26` — Raft, CAP/PACELC, quorums, consistency models → **ships P7.3**
- [ ] **W48** `2027-08-02` — K8s workload level: Deployments, Services, Gateway API
- [ ] **W49** `2027-08-09` — HPA, RBAC, Helm charts, kind → **ships P7.4**
- [ ] **W50** `2027-08-16` — System design reps 1-4
- [ ] **W51** `2027-08-23` — System design reps 5-8
- [ ] **W52** `2027-08-30` — System design reps 9-12 + DSA final push → **ships P7.5**

### Phase 8 — Capstone and launch · weeks 53–60

- [ ] **W53** `2027-09-06` — Multi-tenancy hardening, the public Drift Index
- [ ] **W54** `2027-09-13` — Public dataset + landing page
- [ ] **W55** `2027-09-20` — Architecture doc + ADR backfill
- [ ] **W56** `2027-09-27` — Portfolio pass: all 22 READMEs to standard
- [ ] **W57** `2027-10-04` — Resume (X-Y-Z), LinkedIn, GitHub profile - START APPLYING
- [ ] **W58** `2027-10-11` — Launch: HN / r/programming / dev.to writeup
- [ ] **W59** `2027-10-18` — Interview prep: mock designs, mock DSA
- [ ] **W60** `2027-10-25` — BUFFER + first applications wave → **ships C1**
