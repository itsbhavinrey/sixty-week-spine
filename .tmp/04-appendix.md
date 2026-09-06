# Appendix — Phase 8+

> Everything in the source syllabus that is not on the job-switch critical path. Undated.
> Baseline verified **2026-09-06**. Re-verify per phase — see [`../README.md`](../README.md).

Everything in your syllabus that isn't on the job-switch critical path. Same format, no dates. Pick up after you've switched.

## A. Frontend depth (~180 hrs)
React 19.2 + Compiler 1.0 · Next.js 16.3 (`use cache`, PPR, `proxy.ts`) · Tailwind 4 + shadcn · TanStack Query + Zustand · Vitest 5 + Playwright + Storybook 10 · WCAG 2.2 AA + axe · Core Web Vitals (LCP/INP/CLS) · modern CSS (container queries, `:has()`, `@scope`, View Transitions).
**Projects:** an a11y-audited app with a published axe report · a CWV case study with real before/after field data · a component library in Storybook 10 with visual regression tests.

**⚠️** Skip the CSS anchor positioning hype (not Baseline) and Vue Vapor / Solid 2.0 / htmx 4 (none shipped).

## B. DevOps and platform depth (~330 hrs)
OpenTofu 1.12 (state encryption, provider `for_each`) · GitHub Actions OIDC federation · managed EKS/GKE · Argo CD 3.5 GitOps · Helm 4.2 · Cilium/eBPF · DevSecOps (SBOM + cosign + SLSA v1.2, Kyverno/OPA) · Backstage · FinOps (FOCUS v1.4, OpenCost).
**Projects:** full IaC + pipeline for driftwatch on a managed cluster · a GitOps repo with drift detection · a mini internal platform (template repo + pipeline + GitOps + observability + cost visibility) — the syllabus's own DevOps capstone.

**⚠️** This is the branch that needs a paid cloud account. Budget ~$30/month or use a free-trial window deliberately.

## C. Data engineering (~300 hrs)
SQL on DuckDB → dbt (post-Fusion) → Airflow 3.3 or Dagster → Kafka 4.3 + Flink 2.3 → Iceberg spec v3 + a catalog (Polaris / Unity) → data contracts and lineage.
**Projects:** an end-to-end ELT pipeline with dbt tests and lineage · a streaming aggregation on Flink · an Iceberg table queried from two engines.

**⚠️** Fivetran now owns both dbt Labs (merger completed 2026-06-01) and Great Expectations (steward since 2026-05-13). Iceberg spec **v4 does not exist**; Delta Lake 4.1 is alive. The real convergence is at the catalog layer.

## D. Classical ML (~270 hrs)
pandas 3.0 (Copy-on-Write) + Polars · PyTorch 2.14 · scikit-learn 1.9 · MLflow 3.16 · LoRA fine-tuning (**r=16–32, not DoRA**) on Colab free · serving via KServe.
**Projects:** a tabular baseline with a model card · a QLoRA fine-tune with published before/after evals · a served model with drift monitoring.

**⚠️** Skip TensorFlow. Its future is on-device inference (LiteRT), not training.

## E. Second language: Go, then optionally Rust (~300 hrs)
Go 1.27 (container-aware GOMAXPROCS, Green Tea GC, stdlib `net/http`, sqlc) — the syllabus's "80% language" for cloud-native backends, ~28k US openings. Then Rust + Axum only if you hit a real tail-latency or memory problem.
**Projects:** rewrite driftwatch's scanner in Go and publish the latency/memory comparison — that single benchmark post is worth more than a tutorial project in either language.

## F. Mobile (cut — here if you change your mind, ~240 hrs)
React Native 0.87 + Expo SDK 56 in TypeScript is your only sane entry point given the JS/TS constraint.

**⚠️ Before you touch this, re-verify:** iOS 27 / Xcode 27 / Swift 6.4 were all unreleased betas as of 2026-09-06 · Google Play's targetSdk 36 deadline **passed 2026-08-31** · Android developer verification went live Sept 2026 · Apple's EU DMA terms changed effective 2026-10-01. The syllabus's mobile section was the least reliable part of the document.

---

*Plan compiled 2026-09-06 against a currency audit of ~380 primary sources. Re-verify each phase before starting it using the prompt in D2. Every deploy target and free-tier limit above was read from an official pricing page on 2026-09-06 and will drift — the ones most likely to change first are Cloudflare's free Workers limits and Neon's compute-hour allowance.*
