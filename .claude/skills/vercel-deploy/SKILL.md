---
name: vercel-deploy
description: Use the Vercel connector for deploying and debugging web projects — listing deployments, reading build/runtime logs, checking domains, and deploying client sites or portals hosted on Vercel. Use whenever the user mentions Vercel, a failed deploy, build logs, or hosting a new project.
---

# Vercel for Saspire deployments

## Context

saspire.org itself deploys via GitHub Pages (see github-workflow skill), but
client projects — webshops, customer portals, prototypes — can run on Vercel.

## Key tools (Vercel MCP connector)

- **Projects**: `list_teams`, `list_projects`, `get_project`
- **Deployments**: `list_deployments`, `get_deployment`, `deploy_to_vercel`
- **Debugging**: `get_deployment_build_logs`, `get_runtime_logs`,
  `get_runtime_errors`, `get_access_to_vercel_url`, `web_fetch_vercel_url`
- **Domains**: `check_domain_availability_and_price`
- **Docs**: `search_vercel_documentation`

## Workflows

### "Why did the deploy fail?"
1. `list_deployments` for the project → find the failed one.
2. `get_deployment_build_logs` → identify the error (usually build script or
   missing env var).
3. Fix in the repo, push, verify the new deployment goes green.

### Check a live client site for errors
1. `get_runtime_errors` / `get_runtime_logs` for the production deployment.
2. Correlate spikes with recent deployments (`list_deployments` timestamps).

### New client project / preview
1. `deploy_to_vercel` for a quick deploy; share the preview URL with the client.
2. For a custom domain, `check_domain_availability_and_price` first.

## Rules

- Always distinguish preview vs production deployments when reporting status.
- Never roll back or redeploy production without confirmation.
- Runtime logs can contain end-user data — summarize, don't paste wholesale.
