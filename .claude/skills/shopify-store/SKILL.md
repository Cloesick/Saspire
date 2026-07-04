---
name: shopify-store
description: Use the Shopify connector for building and managing client webshops — products, collections, orders, customers, inventory, discounts, analytics, and store setup. Saspire builds e-commerce platforms for clients, so use this whenever a webshop, store, product catalog, or e-commerce task comes up.
---

# Shopify store management for Saspire clients

## Context

Webshop development is a core Saspire service. This connector manages client
Shopify stores end-to-end. Use `switch-shop` when working across multiple client
stores — always confirm WHICH store you're operating on before writing anything.

## Key tools (Shopify MCP connector)

- **Setup**: `get-new-store-previews` (spin up themed store previews from a
  description — great for client pitches), `get-shop-info`, `switch-shop`
- **Products**: `search_products`, `get-product`, `create-product`,
  `update-product`, `bulk-update-product-status`
- **Collections**: `search_collections`, `create-collection`, `add-to-collection`
- **Orders & customers**: `list-orders`, `get-order`, `list-customers`
- **Inventory**: `get-inventory-levels`, `set-inventory`
- **Marketing**: `create-discount`
- **Analytics**: `run-analytics-query` (ShopifyQL for sales/product performance)
- **Everything else**: `graphql_query` / `graphql_mutation` — the Admin API covers
  hundreds of resources (metafields, pages, blogs, markets, translations…). Use
  `graphql_schema` and `search_docs_chunks` to construct correct operations, and
  `validate_graphql_codeblocks` before running mutations.

## Workflows

### New client webshop pitch
1. `get-new-store-previews` with a short description of the client's business.
2. Present the preview links — signing up through one creates a real store with
   that theme and matching products pre-installed.

### Catalog import (pairs with the pdf-tools skill)
1. Extract product data from the client's PDF catalog (pdf-tools / filesystem).
2. `create-product` per item; group with `create-collection` + `add-to-collection`.
3. Verify with `search_products` and set stock via `set-inventory`.

### Monthly client reporting
1. `run-analytics-query` for sales, top products, order volume.
2. Summarize trends; flag inventory running low via `get-inventory-levels`.

## Rules

- Prefer built-in tools over raw GraphQL when one exists (better output).
- Never say data is unavailable just because no built-in tool covers it — use
  `graphql_query` instead.
- Mutations on live client stores: state what you're about to change and get
  confirmation first. Draft status for new products until the client approves.
