---
name: aws-api
description: Use the AWS API MCP server (desktop) to run AWS CLI operations from chat — inspecting S3, EC2, Lambda, IAM, billing, and any other AWS service. Use whenever the user asks about their AWS account, cloud resources, or costs.
---

# AWS API access for Saspire

## Key tools (awslabs aws-api-mcp-server)

- `suggest_aws_commands` — describe the goal in plain language, get candidate
  CLI commands. Use this first when unsure of the exact command.
- `call_aws` — execute an AWS CLI command (e.g. `aws s3 ls`,
  `aws ce get-cost-and-usage …`)

## Workflows

### "What's running / what does it cost?"
1. `call_aws` with read-only commands: `aws s3 ls`,
   `aws ec2 describe-instances`, `aws lambda list-functions`.
2. Costs: `aws ce get-cost-and-usage` grouped by service for the current month.
3. Summarize per project/client; flag idle resources burning money.

### Client asset hosting (S3)
- Buckets for catalog images/static assets: create, set lifecycle rules, check
  public-access blocks are ON unless the bucket intentionally serves a site.

## Rules

- **Default to read-only.** `describe-*`, `list-*`, `get-*` are safe; any
  mutating command (create/put/delete/terminate/update) needs explicit
  confirmation, stated as the exact CLI command about to run.
- Never touch IAM (users, roles, policies) without confirmation — mistakes
  lock people out or open security holes.
- EU region first: default to `eu-west-1`/`eu-central-1` for client data
  (GDPR residency).
- If credentials are missing/expired, say so — don't retry blindly.
