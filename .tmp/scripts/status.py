#!/usr/bin/env python3
"""Where am I in the sixty-week spine? Reads data/plan.json and the repo's own state.

Usage:  python3 scripts/status.py
No dependencies beyond the standard library.
"""
import json, os, re, sys
from datetime import date, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = json.load(open(os.path.join(ROOT, "data", "plan.json")))
TODAY = date.today()
START = date.fromisoformat(P["start"])
END = date.fromisoformat(P["end"])
STALE_DAYS = 60

C = {"b": "\033[1m", "d": "\033[2m", "g": "\033[32m", "y": "\033[33m",
     "r": "\033[31m", "c": "\033[36m", "x": "\033[0m"}
if not sys.stdout.isatty() or os.environ.get("NO_COLOR"):
    C = {k: "" for k in C}


def current_week():
    if TODAY < START:
        return 0
    n = (TODAY - START).days // 7 + 1
    return min(n, 60)


def ticked_weeks():
    p = os.path.join(ROOT, "progress", "weeks.md")
    if not os.path.exists(p):
        return set()
    return {int(m) for m in re.findall(r"- \[x\] \*\*W(\d{2})\*\*", open(p).read(), re.I)}


def newest_verification(phase):
    d = os.path.join(ROOT, "phases", f"phase-{phase}", "verified")
    if not os.path.isdir(d):
        return None
    dates = []
    for f in os.listdir(d):
        m = re.match(r"(\d{4}-\d{2}-\d{2})", f)
        if m:
            try:
                dates.append(date.fromisoformat(m.group(1)))
            except ValueError:
                pass
    return max(dates) if dates else None


def bar(done, total, width=44):
    fill = int(round(width * done / total)) if total else 0
    return "█" * fill + "·" * (width - fill)


def main():
    wk = current_week()
    ticks = ticked_weeks()

    print(f'\n{C["b"]}{P["title"]}{C["x"]}  {C["d"]}{P["start"]} → {P["end"]}{C["x"]}')

    if wk == 0:
        d = (START - TODAY).days
        print(f'\n  Starts in {C["b"]}{d} day{"s" if d != 1 else ""}{C["x"]} '
              f'({START.strftime("%a %d %b %Y")}).')
        print(f'  {C["d"]}Run the phase 0 verification before day one — the plan\'s baseline '
              f'is {P["baseline_verified"]}.{C["x"]}\n')
        return
    if TODAY > END:
        print(f'\n  Plan window closed {(TODAY - END).days} days ago. '
              f'{len(ticks)}/60 weeks ticked.\n')
        return

    week = next(w for w in P["weeks"] if w["n"] == wk)
    ph = P["phases"][week["phase"]]

    print(f'\n  {C["c"]}Week {wk} of 60{C["x"]}   {bar(wk, 60)}   '
          f'{C["d"]}{wk * P["hours_per_week"]} of {P["total_hours"]} hrs{C["x"]}')
    print(f'\n  {C["b"]}Phase {ph["id"]} — {ph["name"]}{C["x"]}  '
          f'{C["d"]}weeks {ph["weeks"][0]}–{ph["weeks"][1]} · '
          f'{ph["start"]} → {ph["end"]}{C["x"]}')
    print(f'  {C["d"]}Exit:{C["x"]} {ph["exit"]}')

    print(f'\n  {C["b"]}This week{C["x"]} ({week["start"]})')
    print(f'    {week["focus"]}')
    if week["ship"]:
        pr = next((p for p in ph["projects"] if p["id"] == week["ship"]), None)
        if pr:
            print(f'    {C["g"]}Ships:{C["x"]} {pr["id"]} `{pr["repo"]}` → {pr["deploy"]}')
    else:
        print(f'    {C["d"]}Nothing ships this week.{C["x"]}')

    # pace
    behind = wk - len(ticks)
    if not ticks:
        pace = f'{C["d"]}No weeks ticked yet in progress/weeks.md.{C["x"]}'
    elif behind <= 0:
        pace = f'{C["g"]}On pace{C["x"]} — {len(ticks)} weeks ticked.'
    elif behind <= 2:
        pace = f'{C["y"]}{behind} week{"s" if behind > 1 else ""} behind{C["x"]} — normal. Buffers absorb this.'
    else:
        pace = (f'{C["r"]}{behind} weeks behind.{C["x"]} See plan/03-reality-check.md — '
                f'cut P7.3 raftlet and the stretch goals before compressing anything.')
    print(f'\n  {C["b"]}Pace{C["x"]}\n    {pace}')

    # verification freshness
    print(f'\n  {C["b"]}Verification{C["x"]}')
    v = newest_verification(ph["id"])
    if v is None:
        print(f'    {C["r"]}Phase {ph["id"]} has never been verified.{C["x"]} '
              f'Baseline is {P["baseline_verified"]}.')
        print(f'    {C["d"]}Ask Claude: "Verify phase {ph["id"]}"{C["x"]}')
    else:
        age = (TODAY - v).days
        tone = C["r"] if age > STALE_DAYS else (C["y"] if age > STALE_DAYS * 0.6 else C["g"])
        print(f'    Phase {ph["id"]} last verified {tone}{v} ({age} days ago){C["x"]}')
        if age > STALE_DAYS:
            print(f'    {C["r"]}Stale.{C["x"]} Ask Claude: "Verify phase {ph["id"]}"')

    nxt = next((p for p in P["phases"] if p["weeks"][0] > wk), None)
    if nxt and (date.fromisoformat(nxt["start"]) - TODAY).days <= 21:
        d = (date.fromisoformat(nxt["start"]) - TODAY).days
        print(f'    {C["y"]}Phase {nxt["id"]} starts in {d} days{C["x"]} — verify it before then.')

    if wk in (26, 27, 28, 29, 30):
        print(f'\n  {C["y"]}The month-7 wall.{C["x"]} This is where these plans usually die — '
              f'not month 1.\n  {C["d"]}Read the mitigation in plan/03-reality-check.md.{C["x"]}')
    if wk >= 57:
        print(f'\n  {C["c"]}Applications should be going out.{C["x"]} '
              f'{C["d"]}The search averages 5–6 months. Do not wait to feel ready.{C["x"]}')
    print()


if __name__ == "__main__":
    main()
