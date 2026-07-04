---
name: pdf-tools
description: Use the PDF Tools desktop server to fill, sign, merge, split, and extract PDFs — the core of Saspire's catalog digitalization service. Use whenever the user works with a PDF - client catalogs, contracts, forms, invoices, or wants PDF content turned into structured data.
---

# PDF Tools for catalog digitalization

## Context

Catalog digitalization (PDF → interactive digital experience) is a core Saspire
service. This server handles the PDF side; downstream the data flows into
webshops (shopify-store skill) or portals.

## Capabilities (PDF Tools desktop server)

- **Extract** — pull text, tables, and images out of a PDF
- **Split** — break a large catalog into per-section/per-page files
- **Merge** — combine documents (e.g. proposal + annexes)
- **Fill** — populate form fields programmatically
- **Sign** — apply signatures to documents

## Workflows

### Catalog → webshop data (the flagship flow)
1. Split the client's catalog PDF into manageable sections.
2. Extract product data per section: name, SKU/ref, description, price, image.
3. Normalize into structured records (consistent fields, cleaned prices,
   language noted — FR/NL/EN catalogs are common).
4. Hand off: create products via the shopify-store skill, or export CSV via
   the filesystem skill for the client to review first.

### Contract assembly
1. Merge the service agreement with project-specific annexes.
2. Fill client fields (name, address, dates, amounts).
3. For signatures prefer the docusign-contracts skill (audit trail) over
   local signing.

## Rules

- Always show a sample of extracted data (first 3–5 products) for validation
  before processing the whole catalog — extraction errors compound.
- Preserve originals: write outputs to new files, never overwrite the source PDF.
- Scanned (image-only) PDFs extract poorly — detect this early and tell the
  user OCR is needed rather than returning garbage.
