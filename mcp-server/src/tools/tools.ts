import type { McpTool } from "../types.js";
import { getAkselDocs } from "./aksel-docs.js";
import { componentPropsTool } from "./component-props.js";
import { iconSearchTool } from "./icon-search.js";
import { tokenDetailsTool } from "./token-details.js";

const tools: McpTool<any>[] = [
  getAkselDocs,
  tokenDetailsTool,
  iconSearchTool,
  componentPropsTool,
];

export { tools };
