---
name: revolut-x
description: Use the Revolut X MCP server (desktop) for crypto exchange data — balances, market prices, and order history. Use when the user asks about their Revolut X account, crypto prices, or portfolio. Trading actions require explicit confirmation every time.
---

# Revolut X crypto exchange

## Capabilities (Revolut X MCP server)

- Market data: prices, pairs, order books
- Account: balances, open orders, order history
- Trading: place/cancel orders — **treat as high-risk actions**

## Workflows

### Portfolio check
1. Fetch balances and current market prices.
2. Report holdings with current value and 24h movement. State the timestamp —
   crypto prices go stale in minutes.

### Market question
1. Pull live data for the pair; never answer price questions from memory.

## Rules — read before any trading action

- **Never place, modify, or cancel an order without explicit confirmation of
  the exact order** (pair, side, amount, price/type) in the same conversation.
- No investment advice: report data and mechanics; decisions are the user's.
- Real money: double-check units (BTC vs EUR amounts) before any order call —
  unit confusion is the classic catastrophic error.
- If the API returns errors or partial data, stop and report rather than
  retrying trades.
