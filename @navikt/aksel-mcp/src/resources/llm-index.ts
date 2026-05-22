import type { McpResource } from "../types.js";

const URI = "aksel-docs://llm-index";
const MIME_TYPE = "text/markdown";

/* TODO: Handle caching through a fetch generic if possible */
// Cache the llm.txt content with a reasonable TTL (1 hour)
let cachedContent: string | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

const llmIndexResource: McpResource = {
  name: "Aksel Documentation index",
  uri: URI,
  description:
    "Complete Aksel documentation index from aksel.nav.no/api/llm/docs. You MUST read this resource first to find the correct path, then call aksel_docs with that path.",
  mimeType: MIME_TYPE,
  async callback() {
    const now = Date.now();

    // Return cached content if still valid
    if (!(cachedContent && now - cacheTimestamp < CACHE_TTL_MS)) {
      try {
        const response = await fetch("https://aksel.nav.no/api/llm/docs");

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        cachedContent = JSON.stringify(await response.json());
        cacheTimestamp = now;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);

        return {
          contents: [
            {
              uri: URI,
              mimeType: "text/plain",
              text: `Error: Failed to fetch Aksel documentation index from aksel.nav.no/api/llm/docs\n\nError: ${errorMessage}\n\nPlease check your internet connection or try again later.`,
            },
          ],
        };
      }
    }

    return {
      contents: [
        {
          uri: URI,
          mimeType: "application/json",
          text: cachedContent,
        },
      ],
    };
  },
};

export { llmIndexResource };
