---
name: cloudflare-platform
description: Use the Cloudflare connector for edge infrastructure — Workers, KV, R2 storage, D1 databases, and Cloudflare docs lookups. Use whenever the user mentions Cloudflare, DNS/CDN behavior, serverless functions at the edge, or object storage for client projects.
---

# Cloudflare Developer Platform for Saspire

## Key tools (Cloudflare MCP connector)

- **Workers**: `workers_list`, `workers_get_worker`, `workers_get_worker_code`
- **KV (key-value config/cache)**: `kv_namespaces_list`, `kv_namespace_create`,
  `kv_namespace_get`, `kv_namespace_update`, `kv_namespace_delete`
- **R2 (object storage)**: `r2_buckets_list`, `r2_bucket_create`,
  `r2_bucket_get`, `r2_bucket_delete`
- **D1 (SQLite at the edge)**: `d1_databases_list`, `d1_database_create`,
  `d1_database_get`, `d1_database_query`, `d1_database_delete`
- **Hyperdrive (Postgres acceleration)**: `hyperdrive_configs_list`,
  `hyperdrive_config_get`, `hyperdrive_config_edit`
- **Docs**: `search_cloudflare_documentation` — use this before answering any
  Cloudflare-specific question from memory
- **Migration**: `migrate_pages_to_workers_guide` when moving a Pages project
  to Workers

## Workflows

### Audit what's running
1. `workers_list`, `kv_namespaces_list`, `r2_buckets_list`, `d1_databases_list`.
2. Map each resource to the client/project it serves; flag orphans.

### Client portal backend at the edge
1. D1 for relational data (`d1_database_create`, then `d1_database_query`).
2. KV for sessions/config; R2 for uploaded files (catalog images, PDFs).
3. Check patterns via `search_cloudflare_documentation` before building.

### Inspect an existing Worker
1. `workers_get_worker` for metadata, `workers_get_worker_code` for source.

## Rules

- `d1_database_query` runs real SQL on live data — SELECT freely, but get
  confirmation before UPDATE/DELETE/DROP.
- Deleting KV namespaces, R2 buckets, or D1 databases is destructive and
  usually irreversible — always confirm first, and name the resource explicitly.
- Verify platform limits/features against `search_cloudflare_documentation`
  rather than memory; the platform changes fast.
