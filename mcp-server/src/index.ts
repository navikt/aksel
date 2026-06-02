#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import pkg from "../package.json" with { type: "json" };
import { prompts } from "./prompts/prompts.js";
import { resources } from "./resources/resources.js";
import { tools } from "./tools/tools.js";

const server = new McpServer({
  name: "aksel-mcp-server",
  version: pkg.version,
});

for (const tool of tools) {
  server.registerTool(
    tool.name,
    {
      description: tool.description,
      inputSchema: tool.inputSchema,
      annotations: { readOnlyHint: true },
    },
    async (args: { [K in keyof typeof tool.inputSchema]: any }) => {
      const result = await tool.callback(args);

      return {
        content: [
          {
            type: "text" as const,
            text: result,
          },
        ],
      };
    },
  );
}

for (const prompt of prompts) {
  server.registerPrompt(
    prompt.name,
    { description: prompt.description, argsSchema: prompt.argsSchema },
    async (args: { [K in keyof typeof prompt.argsSchema]: any }) => {
      const result = await prompt.callback(args);

      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: result,
            },
          },
        ],
      };
    },
  );
}

for (const resource of resources) {
  server.registerResource(
    resource.name,
    resource.uri,
    { description: resource.description, mimeType: resource.mimeType },
    resource.callback,
  );
}

const app = express();
app.set("trust proxy", true);
app.use(express.json());

app.get("/isalive", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.get("/isready", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.all("/mcp", async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.sendStatus(405);
    return;
  }

  const origin = req.headers.origin;
  if (origin) {
    const host = req.get("host");
    if (!host) {
      res.sendStatus(400);
      return;
    }

    const serverOrigin = `${req.protocol}://${host}`;
    if (origin !== serverOrigin) {
      res.sendStatus(403);
      return;
    }
  }

  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  res.on("close", () => {
    void transport.close();
  });

  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

const port = Number(process.env.PORT ?? 8080);

const httpServer = app.listen(port, () => {
  console.error(`Aksel MCP server listening on ${port}`);
});

function shutdown() {
  httpServer.close(() => {
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
