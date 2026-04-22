import { tokens } from "@navikt/ds-tokens/token_docs";
import type { McpResource } from "../types.js";

const URI = "aksel-tokens://all";
const MIME_TYPE = "application/json";

const designTokensResource: McpResource = {
  name: "Aksel Design Tokens",
  uri: URI,
  description:
    "Complete Aksel design token catalog including colors, spacing, typography, and breakpoints. Use these tokens instead of hard-coded values to ensure consistency with the design system.",
  mimeType: MIME_TYPE,
  async callback() {
    return {
      contents: [
        {
          uri: URI,
          mimeType: MIME_TYPE,
          text: JSON.stringify(tokens, null, 2),
        },
      ],
    };
  },
};

export { designTokensResource };
