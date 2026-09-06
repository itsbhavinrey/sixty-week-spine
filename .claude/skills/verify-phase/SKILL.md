---
name: verify-phase
description: Re-verify the tool versions, spec revisions and free-tier limits for one phase of the sixty-week roadmap against primary sources, then write a dated audit into phases/phase-N/verified/ and diff it against the previous one. Use when starting a new phase, or when the user says "verify phase N", "re-verify", "what changed since last time", "is the plan still accurate", or before beginning any project in a phase whose last verification is over 60 days old.
---

# Verify a phase

This is the loop the whole repo exists for. The plan was accurate on **2026-09-06** and has been
decaying ever since. Run this before starting a phase, not after.

## Step 0 — establish the facts you are working from

1. Read `data/plan.json` for the phase's week range and projects.
2. Read `phases/phase-N/topics.md` — this is the input list.
3. Read `phases/phase-N/README.md` for the deploy targets each project depends on.
4. `ls phases/phase-N/verified/` — the newest file is your **baseline**. Read it. If the folder
   only has `.gitkeep`, the baseline is the relevant section of `plan/00-currency-audit.md`.
5. Get today's real date with `date -I`. Do not assume it.

## Step 1 — fan out

Do **not** research serially — it is slow and you will run out of patience before you run out of
topics. Split the topic list into 3–6 clusters by kind (language/runtime, data, infra,
AI stack, security/specs, free tiers) and dispatch one `Agent` per cluster **in a single
message** so they run in parallel.

Give every agent this framing verbatim, because it is what makes the output trustworthy:

> Today is `<real date>`. You are doing a currency audit. Your training data is stale — verify
> every fact with WebSearch/WebFetch against primary sources (official release pages, GitHub
> releases, package registries, standards bodies, vendor pricing pages). Do not answer from
> memory. If you cannot verify something from a primary source, say "unverified" — never guess,
> and never infer a version from a blog post or comparison article.

Then, per cluster, ask for exactly this and nothing else:

1. Latest stable version + release date. Flag any **major** released since the baseline date.
2. Health: thriving / maintenance / deprecated / **never shipped**. Check the last release date —
   no release in 6+ months is a signal regardless of stars.
3. Anything **retired or replaced** since the baseline, and by what. (Precedent: Ingress-NGINX was
   retired in March 2026 and most curricula still teach it.)
4. For specs: current revision, and which features were **deprecated**. (Precedent: MCP
   2026-07-28 deprecated Roots, Sampling and Logging.)
5. For hosted services: current free-tier limits read from the **official pricing page**, and
   whether a card is now required.
6. Security advisories, licence changes, EOL dates.

Ask each agent to return a compact table plus a short "corrections and surprises" list, and to
mark anything it could not source as `unverified`. Keep each agent under ~1000 words.

## Step 2 — write the file

Copy `templates/VERIFICATION.md` to `phases/phase-N/verified/<YYYY-MM-DD>.md` and fill it in.

Classify every change with this rule, and put each one under the right heading:

| Verdict | When |
|---|---|
| **REDO** | A shipped project now demonstrates a **retired** or **insecure** pattern. Non-negotiable for anything security-related |
| **ADJUST** | A major version changed the API you would write today. Bump it next time you touch the repo |
| **NOTE ONLY** | Minor/patch bumps, moved benchmarks, cosmetic changes. Do not chase these |

Also flag, separately, any **statistic** in the plan that you could not trace to a primary
source — those get removed from the plan, not adjusted.

## Step 3 — diff and report

```bash
ls phases/phase-N/verified/                       # find the previous file
diff -u phases/phase-N/verified/<prev>.md phases/phase-N/verified/<new>.md
```

Report to Bhavin, in this order and no longer than a screen:

1. **What moved** — majors, retirements, spec revisions. Lead with anything that changes what he
   would build this week.
2. **REDO list** — with the specific repo and what is now wrong in it.
3. **Free tiers** — anything that shrank, died, or now wants a card. This is the one that
   silently breaks the plan, because a dead free tier means a dead portfolio link.
4. **Nothing else material changed** — say this explicitly if true. A quiet phase is a real
   result and worth recording.

## Step 4 — update and commit

- If a plan file in `plan/` is now wrong, fix it **and say in the report that you did**.
- Update the `Last verified` line at the top of `phases/phase-N/README.md`.
- Stage and show the diff. Let Bhavin commit, or commit when he asks, using:
  `verify: phase N — <the one-line headline>`

## Do not

- Do not verify topics from other phases. Scope creep here turns a 30-minute ritual into an
  afternoon and the ritual stops happening.
- Do not edit a previous verification file. They are append-only; an old audit being wrong is
  itself the record.
- Do not soften a finding. "Ragas has not shipped in 8 months" is more useful than "Ragas is
  still available".
