---
name: sequential-thinking
description: Use the sequential-thinking MCP server (desktop) for complex problems that benefit from explicit step-by-step reasoning with revision — architecture decisions, tricky debugging, multi-constraint planning, pricing/proposal structuring. Use when a problem has many interacting parts or the first answer is likely wrong.
---

# Sequential thinking for complex problems

## What it does

The `sequentialthinking` tool structures reasoning into numbered thoughts that
can be revised, branched, and extended as understanding grows — instead of
committing to the first chain of reasoning.

## When to reach for it

- Architecture choices with trade-offs (e.g. Shopify vs custom webshop vs
  headless for a specific client)
- Debugging where the obvious cause was already ruled out
- Project planning with dependencies (catalog digitalization → data model →
  webshop → launch)
- Proposal/pricing structuring with multiple constraints

## How to use it well

1. Start with an estimate of total thoughts, but adjust freely — it's fine to
   extend or cut.
2. One idea per thought; make assumptions explicit so they can be revised.
3. Use revision when new information contradicts an earlier thought — don't
   silently continue on a broken premise.
4. Branch when two approaches both look viable; compare end states before
   choosing.
5. End with a clear conclusion thought summarizing the decision and its
   biggest risk.

## Rules

- Don't use it for simple questions — it adds latency and noise.
- The thinking trace is scaffolding; the final answer to the user should be
  the polished conclusion, not the raw thoughts.
