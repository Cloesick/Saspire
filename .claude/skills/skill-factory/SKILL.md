---
name: skill-factory
description: Use the skill-factory MCP server (desktop) — or follow this guide manually — to author new Claude skills. Use when the user wants to create, improve, or package a skill for a workflow they repeat often.
---

# Authoring new skills (skill-factory)

## What a skill is

A folder containing `SKILL.md` with YAML frontmatter (`name`, `description`)
and a markdown body of instructions. The `description` is what Claude reads to
decide whether to load the skill — it must state WHEN to use it, with trigger
words, not just what it does. Optional extra files (references, scripts,
templates) sit next to SKILL.md and are loaded on demand.

## Recipe for a good skill

1. **Pick a repeated workflow** — a skill for something done once is overhead.
2. **Frontmatter description**: one or two sentences, third person, packed with
   triggers: "Use when the user mentions X, Y, or asks to Z."
3. **Body structure** that works:
   - Context (business specifics the model can't guess)
   - Key tools (exact tool names for the integration)
   - Workflows (numbered steps for the 2–3 most common tasks)
   - Rules (confirmations required, gotchas, safety limits)
4. **Keep SKILL.md under ~150 lines**; push long reference material into
   separate files in the folder.
5. **Test it**: start a fresh conversation, phrase the task the way you
   naturally would, and check the skill loads and the steps work.

## Where skills live for Saspire

- Repo: `.claude/skills/<skill-name>/SKILL.md` — auto-loaded by Claude Code
  sessions in the Saspire repo.
- Claude Desktop / claude.ai: zip the skill folder, upload under
  Settings → Capabilities → Skills.

## Rules

- One skill = one domain. Split a skill that tries to cover two integrations.
- Never put credentials in a skill; reference where auth is configured instead.
- Update the skill index in `.claude/README.md` when adding a skill to this repo.
