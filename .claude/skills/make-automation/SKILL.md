---
name: make-automation
description: Use the Make (Integromat) connector to build and manage automation scenarios connecting Saspire's tools — e.g. form submissions to CRM, order notifications, invoice flows. Use whenever the user mentions Make, an automation, a scenario, a webhook, or "when X happens do Y" across apps.
---

# Make automation for Saspire

## Key tools (Make MCP connector — large surface, most used first)

- **Scenarios**: `scenarios_list`, `scenarios_get`, `scenarios_create`,
  `scenarios_update`, `scenarios_run`, `scenarios_activate` / `scenarios_deactivate`
- **Debugging**: `executions_list`, `executions_get`, `executions_get-detail`
- **Discovery**: `apps_list`, `apps_recommend`, `app-modules_list`,
  `app_documentation_get`
- **Connections (app auth)**: `connections_list`, `connections_get`,
  `credential-requests_create` (ask the user to authorize new apps)
- **Webhooks**: `hooks_list`, `hooks_create`, `hooks_get`, `hooks_update`
- **Data stores**: `data-stores_list`, `data-store-records_list/create/update`
- **Validation**: `validate_blueprint_schema`, `validate_scenario_interface`,
  `validate_scheduling_schema` — validate before saving scenario changes
- **Org/teams**: `organizations_list`, `teams_list`, `users_me`

## Workflows

### "Why didn't my automation run?"
1. `scenarios_list` → find it; check it's active.
2. `executions_list` → recent runs; `executions_get-detail` on the failure.
3. Common causes: expired connection (`connections_list` shows status),
   changed source schema, rate limits.

### Build a new automation
1. Clarify trigger → steps → output (e.g. "Formspree webhook → create Airtable
   lead → Gmail notification").
2. `apps_recommend` / `app-modules_list` to pick modules.
3. `scenarios_create` with the blueprint; `validate_blueprint_schema` first.
4. `scenarios_run` once as a test, verify via `executions_get`, then
   `scenarios_activate`.

## Rules

- Test-run before activating; check the execution detail, not just "it ran".
- Deactivating or deleting a live scenario can silently break client-facing
  flows — confirm first.
- Scenario operations consume Make credits; avoid tight scheduling intervals
  unless asked.
