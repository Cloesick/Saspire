---
name: google-calendar
description: Use the Google Calendar connector for scheduling — checking availability, creating or updating events, finding meeting slots, and reviewing upcoming client appointments. Use whenever the user mentions meetings, availability, scheduling, or their calendar.
---

# Google Calendar for Saspire scheduling

## Key tools (Google Calendar MCP connector)

- **Read**: `list_calendars`, `list_events`, `get_event`
- **Find a slot**: `suggest_time` (preferred over manually scanning events)
- **Write**: `create_event`, `update_event`, `delete_event`, `respond_to_event`

## Workflows

### "What does my week look like?"
1. `list_events` for the date range; group by day.
2. Flag conflicts and back-to-back client meetings without travel buffer
   (client visits around Brussels need commute time).

### Schedule a client meeting
1. `suggest_time` with duration and constraints to find open slots.
2. Propose 2–3 options to the user before creating anything.
3. `create_event` with the confirmed slot — include client name in the title,
   a clear agenda in the description, and the meeting link or address.

### Reschedule
1. `get_event` for current details.
2. `update_event` with the new time; note attendees get notified automatically.

## Rules

- Timezone is Europe/Brussels — state times explicitly when the user or client
  might be elsewhere.
- Never delete an event with attendees without confirmation; prefer
  `update_event` or `respond_to_event`.
- When listing availability, respect working hours (roughly 9:00–18:00 CET)
  unless told otherwise.
