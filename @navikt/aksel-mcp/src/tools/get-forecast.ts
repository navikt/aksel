import { z } from "zod";
import {
  type ForecastPeriod,
  type ForecastResponse,
  type PointsResponse,
  makeNWSRequest,
} from "../makeRequest.js";
import type { McpTool } from "../types.js";

const NWS_API_BASE = "https://api.weather.gov";

const getForecast: McpTool<{ latitude: z.ZodNumber; longitude: z.ZodNumber }> =
  {
    name: "get_forecast",
    description: "Get weather forecast for a location",
    inputSchema: {
      latitude: z
        .number()
        .min(-90)
        .max(90)
        .describe("Latitude of the location"),
      longitude: z
        .number()
        .min(-180)
        .max(180)
        .describe("Longitude of the location"),
    },
    async callback({ latitude, longitude }) {
      const pointsUrl = `${NWS_API_BASE}/points/${latitude.toFixed(4)},${longitude.toFixed(4)}`;
      const pointsData = await makeNWSRequest<PointsResponse>(pointsUrl);

      if (!pointsData) {
        return {
          content: [
            {
              type: "text",
              text: `Failed to retrieve grid point data for coordinates: ${latitude}, ${longitude}. This location may not be supported by the NWS API (only US locations are supported).`,
            },
          ],
        };
      }

      const forecastUrl = pointsData.properties?.forecast;
      if (!forecastUrl) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to get forecast URL from grid point data",
            },
          ],
        };
      }

      const forecastData = await makeNWSRequest<ForecastResponse>(forecastUrl);
      if (!forecastData) {
        return {
          content: [{ type: "text", text: "Failed to retrieve forecast data" }],
        };
      }

      const periods = forecastData.properties?.periods || [];
      if (periods.length === 0) {
        return {
          content: [{ type: "text", text: "No forecast periods available" }],
        };
      }

      const formattedForecast = periods.map((period: ForecastPeriod) =>
        [
          `${period.name || "Unknown"}:`,
          `Temperature: ${period.temperature || "Unknown"}°${period.temperatureUnit || "F"}`,
          `Wind: ${period.windSpeed || "Unknown"} ${period.windDirection || ""}`,
          `${period.shortForecast || "No forecast available"}`,
          "---",
        ].join("\n"),
      );

      return {
        content: [
          {
            type: "text",
            text: `Forecast for ${latitude}, ${longitude}:\n\n${formattedForecast.join("\n")}`,
          },
        ],
      };
    },
  };

export { getForecast };
