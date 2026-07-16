---
name: github-workflow
description: Use the GitHub connector for anything involving Saspire repositories — viewing or creating pull requests, issues, branches, commits, file contents, CI runs, or deploying saspire.org via GitHub Pages. Use whenever the user mentions GitHub, a PR, an issue, CI, or pushing/deploying code.
---

# GitHub workflow for Saspire

## Context

- Main repo: `Cloesick/Saspire` — the saspire.org landing site.
- Deployment: **GitHub Pages serves the `main` branch**. Merging to `main` IS the
  deploy; there is no separate deploy step.
- Custom domain via `CNAME` file (`saspire.org`) — never delete or overwrite it.

## Key tools (GitHub MCP connector)

- Reading: `get_file_contents`, `list_commits`, `list_branches`, `search_code`,
  `pull_request_read`, `issue_read`, `list_pull_requests`, `list_issues`
- Writing: `create_branch`, `create_or_update_file`, `push_files`,
  `create_pull_request`, `update_pull_request`, `issue_write`, `add_issue_comment`
- CI: `actions_list`, `actions_get`, `get_job_logs`, `get_check_run`

## Workflows

### Make a site change
1. `create_branch` from `main` (never commit straight to `main` — it deploys live).
2. Edit with `create_or_update_file` / `push_files`.
3. `create_pull_request` as draft; describe the visual/functional change.
4. After review, merge → GitHub Pages redeploys automatically within ~1 minute.

### Investigate a problem
1. `list_commits` to see what changed recently.
2. `get_file_contents` on the suspect file at a specific ref to compare versions.

## Rules

- Search before creating: `search_issues` / `search_pull_requests` to avoid duplicates.
- Prefer `list_*` for browsing, `search_*` for targeted queries.
- Site is vanilla HTML/CSS/JS + Tailwind — keep changes framework-free.
- SEO matters: `index.html` head contains meta/OG/structured data — preserve it
  when editing.
