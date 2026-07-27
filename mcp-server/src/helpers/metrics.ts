import {
  Counter,
  Gauge,
  Histogram,
  collectDefaultMetrics,
  register,
} from "prom-client";

collectDefaultMetrics({ register });

const httpRequestDurationSeconds = new Histogram({
  name: "aksel_mcp_requests_duration_seconds",
  help: "Duration of HTTP requests handled by aksel-mcp-server.",
  labelNames: ["route", "method", "status"] as const,
  registers: [register],
});

const httpRequestsTotal = new Counter({
  name: "aksel_mcp_requests_total",
  help: "Total HTTP requests handled by aksel-mcp-server.",
  labelNames: ["route", "method", "status"] as const,
  registers: [register],
});

const toolCallsTotal = new Counter({
  name: "aksel_mcp_tool_calls_total",
  help: "Total MCP tool calls handled by aksel-mcp-server.",
  labelNames: ["tool", "status"] as const,
  registers: [register],
});

const toolDurationSeconds = new Histogram({
  name: "aksel_mcp_tool_duration_seconds",
  help: "Duration of MCP tool calls handled by aksel-mcp-server.",
  labelNames: ["tool", "status"] as const,
  registers: [register],
});

const toolErrorsTotal = new Counter({
  name: "aksel_mcp_tool_errors_total",
  help: "Total MCP tool errors thrown by aksel-mcp-server.",
  labelNames: ["tool"] as const,
  registers: [register],
});

const cacheHitsTotal = new Counter({
  name: "aksel_mcp_cache_hits_total",
  help: "Total cache hits in aksel-mcp-server.",
  labelNames: ["cache"] as const,
  registers: [register],
});

const cacheMissesTotal = new Counter({
  name: "aksel_mcp_cache_misses_total",
  help: "Total cache misses in aksel-mcp-server.",
  labelNames: ["cache"] as const,
  registers: [register],
});

const serverUp = new Gauge({
  name: "aksel_mcp_up",
  help: "Whether aksel-mcp-server is running.",
  registers: [register],
});

serverUp.set(1);

function recordHttpRequest(
  route: string,
  method: string,
  status: number,
  durationSeconds: number,
) {
  const labels = {
    route,
    method,
    status: String(status),
  };

  httpRequestsTotal.inc(labels);
  httpRequestDurationSeconds.observe(labels, durationSeconds);
}

function recordToolCall(
  tool: string,
  status: "ok" | "error",
  durationSeconds: number,
) {
  const labels = { tool, status };

  toolCallsTotal.inc(labels);
  toolDurationSeconds.observe(labels, durationSeconds);

  if (status === "error") {
    toolErrorsTotal.inc({ tool });
  }
}

function recordCacheHit(cache: string) {
  cacheHitsTotal.inc({ cache });
}

function recordCacheMiss(cache: string) {
  cacheMissesTotal.inc({ cache });
}

export {
  cacheHitsTotal,
  cacheMissesTotal,
  httpRequestDurationSeconds,
  httpRequestsTotal,
  recordCacheHit,
  recordCacheMiss,
  recordHttpRequest,
  recordToolCall,
  register,
  serverUp,
  toolCallsTotal,
  toolDurationSeconds,
  toolErrorsTotal,
};
