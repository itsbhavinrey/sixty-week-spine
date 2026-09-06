# Phase 3 — Auth and the security baseline

**Last verified: 2026-09-06** (baseline) · [`verified/`](verified/)

**Weeks 16–20** · 2026-12-21 → 2027-01-24 · 75 hours

## Theme

The one area where a wrong AI-generated snippet costs you the job rather than a review comment.

## Exit criterion

> You can implement password + session auth, a complete OAuth 2.1 + PKCE flow, and a passkey ceremony from scratch - and given any bug, name its OWASP Top 10 category.

You may move on when this is true without looking anything up. Not when the weeks are used up.

## Weeks

| Week | Starts | Focus | Ships |
|---|---|---|---|
| 16 | 2026-12-21 | argon2id, sessions vs JWT, httpOnly cookies (holiday week - reduced) | P3.1 |
| 17 | 2026-12-28 | OAuth 2.1 + PKCE, exact redirect matching | — |
| 18 | 2027-01-04 | OIDC, refresh rotation, RS256/EdDSA | P3.2 |
| 19 | 2027-01-11 | WebAuthn, passkeys | P3.3 |
| 20 | 2027-01-18 | OWASP Top 10, API Top 10, RBAC | P3.4 |

## Projects

### P3.1 — `authlab`

> Three ways to keep a user logged in, one of them deliberately broken, and a page that shows you exactly how it breaks.

- **Deploy target:** Cloudflare Workers + Neon
- **Difficulty:** Medium
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P3.1`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P3.2 — `oauth-from-scratch`

> A working OAuth 2.1 authorization server and client, built from the spec rather than from a library.

- **Deploy target:** Cloudflare Workers + Neon
- **Difficulty:** High
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P3.2`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P3.3 — `passkey-drill`

> Passkey registration and authentication, ceremony by ceremony, with the fallback flow nobody builds.

- **Deploy target:** Cloudflare Workers + Neon
- **Difficulty:** Medium
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P3.3`
- **Status:** ⬜ not started

**Ship checklist**

- [ ] Public GitHub repo created from `templates/PROJECT_README.md`
- [ ] Scope matches the spec — nothing from "out of scope" crept in
- [ ] Deployed to a live URL **or** `make demo` + asciinema recording
- [ ] README has all six required sections
- [ ] Linked in `progress/projects.md`
### P3.4 — `driftwatch` · driftwatch layer 4

> Multi-tenant driftwatch with passkeys, API keys and roles - plus a written threat model that names its own weaknesses.

- **Deploy target:** Cloudflare Workers + Neon
- **Difficulty:** Medium
- **Full spec:** [`plan/01-roadmap.md`](../../plan/01-roadmap.md) → search `P3.4`
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
Verify phase 3
```

That writes a dated audit into [`verified/`](verified/) and diffs it against the last one.
The topics it checks are in [`topics.md`](topics.md). **Do not start the projects above
until the current verification is less than 60 days old** — the whole point of this repo is
that the plan was accurate on 2026-09-06 and will not stay that way.

## Verification history

Files in [`verified/`](verified/), newest last. `git log -p phases/phase-3/verified/` shows
what moved between them.
