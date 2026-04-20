import { z } from "zod";
import {
  type AlertsResponse,
  formatAlert,
  makeNWSRequest,
} from "../makeRequest.js";
import type { McpTool } from "../types.js";

const NWS_API_BASE = "https://api.weather.gov";

const getAlerts: McpTool<{ state: z.ZodString }> = {
  name: "get_alerts",
  description: "Get weather alerts for a state",
  inputSchema: {
    state: z.string().length(2).describe("Two-letter state code (e.g. CA, NY)"),
  },
  async callback({ state }) {
    const stateCode = state.toUpperCase();
    const alertsUrl = `${NWS_API_BASE}/alerts?area=${stateCode}`;
    const alertsData = await makeNWSRequest<AlertsResponse>(alertsUrl);

    if (!alertsData) {
      return {
        content: [{ type: "text", text: "Failed to retrieve alerts data" }],
      };
    }

    const features = alertsData.features || [];
    if (!features.length) {
      return {
        content: [{ type: "text", text: `No active alerts for ${stateCode}` }],
      };
    }

    const formattedAlerts = features.map(formatAlert);
    return {
      content: [
        {
          type: "text",
          text: `Active alerts for ${stateCode}:\n\n${formattedAlerts.join("\n")}`,
        },
      ],
    };
  },
};

export { getAlerts };
