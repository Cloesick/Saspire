# Fixing "UtilityProcess spawn timeout after 5000ms" in Claude Desktop (Windows)

Every local MCP server in Claude Desktop is failing with:

> `MCP <Server>: UtilityProcess spawn timeout after 5000ms`
> `Could not connect to MCP server <Server>`

## Why this happens (root cause)

This is a **known Claude Desktop bug on Windows**, tracked upstream in
[anthropics/claude-code#61524](https://github.com/anthropics/claude-code/issues/61524),
[#64671](https://github.com/anthropics/claude-code/issues/64671) and
[#35399](https://github.com/anthropics/claude-code/issues/35399). Three things combine:

1. **Hardcoded 5-second spawn timeout.** Claude Desktop gives each local server
   process exactly 5000 ms to start. It is not configurable — `MCP_TIMEOUT` and
   similar env vars only affect the protocol handshake, not process spawn.
2. **All servers spawn at once through a serialized queue.** Each cold spawn takes
   ~1.8 s on a healthy Windows machine, so only the first **2–3 servers** fit inside
   the 5-second window. Everything later in the queue times out at exactly 5.0 s —
   regardless of which server it is.
3. **Any toggle restarts the whole fleet.** Toggling one connector in Settings
   restarts *all* enabled servers, which re-triggers the same timeout cascade.
   This is why clicking servers off/on seems to make things worse.

**You currently have ~13 local servers enabled** (Filesystem, Figma, React Spectrum,
Apify, AWS API, Vibe Prospecting, Revolut X, PDF Tools, skill-factory,
antigravity-mcp, filesystem, sequential-thinking, basic-memory, …). With the 2–3
server reliability ceiling, near-total failure is the expected outcome — nothing is
wrong with the individual servers.

## The fix, in order of impact

### 1. Cut local servers down to 2–3 (the only reliable fix)

Open **Settings → Developer → Edit Config** (`%APPDATA%\Claude\claude_desktop_config.json`)
and remove or disable every local server you don't use daily. Recommended keepers for
Saspire's workflows:

- **Filesystem** (the official extension) — local file access
- **PDF Tools** — catalog digitalization work
- **basic-memory** — persistent context across chats

Everything else: remove from the config and re-add only when needed, or replace with
a remote connector (see step 3).

### 2. Remove the duplicates

You have two filesystem servers (`Filesystem` extension **and** a custom `filesystem`
entry) — keep only the extension. You also have a local **Figma** server while the
Figma **connector** is already connected on claude.ai — drop the local one.

### 3. Prefer remote connectors over local servers

Remote connectors (Settings → Connectors on claude.ai) run hosted — **they never
spawn a local process and are immune to this bug**. You already have these connected:
Figma, GitHub, Gmail, Google Calendar, Google Drive, Airtable, Shopify, Vercel,
Cloudflare, Docusign, Make, Spotify, Tripadvisor, AWS Marketplace. Any local server
that has a hosted equivalent (Figma, AWS, Apify) should use the connector instead.

### 4. Restart correctly after every config change

Fully quit Claude from the **system tray icon → Quit** (closing the window is not
enough), then relaunch. **Never** toggle connectors in the settings panel to recover
a failed server — that restarts the entire fleet and cascades more timeouts.

### 5. Make the survivors spawn faster

- Replace `npx -y <package>` commands with a direct `node` invocation: install the
  server once (`npm install -g <package>`), then point `command` at `node` and
  `args` at the installed entry point. An `npx` cold start alone can exceed 5 s.
- Same for Python servers: prefer an installed console script over `uvx`.

### 6. Add antivirus exclusions (partial help, ~20%)

Add Windows Defender (or your AV) real-time-scan exclusions for:

- `node.exe` (your Node installation)
- `%APPDATA%\Claude`
- `%LOCALAPPDATA%\AnthropicClaude`

This measurably shortens spawn time but is not sufficient on its own.

### 7. If a server still fails, read its log

Logs live at `%APPDATA%\Claude\logs\mcp-server-<NAME>.log` (plus `main.log`). A
spawn timeout at exactly 5.0 s = the queue bug above. Different errors (ENOENT,
module not found, auth) are that server's own problem and worth fixing individually.

### 8. Keep Claude Desktop updated

The spawn queue behaviour is tracked upstream; a future release may raise or fix the
timeout. Check for updates in Settings before re-adding servers.

## Note on the "AWS API MCP Server: Server disconnected" banner

Same family of problem — the server process either never spawned (queue timeout) or
died after start. After trimming the fleet (step 1), if you still need AWS access,
prefer the hosted AWS connectors; the local `aws-api-mcp-server` is Python/`uvx`
based and one of the slowest to spawn.
