# Part D — Staying Current

> Sources worth following, the re-verification prompt, and the redo-vs-note rule.
> Baseline verified **2026-09-06**. Re-verify per phase — see [`../README.md`](../README.md).

## D1. What to follow (and nothing else)

Ten sources. More than this and you'll read instead of build.

**Release feeds — subscribe to GitHub Releases directly, not to blogs about them:**
- Node.js: https://nodejs.org/en/blog/release/ · **watch for the Node 27 cadence change** — one major/year, every major becomes LTS
- TypeScript: https://devblogs.microsoft.com/typescript/
- PostgreSQL: https://www.postgresql.org/about/newsarchive/ · **PG19 GA is imminent**
- Cloudflare Workers changelog: https://developers.cloudflare.com/workers/platform/changelog/ — your entire deploy surface
- MCP spec: https://modelcontextprotocol.io/specification/versioning — the fastest-moving spec you depend on

**Standards and security — these change what's *correct*, not just what's current:**
- OWASP GenAI: https://genai.owasp.org/ — LLM Top 10, Agentic Top 10, MCP Top 10, the new Agent Control Standard
- OWASP Top 10: https://owasp.org/Top10/2025/
- IETF OAuth WG: https://datatracker.ietf.org/wg/oauth/documents/ — OAuth 2.1 is still a draft (draft-16)
- CNCF blog: https://www.cncf.io/blog/ — how you'd have caught the Ingress-NGINX retirement

**Newsletters — two, not five:**
- The Pragmatic Engineer (Gergely Orosz) — market and craft, worth the paid tier once you're employed
- ByteByteGo — system design, and it maps directly onto P7.5

**Practitioners worth following** (verify handles yourself — social accounts move): Gergely Orosz, Simon Willison (best signal-to-noise on LLM tooling anywhere), Kelsey Hightower, Andy Pavlo (databases), Chip Huyen (AI engineering).

**Annual surveys, read in full once each:** Stack Overflow Developer Survey · DORA · JetBrains State of the Developer Ecosystem · State of JS · Grafana Observability Survey. Read them for *direction*, and re-derive any number before you quote it — Part A found ~22 statistics in your syllabus that trace to nothing.

## D2. The re-verification prompt

Paste this at the **start of every phase** (9 times over 14 months, ~30 minutes each). Fill in the two brackets.

```
You are doing a currency check, not a tutorial. Today's date is [DATE].
Your training data is stale — verify everything against primary sources
(official release pages, GitHub releases, package registries, standards
bodies). Do not answer from memory. If you cannot verify something from a
primary source, say "unverified" — never guess or infer from a blog.

I am about to start a learning phase covering exactly these topics:
[PASTE THE PHASE'S TOPIC COLUMN AND THE TOOLS NAMED IN ITS PROJECT SPECS]

My plan was last verified on 2026-09-06. For each topic, tell me:

1. Latest stable version + release date. Flag if a MAJOR shipped since
   2026-09-06.
2. Health: thriving / maintenance / deprecated / never shipped. Check the
   last release date — a project with no release in 6+ months is a signal
   regardless of stars.
3. Has anything here been RETIRED or REPLACED by an industry-standard
   successor since 2026-09-06? Name the successor. (Precedent: Ingress-NGINX
   was retired in March 2026 and most curricula still teach it.)
4. For any spec or standard listed: has the revision changed? Which features
   were deprecated? (Precedent: MCP 2026-07-28 deprecated Roots, Sampling
   and Logging.)
5. For any hosted service or free tier listed: are the limits still what my
   plan says? Read the official pricing page, not a comparison article.
6. Any security advisory, licence change, or EOL date I should know about
   for these specific tools.

Output a table: Topic | My plan says | Actual (date) | Changed? | What I
should do. Then a short list headed "REDO", "ADJUST", or "NOTE ONLY" using
this rule: REDO if a project I already shipped now demonstrates a dead or
insecure pattern; ADJUST if a version bump changes the API I'd write;
NOTE ONLY otherwise.

Finish with one line: "Nothing else material changed" — or say what did.
```

## D3. When a change matters enough to redo work

| Signal | Action | Why |
|---|---|---|
| A shipped project demonstrates a **retired** technology (Ingress-NGINX, MCP Sampling, `middleware.ts`) | **REDO** — or add a dated banner: *"Built on X; X was retired in [date]; here's what I'd use now and why."* | The banner is often the better move. It proves you track your own work's currency, which is rarer than being current |
| A shipped project demonstrates an **insecure** pattern (a removed OAuth grant, a broken crypto default, a CVE'd dependency) | **REDO immediately** | A reviewer who spots it assumes you don't know. Non-negotiable |
| A **major version** changed the API you'd write today (React Router 7→8, NestJS 11→12, Crossplane v1→v2) | **ADJUST** — bump it the next time you touch the repo, note it in the README | Cheap to fix, and stale deps read as an abandoned repo |
| A **minor/patch** bump, or a benchmark you cited moved | **NOTE ONLY** | Chasing these is how the plan dies |
| A **statistic** you quoted turned out to be unsourced | **REMOVE IT** | Part A found 22 of these in your own syllabus. An interviewer who checks one and finds nothing discounts everything else you said |
| A **free tier** you depend on shrank or died | **ADJUST within a week** | A portfolio link that 404s is worse than no link. Set a quarterly calendar reminder to click every live URL you've published |

**The meta-rule:** *redo when a repo would actively mislead a reader; note when it's merely dated.* A README that says "this was correct in March 2027, here's what changed since" is stronger than a silently-updated one — it shows the currency habit itself, which is the actual durable skill.

---

