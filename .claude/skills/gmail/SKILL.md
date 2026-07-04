---
name: gmail
description: Use the Gmail connector for anything involving email — finding client conversations, drafting replies, organizing with labels, or reviewing inbox threads. Use whenever the user mentions email, an inbox, a client message, or following up with someone.
---

# Gmail for Saspire client communication

## Key tools (Gmail MCP connector)

- **Find**: `search_threads` (Gmail query syntax), `get_thread`
- **Write**: `create_draft` (drafts only — sending stays manual), `list_drafts`
- **Organize**: `list_labels`, `create_label`, `label_thread`, `label_message`,
  `unlabel_thread`, `unlabel_message`

## Workflows

### Catch up on a client
1. `search_threads` with `from:client@example.com` or the project name.
2. `get_thread` on the relevant threads; summarize status, open questions,
   and promised deliverables with dates.

### Draft a reply or outreach
1. Read the thread first (`get_thread`) — match tone and pick up open points.
2. `create_draft` with the reply. Never claim an email was *sent*; drafts wait
   in Gmail for the user to review and send.

### Inbox organization
1. `list_labels` to see the existing scheme before inventing new labels.
2. Create per-client or per-project labels (e.g. `Clients/Acme`,
   `Projects/Webshop-X`) and apply with `label_thread`.

## Search syntax cheatsheet

- `from:name@domain.com`, `to:`, `subject:"proposal"`
- `newer_than:7d`, `older_than:1m`, `has:attachment`, `filename:pdf`
- `is:unread`, `label:Clients-Acme`

## Rules

- Business emails are in French, Dutch, and English — reply in the language of
  the thread.
- Quote client emails sparingly in summaries; they may contain confidential data.
- Always draft, never assume sending. Flag anything that looks urgent
  (complaints, deadline risks) at the top of a summary.
