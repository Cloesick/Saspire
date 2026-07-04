---
name: figma-design
description: Use the Figma connector when designing, mocking up, or implementing any UI, screen, component, or visual — for saspire.org, client webshops, or customer portals — and whenever a figma.com URL is shared. Covers design-to-code, code-to-design, screenshots, and FigJam diagrams.
---

# Figma for Saspire design work

## When to use

- Turning a Figma design into HTML/CSS/JS for saspire.org or a client site
- Pushing an existing page or component INTO Figma as an editable design
- Creating mockups for client proposals (webshops, portals, catalogs)
- Making process diagrams in FigJam (e.g. digitalization workflows for clients)

## Key tools (Figma MCP connector)

- **Read designs into code**: `get_design_context` (primary design-to-code tool),
  `get_screenshot` (visual reference), `get_metadata` (structure/IDs),
  `get_variable_defs` (design tokens), `download_assets`
- **Write designs into Figma**: `use_figma` (edit files), `create_new_file`,
  `generate_diagram` (FigJam), `upload_assets`
- **Discovery**: `search_design_system`, `get_libraries`, `whoami`

## Workflows

### Design-to-code (most common)
1. Get the node: from a Figma URL, extract file key + node id.
2. `get_design_context` for the node — returns structure, styles, and content.
3. `get_screenshot` to verify visual fidelity while implementing.
4. Implement in the site's existing stack: vanilla HTML + Tailwind CSS (no frameworks).

### Code-to-design (client proposal mockups)
1. Read the existing page code.
2. **Load the `/figma-use` skill first — mandatory before calling `use_figma`.**
3. `create_new_file`, then `use_figma` to build the design.

## Rules

- Always fetch real design context before implementing — never guess spacing,
  colors, or type from a description alone.
- Saspire's site is Tailwind-based: translate Figma tokens to Tailwind utilities
  rather than emitting raw CSS where possible.
- For client work, keep each client's designs in their own Figma file.
