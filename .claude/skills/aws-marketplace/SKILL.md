---
name: aws-marketplace
description: Use the AWS Marketplace connector to research SaaS and cloud solutions — comparing vendors, evaluating tools for client digitalization projects, and producing solution recommendations. Use when the user asks "what tool exists for X" in the AWS ecosystem or needs vendor comparisons.
---

# AWS Marketplace research for Saspire

## Key tools (AWS Marketplace MCP connector)

- `search_aws_marketplace_solutions` — find solutions by keyword/category
- `get_aws_marketplace_solution` — details on one listing
- `get_aws_marketplace_related_solutions` — alternatives and complements
- `research_aws_marketplace_solution` — deeper research on a candidate
- `get_aws_marketplace_report_guidelines` — follow these when producing a
  comparison report

## Workflow: evaluate tooling for a client project

1. `search_aws_marketplace_solutions` with the client's need (e.g. "PIM",
   "e-commerce search", "document OCR").
2. Shortlist 3–5; `get_aws_marketplace_solution` on each.
3. `get_aws_marketplace_related_solutions` to make sure nothing obvious is missed.
4. Compare on: pricing model, EU data residency, integration effort, support.
5. Write the recommendation following `get_aws_marketplace_report_guidelines`.

## Rules

- Saspire's clients are EU-based (Belgium) — always check GDPR/data-residency
  posture when recommending a solution.
- Marketplace listings are vendor-written — treat claims as marketing, verify
  the critical ones.
- Present costs in the listing's currency and note if pricing is usage-based.
