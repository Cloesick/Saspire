---
name: tripadvisor-travel
description: Use the Tripadvisor connector to research hotels for business travel — searching by destination, comparing options, and pulling details/reviews. Use when the user mentions a trip, hotel, or travel planning for client visits or conferences.
---

# Tripadvisor for Saspire business travel

## Key tools (Tripadvisor MCP connector)

- `search_hotels` — by destination, dates, filters
- `hotel_details` — amenities, reviews, location specifics
- `compare_hotels` — side-by-side comparison of shortlisted options

## Workflow: book-ready hotel shortlist

1. `search_hotels` for the destination and dates; filter to business-sensible
   criteria (location near the client/venue, wifi, breakfast).
2. `compare_hotels` on the top 3–4.
3. Present a table: price range, distance to destination, rating, one-line
   review sentiment. Recommend one with reasoning.

## Rules

- Base recommendations on recent reviews, not just star rating.
- Note cancellation flexibility — client meetings move.
- This connector researches; actual booking happens outside — never claim a
  booking was made.
