# Remote Streamable-HTTP MCP Server — Scaffold

Minimal working servers in both recommended frameworks. Start here, then add tools.

---

## TypeScript SDK (`@modelcontextprotocol/sdk`)

```bash
npm init -y
npm install @modelcontextprotocol/sdk zod express
npm install -D typescript @types/express @types/node tsx
```

**`src/server.ts`**

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import { z } from "zod";

const server = new McpServer(
  { name: "my-service", version: "0.1.0" },
  {
    instructions:
      "Prefer search_items before calling get_item directly — IDs aren't guessable.",
  },
);

// Pattern A: one tool per action
server.registerTool(
  "search_items",
  {
    description:
      "Search items by keyword. Returns up to `limit` matches ranked by relevance.",
    inputSchema: {
      query: z.string().describe("Search keywords"),
      limit: z.number().int().min(1).max(50).default(10),
    },
    annotations: { readOnlyHint: true },
  },
  async ({ query, limit }, extra) => {
    // extra.signal is an AbortSignal — check it in long loops for cancellation
    const results = await upstreamApi.search(query, limit);
    return {
      content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
    };
  },
);

server.registerTool(
  "get_item",
  {
    description: "Fetch a single item by its ID.",
    inputSchema: { id: z.string() },
    annotations: { readOnlyHint: true },
  },
  async ({ id }) => {
    const item = await upstreamApi.get(id);
    return { content: [{ type: "text", text: JSON.stringify(item) }] };
  },
);

// Streamable HTTP transport (stateless mode — simplest)
const app = express();
app.use(express.json());

app.post("/mcp", async (req, res) => {
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined, // stateless
  });
  res.on("close", () => transport.close());
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

app.listen(process.env.PORT ?? 3000);
```

**Stateless vs stateful:** The snippet above creates a fresh transport per request (stateless). Fine for most API-wrapping servers. If tools need to share state across calls in a session (rare), use a session-keyed transport map — see the SDK's `examples/server/simpleStreamableHttp.ts`.

---

## Search + execute pattern (large API surface)

When wrapping 50+ endpoints, don't register them all. Two tools:

```typescript
const CATALOG = loadActionCatalog(); // { id, description, paramSchema }[]

server.registerTool(
  "search_actions",
  {
    description:
      "Find available actions matching an intent. Call this first to discover what's possible. Returns action IDs, descriptions, and parameter schemas.",
    inputSchema: {
      intent: z.string().describe("What you want to do, in plain English"),
    },
    annotations: { readOnlyHint: true },
  },
  async ({ intent }) => {
    const matches = rankActions(CATALOG, intent).slice(0, 10);
    return {
      content: [{ type: "text", text: JSON.stringify(matches, null, 2) }],
    };
  },
);

server.registerTool(
  "execute_action",
  {
    description:
      "Execute an action by ID. Get the ID and params schema from search_actions first.",
    inputSchema: {
      action_id: z.string(),
      params: z.record(z.unknown()),
    },
  },
  async ({ action_id, params }) => {
    const action = CATALOG.find((a) => a.id === action_id);
    if (!action) throw new Error(`Unknown action: ${action_id}`);
    validate(params, action.paramSchema);
    const result = await dispatch(action, params);
    return { content: [{ type: "text", text: JSON.stringify(result) }] };
  },
);
```

`rankActions` can be simple keyword matching to start. Upgrade to embeddings if precision matters.

---

## Test it

The MCP Inspector connects to any transport and lets you poke tools interactively.

```bash
# Interactive — opens a UI on localhost:6274
npx @modelcontextprotocol/inspector
# → select "Streamable HTTP", paste http://localhost:3000/mcp, Connect
```

For scripted checks (CI, smoke tests):

```bash
npx @modelcontextprotocol/inspector --cli http://localhost:3000/mcp \
  --transport http --method tools/list

npx @modelcontextprotocol/inspector --cli http://localhost:3000/mcp \
  --transport http --method tools/call --tool-name search_items --tool-arg query=test
```

---

## Deploy

**This Express scaffold** runs on any Node host — Render, Railway, Fly.io, a VPS. Containerize it (`node:20-slim`, copy, `npm ci`, `node dist/server.js`) and ship. FastMCP is the same story with a Python base image.

---

## Deployment checklist

- [ ] `POST /mcp` responds to `initialize` with server capabilities
- [ ] `tools/list` returns your tools with complete schemas
- [ ] Errors return structured MCP errors, not HTTP 500s with HTML bodies
- [ ] CORS headers set if browser clients will connect
- [ ] `Origin` header validated on `/mcp` (spec MUST — DNS rebinding prevention)
- [ ] `MCP-Protocol-Version` header honored (return 400 for unsupported versions)
- [ ] `instructions` field set if tool-use needs hints
- [ ] Health check endpoint separate from `/mcp` (hosts poll it)
- [ ] Secrets from env vars, never hardcoded
- [ ] If OAuth: CIMD or DCR endpoint implemented — see `auth.md`
