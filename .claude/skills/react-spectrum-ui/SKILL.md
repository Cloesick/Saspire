---
name: react-spectrum-ui
description: Use the React Spectrum MCP server (desktop) when building React UIs with Adobe's React Spectrum design system — component lookup, correct props/APIs, and accessible patterns. Use when a client project uses React Spectrum or needs an accessible React component library.
---

# React Spectrum UI development

## What the server provides

Documentation and component context for Adobe's React Spectrum — accessible,
themeable React components. Use it to look up the right component, its props,
and composition patterns instead of guessing from memory.

## Workflows

### Build a screen with Spectrum components
1. Query the server for the components matching the need (tables, forms,
   dialogs, pickers).
2. Follow the returned API exactly — Spectrum props differ from other
   libraries (e.g. `onPress` not `onClick`, collection components take
   `items` + render functions).
3. Wrap the app in `Provider` with a theme; use Spectrum layout components
   (`Flex`, `Grid`, `View`) rather than raw CSS where possible.

## Rules

- Accessibility is the point of Spectrum — always wire labels
  (`label`/`aria-label`) on form controls; the components enforce it.
- Don't mix Spectrum with other component libraries in one view.
- Note: saspire.org itself is vanilla HTML/Tailwind — Spectrum is for React
  client projects (portals, dashboards) only.
