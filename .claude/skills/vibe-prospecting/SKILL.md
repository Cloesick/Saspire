---
name: vibe-prospecting
description: Use the Vibe Prospecting MCP server (desktop) for lead generation — finding and qualifying potential Saspire clients, enriching contact data, and building outreach lists. Use when the user mentions prospecting, leads, outreach, or finding new clients.
---

# Lead generation with Vibe Prospecting

## Context

Saspire's ideal prospects: Belgian/EU SMBs with outdated or missing web
presence — businesses with paper/PDF catalogs but no webshop, or no customer
portal. Services to pitch: webshop development, catalog digitalization,
customer portals.

## Workflows

### Build a qualified prospect list
1. Search by sector + region (e.g. wholesalers in Flanders, retailers in
   Brussels).
2. Qualify against the ideal profile: has products to sell online? existing
   site quality? catalog in PDF form?
3. Enrich: decision-maker contact, company size, language (FR/NL/EN).
4. Output a structured list → store in the CRM (airtable-crm skill) rather
   than loose files.

### Prepare outreach
1. Per prospect, note the concrete hook ("your catalog is a 40-page PDF —
   here's what it could look like as a webshop").
2. Draft personalized first-touch emails (gmail skill, drafts only).

## Rules

- GDPR: B2B outreach data only — business contacts, lawful basis noted;
  honor opt-outs immediately.
- Quality over volume: 20 well-qualified leads beat 500 scraped rows.
- Cross-check enriched data before outreach — wrong names/companies in a
  first email are fatal.
- Pairs with: apify-scraping (raw data), airtable-crm (pipeline), gmail
  (outreach drafts).
