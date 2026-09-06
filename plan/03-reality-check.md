# Part E — Reality Check

> The honest hours, and the three topics most likely to make you quit.
> Baseline verified **2026-09-06**. Re-verify per phase — see [`../README.md`](../README.md).

## E1. The hours, honestly

| | Hours | At 15 hrs/week |
|---|---|---|
| **The dated spine (Phases 0–8)** | **900** | 60 weeks → **Sep 7, 2026 → Oct 31, 2027** |
| Frontend depth (React 19 / Next 16 / a11y / perf) | ~180 | +12 weeks |
| DevOps depth (OpenTofu, managed K8s, GitOps, platform, FinOps) | ~330 | +22 weeks |
| Data engineering (dbt, Airflow, Kafka+Flink, Iceberg) | ~300 | +20 weeks |
| Classical ML (PyTorch, sklearn, MLflow, fine-tuning) | ~270 | +18 weeks |
| Mobile (cut) | ~240 | +16 weeks |
| Go, then Rust | ~300 | +20 weeks |
| **Everything in the file** | **~2,520** | **~168 weeks ≈ 3 years 3 months** |

**You said no deadline, and that's the right call — but the honest picture is this:** finishing the whole document at 15 hrs/week takes until roughly **early 2030**. That's not a reason not to do it. It *is* a reason to make sure the job switch doesn't wait for it.

**The plan above is 900 hours to job-switch-ready, not to syllabus-complete.** Everything else moves to the appendix, undated, to be picked up after you've switched — at which point you'll be learning some of it on the job and getting paid for it.

**One thing to internalize about timing:** the syllabus's own data says the search now averages **5–6 months** from first application to offer. So Week 57 — when applications start — is not the end of the plan. Applications run *in parallel* with weeks 57–60 and beyond. Working backwards: to have an offer by mid-2028 you need to be applying by late 2027, which is exactly what this schedule does. **Do not wait until you feel ready.** Start applying at Week 57 with 18 projects shipped; the last few land while you're interviewing.

**Where the 900 hours will actually go wrong** (build this into your expectations):
- Weeks 15, 26, 33, 43 and 60 are deliberately buffer weeks. **You will need all five.** They're not padding; they're the difference between a plan and a fantasy.
- Two projects will take twice their estimate: almost certainly **P3.2 (OAuth)** and **P6.4 (RAG)**. Both are flagged 🔴 and both are split across weeks.
- If you're consistently 20% over, don't compress — **cut P7.3 (`raftlet`) and the stretch goals**. That's ~25 hours of slack that costs you almost nothing in hireability.

## E2. The three topics most likely to make you quit

**1. DSA — weeks 3 through 20, one problem a day, alone.**
This is the highest-attrition item in the plan and it isn't close. It's 18 weeks of daily unrewarded grind with no shippable artifact, running *underneath* projects that are far more fun. Most people quit DSA in week 6, tell themselves they'll come back, and don't.

*Mitigation:* (a) **Timebox it hard at 30 minutes.** Not solved in 30? Read the solution, write it out in your own words, re-solve it from memory in three days. The syllabus's own data — AI-assisted juniors finished faster but scored **17% lower** on mastery — means struggling 15–30 minutes is the point, but struggling 3 hours is not. (b) **Make it visible:** a public repo with one commit per day. The streak is the motivation, not the problems. (c) **Do it first, at the same time every day,** before the project work you actually want to do — because otherwise it never happens. (d) Accept that ~250 problems is enough. You are not training for Codeforces.

**2. Phase 6 weeks 38–39 — the RAG project.**
`driftwatch` L7 is the biggest single build in the plan, it comes at month 9 when initial momentum is long gone, and RAG has a brutal property: **it appears to work almost immediately and is very hard to make actually good.** You'll have something answering questions in four hours and then spend twelve more discovering the answers are subtly wrong. That gap is where people conclude they're not smart enough.

*Mitigation:* (a) **You built `evalbench` first for exactly this reason** — you'll have a number, so "it feels wrong" becomes "Success@1 is 0.41, reranking took it to 0.58." A number you can move is a completely different emotional experience from a vibe you can't. (b) **Ship the naive version at the end of W38 and deploy it.** Broken-and-deployed beats perfect-and-local. (c) If W39 slips, **cut the reranker to the stretch goal, keep the evals.** The evals are the differentiating skill; the reranker is a technique. (d) The **"where retrieval fails"** README section turns your frustration into the most senior-reading part of the repo. Write it while you're annoyed — that's when it's honest.

**3. The month-7 wall — around weeks 26 to 30, Feb–Mar 2027.**
Not a topic. This is the structural one. You'll be six months in, past the novelty, not yet at the AI layer that made you want to do this, working on caching and queues — genuinely valuable and genuinely unglamorous. Meanwhile the market will be noisy and you'll wonder whether any of it is working. **Most 14-month plans die in month 7, not month 1.**

*Mitigation:* (a) **Week 26 is a buffer week — use it to publish, not to catch up.** Write the observability post. External response at month 6 is the fuel that gets you to month 9. (b) **Look backwards, not forwards:** by W26 you'll have ~12 public repos. Re-read your Week 1 README. The delta is the evidence. (c) **Move one interesting thing earlier if you need to** — pulling `streamgate` (P6.1) forward into W33's buffer costs almost nothing dependency-wise and gives you an LLM win exactly when you need one. This is the one place I'd sanction breaking the dependency order. (d) **Start applying at Week 57 regardless of how you feel.** Interview feedback is a stimulant that no amount of studying replaces.

## E3. One thing the syllabus is right about that's worth repeating

Its closing line — *"fundamentals compound and tools rotate"* — is validated by Part A itself. Of ~130 things audited, **~40 had moved in the seven months since the document was written, and six of them never existed.** Every one of those was a tool. Not one of them was a fundamental. SQL, HTTP, TLS, idempotency, consensus, caching, evaluation: none of them moved.

That's the actual case for the ordering in Part B, and it's the answer to "what if this is all obsolete by the time I finish."

---

