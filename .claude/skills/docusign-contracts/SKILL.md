---
name: docusign-contracts
description: Use the Docusign connector for client contracts and e-signatures — sending agreements, checking signature status, sending reminders, and reviewing existing agreements. Use whenever the user mentions a contract, signature, agreement, NDA, or Docusign envelope.
---

# Docusign for Saspire client contracts

## Key tools (Docusign MCP connector)

- **Status & review**: `getEnvelopes`, `getEnvelope`, `listRecipients`,
  `listEnvelopeDocuments`, `getAllAgreements`, `getAgreementDetails`
- **Send**: `createEnvelopeFromTemplate` (preferred), `createEnvelope`,
  `updateEnvelope`, `updateEnvelopeRecipients`, `updateEnvelopeTabs`
- **Follow-up**: `sendReminder`
- **Templates**: `getTemplates`
- **Workflows**: `getWorkflowsList`, `triggerWorkflow`, `getWorkflowInstance`,
  `getWorkflowTriggerRequirements`, `cancelWorkflowInstance`
- **Account**: `getAccount`, `getUser`, `getUserInfo`

## Workflows

### "Has the client signed yet?"
1. `getEnvelopes` filtered to recent/pending.
2. `getEnvelope` + `listRecipients` for who has/hasn't signed.
3. If overdue: propose `sendReminder` (confirm before sending — it emails the
   client).

### Send a standard contract
1. `getTemplates` → pick the matching template (service agreement, NDA…).
2. `createEnvelopeFromTemplate` with recipient name/email/role filled in.
3. Confirm recipient details with the user BEFORE creating — a sent envelope
   emails the client immediately.

### Contract portfolio review
1. `getAllAgreements` → summarize by status: draft, sent, completed, expiring.

## Rules

- Creating or sending an envelope contacts a real client — always show the
  user recipient + document + template before executing.
- Never void/cancel an envelope or workflow without explicit confirmation.
- Signature legal-validity questions → recommend the user confirm with their
  legal advisor; don't give legal advice.
