#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import { performance } from "node:perf_hooks";
import pkg from "../package.json" with { type: "json" };
import { logError, logWarn } from "./helpers/log.js";
import {
  recordHttpRequest,
  recordToolCall,
  register,
} from "./helpers/metrics.js";
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
      const started = performance.now();

      try {
        const result = await tool.callback(args);
        recordToolCall(tool.name, "ok", (performance.now() - started) / 1000);

        return {
          content: [
            {
              type: "text" as const,
              text: result,
            },
          ],
        };
      } catch (error) {
        recordToolCall(
          tool.name,
          "error",
          (performance.now() - started) / 1000,
        );
        logError("Tool execution failed", {
          tool: tool.name,
          error: error instanceof Error ? error.message : String(error),
        });
        throw error;
      }
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
app.use((req, res, next) => {
  if (req.path === "/metrics") {
    next();
    return;
  }

  const started = performance.now();
  res.once("finish", () => {
    recordHttpRequest(
      req.path,
      req.method,
      res.statusCode,
      (performance.now() - started) / 1000,
    );
  });

  next();
});

app.get("/isalive", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.get("/isready", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.get("/metrics", async (_req, res) => {
  res.setHeader("Content-Type", register.contentType);
  res.status(200).send(await register.metrics());
});

app.all("/mcp", async (req, res) => {
  if (req.method !== "POST") {
    logWarn("Rejected MCP request with unsupported method", {
      method: req.method,
      path: req.path,
    });
    res.setHeader("Allow", "POST");
    res.sendStatus(405);
    return;
  }

  const origin = req.headers.origin;
  if (origin) {
    const host = req.get("host");
    if (!host) {
      logWarn("Rejected MCP request without host header", {
        origin,
        path: req.path,
      });
      res.sendStatus(400);
      return;
    }

    const serverOrigin = `${req.protocol}://${host}`;
    if (origin !== serverOrigin) {
      logWarn("Rejected MCP request with mismatched origin", {
        origin,
        serverOrigin,
        path: req.path,
      });
      res.sendStatus(403);
      return;
    }
  }

  try {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    res.on("close", () => {
      void transport.close();
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    logError("MCP request failed", {
      path: req.path,
      method: req.method,
      error: error instanceof Error ? error.message : String(error),
    });
    if (!res.headersSent) {
      res.sendStatus(500);
    }
  }
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
