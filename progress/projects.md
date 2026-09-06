# Projects

26 public repos. Add the live URL when each one ships — a portfolio link that 404s
is worse than no link, so click every URL in this table once a quarter.

Status: ⬜ not started · 🔨 in progress · ✅ shipped · ⚠️ shipped but now stale

| ID | Phase | Repo | Deploy target | Status | Live URL |
|---|---|---|---|---|---|
| P0.1 | 0 | `ship-kit` | Cloudflare Pages + GitHub template repo | ⬜ | |
| P0.2 | 0 | `driftwatch` (L1) | npm + asciinema | ⬜ | |
| P1.1 | 1 | `pgtour` | Neon free + Cloudflare Pages | ⬜ | |
| P1.2 | 1 | `driftwatch` (L2) | Neon free | ⬜ | |
| P1.3 | 1 | `wire` | Cloudflare Workers | ⬜ | |
| P1.4 | 1 | `sse-vs-ws` | Cloudflare Workers + Durable Objects | ⬜ | |
| P2.1 | 2 | `typed-api-contract` | Cloudflare Workers + Pages | ⬜ | |
| P2.2 | 2 | `driftwatch` (L3) | Cloudflare Workers + Neon | ⬜ | |
| P2.3 | 2 | `orm-xray` | Neon + Cloudflare Pages | ⬜ | |
| P2.4 | 2 | `driftwatch` (L3b) | GitHub Actions + Neon branches | ⬜ | |
| P3.1 | 3 | `authlab` | Cloudflare Workers + Neon | ⬜ | |
| P3.2 | 3 | `oauth-from-scratch` | Cloudflare Workers + Neon | ⬜ | |
| P3.3 | 3 | `passkey-drill` | Cloudflare Workers + Neon | ⬜ | |
| P3.4 | 3 | `driftwatch` (L4) | Cloudflare Workers + Neon | ⬜ | |
| P4.1 | 4 | `slimjim` | GHCR (images are the artifact) | ⬜ | |
| P4.2 | 4 | `pipeline` | GitHub Actions reusable workflow | ⬜ | |
| P4.3 | 4 | `driftwatch` (L5) | Grafana Cloud + Axiom + Sentry | ⬜ | |
| P4.4 | 4 | `slo-kit` | Grafana Cloud (public dashboard) | ⬜ | |
| P5.1 | 5 | `cache-ladder` | Cloudflare Workers + Upstash | ⬜ | |
| P5.2 | 5 | `driftwatch` (L6) | Cloudflare Workers + Queues | ⬜ | |
| P5.3 | 5 | `roomd` | Cloudflare Workers + Durable Objects | ⬜ | |
| P5.4 | 5 | `breakpoint` | k6 + GitHub Actions | ⬜ | |
| P6.1 | 6 | `streamgate` | Cloudflare Workers + D1 | ⬜ | |
| P6.2 | 6 | `promptlab` | Cloudflare Workers + GitHub Actions | ⬜ | |
| P6.3 | 6 | `evalbench` | GitHub Actions + Pages | ⬜ | |
| P6.4 | 6 | `driftwatch` (L7) | Neon pgvector + Cloudflare Workers | ⬜ | |
| P6.5 | 6 | `driftwatch-mcp` | Cloudflare Workers | ⬜ | |
| P6.6 | 6 | `upgrade-agent` | GitHub App + Cloudflare Workers | ⬜ | |
| P6.7 | 6 | `driftwatch` (L7b) | Cloudflare Workers | ⬜ | |
| P7.1 | 7 | `outbox` | Docker Compose + make demo + asciinema | ⬜ | |
| P7.2 | 7 | `grpc-pair` | Render free + Cloudflare Pages | ⬜ | |
| P7.3 | 7 | `raftlet` | Docker Compose + Pages visualizer | ⬜ | |
| P7.4 | 7 | `k8s-workload` | kind + make demo + GIF | ⬜ | |
| P7.5 | 7 | `sysdesign-reps` | GitHub Pages | ⬜ | |
| C1 | 8 | `driftwatch` (Lv1.0) | Cloudflare Workers + Neon + GitHub App | ⬜ | |

## The spine

`driftwatch` is one repo that grows across 8 layers, from a CLI in week 2 to a multi-tenant
service with retrieval, evals and an MCP server by week 60. Do not split it into eight repos —
the fact that a reader can follow its history is the point.

## Repos

- `authlab`
- `breakpoint`
- `cache-ladder`
- `driftwatch`
- `driftwatch-mcp`
- `evalbench`
- `grpc-pair`
- `k8s-workload`
- `oauth-from-scratch`
- `orm-xray`
- `outbox`
- `passkey-drill`
- `pgtour`
- `pipeline`
- `promptlab`
- `raftlet`
- `roomd`
- `ship-kit`
- `slimjim`
- `slo-kit`
- `sse-vs-ws`
- `streamgate`
- `sysdesign-reps`
- `typed-api-contract`
- `upgrade-agent`
- `wire`
