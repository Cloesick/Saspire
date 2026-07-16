---
name: basic-memory
description: Use the basic-memory MCP server (desktop) to persist knowledge across conversations — client facts, project decisions, preferences, meeting notes. Use when the user says "remember this", asks "what do we know about X", or when context from past sessions would clearly help.
---

# Persistent memory across chats (basic-memory)

## Key tools (basic-memory MCP server)

- `write_note` — save a note (markdown, with title + folder + tags)
- `read_note` / `view_note` — retrieve a specific note
- `search_notes` — full-text search across the knowledge base
- `recent_activity` — what was recorded lately
- `build_context` — load related notes into the conversation
- `edit_note` / `move_note` / `delete_note` — maintenance

## Conventions for Saspire's knowledge base

Organize notes by folder:

- `clients/<name>` — stack, contacts, preferences, history, quirks
- `projects/<name>` — decisions, status, blockers, next steps
- `business/` — pricing rules, standard offerings, processes
- `meetings/` — dated meeting notes with action items

## Workflows

### Start of a client conversation
1. `search_notes` on the client/project name; `build_context` to load matches.
2. Proceed with full history instead of asking the user to re-explain.

### End of a substantive session
1. Offer to save: decisions made, new client facts, action items.
2. `write_note` into the right folder; link related notes with `[[wiki-links]]`
   so the knowledge graph connects.

### "What did we decide about X?"
1. `search_notes` → `read_note` → answer with the note's date, since decisions
   go stale.

## Rules

- Record facts and decisions, not transcripts — short, structured, dated.
- Update existing notes (`edit_note`) rather than creating near-duplicates.
- Don't store secrets (passwords, API keys, payment data) in notes.
