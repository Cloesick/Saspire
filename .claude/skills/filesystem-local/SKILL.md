---
name: filesystem-local
description: Use the Filesystem desktop extension to read, write, search, and organize files on the local machine — project folders, client deliverables, downloads, exports. Use whenever the user references a local file or folder path, or asks to save/organize something on their computer.
---

# Local filesystem access (Claude Desktop extension)

## Key tools (official Filesystem extension)

- **Read**: `read_file` / `read_text_file`, `read_multiple_files`
- **Browse**: `list_directory`, `directory_tree`, `search_files`
- **Write**: `write_file`, `edit_file`, `create_directory`
- **Manage**: `move_file`, `get_file_info`, `list_allowed_directories`

## Workflows

### Find something
1. `list_allowed_directories` if unsure what's accessible.
2. `search_files` by name pattern; `directory_tree` for structure overview.

### Client deliverable handling
- Save generated documents into a per-client folder structure, e.g.
  `Clients/<Name>/<Project>/…` — create it with `create_directory` if missing.

### Safe editing
1. `read_file` first — never edit blind.
2. `edit_file` for targeted changes; `write_file` only for new files or
   explicit full rewrites.

## Rules

- Access is limited to configured directories; if a path is denied, say which
  directories ARE allowed rather than failing silently.
- Never overwrite a file you haven't read in this conversation.
- Moves/renames of folders with many files: list what will move and confirm.
- Note for setup: only ONE filesystem server should be enabled in Claude
  Desktop (the official extension) — a duplicate custom `filesystem` entry
  causes spawn-queue timeouts (see MCP-TROUBLESHOOTING.md).
