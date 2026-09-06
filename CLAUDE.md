@AGENTS.md

Skills are in `.agents/skills/` (`week-check`, `verify-phase`, `ship-project`).
`.claude/skills` is a symlink to that folder — that symlink is what puts them in your catalog,
so do not "tidy" it away. If they are still not in your catalog, read those `SKILL.md` files
when those loops are requested.
Slash commands `/week`, `/verify`, `/ship` in `.claude/commands/` point at the same files.
