---
name: ship-project
description: Scaffold a new project repo from the roadmap's template, or check a nearly-finished project against its spec before it ships. Use when Bhavin says "start P3.2", "scaffold the next project", "is this ready to ship", "review my README", or names a project ID from the plan.
---

# Ship a project

## Starting one

1. Find the project's full spec in `plan/01-roadmap.md` (search its ID, e.g. `P3.2`).
2. Read the phase README's ship checklist for it.
3. Scaffold from `templates/PROJECT_README.md`. Fill in the pitch verbatim from the spec — it is
   also the GitHub repo description, so it should read as one line.
4. Create `docs/adr/0001-*.md` from `templates/ADR.md` for the first real decision.
5. **Repeat the "out of scope" list back to him before he writes any code.** Gold-plating is how
   a 10-hour project becomes a 30-hour one, and every spec has an explicit out-of-scope list for
   exactly this reason.

## Checking one before it ships

Work through the spec, not your own opinion of what would be nice:

- [ ] **Scope** — does it do what the spec says, and *nothing* from the out-of-scope list?
- [ ] **Proof** — a live URL, or `make demo` + an asciinema cast / GIF. A repo with neither has
      not shipped. Four projects are intentionally demo-only; check which kind this is.
- [ ] **README, all six sections** — pitch + live link above the fold · a GIF or screenshot of it
      doing something · architecture diagram · **why this design** (three decisions and their
      alternatives) · **numbers** · **where it fails**.
- [ ] **Versions pinned and current** — every dependency's version stated, and none of them
      contradicting the phase's latest `verified/` file.
- [ ] **The 60-second test** — could a stranger tell what this is, that it works, and that you
      understood the trade-offs, in under a minute? Read it as that stranger and say honestly
      whether it passes.
- [ ] `progress/projects.md` updated with the live URL.

## The sections most people skip

**Why this design**, **numbers** and **where it fails** are what separate this portfolio from a
bootcamp one. Most candidates ship the pitch, the GIF and the diagram and stop. If a project is
missing those three, it is not ready, however good the code is — say so directly.

## Do not

- Do not add features that are not in the spec, even good ones. Write them down as a stretch goal
  in the README instead.
- Do not let a project run past 12 hours without saying so. The 2-hour rule in
  `plan/01-roadmap.md` applies: ship it broken behind a flag and move on rather than losing a
  week to one bug.
