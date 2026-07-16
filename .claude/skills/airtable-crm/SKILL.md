---
name: airtable-crm
description: Use the Airtable connector for structured business data — CRM, lead pipelines, project trackers, and client databases. Use whenever the user mentions Airtable, a base, tracking leads/projects/clients in tables, or wants a lightweight database.
---

# Airtable for Saspire CRM and project tracking

## Key tools (Airtable MCP connector)

Follow this discovery order — Airtable operates on internal IDs, never names:

1. `search_bases` / `list_bases` → find the base, get its ID
2. `list_tables_for_base(baseId)` → table IDs and field IDs
3. `get_table_schema(baseId, tables)` → **required** before filtering on
   single/multi-select fields (gets choice IDs)
4. `list_records_for_table` / `search_records` → the data

- **Write**: `create_records_for_table`, `update_records_for_table`,
  `delete_records_for_table`, `create_table`, `create_field`, `create_base`
- **Comments**: `list_record_comments`, `create_record_comment`
- **Interfaces**: `list_pages_for_base`, `list_records_for_page`,
  `get_record_for_page` — use these when a base has interface-only access
  (permissionLevel "none"); table tools will fail there
- **Undo**: `revert_action` — if a write went wrong, revert it

## Workflows

### Pipeline review ("where are my leads?")
1. Resolve the CRM base and leads table (steps 1–3 above).
2. `list_records_for_table` filtered by stage; summarize per stage with next
   actions and stale leads (no activity > 2 weeks).

### Log a new lead/client
1. `get_table_schema` first — match the existing fields and select options
   exactly; don't invent new option values without asking.
2. `create_records_for_table`.

### New tracker for a project
1. `create_table` in the existing projects base (prefer one base, many tables).
2. Fields: Name, Status (select), Client (link/text), Deadline (date), Notes.

## Rules

- Always operate on IDs (`app…`, `tbl…`, `fld…`, `rec…`), never display names.
- Read the schema before writing; respect existing select options.
- Bulk deletes need explicit confirmation — `revert_action` exists but don't
  rely on it.
