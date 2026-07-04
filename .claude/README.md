# Saspire Claude configuration

This folder holds Claude skills and docs for all of Saspire's integrations.

## Contents

- `MCP-TROUBLESHOOTING.md` — fix for the "UtilityProcess spawn timeout after
  5000ms" errors in Claude Desktop on Windows.
- `skills/` — one skill per integration. Each skill teaches Claude when and how
  to use that integration for Saspire's work (webshops, catalog digitalization,
  customer portals, client operations).

## How the skills load

- **Claude Code** (CLI, web, desktop app sessions in this repo): skills in
  `.claude/skills/` are picked up automatically — nothing to do.
- **Claude Desktop / claude.ai chats**: zip an individual skill folder (the
  folder containing `SKILL.md`) and upload it under
  **Settings → Capabilities → Skills**. Upload only the ones you use often.

## Skill index

| Skill | Integration | Use for |
|---|---|---|
| `github-workflow` | GitHub connector | Repos, PRs, issues, GitHub Pages deploys |
| `figma-design` | Figma connector | Design-to-code, screenshots, mockups |
| `shopify-store` | Shopify connector | Client webshop builds and management |
| `gmail` | Gmail connector | Client email search, drafts, labels |
| `google-calendar` | Google Calendar connector | Meetings, scheduling |
| `google-drive` | Google Drive connector | Client docs, proposals, assets |
| `airtable-crm` | Airtable connector | CRM, project tracking, client data |
| `vercel-deploy` | Vercel connector | Deployments, logs, project checks |
| `cloudflare-platform` | Cloudflare connector | DNS, Workers, Pages, caching |
| `docusign-contracts` | Docusign connector | Client contracts and signatures |
| `make-automation` | Make connector | Cross-app automation scenarios |
| `aws-marketplace` | AWS Marketplace connector | Researching SaaS/cloud solutions |
| `spotify` | Spotify connector | Playback and playlists |
| `tripadvisor-travel` | Tripadvisor connector | Business travel, hotels |
| `filesystem-local` | Filesystem (desktop) | Local file read/write/search |
| `pdf-tools` | PDF Tools (desktop) | Catalog digitalization: split, extract, fill, sign |
| `apify-scraping` | Apify (desktop) | Web scraping, competitor/product data |
| `aws-api` | AWS API MCP (desktop) | AWS CLI operations via chat |
| `react-spectrum-ui` | React Spectrum (desktop) | Adobe Spectrum UI components |
| `sequential-thinking` | sequential-thinking (desktop) | Structured step-by-step reasoning |
| `basic-memory` | basic-memory (desktop) | Persistent notes across chats |
| `skill-factory` | skill-factory (desktop) | Authoring new skills |
| `vibe-prospecting` | Vibe Prospecting (desktop) | Lead generation for the consultancy |
| `revolut-x` | Revolut X (desktop) | Crypto market data (trade with care) |
| `antigravity` | antigravity-mcp (desktop) | Custom server — fill in specifics |
