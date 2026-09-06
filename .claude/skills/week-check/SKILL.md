---
name: week-check
description: Report where Bhavin is in the sixty-week roadmap — current week and phase, what is due, which projects are outstanding, and whether the current phase's verification has gone stale. Use when he says "where am I", "what's this week", "week check", "am I behind", "status", or opens the repo after a gap.
---

# Week check

## Do this

1. `python3 scripts/status.py` — it computes the current week from today's real date and reads
   `data/plan.json`, `progress/weeks.md` and the `verified/` folders.
2. Read the current phase's `README.md` for the exit criterion.
3. Skim `progress/projects.md` for anything marked 🔨 that has been in progress a while.

## Report, in this order

1. **Week N of 60**, phase name, and this week's focus in one line.
2. **What ships this week**, if anything, with its deploy target.
3. **Calendar vs actual.** If ticked weeks in `progress/weeks.md` lag the calendar week, say by
   how much — plainly, without editorialising. Five weeks (15, 26, 33, 43, 60) are buffers and
   being behind going *into* one is normal.
4. **Verification age.** If the current phase's newest `verified/` file is over 60 days old, or
   the folder is empty, say so and offer to run `verify-phase`. This is the most important line
   in the report.
5. **One thing worth doing next.** Not a plan — one concrete next action.

## Rules

- **Never tick a week or mark a project shipped on his behalf.** Suggest it; he ticks it. The
  timestamps in git are only useful if they are honest.
- If he is far behind, do not restructure the plan unprompted. `plan/03-reality-check.md` already
  says what to cut first (P7.3 `raftlet`, then the stretch goals) — point at that instead.
- Being behind in month 7 is the single most predicted event in this plan. If it happens around
  weeks 26–30, say so and point him at the month-7 wall section in `plan/03-reality-check.md`.
