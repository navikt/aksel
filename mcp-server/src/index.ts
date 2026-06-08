#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import { performance } from "node:perf_hooks";
import pkg from "../package.json" with { type: "json" };
import { logError, logInfo, logWarn } from "./helpers/log.js";
import { recordHttpRequest, register } from "./helpers/metrics.js";
import { setupPrompts } from "./prompts/prompts.js";
import { setupResources } from "./resources/resources.js";
import { setupTools } from "./tools/tools.js";

const app = express();
app.use(express.json({ limit: "5mb" }));

const isProduction = process.env.NODE_ENV === "production";
const allowedOrigins = isProduction
  ? new Set(["https://aksel-mcp.ansatt.nav.no"])
  : new Set(["https://aksel-mcp.ansatt.nav.no", "http://localhost:8080"]);

/**
 * Middleware to record HTTP requests, excluding health and metrics endpoints.
 */
app.use((req, res, next) => {
  if (["/isalive", "/isready", "/metrics"].includes(req.path)) {
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

/* Nais liveness and readiness probes */
app.get("/isalive", (_req, res) => {
  res.status(200).json({ ok: true });
});

/* Nais liveness and readiness probes */
app.get("/isready", (_req, res) => {
  res.status(200).json({ ok: true });
});

/* Nais metrics endpoint */
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

  /**
   * Servers MUST validate the Origin header on all incoming connections to prevent DNS rebinding attacks
   * https://modelcontextprotocol.io/specification/2025-11-25/basic/transports#security-warning
   */
  const origin = req.headers.origin;

  /* Non-browser MCP clients often omit Origin, so only reject explicit mismatches. */
  if (origin && !allowedOrigins.has(origin.toLowerCase())) {
    logWarn("Rejected MCP request with disallowed origin", {
      origin: origin ?? null,
      path: req.path,
    });
    res.sendStatus(403);
    return;
  }

  try {
    const transport = new StreamableHTTPServerTransport({
      /* Server is stateless */
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });

    res.on("close", () => {
      void transport.close();
    });

    const server = new McpServer({
      name: "aksel-mcp",
      version: pkg.version,
    });

    setupPrompts(server);
    setupResources(server);
    setupTools(server);

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
  logInfo("Aksel MCP server listening", { port });
});

function shutdown() {
  httpServer.close(() => {
    logInfo("Aksel MCP server shutting down");
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
