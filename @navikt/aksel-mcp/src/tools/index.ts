import type { McpTool } from "../types.js";
import { getAlerts } from "./get-alerts.js";
import { getForecast } from "./get-forecast.js";

/**
 * Register all tools here.
 * Each tool should be an object that conforms to the McpTool interface, with a unique name, description, input schema, and callback function.
 */
const tools: McpTool<any>[] = [getAlerts, getForecast];

export { tools };
