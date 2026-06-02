import { logError } from "../helpers/log.js";
import { createNodeCache, oneHourSeconds } from "../helpers/node-cache.js";
import type { McpResource } from "../types.js";

const URI = "aksel-docs://llm-index";
const MIME_TYPE = "application/json";
const { cacheGet, cacheSet } = createNodeCache("llm_index", oneHourSeconds);

const llmIndexResource: McpResource = {
  name: "Aksel Documentation index",
  uri: URI,
  description:
    "Complete Aksel documentation index from aksel.nav.no/api/llm/docs. Use this to find the correct path, then call aksel_docs with that path.",
  mimeType: MIME_TYPE,
  async callback() {
    try {
      const cachedContent = cacheGet("llm-index");

      if (cachedContent) {
        return {
          contents: [
            {
              uri: URI,
              mimeType: MIME_TYPE,
              text: cachedContent,
            },
          ],
        };
      }

      const response = await fetch("https://aksel.nav.no/api/llm/docs");

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const content = JSON.stringify(await response.json());
      cacheSet("llm-index", content);

      return {
        contents: [
          {
            uri: URI,
            mimeType: MIME_TYPE,
            text: content,
          },
        ],
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      logError("Failed to fetch documentation index", {
        resource: URI,
        error: errorMessage,
      });

      return {
        contents: [
          {
            uri: URI,
            mimeType: MIME_TYPE,
            text: JSON.stringify({
              error: `Failed to fetch documentation index: ${errorMessage}`,
            }),
          },
        ],
      };
    }
  },
};

export { llmIndexResource };
