---
name: google-drive
description: Use the Google Drive connector to find, read, and create documents — client proposals, contracts, briefs, spreadsheets, and shared assets. Use whenever the user mentions a doc, sheet, file "in Drive", or asks to look something up in their documents.
---

# Google Drive for Saspire documents

## Key tools (Google Drive MCP connector)

- **Find**: `search_files` (by name/content), `list_recent_files`
- **Read**: `read_file_content`, `download_file_content`, `get_file_metadata`
- **Write**: `create_file`, `copy_file`
- **Access**: `get_file_permissions` (check sharing before referencing a doc
  externally)

## Workflows

### Find and summarize a client document
1. `search_files` with client or project name; fall back to `list_recent_files`
   if the name is fuzzy.
2. `read_file_content` and summarize — deliverables, dates, amounts, open items.

### New proposal from a template
1. `search_files` for the existing proposal template.
2. `copy_file` to create the client-specific version (keeps template intact).
3. Report the new file's link; content editing happens in Docs.

### Pre-meeting prep
1. `list_recent_files` + `search_files` on the client name.
2. Compile a brief: latest proposal state, open contract, recent notes.

## Rules

- Copy templates rather than editing them in place.
- Check `get_file_permissions` before sharing a link with a client — internal
  costing sheets must never be exposed.
- Client documents may be in French, Dutch, or English; summarize in the
  language the user is working in.
