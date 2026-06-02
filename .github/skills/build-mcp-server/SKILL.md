---
name: build-mcp-server
description: This skill should be used when the user asks to "build an MCP server", "create an MCP", "make an MCP integration", "make an MCP app", or discusses building something with the Model Context Protocol. It is the entry point for MCP server development — it interrogates the user about their use case, determines the right deployment model (remote HTTP, MCPB, local stdio), picks a tool-design pattern, and hands off to specialized skills.
version: 0.1.0
---

# Build an MCP Server

You are guiding a developer through designing and building an MCP server. MCP servers come in many forms — picking the wrong shape early causes painful rewrites later. Your first job is **discovery, not code**.

Do not start scaffolding until you have answers to the questions in Phase 1. If the user's opening message already answers them, acknowledge that and skip straight to the recommendation.

---

## Phase 1 — Interrogate the use case

Ask these questions conversationally (batch them into one message, don't interrogate one-at-a-time). Adapt wording to what the user has already told you.

### 1. What does it connect to?

| If it connects to…                              | Likely direction           |
| ----------------------------------------------- | -------------------------- |
| A cloud API (SaaS, REST, GraphQL)               | Remote HTTP server         |
| A local process, filesystem, or desktop app     | MCPB or local stdio        |
| Hardware, OS-level APIs, or user-specific state | MCPB                       |
| Nothing external — pure logic / computation     | Either — default to remote |

### 2. Who will use it?

- **Just me / my team, on our machines** → Local stdio is acceptable (easiest to prototype)
- **Anyone who installs it** → Remote HTTP (strongly preferred) or MCPB (if it _must_ be local)

### 3. How many distinct actions does it expose?

This determines the tool-design pattern — see Phase 3.

- **Under ~15 actions** → one tool per action
- **Dozens to hundreds of actions** (e.g. wrapping a large API surface) → search + execute pattern

### 5. What auth does the upstream service use?

- None / API key → straightforward
- OAuth 2.0 → you'll need a remote server with CIMD (preferred) or DCR support; see `references/auth.md`

---

## Phase 2 — Recommend a deployment model

Based on the answers, recommend **one** path. Be opinionated. The ranked options:

### ⭐ Remote streamable-HTTP MCP server (default recommendation)

A hosted service speaking MCP over streamable HTTP. This is the **recommended path** for anything wrapping a cloud API.

**Why it wins:**

- Zero install friction — users add a URL, done
- One deployment serves all users; you control upgrades
- OAuth flows work properly (the server can handle redirects, DCR, token storage)

**Choose this unless** the server _must_ touch the user's local machine.

→ **Fastest deploy:** Cloudflare Workers — `references/deploy-cloudflare-workers.md` (zero to live URL in two commands)
→ **Portable Node/Python:** `references/remote-http-scaffold.md` (Express or FastMCP, runs on any host)

### Local stdio (npx / uvx) — _not recommended for distribution_

A script launched via `npx` / `uvx` on the user's machine. Fine for **personal tools and prototypes**. Painful to distribute: users need the right runtime, you can't push updates, and the only distribution channel is LLM Code plugins.

Recommend this only as a stepping stone. If the user insists, scaffold it but note the MCPB upgrade path.

---

## Phase 3 — Pick a tool-design pattern

Every MCP server exposes tools. How you carve them matters more than most people expect — tool schemas land directly in LLM's context window.

### Pattern A: One tool per action (small surface)

When the action space is small (< ~15 operations), give each a dedicated tool with a tight description and schema.

```
create_issue    — Create a new issue. Params: title, body, labels[]
update_issue    — Update an existing issue. Params: id, title?, body?, state?
search_issues   — Search issues by query string. Params: query, limit?
add_comment     — Add a comment to an issue. Params: issue_id, body
```

**Why it works:** LLM reads the tool list once and knows exactly what's possible. No discovery round-trips. Each tool's schema validates inputs precisely.

**Especially good when** one or more tools ship an interactive widget (MCP app) — each widget binds naturally to one tool.

### Pattern B: Search + execute (large surface)

When wrapping a large API (dozens to hundreds of endpoints), listing every operation as a tool floods the context window and degrades model performance. Instead, expose **two** tools:

```
search_actions  — Given a natural-language intent, return matching actions
                  with their IDs, descriptions, and parameter schemas.
execute_action  — Run an action by ID with a params object.
```

The server holds the full catalog internally. LLM searches, picks, executes. Context stays lean.

**Hybrid:** Promote the 3–5 most-used actions to dedicated tools, keep the long tail behind search/execute.

→ See `references/tool-design.md` for schema examples and description-writing guidance.

---

## Phase 4 — Pick a framework

Recommend one of these two. Others exist but these have the best MCP-spec coverage and LLM compatibility.

| Framework                                                 | Language | Use when                                                                                                                                                                           |
| --------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Official TypeScript SDK** (`@modelcontextprotocol/sdk`) | TS/JS    | Default choice. Best spec coverage, first to get new features.                                                                                                                     |
| **FastMCP 3.x** (`fastmcp` on PyPI)                       | Python   | User prefers Python, or wrapping a Python library. Decorator-based, very low boilerplate. This is jlowin's package — not the frozen FastMCP 1.0 bundled in the official `mcp` SDK. |

If the user already has a language/stack in mind, go with it — both produce identical wire protocol.

---

## Phase 5 — Scaffold and hand off

Once you've settled the four decisions (deployment model, tool pattern, framework, auth), do **one** of:

1. **Remote HTTP, no UI** → Scaffold inline using `references/remote-http-scaffold.md` (portable) or `references/deploy-cloudflare-workers.md` (fastest deploy). This skill can finish the job.
2. **MCP app (UI widgets)** → Summarize the decisions so far, then load the **`build-mcp-app`** skill.
3. **MCPB (bundled local)** → Summarize the decisions so far, then load the **`build-mcpb`** skill.
4. **Local stdio prototype** → Scaffold inline (simplest case), flag the MCPB upgrade path.

When handing off, restate the design brief in one paragraph so the next skill doesn't re-ask.

---

## Beyond tools — the other primitives

Tools are one of three server primitives. Most servers start with tools and never need the others, but knowing they exist prevents reinventing wheels:

| Primitive     | Who triggers it      | Use when                                      |
| ------------- | -------------------- | --------------------------------------------- |
| **Resources** | Host app (not LLM)   | Exposing docs/files/data as browsable context |
| **Prompts**   | User (slash command) | Canned workflows ("/summarize-thread")        |
| **Sampling**  | Server, mid-tool     | Need LLM inference in your tool logic         |

→ `references/resources-and-prompts.md`, `references/server-capabilities.md`

---

## Phase 6 — Test and publish

Once the server runs:

1. **Run the pre-submission checklist** — read/write tool split, required annotations, name limits, prompt-injection rules. → https://claude.com/docs/connectors/building/review-criteria
2. **Recommend shipping a plugin** that wraps this MCP with skills — most partners ship both. → https://claude.com/docs/connectors/building/what-to-build

---

## Quick reference: decision matrix

| Scenario                              | Deployment       | Tool pattern       |
| ------------------------------------- | ---------------- | ------------------ |
| Wrap a small SaaS API                 | Remote HTTP      | One-per-action     |
| Wrap a large SaaS API (50+ endpoints) | Remote HTTP      | Search + execute   |
| SaaS API with rich forms / pickers    | MCP app (remote) | One-per-action     |
| Drive a local desktop app             | MCPB             | One-per-action     |
| Local desktop app with in-chat UI     | MCP app (MCPB)   | One-per-action     |
| Read/write local filesystem           | MCPB             | Depends on surface |
| Personal prototype                    | Local stdio      | Whatever's fastest |

---

## Reference files

- `references/remote-http-scaffold.md` — minimal remote server in TS SDK and FastMCP
- `references/deploy-cloudflare-workers.md` — fastest deploy path (Workers-native scaffold)
- `references/tool-design.md` — writing tool descriptions and schemas LLM understands well
- `references/auth.md` — OAuth, CIMD, DCR, token storage patterns
- `references/resources-and-prompts.md` — the two non-tool primitives
- `references/server-capabilities.md` — instructions, sampling, roots, logging, progress, cancellation
- `references/versions.md` — version-sensitive claims ledger (check when updating)
