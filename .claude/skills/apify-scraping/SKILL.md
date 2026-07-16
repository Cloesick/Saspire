---
name: apify-scraping
description: Use the Apify desktop server for web scraping and data extraction at scale — competitor pricing, product data, business listings, market research. Use whenever the user needs structured data from websites that has no API.
---

# Apify web scraping for Saspire

## Capabilities (Apify MCP server)

Apify runs "Actors" — prebuilt scrapers in the Apify Store — plus generic
crawlers. Typical tools: search the Actor store, run an Actor with input,
fetch run status and dataset results.

## Useful Actors for Saspire work

- **Google Maps scraper** — local business data (prospecting: shops in a region
  that lack a webshop = potential clients)
- **Website content crawler** — pull a client's existing site content before a
  rebuild
- **E-commerce scrapers** — competitor product/pricing data for webshop clients

## Workflows

### Competitor pricing snapshot for a webshop client
1. Find the right Actor for the competitor's platform.
2. Run with the target URLs; wait for the run to finish.
3. Fetch the dataset; normalize to product/price rows; compare to the client's
   catalog.

### Prospect list building (pairs with vibe-prospecting skill)
1. Google Maps Actor for the target sector/region (e.g. "furniture stores,
   Flanders").
2. Extract name, website, phone; flag businesses with no/poor web presence.

## Rules

- Respect robots.txt and site terms; scrape public data only, at modest rates.
- Scraped personal data falls under GDPR — collect business contact data only,
  and only what's needed.
- Actor runs cost Apify credits — estimate scope (page counts) before large runs
  and confirm with the user.
- Always spot-check ~5 rows of results before delivering the dataset.
