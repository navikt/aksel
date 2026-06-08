import { getDocsIndex } from "../helpers/docs-index-client.js";
import { logError } from "../helpers/log.js";
import type { McpResource } from "../types.js";

const URI = "aksel-docs://index";
const MIME_TYPE = "application/json";
const docsIndexResource: McpResource = {
  name: "Aksel Docs Index",
  uri: URI,
  description:
    "Complete Aksel documentation index from aksel.nav.no/api/llm/docs. Use aksel_find_docs to get a precise path, or inspect this resource directly.",
  mimeType: MIME_TYPE,
  async callback() {
    try {
      const content = JSON.stringify(await getDocsIndex());

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
      logError("Failed to fetch docs index", {
        resource: URI,
        error: errorMessage,
      });

      return {
        contents: [
          {
            uri: URI,
            mimeType: MIME_TYPE,
            text: JSON.stringify({
              error: `Failed to fetch docs index: ${errorMessage}`,
            }),
          },
        ],
      };
    }
  },
};

export { docsIndexResource };
